/** Shared content & site types — import from here, not duplicated per file */

export type PortfolioSectionId =
  | "about"
  | "skills"
  | "showcase"
  | "experience"
  | "projects"
  | "contact";

export type PortfolioChapter = {
  chapter: string;
  arc: string;
  title: string;
  log: string;
  sectionId: PortfolioSectionId;
  beat: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  github: string;
  tags: string[];
  year: string;
  role: string;
  highlights: string[];
  pipeline?: string[];
  /** Live demo URL (optional) */
  demoUrl?: string;
};

export type ExperienceArc = {
  arc: string;
  title: string;
  period: string;
  role: string;
  bullets: string[];
};

export type Award = {
  year: string;
  short: string;
  name: string;
  note: string;
};

export type ArchNode = {
  id: string;
  label: string;
  angle: number;
  radius: number;
  tier: "core" | "service" | "data" | "ops";
};

export type ProjectArtKey = "manga-portfolio" | "crypto-tools";

export type SectionBackdropId = PortfolioSectionId;
