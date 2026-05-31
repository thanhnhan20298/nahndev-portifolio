export type ExperienceArc = {
  arc: string;
  title: string;
  period: string;
  role: string;
  bullets: string[];
};

export const experience: ExperienceArc[] = [
  {
    arc: "Mission · FPT",
    title: "FPT Software",
    period: "Early 2022 — present",
    role: "Developer · Spring Boot · Next.js / JavaScript",
    bullets: [
      "Full-stack delivery: Java/Spring APIs, React/Next.js frontends",
      "Client and internal product projects",
    ],
  },
  {
    arc: "Mission · Side",
    title: "Side projects",
    period: "Off hours",
    role: "Solo dev",
    bullets: [
      "C-FAT (crypto-tools) — Binance Futures bot, Java 21 + Spring Boot 3",
      "Manga portfolio — Next.js + Framer Motion + GSAP (this site)",
    ],
  },
];
