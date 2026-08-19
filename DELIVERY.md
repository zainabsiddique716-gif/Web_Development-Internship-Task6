# Delivery record

## Part A: GitHub Flow

**Feature branch:** `feature/focus-board` from `main`.

**Pull request title:** `feat: add interactive focus board`

**PR description:** Adds a small focus board with accessible task buttons, progress tracking, and a status cycle. Includes unit tests for the state transition and summary utility. Validation: `npm run verify`.

**Self-review before requesting approval:**

1. The first implementation used an inline status transition in the click handler. I would move that behavior into a pure utility so it can be tested independently.
2. The progress denominator was derived in the DOM render path. I would centralize the summary calculation so zero-task and future filtering states cannot disagree.

**Simulated review comment / requested change:** “Please extract task-state rules from the UI and cover the full cycle with tests. A UI-only implementation would make a regression easy to miss.”

**Follow-up commit:** `refactor: isolate and test task state rules`. This added `src/focus.js` and `src/focus.test.js`; the browser now consumes the tested utility rather than owning the state machine.

**Merge:** Squash merge into `main`. GitHub Flow keeps short-lived feature branches, so one clean, searchable commit on `main` preserves the user-facing change without retaining review-only fixup noise.

## Part B: CI/CD

- PRs to `main`: `ci.yml` runs lint, tests, and build. In GitHub branch protection, require the `verify` job before merge.
- Pushes to `main`: `deploy-staging.yml` repeats verification and deploys the built static site to the GitHub Pages `staging` environment.
- Production: `production.yml` is `workflow_dispatch` only and must be paired with required reviewers on the `production` environment. Staging and production must not share a deploy trigger: staging catches integration issues automatically, while production needs an intentional, auditable approval boundary.

## Screenshot evidence

Capture these after pushing to GitHub and enable Pages:

- `evidence/successful-staging-run.png`: Actions > Deploy staging, green `deploy` job, with the staging URL visible in the job summary.
- `evidence/blocked-quality-gate.png`: open a second branch named `break/failing-test` with one intentionally failing assertion; open its PR and capture the red `verify` job plus the merge box stating the required check must pass. Close the PR without merging, then delete the branch.

The screenshot files are intentionally not fabricated locally: they must show the real repository, run ID, commit SHA, and GitHub merge protection state.

## Part C: reflection (303 words)

GitHub Flow makes `main` the only branch that can feed staging, while feature branches provide a quiet place to make and review one change at a time. That boundary matters because the staging workflow is intentionally automatic: once a pull request is merged, the code is eligible to appear in the shared environment. Review therefore becomes the first risk filter, and CI becomes the second. A reviewer can reason about intent, edge cases, accessibility, and maintainability; the pipeline can then repeat the mechanical checks on the exact commit that is proposed for merge.

In this exercise, the review surfaced a non-trivial design concern before deployment: the task state transition originally lived inside the browser click handler. That made the behavior harder to test and invited a mismatch between the UI and progress summary. Extracting `nextStatus` and `summarize` into a small pure module made the contract explicit and gave CI a fast regression check. The change is modest, but the discipline scales: a reviewer should ask where business rules live, not only whether the screen looks correct.

A concrete bug that good review could catch before CI is an incorrect progress denominator. If a developer counted only completed tasks when calculating the percentage, a board with two completed tasks would display 100% even when two planned tasks remained. The browser might still build and all superficial tests might pass, but a reviewer comparing the calculation with the displayed “2 / 4” label would catch the contradiction. The review comment could require one shared summary function and a test with mixed statuses, which is exactly the kind of small contract that prevents a misleading staging release.

The production workflow remains manual even though staging is automatic. Staging should be cheap and frequent so the team learns quickly; production should be deliberate because rollback, communication, and customer impact are different concerns. Keeping those triggers separate preserves a clear decision point without slowing normal integration.
