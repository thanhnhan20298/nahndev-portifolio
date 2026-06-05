"use client";

import { createContext, useContext } from "react";

const GsapContext = createContext({ enabled: false });

export function GsapProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  return <GsapContext.Provider value={{ enabled }}>{children}</GsapContext.Provider>;
}

export function useGsapMotion() {
  return useContext(GsapContext);
}
