"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AMBIENT_LOOP, SCENE_PERSPECTIVE } from "@/lib/motion/motion";
import { cn } from "@/lib/utils/cn";

export type AmbientPreset = keyof typeof AMBIENT_LOOP;

type Props = {
  children: React.ReactNode;
  className?: string;
  preset?: AmbientPreset;
  disabled?: boolean;
};

/** 3D loop — illustration only (card, prop), not body text */
export function AmbientFloat3D({
  children,
  className,
  preset = "card",
  disabled,
}: Props) {
  const reduced = useReducedMotion();
  const loop = AMBIENT_LOOP[preset];

  if (reduced || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={cn("manga-ambient-scene manga-ambient-scene--contain", className)}
      style={{ perspective: SCENE_PERSPECTIVE }}
    >
      <motion.div
        className="manga-ambient-float"
        style={{ transformStyle: "preserve-3d" }}
        animate={loop.animate}
        transition={{ ...loop.transition, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
