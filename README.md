# nahndev — Interactive Portfolio

Next.js 15 · Tailwind 4 · Framer Motion · GSAP · Three.js

Manga-inspired UX (panels, motion, tactical theme) — conventional codebase layout.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## For reviewers (HR / tech lead)

- **Copy & résumé data:** `lib/content/` — no marketing text inside components.
- **Architecture:** [`doc/ARCHITECTURE.md`](doc/ARCHITECTURE.md)
- **Design spec:** [`doc/document.md`](doc/document.md)
- **Image prompts:** [`doc/ASSET-PROMPTS.md`](doc/ASSET-PROMPTS.md)
- **Agent notes:** [`AGENTS.md`](AGENTS.md)

## Project structure

```
app/
  page.tsx, layout.tsx
  styles/                     # tokens, layout, features, modes
  projects/[slug]/page.tsx

components/
  layout/                     # PortfolioPage, SiteNav, SectionShell
  sections/                   # Page sections + registry.tsx
  ui/                         # InkPanel, PanelSlide, DevTerminal, …
  effects/                    # Swoosh, slash, tilt, scroll progress
  features/                   # boot, hero, radar, cursor, overload
  projects/                   # Project detail navigation

lib/
  content/                    # Copy, types, assets, chapters
  config/                     # Navigation derived from content
  motion/, three/, audio/, effects/, utils/

context/                      # GsapProvider
hooks/                        # useScrollReveal, useSectionSpy
```

## Edit content

| File                                | What                                      |
| ----------------------------------- | ----------------------------------------- |
| `lib/content/about.ts`              | Bio                                       |
| `lib/content/experience.ts`         | Jobs timeline                             |
| `lib/content/architecture-radar.ts` | Skills radar nodes                        |
| `lib/content/projects.ts`           | Portfolio projects                        |
| `lib/content/contact.ts`            | Email, socials                            |
| `lib/content/adventure.ts`          | Section order (nav follows automatically) |

## Deploy (Vultr + domain)

[`doc/DEPLOY-VPS.md`](doc/DEPLOY-VPS.md) — VPS, Nginx, SSL, PM2.

## Scripts

| Command             | Purpose               |
| ------------------- | --------------------- |
| `npm run dev`       | Development server    |
| `npm run build`     | Production build      |
| `npm run start`     | Run production server |
| `npm run lint`      | ESLint                |
| `npm run typecheck` | TypeScript check      |
| `npm run check`     | lint + typecheck      |
