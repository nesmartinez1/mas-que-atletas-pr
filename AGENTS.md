# Más Que Atletas PR — Agent Context

Marketing site for **Más Que Atletas PR Inc.**, a Puerto Rican non-profit that
runs soccer clinics for kids and youth (expanding to other sports over time).
Content is in **Spanish**. The site is intentionally **basic/static** for now —
no backend, no CMS, no auth.

## Tech stack

- **React 19 + TypeScript + Vite** (scaffolded from the Vite React-TS template).
- **react-router-dom v7** for routing (classic `<BrowserRouter>` + `<Routes>`,
  no data-router/loaders).
- **Plain per-component CSS** — each component/page has a sibling `.css` file
  imported directly (e.g. `Home.tsx` + `Home.css`). No Tailwind, no CSS Modules,
  no CSS-in-JS, no UI library, no state-management library.

## Running it (IMPORTANT env gotcha)

`node`/`npm` are **not on PATH by default** — they live under nvm and must be
sourced first in every shell:

```bash
export NVM_DIR="$HOME/.nvm"; \. "$NVM_DIR/nvm.sh"; nvm use v24.17.0
```

Then the usual scripts work:

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (strictest gate; `tsconfig.app.json`
  has `noUnusedLocals`/`noUnusedParameters` on)
- `npm run lint` — ESLint (flat config: js + typescript-eslint + react-hooks +
  react-refresh). Note `react-refresh/only-export-components`: keep non-component
  exports out of files that default-export a component (this is why the icon
  components in `SocialIcons.tsx` are module-private, not exported).

## Structure

```
src/
  App.tsx                      Routes: / (Home), /deportes (Sports), /noticias (News)
  main.tsx                     Wraps <App/> in <BrowserRouter>
  index.css                    Design tokens (:root), light/dark theme, .container, base type
  components/
    PlaceholderImage.tsx       Labeled "Foto próximamente" box; `fill` prop = full-bleed hero bg
    FeatureCard.tsx            The 3 home cards (green top border, hover-lift)
    SocialIcons.tsx            Inline FB/IG/X SVGs (currentColor); icon fns are module-private
    layout/{Navbar,Footer,Layout}.tsx
  pages/{Home,Sports,News}.tsx
```

## Design conventions

- **Design tokens** live in `src/index.css` `:root` with a
  `@media (prefers-color-scheme: dark)` override. Reuse `var(--accent)`,
  `var(--text)`, `var(--text-h)`, `var(--bg)`, `var(--border)`, `var(--shadow)`,
  etc. — don't hardcode colors, so dark mode keeps working for free.
- **Accent = soccer green** (`#15803d` light / `#4ade80` dark). `--on-ink-accent`
  (`#4ade80`) is the green that reads on the always-dark surfaces.
- **Navbar and footer are always dark/black** (intentional brand bookends),
  regardless of light/dark mode — they use `--ink`/`--ink-text`/`--on-ink-accent`,
  not the theme-flipping tokens. The page **body** still respects light/dark.
- **Full-bleed layout**: `#root` is full width (no centered column). Sections span
  edge-to-edge; readable text is constrained by `.container` (max-width 1200) or
  per-section max-widths + `padding-inline`.
- **Hero** (`.home-hero`) is a ~90svh full-screen banner: a `PlaceholderImage fill`
  background, a gradient `.home-hero-scrim`, and overlaid white headline/subtitle.

## Placeholders to replace when real assets arrive

- **Hero photo**: `<PlaceholderImage ... fill />` in `pages/Home.tsx` — swap for an
  `<img>` or CSS `background-image`; the scrim + overlaid text keep working.
- **Logo**: `.navbar-logo` placeholder in `components/layout/Navbar.tsx`.
- **Other photos**: about-section + gallery (Sports) + news photos are
  `PlaceholderImage` boxes labeled "Foto próximamente".
- **Social links**: `href="#"` placeholders in `components/SocialIcons.tsx`
  (Facebook, Instagram, Twitter/X) — marked with a TODO comment.
- **Search bar**: navbar search is a non-functional UI placeholder (no CMS to
  search yet).
- **Forms/donations**: "Registro de Interés" and "Apoya Nuestra Misión" are static
  CTA placeholders — no submission/payment backend.

## Source of truth for content

`notes.md` (repo root) is the client's content/structure spec. Keep Spanish copy
verbatim (including emoji/hashtags on the News page).

## Deployment note

`BrowserRouter` needs SPA fallback — the host must rewrite unknown paths to
`index.html`, or direct loads of `/deportes` / `/noticias` will 404 in production.

## Verifying changes

`npm run build` + `npm run lint` must be clean. For visual checks, run the dev
server and drive headless Chromium via `npx playwright screenshot <url> <file>`
(Playwright is available via npx; run `npx playwright install chromium` once).
Check all 3 routes, mobile width (<1024px hamburger), and dark mode.
