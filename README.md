# Daily Reps — web release

English, browser-local workout app. Five movements per training session, exactly 20 minutes, rolling Push/Pull/Lower or fixed weekdays. No accounts, analytics, advertising SDKs, paid features or mobile wrapper.

## Run

Serve `dist/` over HTTPS (or localhost for development) and open `index.html`. No build or dependency installation is needed. Service workers do not work from `file://` URLs.

## Checks

```
node tests/release.cjs
node tests/offline-runtime.cjs
node tests/library.cjs
```

These exercise the real app logic in a Node VM and the actual service-worker handlers with browser API doubles. They are not a substitute for physical-device acceptance tests.

## Files

- `data.js`: movement library, presets and movement-pattern metadata.
- `app.js`: session logic, counters, views, editor and profile controls.
- `storage.js`: schema validation, v3 migration, recovery snapshots, IndexedDB mirror and backup import/export.
- `platform.js`: wake lock, offline registration and runtime status.
- `sound.js`: original finish chime and cancellable Web Audio scheduling.
- `training.js`: one-movement training view and data/settings actions.
- `guides.js`: text-only form cues and muscle-group context.
- `setup.js`: equipment/schedule setup, weekly goals and Echo.
- `calendar.js`: history calendar, legacy schedule correction and asynchronous startup.
- `sw.js`: versioned, same-origin offline application shell.

## Data guarantees and limits

The existing `daily-reps-engine-v2` storage key is retained; the payload has schema version 3. Valid legacy history and live circuits are preserved. Upcoming known compound movements are migrated to single movements. A downloaded backup contains all profiles, history, workout edits, preferences and any unfinished timer.

Import validates the file and previews its profile/session counts before replacement. Imported running timers are paused using their saved deadline; an already-expired imported timer is discarded rather than counted as a completed workout. Unknown future backup versions and malformed files are rejected before replacement.

LocalStorage is the immediate save; its previous valid value is retained as a safety copy. IndexedDB mirrors the latest snapshot in order. Startup checks the primary save, then the safety copy, then IndexedDB. These copies are on the same device and do not protect against clearing all browser storage. Export a downloaded JSON backup for that. Deletion clears the selected profile or all local training data, including safety copies, and updates the IndexedDB mirror.

## Counting and comparison

One movement and one counting unit per preset card. Timed holds use seconds and never contribute to rep totals. Count both sides together for unilateral movements. Load is optional and means total external kilograms (both dumbbells combined, a single weight as-is, 0 for no external load, blank for unknown/bands). Entries are separated by actual movement, unit and load, including changes during a workout. The exercise card displays the total across loads; the saved breakdown retains the individual loads.

Echo matches the circuit plus recorded loads. Changing an exercise or a load mid-session disables comparison for that session. Unknown load is still unknown: Echo is a rep-logging pace comparison, never a strength score.

Swap choices stay within the movement family. All matching alternatives are available in a searchable, scrollable list, without a five-choice limit. Matching patterns are ranked first; other movements in the family are labelled as a different stimulus. Equipment filters, exclusions and duplicate avoidance apply to every choice. Halo remains a shoulder option, explicitly distinct from pressing.

## Timer, audio and offline

The timer uses a real deadline and counts a completed session once. The original 1.7-second chime is scheduled with Web Audio when sound is unlocked. Pause, reset, mute and profile switching cancel the scheduled sound. Resuming schedules the new deadline. A visible completion and saved result still work when audio is unavailable. A refreshed running session offers an Enable finish sound button because browsers require a user gesture.

Screen wake lock is enabled by default per profile and can be turned off. It is released on pause, finish, deletion and profile change, and reacquired for a visible running session where supported. Browsers/device policies can reject or release it.

After the first successful online load, the service worker caches the application shell, scripts, styles and icons. Offline readiness is only shown for a controlling worker. New workers wait; updates are activated through Settings only when no session is active. The cached HTML and versioned scripts stay together. Sign-in pages and unrelated navigation are not cached. Authentication or hosting policies can affect initial caching and must be checked on the live deployment.

A browser cannot promise an alarm when it is closed or suspended or the device is locked. Native scheduled notifications and a bundled finish sound belong to the later Android app. No notification permissions are requested by this web release.

## Expanded exercise library — 30 October 2026

The library contains 282 distinct selectable exercises, grouped by primary training role:

| Group | Exercises |
| --- | ---: |
| Chest | 23 |
| Shoulders | 24 |
| Triceps | 23 |
| Back | 26 |
| Biceps & forearms | 24 |
| Core | 23 |
| Quads & legs | 24 |
| Hamstrings & posterior chain | 24 |
| Glutes | 24 |
| Hip abductors & adductors | 23 |
| Calves | 23 |
| Full body (legacy workouts) | 21 |

Groups describe primary training roles, not isolated muscles. Exercises often train secondary muscles. Hip control drills and shoulder control drills differ from loaded strength work; the pattern labels make those differences explicit.

Open “Form & choose exercise” on any workout card. Search by exercise name, equipment or movement pattern. Forward, reverse, walking, lateral and split-stance lunges are available in the quads/legs slot of Lower. The matching list shows exercises compatible with your enabled equipment and exclusions, excluding the current exercise and other occupied slots. The library has at least 20 exercises per group; fewer may match your filters. Add equipment in Settings only when it is actually available. Some moves need an anchored band, cable attachment, stable support or rack as described in the form cues. No diagram figures or generated people are shown.

Choosing an exercise updates the current workout, including during a running session, without resetting the timer or losing recorded reps. During a session it disables Echo comparisons. Use “Save choices as my … routine” before starting or after finishing to retain those choices for future workouts. Builder groups its library by muscle groups belonging to the selected workout. Timed holds continue to use seconds rather than reps.

Run locally with `python -m http.server 8000 --directory dist` and open http://localhost:8000. Hosting should serve the contents of `dist/`; no build step is required. This repository does not automatically publish a public app.

Automated checks cover library completeness, equipment/exclusion rules, lunges, search, saved routines, existing timer/storage behavior and service-worker cache consistency. Physical-device acceptance checks in RELEASE_CHECKLIST.md remain necessary, especially for audio, wake lock and background suspension.
