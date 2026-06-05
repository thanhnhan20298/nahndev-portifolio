import { fptAwards } from "@/lib/content/awards";

export function AwardBadges() {
  return (
    <div className="mt-6 border-t-4 border-[var(--border-strong)] pt-6">
      <p className="font-label text-xs uppercase tracking-widest text-[var(--accent)]">
        FPT awards
      </p>
      <ul className="mt-4 flex flex-wrap gap-3">
        {fptAwards.map((a) => (
          <li
            key={a.year}
            className="ink-border-thin min-w-[120px] bg-panel px-3 py-2"
            title={`${a.name} (${a.year}) — ${a.note}`}
          >
            <p className="font-label text-[10px] uppercase text-muted-label">{a.year}</p>
            <p className="text-sm font-black">{a.short}</p>
            <p className="mt-0.5 text-[10px] font-medium leading-tight site-text-dim">{a.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
