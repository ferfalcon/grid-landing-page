# Workflow State

## 1. State Ownership Mode

- [x] CLI-managed: `.workflow/workflow-record.json` is canonical.
- [ ] Markdown-only

Generated status, source, artifact, and task views live under `.workflow/generated/` and must not be edited manually.

## 2. Blocking Questions

| ID | Question | Decision | Required before | Status |
|---|---|---|---|---|
| Q-001 | What destinations should the menu labels use? | Keep labels non-actionable; implement only open/close. | Stage 2 | Resolved by user |
| Q-002 | What execution cadence applies? | Continuous documentation through Stage 9, then Task-by-task. | Stage 0 | Resolved by user |

## 3. Non-blocking Assumptions

| Assumption | Classification | Impact | Validation point | Status |
|---|---|---|---|---|
| Figma raw tokens are the most current visual values. | Inferred from current frame context | Resolves style-guide blue mismatch. | Visual QA | Confirmed |
| Supplied TTF is acceptable without conversion. | Recommended | Larger font transfer than WOFF2. | Build/network inspection | Confirmed |
| Reference heights are minimums when content/zoom needs more space. | Recommended | Preserves accessibility over clipping. | 320px and 200% zoom | Confirmed |

## 4. Architecture Decision

- Separate `ARCHITECTURE.md`: Not required.
- Reason: One static Astro route, build-time content, local assets, and transient DOM state. There is no API, routing expansion, shared application state, authentication, persistence, migration, security boundary, or deployment change.
- Structural decisions are owned by `IMPLEMENTATION-BRIEF.md`.

## 5. Source and Mode History

| Date | Classification | Change or result | Stage/task | Action | Status |
|---|---|---|---|---|---|
| 2026-08-11 | Unchanged | Initial Figma, repository, docs, assets, and runtime verified. | Stage 0 | Proceed through documentation. | Complete |
| 2026-08-11 | Mode decision | Lite / Continuous documentation selected. | Stages 0–9 | Switch to Task-by-task after readiness. | Approved |

## 6. Exceptions and Deviations

| ID | Expected | Deviation | Reason | Resolution | Status |
|---|---|---|---|---|---|
| DEV-001 | Figma menu-link hover state | Not implemented in this task | Labels have no destinations and must not imply click behavior. | Revisit only when URLs exist. | Accepted by user |
| DEV-002 | Exact fixed reference heights | Minimum heights may grow | Prevent clipping at narrow widths and text zoom. | Verify exact source widths and resilient edge widths. | Accepted |

## 7. Stage Advancement Rules

- Verify inputs at stage boundaries, task start, and final acceptance.
- Run CLI `sync --check` and `validate` after each operational change.
- Do not edit generated views.
- Stop only for a new blocking source change or an action outside the approved scope.
- The user’s implementation request is the approval to pass the Stage 9 gate and enter Task-by-task mode.

## 8. Latest Completion Summary

- Completed: source capture, profile/mode selection, and Stage 0 baseline.
- Inputs: `SRC-DS-001`, `SRC-REPO-001`, `SRC-RUN-001`, `SRC-DOC-001`–`004`, `SRC-ASSET-001`–`002`.
- Important decisions: visual-only menu labels; Figma color value wins; architecture artifact skipped; deployment excluded.
- Next permitted action: complete the design audit and Lite implementation brief.

