"use client";

import { useResume } from "@/context/ResumeContext";
import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function ResumeOpenButton({ className, children }: Props) {
  const { openResume } = useResume();

  return (
    <button type="button" className={cn(className)} onClick={openResume}>
      {children}
    </button>
  );
}
