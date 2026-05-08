import Link from "next/link";
import { sections, tagLabels } from "@/lib/content";
import { getAllNotes } from "@/lib/notes";
import { formatDate } from "@/lib/utils";
import { Glass } from "../portfolio/Glass";

const PREVIEW_COUNT = 3;

// Section 03 · Notes preview — timeline rail + 3 latest notes.
// Empty state shows a "ship-first" message rather than a "coming soon" tease.
export function NotesPreview() {
  const c = sections.notes;
  const notes = getAllNotes().slice(0, PREVIEW_COUNT);

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
        {notes.length > 0 && (
          <a className="ck-btn" href={c.allLink.href}>
            {c.allLink.label}
          </a>
        )}
      </header>

      {notes.length === 0 ? (
        <div className="ck-notes-empty">
          <div className="ck-notes-empty-title">{c.emptyTitle}</div>
          <p className="ck-notes-empty-body">{c.emptyBody}</p>
        </div>
      ) : (
        <ul className="ck-notes-list">
          {notes.map((n) => (
            <li key={n.slug} style={{ listStyle: "none" }}>
              <Link href={`/notes/${n.slug}`} className="ck-note-row">
                <div className="ck-note-row-time">
                  <time dateTime={n.date}>{formatDate(n.date)}</time>
                </div>
                <Glass hover className="ck-note-card">
                  <div className="ck-note-thumb">
                    <div className="ck-note-thumb-grid" aria-hidden="true" />
                    <span className="ck-note-thumb-mono">{n.title[0]}</span>
                  </div>
                  <div className="ck-note-body">
                    <h3 className="ck-note-body-title">{n.title}</h3>
                    {n.summary && (
                      <p className="ck-note-body-summary">{n.summary}</p>
                    )}
                    <span className="ck-note-body-tag">
                      #{tagLabels[n.tag]}
                    </span>
                  </div>
                </Glass>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
