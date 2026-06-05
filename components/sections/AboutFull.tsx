import Link from "next/link";
import {
  ABOUT_PRINCIPLES,
  RUNTIME_CONFIG,
  SOLO_TIMELINE,
  about,
  pageHeaders,
} from "@/lib/content";
import { Glass } from "../portfolio/Glass";
import { JourneyTimeline } from "./JourneyTimeline";

// /about · full long-form. Utility-density chrome — no hero backdrop, no
// scanlines. Phase P/1 narrative arc (who → proof → how → where → next):
//   bio → journey timeline (proof) → principles → north star → CTA.
// Journey = old Experience + Solo Timeline merged (one arc, told once).
// Proof moved ahead of Principles (show before tell); closing CTA added
// so the page funnels out instead of dead-ending on North Star.
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

      {/* Block 01 · Bio paragraphs — who I am */}
      <Glass className="ck-about-bio">
        {about.map((para, i) => (
          <p key={i} className="ck-about-bio-para">
            {para}
          </p>
        ))}
      </Glass>

      {/* Block 02 · Journey timeline (proof) — show before tell */}
      <JourneyTimeline
        items={SOLO_TIMELINE}
        mode="full"
        label={c.timelineLabel}
        meta={c.timelineMeta}
      />

      {/* Block 03 · Operating Principles — how I think, after the proof */}
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

      {/* Block 04 · North Star — where I'm going (closing direction) */}
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

      {/* Block 05 · CTA — funnel out (was a dead-end) */}
      <div className="ck-about-block">
        <div className="ck-about-block-label">{c.ctaLabel}</div>
        <div className="ck-about-cta-row">
          {c.ctas.map((cta) => (
            <Link key={cta.href} className="ck-btn" href={cta.href}>
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
