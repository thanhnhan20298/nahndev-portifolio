"use client";

import { PanelSlide, PANEL_SLIDE_DELAY } from "@/components/ui/PanelSlide";
import { PanelStagger } from "@/components/ui/PanelStagger";
import { InkPanel } from "@/components/ui/InkPanel";
import { AwardBadges } from "@/components/ui/AwardBadges";
import { SectionShell } from "@/components/layout/SectionShell";
import { experience } from "@/lib/content/experience";

function ExperienceCard({
  arc,
  showAwards,
}: {
  arc: (typeof experience)[0];
  showAwards?: boolean;
}) {
  return (
    <InkPanel clip={showAwards ? "diag-tr" : "diag-bl"} className="h-full p-6 md:p-8">
      <PanelStagger>
        <span className="font-label text-xs text-[var(--accent)]">{arc.arc}</span>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-2xl uppercase md:text-3xl">{arc.title}</h3>
          <span className="font-label text-sm normal-case tracking-normal">{arc.period}</span>
        </div>
        <p className="mt-1 text-sm font-bold site-text-dim">{arc.role}</p>
        <ul className="mt-6 space-y-2">
          {arc.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm font-medium">
              <span className="text-[var(--accent)]">■</span>
              {b}
            </li>
          ))}
        </ul>
        {showAwards && <AwardBadges />}
      </PanelStagger>
    </InkPanel>
  );
}

export function ExperienceSection() {
  const [fpt, personal] = experience;

  return (
    <SectionShell
      id="experience"
      title="Journey"
      arcLabel="Experience"
      sfx="キラッ"
      subtitle="FPT Software and side projects — two parallel tracks."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <PanelSlide from="left" afterChapter>
          <ExperienceCard arc={fpt} showAwards />
        </PanelSlide>
        <PanelSlide from="right" delay={PANEL_SLIDE_DELAY} afterChapter>
          <ExperienceCard arc={personal} />
        </PanelSlide>
      </div>
    </SectionShell>
  );
}
