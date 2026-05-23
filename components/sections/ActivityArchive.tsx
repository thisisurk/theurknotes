"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  LIFE_CAT,
  LIFE_CAT_KEYS,
  pageHeaders,
  type ActivityItem,
  type LifeCategory,
} from "@/lib/content";

type Props = {
  items: ActivityItem[];
};

type Filter = "all" | LifeCategory;

// /activity archive — image-grid magazine layout matching home
// ActivityShowcase. Phase F/audit-1: replaced log-timeline pattern (text rows
// + timeline rail) with the home pattern because /activity is a visual life
// archive, not a developer log. Hard-filter (vs home's dim) differentiates
// archive UX from showcase UX.
export function ActivityArchive({ items }: Props) {
  const c = pageHeaders.activity;
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: c.filterAllLabel },
    ...LIFE_CAT_KEYS.map((key) => ({
      id: key as Filter,
      label: LIFE_CAT[key].label,
    })),
  ];

  const filtered = useMemo(
    () =>
      filter === "all" ? items : items.filter((i) => i.category === filter),
    [items, filter],
  );
  const isEmpty = filtered.length === 0;

  return (
    <>
      <div className="ck-page-controls">
        <div
          className="ck-page-filter"
          role="tablist"
          aria-label="Filter by category"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="ck-act-pill"
              data-active={filter === f.id}
              onClick={() => setFilter(f.id)}
              role="tab"
              aria-selected={filter === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="ck-page-count">
          {c.countLabel}{" "}
          <span className="ck-page-count-num">
            {String(filtered.length).padStart(2, "0")}
          </span>
        </span>
      </div>

      {isEmpty ? (
        <div className="ck-notes-empty">
          <div className="ck-notes-empty-title">{c.emptyTitle}</div>
          <p className="ck-notes-empty-body">{c.emptyBody}</p>
        </div>
      ) : (
        <div className="ck-activity-grid">
          {filtered.map((item) => {
            const cat = LIFE_CAT[item.category];
            const isTall = item.size === "tall";
            const cardStyle: CSSProperties = {
              borderTopColor: cat.accent,
            };
            return (
              <article
                key={item.id}
                className="ck-activity-card"
                data-tall={isTall}
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
                  <div
                    className="ck-activity-cat"
                    style={{ color: cat.accent }}
                  >
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
                  <div
                    className="ck-activity-snippet-head"
                    style={{ color: cat.accent }}
                  >
                    {item.category} · {item.when}
                  </div>
                  <p className="ck-activity-snippet-text">{item.snippet}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
