# Asset prompts — spy / agent manga portfolio

Use **Midjourney**, Leonardo, or Ideogram. Style: **black ink manga + red accent only** — no copyrighted characters (no One Piece, no wanted poster parody).

**Global style suffix** (append to every prompt):

```text
black and white manga screentone, thick ink outlines, single red accent color #E11924, tactical spy briefing aesthetic, high contrast, no text, no watermark --ar 1:1 --style raw --v 6
```

Change `--ar` per slot below.

---

## 1. Avatar — `public/images/avatar/agent-portrait.png`

**Aspect:** `--ar 1:1`  
**Use:** Hero profile card (“Classified dossier”)

```text
classified agent dossier portrait, young vietnamese male software developer, neutral expression, bust shot, manga ink illustration, halftone screentone shading, red stamp mark corner, spy tactical ID photo vibe, NOT anime celebrity, original character
```

**Tips:** Upload your real photo in Midjourney `--cref` for likeness, or generate generic then swap later.

---

## 2. Hero backdrop — `public/images/hero/field-hq-backdrop.png`

**Aspect:** `--ar 16:9`

```text
empty tactical command room wide shot, manga background panel, desks with laptops silhouettes, radar screens blank, dramatic speedlines, noir lighting, red alarm light glow, no people faces, environment only
```

---

## 3. Project — manga portfolio — `public/images/projects/manga-portfolio-cover.png`

**Aspect:** `--ar 1:1`

```text
manga comic page layout floating panels, scroll motion lines, impact slash effect, portfolio website concept, abstract UI panels, ink drawing, red highlight on one panel, no readable text
```

---

## 4. Project — C-FAT — `public/images/projects/crypto-tools-cover.png`

**Aspect:** `--ar 1:1`

```text
tactical terminal server room manga panel, websocket data streams as red lines, docker containers as metal crates, spring boot coffee cup icon abstract, backend bot architecture diagram as manga art, no logos, no bitcoin symbol
```

---

## 5. Chapter panels (optional) — `public/images/chapters/*.png`

**Aspect:** `--ar 3:2` each

| File                 | Prompt keyword                                     |
| -------------------- | -------------------------------------------------- |
| `about-briefing.png` | agent reading dossier folder, speech bubble empty  |
| `radar-scan.png`     | circular radar HUD laser sweep, architecture nodes |
| `motion-lab.png`     | manga panel sliding motion blur                    |
| `mission-log.png`    | field journal notebook tactical entries            |
| `case-files.png`     | stacked classified folders red string              |
| `comms-channel.png`  | encrypted radio handset manga prop                 |

Example full prompt:

```text
agent reading classified dossier folder, manga panel, screentone, red classified stamp, empty speech bubble, briefing room --ar 3:2
```

---

## 6. Negative prompt (if tool supports)

```text
one piece, luffy, wanted poster, anime copyright character, watermark, logo, readable text, photorealistic face, 3d render, gradient UI, colorful rainbow
```

---

## 7. Post-processing

1. Crop to exact aspect ratio.
2. Compress: WebP quality 80 or PNG through Squoosh.
3. Place file at path in [`lib/content/assets.ts`](../lib/content/assets.ts).
4. `npm run dev` — refresh; fallback disappears when image loads.

---

## 8. Consistency across images

- Same **style suffix** on every generation.
- Same **seed** in Midjourney (`--seed 12345`) when iterating one character.
- Limit palette: paper white, ink black, red `#E11924` only.
