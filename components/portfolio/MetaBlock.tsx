import type { CSSProperties } from "react";
import type { MetaRow } from "@/lib/portfolio";

type Props = {
  rows: MetaRow[];
  accent: string;
};

// 3-row meta — first row's label adopts the accent color so the eye lands on
// scope / purpose / medium first; the rest stay muted.
export function MetaBlock({ rows, accent }: Props) {
  return (
    <div className="ck-meta-block">
      {rows.map((r, i) => {
        const labelStyle: CSSProperties = i === 0 ? { color: accent } : {};
        return (
          <div key={r.label} className="ck-meta-row">
            <span className="ck-meta-row-label" style={labelStyle}>
              // {r.label}
            </span>
            <span className="ck-meta-row-value">{r.value}</span>
          </div>
        );
      })}
    </div>
  );
}
