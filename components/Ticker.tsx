type Props = {
  label: string;
  items: readonly string[];
};

// Auto-scrolling ticker. Content is duplicated so the CSS keyframe
// (translateX 0 → -50%) loops seamlessly. Pause on hover + reduced-motion
// safe via `.ticker` styles in globals.css.
export function Ticker({ label, items }: Props) {
  return (
    <div className="ticker" aria-label="Live feed">
      <span className="ticker-label">{label}</span>
      <div className="ticker-track">
        <div className="ticker-content">
          {[...items, ...items].map((it, i) => (
            <span key={i}>{it}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
