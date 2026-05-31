/** Hard snap easing — px offset, not large % */
export const SNAP_EASE = [0.08, 0.95, 0.12, 1] as const;

export const PANEL_SLIDE_DELAY = 0.1;
export const PANEL_DURATION = 0.28;
export const STAGGER_CHILD = 0.05;
export const CHAPTER_TO_PANEL_MS = 150;

export const PANEL_OFFSET = {
  left: { opacity: 0, x: -56, scale: 0.94, rotate: -3 },
  right: { opacity: 0, x: 56, scale: 0.94, rotate: 3 },
  bottom: { opacity: 0, y: 40, scale: 0.96, rotate: 2 },
} as const;

export const PANEL_VISIBLE = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 };

/** Perspective scene — px */
export const SCENE_PERSPECTIVE = 1100;

export const TILT_MAX_DEG = 12;

export const TILT_SPRING = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.9,
};

/** Panel scroll-in with depth (transform only, no layout change) */
export const PANEL_3D_OFFSET = {
  left: { opacity: 0, x: -48, rotateY: 16, rotateX: 4, z: -100, scale: 0.92 },
  right: { opacity: 0, x: 48, rotateY: -16, rotateX: 4, z: -100, scale: 0.92 },
  bottom: { opacity: 0, y: 36, rotateX: 14, rotateY: 0, z: -80, scale: 0.94 },
} as const;

export const PANEL_3D_VISIBLE = {
  opacity: 1,
  x: 0,
  y: 0,
  rotateX: 0,
  rotateY: 0,
  z: 0,
  scale: 1,
};

export const TITLE_STAMP_3D_HIDDEN = { opacity: 0, rotateX: 22, z: -40, scale: 0.96 };
export const TITLE_STAMP_3D_SHOW = { opacity: 1, rotateX: 0, z: 0, scale: 1 };

export const WANTED_SLAM_3D_INITIAL = {
  scale: 1.14,
  y: -20,
  rotateX: -28,
  rotateY: 8,
  z: 60,
  opacity: 0.4,
};

export const IMPACT_SHRINK_3D = {
  scaleX: 0.02,
  scaleY: 0.06,
  rotateX: 72,
  z: -400,
  opacity: 0,
};

/**
 * 3D loop — shapes only (card, prop). Avoid `y` to prevent layout break / unreadable text.
 */
export const AMBIENT_LOOP = {
  card: {
    animate: {
      rotateY: [-7, 7, -7],
      rotateX: [-3, 4, -3],
      z: [0, 18, 0],
    },
    transition: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Panel lands — subtle bounce */
export const PANEL_LAND_SPRING = {
  type: "spring" as const,
  stiffness: 520,
  damping: 28,
  mass: 0.85,
};

export const STAMP_SPRING = { type: "spring" as const, stiffness: 580, damping: 26 };

export const TITLE_STAMP_SPRING = {
  type: "spring" as const,
  stiffness: 640,
  damping: 24,
};

export const WANTED_SLAM_SPRING = {
  type: "spring" as const,
  stiffness: 480,
  damping: 22,
};

export const CHAPTER_SHAKE = {
  ms: 80,
  keyframes: [0, -3, 3, -2, 0],
};

export const PAGE_ENTER = {
  duration: 0.32,
  offsetX: 48,
  ease: SNAP_EASE,
};

export const SLASH = {
  drawMs: 90,
  holdMs: 110,
  fadeMs: 90,
  get totalMs() {
    return this.drawMs + this.holdMs + this.fadeMs;
  },
  sfxPopMs: 480,
  chapterGapMs: CHAPTER_TO_PANEL_MS,
  hoverDebounceMs: 650,
  impact: {
    shrinkMs: 45,
    flashMs: 40,
    exitMs: 60,
    get totalMs() {
      return SLASH.totalMs + this.shrinkMs + this.flashMs + this.exitMs;
    },
  },
} as const;
