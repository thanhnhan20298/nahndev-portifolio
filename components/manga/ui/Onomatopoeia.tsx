"use client";

import { cn } from "@/lib/utils/cn";

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "default" | "ink" | "pop" | "action";
  jp?: boolean;
};

export function Onomatopoeia({ text, className, style, variant = "default", jp }: Props) {
  return (
    <span
      className={cn(
        "onomatopoeia absolute text-4xl md:text-6xl",
        variant === "ink" && "onomatopoeia--ink",
        variant === "pop" && "onomatopoeia--pop",
        variant === "action" && "onomatopoeia--action",
        jp && "font-jp tracking-tight",
        className,
      )}
      style={style}
      aria-hidden
    >
      {text}
    </span>
  );
}
