/** Portfolio chapters — section order, nav labels, chapter dividers */

import type { PortfolioChapter } from "./types";

export type { PortfolioChapter, PortfolioSectionId } from "./types";

export const portfolioChapters: PortfolioChapter[] = [
  {
    chapter: "Chapter 02",
    arc: "Intro",
    title: "About",
    log: "About",
    sectionId: "about",
    beat: "Opening frame — meet the agent before the architecture map.",
  },
  {
    chapter: "Chapter 03",
    arc: "Skills",
    title: "Skills",
    log: "Skills",
    sectionId: "skills",
    beat: "Scroll — laser sweep across the classified full-stack diagram.",
  },
  {
    chapter: "Chapter 04",
    arc: "Motion lab",
    title: "Showcase",
    log: "Showcase",
    sectionId: "showcase",
    beat: "One breath — feel how this page moves and responds.",
  },
  {
    chapter: "Chapter 05",
    arc: "Experience",
    title: "Journey",
    log: "Experience",
    sectionId: "experience",
    beat: "Mission log — FPT and side projects.",
  },
  {
    chapter: "Chapter 06",
    arc: "Projects",
    title: "Projects",
    log: "Projects",
    sectionId: "projects",
    beat: "Case files — click to open each project dossier.",
  },
  {
    chapter: "Chapter 07",
    arc: "Contact",
    title: "Contact",
    log: "Contact",
    sectionId: "contact",
    beat: "Comms channel — reach out if you want to collaborate.",
  },
];

export const heroChapter = {
  chapter: "Chapter 01",
  arc: "Portfolio",
  log: "Boot",
};

export const footerMotto = "nahndev · FPT Software · interactive portfolio — black & red";
