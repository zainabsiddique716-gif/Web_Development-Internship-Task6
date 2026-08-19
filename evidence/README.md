# Screenshot evidence

After pushing this repository to GitHub:

1. Enable GitHub Pages using GitHub Actions as the source.
2. Configure `staging` as an environment and capture the green `Deploy staging` run with its Pages URL.
3. Configure `Quality gate` as a required status check under branch protection.
4. Create `break/failing-test`, change one expected value in `src/focus.test.js`, push it, and open a PR. Capture the failed `verify` check and blocked merge state. Close the PR without merging.
5. Add the resulting screenshots here as `successful-staging-run.png` and `blocked-quality-gate.png`.
