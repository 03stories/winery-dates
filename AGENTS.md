# AGENTS.md

## Project mission

Winery Dates is a React + TypeScript web app for discovering Georgia wineries for date night, with filtering and a planner dashboard.

## Tech stack and tooling

- Vite + React 18 + TypeScript (strict mode)
- React Router (`createBrowserRouter`)
- Tailwind CSS + shared utility components
- Vitest + Testing Library for tests
- ESLint + Prettier + Husky/lint-staged
- Node version: use `.nvmrc` (`>=22 <23` is required by `package.json`)

## Important paths

- `src/pages/` route-level UI
- `src/layouts/` shared layout wrappers
- `src/router.tsx` route tree and basename handling
- `src/config/env.ts` runtime env normalization
- `vite.config.ts` build-time base-path normalization
- `src/data/wineries.ts` primary winery dataset
- `GA_Wineries.md` source list for winery entries

## Local workflow

1. `nvm use`
2. `npm ci`
3. `npm run dev`

For new work, use this default git flow:

1. Create a new branch from `main`.
2. Implement the change.
3. Commit with a clear message.
4. Open a pull request to `main`.

Before finishing a change, run:

- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run build`

## Agent working agreement

- Keep changes focused and minimal; avoid broad refactors unless requested.
- Preserve strict TypeScript safety (no `any` shortcuts).
- Prefer `@/` imports for code in `src/`.
- Reuse existing components (`Card`, `Button`, layouts) before adding new abstractions.
- For behavior changes, add/update tests in the nearest `*.test.ts` or `*.test.tsx` file.
- For UI changes, include a screenshot in PRs (matches the repository PR checklist).

## Data update rules (`src/data/wineries.ts`)

- Keep each object aligned with `Winery` type fields:
  `id`, `name`, `address`, `phone`, `website`, `hours`, `rating`, `outsideFoodPolicy`, `outsideFoodCost`, `maps`.
- `id` must be unique, lowercase kebab-case, and stable (do not rename existing IDs casually).
- Keep ratings numeric (e.g. `4.6`), not strings.
- Use `outsideFoodCost: 'N/A'` when policy disallows outside food; otherwise use a human-readable value like `'Free'`.
- When adding/updating wineries, cross-check against `GA_Wineries.md` for consistency.

## Routing and base-path guardrails

Base-path handling is implemented in two places and should stay in sync:

- `src/config/env.ts` (`normalizeBasePath`, used by runtime router config)
- `vite.config.ts` (`normalizeBasePath`, used by build output base)

If you change base-path behavior, update both locations and corresponding tests (`src/config/env.test.ts`), then verify navigation under both `/` and a subpath-style base.

## Definition of done

- Requested behavior is implemented.
- Relevant tests are updated and passing.
- Typecheck, lint, tests, and build pass locally.
- Documentation updated when behavior or workflow expectations changed.
