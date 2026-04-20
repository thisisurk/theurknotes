import Link from "next/link";
import { tagLabels } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { Note } from "@/lib/notes";

type Props = {
  note: Note;
};

export function NoteListItem({ note }: Props) {
  return (
    <Link
      href={`/notes/${note.slug}`}
      className="note-row block px-3 py-4 -mx-3"
    >
      <div className="text-muted text-xs flex items-center gap-2">
        <time dateTime={note.date}>{formatDate(note.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{tagLabels[note.tag]}</span>
      </div>

      <h3
        className="note-row-title text-primary mt-1.5"
        style={{
          fontSize: "1.15rem",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          lineHeight: 1.4,
        }}
      >
        {note.title}
      </h3>

      {note.summary && (
        <p
          className="text-secondary mt-1.5"
          style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
        >
          {note.summary}
        </p>
      )}

      <div className="mt-3 flex items-center gap-1.5">
        <span
          className="inline-flex items-center rounded-full text-muted"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.2rem 0.55rem",
            border: "1px solid var(--border)",
          }}
        >
          #{note.tag}
        </span>
      </div>
    </Link>
  );
}
