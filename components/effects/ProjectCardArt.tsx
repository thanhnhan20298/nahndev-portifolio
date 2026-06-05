"use client";

import { CoverImage } from "@/components/ui/AssetImage";
import { cn } from "@/lib/utils/cn";

type Props = {
  variant: "manga" | "terminal";
  imageSrc?: string;
  imageAlt?: string;
};

function CssArt({ variant }: { variant: "manga" | "terminal" }) {
  return (
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
  );
}

/** Cover art or CSS illustration — no layout shift */
export function ProjectCardArt({ variant, imageSrc, imageAlt = "" }: Props) {
  return (
    <div className="project-card-art" aria-hidden>
      {imageSrc ? (
        <CoverImage
          src={imageSrc}
          alt={imageAlt}
          className="project-card-art__cover ink-border-thin"
          fallback={<CssArt variant={variant} />}
        />
      ) : (
        <CssArt variant={variant} />
      )}
    </div>
  );
}
