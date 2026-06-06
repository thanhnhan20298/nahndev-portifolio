"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

const RadarArchitecture = dynamic(
  () => import("@/components/features/radar/RadarArchitecture").then((m) => m.RadarArchitecture),
  { ssr: false },
);
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { archNodes, radarSection } from "@/lib/content/architecture-radar";
import { sectionBackdropSrc } from "@/lib/content/assets";
import { cn } from "@/lib/utils/cn";

type Props = { scrollEnabled?: boolean };

export function SkillsSection({ scrollEnabled }: Props) {
  const reduced = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);

  const backdrop = sectionBackdropSrc("skills");

  return (
    <section
      id="skills"
      className="radar-skills-section relative overflow-hidden border-b-4 site-border-section"
    >
      {backdrop && <SectionBackdrop src={backdrop} opacity={0.12} />}
      <div ref={pinRef} className="radar-skills-section__pin relative z-[1]">
        <div className="radar-skills-section__head mx-auto max-w-6xl px-4 pt-8 pb-2 md:px-8">
          <span className="font-label text-xs text-[var(--accent)]">{radarSection.arcLabel}</span>
          <h2 className="font-display site-title-stroke mt-1 text-4xl uppercase md:text-5xl">
            {radarSection.title}
          </h2>
          <p className="mt-2 max-w-xl text-sm site-text-dim">{radarSection.subtitle}</p>
        </div>

        <RadarArchitecture
          enabled={scrollEnabled && !reduced}
          pinRef={pinRef}
          className="radar-skills-section__stage"
        />

        {scrollEnabled && !reduced ? (
          <p className="radar-skills-section__hint font-mono text-[10px] tracking-widest text-muted-label">
            Scroll to scan · legend below
          </p>
        ) : null}
      </div>

      <div className="radar-skills-section__legend mx-auto max-w-6xl px-4 pb-14 md:px-8">
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {archNodes
            .filter((n) => n.radius > 0)
            .map((n) => (
              <li
                key={n.id}
                className={cn(
                  "ink-border-thin flex items-center justify-between gap-2 bg-panel px-3 py-2 text-xs",
                  "data-lock-target",
                )}
              >
                <span className="font-bold">{n.label}</span>
                <span className="font-label text-[9px] uppercase text-[var(--accent)]">
                  {n.tier}
                </span>
              </li>
            ))}
        </ul>
        <p className="mt-6 text-center text-xs text-muted-label">
          <Link href="#projects" className="font-semibold text-[var(--accent)] hover:underline">
            Projects
          </Link>
          {" · "}
          <Link href="#experience" className="font-semibold text-[var(--accent)] hover:underline">
            Journey
          </Link>
        </p>
      </div>
    </section>
  );
}
