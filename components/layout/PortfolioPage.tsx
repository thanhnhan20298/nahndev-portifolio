"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { GsapProvider } from "@/context";
import { ResumeProvider } from "@/context/ResumeContext";
import { ResumeModal } from "@/components/resume/ResumeModal";
import { ScrollOrchestrator } from "./ScrollOrchestrator";
import { BootSequence } from "./BootSequence";
import { ChapterDivider } from "./ChapterDivider";
import { AgentCrosshair } from "@/components/features/cursor/AgentCrosshair";
import { SystemOverload } from "@/components/features/overload/SystemOverload";
import { SiteNav } from "./SiteNav";
import { StoryGuide } from "./StoryGuide";
import { HeroSection } from "@/components/sections/HeroSection";
import { portfolioSectionComponents } from "@/components/sections/registry";
import { portfolioChapters, footerMotto } from "@/lib/content/adventure";
import { cn } from "@/lib/utils/cn";
import { useSectionKeyboard } from "@/hooks/useSectionKeyboard";
import { consumeScrollToSection, scrollToSectionId } from "@/lib/navigation/scroll-to-section";

export function PortfolioPage() {
  const [booted, setBooted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const gsapOn = booted && !reduced;

  useSectionKeyboard(gsapOn);

  useEffect(() => {
    if (!booted) return;
    const pending = consumeScrollToSection();
    const hashId = window.location.hash.replace(/^#/, "");
    const target = pending ?? (hashId || null);
    if (!target) return;
    const t = window.setTimeout(() => {
      scrollToSectionId(target);
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }, 120);
    return () => window.clearTimeout(t);
  }, [booted]);

  return (
    <ResumeProvider>
      <main className="site-page bg-[var(--paper)]">
        {!booted && <BootSequence onDone={() => setBooted(true)} />}
        <ResumeModal />
        <GsapProvider enabled={gsapOn}>
        <ScrollOrchestrator enabled={gsapOn} root={contentRef} />
        <div
          ref={contentRef}
          className={cn("site-page__content", booted ? "opacity-100" : "opacity-0")}
        >
          <AgentCrosshair enabled={gsapOn} />
          <SystemOverload enabled={gsapOn} contentRoot={contentRef} />
          <SiteNav />

          <div id="top">
            <HeroSection booted={booted} />
            <StoryGuide />
            {portfolioChapters.map((ch) => {
              const Section = portfolioSectionComponents[ch.sectionId];
              return (
                <span key={ch.chapter} className="contents">
                  <ChapterDivider
                    chapter={ch.chapter}
                    arc={ch.arc}
                    log={ch.log}
                    title={ch.title}
                    beat={ch.beat}
                  />
                  <Section scrollEnabled={gsapOn} />
                </span>
              );
            })}
          </div>

          <footer className="site-page-footer border-t-4 border-[var(--border-strong)] py-8 text-center font-label text-xs text-muted-label normal-case tracking-normal">
            <p className="font-bold text-[var(--ink)]">
              © nahndev · FPT Software · interactive portfolio
            </p>
            <p className="mt-2 mx-auto max-w-md text-[10px] leading-relaxed">{footerMotto}</p>
          </footer>
        </div>
        </GsapProvider>
      </main>
    </ResumeProvider>
  );
}
