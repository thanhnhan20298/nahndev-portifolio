"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  src: string;
  /** 0–1 — keep low so text stays readable */
  opacity?: number;
  parallax?: boolean;
};

/** Wide manga panel behind a section — hidden if file missing */
export function SectionBackdrop({ src, opacity = 0.16, parallax = true }: Props) {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  if (!visible) return null;

  const image = (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      className="section-backdrop__image object-cover object-center"
      style={{ opacity }}
      onError={() => setVisible(false)}
    />
  );

  return (
    <div
      ref={ref}
      className="section-backdrop pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      <div className="absolute inset-0 overflow-hidden">
        {parallax && !reduced ? (
          <motion.div className="absolute inset-[-8%]" style={{ y }}>
            {image}
          </motion.div>
        ) : (
          image
        )}
      </div>
      <div className="section-backdrop__veil" />
    </div>
  );
}
