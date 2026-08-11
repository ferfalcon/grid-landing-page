---
artifact: IMPLEMENTATION-BRIEF
status: Approved
baseline:
  design: [SRC-DS-001]
  repository: [SRC-REPO-001]
  runtime: [SRC-RUN-001]
  documentation: [SRC-DOC-001, SRC-DOC-002, SRC-DOC-003, SRC-DOC-004]
  assets: [SRC-ASSET-001, SRC-ASSET-002]
created: 2026-08-11
updated: 2026-08-11
---

# Implementation Brief

## 1. Document Information

- Status: Approved
- Scope: Replace the Astro starter `/` route with the responsive Bridge Collective landing page and accessible open/close menu.
- Project context: `PROJECT-CONTEXT.md`
- Source baseline: `SOURCE-BASELINE.md`
- Evidence baseline: `DESIGN-AUDIT.md`
- Repository baseline: `SRC-REPO-001`

## 2. Goals and Non-goals

Goals: accurate supplied copy/assets; faithful 1440/768/375 compositions; resilient responsive behavior; accessible navigation toggle; stat hover; static, minimal-JavaScript Astro output; traceable validation.

Non-goals: navigation destinations, extra routes, backend/API/data work, analytics, persistence, content invention, Figma edits, production deployment, or a new frontend test framework.

## 3. Requirements

### REQ-FR-001 — Render confirmed landing-page content

- **Classification:** Confirmed functional requirement; Must.
- **Description:** Render brand, hero copy, four statistics in source order, and footer copy from `SRC-DOC-003`, using the supplied icons and font.
- **Evidence:** SRC-DOC-003, SRC-ASSET-002, EVD-001–003.
- **Acceptance:** AC-001, AC-002.

### REQ-FR-002 — Toggle the responsive menu

- **Classification:** Confirmed functional requirement; Must.
- **Description:** A native header button opens and closes the source-matched panel at every supported viewport. Button, Escape, and scrim close it.
- **Evidence:** SRC-DOC-001, EVD-004–006.
- **Acceptance:** AC-003, AC-005.

### REQ-DR-001 — Match the current design system

- **Classification:** Confirmed design requirement; Must.
- **Description:** Match Figma hierarchy, layout, tokens, typography, borders, overlay, panel, and supplied states without importing Tailwind or approximating assets.
- **Evidence:** SRC-DS-001, SRC-ASSET-001, SRC-ASSET-002, AUD-001–008.
- **Acceptance:** AC-001, AC-002, AC-004.

### REQ-NFR-001 — Reflow without loss

- **Classification:** Confirmed non-functional requirement; Must.
- **Description:** Preserve source layouts at 375, 768, and 1440 while avoiding clipping/overlap/horizontal scrolling at 320px, intermediate widths, boundary widths, shorter heights, and 200% zoom.
- **Evidence:** SRC-DOC-001, EVD-001–003, AUD-005.
- **Acceptance:** AC-002, AC-005.

### REQ-NFR-002 — Accessible structure and interaction

- **Classification:** Recommended resolution of source gaps; Must.
- **Description:** Provide semantic landmarks, one H1, list semantics, skip link, native control semantics, visible focus, accurate expanded state, inert background while open, touch target, keyboard operation, and decorative asset treatment.
- **Evidence:** SRC-DOC-001, AUD-002–005, approved modern-web accessibility guidance.
- **Acceptance:** AC-003, AC-005.

### REQ-NFR-003 — Static and minimal runtime

- **Classification:** Confirmed technical expectation; Must.
- **Description:** Emit static Astro HTML/CSS with only the menu controller, local font/assets, no framework island, no remote Figma URL, and no broken network request.
- **Evidence:** SRC-REPO-001, SRC-DOC-001, SRC-ASSET-002.
- **Acceptance:** AC-006.

### REQ-CON-001 — Respect repository conventions

- **Classification:** Confirmed constraint.
- **Description:** Use Astro 7, two-space indentation, semicolons in TypeScript, strict typing, mobile-first CSS, reusable custom properties, and component-scoped styles. Add only the diagnostics packages needed by the prescribed checks.
- **Evidence:** SRC-DOC-001, SRC-REPO-001.
- **Acceptance:** AC-006, AC-007.

### REQ-CON-002 — Menu labels are visual-only

- **Classification:** Confirmed user decision.
- **Description:** Render About, Our Work, Partners, Annual Report, and Donate as plain list text without URL, button semantics, pointer cursor, keyboard focus, or the link-hover underline.
- **Evidence:** User decision, EVD-008, Q-001.
- **Acceptance:** AC-003, AC-005.

### REQ-CON-003 — Preserve user-owned work

- **Classification:** Confirmed repository constraint.
- **Description:** Do not modify or stage the pre-existing `SRC-DOC-004` working-tree patch.
- **Acceptance:** AC-007.

## 4. Design Intent

### DES-001 — Preserve the austere grid system

- **Intent:** A single saturated blue plane, fine blue borders, white/blue text, no radius/shadow/gradient, and strong typographic hierarchy communicate clarity and institutional confidence.
- **Evidence:** EVD-001–007.
- **Requirements:** REQ-DR-001, REQ-FR-001.
- **Decision:** Figma `#2854fe` is canonical blue-700; style-guide roles remain the semantic naming source.

### DES-RWD-001 — Three source-supported layout modes

- **Intent:** Mobile (<48rem) stacks hero and four cards; tablet (≥48rem) keeps hero above a 2×2 grid; desktop (≥80rem) places the hero left and the 2×2 grid right. Exact reference sizes are reproduced, while minimum heights permit content growth.
- **Evidence:** EVD-001–003.
- **Requirements:** REQ-NFR-001, REQ-DR-001.

### DES-INT-001 — Modal-like navigation overlay

- **Intent:** Header remains visible; everything below is dimmed/inert; menu panel aligns exactly to the source. Desktop/tablet panel is 396px wide and right-aligned; mobile panel is full width and at least 342px tall.
- **Evidence:** EVD-004–006, AUD-003.
- **Requirements:** REQ-FR-002, REQ-NFR-002, REQ-CON-002.

### DES-INT-002 — Statistic pointer state

- **Intent:** Every stat card uses blue-600 on hover only when the device can genuinely hover with a fine pointer. Cards remain non-focusable because they are not actions.
- **Evidence:** EVD-007.
- **Requirements:** REQ-DR-001.

## 5. Specification

### SPEC-BEH-001 — Menu state machine

- **References:** REQ-FR-002, REQ-NFR-002, DES-INT-001.
- **Closed:** Panel and scrim are hidden; button exposes `aria-expanded="false"` and menu icon; main/footer are not inert; body scroll is available.
- **Open:** Panel and scrim are visible; button exposes `aria-expanded="true"`, close label, and close icon; main/footer become inert; body scroll locks; focus remains on the toggle.
- **Close events:** Toggle activation, Escape, or pointer activation on the scrim. Closing restores background state and focus to the toggle.
- **Lifecycle edge case:** On Astro page-show restoration, initialize closed state so stale inert/scroll-lock attributes never persist.
- **Acceptance:** AC-003, AC-005.

### SPEC-BEH-002 — Pointer states

- **References:** REQ-DR-001, DES-INT-002, REQ-CON-002.
- **Observable behavior:** On `(hover: hover) and (pointer: fine)`, the hovered statistic changes to `#325cff`. Touch/coarse-pointer devices do not retain a sticky hover state.
- **Intentional omission:** Menu labels do not underline or imply action.
- **Acceptance:** AC-004.

### SPEC-INT-001 — DOM and component contract

- **References:** REQ-FR-001, REQ-CON-001, REQ-NFR-003.
- `Layout.astro` accepts typed `title` and `description` and owns metadata/global tokens.
- `SiteHeader.astro` owns brand, toggle, scrim/panel markup, label data, and its controller.
- `StatCard.astro` accepts typed value, label, description, and `ImageMetadata` icon props.
- `index.astro` owns the source-ordered `StatItem[]`, hero, stat list, and footer.
- Menu labels use `NavItem { label: string }` and contain no `href` field.
- **Acceptance:** AC-001, AC-006.

### SPEC-ACC-001 — Semantic and accessibility contract

- **References:** REQ-NFR-002, DES-INT-001.
- Use `header`, `main`, and `footer`; one H1; statistic `ul`/`li`; a visible-on-focus skip link targeting a programmatically focusable main.
- Toggle is `button type="button"`, at least 44×44px on coarse pointers, with `aria-controls`, `aria-expanded`, and visible text alternative.
- Decorative icons use `alt=""`; no ARIA is applied to plain menu-label text.
- Brand is a real `/` link. Only real controls/links receive focus and focus outlines.
- No animation is required, so reduced-motion users receive the same static state transitions.
- **Acceptance:** AC-005.

### SPEC-VAL-001 — Responsive sizing and validation

- **References:** REQ-NFR-001, DES-RWD-001.
- Reference checks: 375×1816, 768×1336, 1440×800.
- Edge checks: 320px, 767/768px, 1024px, 1279/1280px, short/tall viewports, and 200% zoom.
- Heights are `min-block-size` or content-driven except the fixed 72px header and source-aligned desktop content rows.
- **Acceptance:** AC-002, AC-005.

## 6. Acceptance Criteria

### AC-001 — Content and assets

All source copy, values, order, favicon, Inter font, and six supplied SVGs are present; no starter copy or approximate icon remains.

### AC-002 — Visual and responsive fidelity

Closed states at 1440×800, 768×1336, and 375×1816 visibly match EVD-001–003 for composition, geometry, type hierarchy, color, border, and footer behavior; edge widths reflow without loss.

### AC-003 — Menu behavior

Closed/open states match EVD-004–006; button, Escape, and scrim close; state attributes, icon, scroll lock, inert restoration, and resize behavior remain correct; labels are present but non-actionable.

### AC-004 — Hover behavior

All stat cards reproduce EVD-007 on fine pointers and do not create sticky touch states. Deferred EVD-008 behavior is absent by approved decision.

### AC-005 — Accessibility

Keyboard-only navigation reaches skip link, brand, and toggle in logical order; focus is visible; toggle naming/state are correct; background is unavailable while open; targets, contrast, zoom, and reflow checks pass.

### AC-006 — Diagnostics and build

`pnpm astro check` and `pnpm build` pass using Linux Node/pnpm. Preview has no console errors, broken assets, remote font/Figma dependencies, or unintended framework client runtime.

### AC-007 — Workflow and repository integrity

Workflow sync/semantic validation and toolkit tests pass; traceability reaches sources and task evidence; generated views are current; `SRC-DOC-004` remains unstaged and checksum-identical.

## 7. Repository Context

- Existing production files: `frontend/src/pages/index.astro`, `frontend/src/layouts/Layout.astro`, and starter `Welcome.astro`/starter assets.
- Proposed files: `frontend/src/components/SiteHeader.astro`, `StatCard.astro`, `frontend/src/styles/global.css`, and imported font/icon assets under `frontend/src/assets/`.
- Diagnostics dependencies: add `@astrojs/check` and `typescript` as dev dependencies and update the pnpm lockfile.
- Confirmed commands: `pnpm astro check`, `pnpm build`, background Astro dev commands, and `TMPDIR=/tmp npm run validate` for the workflow toolkit.
- Technical debt: no automated browser/unit test setup exists; browser interaction and visual evidence are required manually through the in-app browser.

## 8. Implementation Plan

### PLAN-001 — Prepare diagnostics and exact assets

- **References:** REQ-FR-001, REQ-NFR-003, REQ-CON-001; SPEC-INT-001.
- Add compatible diagnostics dev dependencies. Copy exact font, OFL, favicon, and SVG bytes from `SRC-ASSET-002` into production assets.
- Validate checksums for copied binary/vector assets.

### PLAN-002 — Build semantic page structure

- **References:** REQ-FR-001, REQ-DR-001, REQ-NFR-002; SPEC-INT-001, SPEC-ACC-001.
- Replace starter markup with typed layout/header/stat-card composition, confirmed copy, semantic landmarks/list, metadata, and local font/token layer.
- Remove unused starter component/assets from production source only.

### PLAN-003 — Implement navigation state

- **References:** REQ-FR-002, REQ-CON-002; SPEC-BEH-001, SPEC-ACC-001.
- Implement closed/open DOM state, icon/name/ARIA synchronization, Escape/scrim close, inert background, scroll lock, focus restoration, and page-show reset with a small vanilla TypeScript controller.

### PLAN-004 — Match responsive and state design

- **References:** REQ-DR-001, REQ-NFR-001, REQ-NFR-002; DES-RWD-001, DES-INT-001, DES-INT-002, SPEC-BEH-002, SPEC-VAL-001.
- Implement mobile-first component styles, 48rem/80rem transitions, exact source measurements, growth-safe minimum sizes, fine-pointer stat hover, focus/forced-colors support, and no unsupported menu-link affordance.

### PLAN-005 — Verify, correct, and record evidence

- **References:** All requirements; AC-001–007.
- Run diagnostics/build, preview in the in-app browser, capture all reference/edge states, test interaction/console, compare paired reference/implementation images, fix P0/P1/P2 drift, and complete workflow/design-QA records.

## 9. Architecture Decision

- Separate architecture needed: No.
- Reason: One static Astro route, build-time typed content, local assets, and transient menu state have no meaningful architecture, security, persistence, integration, migration, or operational decision. If those appear, stop and upgrade the profile instead of overloading Lite.

## 10. Source-change Handling and Risks

- Reverify `SRC-DS-001`, `SRC-REPO-001`, `SRC-DOC-004`, and asset checksums immediately before task start.
- A changed Figma frame, changed confirmed copy, new destinations, or an unexpected user modification in target production files invalidates the affected audit/brief section and requires a new `SRC-*` snapshot.
- Non-blocking risks: browser font antialiasing differences; TTF transfer size; no automated visual-test harness; production remains stale until a separately authorized deployment.
- Blocking questions: None.

## 11. Traceability

| Evidence | Requirement | Design | Specification/criterion | Plan | Validation |
|---|---|---|---|---|---|
| EVD-001–003 | REQ-FR-001, REQ-DR-001, REQ-NFR-001 | DES-001, DES-RWD-001 | SPEC-INT-001, SPEC-VAL-001, AC-001/002 | PLAN-001/002/004 | Visual captures, build |
| EVD-004–006 | REQ-FR-002, REQ-NFR-002 | DES-INT-001 | SPEC-BEH-001, SPEC-ACC-001, AC-003/005 | PLAN-003/004 | Interaction and open-state captures |
| EVD-007 | REQ-DR-001 | DES-INT-002 | SPEC-BEH-002, AC-004 | PLAN-004 | Fine-pointer hover capture |
| EVD-008, user decision | REQ-CON-002 | DES-INT-001 | SPEC-BEH-002, AC-003/005 | PLAN-003 | DOM/focus inspection |
| SRC-REPO-001, SRC-DOC-001 | REQ-CON-001/003, REQ-NFR-003 | DES-001 | SPEC-INT-001, AC-006/007 | PLAN-001/002/005 | Astro and workflow validation |

## 12. Adversarial Review

### Pass 1 — Completeness and correctness

- [x] Content, responsive, accessibility, state, asset, diagnostics, and validation behavior are specified.
- [x] All snapshot IDs exist and the repository baseline is accurate.
- [x] The work remains one coherent Lite task.
- **Correction:** Added page-show reset and content-driven minimum heights to cover restoration/zoom edge cases.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Every plan item maps to requirements/specifications and pinned sources.
- [x] Visual-only navigation is consistently represented in requirements, behavior, and validation.
- [x] Current-state runtime does not masquerade as target authority.
- [x] No blocking question or unsupported architecture decision remains.

## 13. Readiness

`Ready for task decomposition`

