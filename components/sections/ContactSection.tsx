"use client";

import Link from "next/link";
import { PanelSlide } from "@/components/ui/PanelSlide";
import { PanelStagger } from "@/components/ui/PanelStagger";
import { InkPanel } from "@/components/ui/InkPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import { SpeechBubble } from "@/components/ui/SpeechBubble";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { contact } from "@/lib/content/contact";

export function ContactSection() {
  return (
    <SectionShell id="contact" title="Contact" arcLabel="Contact" sfx="ズキン" sfxVariant="pop">
      <PanelSlide from="left" afterChapter>
        <InkPanel className="p-8 md:p-10">
          <PanelStagger>
            <SpeechBubble className="max-w-md">
              Have a project or want to collaborate? Send a message — I reply quickly.
            </SpeechBubble>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={contact.resumePath}
                className="site-cta inline-block px-6 py-3 text-sm font-black uppercase ink-border"
              >
                View resume
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="ink-border-thin inline-block bg-panel px-6 py-3 text-sm font-bold"
              >
                {contact.email}
              </a>
            </div>
            <ContactForm />
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
