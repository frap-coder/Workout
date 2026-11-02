# Next release: Google Play first

Scope decision: finish and validate the web release now. Android packaging and Google Play submission happen later. No iOS project, Capacitor project, native permissions or store build has been created.

## Completed automated checks

- Five-slot circuits, one movement per preset card and five default swap choices.
- Equipment/exclusions, movement-family boundaries, distinct-pattern labels and Halo availability.
- Load-aware rep history, undo, swaps, total reps vs seconds and Echo invalidation.
- Deadline completion once, pause/resume, persisted refresh and legacy history migration.
- Export parsing, malformed/future backup rejection, paused import, safety-copy and IndexedDB recovery.
- Storage-quota fallback, local deletion and wake-lock acquire/release.
- Finish-audio scheduling/cancellation/mute and duplicate prevention.
- Offline asset cache, authentication-response rejection, shell version consistency and deferred updates.

## Physical-device acceptance tests — not completed here

Run on current Android Chrome, including a smaller screen, and at least one additional browser. Browser automation was unavailable in this environment.

- [ ] Fresh install/profile, equipment setup and both schedule modes.
- [ ] Full 20-minute session; rep controls, load-field blur followed immediately by a rep tap, swaps, pause/resume, reset.
- [ ] Rotate screen, enlarge text, use keyboard/screen reader, inspect the schematic guides and all five movements.
- [ ] Show Offline copy ready, then airplane mode, close/reopen the page and complete a workout.
- [ ] Load an update while a timer runs: existing workout survives, update only applies after confirmation when inactive.
- [ ] Lock/unlock, switch apps, change Bluetooth/audio output and play music. Record browser limitations rather than claiming a guaranteed background alarm.
- [ ] Export/import on another browser; reject corrupt files; delete one profile/all data, then reload to confirm deletion.
- [ ] Exercise descriptions and schematic positioning reviewed by a qualified trainer before a broad fitness release.

## Later Android work

- Native Android package, signing and target SDK compliance at submission time.
- Package web assets for offline startup; migrate browser data using JSON import.
- Schedule/cancel native local finish notification on start/pause/resume/reset. Bundle the composed chime and respect Android notification/channel settings.
- Test notification permission denial, device reboot, battery restrictions, music/audio focus and process termination on actual phones.
- Public privacy/support pages with the actual developer identity/contact, correct Data Safety and Health apps declarations, age rating, store icon/screenshots and review notes.
- Developer account verification and closed testing as required for the chosen account; confirm current Play requirements at submission.
- Keep first release account-free and ad-free. Cloud sync, purchases and advertising are separate future scope.

## Exercise library acceptance

- [ ] At desktop and 390px mobile widths, open the exercise library; search without losing keyboard focus; verify scrolling and no horizontal overflow.
- [ ] In Lower, search for lunges and choose a reverse, forward, lateral or walking variation. Confirm the muscle-group and pattern labels.
- [ ] Restrict equipment to Bodyweight and exclude “lunge”; verify neither weighted movements nor lunges can be selected.
- [ ] Save a chosen routine, reload and verify the next matching workout retains it.
- [ ] Swap during a running session; verify timer, previous rep entries and Echo invalidation.
- [ ] No schematic people or pose images appear in exercise details.
- [ ] Install the offline update after a session ends and verify the expanded library is available offline.
- [ ] Verify side planks log seconds per side, anchored band work respects the Band Anchor filter and single-sided targets show combined counting hints.

## Compact experience acceptance

- [ ] New storage enters all five setup steps; only Bodyweight is initially selected.
- [ ] Two sessions recommend Full Body; five recommend Push/Pull/Lower; either can be overridden.
- [ ] Existing saved profiles bypass first-use setup and preserve routines/history/session.
- [ ] At 390×844 and 360×740, verify five compact exercise rows and Start before secondary schedule information; check no horizontal overflow.
- [ ] Picker opens as a modal; search and lighter/similar/harder filters combine; close returns keyboard focus.
- [ ] Bench press to kneeling push-up clearly shows a much lighter reference variant; loaded exercise caveat is present.
- [ ] Repeat last set restores the previous logged load and amount; Undo removes only that entry.
- [ ] Refresh paused/running sessions and check retained reps, timer and audio re-enablement.
- [ ] Export remains accessible from footer and Settings; reminders do not interrupt training.

## Overtime and instruction acceptance

- [ ] On iPhone/Safari and Android/Chrome, reach twenty minutes: one chime, +MM:SS, no forced result screen; reps remain available.
- [ ] Log/undo/repeat sets, change load and swap during overtime; all entries remain in the final result.
- [ ] Pause overtime, wait and resume: paused time does not accumulate. Reload running and paused states.
- [ ] Finish & save records once, advances the sequence once and releases wake lock; reopening does not duplicate a result.
- [ ] History/calendar show overtime and saved training-time totals include it.
- [ ] Export running overtime; restore days later and verify a paused snapshot at export time.
- [ ] Upgrade a version-3 saved session/backup and verify history, overrides and active circuit survive.
- [ ] Read the Push/Pull/Lower/Full Body instructions: goal, one set then next exercise, rest, safe load, both-side counting and explicit save are understandable without coaching.
- [ ] If possible, try a full session on actual phones and ask an experienced user to check unclear instructions; these are practical checks, not formal launch gates.

## Workout order

- [ ] Reorder Push/Pull/Lower with the arrows on mobile and select the next workout.
- [ ] Cancel leaves the saved sequence intact; Save and reload retain the new order and next workout.
- [ ] Custom circuits, weights and temporary exercise choices stay with the correct workout.
- [ ] Active sessions and overtime block reordering without resetting any data.
- [ ] Setup preview follows the chosen sequence, including fixed weekdays.

## Kettlebells and leg variety

- [ ] Setup shows Kettlebells, with 1 / 2+ quantity choices. The selection survives save/reload and backup restore.
- [ ] A one-kettlebell profile cannot select a double-kettlebell exercise; 2+ unlocks it and displays “2 required”.
- [ ] Old 1x Kettlebell selections still work; historical results and weights remain unchanged.
- [ ] Step-ups require a Step / Platform; cable/band leg extensions require the proper accessories.
- [ ] Wall sits log hold seconds and never add to rep totals.
- [ ] Excluding squat and lunge still permits step-ups, wall sits and knee extensions with compatible equipment.
