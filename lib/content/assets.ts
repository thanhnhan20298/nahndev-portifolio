/**
 * Image manifest — WebP files under public/images/.
 * Replace art: add PNG locally → npm run images:optimize → commit .webp.
 */

import type { ProjectArtKey, SectionBackdropId } from "./types";

export const assets = {
  avatar: "/images/avatar/agent-portrait.webp",

  hero: {
    backdrop: "/images/hero/field-hq-backdrop.webp",
    hud: "/images/hero/tactical-hud.webp",
  },

  projects: {
    "manga-portfolio": "/images/projects/manga-portfolio-cover.webp",
    "crypto-tools": "/images/projects/crypto-tools-cover.webp",
  } satisfies Record<ProjectArtKey, string>,

  chapters: {
    about: "/images/chapters/about-briefing.webp",
    skills: "/images/chapters/radar-scan.webp",
    showcase: "/images/chapters/motion-lab.webp",
    experience: "/images/chapters/mission-log.webp",
    projects: "/images/chapters/case-files.webp",
    contact: "/images/chapters/comms-channel.webp",
  } satisfies Record<SectionBackdropId, string>,
} as const;

export function projectArtSrc(slug: string): string | undefined {
  if (slug in assets.projects) {
    return assets.projects[slug as ProjectArtKey];
  }
  return undefined;
}

export function sectionBackdropSrc(sectionId: string): string | undefined {
  if (sectionId in assets.chapters) {
    return assets.chapters[sectionId as SectionBackdropId];
  }
  return undefined;
}
