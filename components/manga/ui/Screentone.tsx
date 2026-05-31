import { cn } from "@/lib/utils/cn";

type Props = {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Screentone({ active, className, children, ...rest }: Props) {
  return (
    <div
      className={cn("screentone", active && "screentone-active", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
