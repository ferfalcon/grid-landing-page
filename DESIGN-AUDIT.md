---
artifact: DESIGN-AUDIT
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

# Design Audit

## 1. Purpose and Scope

This audit records the evidence later requirements, design decisions, specifications, and validation must use. It covers the Bridge Collective `/` page at desktop, tablet, and mobile; closed/open navigation states; stat hover; supplied copy/assets; and accessibility implications. It excludes implementation decisions, new pages, invented destinations, backend behavior, and deployment.

Evidence classifications are **Confirmed** (user or normative product source), **Observed** (directly visible), **Inferred**, **Recommended**, and **Open question**.

## 2. Screen and State Inventory

| ID | Snapshot | State | Figma node | Viewport | Evidence |
|---|---|---|---|---:|---|
| DS-001 | SRC-DS-001 | Desktop default | `6167:54` | 1440×800 | EVD-001 |
| DS-002 | SRC-DS-001 | Tablet default | `6167:143` | 768×1336 | EVD-002 |
| DS-003 | SRC-DS-001 | Mobile default | `6167:203` | 375×1816 | EVD-003 |
| DS-004 | SRC-DS-001 | Desktop menu open | `6167:260` | 1440×800 | EVD-004 |
| DS-005 | SRC-DS-001 | Tablet menu open | `6167:393` | 768×1336 | EVD-005 |
| DS-006 | SRC-DS-001 | Mobile menu open | `6167:455` | 375×1816 | EVD-006 |
| DS-007 | SRC-DS-001 | Statistic active/hover | `6167:554` | Component state | EVD-007 |
| DS-008 | SRC-DS-001 | Menu label hover | `6167:596` | Component state | EVD-008 |

The design demonstrates a menu reveal but no destination or connected flow for its five labels. That absence is resolved by the user decision recorded in `WORKFLOW-STATE.md`.

## 3. Content Hierarchy

- **Observed, EVD-001–003:** A 72px site header leads into one hero statement, one supporting paragraph, four statistics, and a compact legal footer.
- **Confirmed, SRC-DOC-003:** Brand, headline, paragraph, statistic values/labels/descriptions, menu labels, and footer copy are fixed source content.
- **Observed:** The headline is the dominant topic and should become the single H1. Statistics are one repeated group rather than four independent page sections.
- **Observed:** Desktop reading order is hero, top-left stat, top-right stat, bottom-left stat, bottom-right stat, then footer. Mobile uses the same order in a single column.

## 4. Layout and Responsive Evidence

| Evidence | Layout | Key measurements and behavior |
|---|---|---|
| EVD-001 | Desktop | Header/footer 72px; content 656px; hero 45% (648px) and statistics 55% (792px); statistic grid 2×2, each 396×328; outer/hero padding 48px. |
| EVD-002 | Tablet | Header/footer 72px; hero 536px with 48px padding; 2×2 statistic grid, each approximately 384×328. |
| EVD-003 | Mobile | Header 72px; hero 342px with 32px inline/56px block padding; four stacked 328px cards with 24px padding; footer 88px and stacked lines. |

- **Observed:** Desktop H1 is 60px; tablet retains 60px; mobile uses 44px.
- **Observed:** The desktop composition only appears when the hero and two statistic columns can coexist. Tablet keeps hero above a two-column grid. Mobile becomes one column.
- **Recommended:** Treat reference heights as minimums outside exact source sizes so text scaling and narrower widths cannot clip content.
- **Recommended:** Use evidence-backed transitions at 48rem and 80rem, then validate both sides and intermediate widths.

## 5. Visual System

| Token or preset | Observed value | Evidence |
|---|---|---|
| Blue 700 | `#2854fe` | EVD-001, Figma raw token |
| Blue 600 hover | `#325cff` | EVD-007 |
| Blue 400 border | `#4784ff` | EVD-001–006 |
| Blue 200 secondary text | `#e4ebff` | EVD-001–006 |
| Neutral 0 | `#ffffff` | All frames |
| Scrim | Black at 25% opacity | EVD-004–006 |
| Font | Inter variable, weights 400/500 | SRC-DOC-002, SRC-ASSET-002 |
| H1 desktop/mobile | 60/44px, 1.06 line height, -2px tracking, weight 500 | EVD-001–003 |
| Body | 17px, 1.65, weight 400 | EVD-001–003 |
| Stat value | 36px, 1.11, weight 500 | EVD-001–003 |
| Stat label | 17px, 1.65, weight 500 | EVD-001–003 |
| Small text | 14px, 1.42, -0.25px tracking for descriptions | EVD-001–003 |

**AUD-001 — Token conflict:** `SRC-DOC-002` expresses blue-700 as an HSL value that does not exactly reproduce current Figma `#2854fe`. Impact: visible palette drift. Classification: Observed. Resolution belongs to design intent and is not silently applied here.

## 6. Components and Assets

- **Observed:** Header, hero, statistic card, statistic grid, footer, scrim, and responsive menu panel are the reusable visual units.
- **Observed:** Every statistic uses the same layout: 32px exported icon, right-aligned value, label, then secondary description.
- **Available:** Exact menu/close and statistic SVGs, favicon, Inter TTF, and OFL license in `SRC-ASSET-002`.
- **Observed:** No raster hero image, illustration, shadow, radius, or gradient appears in the target.
- **Required asset behavior:** SVGs are decorative where adjacent text provides meaning; icon dimensions are explicit to prevent layout shift.

## 7. Interaction and State Evidence

- **Observed, EVD-004–006:** The header remains undimmed. A black 25% scrim covers content below the header. The panel is blue-700.
- **Observed:** Desktop and tablet use a 396px right panel from y=72 to viewport bottom; mobile uses a full-width panel with a 342px target height while the scrim continues over content below.
- **Observed:** Desktop/tablet labels are right-aligned; mobile labels are centered. Labels use 32px/1.6/-2px type.
- **Observed, EVD-007:** A statistic card changes from blue-700 to blue-600 for its active pointer state.
- **Observed, EVD-008:** Figma underlines a hovered menu label.
- **Confirmed user decision:** Menu labels remain non-actionable, so EVD-008 is documented but not implemented in this scope.

## 8. Accessibility Observations

- **AUD-002 — Missing focus design:** No keyboard focus appearance is shown. Impact: source is insufficient to prove focus visibility. Classification: Observed; a high-contrast outline is Recommended.
- **AUD-003 — Modal-like panel:** The scrim and blocked background imply modal behavior, but focus, Escape, light-dismiss, and scroll behavior are not annotated. Classification: Inferred; native button state, inert background, Escape, scrim dismissal, and focus restoration are Recommended.
- **AUD-004 — Touch target:** Exported menu/close glyphs are 24px, smaller than a practical touch target. Classification: Observed; retain the glyph but enlarge the button target.
- **AUD-005 — Reflow:** Fixed reference heights do not prove 320px or 200% zoom support. Classification: Open design evidence; content-driven minimum heights are Recommended.
- **Observed:** White/blue text hierarchy is visually clear; implementation must verify contrast rather than assuming compliance from the image.

## 9. Current-State Findings

- **AUD-006 — Starter mismatch:** `SRC-REPO-001` and `SRC-RUN-001` contain Astro starter content, not the target. Classification: Observed; both are current-state baselines only.
- **AUD-007 — Tablet screenshot gap:** Immutable local JPGs omit tablet, while Figma provides explicit tablet frames. Classification: Observed; use the time-bound Figma frame plus desktop/mobile immutable anchors.
- **AUD-008 — Font delivery:** The supplied authoritative font is TTF rather than WOFF2. Classification: Observed; use it locally under its OFL license and record the transfer-size limitation.

## 10. Evidence Index

| Evidence ID | Snapshot | Source reference | Summary | Used by |
|---|---|---|---|---|
| EVD-001 | SRC-DS-001/SRC-ASSET-001 | `6167:54`, `desktop-design.jpg` | Desktop default geometry and tokens | REQ-DR-001, DES-001, AC-002 |
| EVD-002 | SRC-DS-001 | `6167:143` | Tablet geometry | DES-RWD-001, AC-002 |
| EVD-003 | SRC-DS-001/SRC-ASSET-001 | `6167:203`, `mobile-design.jpg` | Mobile geometry | DES-RWD-001, AC-002 |
| EVD-004 | SRC-DS-001/SRC-ASSET-001 | `6167:260`, desktop menu JPG | Desktop menu open | DES-INT-001, AC-003 |
| EVD-005 | SRC-DS-001 | `6167:393` | Tablet menu open | DES-INT-001, AC-003 |
| EVD-006 | SRC-DS-001/SRC-ASSET-001 | `6167:455`, mobile menu JPG | Mobile menu open | DES-INT-001, AC-003 |
| EVD-007 | SRC-DS-001/SRC-ASSET-001 | `6167:554`, `active-states.jpg` | Stat hover fill | DES-INT-002, AC-004 |
| EVD-008 | SRC-DS-001/SRC-ASSET-001 | `6167:596`, hover JPG | Deferred menu-link hover | REQ-CON-002 |

## 11. Source Verification and Review

- Verification: Figma design context for desktop/mobile/menu nodes, screenshots for all named frames, SHA-256 checks for local references, and source-code inspection.
- Newer source content detected: No.
- Blocking questions: None.

### Pass 1 — Completeness and correctness

- [x] All agreed frames, states, components, assets, and viewports were inspected.
- [x] Material observations cite precise evidence.
- [x] Accessibility implications and missing evidence are recorded.

### Pass 2 — Consistency, integrity, risks, and uncertainty

- [x] Confirmed, observed, inferred, recommended, and deferred information remain distinct.
- [x] No destination, route, or unsupported business behavior was invented.
- [x] Evidence IDs and snapshot references are internally consistent.
- [x] Ready for requirements: Yes.

