# Daily Reps — web release

English, browser-local workout app. Five movements per training session, a 20-minute target with optional overtime, rolling Push/Pull/Lower or fixed weekdays. No accounts, analytics, advertising SDKs, paid features or mobile wrapper.

## Run

Serve `dist/` over HTTPS (or localhost for development) and open `index.html`. No build or dependency installation is needed. Service workers do not work from `file://` URLs.

## Checks

```
node tests/release.cjs
node tests/offline-runtime.cjs
node tests/library.cjs
node tests/experience.cjs
node tests/overtime.cjs
node tests/instructions.cjs
node tests/order.cjs
node tests/kettlebells.cjs
node tests/public-app.cjs
node tests/ui-polish.cjs
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

The existing `daily-reps-engine-v2` storage key is retained; the payload has schema version 4. Valid legacy history and live circuits are preserved. Upcoming known compound movements are migrated to single movements. A downloaded backup contains all profiles, history, workout edits, preferences and any unfinished timer.

Import validates the file and previews its profile/session counts before replacement. Imported running timers are paused using their saved deadline; a timer whose target had already elapsed at export is restored as paused overtime, with no automatic completion. Restore uses the export timestamp so days since downloading the backup are not counted as training. Unknown future backup versions and malformed files are rejected before replacement.

LocalStorage is the immediate save; its previous valid value is retained as a safety copy. IndexedDB mirrors the latest snapshot in order. Startup checks the primary save, then the safety copy, then IndexedDB. These copies are on the same device and do not protect against clearing all browser storage. Export a downloaded JSON backup for that. Deletion clears the selected profile or all local training data, including safety copies, and updates the IndexedDB mirror.

## Counting and comparison

One movement and one counting unit per preset card. Timed holds use seconds and never contribute to rep totals. Count both sides together for unilateral movements. Load is optional and means total external kilograms (both dumbbells combined, a single weight as-is, 0 for no external load, blank for unknown/bands). Entries are separated by actual movement, unit and load, including changes during a workout. The exercise card displays the total across loads; the saved breakdown retains the individual loads.

Echo matches the circuit plus recorded loads. Changing an exercise or a load mid-session disables comparison for that session. Unknown load is still unknown: Echo is a rep-logging pace comparison, never a strength score.

Swap choices stay within the movement family. All matching alternatives are available in a searchable, scrollable list, without a five-choice limit. Matching patterns are ranked first; other movements in the family are labelled as a different stimulus. Equipment filters, exclusions and duplicate avoidance apply to every choice. Halo remains a shoulder option, explicitly distinct from pressing.

## Timer, audio and offline

The timer uses a real deadline. At the target it enters overtime and keeps logging available. Finish & save records a completed session once and advances the rotation. The original 1.7-second chime is scheduled with Web Audio when sound is unlocked. Pause, reset, mute and profile switching cancel the scheduled sound. Resuming schedules the new deadline. A visible completion and saved result still work when audio is unavailable. A refreshed running session offers an Enable finish sound button because browsers require a user gesture.

Screen wake lock is enabled by default per profile and can be turned off. It is released on pause, finish, deletion and profile change, and reacquired for a visible running session where supported. Browsers/device policies can reject or release it.

After the first successful online load, the service worker caches the application shell, scripts, styles and icons. Offline readiness is only shown for a controlling worker. New workers wait; updates are activated through Settings only when no session is active. The cached HTML and versioned scripts stay together. Sign-in pages and unrelated navigation are not cached. Authentication or hosting policies can affect initial caching and must be checked on the live deployment.

A browser cannot promise an alarm when it is closed or suspended or the device is locked. Native scheduled notifications and a bundled finish sound belong to the later Android app. No notification permissions are requested by this web release.

## Expanded exercise library — 30 October 2026

The library contains 311 distinct selectable exercises, grouped by primary training role:

| Group | Exercises |
| --- | ---: |
| Chest | 26 |
| Shoulders | 26 |
| Triceps | 22 |
| Back | 27 |
| Biceps & forearms | 25 |
| Core | 24 |
| Quads & legs | 41 |
| Hamstrings & posterior chain | 26 |
| Glutes | 24 |
| Hip abductors & adductors | 23 |
| Calves | 24 |
| Full body (legacy workouts) | 23 |

Groups describe primary training roles, not isolated muscles. Exercises often train secondary muscles. Hip control drills and shoulder control drills differ from loaded strength work; the pattern labels make those differences explicit.

Open “Form & choose exercise” on any workout card. Search by exercise name, equipment or movement pattern. Forward, reverse, walking, lateral and split-stance lunges are available in the quads/legs slot of Lower. The matching list shows exercises compatible with your enabled equipment and exclusions, excluding the current exercise and other occupied slots. The library has at least 20 exercises per group; fewer may match your filters. Add equipment in Settings only when it is actually available. Some moves need an anchored band, cable attachment, stable support or rack as described in the form cues. No diagram figures or generated people are shown.

Choosing an exercise updates the current workout, including during a running session, without resetting the timer or losing recorded reps. During a session it disables Echo comparisons. Use “Save choices as my … routine” before starting or after finishing to retain those choices for future workouts. Builder groups its library by muscle groups belonging to the selected workout. Timed holds continue to use seconds rather than reps.

Run locally with `python -m http.server 8000 --directory dist` and open http://localhost:8000. Hosting should serve the contents of `dist/`; no build step is required. Changes to main run the release checks and publish dist/ automatically through GitHub Pages.

Automated checks cover library completeness, equipment/exclusion rules, lunges, search, saved routines, existing timer/storage behavior and service-worker cache consistency. Physical-device acceptance checks in RELEASE_CHECKLIST.md remain necessary, especially for audio, wake lock and background suspension.

## Compact experience — 31 October 2026

The home screen presents the five exercises, reference workout challenge and start action before secondary schedule details. Calendar and full weekly progress live in Progress. Selecting an exercise opens a native modal dialog with search, challenge comparison filters and form cues; the library no longer expands inside the workout page.

New profiles enter a five-step setup: frequency and schedule, actual equipment, excluded exercises/categories, experience, and plan preview. Only Bodyweight is selected initially. Recommend mode chooses Full Body for 1–3 weekly sessions and Push/Pull/Lower for higher frequencies; users may override this. Experience ranks suitable variants when generating a new plan. Existing profiles, history, overrides and active sessions retain their saved state and bypass first-run setup. Applying a new plan explicitly replaces upcoming custom circuits; its preview warns about this.

Exercise levels run from 1 to 5 and describe reference challenge within a primary muscle group. Kneeling push-ups are 1, standard push-ups 3, and barbell bench press 4 at a typical working load. Loaded exercises show an asterisk because actual effort depends on load, strength, technique and range. Custom unknown exercises are unrated. These editorial reference levels are not validated physiological measurements, calorie estimates or guaranteed rankings at every load. Different movement patterns remain labelled separately. Workout challenge summarizes the selected reference levels.

Last weights are retained per exercise. Repeat last set copies the last logged entry for that exercise and unit, restores its recorded load, and adds an undoable entry. Logging buttons remain +1/+5/+10 for quick adjustments. Reps and timed holds remain separate. Swaps retain earlier entries and the timer while invalidating Echo comparisons. Backup access is available in the footer, Settings, and a reminder after training when no recent export exists. Advertising is not included.

Run all six automated suites before publication. Full-device browser acceptance remains a separate check; the restricted development environment could not complete the Chromium run. Check compact layout at 360px/390px widths, first-use setup, dialog scrolling and keyboard focus, and real-device timer/audio/offline behavior.

## Overtime and workout guidance — 2 November 2026

At twenty minutes the target chime sounds once and the clock changes to +MM:SS overtime. Reps, holds, Undo, load changes, repeat-set and swaps remain available. Pause freezes overtime; resuming and reloading preserve it. Finish & save is the explicit final action: it records the session once, includes late entries and actual unpaused duration, releases the wake lock and advances the rotation. Closing the page keeps an unfinished workout available for resumption. A suspended/closed browser still cannot guarantee a timely audible alert.

History and the calendar show target duration plus overtime. Training-time totals include saved overtime. Echo compares entries logged during the first twenty minutes; overtime entries remain in session totals. Logging time is not necessarily the actual instant an exercise was performed. Existing version-3 backups migrate to schema 4 without changing completed history or discarding current overrides. Version-4 backups need this or a newer app; do not import them into an old release.

“How this workout works” is available before and during training. It explains the selected routine’s goal, one-set-per-exercise circuit, rest guidance, manageable loading, actual selected movements, per-side counting, hold seconds and overtime completion. Opening instructions does not pause the timer.

Automated release tests now include overtime, once-only chime, running/paused reload, snapshot-time backup restoration, manual save, durations and instructions. The GitHub-hosted Chromium flow exercises overtime in a real browser, alongside the existing mobile/desktop checks. See LAUNCH_PLAN.md for the product analysis and proposed launch gates; those recommendations do not add ads, trackers or external outreach.

## Instruction cross-check — 2 November 2026

All 284 previous selectable library entries were reviewed for understandable setup and movement, matching rep units and side counts, required equipment, reference-level consistency and fit within the circuit. A duplicate kickback is now a library alias, leaving 283 selectable entries. Benchmarks and a mandatory trainer sign-off are not launch requirements; LAUNCH_PLAN.md now contains a smaller practical plan.

Side-plank targets explicitly say seconds per side, and the logger recognizes them as seconds. Single-arm/leg targets, directional circles, step counts, suitcase marches and compound-movement cycles are clarified. The exercise card, form guide, picker and workout guide display counting hints. Barbell curls and a light lying triceps extension no longer require a squat rack. Band anchors and ankle straps are selectable accessories and filter exercises requiring them; loop/long-band type remains described in the execution text. The normal Pull accessory slot starts with controlled back work rather than a hip-powered high pull. Reference ratings that contradicted their own variants were corrected. Historical records and saved custom prescriptions are not rewritten.

See INSTRUCTION_REVIEW.md for concrete findings. The review is an editorial and consistency cross-check of a fitness app, not a claimed certification or measurement of personal effort.

## Reorder workouts

For a Push/Pull/Lower rotation, open Workout schedule → Change workout order. Use Up/Down arrows to reorder the three workouts, select Next workout, then Save order. Cancelling leaves the current sequence untouched. Existing custom circuits, per-exercise loads, history and daily exercise overrides follow the corresponding workout. Setup → Schedule also supports the arrows, including during first-time setup. Full Body has no three-part order to change. Order changes are blocked during an unfinished session, including overtime.

Changing only the rotation order through Setup preserves custom circuits and daily overrides; applying a broader plan change retains the existing rebuild behavior. On fixed weekdays, the setup order determines the sequence assigned to selected days when new assignments are generated.

## General kettlebells and more leg patterns

Equipment now says Kettlebells. Setup and Settings let users select one or 2+ available kettlebells; exercises requiring two are shown only for the latter. Fourteen double-kettlebell choices cover presses, rows, squats, lunges, hinges, step-ups, carries/marches, curls and calf work. One-kettlebell movements remain available. Total external load means both bells added together; one simultaneous bilateral movement is one rep. Old “1x Kettlebell” profiles and saved choices are accepted and normalized without changing historical results or saved weights. Existing users default to one until they choose 2+.

The quads/legs slot also offers step-ups, lateral step-ups, controlled step-downs, wall sits, seated band/cable leg extensions and short-range reverse Nordics. Step-ups require a suitable Step / Platform; band/cable extensions require their anchor/strap/seat. Wall sits log seconds. These patterns share a primary quad focus but differ in hip contribution and stimulus; the picker explains that distinction. Excluding “squat” or “lunge” no longer accidentally excludes all entries merely because their internal group ID is squat.

## Public-app defaults and compatibility

PUBLIC_APP_REVIEW.md documents the scan and corrections. Bodyweight is always available, with explicit quantities for kettlebells and dumbbells. Existing dumbbell profiles retain a two-dumbbell assumption until changed. Known paired exercises require two; single-dumbbell options still work with one. Exclusions are user choices, not preselected restrictions.

Settings supports kg/lb display and input. Stored weightKg values remain canonical; unchanged rounded displays do not change the original stored number. Decimal commas are accepted. Repeat-set uses canonical loads directly. Old schemas retain their saved schedules rather than being forced into a five-session Push/Pull/Lower plan. Fixed weekdays expose individual assignments and preserve unchanged custom circuits. Automatic preset generation respects each slot's movement role before matching the reference challenge, with easier default choices where possible; manual swaps still show the whole compatible group.

Weekly goals replace daily streak pressure in the main progress/result UI. A waiting offline update has an Install update action outside active sessions; active sessions keep it deferred. About & data explains browserlocal data, backups and hosting context. There are still no accounts, analytics SDKs, ads or automatic cross-device sync.

## Mobile UI polish

Workout results group each exact exercise name once, with separate load/unit rows and combined per-exercise rep/hold totals. Repeated entries for the same load and unit are combined for display; original logs and history stay unchanged. Unknown external load remains distinct from zero load. No set counts are invented from individual +1/+5/+10 logging actions.

The small-screen header reserves space for the profile name and select chevron, with a compact Setup control at narrow widths and a full-name tooltip. Equipment tiles use local minimal SVG icons rather than letter abbreviations. Mobile main content and sticky Setup actions reserve room above the bottom navigation, including safe-area insets. The large repeated backup reminder has been removed from Workout/Progress; the existing footer action and the full Settings backup section remain available.
