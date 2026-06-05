"use client";

import { PanelSlide } from "@/components/ui/PanelSlide";
import { InkPanel } from "@/components/ui/InkPanel";
import { story } from "@/lib/content/story";

export function StoryGuide() {
  const { prologue } = story;

  return (
    <section className="border-b-4 site-border-section px-4 py-10 md:px-8 md:py-14">
      <div className="site-story-block mx-auto max-w-3xl">
        <PanelSlide from="bottom" delay={0.05}>
          <InkPanel tone="soft" className="p-6 md:p-10">
            <p className="font-label text-xs text-[var(--accent)]">{prologue.title}</p>
            <p className="story-lead mt-5">{prologue.lead}</p>
            <div className="mt-6 space-y-5">
              {prologue.paragraphs.map((p) => (
                <p key={p} className="text-sm leading-relaxed site-text-body md:text-[15px]">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 border-t site-border-section pt-6">
              <p className="font-label text-[10px] text-muted-label">Reading protocol</p>
              <ol className="mt-3 space-y-1.5 font-mono text-[11px] site-text-dim md:text-xs">
                {prologue.trail.map((step, i) => (
                  <li key={step}>
                    <span className="text-[var(--accent)]">{String(i + 1).padStart(2, "0")}.</span>{" "}
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <p className="story-sign mt-8">{prologue.sign}</p>
          </InkPanel>
        </PanelSlide>
      </div>
    </section>
  );
}
