# CONCEPT SPEC: THE INTERACTIVE MANGA PORTFOLIO

Experience direction and UI scene playbook.

## 1. CORE CONCEPT

The project turns a flat traditional résumé (portfolio) into an **Interactive Digital Manga** chapter. The viewer is the reader, actively uncovering career milestones, skills, and projects through browser interactions.

## 2. VISUAL STYLE GUIDE

### Monochrome base

- **Foundation:** Print-paper white and ink black as primary materials.
- **Pop of color:** Only one high-intensity accent (e.g. rising-sun red or neon yellow) on critical UI: active states, CTAs, special hierarchy labels.

### Texturing

- **Screentone:** Fine dot-matrix fills for shading and depth instead of modern soft shadows or gradients.
- **Ink stroke:** Thick, decisive black borders between regions — G-pen roughness.

## 3. MANGA GRID LAYOUT

Instead of stacked horizontal banners, the UI uses **asymmetrical manga panels**:

- **Panel dynamics:** Diagonal cuts, large panels over small ones, art bleeding past panel edges for dramatic space.
- **Visual hierarchy:** Hero projects get the largest panel (main frame of a manga page). Supporting skills and contact sit in smaller satellite panels.

## 4. ANIMATION SCENARIOS

Motion follows **“motion drives story rhythm”**:

### Scenario 1: Panel sliding

- **Trigger:** User scrolls to the next section.
- **Motion:** Panels do not appear all at once. Left panel slides from the left edge; right panel rises from below after a short delay (~0.1s).
- **Timing:** Hard snap braking — fast launch, instant stop at design coordinates, like turning a manga page.

### Scenario 2: Impact frames

- **Trigger:** Click a project tile for detail.
- **Motion:** No instant route change. A white slash tears the black screen with a black → white → black flash (~0.3s). The overlay hides the next page load and collapses to a thin line.

### Scenario 3: Typography & speech bubbles

- **Trigger:** Ambient loop or hover.
- **Onomatopoeia:** English or kana SFX (DOKI DOKI, SHING, GOGOGO) float and pulse subtly in the background.
- **Speech bubbles:** Bio copy in bordered bubbles with gentle vertical float — “someone is talking to the reader.”

## 5. USER JOURNEY MAP

- **Open the story (Hero):** Visit → boot / “charge the story system” → portrait avatar + stylized name.
- **Explore (About & Skills):** Scroll → personal panels and skill tree slide in → light SFX motion in the background.
- **Climax (Projects):** Hover projects → screentone shifts to dramatic red → click → impact slash → navigate to project detail.
