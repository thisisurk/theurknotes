import type { Metadata } from "next";
import { meta, pageHeaders } from "@/lib/content";
import { getAllNotes } from "@/lib/notes";
import { NoteListItem } from "@/components/NoteListItem";
import { TagFilter } from "@/components/TagFilter";

export const metadata: Metadata = {
  title: meta.notes.title,
  description: meta.notes.description,
  alternates: { canonical: "/notes" },
  openGraph: {
    title: meta.notes.title,
    description: meta.notes.description,
    url: "/notes",
  },
};

export default function NotesPage() {
  const notes = getAllNotes();
  const isEmpty = notes.length === 0;
  const c = pageHeaders.notes;

  return (
    <section
      id="notes"
      className="ck-page"
      aria-labelledby="notes-page-title"
    >
      <header className="ck-page-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 id="notes-page-title" className="ck-page-title">
          {c.title}
        </h1>
        <p className="ck-page-intro">{c.intro}</p>
      </header>

      <div className="ck-page-controls">
        <TagFilter activeTag="all" />
      </div>

      {isEmpty ? (
        <div className="ck-notes-empty">
          <div className="ck-notes-empty-title">{c.emptyTitle}</div>
          <p className="ck-notes-empty-body">{c.emptyBody}</p>
        </div>
      ) : (
        <ul className="ck-notes-list">
          {notes.map((n) => (
            <li key={n.slug}>
              <NoteListItem note={n} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
