/** Internal FPT Software awards — MVT/VP naming convention, not a VP job title */
import type { Award } from "./types";

export type { Award } from "./types";

export const fptAwards: Award[] = [
  {
    year: "2022",
    short: "Performance",
    name: "Performance Award",
    note: "Recognized for strong annual performance.",
  },
  {
    year: "2023",
    short: "MVT",
    name: "Most Valuable Team",
    note: "Unit-level recognition for outstanding team or individual (FPT Software).",
  },
  {
    year: "2024",
    short: "VP",
    name: "Valuable Player",
    note: "Higher tier in the Performance track — not the job title Vice President.",
  },
];
