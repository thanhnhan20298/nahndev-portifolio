"use client";

import { ActionSwoosh } from "./ActionSwoosh";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/** One slash on viewport enter — chapter divider only */
export function SlashOnScroll({ id, children, className }: Props) {
  const { ref, slashActive, clearSlash, slashDurationMs } = useScrollReveal({
    variant: "slash",
    amount: 0.35,
  });

  return (
    <section ref={ref} id={id} className={className}>
      <ActionSwoosh
        active={slashActive}
        autoHideMs={slashDurationMs}
        size="full"
        cross
        onComplete={clearSlash}
      />
      {children}
    </section>
  );
}
