# Architecture

Next.js 15 app — interactive manga portfolio. Code is split by **role**, not by file type alone.

## Top level

```
app/                    # Routes only (thin pages)
components/manga/       # All UI (grouped below)
lib/                    # Logic with no React (content, motion, 3D, audio)
context/                # React context (GSAP on/off)
hooks/                  # Shared React hooks
doc/                    # Spec + this file
```

## `components/manga/`

| Folder | Responsibility |
|--------|----------------|
| `layout/` | Page shell: portfolio, nav, scroll orchestrator, chapter bands |
| `sections/` | One file per portfolio section (About, Skills, …) + `registry.tsx` |
| `ui/` | Reusable manga primitives: panels, bubbles, terminal, titles |
| `effects/` | Motion visuals: swoosh, slash, tilt, scroll progress, project card art |
| `features/` | Self-contained experiences (boot, hero 3D, radar, cursor/shoot, overload) |
| `projects/` | Project detail navigation + enter transition |

**Rule:** sections compose `ui` + `effects` + `features`; they do not import each other.

## `lib/`

| Folder | Responsibility |
|--------|----------------|
| `content/` | Copy & data only — edit here for HR-facing text |
| `motion/` | GSAP register, scroll triggers, animation tokens |
| `three/` | Three.js builders + GLSL shaders |
| `audio/` | Web Audio one-shots (beep, gunshot) |
| `effects/` | DOM/GSAP helpers (gunfire VFX, overload events) |
| `utils/` | `cn()` and small helpers |

## Data flow

1. `app/page.tsx` → `MangaPortfolio` (`layout/`)
2. `portfolioChapters` (`lib/content/adventure.ts`) drives section order
3. `sections/registry.tsx` maps `sectionId` → section component
4. `MangaGsapProvider` enables scroll/GSAP after boot intro

## Adding a section

1. `lib/content/adventure.ts` — chapter + `sectionId`
2. `components/manga/sections/MySection.tsx`
3. `sections/registry.tsx` — register component
4. `layout/MangaNav.tsx` — nav link

## Imports

Prefer path aliases:

- `@/lib/content/...` or `@/lib/content`
- `@/lib/motion/...`
- `@/components/manga/ui/...`

Public entry for the home page: `@/components/manga` or `@/components/manga/layout/MangaPortfolio`.
