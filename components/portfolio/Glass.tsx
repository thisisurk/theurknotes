import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  style?: CSSProperties;
};

// Glass HUD card — 4 gold corner accents (2 via ::before/::after, 2 via spans).
// Pair with optional `hover` to opt into the lift/glow on hover.
export function Glass({ children, hover, className = "", style }: Props) {
  const cls = ["ck-glass", hover && "ck-glass-lift", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={style}>
      <span className="ck-glass-ct" aria-hidden="true" />
      <span className="ck-glass-cb" aria-hidden="true" />
      {hover && <span className="ck-glass-glow" aria-hidden="true" />}
      {children}
    </div>
  );
}
