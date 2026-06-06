"use client";

import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { siteNavItems } from "@/lib/config/navigation";
import { useSectionSpy } from "@/hooks";
import { cn } from "@/lib/utils/cn";

export function SiteNav() {
  const activeSection = useSectionSpy(siteNavItems.map((n) => n.id));

  return (
    <nav className="site-nav sticky top-0 z-50" aria-label="Main">
      <ScrollProgress />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 font-label text-[11px] md:gap-6 md:px-8 md:text-xs">
        <a href="#top" className="site-nav__brand">
          <strong>nahn</strong>dev
        </a>
        <span className="hidden h-4 w-px bg-[var(--border-subtle)] sm:block" aria-hidden />
        {siteNavItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn("site-nav-link", active && "site-nav-link--active")}
            >
              {item.label}
            </a>
          );
        })}
        <SoundToggle className="ml-auto" />
      </div>
    </nav>
  );
}
