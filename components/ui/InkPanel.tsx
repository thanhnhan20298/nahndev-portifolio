import { cn } from "@/lib/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  clip?: "none" | "diag-tr" | "diag-bl";
  large?: boolean;
  overlap?: boolean;
  /** soft = thin border, no hard shadow (skills, lists) */
  tone?: "ink" | "soft";
};

const CLIPS = {
  none: "",
  "diag-tr": "[clip-path:polygon(0_0,100%_0,100%_88%,92%_100%,0_100%)]",
  "diag-bl": "[clip-path:polygon(0_12%,8%_0,100%_0,100%_100%,0_100%)]",
};

export function InkPanel({
  children,
  className,
  clip = "none",
  large,
  overlap,
  tone = "ink",
}: Props) {
  return (
    <div
      className={cn(
        tone === "soft" ? "panel-soft overflow-visible" : "ink-border bg-panel",
        tone === "ink" && large && "shadow-[4px_4px_0_rgba(10,10,10,0.1)]",
        overlap && "site-panel-overlap",
        clip !== "none" && tone === "ink" && CLIPS[clip],
        className,
      )}
    >
      {children}
    </div>
  );
}
