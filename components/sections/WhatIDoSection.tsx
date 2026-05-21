import { businesses, tools, creations } from "@/lib/portfolio";
import { sections } from "@/lib/content";
import { PortfolioHomeCard } from "../portfolio/PortfolioHomeCard";

// Section 02 · What I Do — 3 pillars × uniform home cards.
// Home renders the image-led teaser (PortfolioHomeCard) across all 3 kinds;
// /what-i-do archive keeps the dense Featured/Compact PortfolioCard layout
// and the CreationGrid video lightbox.
export function WhatIDoSection() {
  const c = sections.whatido;

  return (
    <section
      id="what-i-do"
      className="ck-section"
      aria-labelledby="whatido-title"
    >
      <header className="ck-section-header">
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 id="whatido-title" className="ck-section-title">
            {c.title}
          </h2>
          <p className="ck-section-intro">{c.intro}</p>
        </div>
        <a className="ck-btn" href={c.allLink.href}>
          {c.allLink.label}
        </a>
      </header>

      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.business} />
        <div className="ck-card-grid">
          {businesses.map((item) => (
            <PortfolioHomeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.tool} />
        <div className="ck-card-grid">
          {tools.map((item) => (
            <PortfolioHomeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.creation} />
        <div className="ck-card-grid">
          {creations.map((item) => (
            <PortfolioHomeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type PillarRuleProps = {
  pillar: { tag: string; label: string; note: string };
};

function PillarRule({ pillar }: PillarRuleProps) {
  return (
    <div className="ck-pillar-rule">
      <span className="ck-pillar-tag">▸ {pillar.tag} · {pillar.label}</span>
      <span className="ck-pillar-note">{pillar.note}</span>
      <span className="ck-pillar-line" aria-hidden="true" />
    </div>
  );
}
