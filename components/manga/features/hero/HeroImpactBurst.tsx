"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type Props = { className?: string; active?: boolean };

/** Speedlines + red flash — manga impact, no ink particles */
export function HeroImpactBurst({ className, active }: Props) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className={cn("hero-impact-burst", active && "hero-impact-burst--live", className)} aria-hidden>
      <div className="hero-impact-burst__fan" />
      <div className="hero-impact-burst__slash hero-impact-burst__slash--a" />
      <div className="hero-impact-burst__slash hero-impact-burst__slash--b" />
      <div className="hero-impact-burst__vignette" />
    </div>
  );
}
