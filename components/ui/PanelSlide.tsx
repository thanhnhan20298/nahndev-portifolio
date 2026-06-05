"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  PANEL_DURATION,
  PANEL_LAND_SPRING,
  PANEL_OFFSET,
  PANEL_VISIBLE,
  PANEL_3D_OFFSET,
  PANEL_3D_VISIBLE,
  PANEL_SLIDE_DELAY,
  SCENE_PERSPECTIVE,
  SNAP_EASE,
} from "@/lib/motion/motion";
import { cn } from "@/lib/utils/cn";
import { useGsapMotion } from "@/context/GsapContext";

type Props = {
  children: React.ReactNode;
  from?: keyof typeof PANEL_OFFSET;
  className?: string;
  delay?: number;
  afterChapter?: boolean;
  landSpring?: boolean;
  /** Scroll-in with rotateX/Y + z */
  depth3d?: boolean;
};

export function PanelSlide({
  children,
  from = "left",
  className,
  delay = 0,
  afterChapter = false,
  landSpring = false,
  depth3d = false,
}: Props) {
  const reduced = useReducedMotion();
  const { enabled: gsapOn } = useGsapMotion();
  const gsapReveal = gsapOn && afterChapter && !depth3d;

  const {
    ref,
    show,
    reduced: revealReduced,
    panelDelaySec,
  } = useScrollReveal({
    variant: "panel",
    afterChapter,
  });

  const totalDelay = panelDelaySec + delay;
  const motionReduced = reduced || revealReduced || gsapReveal;

  if (gsapReveal) {
    return (
      <div ref={ref} className={cn("gsap-panel-item min-w-0", className)}>
        {children}
      </div>
    );
  }

  const hidden = motionReduced
    ? depth3d
      ? PANEL_3D_VISIBLE
      : PANEL_VISIBLE
    : depth3d
      ? PANEL_3D_OFFSET[from]
      : PANEL_OFFSET[from];

  const visible = depth3d ? PANEL_3D_VISIBLE : PANEL_VISIBLE;

  const panel = (
    <motion.div
      ref={depth3d ? undefined : ref}
      className={cn("min-w-0", depth3d && "site-panel-3d-inner")}
      style={depth3d ? { transformStyle: "preserve-3d" } : undefined}
      initial={hidden}
      animate={show ? visible : hidden}
      transition={
        motionReduced
          ? { duration: 0.01 }
          : {
              delay: totalDelay,
              opacity: { duration: PANEL_DURATION * 0.7, ease: SNAP_EASE },
              x: { duration: PANEL_DURATION, ease: SNAP_EASE },
              y: { duration: PANEL_DURATION, ease: SNAP_EASE },
              rotate: { duration: PANEL_DURATION, ease: SNAP_EASE },
              rotateX: { duration: PANEL_DURATION * 1.05, ease: SNAP_EASE },
              rotateY: { duration: PANEL_DURATION * 1.05, ease: SNAP_EASE },
              z: { duration: PANEL_DURATION * 1.05, ease: SNAP_EASE },
              scale: landSpring
                ? {
                    ...PANEL_LAND_SPRING,
                    delay: totalDelay + PANEL_DURATION * 0.55,
                  }
                : {
                    duration: PANEL_DURATION,
                    ease: SNAP_EASE,
                    delay: totalDelay,
                  },
            }
      }
    >
      {children}
    </motion.div>
  );

  if (!depth3d) {
    return (
      <div ref={ref} className={className}>
        {panel}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("site-panel-scene", className)}
      style={{ perspective: SCENE_PERSPECTIVE }}
    >
      {panel}
    </div>
  );
}

export { PANEL_SLIDE_DELAY };
