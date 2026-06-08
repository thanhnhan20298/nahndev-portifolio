import type { ExperienceArc } from "./types";

export type { ExperienceArc } from "./types";

export const experience: ExperienceArc[] = [
  {
    arc: "Mission · FPT",
    title: "FPT Software",
    period: "Early 2022 — present",
    role: "Developer · Spring Boot · Next.js / JavaScript",
    bullets: [
      "Build and maintain REST APIs with Java 17+ and Spring Boot",
      "Ship React / Next.js UIs integrated with backend services",
      "Work in agile squads on client-facing and internal products",
      "Code review, unit tests, and deployment support",
    ],
  },
  {
    arc: "Mission · Side",
    title: "Side projects",
    period: "Off hours",
    role: "Solo dev",
    bullets: [
      "C-FAT (crypto-tools) — Binance Futures bot: WS klines, EMA strategy, risk layer, Docker Compose",
      "This portfolio — Next.js 15, GSAP scroll, Three.js hero, tactical manga UX",
    ],
  },
];
