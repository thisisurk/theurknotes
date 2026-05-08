import { businesses, tools, creations } from "@/lib/portfolio";
import { sections } from "@/lib/content";
import { PortfolioCard } from "../portfolio/PortfolioCard";
import { CreationGrid } from "../portfolio/CreationGrid";

// Section 02 · What I Do — 3 pillars × cards.
// Businesses leads with the featured Mongtam card, then a compact grid for the
// rest. Tools is compact-only. Creations uses CreationGrid (client) for the
// video lightbox state.
export function WhatIDoSection() {
  const c = sections.whatido;
  const featured = businesses.filter((b) => b.featured);
  const rest = businesses.filter((b) => !b.featured);

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

      {/* PILLAR 01 · BUSINESSES */}
      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.business} />
        {featured.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
        {rest.length > 0 && (
          <div className="ck-card-grid">
            {rest.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* PILLAR 02 · TOOLS */}
      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.tool} />
        <div className="ck-card-grid">
          {tools.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* PILLAR 03 · CREATIONS */}
      <div className="ck-pillar">
        <PillarRule pillar={c.pillars.creation} />
        <CreationGrid items={creations} />
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
