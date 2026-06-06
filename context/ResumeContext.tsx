"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type ResumeContextValue = {
  open: boolean;
  openResume: () => void;
  closeResume: () => void;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openResume = useCallback(() => setOpen(true), []);
  const closeResume = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeResume();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeResume]);

  return (
    <ResumeContext.Provider value={{ open, openResume, closeResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
}
