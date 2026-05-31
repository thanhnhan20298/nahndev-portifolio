"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ActionSwoosh } from "./ActionSwoosh";
import { IMPACT_SHRINK_3D, SLASH, SNAP_EASE } from "@/lib/motion/motion";

type Props = {
  active: boolean;
  onComplete: () => void;
};

type Phase = "slash" | "shrink" | "flash" | "exit" | "done";

export function ImpactSlash({ active, onComplete }: Props) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("slash");
  const [slash, setSlash] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      onComplete();
      return;
    }
    setPhase("slash");
    setSlash(true);

    const { shrinkMs, flashMs, exitMs } = SLASH.impact;
    const tShrink = setTimeout(() => {
      setSlash(false);
      setPhase("shrink");
    }, SLASH.totalMs);

    const tFlash = setTimeout(() => setPhase("flash"), SLASH.totalMs + shrinkMs);
    const tExit = setTimeout(() => setPhase("exit"), SLASH.totalMs + shrinkMs + flashMs);
    const tDone = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, SLASH.totalMs + shrinkMs + flashMs + exitMs);

    return () => {
      clearTimeout(tShrink);
      clearTimeout(tFlash);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [active, onComplete, reduced]);

  if (reduced) return null;

  const showOverlay = active && phase !== "done";

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="impact-slash-scene fixed inset-0 z-[200] pointer-events-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SLASH.impact.exitMs / 1000 }}
        >
          <motion.div
            className="absolute inset-0 bg-[var(--ink)]"
            animate={{
              backgroundColor: phase === "flash" ? "#fff8f0" : "var(--ink)",
            }}
            transition={{ duration: 0.04 }}
          />

          <motion.div
            className="impact-slash-3d absolute inset-0 origin-center"
            style={{ transformStyle: "preserve-3d" }}
            animate={
              phase === "shrink"
                ? IMPACT_SHRINK_3D
                : { scaleX: 1, scaleY: 1, rotateX: 0, z: 0, opacity: 1 }
            }
            transition={{ duration: SLASH.impact.shrinkMs / 1000, ease: SNAP_EASE }}
          >
            <ActionSwoosh active={slash} cross size="full" autoHideMs={SLASH.totalMs} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
