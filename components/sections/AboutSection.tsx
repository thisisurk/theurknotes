import Link from "next/link";
import {
  ABOUT_PRINCIPLES,
  RUNTIME_CONFIG,
  SOLO_TIMELINE,
  aboutPreview,
  pageHeaders,
  sections,
} from "@/lib/content";
import { Glass } from "../portfolio/Glass";
import { HologramPanel } from "../HologramPanel";

// Phase C/4.6 — Home About section, full v6 mockup parity.
// 2-col grid (bio Glass + HologramPanel video) + Solo Timeline strip.
// Replaces AboutPreview. /about page (AboutFull) still hosts the long bio.
export function AboutSection() {
  const c = sections.about;
  const labels = pageHeaders.about;

  return (
    <section
      id="about"
      className="ck-section ck-about-section"
      aria-labelledby="about-section-title"
    >
      <header className="ck-section-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h2 id="about-section-title" className="ck-section-title">
          {c.titleLead}
          <span className="accent">{c.titleAccent}</span>
        </h2>
        <p className="ck-section-intro">{c.intro}</p>
      </header>

      <div className="ck-about-grid">
        <Glass className="ck-about-glass-bio">
          <p className="ck-about-bio-para">{aboutPreview.intro}</p>
          <p className="ck-about-bio-para">
            {aboutPreview.body}
            <span className="accent"> {aboutPreview.accent}</span>
            {aboutPreview.bodyAfter}
          </p>

          <div className="ck-about-block">
            <div className="ck-about-block-label">{labels.principlesLabel}</div>
            <div className="ck-about-principles">
              {ABOUT_PRINCIPLES.map((p) => (
                <div key={p.en} className="ck-about-ap-row">
                  <span className="ck-about-ap-en">▸ {p.en}</span>
                  <span className="ck-about-ap-th">{p.th}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ck-about-block ck-about-block-runtime">
            <div className="ck-about-block-label">{labels.runtimeLabel}</div>
            <div className="ck-about-runtime">
              {RUNTIME_CONFIG.map((r) => (
                <div key={r.label} className="ck-about-rc-card">
                  <div className="ck-about-rc-label">{r.label}</div>
                  <div className="ck-about-rc-value">{r.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ck-about-foot">
            <Link className="ck-btn" href={c.allLink.href}>
              {c.allLink.label}
            </Link>
          </div>
        </Glass>

        <HologramPanel videoSrc="/videos/ronin-transition.mp4" />
      </div>

      <div className="ck-about-block ck-about-timeline-block">
        <div className="ck-about-st-header">
          <span className="ck-about-st-label">{labels.timelineLabel}</span>
          <span className="ck-about-st-rule" aria-hidden="true" />
          <span className="ck-about-st-meta">{labels.timelineMeta}</span>
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
