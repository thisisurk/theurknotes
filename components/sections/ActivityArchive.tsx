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

const PAGE_SIZE = 12;

// /activity archive — filter by life category · paginated load-more · timeline rail.
// Mirrors the (deleted) /log archive pattern, scoped to LIFE_CAT instead of LOG_CAT.
// Reuses .ck-log-archive-* CSS by literal class name — historical name, generic semantics.
export function ActivityArchive({ items }: Props) {
  const c = pageHeaders.activity;
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

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
  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;
  const isEmpty = filtered.length === 0;

  const onFilter = (id: Filter) => {
    setFilter(id);
    setPage(1);
  };

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
              onClick={() => onFilter(f.id)}
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
        <div className="ck-log-archive-empty">
          <div className="ck-log-archive-empty-title">{c.emptyTitle}</div>
          <p className="ck-log-archive-empty-body">{c.emptyBody}</p>
        </div>
      ) : (
        <>
          <ol className="ck-log-archive">
            {visible.map((item) => {
              const cat = LIFE_CAT[item.category];
              const styleVars = {
                "--cd-accent": cat.accent,
                "--cd-glow": `${cat.accent}55`,
              } as CSSProperties;
              return (
                <li
                  key={item.id}
                  className="ck-log-archive-entry"
                  style={styleVars}
                >
                  <span className="ck-log-archive-dot" aria-hidden="true" />
                  <div className="ck-log-archive-row">
                    <div className="ck-log-archive-meta">
                      <div className="ck-log-archive-when">{item.when}</div>
                      <div className="ck-log-archive-cat">{cat.label}</div>
                    </div>
                    <div>
                      <div
                        className="ck-log-archive-text"
                        style={{ fontWeight: 600 }}
                      >
                        {item.label}
                      </div>
                      <p
                        className="ck-log-archive-text"
                        style={{ opacity: 0.78, marginTop: 4 }}
                      >
                        {item.snippet}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {hasMore && (
            <div className="ck-log-archive-foot">
              <button
                type="button"
                className="ck-btn"
                onClick={() => setPage((p) => p + 1)}
              >
                {c.loadMoreLabel}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
