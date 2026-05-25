import { businesses, tools, creations } from "@/lib/portfolio";
import { sections } from "@/lib/content";
import { PortfolioHomeCard } from "../portfolio/PortfolioHomeCard";

// Section 02 · What I Do — 3 pillars × home-curated cards.
// Home filters each kind by `featured: true` so the editor controls which
// subset surfaces on the landing page; /what-i-do archive shows everything.
// PortfolioHomeCard renders the image-led teaser across all 3 kinds.
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
          {businesses.filter((item) => item.featured).map((item) => (
            <PortfolioHomeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.tool} />
        <div className="ck-card-grid">
          {tools.filter((item) => item.featured).map((item) => (
            <PortfolioHomeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.creation} />
        <div className="ck-card-grid">
          {creations.filter((item) => item.featured).map((item) => (
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
