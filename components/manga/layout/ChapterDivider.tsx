"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { MangaSpeedlines } from "@/components/manga/ui/MangaSpeedlines";
import { SlashOnScroll } from "@/components/manga/effects/SlashOnScroll";
import { TitleStamp } from "@/components/manga/ui/TitleStamp";

type Props = {
  chapter: string;
  title: string;
  arc?: string;
  log?: string;
  beat?: string;
};

function chapterNo(chapter: string) {
  const m = chapter.match(/\d+/);
  return m ? m[0].padStart(2, "0") : "—";
}

export function ChapterDivider({ chapter, title, arc, log, beat }: Props) {
  const no = chapterNo(chapter);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.8 });

  return (
    <SlashOnScroll className="manga-chapter-band relative py-6 md:py-10">
      <span className="chapter-impact-flash" aria-hidden />
      <div className="manga-gutter" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 pt-10 md:px-8">
        <MangaSpeedlines className="gsap-speedline-layer opacity-40" strong />
        <div className="relative z-[1] flex items-center gap-4">
          <div className="h-1 flex-1 manga-divider-line" />
          <div ref={titleRef} data-chapter-inner className="text-center">
            <p className="font-label text-[10px] font-bold tracking-[0.35em] text-[var(--accent)]">
              {no}
            </p>
            {arc && (
              <p className="manga-chapter-arc text-sm font-bold uppercase md:text-base">{arc}</p>
            )}
            <p className="font-label text-[10px] uppercase tracking-[0.35em] text-muted-label">
              {chapter}
            </p>
            {log && (
              <p className="manga-chapter-log mt-0.5 font-label text-[9px] font-bold uppercase tracking-widest">
                {log}
              </p>
            )}
            <TitleStamp show={titleInView}>
              <p className="font-display manga-title-stroke mt-1 text-2xl uppercase md:text-3xl">
                {title}
              </p>
            </TitleStamp>
            {beat && (
              <p className="manga-story-beat mx-auto mt-4 max-w-md text-sm leading-relaxed">
                {beat}
              </p>
            )}
          </div>
          <div className="h-1 flex-1 manga-divider-line" />
        </div>
      </div>
      <div className="manga-gutter mx-auto mt-10 max-w-6xl" aria-hidden />
    </SlashOnScroll>
  );
}
