/** Architecture map — radar nodes (angle rad, radius 0–1) */

import type { ArchNode } from "./types";

export type { ArchNode } from "./types";

export const archNodes: ArchNode[] = [
  { id: "agent", label: "nahndev", angle: 0, radius: 0, tier: "core" },
  { id: "next", label: "Next.js", angle: 0.2, radius: 0.42, tier: "core" },
  { id: "react", label: "React", angle: 1.1, radius: 0.38, tier: "core" },
  { id: "spring", label: "Spring API", angle: 2.0, radius: 0.55, tier: "service" },
  { id: "rest", label: "REST", angle: 2.7, radius: 0.48, tier: "service" },
  { id: "ws", label: "WebSocket", angle: 3.6, radius: 0.62, tier: "service" },
  { id: "pg", label: "Postgres", angle: 4.5, radius: 0.7, tier: "data" },
  { id: "redis", label: "Redis", angle: 5.2, radius: 0.58, tier: "data" },
  { id: "docker", label: "Docker", angle: 0.85, radius: 0.78, tier: "ops" },
  { id: "git", label: "Git / CI", angle: 3.9, radius: 0.82, tier: "ops" },
];

export const archEdges: [string, string][] = [
  ["agent", "next"],
  ["agent", "react"],
  ["next", "spring"],
  ["react", "spring"],
  ["spring", "rest"],
  ["spring", "pg"],
  ["spring", "redis"],
  ["ws", "spring"],
  ["docker", "spring"],
  ["git", "docker"],
  ["next", "rest"],
];

export const radarMilestones = [
  { at: 0.12, text: "INIT RADAR MAP..." },
  { at: 0.35, text: "SCANNING PERIMETER..." },
  { at: 0.55, text: "DATA PIPELINE DETECTED" },
  { at: 0.78, text: "ARCHITECTURE LOCKED" },
  { at: 0.95, text: "CLEARANCE: FULL STACK" },
];

export const radarSection = {
  title: "Classified diagram",
  subtitle: "Scroll to activate the laser — not a dry dossier.",
  arcLabel: "Radar · Architecture",
};
