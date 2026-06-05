"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { registerGsapPlugins } from "@/lib/motion/gsap-register";
import { mountRadarScene } from "@/lib/three/mount-radar-scene";
import { cn } from "@/lib/utils/cn";
import { RadarTacticalHUD } from "./RadarTacticalHUD";

type Props = {
  enabled?: boolean;
  className?: string;
  pinRef?: RefObject<HTMLElement | null>;
  onMilestone?: (text: string) => void;
};

export function RadarArchitecture({ enabled, className, pinRef, onMilestone }: Props) {
  const reduced = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced || !hostRef.current || !enabled) return;

    registerGsapPlugins();
    const host = hostRef.current;
    const pinEl = pinRef?.current ?? host;

    return mountRadarScene({
      host,
      pinEl,
      onMilestone,
      setHudText: (text) => {
        if (hudRef.current) hudRef.current.textContent = text;
      },
    });
  }, [enabled, reduced, onMilestone, pinRef]);

  return (
    <div className={cn("radar-arch", className)}>
      <div className="radar-arch__viewport">
        <div ref={hostRef} className="radar-arch__canvas" />
        {enabled && !reduced ? <RadarTacticalHUD /> : null}
      </div>
      <p
        ref={hudRef}
        className="radar-arch__hud font-mono text-xs font-bold tracking-widest text-[var(--accent)]"
      >
        AWAITING SCROLL...
      </p>
    </div>
  );
}
