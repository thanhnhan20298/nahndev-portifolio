export type Project = {
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  github: string;
  tags: string[];
  year: string;
  role: string;
  highlights: string[];
  pipeline?: string[];
};

export const projects: Project[] = [
  {
    slug: "manga-portfolio",
    title: "Interactive Manga Portfolio",
    description: "Manga-style CV — classified boot, panel slides, impact slash on navigation.",
    featured: true,
    github: "https://github.com/thanhnhan20298/nahndev-portfolio",
    tags: ["Next.js", "JavaScript", "Framer Motion"],
    year: "2025",
    role: "Frontend",
    highlights: ["Boot sequence + scroll panels", "Impact slash on project pages"],
  },
  {
    slug: "crypto-tools",
    title: "C-FAT",
    description:
      "Binance Futures bot — Java 21, Spring Boot 3. Market data → strategy → risk → execution.",
    featured: false,
    github: "https://github.com/thanhnhan20298/crypto-tools",
    tags: ["Java 21", "Spring Boot 3", "Binance", "WebSocket", "Docker"],
    year: "2025",
    role: "Backend · Side project",
    highlights: [
      "WS kline + EmaCrossStrategy + RiskManager",
      "Docker Compose · Postgres · Flyway",
    ],
    pipeline: [
      "Warmup + WS kline (Binance Demo)",
      "EmaCrossStrategy",
      "RiskManager",
      "Dry-run or REST order",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
