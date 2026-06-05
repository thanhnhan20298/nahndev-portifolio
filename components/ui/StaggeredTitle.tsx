"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PANEL_DURATION, SNAP_EASE, STAGGER_CHILD } from "@/lib/motion/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  /** word = per word; char = per character (hero) */
  mode?: "word" | "char";
};

export function StaggeredTitle({ text, className, delay = 0, mode = "word" }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  if (mode === "char") {
    return (
      <span className={className}>
        {[...text].map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 24, rotate: -6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{
              duration: PANEL_DURATION,
              delay: delay + i * STAGGER_CHILD * 0.6,
              ease: SNAP_EASE,
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </span>
    );
  }

  const words = text.split(/\s+/);

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, y: "40%", rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: PANEL_DURATION,
            delay: delay + i * STAGGER_CHILD,
            ease: SNAP_EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
