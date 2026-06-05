"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ImpactSlash } from "@/components/effects/ImpactSlash";
import { markScrollToSection } from "@/lib/navigation/scroll-to-section";

export function BackToPortfolioLink() {
  const router = useRouter();
  const [slashing, setSlashing] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setSlashing(true);
  }, []);

  const onComplete = useCallback(() => {
    setSlashing(false);
    markScrollToSection("projects");
    router.replace("/");
  }, [router]);

  return (
    <>
      <Link
        href="/"
        onClick={handleClick}
        className="font-label text-xs hover:text-[var(--accent)]"
      >
        ← Back to portfolio
      </Link>
      <ImpactSlash active={slashing} onComplete={onComplete} />
    </>
  );
}
