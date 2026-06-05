# Images folder

Generate art with **Midjourney** (or similar) using prompts in [`doc/ASSET-PROMPTS.md`](../doc/ASSET-PROMPTS.md).

## Layout

```
public/images/
  avatar/agent-portrait.png      ← Hero profile card (square, ~800×800)
  hero/field-hq-backdrop.png     ← Optional wide hero BG (~1920×1080)
  hero/tactical-hud.png          ← Optional HUD overlay
  projects/manga-portfolio-cover.png
  projects/crypto-tools-cover.png
  chapters/about-briefing.png    ← Section backgrounds (About, Skills, …)
  chapters/radar-scan.png
  chapters/motion-lab.png
  chapters/mission-log.png
  chapters/case-files.png
  chapters/comms-channel.png
```

Export as **PNG** or **WebP**. Keep files under ~500 KB when possible (compress with [Squoosh](https://squoosh.app)).

Missing files are OK — the site uses CSS / 3D fallbacks until you add images.
