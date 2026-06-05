"use client";

import { PanelSlide, PANEL_SLIDE_DELAY } from "@/components/ui/PanelSlide";
import { PanelStagger } from "@/components/ui/PanelStagger";
import { InkPanel } from "@/components/ui/InkPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { about } from "@/lib/content/about";

export function AboutSection() {
  return (
    <SectionShell id="about" title="About" arcLabel="About" sfx="ワクワク">
      <div className="grid gap-6 md:grid-cols-2">
        <PanelSlide from="left" afterChapter>
          <InkPanel clip="diag-bl" className="h-full p-6 md:p-8">
            <PanelStagger>
              <SpeechBubble className="mb-4">{about.summary}</SpeechBubble>
              <p className="text-sm font-medium leading-relaxed">{about.career}</p>
            </PanelStagger>
          </InkPanel>
        </PanelSlide>

        <PanelSlide from="bottom" delay={PANEL_SLIDE_DELAY} afterChapter>
          <InkPanel className="h-full p-6 md:p-8">
            <PanelStagger>
              <p className="font-label text-xs">Hobbies</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.hobbies.map((h) => (
                  <li key={h} className="ink-border-thin bg-panel px-3 py-1 text-sm font-bold">
                    {h}
                  </li>
                ))}
              </ul>
            </PanelStagger>
          </InkPanel>
        </PanelSlide>
      </div>
    </SectionShell>
  );
}
