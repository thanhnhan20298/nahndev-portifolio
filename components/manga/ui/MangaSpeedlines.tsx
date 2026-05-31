import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  variant?: "radial" | "side";
  strong?: boolean;
};

export function MangaSpeedlines({ className, variant = "radial", strong }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        variant === "radial" && "manga-speedlines",
        variant === "side" && "manga-speedlines-side",
        strong && "opacity-90",
        className,
      )}
      aria-hidden
    />
  );
}
