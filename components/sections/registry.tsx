"use client";

import type { PortfolioSectionId } from "@/lib/content/adventure";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { ExperienceSection } from "./ExperienceSection";
import { ProjectsSection } from "./ProjectsSection";
import { ShowcaseSection } from "./ShowcaseSection";
import { SkillsSection } from "./SkillsSection";

type SectionProps = { scrollEnabled?: boolean };

type SectionComponent = (props: SectionProps) => React.JSX.Element;

function wrap(C: () => React.JSX.Element, name: string): SectionComponent {
  const W = () => <C />;
  W.displayName = name;
  return W;
}

export const portfolioSectionComponents: Record<PortfolioSectionId, SectionComponent> = {
  about: wrap(AboutSection, "AboutSection"),
  skills: SkillsSection,
  showcase: wrap(ShowcaseSection, "ShowcaseSection"),
  experience: wrap(ExperienceSection, "ExperienceSection"),
  projects: wrap(ProjectsSection, "ProjectsSection"),
  contact: wrap(ContactSection, "ContactSection"),
};
