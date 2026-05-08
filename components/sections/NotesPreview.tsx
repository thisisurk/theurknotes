"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TAGS, sections, tagLabels, type Tag } from "@/lib/content";
import type { Note } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import { Glass } from "../portfolio/Glass";

const PREVIEW_COUNT = 6;

type Filter = "all" | Tag;

// Section 03 · Notes preview (Phase C/4.6 — full mockup parity).
// Filter pills (All + every tag) + hero card (1) + mini grid (rest).
// Notes don't carry cover images yet → graceful gridded fallback with a
// ghost ordinal so empty cards still feel intentional.
export function NotesPreview({ notes }: { notes: Note[] }) {
  const c = sections.notes;
  const [active, setActive] = useState<Filter>("all");

  const slice = useMemo(() => notes.slice(0, PREVIEW_COUNT), [notes]);
  const isDim = (n: Note) => active !== "all" && n.tag !== active;

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: c.filterAllLabel },
    ...TAGS.map((t) => ({ id: t, label: tagLabels[t] })),
  ];

  if (slice.length === 0) {
    return (
      <section
        id="notes"
        className="ck-section"
        aria-labelledby="notes-title"
      >
        <header className="ck-section-header">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2 id="notes-title" className="ck-section-title">
              {c.title}
            </h2>
            <p className="ck-section-intro">{c.intro}</p>
          </div>
        </header>
        <div className="ck-notes-empty">
          <div className="ck-notes-empty-title">{c.emptyTitle}</div>
          <p className="ck-notes-empty-body">{c.emptyBody}</p>
        </div>
      </section>
    );
  }

  const [hero, ...rest] = slice;

  return (
    <section
      id="notes"
      className="ck-section"
      aria-labelledby="notes-title"
    >
      <header className="ck-section-header">
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 id="notes-title" className="ck-section-title">
            {c.title}
          </h2>
          <p className="ck-section-intro">{c.intro}</p>
        </div>
        <Link className="ck-btn" href={c.allLink.href}>
          {c.allLink.label}
        </Link>
      </header>

      <div
        className="ck-activity-filter"
        role="tablist"
        aria-label="Filter notes by tag"
      >
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

      <div className="ck-notes-hero" data-dim={isDim(hero)}>
        <NoteHeroCard n={hero} ordinal={1} />
      </div>

      {rest.length > 0 && (
        <div className="ck-notes-mini-grid">
          {rest.map((n, i) => (
            <NoteMiniCard
              key={n.slug}
              n={n}
              ordinal={i + 2}
              dim={isDim(n)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function noteState(n: Note): "DRAFT" | "LIVE" {
  return n.draft ? "DRAFT" : "LIVE";
}

function NoteCover({ ordinal }: { ordinal: number }) {
  // Future: when notes carry n.image, render <img/> here. For now, a
  // gridded fallback with a ghost ordinal so the card still has weight.
  return (
    <div className="ck-note-cover" aria-hidden="true">
      <div className="ck-note-cover-grid" />
      <span className="ck-note-cover-num">{String(ordinal).padStart(3, "0")}</span>
      <div className="ck-note-cover-fade" />
    </div>
  );
}

function NoteHeroCard({ n, ordinal }: { n: Note; ordinal: number }) {
  const state = noteState(n);
  return (
    <Link href={`/notes/${n.slug}`} className="ck-note-hero-link">
      <Glass hover className="ck-note-hero-card">
        <div className="ck-note-hero-cover">
          <NoteCover ordinal={ordinal} />
          <span className="ck-note-tag-badge">#{tagLabels[n.tag]}</span>
          <span
            className="ck-note-status-pill"
            data-state={state.toLowerCase()}
          >
            <span className="dot" aria-hidden="true" />
            {state}
          </span>
        </div>
        <div className="ck-note-hero-body">
          <h3 className="ck-note-hero-title">{n.title}</h3>
          {n.summary && (
            <p className="ck-note-hero-summary">{n.summary}</p>
          )}
          <div className="ck-note-hero-meta">
            <time dateTime={n.date}>{formatDate(n.date)}</time>
          </div>
        </div>
      </Glass>
    </Link>
  );
}

function NoteMiniCard({
  n,
  ordinal,
  dim,
}: {
  n: Note;
  ordinal: number;
  dim: boolean;
}) {
  const state = noteState(n);
  return (
    <Link
      href={`/notes/${n.slug}`}
      className="ck-note-mini-link"
      data-dim={dim}
    >
      <Glass hover className="ck-note-mini-card">
        <div className="ck-note-mini-cover">
          <NoteCover ordinal={ordinal} />
          <span className="ck-note-tag-badge ck-note-tag-badge-sm">
            #{tagLabels[n.tag]}
          </span>
        </div>
        <div className="ck-note-mini-body">
          <h3 className="ck-note-mini-title">{n.title}</h3>
          <div className="ck-note-mini-meta">
            <span
              className="ck-note-status-pill ck-note-status-pill-sm"
              data-state={state.toLowerCase()}
            >
              {state}
            </span>
            <time dateTime={n.date}>{formatDate(n.date)}</time>
          </div>
        </div>
      </Glass>
    </Link>
  );
}
