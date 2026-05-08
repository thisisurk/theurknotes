import type { CSSProperties } from "react";
import { LOG_CAT, LOG_ENTRIES, sections } from "@/lib/content";

const HEAD_DOT_COLORS = [
  "rgba(255, 95, 87, 0.55)",
  "rgba(255, 189, 46, 0.55)",
  "rgba(40, 200, 64, 0.55)",
];

// Section 04 · Live Log — terminal-style feed. First entry is "NOW" with a
// pulsing ring (driven by the .ck-log-entry-now modifier).
export function LiveLog() {
  const c = sections.log;

  return (
    <section
      id="log"
      className="ck-section ck-log-section"
      aria-labelledby="log-title"
    >
      <h2 id="log-title" className="sr-only">
        {c.title}
      </h2>

      <div className="ck-log-head">
        <div className="ck-log-head-dots" aria-hidden="true">
          {HEAD_DOT_COLORS.map((bg, i) => (
            <span
              key={i}
              className="ck-log-head-dot"
              style={{ background: bg }}
            />
          ))}
        </div>
        <span className="ck-log-head-label">{c.headerLabel}</span>
        <span className="ck-log-head-rule" aria-hidden="true" />
        <span className="ck-log-head-live">
          <span className="ck-log-head-live-dot" aria-hidden="true" />
          {c.liveLabel}
        </span>
      </div>

      <ol className="ck-log-rail" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {LOG_ENTRIES.map((entry, i) => {
          const cat = LOG_CAT[entry.category];
          const isNow = i === 0;
          const styleVars = {
            "--cd-accent": cat.accent,
            "--cd-glow": `${cat.accent}55`,
          } as CSSProperties;
          return (
            <li
              key={entry.id}
              className={`ck-log-entry${isNow ? " ck-log-entry-now" : ""}`}
              style={styleVars}
            >
              <span className="ck-log-entry-dot" aria-hidden="true" />
              <div className="ck-log-entry-row">
                <div className="ck-log-entry-meta">
                  <div className="ck-log-entry-when">
                    {isNow ? `${c.nowLabel} · ${entry.when}` : entry.when}
                  </div>
                  <div className="ck-log-entry-cat">{cat.label}</div>
                </div>
                <p className="ck-log-entry-text">{entry.text}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="ck-log-foot">
        <span className="ck-log-foot-prompt">{c.footerPrompt}</span>
        <span>{c.footerNote}</span>
        <span style={{ flex: 1 }} aria-hidden="true" />
        <a className="ck-btn" href={c.allLink.href}>
          {c.allLink.label}
        </a>
      </div>
    </section>
  );
}
