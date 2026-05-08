"use client";

import { useMemo, useState } from "react";
import {
  STATUS_PRIORITY,
  WHAT_I_DO_FILTERS,
  WHAT_I_DO_SORTS,
  pageHeaders,
  type WhatIDoKindFilter,
  type WhatIDoSort,
} from "@/lib/content";
import type { PortfolioItem, PortfolioKind } from "@/lib/portfolio";
import { PortfolioCard } from "../portfolio/PortfolioCard";
import { CreationCard } from "../portfolio/CreationCard";
import { VideoLightbox } from "../portfolio/VideoLightbox";

type Props = {
  items: PortfolioItem[];
};

type LightboxState = { src: string; title: string; tag: string } | null;

const KIND_ORDER: Record<PortfolioKind, number> = {
  business: 0,
  tool: 1,
  creation: 2,
};

// /what-i-do archive — filter by kind · sort · uniform compact grid.
// Owns the video lightbox state for creations so the page can stay server.
export function WhatIDoArchive({ items }: Props) {
  const c = pageHeaders.whatIDo;
  const [kind, setKind] = useState<WhatIDoKindFilter>("all");
  const [sort, setSort] = useState<WhatIDoSort>("status");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const filtered = useMemo(() => {
    const base = kind === "all" ? items : items.filter((i) => i.kind === kind);
    const sorted = [...base];
    if (sort === "status") {
      sorted.sort(
        (a, b) =>
          (STATUS_PRIORITY[a.status] ?? 99) -
          (STATUS_PRIORITY[b.status] ?? 99),
      );
    } else if (sort === "kind") {
      sorted.sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
    } else if (sort === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name, "th"));
    }
    return sorted;
  }, [items, kind, sort]);

  const activeKindLabel =
    WHAT_I_DO_FILTERS.find((f) => f.id === kind)?.label ?? "All";

  return (
    <>
      <div className="ck-page-controls">
        <div
          className="ck-page-filter"
          role="tablist"
          aria-label="Filter by kind"
        >
          {WHAT_I_DO_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="ck-act-pill"
              data-active={kind === f.id}
              onClick={() => setKind(f.id)}
              role="tab"
              aria-selected={kind === f.id}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="ck-page-controls-right">
          <div className="ck-page-sort">
            <label htmlFor="whatido-sort" className="ck-page-controls-label">
              {c.sortLabel}
            </label>
            <select
              id="whatido-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as WhatIDoSort)}
              className="ck-page-select"
            >
              {WHAT_I_DO_SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <span className="ck-page-count">
            {c.countLabel}{" "}
            <span className="ck-page-count-num">
              {String(filtered.length).padStart(2, "0")}
            </span>
          </span>
        </div>
      </div>

      <h2 className="sr-only" aria-live="polite">
        {activeKindLabel} · {filtered.length} works
      </h2>

      <div className="ck-archive-grid">
        {filtered.map((item, i) => {
          if (item.kind === "creation") {
            return (
              <CreationCard
                key={item.id}
                item={item}
                index={i + 1}
                onPlay={setLightbox}
              />
            );
          }
          return <PortfolioCard key={item.id} item={item} forceCompact />;
        })}
      </div>

      {lightbox && (
        <VideoLightbox
          src={lightbox.src}
          title={lightbox.title}
          tag={lightbox.tag}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
