"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  tail?: "left" | "right";
  shout?: boolean;
  typewriter?: boolean;
  typewriterMs?: number;
};

export function SpeechBubble({
  children,
  className,
  tail = "left",
  shout,
  typewriter,
  typewriterMs = 28,
}: Props) {
  const reduced = useReducedMotion();
  const text = typeof children === "string" ? children : null;
  const [shown, setShown] = useState(reduced || !typewriter || !text ? (text ?? "") : "");

  useEffect(() => {
    if (reduced || !typewriter || !text) {
      setShown(text ?? "");
      return;
    }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, typewriterMs);
    return () => clearInterval(id);
  }, [text, typewriter, typewriterMs, reduced]);

  return (
    <div
      className={cn(
        "speech-bubble relative bg-panel ink-border-thin px-4 py-3 text-sm font-medium leading-snug md:text-base",
        shout && "speech-bubble--shout",
        className,
      )}
    >
      {typewriter && text ? (
        <span className="relative block">
          <span className="invisible block whitespace-pre-wrap" aria-hidden>
            {text}
          </span>
          <span className="absolute inset-0 block whitespace-pre-wrap">
            {shown}
            {shown.length < text.length && (
              <span
                className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[var(--accent)]"
                aria-hidden
              />
            )}
          </span>
        </span>
      ) : (
        children
      )}
      <span
        className={cn(
          "absolute bottom-0 h-0 w-0 border-[10px] border-transparent",
          tail === "left" && "-left-2 border-r-white border-b-black",
          tail === "right" && "-right-2 border-l-white border-b-black",
        )}
        style={{ transform: "translateY(100%)" }}
        aria-hidden
      />
    </div>
  );
}
