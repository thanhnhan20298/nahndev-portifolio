# nahndev — Interactive Portfolio

Next.js 15 · Tailwind 4 · Framer Motion · GSAP · Three.js

Manga-inspired UX (panels, motion, tactical theme) — conventional codebase layout.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## For reviewers

- **Copy & résumé data:** `lib/content/` — no marketing text inside components.
- **Structure:** see below; edit content in the table under [Edit content](#edit-content).

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
public/images/                # WebP assets (see lib/content/assets.ts)
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
| `lib/content/assets.ts`             | Image paths under `public/images/`        |

## Deploy (VPS)

Portfolio uses **port 3002** by default (leave 3000/8080 for other apps).

```bash
# On VPS
git clone https://github.com/thanhnhan20298/nahndev-portifolio.git nahndev-portfolio
cd nahndev-portfolio
npm ci
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL=https://yourdomain.com
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

Nginx: proxy `yourdomain.com` → `http://127.0.0.1:3002`, then `certbot --nginx` for HTTPS.

Copy `.env.example` → `.env.local` locally too for `NEXT_PUBLIC_SITE_URL` and optional `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## Extras

- **Resume:** opens in a modal (✕ Close or Esc) — does not leave the page. `/resume` for direct link. PDF is vector text, not a screenshot.
- **Keyboard:** `1`–`6` jump sections, `H` home, `M` mute sound.
- **Contact:** form opens the visitor's email app → they send to your Gmail.

## Scripts

| Command                   | Purpose                          |
| ------------------------- | -------------------------------- |
| `npm run dev`             | Development server               |
| `npm run build`           | Production build                 |
| `npm run start`           | Run production server            |
| `npm run lint`            | ESLint                           |
| `npm run typecheck`       | TypeScript check                 |
| `npm run check`           | lint + typecheck                 |
| `npm run images:optimize` | PNG → WebP (dev; PNG not in git) |
