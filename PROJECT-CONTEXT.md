# Project Context

## 1. Project

- Project name: Bridge Collective landing page
- Goal: Replace the Astro starter with a faithful, accessible, responsive implementation of the supplied Bridge Collective design.
- Project type: Static page
- Selected profile: Lite
- Profile rationale: One page and one coherent task, with enough responsive/state/source evidence to require separate audit, brief, task, and final-review artifacts.
- Created: 2026-08-11
- Last updated: 2026-08-11

## 2. Active Source Baseline

- Design: `SRC-DS-001`
- Repository: `SRC-REPO-001`
- Runtime: `SRC-RUN-001`
- Documentation: `SRC-DOC-001` through `SRC-DOC-004`
- Assets: `SRC-ASSET-001`, `SRC-ASSET-002`

See `SOURCE-BASELINE.md` and `.workflow/generated/SOURCE-INDEX.md` for evidence and canonical status.

## 3. Design and Repository Scope

Included: one `/` route; desktop/tablet/mobile closed states; desktop/tablet/mobile menu-open states; statistic-card pointer hover; typography, copy, assets, metadata, keyboard focus, and reflow. The production application is `frontend/` on `codex/bridge-collective-landing-page`.

Excluded: extra routes, real navigation destinations, backend/API work, persistence, analytics, deployment, design-file edits, and changes to reference-only docs.

Deferred: making the five menu labels into links and implementing their Figma hover/focus state after destination URLs are supplied.

## 4. Current State

- `frontend/` is an untouched Astro 7 starter with one route and no reusable product components.
- Current production serves the same starter.
- `pnpm build` works; diagnostics need `@astrojs/check` and `typescript`.
- The repository has no frontend test framework, formatter, or linter.
- The workflow toolkit is a separate Node package and validates successfully with `TMPDIR=/tmp`.

## 5. Quality Baseline

- Accessibility: semantic landmarks, one H1, repeated content as a list, native button, `aria-expanded`, visible `:focus-visible`, Escape/light-dismiss behavior, minimum touch target, 200% zoom/reflow, and forced-colors-safe focus.
- Responsive: exact evidence at 375×1816, 768×1336, and 1440×800; resilience at 320px and around 48rem/80rem transitions.
- Performance: static HTML/CSS with one small menu controller, local font/assets, no framework island or remote asset dependency.
- Testing: workflow validation, Astro diagnostics/build, browser interaction tests, console inspection, and visual comparison against pinned source images.
- Deployment: explicitly excluded.

## 6. Constraints and Decisions

| ID | Constraint or decision | Evidence | Impact | Status |
|---|---|---|---|---|
| REQ-CON-001 | Use Astro, strict TypeScript, local assets, and existing package conventions. | SRC-DOC-001, SRC-REPO-001 | No Tailwind/framework island. | Confirmed |
| REQ-CON-002 | Menu labels remain non-actionable until URLs exist. | User decision, SRC-DS-001, SRC-DOC-003 | No fake anchors, cursor, or menu-link hover. | Confirmed |
| REQ-CON-003 | Preserve the user-owned workflow-doc patch. | SRC-DOC-004 | Explicit staging only. | Confirmed |
| REQ-CON-004 | Figma raw hex wins over the style-guide mismatch. | SRC-DS-001, SRC-DOC-002 | Blue-700 is `#2854fe`. | Confirmed |

## 7. Risks and Questions

### Blocking

- None. The user approved the implementation plan and the visual-only navigation policy.

### Non-blocking

- Browser font rasterization can cause minor antialiasing differences from JPG exports.
- The supplied TTF is larger than an optimized WOFF2 but is the only authoritative font asset.
- The current production URL will continue to show the starter because deployment is excluded.

## 8. Stage 0 Completion

- [x] Scope and exclusions are explicit.
- [x] Every active snapshot is defined and honestly pinned.
- [x] Design/repository/runtime roles are separated.
- [x] Lite profile and quality expectations are justified.
- [x] Blocking decisions are resolved.
- [x] `WORKFLOW-STATE.md` references the same baseline.

