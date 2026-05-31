"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PAGE_ENTER, SNAP_EASE } from "@/lib/motion/motion";
import type { Project } from "@/lib/content/projects";
import { BackToPortfolioLink } from "./BackToPortfolioLink";
import { InkPanel } from "@/components/manga/ui/InkPanel";

type Props = {
  project: Project;
};

export function ProjectPageEnter({ project }: Props) {
  const reduced = useReducedMotion();

  return (
    <main className="min-h-screen bg-[var(--paper)]">
      <motion.div
        className="mx-auto max-w-2xl px-4 py-12 md:px-8"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : PAGE_ENTER.duration, ease: SNAP_EASE }}
      >
        <BackToPortfolioLink />

        <header className="mt-8">
          <p className="font-label text-xs text-[var(--accent)]">
            {project.year} · {project.role}
          </p>
          <h1 className="font-display mt-3 text-3xl uppercase md:text-4xl">{project.title}</h1>
          <p className="mt-4 text-base leading-relaxed manga-text-body">{project.description}</p>
        </header>

        <InkPanel tone="soft" className="mt-8 p-5 md:p-6">
          <h2 className="font-label text-[10px] text-muted-label">Highlights</h2>
          <ul className="mt-3 space-y-2 border-l-2 border-[var(--accent)] pl-4">
            {project.highlights.map((h) => (
              <li key={h} className="text-sm leading-relaxed manga-text-body">
                {h}
              </li>
            ))}
          </ul>
        </InkPanel>

        {project.pipeline && (
          <InkPanel tone="soft" className="mt-4 p-5 md:p-6">
            <h2 className="font-label text-[10px] text-muted-label">Pipeline</h2>
            <ol className="mt-3 space-y-2">
              {project.pipeline.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm manga-text-body">
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </InkPanel>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-sm manga-tag-bg px-2 py-0.5 text-[10px] font-semibold manga-text-dim"
            >
              {t}
            </li>
          ))}
        </ul>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="manga-cta mt-8 inline-block px-5 py-2 text-sm font-bold"
        >
          GitHub →
        </a>
      </motion.div>
    </main>
  );
}
