"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SNAP_EASE } from "@/lib/motion/motion";
import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
};

/** Title — fade once, no loop (readable) */
export function TitleStamp({ children, className, show = true }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 8 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: SNAP_EASE }}
    >
      {children}
    </motion.div>
  );
}
