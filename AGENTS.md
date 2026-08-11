# Repository Guidelines

## Project Structure & Module Organization

The production site is the Astro 7 project in `frontend/`. Add routes to `src/pages/`, reusable UI to `src/components/`, and page shells to `src/layouts/`. Imported images belong in `src/assets/`; files served unchanged belong in `public/`.

`docs/design/` and `docs/initial-code/` are references, not production code. `docs/implementation-workflow/` is a separate Node toolkit with its own CLI, schemas, templates, fixtures, and tests.

## Local Runtime & DDEV

This WSL environment uses NVM from `/home/fer/.nvm`; its default Node 24 satisfies the required Node 22.12+. Non-interactive shells may not load NVM and can resolve `npm` to Windows. Before running package commands, use `. /home/fer/.nvm/nvm.sh && nvm use default`, then confirm `node --version` and `pnpm --version` use Linux binaries. DDEV v1.25.2 is installed globally, but this repository has no `.ddev/config.yaml`; run the Astro app directly, not through DDEV.

## Build, Test, and Development Commands

Run site commands from `frontend/`:

- `pnpm install` installs locked dependencies.
- `pnpm dev` starts Astro at `http://localhost:4321`; agents should prefer `pnpm astro dev --background` and manage it with `pnpm astro dev status|logs|stop`.
- `pnpm build` creates the production build in `frontend/dist/`.
- `pnpm preview` serves that build for final browser checks.
- `pnpm astro check` performs Astro/TypeScript diagnostics.

For the workflow toolkit, run `npm run validate` from `docs/implementation-workflow/`; focused scripts include `npm run test:records`, `test:state`, and `test:cli`.

## Coding Style & Naming Conventions

Use two-space indentation, semicolons in JavaScript/TypeScript, and strict TypeScript settings. Name Astro components and layouts in PascalCase (`FeatureCard.astro`), routes in lowercase (`about.astro`), and CSS classes in descriptive kebab-case. Prefer semantic HTML, mobile-first CSS, custom properties for repeated design tokens, and component-scoped styles. No formatter or linter is configured, so follow the surrounding file style and keep changes focused.

## Testing Guidelines

There is no frontend unit-test framework or coverage threshold yet. Before submitting UI changes, run `pnpm astro check` and `pnpm build`, then compare desktop/mobile layouts and hover, focus, and menu states with `docs/design/`. Workflow tests are plain Node scripts; add fixtures under `docs/implementation-workflow/tests/fixtures/` when changing validation behavior.

## Commit & Pull Request Guidelines

Recent history favors short, imperative subjects, often with Conventional Commit prefixes such as `feat:` or `doc:`. Keep each commit single-purpose. Pull requests should explain the change, list verification commands, link relevant issues, and include before/after screenshots for visual changes. Do not commit `dist/`, `.astro/`, `node_modules/`, environment files, or local workspace settings.
