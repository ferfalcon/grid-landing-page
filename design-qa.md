# Design QA

## Comparison target

- Source visual truth: `SRC-DS-001` plus immutable references in `docs/design/`.
- Rendered implementation: local production preview `SRC-RUN-002` for `SRC-REPO-003` at commit `dde476d703b3416214943e2c6968cabcb874947f`.
- Route/theme: `/`, default brand presentation.
- Capture browser: bundled Chromium 1234, production preview, device scale factor 1.
- Evidence: `design-qa/browser-evidence-v1.json`, `design-qa/interaction-evidence-v1.json`, `design-qa/keyboard-evidence-v1.json`, `design-qa/hover-evidence-v1.json`, and `design-qa/zoom-evidence-v1.json`.

## Viewports, dimensions, and normalization

| Target | Source pixels | Implementation pixels | CSS viewport | Density | States |
|---|---:|---:|---:|---:|---|
| Desktop | 1440 × 800 | 1440 × 800 | 1440 × 800 | 1 | Closed, open, first-card hover |
| Tablet | 768 × 1336 | 768 × 1336 | 768 × 1336 | 1 | Closed, open |
| Mobile | 375 × 1816 | 375 × 1816 | 375 × 1816 | 1 | Closed, open |
| Narrow edge | N/A | 320 × 1000 viewport | 320 × 1000 | 1 | Closed; full document reflow |

All pairs use equal crops and density. No browser chrome, canvas padding, or device frame is included.

## Full-view comparison evidence

Each file places the source on the left and implementation on the right:

- `design-qa/comparison-desktop-closed-v1.png`
- `design-qa/comparison-desktop-open-v1.png`
- `design-qa/comparison-desktop-hover-v1.png`
- `design-qa/comparison-tablet-closed-v1.png`
- `design-qa/comparison-tablet-open-v1.png`
- `design-qa/comparison-mobile-closed-v1.png`
- `design-qa/comparison-mobile-open-v1.png`

The full-view pass confirms the 72px header, desktop 45/55 split, 396 × 328 card tracks at 1440px, 536px tablet hero, 2 × 2 tablet grid, 342px mobile hero, stacked 328px cards, 72/88px footer behavior, scrim, and menu geometry.

## Focused comparison evidence

- `design-qa/focus-desktop-hero-v1.png`: Inter typography, H1 wrapping, body line length, spacing, blue-200 copy.
- `design-qa/focus-desktop-cards-v1.png`: exact icons, value alignment, labels, descriptions, borders, 2 × 2 rhythm.
- `design-qa/focus-desktop-menu-v1.png`: close icon, 396px panel alignment, label scale and spacing.

Additional focused crops were unnecessary because the mobile and tablet full-resolution pairs keep typography, icons, and borders legible at 1:1 density.

## Required fidelity surfaces

- Fonts and typography: Pass. Supplied Inter variable TTF, local 400–500 weights, `font-display: swap`; 60/63.6px H1 on tablet/desktop and 44/46.64px on mobile. Hierarchy, wrapping, line height, letter spacing, and small-copy weights match. JPEG/browser antialiasing drift is expected and not actionable.
- Spacing and layout rhythm: Pass. Frame dimensions, hero alignment, 48/32/24px padding, card tracks, dividers, footer placement, and menu panels match. No radii, shadows, or extra surfaces were introduced.
- Colors and tokens: Pass. Computed blue-700 `#2854fe`, blue-600 `#325cff`, blue-400 `#4784ff`, blue-200 `#e4ebff`, white, and 25% black scrim. White/blue-700 contrast is 5.54:1; blue-200/blue-700 is 4.65:1.
- Image quality and asset fidelity: Pass. Exact supplied favicon, menu/close SVGs, statistic SVGs, Inter bytes, and OFL license. No expiring URLs, CSS drawings, emoji, placeholders, or handcrafted substitutes.
- Copy/content: Pass. Hero, statistics, footer, and menu order match. Menu labels remain plain text under the approved no-destination policy.
- Icons/states: Pass. Menu icons switch correctly. Blue-600 hover visually matches. Headless Chromium exposes no fine pointer, so the token was visually exercised by DevTools override while the actual `(hover: hover) and (pointer: fine)` gate was verified in built CSS.
- Responsiveness/accessibility: Pass. No horizontal overflow at 320px; heights grow. Breakpoints reflow at 48rem and 80rem. Focus/forced-colors support, skip link, native button, 44px target, inert restoration, and non-focusable labels pass.

## Primary interactions and browser checks

- Pointer open/close, Escape and scrim close, focus return, and open-state resize passed.
- Native Enter opens the focused toggle; Escape closes and preserves toggle focus.
- `aria-expanded`, open/close name, `hidden`, main/footer `inert`, and scroll lock transition correctly.
- First Tab focuses the visible skip link.
- All five labels are `LI` with `tabIndex=-1`.
- Browser console/runtime findings: none.
- Remote resources: none; fonts and visible assets are local.
- 200%-effective reflow at a 1440-physical-pixel equivalent passed with no horizontal overflow.

## Findings

No actionable P0, P1, or P2 visual, responsive, interaction, content, icon, or accessibility differences remain.

## Open Questions

- Figma's menu-link hover variant remains intentionally unimplemented because destinations do not exist. This is approved `DEV-001`, not a defect.

## Comparison history

### Pass 1 — final production-preview comparison

- Earlier P0/P1/P2 findings: none.
- Fixes made in response: none; the first normalized paired pass matched.
- Post-fix evidence: not applicable.
- Excluded troubleshooting: an early development-server capture contained Astro's toolbar and was discarded before normalized production-preview comparison.

## Implementation Checklist

- [x] Desktop closed/open/hover visuals match.
- [x] Tablet and mobile closed/open visuals match.
- [x] Focused typography, card, icon, and menu comparisons pass.
- [x] Breakpoint, 320px, and resize geometry pass.
- [x] Pointer, keyboard, Escape, scrim, focus, inert, and scroll-lock checks pass.
- [x] Console, resources, diagnostics, and build pass.
- [x] No P0/P1/P2 findings remain.

## Follow-up Polish

No P3 polish item is required.

## Final result

final result: passed
