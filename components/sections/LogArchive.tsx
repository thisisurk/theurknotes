"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  LOG_CAT,
  LOG_CAT_KEYS,
  pageHeaders,
  type LogCategory,
  type LogEntry,
} from "@/lib/content";

type Props = {
  entries: LogEntry[];
};

type Filter = "all" | LogCategory;

const PAGE_SIZE = 12;

// /log archive — filter by category · paginated load-more · timeline rail.
// Pagination kicks in when entries > PAGE_SIZE; with the current 4 entries
// the rail simply renders the full list.
export function LogArchive({ entries }: Props) {
  const c = pageHeaders.log;
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: c.filterAllLabel },
    ...LOG_CAT_KEYS.map((key) => ({
      id: key as Filter,
      label: LOG_CAT[key].label,
    })),
  ];

  const filtered = useMemo(
    () =>
      filter === "all" ? entries : entries.filter((e) => e.category === filter),
    [entries, filter],
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
            {visible.map((entry) => {
              const cat = LOG_CAT[entry.category];
              const styleVars = {
                "--cd-accent": cat.accent,
                "--cd-glow": `${cat.accent}55`,
              } as CSSProperties;
              return (
                <li
                  key={entry.id}
                  className="ck-log-archive-entry"
                  style={styleVars}
                >
                  <span className="ck-log-archive-dot" aria-hidden="true" />
                  <div className="ck-log-archive-row">
                    <div className="ck-log-archive-meta">
                      <div className="ck-log-archive-when">{entry.when}</div>
                      <div className="ck-log-archive-cat">{cat.label}</div>
                    </div>
                    <p className="ck-log-archive-text">{entry.text}</p>
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
