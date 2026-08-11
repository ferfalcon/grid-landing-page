# Workflow State

## 1. State Ownership Mode

- [x] CLI-managed: `.workflow/workflow-record.json` is canonical.
- [ ] Markdown-only

Generated status, source, artifact, and task views live under `.workflow/generated/` and are never hand-edited.

## 2. Blocking Questions

| ID | Question | Decision | Required before | Status |
|---|---|---|---|---|
| Q-001 | What destinations should the menu labels use? | Keep labels non-actionable; implement only open/close. | Stage 2 | Resolved by user |
| Q-002 | What execution cadence applies? | Continuous documentation through Stage 9, then Task-by-task. | Stage 0 | Resolved by user |

No blocking question remains.

## 3. Assumptions and Validation

| Assumption | Classification | Impact | Validation | Status |
|---|---|---|---|---|
| Figma raw tokens are current visual values. | Inferred | Resolves style-guide mismatch. | Computed styles and paired QA | Confirmed |
| Supplied TTF is acceptable without conversion. | Recommended | Larger than WOFF2. | Build/resource inspection | Confirmed |
| Reference heights are minimums. | Recommended | Prevents clipping. | 320px, DPR2 reflow, short viewport | Confirmed |

## 4. Architecture Decision

- Separate `ARCHITECTURE.md`: Not required.
- Reason: one static Astro route, build-time content, local assets, and transient DOM state. No API, routing expansion, shared application state, authentication, persistence, migration, security boundary, or deployment change.
- Structural decisions remain in `IMPLEMENTATION-BRIEF.md`.

## 5. Source, Mode, and Completion History

| Date | Classification | Change/result | Stage/task | Action | Status |
|---|---|---|---|---|---|
| 2026-08-11 | Baseline | Figma, repository, docs, assets, and starter runtime verified. | Stage 0 | Proceeded through documentation. | Complete |
| 2026-08-11 | Mode decision | Lite / Continuous documentation selected. | Stages 0–9 | Prepared one coherent task. | Approved |
| 2026-08-11 | Readiness | Documentation artifacts approved and task `P01-T01` ready. | Stage 9 | Committed `SRC-REPO-002`; switched to Task-by-task. | Complete |
| 2026-08-11 | Implementation | Frontend implementation committed. | Stage 10 / P01-T01 | Created `SRC-REPO-003`. | Complete |
| 2026-08-11 | Validation | Production-preview QA, diagnostics, build, source integrity, and lineage passed. | Stage 11 | Registered `SRC-RUN-002`; approved review. | Complete |

## 6. Exceptions and Deviations

| ID | Expected | Deviation | Reason | Resolution | Status |
|---|---|---|---|---|---|
| DEV-001 | Figma menu-link hover | Not implemented | Labels have no destinations and must not imply click behavior. | Revisit only when URLs exist. | Accepted by user |
| DEV-002 | Exact fixed reference heights | Minimum heights may grow | Prevent clipping at narrow widths and text zoom. | Exact source frames plus resilient edges verified. | Accepted |
| QA-LIM-001 | Fine-pointer hover through headless browser | Headless Chromium reports no fine pointer. | Browser harness limitation. | CSS media gate inspected; blue-600 token visually compared through DevTools override. | Accepted, non-blocking |

## 7. Stage Advancement and Integrity

- Stages 0–9 completed under Continuous documentation.
- `P01-T01` started from `SRC-REPO-002`, completed at `SRC-REPO-003`, and validated in `SRC-RUN-002`.
- Stage 11 is Complete after final CLI/toolkit validation.
- `docs/implementation-workflow/ChatGPT-instructions.md` remains user-owned, uncommitted, and unstaged with SHA-256 `d62952028d76dc6cd842cc8e08cad93349311b4c37217f61884146833a8383a3`.
- Deployment remains outside authorization.

## 8. Latest Completion Summary

- Completed: all Lite stages, the single implementation task, diagnostics/build, browser interaction checks, source-matched responsive QA, final review, and output/runtime lineage.
- Inputs: `SRC-DS-001`, `SRC-REPO-001`, `SRC-RUN-001`, `SRC-DOC-001`–`004`, `SRC-ASSET-001`–`002`.
- Task start: `SRC-REPO-002`.
- Implementation output: `SRC-REPO-003` at `dde476d703b3416214943e2c6968cabcb874947f`.
- Validation runtime: `SRC-RUN-002`.
- Review: `IMPLEMENTATION-REVIEW.md` Approved; `design-qa.md` final result `passed`.
- Remaining action: none inside the approved task. Deployment requires separate authorization.
