"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ImpactSlash } from "@/components/manga/effects/ImpactSlash";

type Props = {
  slug: string;
  children: React.ReactNode;
  className?: string;
};

export function ProjectLink({ slug, children, className }: Props) {
  const router = useRouter();
  const [slashing, setSlashing] = useState(false);
  const href = `/projects/${slug}`;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setSlashing(true);
    },
    [],
  );

  const onSlashComplete = useCallback(() => {
    setSlashing(false);
    router.push(href);
  }, [router, href]);

  const prefetch = useCallback(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={prefetch}
        onFocus={prefetch}
        className={className}
      >
        {children}
      </a>
      <ImpactSlash active={slashing} onComplete={onSlashComplete} />
    </>
  );
}
