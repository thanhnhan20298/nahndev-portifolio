"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { MangaSpeedlines } from "@/components/manga/ui/MangaSpeedlines";
import { Onomatopoeia } from "@/components/manga/ui/Onomatopoeia";
import { TitleStamp } from "@/components/manga/ui/TitleStamp";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  arcLabel?: string;
  children: React.ReactNode;
  className?: string;
  sfx?: string;
  sfxVariant?: "ink" | "pop" | "action";
};

export function SectionShell({
  id,
  title,
  subtitle,
  arcLabel,
  children,
  className,
  sfx,
  sfxVariant = "ink",
}: Props) {
  const headerRef = useRef<HTMLElement>(null);
  const titleInView = useInView(headerRef, { once: true, amount: 0.6 });

  return (
    <section
      id={id}
      className={cn(
        "manga-scroll-section relative overflow-hidden border-b-4 manga-border-section py-14 md:py-20",
        className,
      )}
    >
      <MangaSpeedlines
        variant="side"
        className="gsap-speedline-layer left-0 top-0 h-full w-1/3 opacity-50"
      />
      {sfx && titleInView && (
        <Onomatopoeia
          text={sfx}
          variant={sfxVariant}
          jp={/[\u3040-\u9fff]/.test(sfx)}
          className="right-6 top-16 rotate-6 text-3xl md:text-5xl opacity-40"
        />
      )}
      <div className="relative z-[1] mx-auto max-w-6xl px-4 md:px-8">
        <header ref={headerRef} className="manga-section-head mb-8 md:mb-10">
          {arcLabel ? (
            <span className="manga-arc-badge mb-2">{arcLabel}</span>
          ) : (
            <p className="font-jp text-[11px] font-bold tracking-[0.15em] text-[var(--accent)]">
              ◆
            </p>
          )}
          <TitleStamp show={titleInView}>
            <h2 className="font-display manga-title-stroke mt-1 text-4xl uppercase md:text-5xl">
              {title}
            </h2>
          </TitleStamp>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed manga-text-dim">
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
