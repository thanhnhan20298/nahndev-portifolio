"use client";

import { PanelSlide } from "@/components/ui/PanelSlide";
import { PanelStagger } from "@/components/ui/PanelStagger";
import { InkPanel } from "@/components/ui/InkPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { contact } from "@/lib/content/contact";

export function ContactSection() {
  return (
    <SectionShell id="contact" title="Contact" arcLabel="Contact" sfx="ズキン" sfxVariant="pop">
      <PanelSlide from="left" afterChapter>
        <InkPanel className="p-8 md:p-10">
          <PanelStagger>
            <SpeechBubble className="max-w-md">
              Have a project or want to collaborate? Send an email — I reply quickly.
            </SpeechBubble>
            <a
              href={`mailto:${contact.email}`}
              className="site-cta mt-8 inline-block px-6 py-3 text-sm font-black uppercase ink-border"
            >
              {contact.email}
            </a>
            <ul className="mt-6 flex flex-wrap gap-4">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline decoration-2 underline-offset-4 hover:text-[var(--accent)]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </PanelStagger>
        </InkPanel>
      </PanelSlide>
    </SectionShell>
  );
}
