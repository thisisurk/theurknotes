import type { CSSProperties } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import { Glass } from "./Glass";
import { Pill } from "./Pill";
import { MetaBlock } from "./MetaBlock";
import { ChannelPills } from "./ChannelPills";

type Props = {
  item: PortfolioItem;
  // Archive view forces every card to render compact for visual rhythm.
  forceCompact?: boolean;
};

// PortfolioCard — `featured: true` items get the 2-col Featured layout,
// everything else renders as the Compact 1-col card. The /what-i-do archive
// passes `forceCompact` so the grid stays uniform.
export function PortfolioCard({ item, forceCompact }: Props) {
  if (forceCompact || !item.featured) return <Compact item={item} />;
  return <Featured item={item} />;
}

function Featured({ item }: Props) {
  const accent = item.accent;
  const visualStyle: CSSProperties = {
    background: `linear-gradient(145deg, var(--bg-deep) 0%, ${hexAlpha(accent, 0.09)} 100%)`,
  };
  const dotsStyle: CSSProperties = {
    backgroundImage: `radial-gradient(${hexAlpha(accent, 0.15)} 1px, transparent 1px)`,
    backgroundSize: "18px 18px",
  };

  return (
    <Glass
      hover
      className="ck-card-featured"
      style={{ padding: 0, overflow: "hidden", borderTop: `2px solid ${accent}` }}
    >
      <div className="ck-card-featured-visual" style={visualStyle}>
        <div className="ck-card-featured-visual-grid" style={dotsStyle} />
        <span
          className="ck-card-featured-visual-mono"
          style={{ color: accent, textShadow: `0 0 20px ${hexAlpha(accent, 0.33)}` }}
        >
          {item.name[0]}
        </span>
        <div className="ck-card-pill">
          <Pill kind={item.statusKind}>{item.status}</Pill>
        </div>
      </div>

      <div className="ck-card-featured-body">
        <div>
          <div className="ck-card-featured-eyebrow" style={{ color: accent }}>
            ★ FEATURED
          </div>
          <h3 className="ck-card-name">{item.name}</h3>
          <p className="ck-card-desc">{item.desc}</p>
        </div>

        <div>
          <div style={{ marginBottom: 14 }}>
            <MetaBlock rows={item.meta} accent={accent} />
          </div>
          <ChannelPills channels={item.channels} accent={accent} />
          <div className="ck-card-foot">
            <span className="ck-tag">{item.tag}</span>
          </div>
        </div>
      </div>
    </Glass>
  );
}

function Compact({ item }: Props) {
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
