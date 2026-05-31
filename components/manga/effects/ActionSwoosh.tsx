"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SLASH, SNAP_EASE } from "@/lib/motion/motion";
import { cn } from "@/lib/utils/cn";

const SLASH_PATHS = {
  full: {
    viewBox: "0 0 100 100",
    core: "M -8 72 C 22 48, 48 28, 108 2",
    trails: [
      { d: "M -12 76 C 18 52, 44 32, 104 6", stroke: "var(--slash-1)", width: 2, delay: 0 },
      { d: "M -4 68 C 26 44, 52 24, 112 -2", stroke: "var(--slash-2)", width: 1.6, delay: 0.02 },
      { d: "M -6 74 C 24 50, 50 30, 110 4", stroke: "var(--slash-3)", width: 1.2, delay: 0.04 },
    ],
    sparks: ["M 52 38 L 58 32", "M 48 42 L 54 36", "M 56 34 L 62 28"],
  },
  card: {
    viewBox: "0 0 100 100",
    core: "M 8 88 C 38 58, 62 38, 96 8",
    trails: [
      { d: "M 4 92 C 34 62, 58 42, 92 12", stroke: "var(--slash-1)", width: 1.4, delay: 0 },
      { d: "M 12 84 C 42 54, 66 34, 98 4", stroke: "var(--slash-2)", width: 1.1, delay: 0.02 },
    ],
    sparks: ["M 58 42 L 64 36", "M 54 46 L 60 40"],
  },
} as const;

type SlashSpec = (typeof SLASH_PATHS)[keyof typeof SLASH_PATHS];

type Props = {
  active?: boolean;
  autoHideMs?: number;
  className?: string;
  size?: "full" | "card";
  cross?: boolean;
  onComplete?: () => void;
};

export function ActionSwoosh({
  active,
  autoHideMs = SLASH.totalMs,
  className,
  size = "full",
  cross = false,
  onComplete,
}: Props) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!active) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const t = setTimeout(() => {
      setPlaying(false);
      onComplete?.();
    }, autoHideMs);
    return () => clearTimeout(t);
  }, [active, autoHideMs, onComplete]);

  const spec = SLASH_PATHS[size];

  return (
    <div
      className={cn("sword-slash pointer-events-none absolute inset-0 overflow-visible", className)}
      aria-hidden
    >
      <AnimatePresence>
        {playing && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <SlashSvg spec={spec} coreWidth={size === "card" ? 2.4 : 3.2} flip={false} />
            {cross && size === "full" && (
              <SlashSvg spec={spec} coreWidth={2.8} flip className="opacity-90" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlashSvg({
  spec,
  coreWidth,
  flip,
  className,
}: {
  spec: SlashSpec;
  coreWidth: number;
  flip?: boolean;
  className?: string;
}) {
  const drawn = { pathLength: 1, opacity: 1 };
  const out = { pathLength: 1, opacity: 0 };

  return (
    <svg
      className={cn(
        "sword-slash__svg absolute inset-0 h-full w-full",
        flip && "sword-slash__svg--flip",
        className,
      )}
      viewBox={spec.viewBox}
      preserveAspectRatio="none"
      fill="none"
    >
      {spec.trails.map((trail) => (
        <motion.path
          key={trail.d}
          d={trail.d}
          stroke={trail.stroke}
          strokeWidth={trail.width}
          strokeLinecap="round"
          className="sword-slash__trail"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={drawn}
          exit={out}
          transition={{
            pathLength: { duration: 0.1, delay: trail.delay, ease: SNAP_EASE },
            opacity: { duration: 0.08, delay: trail.delay },
          }}
        />
      ))}
      <motion.path
        d={spec.core}
        stroke="var(--slash-core)"
        strokeWidth={coreWidth}
        strokeLinecap="round"
        className="sword-slash__core"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={drawn}
        exit={out}
        transition={{
          pathLength: { duration: 0.08, ease: SNAP_EASE },
          opacity: { duration: 0.06 },
        }}
      />
      {spec.sparks.map((d) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--slash-3)"
          strokeWidth={0.9}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.95 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.06, delay: 0.07, ease: SNAP_EASE }}
        />
      ))}
    </svg>
  );
}
