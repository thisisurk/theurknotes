import type { CSSProperties } from "react";

type Tone = "gold" | "blue" | "purple" | "green";

const TONE: Record<Tone, { accent: string; glow: string }> = {
  gold:   { accent: "var(--accent-gold)",     glow: "var(--accent-gold-glow)"        },
  blue:   { accent: "#60A5FA",                glow: "rgba(96, 165, 250, 0.55)"        },
  purple: { accent: "#A78BFA",                glow: "rgba(167, 139, 250, 0.55)"       },
  green:  { accent: "var(--success)",         glow: "rgba(74, 222, 128, 0.55)"        },
};

type Props = {
  label: string;
  tone?: Tone;
};

// HUD-style section divider — animated dot streaks across both sides toward
// a centered mono label. Reused by C/3-5 between sections on Home.
export function CockpitDivider({ label, tone = "gold" }: Props) {
  const t = TONE[tone];
  const styleVars = { "--cd-accent": t.accent, "--cd-glow": t.glow } as CSSProperties;
  return (
    <div className="cockpit-divider" style={styleVars} role="separator" aria-label={label}>
      <div className="cockpit-divider-track cockpit-divider-track-l">
        <div className="cockpit-divider-line" />
        <div className="cockpit-divider-dot" />
      </div>
      <span className="cockpit-divider-label">{label}</span>
      <div className="cockpit-divider-track cockpit-divider-track-r">
        <div className="cockpit-divider-line" />
        <div className="cockpit-divider-dot" />
      </div>
    </div>
  );
}
