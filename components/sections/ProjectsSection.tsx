"use client";

import { InkPanel } from "@/components/ui/InkPanel";
import { ProjectCardArt } from "@/components/effects/ProjectCardArt";
import { ProjectLink } from "@/components/projects/ProjectLink";
import { SectionShell } from "@/components/layout/SectionShell";
import { projectArtSrc } from "@/lib/content/assets";
import { projects } from "@/lib/content/projects";
import type { Project } from "@/lib/content/projects";
import { cn } from "@/lib/utils/cn";

function ProjectCard({ project }: { project: Project }) {
  const { slug, title, description, featured, tags, year, role } = project;
  const artVariant = slug === "crypto-tools" ? "terminal" : "manga";

  return (
    <ProjectLink slug={slug} className="project-card gsap-panel-item group block">
      <InkPanel
        tone="soft"
        className={cn(
          "project-card__panel grid gap-4 p-5 md:grid-cols-[1fr_4.75rem] md:p-6",
          featured && "project-card__panel--featured",
        )}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-label text-[10px] text-muted-label">
              {year} · {role}
            </p>
            {featured && (
              <span className="font-label text-[10px] font-bold text-[var(--accent)]">★</span>
            )}
          </div>

          <h3 className="font-display mt-2 text-xl uppercase tracking-wide md:text-2xl">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed site-text-body">{description}</p>

          <ul className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li
                key={t}
                className="rounded-sm site-tag-bg px-2 py-0.5 text-[10px] font-semibold site-text-dim"
              >
                {t}
              </li>
            ))}
          </ul>

          <p className="project-card__cta mt-3 text-xs font-bold text-[var(--accent)] md:mt-4">
            Details →
          </p>
        </div>

        <ProjectCardArt
          variant={artVariant}
          imageSrc={projectArtSrc(slug)}
          imageAlt={`${title} cover`}
        />
      </InkPanel>
    </ProjectLink>
  );
}

export function ProjectsSection() {
  const ordered = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <SectionShell
      id="projects"
      title="Projects"
      arcLabel="Projects"
      subtitle="Two main repos — click a card for the full dossier."
    >
      <div className="mx-auto flex max-w-2xl flex-col gap-4">
        {ordered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </SectionShell>
  );
}
