# AGENTS

Interactive portfolio — **`doc/ARCHITECTURE.md`** is the source of truth for layout and conventions.

## Stack

Next.js 15, Tailwind 4, Framer Motion, GSAP ScrollTrigger, Three.js.

## Layout

```
components/layout/     PortfolioPage, SiteNav, SectionShell, chapters
components/sections/   registry.tsx maps sectionId → component
components/ui/         Reusable primitives (no business copy)
components/features/   boot, hero, radar, cursor, overload
lib/content/           All copy, types, assets, adventure chapters
lib/config/            siteNavItems (derived from adventure.ts)
lib/motion/            GSAP + scroll tokens
```

## Rules

- **No `lib/data/`** — only `lib/content/`.
- **Nav** — use `siteNavItems` from `lib/config/navigation.ts`; do not hardcode links in `SiteNav`.
- **Types** — `lib/content/types.ts`; re-export from domain files.
- Theme: black + red, spy/agent tactical. **No** One Piece / wanted poster IP.
- CSS: `app/styles/` split by domain; `manga-*` = global shell tokens.
- `GsapProvider` enables motion after boot; respect `prefers-reduced-motion`.

## Features map

| Feature             | Path                               |
| ------------------- | ---------------------------------- |
| Boot intro          | `features/boot/SystemIntro`        |
| Hero 3D             | `features/hero/`                   |
| Skills radar        | `features/radar/`                  |
| Crosshair / shoot   | `features/cursor/AgentCrosshair`   |
| Overload easter egg | `features/overload/SystemOverload` |

## Commands

`npm run check` before PR — lint + typecheck.
