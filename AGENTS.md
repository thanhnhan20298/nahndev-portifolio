# AGENTS

Manga portfolio — spec: `doc/document.md` · architecture: `doc/ARCHITECTURE.md` · deploy: `doc/DEPLOY-VPS.md`.

## Stack

Next.js 15, Tailwind 4, Framer Motion, GSAP ScrollTrigger, Three.js.

## Layout

- `components/manga/layout/` — `MangaPortfolio`, nav, scroll orchestrator
- `components/manga/sections/` + `registry.tsx` — page sections
- `components/manga/ui/` — panels, bubbles, terminal (no business copy)
- `components/manga/features/` — boot, hero 3D, radar, cursor/shoot, overload
- `lib/content/` — **all copy & data**
- `lib/motion/`, `lib/three/`, `lib/audio/`, `lib/effects/` — non-UI logic

## Features

- Intro: `features/boot/SystemIntro` (exported as `BootSequence`)
- Hero: `features/hero/` — laptop particles, profile card, impact burst
- Skills: `features/radar/` — ScrollTrigger pin, flow shader (`lib/three/radar-shaders.ts`)
- Cursor: `features/cursor/AgentCrosshair` — aim, click shoot, bullet marks (`lib/effects/gunfire-vfx.ts`)
- Easter egg: `features/overload/SystemOverload`

## Rules

- Theme: black + red, spy/agent tactical. **No** One Piece / wanted poster IP.
- Scroll: `lib/motion/scroll-setup.ts` — no layout-breaking pin on chapter titles.
- `MangaGsapProvider` toggles GSAP after boot.
- `prefers-reduced-motion`: skip intro / 3D / heavy GSAP.
