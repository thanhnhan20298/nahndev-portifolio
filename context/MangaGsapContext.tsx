"use client";

import { createContext, useContext } from "react";

const MangaGsapContext = createContext({ enabled: false });

export function MangaGsapProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <MangaGsapContext.Provider value={{ enabled }}>{children}</MangaGsapContext.Provider>
  );
}

export function useMangaGsap() {
  return useContext(MangaGsapContext);
}
