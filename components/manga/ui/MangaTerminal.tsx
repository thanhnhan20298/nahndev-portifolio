"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { terminalScenes } from "@/lib/content/terminal";
import { cn } from "@/lib/utils/cn";

const BODY_MIN_H = "9.75rem";

export function MangaTerminal() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [readyFlash, setReadyFlash] = useState(false);
  const scene = terminalScenes[sceneIdx];

  useEffect(() => {
    const lines = terminalScenes[sceneIdx].lines;
    setVisibleLines(0);
    setReadyFlash(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 280 + i * 220));
    });
    const allDone = 280 + lines.length * 220;
    timers.push(
      setTimeout(() => {
        setReadyFlash(true);
        setTimeout(() => setReadyFlash(false), 400);
      }, allDone),
    );
    timers.push(
      setTimeout(() => {
        setSceneIdx((s) => (s + 1) % terminalScenes.length);
      }, allDone + 2400),
    );
    return () => timers.forEach(clearTimeout);
  }, [sceneIdx]);

  return (
    <div
      className={cn(
        "manga-terminal ink-border bg-[var(--figure)] p-4 font-mono text-xs text-[var(--ink)] transition-colors md:text-sm",
        readyFlash && "ring-2 ring-[var(--accent)]",
      )}
    >
      <div className="mb-3 flex gap-1.5 border-b border-white/20 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
        <span className="ml-auto text-[10px] uppercase tracking-widest text-[var(--accent)]">
          {scene.label}
        </span>
      </div>
      <motion.div
        key={sceneIdx}
        className="space-y-1"
        style={{ minHeight: BODY_MIN_H }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {scene.lines.map((line, i) => (
          <p
            key={`${sceneIdx}-${line}`}
            className={cn(
              "transition-opacity duration-150",
              i < visibleLines ? "opacity-100" : "opacity-0",
              line.startsWith("✓") && "text-green-400",
              line.startsWith("▸") && "text-white/80",
            )}
            aria-hidden={i >= visibleLines}
          >
            {line}
            {i === visibleLines - 1 && visibleLines < scene.lines.length && (
              <span className="ml-1 inline-block h-3 w-2 animate-pulse bg-[var(--accent)]" />
            )}
          </p>
        ))}
        <p
          className={cn(
            "mt-2 font-bold text-[var(--accent)] transition-opacity duration-150",
            readyFlash && visibleLines >= scene.lines.length ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={!(readyFlash && visibleLines >= scene.lines.length)}
        >
          ▸ READY
        </p>
      </motion.div>
      <div className="mt-3 flex gap-2">
        {terminalScenes.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setSceneIdx(i)}
            className={cn(
              "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border border-white/30",
              i === sceneIdx && "bg-[var(--accent)] border-[var(--accent)] text-white",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
