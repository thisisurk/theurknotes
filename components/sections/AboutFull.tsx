import {
  ABOUT_PRINCIPLES,
  RUNTIME_CONFIG,
  SOLO_TIMELINE,
  about,
  pageHeaders,
} from "@/lib/content";
import { Glass } from "../portfolio/Glass";

// /about · full long-form. Utility-density chrome — no hero backdrop, no
// scanlines. Four blocks: bio · operating principles · runtime config · solo
// timeline. Mirrors v6 mockup AboutSection (lines 3120-3389).
export function AboutFull() {
  const c = pageHeaders.about;

  return (
    <section
      id="about"
      className="ck-page"
      aria-labelledby="about-page-title"
    >
      <header className="ck-page-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 id="about-page-title" className="ck-page-title">
          {c.titleLead}
          <span className="accent">{c.titleAccent}</span>
        </h1>
        <p className="ck-page-intro">{c.intro}</p>
      </header>

      {/* Block 01 · Bio paragraphs */}
      <Glass className="ck-about-bio">
        {about.map((para, i) => (
          <p key={i} className="ck-about-bio-para">
            {para}
          </p>
        ))}
      </Glass>

      {/* Block 02 · Operating Principles */}
      <div className="ck-about-block">
        <div className="ck-about-block-label">{c.principlesLabel}</div>
        <div className="ck-about-principles">
          {ABOUT_PRINCIPLES.map((p) => (
            <div key={p.en} className="ck-about-ap-row">
              <span className="ck-about-ap-en">▸ {p.en}</span>
              <span className="ck-about-ap-th">{p.th}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Block 03 · Runtime Config */}
      <div className="ck-about-block">
        <div className="ck-about-block-label">{c.runtimeLabel}</div>
        <div className="ck-about-runtime">
          {RUNTIME_CONFIG.map((r) => (
            <div key={r.label} className="ck-about-rc-card">
              <div className="ck-about-rc-label">{r.label}</div>
              <div className="ck-about-rc-value">{r.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Block 04 · Solo Timeline */}
      <div className="ck-about-block">
        <div className="ck-about-st-header">
          <span className="ck-about-st-label">{c.timelineLabel}</span>
          <span className="ck-about-st-rule" aria-hidden="true" />
          <span className="ck-about-st-meta">{c.timelineMeta}</span>
        </div>
        <ol className="ck-about-st-track">
          {SOLO_TIMELINE.map((p) => (
            <li
              key={p.tag}
              className="ck-about-st-phase"
              data-state={p.state}
            >
              <span className="ck-about-st-dot" aria-hidden="true" />
              <div className="ck-about-st-tag">{p.tag}</div>
              <div className="ck-about-st-en">{p.en}</div>
              <div className="ck-about-st-th">{p.th}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
