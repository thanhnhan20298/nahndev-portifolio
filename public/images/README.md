# Images

Paths are declared in `lib/content/assets.ts`. The repo ships **WebP** only.

```
public/images/
  avatar/agent-portrait.webp
  hero/field-hq-backdrop.webp
  projects/manga-portfolio-cover.webp
  projects/crypto-tools-cover.webp
  chapters/*.webp              # section backdrops
```

To replace art: drop a PNG locally (gitignored), run `npm run images:optimize`, commit the new `.webp`.

Missing files are OK — the site falls back to CSS / 3D.
