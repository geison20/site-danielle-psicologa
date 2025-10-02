# Repository Guidelines

## Project Structure & Module Organization
- `src/app`: Next.js App Router (routes, `layout.tsx`, `globals.css`).
- `src/components`: Feature/UI components (PascalCase files, e.g., `About.tsx`).
  - `src/components/ui`: Reusable primitives (lowercase files, e.g., `button.tsx`).
- `src/lib`: Utilities and helpers (e.g., `cn` in `src/lib/utils.ts`).
- `public`: Static assets (images, icons, sitemap output).
- Root configs: `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `next-sitemap.config.js`.

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server with Turbopack.
- `npm run build` — Production build; triggers `postbuild`.
- `npm run start` — Serve the built app.
- `npm run lint` — Run ESLint (Next.js rules).
- `SITE_URL` controls sitemap generation on `postbuild` via `next-sitemap`.
  - Example: `SITE_URL=https://example.com npm run build`.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict` enabled). Prefer function components and hooks.
- Indentation: 2 spaces; keep lines focused and small components cohesive.
- Imports: use path alias `@/*` (e.g., `import Navbar from "@/components/Navbar"`).
- Components: PascalCase filenames; hooks/utilities in `camelCase`.
- Styling: Tailwind CSS; prefer utility classes over inline styles. Define shared styles in `@layer` utilities.

## Testing Guidelines
- No test runner is configured yet. Suggested layout:
  - Unit: `src/__tests__/**/*.(test|spec).tsx` with React Testing Library.
  - E2E: `e2e/**/*` with Playwright.
- Until tests exist, verify changes via `npm run dev` and check key flows (navigation, forms, analytics events).

## Commit & Pull Request Guidelines
- Commits: short, imperative, and descriptive (PT/EN accepted). Example: `Atualiza integração do Google Analytics` or `Refactor Navbar aria labels`.
- Link issues when applicable. Keep changes scoped; one topic per commit.
- PRs must include: purpose, summary of changes, how to test, and screenshots/GIFs for UI.
- Ensure `npm run lint` and `npm run build` pass before requesting review.

## Security & Configuration Tips
- Use `.env.local` (git-ignored) for runtime config. Examples: `SITE_URL`, `NEXT_PUBLIC_*` analytics IDs (prefer env over hard-coded IDs).
- Update `images.domains` in `next.config.ts` when using new image hosts.
- Do not commit secrets or large media; place public assets under `public/`.
