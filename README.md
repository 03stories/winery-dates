# Web App Template (Vite + React + TypeScript)

A GitHub template repository for modern web apps with production-ready defaults: strict TypeScript, linting, formatting, tests, CI, and GitHub Pages deploy + PR previews.

## New repo in 3 minutes

1. Click **Use this template** on GitHub.
2. Clone your new repo and install dependencies:
   ```bash
   nvm use
   npm ci
   ```
3. Update placeholders:
   - `.github/CODEOWNERS`
   - `LICENSE` copyright line
   - `SECURITY.md` contact email
4. Push to `main`.
5. Configure GitHub Pages + Actions permissions + repo variable (steps below).

## Local development

```bash
npm run dev
npm run typecheck
npm run lint
npm run test
npm run build
```

## Stack and defaults

- Vite + React + TypeScript
- React Router with nested routes and 404 page
- Tailwind CSS (lightweight token setup)
- ESLint + Prettier
- Vitest + Testing Library + jsdom
- Husky + lint-staged pre-commit hook
- `@/*` import alias to `src/*`

## Base path strategy (single source of truth)

- `VITE_BASE_PATH` is read and normalized in `src/config/env.ts`.
- Vite `base` uses `process.env.VITE_BASE_PATH` in `vite.config.ts`.
- Router `basename` derives from the same normalized value in `src/router.tsx`.

This keeps asset paths and route resolution aligned.

## Environment variables

Copy `.env.example` to `.env` when needed:

```bash
cp .env.example .env
```

Variables:

- `VITE_BASE_PATH` (for app base path, usually managed by workflows)
- `VITE_API_URL` (example API endpoint)

## GitHub Pages setup

1. Open **Settings -> Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Select branch **`gh-pages`** and folder **`/ (root)`**.
4. Open **Settings -> Actions -> General**.
5. Set **Workflow permissions** to **Read and write permissions**.
6. Open **Settings -> Secrets and variables -> Actions -> Variables**.
7. Add repository variable `PAGES_BASE_PATH`:
   - Project Pages: `/<repo>/` (example: `/my-app/`)
   - Custom domain at root: `/`

## Deploy workflows

### Production deploy

- Workflow: `.github/workflows/deploy-pages.yml`
- Trigger: push to `main` or manual dispatch
- Deploy target: `gh-pages` root
- Uses `clean: true` and preserves `pr-preview/` via `clean-exclude`

### PR previews

- Workflow: `.github/workflows/pr-preview.yml`
- Trigger: PR opened/reopened/synchronize/closed
- Preview path format:
  - `${PAGES_BASE_PATH}pr-preview/pr-<PR#>/`
  - Example: `/my-app/pr-preview/pr-42/`
- On PR close, preview is removed automatically.

## Custom domain later

When moving to a custom domain at `/`:

1. Set `PAGES_BASE_PATH` repo variable to `/`.
2. Keep workflows unchanged.
3. Optional: add `CNAME` handling in `gh-pages` publishing flow if needed.

## Troubleshooting

### Assets 404 on Pages

- Confirm `PAGES_BASE_PATH` matches your deployment style (`/<repo>/` vs `/`).
- Confirm build in workflows receives `VITE_BASE_PATH` from resolved output.

### Routes break on refresh

- Ensure router basename derives from normalized base path in `src/router.tsx`.
- Confirm deployed URL includes expected base prefix.

### Preview/prod conflicts

- Prod workflow preserves `pr-preview/` with `clean-exclude`.
- Verify both workflows deploy to branch `gh-pages`.

## What to change first in new repos

- App name/title in `index.html`
- Navigation/routes/pages in `src/`
- Theme tokens in `src/styles.css`
- API settings in `.env` and `src/config/env.ts`
