import type { SoloPhase } from "@/lib/content";

type JourneyTimelineProps = {
  items: SoloPhase[];
  mode: "teaser" | "full";
  label: string;
  meta: string;
  // Outer wrapper class — home adds `ck-about-timeline-block` (margin from grid).
  outerClassName?: string;
};

// Shared journey timeline — SSoT for the solo → solo+AI arc, rendered at two
// depths (progressive disclosure):
//   teaser (home)   → slim strip: tag · en · th
//   full   (/about) → proof block: tag · en · when · body
// CSS variant `--full` flips the track horizontal → vertical so body has room.
export function JourneyTimeline({
  items,
  mode,
  label,
  meta,
  outerClassName = "ck-about-block",
}: JourneyTimelineProps) {
  const isFull = mode === "full";

  return (
    <div className={outerClassName}>
      <div className="ck-about-st-header">
        <span className="ck-about-st-label">{label}</span>
        <span className="ck-about-st-rule" aria-hidden="true" />
        <span className="ck-about-st-meta">{meta}</span>
      </div>
      <ol className={`ck-about-st-track${isFull ? " ck-about-st-track--full" : ""}`}>
        {items.map((p) => (
          <li key={p.tag} className="ck-about-st-phase" data-state={p.state}>
            <span className="ck-about-st-dot" aria-hidden="true" />
            <div className="ck-about-st-tag">{p.tag}</div>
            <div className="ck-about-st-en">{p.en}</div>
            {isFull ? (
              <>
                {p.when && <div className="ck-about-st-when">{p.when}</div>}
                {p.body && <p className="ck-about-st-body">{p.body}</p>}
              </>
            ) : (
              <div className="ck-about-st-th">{p.th}</div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
