# Architecture

Next.js 15 interactive portfolio — **professional folder layout**, manga-inspired UX in CSS and copy only.

## Principles

1. **Thin routes** — `app/` only wires pages; no business logic.
2. **Data outside components** — all copy and structured data in `lib/content/`.
3. **Features are isolated** — boot, hero, radar, cursor, overload live under `components/features/`.
4. **Single source of truth** — section order and nav labels come from `lib/content/adventure.ts` → `lib/config/navigation.ts`.
5. **Graceful degradation** — missing images, reduced motion, and no WebGL all have fallbacks.

## Repository map

```
app/
  layout.tsx, page.tsx          # Root layout + home
  projects/[slug]/page.tsx      # SSG project detail
  globals.css                   # Tailwind + style imports
  styles/
    tokens.css                  # CSS variables, typography
    layout.css                  # Page shell, nav, sections, panels
    features.css                # Hero, radar, agent, project cards
    modes.css                   # Boot intro, overload, reduced-motion

components/
  layout/       PortfolioPage, SiteNav, SectionShell, chapters
  sections/     About, Skills, Hero, … + registry.tsx
  ui/           InkPanel, PanelSlide, DevTerminal, AssetImage, …
  effects/      Motion primitives (swoosh, slash, tilt, scroll)
  features/     boot | hero | radar | cursor | overload
  projects/     Project detail navigation
  index.ts      Public exports (PortfolioPage, BootSequence)

lib/
  content/      Copy, types, assets manifest, chapters
  config/       Site config derived from content (navigation)
  motion/       GSAP, ScrollTrigger, animation tokens
  three/        Three.js builders + GLSL
  audio/        Web Audio one-shots
  effects/      DOM helpers (gunfire VFX, overload events)
  navigation/   Hash scroll helpers
  utils/        cn()

context/        GsapProvider (GSAP enabled after boot)
hooks/          useScrollReveal, useSectionSpy
doc/            Spec, deploy, asset prompts, this file
public/images/  Static art (optional; fallbacks if missing)
```

## Data flow

```
lib/content/adventure.ts     portfolioChapters (order + sectionId)
        ↓
lib/config/navigation.ts     siteNavItems (nav labels)
        ↓
components/sections/registry   sectionId → React component
        ↓
components/layout/PortfolioPage   composes Hero + chapters + footer
```

Project detail: `lib/content/projects.ts` → `generateStaticParams` → `ProjectPageEnter`.

## `lib/content/`

| File                                          | Purpose                              |
| --------------------------------------------- | ------------------------------------ |
| `types.ts`                                    | Shared TypeScript types              |
| `adventure.ts`                                | Chapter registry (section order)     |
| `about.ts`, `experience.ts`, `projects.ts`, … | Editable copy & data                 |
| `assets.ts`                                   | Image paths + `sectionBackdropSrc()` |

**HR edits here** — not inside React components.

## Styling conventions

| Prefix                         | Scope                                            |
| ------------------------------ | ------------------------------------------------ |
| `site-*`                       | Global layout tokens (nav, sections, typography) |
| `hero-*`, `radar-*`, `agent-*` | Feature-scoped styles                            |
| `system-intro-*`, `overload-*` | Boot & easter-egg modes                          |

Styles split under `app/styles/` — edit the file matching the feature you touch.

## Motion stack

| Layer              | Tool               | Where                                           |
| ------------------ | ------------------ | ----------------------------------------------- |
| Section reveal     | Framer Motion      | `PanelSlide`, `useScrollReveal`                 |
| Scroll pin / scrub | GSAP ScrollTrigger | `lib/motion/scroll-setup.ts`                    |
| 3D                 | Three.js           | `lib/three/`, `features/hero`, `features/radar` |
| Boot gate          | `GsapProvider`     | GSAP off until intro completes                  |

`prefers-reduced-motion`: skip boot drama, 3D, heavy GSAP.

## Adding a section

1. Add `sectionId` + chapter in `lib/content/adventure.ts`
2. Create `components/sections/MySection.tsx`
3. Register in `components/sections/registry.tsx`
4. Nav updates automatically via `siteNavItems`
5. Optional backdrop: add path in `lib/content/assets.ts` → `chapters`

## Scripts

```bash
npm run dev        # local
npm run build      # production
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck
```

## Deploy

See [`DEPLOY-VPS.md`](./DEPLOY-VPS.md). PM2 config: `ecosystem.config.cjs`.

## What not to do

- Do not add `lib/data/` — use `lib/content/` only.
- Do not hardcode nav links in `SiteNav` — use `siteNavItems`.
- Do not put marketing copy inside section components.
- Do not use copyrighted franchise IP (One Piece, wanted poster parody).
