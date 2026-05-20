"use client";

import type { CSSProperties } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import { Glass } from "./Glass";
import { Pill } from "./Pill";
import { MetaBlock } from "./MetaBlock";

type Props = {
  item: PortfolioItem;
  index: number;
  onPlay: (payload: { src: string; title: string; tag: string }) => void;
  // /what-i-do passes true to surface the per-item `lesson` line.
  showLesson?: boolean;
};

// Creation card — video / game / art. Plays inline if `video` is set;
// otherwise the CTA button is disabled.
export function CreationCard({ item, index, onPlay, showLesson }: Props) {
  const accent = item.accent;
  const playable = !!item.video;
  const idx = String(index).padStart(2, "0");
  const medium = item.meta[0]?.value ?? "WORK";

  const handlePlay = () => {
    if (playable && item.video) {
      onPlay({
        src: item.video,
        title: item.name,
        tag: `${medium} · ${item.meta[1]?.value ?? ""}`,
      });
    }
  };

  const thumbStyle: CSSProperties = {
    background: `linear-gradient(145deg, var(--bg-deep) 0%, ${hexAlpha(accent, 0.13)} 100%)`,
    cursor: playable ? "pointer" : "default",
  };
  const dotsStyle: CSSProperties = {
    backgroundImage: `radial-gradient(${hexAlpha(accent, 0.15)} 1px, transparent 1px)`,
    backgroundSize: "14px 14px",
  };

  return (
    <Glass
      className="ck-creation-card"
      style={{ padding: 0, overflow: "hidden", borderTop: `2px solid ${accent}` }}
    >
      <button
        type="button"
        className="ck-creation-thumb-button"
        onClick={handlePlay}
        disabled={!playable}
        aria-label={
          [
            `CREATION_${idx}`,
            medium,
            item.status ?? "",
            playable
              ? `: play ${item.name}`
              : `: ${item.name} — preview not yet available`,
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        <div className="ck-creation-thumb" style={thumbStyle}>
          {playable && item.video ? (
            <video src={item.video} preload="metadata" muted playsInline />
          ) : (
            <div className="ck-creation-thumb-placeholder">
              <div className="ck-creation-thumb-grid" style={dotsStyle} />
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  color: accent,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  textShadow: `0 0 12px ${hexAlpha(accent, 0.33)}`,
                  zIndex: 1,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {medium}
              </span>
            </div>
          )}
          <div className="ck-creation-thumb-overlay" />
          {playable && (
            <div className="ck-creation-thumb-play">
              <div className="ck-creation-thumb-play-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
            </div>
          )}
          <div className="ck-creation-thumb-corner" style={{ color: accent }}>
            CREATION_{idx}
          </div>
          {item.status && (
            <div className="ck-card-pill">
              <Pill kind={item.statusKind}>{item.status}</Pill>
            </div>
          )}
        </div>
      </button>

      <div className="ck-creation-body">
        <h3 className="ck-card-name">{item.name}</h3>
        <p className="ck-card-desc" style={{ marginBottom: 14 }}>
          {item.desc}
        </p>

        {showLesson && item.lesson && (
          <div className="ck-pf-lesson" style={{ marginBottom: 14 }}>
            <span className="ck-pf-lesson-label">▸ LESSON</span>
            <p className="ck-pf-lesson-body">{item.lesson}</p>
          </div>
        )}

        <div style={{ marginTop: "auto", marginBottom: 12 }}>
          <MetaBlock rows={item.meta} accent={accent} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button
            type="button"
            onClick={handlePlay}
            disabled={!playable}
            className="ck-creation-cta"
            data-playable={playable}
            style={{
              background: playable ? hexAlpha(accent, 0.09) : "transparent",
              borderColor: playable ? accent : "var(--border)",
              color: playable ? accent : "var(--text-muted)",
              opacity: playable ? 1 : 0.55,
            }}
          >
            {item.ctaLabel ?? "VIEW"} {playable && "→"}
          </button>
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
