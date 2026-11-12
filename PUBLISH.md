# Prepared Daily Reps update

Status: implemented locally; 14 functional test suites pass. GitHub publication is NOT confirmed. New browser checks must still pass in GitHub Actions before publication is considered complete.

Target repository: https://github.com/frap-coder/Workout
Current remote main checked: df7c7b6be1ecf6d34918fd2c9e8e9d6179c1ddf3
Prepared app cache version: 20261110-fitness-names1

Changes: equipment-aware beginner selection; stable exercise families; three suggested alternatives and material filtering; functional swap comparisons; actual muscle distribution; complete arithmetic/per-side translations; corrected execution and carry instructions; confirmed early saving with exact active time and backup support.

To publish from an authenticated Git checkout of frap-coder/Workout, extract this archive into the checkout, review the changes, then commit and push to main. The included GitHub Pages workflow runs all functional and browser checks and publishes only after those pass. Do not force-push. If main has moved beyond the commit above, review and merge intervening changes before pushing.

Local source files and full reviewed translation packs are included. No personal workout data or credentials are included.

Additional category correction: all 101 current family labels use standard English fitness terminology in every language; headings are marked data-no-i18n and protected in the runtime and translation build. Existing localized muscle-group names, instructions and controls are preserved. All 14 functional suites pass after this change. A small isolated fix for the current live release was also prepared and tested, but the GitHub write did not return within 30 seconds. Publication remains unconfirmed.
