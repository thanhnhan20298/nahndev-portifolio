const STORAGE_KEY = "nahndev:scroll-to";

export function markScrollToSection(sectionId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, sectionId);
}

export function consumeScrollToSection(): string | null {
  if (typeof window === "undefined") return null;
  const id = sessionStorage.getItem(STORAGE_KEY);
  if (id) sessionStorage.removeItem(STORAGE_KEY);
  return id;
}

export function scrollToSectionId(sectionId: string, behavior: ScrollBehavior = "smooth") {
  document.getElementById(sectionId)?.scrollIntoView({ behavior, block: "start" });
}
