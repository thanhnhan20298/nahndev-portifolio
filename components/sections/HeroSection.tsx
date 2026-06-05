"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Onomatopoeia } from "@/components/ui/Onomatopoeia";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { InkPanel } from "@/components/ui/InkPanel";
import { DevTerminal } from "@/components/ui/DevTerminal";
import { Speedlines } from "@/components/ui/Speedlines";
import { StaggeredTitle } from "@/components/ui/StaggeredTitle";
import { PanelSlide } from "@/components/ui/PanelSlide";
import { HeroImpactBurst } from "@/components/features/hero/HeroImpactBurst";
import { HeroBackdrop } from "@/components/features/hero/HeroBackdrop";
import { HeroAgentHQ } from "@/components/features/hero/HeroAgentHQ";
import { HeroProfileCard } from "@/components/features/hero/HeroProfileCard";
import { about } from "@/lib/content/about";
import { heroChapter } from "@/lib/content/adventure";
import { heroHQ } from "@/lib/content/hero";
import { story } from "@/lib/content/story";

const stats = [
  { k: "Company", v: "FPT Software" },
  { k: "Since", v: "2022" },
  { k: "Stack", v: "Spring + Next" },
];

type Props = { booted?: boolean };

export function HeroSection({ booted }: Props) {
  const reduced = useReducedMotion();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (!booted || reduced) return;
    setBurst(true);
    const t = setTimeout(() => setBurst(false), 550);
    return () => clearTimeout(t);
  }, [booted, reduced]);

  return (
    <section
      data-hero-scene
      className="site-hero-scene hero-agent-hq relative overflow-hidden border-b-4 site-border-section"
    >
      <HeroBackdrop />
      <div data-hero-layer="impact" className="hero-layer hero-layer--impact pointer-events-none">
        <HeroImpactBurst className="hero-impact-canvas" active={burst} />
      </div>
      <div
        data-hero-layer="speedlines"
        className="hero-layer hero-layer--speedlines pointer-events-none"
      >
        <Speedlines className="site-speedlines--live opacity-35" strong={burst} />
      </div>

      <div data-hero-layer="agent-3d" className="hero-layer hero-layer--agent relative z-[2]">
        <HeroAgentHQ active={booted} className="hero-agent-stage" />
        <div className="hero-agent-hq__badge pointer-events-none">
          <p className="font-label text-[10px] tracking-[0.45em] text-[var(--accent)]">
            {heroHQ.codename}
          </p>
          <p className="font-display site-title-stroke mt-1 text-3xl uppercase md:text-4xl">
            {heroHQ.role}
          </p>
        </div>
      </div>

      <Onomatopoeia
        text="ズキン"
        jp
        variant="action"
        className="onomatopoeia--live absolute right-4 top-6 z-[4] rotate-6 text-3xl md:right-10 md:text-5xl"
      />

      <div
        data-hero-layer="content"
        className="relative z-[4] mx-auto max-w-6xl px-4 pb-14 pt-4 md:px-8 md:pb-20"
      >
        <PanelSlide from="bottom" delay={0}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="site-cta px-3 py-1 text-xs font-black uppercase">
              {about.availability}
            </span>
            <span className="ink-border-thin bg-panel px-3 py-1 text-xs font-bold">
              {about.location}
            </span>
            <span className="site-arc-badge">{heroChapter.arc}</span>
          </div>
        </PanelSlide>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <PanelSlide from="left" delay={0.08}>
            <InkPanel large clip="diag-tr" className="relative p-6 md:p-8">
              <span className="absolute -right-1 top-6 h-12 w-1 bg-[var(--accent)]" aria-hidden />
              <p className="font-label text-xs text-accent">
                {heroChapter.chapter} · {heroChapter.log}
              </p>
              <h1 className="font-display site-title-stroke mt-3 text-5xl uppercase md:text-6xl lg:text-7xl">
                <StaggeredTitle text={about.name} delay={0.12} mode="char" />
              </h1>
              <p className="mt-3 text-base font-medium md:text-lg">{about.tagline}</p>
              <p className="mt-1 text-sm text-muted-label">{heroHQ.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {stats.map((s) => (
                  <div key={s.k} className="ink-border-thin min-w-[7rem] bg-panel px-3 py-2">
                    <p className="font-label text-[10px] text-muted-label">{s.k}</p>
                    <p className="text-sm font-black">{s.v}</p>
                  </div>
                ))}
              </div>
            </InkPanel>
          </PanelSlide>

          <PanelSlide from="right" delay={0.14}>
            <div className="flex flex-col gap-4 lg:ml-auto lg:max-w-xs">
              <HeroProfileCard slam={booted} />
              <SpeechBubble tail="right" shout typewriter>
                {story.hook}
              </SpeechBubble>
            </div>
          </PanelSlide>
        </div>

        <div className="mt-8">
          <DevTerminal />
        </div>
      </div>
    </section>
  );
}
