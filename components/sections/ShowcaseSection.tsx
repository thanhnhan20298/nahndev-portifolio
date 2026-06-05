"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PanelSlide } from "@/components/ui/PanelSlide";
import { InkPanel } from "@/components/ui/InkPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import { SNAP_EASE, SLASH } from "@/lib/motion/motion";
import { ActionSwoosh } from "@/components/effects/ActionSwoosh";
import { Speedlines } from "@/components/ui/Speedlines";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "motion" as const, label: "Panel snap", hint: "Scroll-driven motion on this portfolio." },
  {
    id: "impact" as const,
    label: "Impact flash",
    hint: "Flash effect when opening a project page.",
  },
  {
    id: "pipeline" as const,
    label: "C-FAT architecture",
    hint: "Illustrated pipeline — bot runs on the server, no trading in the browser.",
  },
] as const;

const pipeline = ["WS kline", "EMA cross", "Risk ×5", "dry-run / order"];

function actionLabel(tab: (typeof tabs)[number]["id"]) {
  if (tab === "motion") return "Try panel snap →";
  if (tab === "impact") return "Try flash →";
  return "Step through →";
}

export function ShowcaseSection() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("motion");
  const [snap, setSnap] = useState(false);
  const [flash, setFlash] = useState(false);
  const [slashPlay, setSlashPlay] = useState(false);
  const [step, setStep] = useState(-1);
  const active = tabs.find((t) => t.id === tab)!;
  const { shrinkMs, flashMs } = SLASH.impact;

  return (
    <SectionShell
      id="showcase"
      title="Showcase"
      arcLabel="Motion lab"
      sfx="バーン"
      sfxVariant="action"
      subtitle="Portfolio motion + C-FAT flow (illustrated). Live bot: see C-FAT project & GitHub."
    >
      <div data-showcase-scene className="relative overflow-hidden">
        <div data-showcase-impact className="showcase-impact-burst" aria-hidden>
          <Speedlines className="opacity-50" strong />
        </div>
        <PanelSlide from="left" afterChapter>
          <div data-showcase-panel className="relative z-[1]">
            <InkPanel className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "ink-border-thin px-3 py-2 text-xs font-black uppercase",
                      tab === t.id && "bg-[var(--accent)] text-white",
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed site-text-dim">{active.hint}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (tab === "motion") {
                      setSnap(false);
                      requestAnimationFrame(() => setSnap(true));
                      setTimeout(() => setSnap(false), 500);
                    } else if (tab === "impact") {
                      setSlashPlay(false);
                      requestAnimationFrame(() => setSlashPlay(true));
                      setFlash(true);
                      setTimeout(() => setFlash(false), shrinkMs + flashMs);
                    } else {
                      setStep((s) => (s >= 3 ? -1 : s + 1));
                    }
                  }}
                  className="site-cta px-5 py-2.5 text-sm font-bold"
                >
                  {actionLabel(tab)}
                </button>

                <div
                  className={cn(
                    "relative min-h-[120px] overflow-hidden border-2 border-[var(--border-strong)] bg-[var(--paper)] p-5",
                    flash && "invert",
                  )}
                >
                  <ActionSwoosh
                    active={slashPlay && tab === "impact"}
                    size="card"
                    autoHideMs={SLASH.totalMs}
                    onComplete={() => setSlashPlay(false)}
                  />
                  {tab === "motion" && (
                    <motion.div
                      className="h-16 w-4/5 max-w-sm border-2 border-[var(--border-strong)] bg-panel"
                      initial={{ x: -48, opacity: 0, scale: 0.94 }}
                      animate={
                        snap ? { x: 0, opacity: 1, scale: 1 } : { x: -48, opacity: 0, scale: 0.94 }
                      }
                      transition={{ duration: 0.28, ease: SNAP_EASE }}
                    />
                  )}
                  {tab === "impact" && (
                    <p className="relative z-[1] text-xs leading-relaxed">
                      Impact ~{SLASH.impact.totalMs}ms — slash, shrink, flash (synced with project
                      open).
                    </p>
                  )}
                  {tab === "pipeline" && (
                    <ul className="space-y-2 font-mono text-xs leading-relaxed">
                      {pipeline.map((label, i) => (
                        <li
                          key={label}
                          className={cn(
                            step >= i ? "font-bold text-[var(--accent)]" : "opacity-40",
                          )}
                        >
                          {step >= i ? "▸" : "○"} {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {tab === "pipeline" && (
                <Link
                  href="/projects/crypto-tools"
                  className="mt-6 inline-block text-sm font-bold text-[var(--accent)] hover:underline"
                >
                  C-FAT details & GitHub →
                </Link>
              )}
            </InkPanel>
          </div>
        </PanelSlide>
      </div>
    </SectionShell>
  );
}
