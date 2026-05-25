import type { PortfolioItem } from "@/lib/portfolio";
import { Glass } from "./Glass";
import { Pill } from "./Pill";
import { MetaBlock } from "./MetaBlock";
import { ChannelPills } from "./ChannelPills";

type Props = {
  item: PortfolioItem;
  // /what-i-do passes true to surface the per-item `lesson` line.
  // Home uses PortfolioHomeCard so the prop only matters in the archive.
  showLesson?: boolean;
};

// PortfolioCard — uniform compact card for /what-i-do archive.
// Home uses PortfolioHomeCard (image-led teaser); `featured: true` on
// PortfolioItem is the curation flag for "show on home", not a layout
// switch — every archive card renders the same compact treatment.
export function PortfolioCard({ item, showLesson }: Props) {
  const accent = item.accent;
  return (
    <Glass
      hover
      className="ck-card-compact"
      style={{ borderTop: `1px solid ${hexAlpha(accent, 0.27)}` }}
    >
      <div className="ck-card-compact-head">
        <div className="ck-card-compact-name-row">
          <div
            className="ck-card-compact-mono"
            style={{
              background: hexAlpha(accent, 0.09),
              border: `1px solid ${hexAlpha(accent, 0.27)}`,
              color: accent,
            }}
          >
            {item.name[0]}
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 className="ck-card-compact-name">{item.name}</h3>
          </div>
        </div>
        <Pill kind={item.statusKind}>{item.status}</Pill>
      </div>

      <p className="ck-card-compact-desc">{item.desc}</p>

      {showLesson && item.lesson && (
        <div className="ck-pf-lesson">
          <span className="ck-pf-lesson-label">▸ LESSON</span>
          <p className="ck-pf-lesson-body">{item.lesson}</p>
        </div>
      )}

      <div style={{ marginTop: "auto" }}>
        <div style={{ marginBottom: 12 }}>
          <MetaBlock rows={item.meta} accent={accent} />
        </div>
        {item.channels && item.channels.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <ChannelPills channels={item.channels} accent={accent} />
          </div>
        )}
        <div className="ck-card-foot">
          <span className="ck-tag">{item.tag}</span>
        </div>
      </div>
    </Glass>
  );
}

function hexAlpha(hex: string, alpha: number): string {
  if (!hex.startsWith("#")) return "var(--border)";
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
