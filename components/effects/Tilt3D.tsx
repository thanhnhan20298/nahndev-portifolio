"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { SCENE_PERSPECTIVE, TILT_MAX_DEG, TILT_SPRING } from "@/lib/motion/motion";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 0–1 — tilt amount from pointer */
  intensity?: number;
  disabled?: boolean;
};

export function Tilt3D({ children, className, intensity = 1, disabled }: Props) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const max = TILT_MAX_DEG * intensity;

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), TILT_SPRING);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), TILT_SPRING);

  if (reduced || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("site-tilt-scene", className)} style={{ perspective: SCENE_PERSPECTIVE }}>
      <motion.div
        className="site-tilt-card"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
