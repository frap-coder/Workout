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
