import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  variant?: "radial" | "side";
  strong?: boolean;
};

export function Speedlines({ className, variant = "radial", strong }: Props) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        variant === "radial" && "site-speedlines",
        variant === "side" && "site-speedlines-side",
        strong && "opacity-90",
        className,
      )}
      aria-hidden
    />
  );
}
