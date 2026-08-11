# Source Baseline

## 1. State Ownership Mode

- [x] CLI-managed — `.workflow/workflow-record.json` owns snapshot identity, status, role, pin strength, and lineage.
- [ ] Markdown-only

Generated source state is read from `.workflow/generated/SOURCE-INDEX.md`; this file owns scope, evidence, reproduction, authority, and limitations.

## 2. Document Information

- Status: Approved
- Project: Bridge Collective landing page
- Created: 2026-08-11
- Last updated: 2026-08-11
- Owner: Codex
- Related context: `PROJECT-CONTEXT.md`
- Operational state: `WORKFLOW-STATE.md`

## 3. Design Source Evidence

### SRC-DS-001 — Bridge Collective Figma frames

- **Source type:** Figma design file, page `🤖 Workflow`.
- **Purpose:** Canonical visual composition, typography, spacing, color, responsive layout, and visible states.
- **Included scope:** Desktop default `6167:54` (1440×800), tablet default `6167:143` (768×1336), mobile default `6167:203` (375×1816), desktop/tablet/mobile menu-open frames `6167:260`, `6167:393`, and `6167:455`, stat hover `6167:554`, and menu-link hover `6167:596`.
- **Excluded scope:** Preview artwork and any frame outside the named workflow variants.
- **Inspected at:** 2026-08-11T16:04:39-03:00 with Figma design-context extraction and screenshots.
- **Version evidence:** Mutable file URL with exact node IDs; pin strength is honestly Time-bound.
- **Reproduction:** Open the Figma URL in the canonical registry and inspect each node above with the Figma design-to-code context tool.
- **Authority:** Current visual truth for geometry and raw tokens.
- **Limitations:** No immutable Figma version or menu destinations were provided. Temporary Figma asset URLs are not suitable for committed code.

## 4. Repository Source Evidence

### SRC-REPO-001 — Initial implementation repository

- **Repository:** `https://github.com/ferfalcon/grid-landing-page`
- **Relevant package:** `frontend/` Astro 7 project.
- **Commit:** `da910e51cac0f02b3ea06c4e51e7ae88c80da8ba`.
- **Remote parity:** `origin/HEAD` resolved to the same commit during baseline inspection.
- **Branch at capture:** `main`; implementation branch is `codex/bridge-collective-landing-page` from the same commit.
- **Captured at:** 2026-08-11T16:04:39-03:00.
- **Lockfile state:** `frontend/pnpm-lock.yaml` present; Node 24.18.0 and pnpm 11.9.0 are the Linux runtime.
- **Uncommitted patch:** `docs/implementation-workflow/ChatGPT-instructions.md` was already modified by the user and is separately pinned as `SRC-DOC-004`. It must remain unstaged and unmodified.
- **Build context:** The starter builds successfully. `astro check` requires the absent `@astrojs/check` and `typescript` development packages.
- **Known limitation:** Repository code and current runtime are starting-state evidence, not target-design authority.

## 5. Runtime Source Evidence

### SRC-RUN-001 — Current production deployment

- **Environment:** Production on Vercel.
- **URL:** `https://grid-landing-page-ferfalcon.vercel.app/`
- **Captured at:** 2026-08-11T16:04:39-03:00.
- **Evidence:** HTTP 200; rendered HTML identifies Astro 7.2.0, title `Astro Basics`, and the default Astro welcome screen.
- **Associated repository:** Matches `SRC-REPO-001` starter content.
- **Authority:** Current-state/runtime comparison only.
- **Known limitation:** Deployment is outside implementation scope and will remain unchanged.

## 6. Documentation Source Evidence

### SRC-DOC-001 — Product and repository guidance

- **Authority:** Normative for product behavior, repository boundaries, commands, and coding conventions.
- **Paths:** `README.md` and `AGENTS.md`.
- **SHA-256:** README `b48e745b32d1c48de7e3804300be981b4ed47ca45004221f06bcdc88d4aa93a0`; AGENTS `dac44b8c47a6be5f88ef9a26e7da57311b0d1a07002d4829d3fc8d595c4c6425`.
- **Limitation:** README describes goals, not exact implementation geometry.

### SRC-DOC-002 — Design style guide

- **Authority:** Normative for semantic color roles, source widths, and type presets.
- **Path:** `docs/design/style-guide.md`.
- **SHA-256:** `35a5725224b6055a327d3c156ebe07cb1e42a361a709e2b3d65bdd0e38672517`.
- **Limitation:** Its HSL blue-700 differs slightly from current Figma raw hex; the Figma value wins for visual fidelity.

### SRC-DOC-003 — Initial content reference

- **Authority:** Normative for copy, labels, content order, and supplied asset references.
- **Path:** `docs/initial-code/index.html`.
- **SHA-256:** `cd71efb4a1bcdcdb031171f3bc91612e02629d6b1b645e5e8e69bcc930376db8`.
- **Limitation:** It is reference code, not production code, and does not define menu URLs.

### SRC-DOC-004 — User-updated workflow prompt

- **Authority:** Normative for source locations and implementation intent in this task.
- **Path:** `docs/implementation-workflow/ChatGPT-instructions.md`.
- **Working-tree SHA-256:** `d62952028d76dc6cd842cc8e08cad93349311b4c37217f61884146833a8383a3`.
- **Limitation:** This is an uncommitted user-owned edit. Its checksum pins the inspected content without staging or claiming it belongs to `SRC-REPO-001`.

## 7. Asset Source Evidence

### SRC-ASSET-001 — Immutable design image bundle

All files are progressive JPEG references.

| File | Dimensions | SHA-256 |
|---|---:|---|
| `desktop-design.jpg` | 1440×800 | `0ed9fa89fe260465a962d7168d30822b8095c52c1ce3736b3fda8f0014f980ee` |
| `mobile-design.jpg` | 375×1816 | `a1ba7d0a7ef610d800f197bb718de4cabb0047482cb9882f818639e41d7ed5c5` |
| `active-states.jpg` | 1440×800 | `6fb667b98550b1c8d598ba3eb47e94cc67dafcc62e03694b9327c2826f68ba1d` |
| `active-states-menu-open.jpg` | 1440×800 | `a7f41dc5ec1920c012f6ff4e5dbc31366de0be794eafc1617105e51f5fb2e4e1` |
| `active-states-menu-open-hover.jpg` | 1440×800 | `2f33a3f977d3dcd3930afea3a7a675f229ceabeacae6a36dc7f27e9dd9cf3c99` |
| `active-states-menu-open-mobile.jpg` | 375×1816 | `faaeaac53f6ac6019f1b24738717f943f49bdf171b53e7a5b552fcc054473211` |

These images are immutable visual anchors when the Figma file later changes. They omit a tablet screenshot, supplied instead by `SRC-DS-001`.

### SRC-ASSET-002 — Production-ready asset bundle

- **Contents:** Inter variable TTF, SIL OFL 1.1 text, 32px favicon, menu/close icons, and four statistic SVG icons.
- **Font SHA-256:** `29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031`.
- **License SHA-256:** `5b9321a4298cfeb6b34354164a1c3afc3db114569984c502b9b35d988fd58c57`.
- **Icon SHA-256 values:** menu `272165…`, close `38c68f…`, sparkle `cf57dd…`, plus `49d6d9…`, arrow `27a439…`, trending `99dc00…`.
- **Licensing:** Inter may be used and redistributed under SIL OFL 1.1; the license copy must accompany the redistributed font in the repository.

## 8. Source Authority and Conflict Resolution

1. Current user decisions.
2. Product behavior and confirmed copy in `SRC-DOC-001`/`SRC-DOC-003`.
3. Figma visual intent in `SRC-DS-001`.
4. Style-guide semantic roles in `SRC-DOC-002`.
5. Hashed screenshots in `SRC-ASSET-001`.
6. Current repository/runtime state in `SRC-REPO-001`/`SRC-RUN-001`.
7. Explicitly labeled inference and recommendation.

Resolved conflicts: use Figma `#2854fe` for blue-700; keep all five menu labels non-actionable because no destination exists; do not implement the link-hover frame until URLs are supplied.

## 9. Verification Log

| Date and time | Snapshots | Method | Classification | Change | Action |
|---|---|---|---|---|---|
| 2026-08-11T16:04:39-03:00 | All input snapshots | Figma context, SHA-256, Git commit/remote comparison, HTTP fetch, file inspection | Unchanged baseline | No | Approved for documentation and task creation |

## 10. Baseline Review

### Pass 1 — Completeness and correctness

- [x] Every material source has an ID and evidence section.
- [x] Exact scope, capture time, checksums, and repository SHA are recorded.
- [x] Mutable sources are not labeled immutable.
- [x] User-owned uncommitted content is distinguished from the repository commit.

### Pass 2 — Consistency, traceability, source integrity, risks, and uncertainty

- [x] Generated source state is canonical and current.
- [x] Target-design sources are distinguished from current-state sources.
- [x] Conflicts and approved resolutions are explicit.
- [x] No artifact relies on an undefined source.

