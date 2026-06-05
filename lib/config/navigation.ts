import { portfolioChapters } from "@/lib/content/adventure";
import type { PortfolioSectionId } from "@/lib/content/types";

export type SiteNavItem = {
  href: string;
  id: PortfolioSectionId;
  label: string;
};

/** Single source of truth — derived from chapter registry */
export const siteNavItems: SiteNavItem[] = portfolioChapters.map((ch) => ({
  href: `#${ch.sectionId}`,
  id: ch.sectionId,
  label: ch.title,
}));
