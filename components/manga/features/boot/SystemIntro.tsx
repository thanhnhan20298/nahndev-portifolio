"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { systemIntro } from "@/lib/content/intro";
import { playAccessBeep } from "@/lib/audio/playBeep";
import { BiometricScan } from "./BiometricScan";

type Props = {
  onDone: () => void;
};

type Phase = "warning" | "scan" | "reveal";

export function SystemIntro({ onDone }: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("warning");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) onDone();
  }, [reduced, onDone]);

  const enterMission = useCallback(() => {
    playAccessBeep();
    setPhase("scan");
  }, []);

  const finishScan = useCallback(() => {
    setPhase("reveal");
    setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 280);
    }, 520);
  }, [onDone]);

  if (reduced) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="system-intro fixed inset-0 z-[300] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <AnimatePresence mode="wait">
            {phase === "warning" && (
              <motion.div
                key="warning"
                className="system-intro__panel relative z-[2] mx-4 max-w-md border-2 border-[var(--accent)] bg-black px-6 py-8 text-center shadow-[0_0_40px_rgba(225,25,36,0.35)]"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-label text-[10px] tracking-[0.4em] text-[var(--accent)]">
                  {systemIntro.alertTitle}
                </p>
                <p className="mt-5 font-mono text-sm font-bold leading-relaxed text-[var(--ink)] md:text-base">
                  {systemIntro.warning}
                </p>
                <button
                  type="button"
                  onClick={enterMission}
                  className="system-intro__alarm-btn manga-cta mt-8 w-full px-4 py-3 font-mono text-xs font-black uppercase tracking-widest"
                >
                  [{systemIntro.button}]
                </button>
                <p className="mt-3 font-mono text-[9px] text-muted-label">
                  [{systemIntro.buttonAlt}]
                </p>
              </motion.div>
            )}

            {phase === "scan" && (
              <motion.div
                key="scan"
                className="absolute inset-0 z-[1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BiometricScan onComplete={finishScan} />
              </motion.div>
            )}

            {phase === "reveal" && (
              <motion.div
                key="reveal"
                className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center bg-black"
                initial={{ clipPath: "inset(48% 0 48% 0)" }}
                animate={{ clipPath: "inset(0% 0 0% 0)", opacity: [1, 1, 0] }}
                transition={{ duration: 0.55, ease: [0.08, 0.95, 0.12, 1], opacity: { delay: 0.35, duration: 0.25 } }}
              >
                <motion.p
                  className="font-mono text-sm font-bold tracking-widest text-[var(--accent)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.08 }}
                >
                  {systemIntro.granted}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {phase === "warning" && (
            <div className="system-intro__noise pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
