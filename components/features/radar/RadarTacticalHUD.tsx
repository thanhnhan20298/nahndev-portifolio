"use client";

import { archNodes, radarMilestones } from "@/lib/content/architecture-radar";

const tiers = ["core", "service", "data", "ops"] as const;

const tierLabels: Record<(typeof tiers)[number], string> = {
  core: "CORE",
  service: "SVC",
  data: "DATA",
  ops: "OPS",
};

export function RadarTacticalHUD() {
  const nodes = archNodes.filter((n) => n.radius > 0);
  const tierCounts = tiers.map((t) => ({
    t,
    n: nodes.filter((node) => node.tier === t).length,
  }));

  return (
    <div className="radar-tactical" aria-hidden>
      <div className="radar-tactical__grid" />
      <div className="radar-tactical__rings" />
      <div className="radar-tactical__scan" />

      <span className="radar-tactical__corner radar-tactical__corner--tl" />
      <span className="radar-tactical__corner radar-tactical__corner--tr" />
      <span className="radar-tactical__corner radar-tactical__corner--bl" />
      <span className="radar-tactical__corner radar-tactical__corner--br" />

      <div className="radar-tactical__strip font-mono">
        <span className="text-[var(--accent)]">GRID POLAR</span>
        <span className="radar-tactical__strip-sep" />
        <span>NODES {nodes.length}</span>
        <span className="radar-tactical__strip-sep" />
        <span>THREAT LOW</span>
        <span className="radar-tactical__strip-sep" />
        <span className="radar-tactical__blink">REC ●</span>
      </div>

      <aside className="radar-tactical__panel radar-tactical__panel--left font-mono">
        <p className="radar-tactical__panel-title">STACK LAYERS</p>
        {tierCounts.map(({ t, n }) => (
          <p key={t} className="radar-tactical__row">
            <span className="text-[var(--accent)]">{tierLabels[t]}</span>
            <span className="radar-tactical__dots" aria-hidden>
              {"█".repeat(Math.min(n, 6))}
              {"░".repeat(Math.max(0, 6 - n))}
            </span>
            <span className="text-muted-label">{n}</span>
          </p>
        ))}
        <p className="radar-tactical__row radar-tactical__row--dim">
          <span>BEARING</span>
          <span>247°</span>
        </p>
      </aside>

      <aside className="radar-tactical__panel radar-tactical__panel--right font-mono">
        <p className="radar-tactical__panel-title">TARGETS</p>
        <ul className="radar-tactical__targets">
          {nodes.slice(0, 6).map((n) => (
            <li key={n.id}>
              <span className="text-[var(--accent)]">▸</span> {n.label}
            </li>
          ))}
        </ul>
        <p className="radar-tactical__panel-title mt-3">PHASE</p>
        <ul className="radar-tactical__milestones">
          {radarMilestones.map((m) => (
            <li key={m.at}>
              <span className="text-muted-label">{Math.round(m.at * 100)}%</span> {m.text}
            </li>
          ))}
        </ul>
      </aside>

      <div className="radar-tactical__reticle" />
    </div>
  );
}
