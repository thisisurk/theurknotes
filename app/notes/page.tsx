import type { Metadata } from "next";
import { meta, sections } from "@/lib/content";
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

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[720px]">
        <p className="section-label mb-4">{sections.notes.label}</p>

        {isEmpty ? (
          <div className="mx-auto mt-32 mb-32 max-w-[480px] text-center">
            <h1
              className="text-primary"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
              }}
            >
              {sections.notes.emptyTitle}
            </h1>
            <p className="text-secondary" style={{ lineHeight: 1.7 }}>
              {sections.notes.emptyBody}
            </p>
          </div>
        ) : (
          <>
            <p
              className="text-secondary mb-8"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              {sections.notes.intro}
            </p>

            <div className="mb-10">
              <TagFilter activeTag="all" />
            </div>

            <ul className="flex flex-col gap-2">
              {notes.map((n) => (
                <li key={n.slug}>
                  <NoteListItem note={n} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
