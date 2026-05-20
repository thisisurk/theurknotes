import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TAGS, pageHeaders, tagLabels, type Tag } from "@/lib/content";
import { getAllNotes, getNotesByTag } from "@/lib/notes";
import { NoteListItem } from "@/components/NoteListItem";
import { TagFilter } from "@/components/TagFilter";

type Params = { tag: string };

export function generateStaticParams() {
  // Pre-render only tags that actually have at least one note.
  const allNotes = getAllNotes();
  const usedTags = new Set(allNotes.map((n) => n.tag));
  return TAGS.filter((t) => usedTags.has(t)).map((t) => ({ tag: t }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const isValid = (TAGS as readonly string[]).includes(tag);
  if (!isValid) return {};
  const label = tagLabels[tag as Tag];
  return {
    title: `${label} — Notes`,
    description: `บันทึกหมวด ${label} จาก TheUrk`,
    alternates: { canonical: `/notes/tag/${tag}` },
  };
}

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  if (!(TAGS as readonly string[]).includes(tag)) notFound();

  const notes = getNotesByTag(tag as Tag);
  const c = pageHeaders.notes;
  const label = tagLabels[tag as Tag];
  const isEmpty = notes.length === 0;

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
        <TagFilter activeTag={tag as Tag} />
      </div>

      {isEmpty ? (
        <div className="ck-notes-empty">
          <div className="ck-notes-empty-title">ยังไม่มีบันทึกในหมวด {label}</div>
          <p className="ck-notes-empty-body">เลือก tag อื่น หรือดู All</p>
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
