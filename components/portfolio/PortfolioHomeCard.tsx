import Image from "next/image";
import type { PortfolioItem } from "@/lib/portfolio";
import { Glass } from "./Glass";
import { Pill } from "./Pill";

type Props = {
  item: PortfolioItem;
};

// Home portfolio teaser — uniform image-led card across all 3 pillars
// (business / tool / creation). Drops Featured 2-col + meta + channels + tag
// from the archive card; those remain on /what-i-do via PortfolioCard.
// Image is sourced from item.image (1:1 cover). When null, falls back to
// accent gradient + name so cards are still distinct from each other.
export function PortfolioHomeCard({ item }: Props) {
  const accent = item.accent;
  return (
    <Glass
      hover
      className="ck-card-home"
      style={{ padding: 0, overflow: "hidden", borderTop: `2px solid ${accent}` }}
    >
      <div
        className="ck-card-home-cover"
        style={{
          background: `linear-gradient(145deg, var(--bg-deep) 0%, ${hexAlpha(accent, 0.12)} 100%)`,
        }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <CoverFallback name={item.name} accent={accent} />
        )}
        <div className="ck-card-home-cover-pill">
          <Pill kind={item.statusKind}>{item.status}</Pill>
        </div>
      </div>

      <div className="ck-card-home-body">
        <h3 className="ck-card-home-name">{item.name}</h3>
        <p className="ck-card-home-desc">{item.desc}</p>
      </div>
    </Glass>
  );
}

function CoverFallback({ name, accent }: { name: string; accent: string }) {
  const dotsStyle = {
    backgroundImage: `radial-gradient(${hexAlpha(accent, 0.18)} 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
  };
  return (
    <div className="ck-card-home-cover-fallback" aria-hidden="true">
      <div className="ck-card-home-cover-fallback-dots" style={dotsStyle} />
      <span
        className="ck-card-home-cover-fallback-name"
        style={{ color: accent, textShadow: `0 0 18px ${hexAlpha(accent, 0.35)}` }}
      >
        {name}
      </span>
    </div>
  );
}

function hexAlpha(hex: string, alpha: number): string {
  if (!hex.startsWith("#")) return "var(--border)";
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}
