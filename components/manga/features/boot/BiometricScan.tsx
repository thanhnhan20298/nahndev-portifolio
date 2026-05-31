"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { systemIntro } from "@/lib/content/intro";

type Props = {
  onComplete: () => void;
  durationMs?: number;
};

/**
 * CSS biometric scan (red laser). Swap for Lottie: `public/lottie/biometric-scan.json`
 * and `LottieBiometricScan` when needed.
 */
export function BiometricScan({ onComplete, durationMs = 2400 }: Props) {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const steps = systemIntro.scanLines.length;
    const stepMs = Math.floor((durationMs - 400) / steps);
    const timers = systemIntro.scanLines.map((_, i) =>
      setTimeout(() => setLine(i + 1), 300 + i * stepMs),
    );
    const done = setTimeout(onComplete, durationMs);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [durationMs, onComplete]);

  return (
    <div className="biometric-scan" aria-hidden>
      <div className="biometric-scan__grid" />
      <div className="biometric-scan__frame">
        <div className="biometric-scan__reticle" />
        <motion.div
          className="biometric-scan__laser"
          initial={{ top: "8%" }}
          animate={{ top: ["8%", "88%", "12%", "75%", "8%"] }}
          transition={{ duration: durationMs / 1000, ease: "linear" }}
        />
        <motion.div
          className="biometric-scan__pulse"
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
      <div className="biometric-scan__hud font-mono text-xs">
        {systemIntro.scanLines.slice(0, line).map((t) => (
          <p key={t} className="text-[var(--accent)]">
            {">"} {t}
          </p>
        ))}
      </div>
    </div>
  );
}
