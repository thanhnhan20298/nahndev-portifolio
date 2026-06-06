"use client";

import { useEffect } from "react";
import { portfolioChapters } from "@/lib/content/adventure";
import { toggleSoundEnabled } from "@/lib/audio/sound-settings";
import { scrollToSectionId } from "@/lib/navigation/scroll-to-section";

const KEY_MAP: Record<string, string> = {
  "1": "about",
  "2": "skills",
  "3": "showcase",
  "4": "experience",
  "5": "projects",
  "6": "contact",
};

export function useSectionKeyboard(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        toggleSoundEnabled();
        window.dispatchEvent(new CustomEvent("nahndev-sound-toggle"));
        return;
      }

      if (e.key === "0" || e.key === "h" || e.key === "H") {
        e.preventDefault();
        scrollToSectionId("top");
        return;
      }

      const id = KEY_MAP[e.key];
      if (!id) return;
      if (!portfolioChapters.some((ch) => ch.sectionId === id)) return;

      e.preventDefault();
      scrollToSectionId(id);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);
}
