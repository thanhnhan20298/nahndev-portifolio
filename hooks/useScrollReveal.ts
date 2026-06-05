"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { SLASH } from "@/lib/motion/motion";

export type RevealVariant = "panel" | "slash" | "sfx";

type Options = {
  variant: RevealVariant;
  once?: boolean;
  afterChapter?: boolean;
  amount?: number;
};

export function useScrollReveal({
  variant,
  once = true,
  afterChapter = false,
  amount = variant === "slash" ? 0.35 : 0.15,
}: Options) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -8% 0px",
  });
  const show = inView || reduced;

  const [slashActive, setSlashActive] = useState(false);
  const [sfxPop, setSfxPop] = useState(false);

  const clearSlash = useCallback(() => setSlashActive(false), []);

  useEffect(() => {
    if (!inView || reduced) return;

    if (variant === "slash") {
      setSlashActive(true);
      return;
    }
    if (variant === "sfx") {
      setSfxPop(true);
      const t = setTimeout(() => setSfxPop(false), SLASH.sfxPopMs);
      return () => clearTimeout(t);
    }
  }, [inView, reduced, variant]);

  const panelDelaySec = afterChapter ? SLASH.chapterGapMs / 1000 : 0;

  return {
    ref,
    show,
    reduced,
    slashActive,
    clearSlash,
    sfxPop,
    panelDelaySec,
    slashDurationMs: SLASH.totalMs,
  };
}
