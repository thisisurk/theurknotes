import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TAGS, tagLabels, sections, type Tag } from "@/lib/content";
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
  const label = tagLabels[tag as Tag];

  return (
    <section className="px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[720px]">
        <p className="section-label mb-4">{sections.notes.label}</p>
        <p
          className="text-secondary mb-8"
          style={{ fontSize: "1rem", lineHeight: 1.7 }}
        >
          {sections.notes.intro}
        </p>

        <div className="mb-10">
          <TagFilter activeTag={tag as Tag} />
        </div>

        {notes.length === 0 ? (
          <p className="text-muted text-sm">
            ยังไม่มีบันทึกในหมวด {label}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {notes.map((n) => (
              <li key={n.slug}>
                <NoteListItem note={n} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
