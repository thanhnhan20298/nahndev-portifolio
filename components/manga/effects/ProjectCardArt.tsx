"use client";

import { cn } from "@/lib/utils/cn";

type Props = {
  variant: "manga" | "terminal";
};

/** Fixed 3D illustration — no copy, no layout shift */
export function ProjectCardArt({ variant }: Props) {
  return (
    <div className="project-card-art" aria-hidden>
      <div
        className={cn(
          "project-card-art__scene",
          variant === "terminal" && "project-card-art__scene--terminal",
        )}
      >
        <span className="project-card-art__panel project-card-art__panel--a" />
        <span className="project-card-art__panel project-card-art__panel--b" />
        {variant === "terminal" && <span className="project-card-art__cursor" />}
      </div>
    </div>
  );
}
