import Link from "next/link";
import {
  ABOUT_PRINCIPLES,
  SOLO_TIMELINE,
  aboutPreview,
  pageHeaders,
  sections,
} from "@/lib/content";
import { Glass } from "../portfolio/Glass";
import { HologramPanelClient } from "../HologramPanelClient";

// Home About section — 2-col grid (bio Glass + HologramPanel video) +
// Solo Timeline strip. Slim version: 2 essence principles only; full 4
// principles + RUNTIME_CONFIG live on /about (AboutFull).
export function AboutSection() {
  const c = sections.about;
  const labels = pageHeaders.about;

  return (
    <section
      id="about"
      className="ck-section ck-about-section"
      aria-labelledby="about-section-title"
    >
      <div className="ck-about-bg" aria-hidden="true">
        <div className="ck-about-bg-spot" />
        <svg
          className="ck-about-bg-corner"
          viewBox="0 0 180 100"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M 0 80 L 50 80 L 50 50 L 100 50 L 100 20 L 180 20"
            stroke="rgba(212,168,83,0.55)"
            strokeWidth="0.6"
            strokeDasharray="3 4"
            opacity="0.5"
          />
          <circle cx="50" cy="80" r="2" fill="#D4A853" opacity="0.65" />
          <circle cx="50" cy="50" r="1.5" fill="#D4A853" opacity="0.5" />
          <circle cx="100" cy="50" r="2" fill="#D4A853" opacity="0.65" />
          <circle cx="100" cy="20" r="1.5" fill="#D4A853" opacity="0.5" />
        </svg>
      </div>

      <header className="ck-about-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h2 id="about-section-title" className="ck-section-title">
          {c.titleLead}
          <span className="accent">{c.titleAccent}</span>
        </h2>
        <p className="ck-section-intro">
          <span>{c.intro.ronin}</span>
          <span className="ronin-dot" aria-hidden="true"> · </span>
          <span className="ronin-break" aria-hidden="true" />
          <span>{c.intro.casual}</span>
        </p>
      </header>

      <div className="ck-about-grid">
        <Glass className="ck-about-glass-bio">
          <div className="ck-about-glass-top">
            <p className="ck-about-bio-para">{aboutPreview.intro}</p>
            <p className="ck-about-bio-para">
              {aboutPreview.body}
              <span className="accent"> {aboutPreview.accent}</span>
              {aboutPreview.bodyAfter}
            </p>

            <div className="ck-about-block">
              <div className="ck-about-block-label">
                {labels.principlesLabel}
              </div>
              <div className="ck-about-principles">
                {ABOUT_PRINCIPLES.slice(0, 2).map((p) => (
                  <div key={p.en} className="ck-about-ap-row">
                    <span className="ck-about-ap-en">▸ {p.en}</span>
                    <span className="ck-about-ap-th">{p.th}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ck-about-glass-bot">
            <div className="ck-about-foot">
              <Link className="ck-btn" href={c.allLink.href}>
                {c.allLink.label}
              </Link>
            </div>
          </div>
        </Glass>

        <HologramPanelClient videoSrc="/videos/ronin-transition.mp4" />
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
