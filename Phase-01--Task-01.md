---
artifact: TASK
id: P01-T01
status: Complete
baseline:
  design: [SRC-DS-001]
  repository: [SRC-REPO-002]
  runtime: [SRC-RUN-001]
  documentation: [SRC-DOC-001, SRC-DOC-002, SRC-DOC-003, SRC-DOC-004]
  assets: [SRC-ASSET-001, SRC-ASSET-002]
created: 2026-08-11
updated: 2026-08-11
---

# Phase 01 — Task 01: Implement and Validate the Bridge Collective Landing Page

## 1. Status and Objective

`Complete`

Replace the Astro starter with one committed, production-buildable `/` page that faithfully implements the pinned desktop/tablet/mobile Bridge Collective design, accessible menu behavior, local assets, and recorded visual/interaction validation.

## 2. Source References

- Baseline: `SOURCE-BASELINE.md`
- Design: `SRC-DS-001`, EVD-001–008
- Initial repository/runtime: `SRC-REPO-001`, `SRC-RUN-001`
- Documentation: `SRC-DOC-001`–`SRC-DOC-004`
- Assets: `SRC-ASSET-001`, `SRC-ASSET-002`
- Requirements: REQ-FR-001, REQ-FR-002, REQ-DR-001, REQ-NFR-001, REQ-NFR-002, REQ-NFR-003, REQ-CON-001, REQ-CON-002, REQ-CON-003
- Specifications: SPEC-BEH-001, SPEC-BEH-002, SPEC-INT-001, SPEC-ACC-001, SPEC-VAL-001
- Acceptance: AC-001–AC-007
- Plan: PLAN-001–PLAN-005 in `IMPLEMENTATION-BRIEF.md`
- Architecture: Explicitly not required; rationale recorded in the brief and `WORKFLOW-STATE.md`.
- Related tasks: None; this is the only Lite implementation task.

## 3. Snapshot Verification

- Verification date/method: 2026-08-11; Git SHA/remote comparison, Figma context/screenshots, file SHA-256, HTTP runtime inspection, and workflow validation.
- Design inputs applicable: Yes.
- Initial repository commit checked: Yes, `da910e51cac0f02b3ea06c4e51e7ae88c80da8ba`.
- Difference classification: Unchanged baseline; user-owned `SRC-DOC-004` patch is separately pinned and excluded from task commits.
- Upstream rebaseline required: No.
- Task-start snapshot: `SRC-REPO-002` at `d707899f39c7261ad0ac3be34f523061924f3e1b`; verified and active.

## 4. Prerequisites

- Approved Lite brief, audit, baseline, and user implementation authorization.
- Linux Node 24/pnpm runtime loaded through NVM.
- Exact local SVG/font/favicon assets available.
- `SRC-DOC-004` checksum remains unchanged and the file stays unstaged.

## 5. Scope

### Included

- One Astro `/` route, typed layout/header/stat-card components, global tokens/base styles, and exact local assets.
- Closed/open responsive menu, stat hover, focus and keyboard behavior, reflow, metadata, diagnostics, production build, browser/console checks, screenshot comparison, and iterative P0/P1/P2 correction.
- Workflow, task, implementation review, and `design-qa.md` evidence.

### Excluded

- Menu destinations and link-hover state, additional routes, backend/API/persistence/analytics, deployment, design-file changes, and unrelated cleanup.

## 6. Repository Context and Files

The task begins from an Astro 7 starter with no product component system or frontend tests. CSS is currently component-scoped; add one global token/base layer and keep component behavior/styles local.

| Path | Action | Responsibility |
|---|---|---|
| `frontend/src/layouts/Layout.astro` | Modify | Typed metadata/document shell and global stylesheet import. |
| `frontend/src/pages/index.astro` | Modify | Source-ordered page composition and stat data. |
| `frontend/src/components/SiteHeader.astro` | Create | Brand, menu markup, responsive overlay, and state controller. |
| `frontend/src/components/StatCard.astro` | Create | Typed repeated statistic unit and fine-pointer hover. |
| `frontend/src/styles/global.css` | Create | Font-face, tokens, base semantics, skip/focus utilities. |
| `frontend/src/assets/` | Add exact files | Inter/OFL, favicon, menu/close, and statistic icons. |
| `frontend/package.json`, `frontend/pnpm-lock.yaml` | Modify | Diagnostics development dependencies. |
| Starter-only component/assets | Delete | Remove unused Astro welcome implementation from production source. |

## 7. Dependencies and Interfaces

- Add only `@astrojs/check` and `typescript` dev dependencies.
- `LayoutProps { title: string; description: string }`.
- `NavItem { label: string }`; deliberately no destination field.
- `StatItem { value: string; label: string; description: string; icon: ImageMetadata }`.
- No public API, runtime data contract, route expansion, or downstream consumer.

## 8. Implementation Steps

1. Reverify sources, task-start commit, and protected user patch.
2. Add diagnostics dependencies and copy exact licensed assets.
3. Replace the starter with typed semantic page/component structure and confirmed content.
4. Implement Figma tokens, source measurements, and the three responsive layout modes.
5. Implement menu state, ARIA, focus restoration, inert/scroll lock, Escape/scrim close, and page-show reset.
6. Add stat hover only for fine-pointer hover-capable devices and accessible focus/forced-colors support.
7. Run diagnostics/build and production preview.
8. Capture source-matched viewport/states, test primary interactions/console, create paired comparisons, and fix all P0/P1/P2 differences.
9. Commit production implementation explicitly, excluding `SRC-DOC-004` and workflow working-state changes.
10. Complete output/runtime lineage, implementation review, design QA, workflow validation, and final records.

## 9. State, Responsive, and Accessibility Requirements

- Default: closed menu and blue-700 stat cards.
- Open: responsive panel/scrim, close icon/name, inert main/footer, locked body scroll.
- Unavailable: menu labels are plain text; no fake disabled state or focus.
- Loading/empty/error/success: Not applicable; all content is static and local.
- Small: stacked hero/cards, 32px hero inline padding, 24px card/footer padding, full-width menu.
- Intermediate: hero above 2×2 grid, 48px hero padding, 396px right menu panel.
- Large: 45/55 hero/grid split and fixed 396px stat tracks at the 1440 reference.
- Edge: content grows instead of clipping at 320px, zoom, or short heights.
- Semantics: header/main/footer, one H1, statistic list, native button, brand/skip links.
- Keyboard: logical order, Enter/Space native toggle, Escape close, visible focus, focus restored.
- Accessible state: `aria-expanded`/`aria-controls`, meaningful button name, decorative image alt text, no ARIA on plain labels.

## 10. Validation

### Automated

- Toolkit: `TMPDIR=/tmp npm run validate` from `docs/implementation-workflow/` — expected zero findings.
- Workflow: CLI `sync --check`, `validate`, and representative `trace` commands — expected current views and complete references.
- Type checking: `pnpm astro check` — expected zero errors/warnings/hints that block acceptance.
- Build: `pnpm build` — expected successful static output.
- Unit/lint/E2E: Not applicable; no such framework exists in the pinned repository.

### Browser/manual

- Closed/open captures at 375×1816, 768×1336, and 1440×800.
- Responsive checks at 320, 767/768, 1024, and 1279/1280 widths plus short/tall viewports.
- Pointer/toggle/Escape/scrim, ARIA/inert/scroll-lock, keyboard focus, and resize-state checks.
- Console/network inspection for errors, broken assets, remote Figma/font requests, and unwanted starter content.
- Paired same-viewport source/implementation comparison; fix every P0/P1/P2 issue and record final `design-qa.md` result as `passed`.

## 11. Acceptance Criteria

- [x] AC-001 confirmed content and exact assets pass.
- [x] AC-002 reference layouts and responsive edges pass.
- [x] AC-003 menu state and dismissal behavior pass.
- [x] AC-004 fine-pointer stat hover passes.
- [x] AC-005 semantic, keyboard, focus, target, contrast, zoom, and reflow checks pass.
- [x] AC-006 diagnostics, build, browser, console, and local-asset checks pass.
- [x] AC-007 workflow traceability and protected user-patch integrity pass.
- [x] Implementation commit has an output snapshot with task-start parent and validation runtime.

## 12. Risks and Deviations

| Risk or assumption | Impact | Mitigation |
|---|---|---|
| Font rasterization differs from exported JPG | Minor pixel differences | Compare hierarchy/wrapping and classify antialiasing-only drift as acceptable. |
| Authoritative TTF is large | Transfer-size limitation | Use one local variable file, no duplicate weights/network request. |
| Browser tooling could block capture | Design QA cannot pass without rendered evidence | Production preview captured through bundled Chromium using the DevTools protocol; preserve browser-rendered evidence. |
| User patch overlaps workflow source docs | Accidental ownership violation | Explicit path staging and checksum recheck. |

Planned deviation: EVD-008 menu-label hover is omitted under the approved visual-only policy. No other deviation is authorized.

## 13. Output Lineage

- Parent task-start snapshot: `SRC-REPO-002`.
- Implementation output snapshot: `SRC-REPO-003`.
- Output commit SHA: `dde476d703b3416214943e2c6968cabcb874947f`.
- Produced by: `P01-T01`.
- Validation runtime: `SRC-RUN-002`.
- Validation status: Passed; `IMPLEMENTATION-REVIEW.md` Approved and `design-qa.md` final result `passed`.

## 14. Definition of Done

- [x] Objective and AC-001–007 are satisfied.
- [x] No required validation is failing or unverified.
- [x] Input/task/output/runtime lineage is complete.
- [x] Documentation, task, workflow state, and generated views are current.
- [x] Deviations/risks are explicit and final design QA says `passed`.
