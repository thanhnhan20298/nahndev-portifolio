"use client";

import { Children, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PANEL_DURATION, SNAP_EASE, STAGGER_CHILD, STAMP_SPRING } from "@/lib/motion/motion";
import { cn } from "@/lib/utils/cn";
import { useGsapMotion } from "@/context/GsapContext";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: STAGGER_CHILD, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      opacity: { duration: PANEL_DURATION * 0.8, ease: SNAP_EASE },
      y: { duration: PANEL_DURATION, ease: SNAP_EASE },
      scale: STAMP_SPRING,
    },
  },
};

export function PanelStagger({ children, className }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const { enabled: gsapOn } = useGsapMotion();

  if (gsapOn || reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={container}
      initial="hidden"
      animate={inView || reduced ? "show" : "hidden"}
    >
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
