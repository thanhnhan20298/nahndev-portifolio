"use client";

import { useSectionSpy } from "@/hooks/useSectionSpy";
import { cn } from "@/lib/utils/cn";
import { ScrollProgress } from "@/components/manga/effects/ScrollProgress";

const nav = [
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#showcase", id: "showcase", label: "Showcase" },
  { href: "#experience", id: "experience", label: "Journey" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export function MangaNav() {
  const activeSection = useSectionSpy(nav.map((n) => n.id));

  return (
    <nav className="manga-nav sticky top-0 z-50">
      <ScrollProgress />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 font-label text-[11px] md:gap-6 md:px-8 md:text-xs">
        <a href="#top" className="manga-nav__brand">
          <strong>nahn</strong>dev
        </a>
        <span className="hidden h-4 w-px bg-[var(--border-subtle)] sm:block" aria-hidden />
        {nav.map((item) => {
          const active = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn("manga-nav-link", active && "manga-nav-link--active")}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
