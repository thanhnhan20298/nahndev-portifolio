"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/motion/gsap-register";
import { setupScrollEffects } from "@/lib/motion/scroll-setup";

type Props = {
  enabled: boolean;
  root: React.RefObject<HTMLElement | null>;
};

export function ScrollOrchestrator({ enabled, root }: Props) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || !root.current) return;

    const ctx = gsap.context(() => {
      setupScrollEffects(root.current!);
    }, root);

    return () => ctx.revert();
  }, [enabled, reduced, root]);

  return null;
}
