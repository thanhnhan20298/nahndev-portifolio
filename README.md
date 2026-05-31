# nahndev — Interactive Manga Portfolio

Next.js 15 · Tailwind 4 · Framer Motion · GSAP · Three.js

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## For reviewers (HR / tech lead)

- **Copy & résumé data:** `lib/content/` — no marketing text inside components.
- **Architecture map:** [`doc/ARCHITECTURE.md`](doc/ARCHITECTURE.md)
- **Design spec:** [`doc/document.md`](doc/document.md)
- **Agent notes:** [`AGENTS.md`](AGENTS.md)

## Project structure

```
app/                          # Routes
  page.tsx                    # Home
  projects/[slug]/page.tsx    # Project detail (SSG)

components/manga/
  layout/                     # MangaPortfolio, nav, scroll, chapters
  sections/                   # Page sections + registry.tsx
  ui/                         # InkPanel, PanelSlide, SpeechBubble, …
  effects/                    # Swoosh, slash, tilt, scroll progress
  features/                   # boot, hero, radar, cursor, overload
  projects/                   # Project links & page enter
  index.ts                    # Public exports

lib/
  content/                    # All copy & structured data
  motion/                     # GSAP + scroll + motion tokens
  three/                      # Three.js + shaders
  audio/                      # UI sounds
  effects/                    # Gunfire VFX, overload events
  utils/

context/                      # MangaGsapProvider
hooks/                        # useMangaReveal, useSectionSpy
```

## Edit content

| File | What |
|------|------|
| `lib/content/about.ts` | Bio |
| `lib/content/experience.ts` | Jobs & projects timeline |
| `lib/content/architecture-radar.ts` | Skills radar nodes |
| `lib/content/projects.ts` | Portfolio projects |
| `lib/content/contact.ts` | Email, socials |
| `lib/content/adventure.ts` | Chapter order & section IDs |

## Deploy (Vultr + domain)

Full guide: **[`doc/DEPLOY-VPS.md`](doc/DEPLOY-VPS.md)** — Vultr VPS, Firewall Group, DNS, Nginx, SSL, PM2, redeploy.

Sample PM2 config: [`ecosystem.config.cjs`](ecosystem.config.cjs) (adjust `cwd` on the server).

## Scripts

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — production server (sau build)
- `npm run lint` — ESLint
