"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Speedlines } from "@/components/ui/Speedlines";
import { Onomatopoeia } from "@/components/ui/Onomatopoeia";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { TitleStamp } from "@/components/ui/TitleStamp";
import { sectionBackdropSrc } from "@/lib/content/assets";

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
  const backdrop = sectionBackdropSrc(id);

  return (
    <section
      id={id}
      className={cn(
        "site-scroll-section relative overflow-hidden border-b-4 site-border-section py-14 md:py-20",
        className,
      )}
    >
      {backdrop && <SectionBackdrop src={backdrop} />}
      <Speedlines
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
        <header ref={headerRef} className="site-section-head mb-8 md:mb-10">
          {arcLabel ? (
            <span className="site-arc-badge mb-2">{arcLabel}</span>
          ) : (
            <p className="font-jp text-[11px] font-bold tracking-[0.15em] text-[var(--accent)]">
              ◆
            </p>
          )}
          <TitleStamp show={titleInView}>
            <h2 className="font-display site-title-stroke mt-1 text-4xl uppercase md:text-5xl">
              {title}
            </h2>
          </TitleStamp>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed site-text-dim">
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
