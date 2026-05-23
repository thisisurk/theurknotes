"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import {
  ACTIVITY_ITEMS,
  LIFE_CAT,
  LIFE_CAT_KEYS,
  sections,
  type ActivitySize,
  type LifeCategory,
} from "@/lib/content";

type Filter = "all" | LifeCategory;

const HOME_PREVIEW_COUNT = 5;
// Home grid pattern: 1 tall featured (recent) + 4 normal cards in 2×2 to the
// right — fills a 3-col grid perfectly with no orphan row. Overrides each
// item's stored `size` for home-only; /activity archive uses natural sizes.
const HOME_SIZE_PATTERN: ActivitySize[] = [
  "tall",
  "normal",
  "normal",
  "normal",
  "normal",
];

// Section 04 · Activity — magazine grid + filter pills.
// Filter dims non-matching cards (visual cue, not removal) so the grid
// keeps its rhythm even when one category is highlighted.
// Home shows first 5 (one per LIFE_CAT category) — full archive on /activity.
export function ActivityShowcase() {
  const c = sections.activity;
  const [active, setActive] = useState<Filter>("all");
  const items = ACTIVITY_ITEMS.slice(0, HOME_PREVIEW_COUNT).map((item, i) => ({
    ...item,
    size: HOME_SIZE_PATTERN[i],
  }));

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: c.filterAllLabel },
    ...LIFE_CAT_KEYS.map((key) => ({ id: key, label: LIFE_CAT[key].label })),
  ];

  return (
    <section
      id="activity"
      className="ck-section"
      aria-labelledby="activity-title"
    >
      <header className="ck-section-header">
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 id="activity-title" className="ck-section-title">
            {c.title}
          </h2>
          <p className="ck-section-intro">{c.intro}</p>
        </div>
        <a className="ck-btn" href={c.allLink.href}>
          {c.allLink.label}
        </a>
      </header>

      <div className="ck-activity-filter" role="tablist" aria-label="Filter by category">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="ck-act-pill"
            data-active={active === f.id}
            onClick={() => setActive(f.id)}
            role="tab"
            aria-selected={active === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="ck-activity-grid">
        {items.map((item) => {
          const cat = LIFE_CAT[item.category];
          const dimmed = active !== "all" && item.category !== active;
          const isTall = item.size === "tall";
          const cardStyle: CSSProperties = {
            borderTopColor: cat.accent,
          };
          return (
            <article
              key={item.id}
              className="ck-activity-card"
              data-tall={isTall}
              data-dimmed={dimmed}
              style={cardStyle}
            >
              <div
                className="ck-activity-bg"
                style={{ background: cat.gradient }}
                aria-hidden="true"
              />
              {item.image && (
                <div
                  className="ck-activity-img"
                  style={{ backgroundImage: `url(${item.image})` }}
                  aria-hidden="true"
                />
              )}
              <div className="ck-activity-fade" aria-hidden="true" />

              <div className="ck-activity-when">{item.when}</div>

              <div className="ck-activity-label">
                <div className="ck-activity-cat" style={{ color: cat.accent }}>
                  {item.category}
                  {item.recent && (
                    <span
                      className="ck-activity-cat-dot"
                      style={{ background: cat.accent }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="ck-activity-name">{item.label}</div>
              </div>

              <div className="ck-activity-snippet">
                <div className="ck-activity-snippet-head" style={{ color: cat.accent }}>
                  {item.category} · {item.when}
                </div>
                <p className="ck-activity-snippet-text">{item.snippet}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
