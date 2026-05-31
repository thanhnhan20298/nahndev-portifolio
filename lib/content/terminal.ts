export const terminalScenes = [
  {
    label: "Portfolio",
    lines: [
      "$ open nahndev-portfolio",
      "$ cd nahndev-portfolio && npm run dev",
      "▸ Next.js 15 · profile card · GSAP scroll",
      "▸ Framer Motion · panel snap",
      "✓ ready on http://localhost:3000",
    ],
  },
  {
    label: "C-FAT",
    lines: [
      "$ cd crypto-tools && ./gradlew bootRun",
      "▸ Java 21 · Spring Boot 3 · profile dev :8081",
      "▸ WS kline (Demo) → EmaCross → RiskManager",
      "▸ execute-orders=false · dry-run only",
      "✓ /actuator/health UP",
    ],
  },
  {
    label: "Docker",
    lines: [
      "$ docker compose up -d postgres redis",
      "▸ Postgres :5433 · Redis ok",
      "▸ Flyway migrations applied",
      "▸ optional: --profile observability",
      "✓ cfat ready for testnet",
    ],
  },
];
