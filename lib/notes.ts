// Reads /content/notes/*.mdx at build time.
// Returns typed notes sorted newest first.
// Filters out drafts in production.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Tag } from "./content";

export type Note = {
  slug: string;
  title: string;
  date: string; // ISO
  tag: Tag;
  summary?: string;
  draft?: boolean;
  body: string; // raw MDX
};

const NOTES_DIR = path.join(process.cwd(), "content/notes");

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith(".mdx"));

  const notes = files.map((filename) => {
    const raw = fs.readFileSync(path.join(NOTES_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: data.slug as string,
      title: data.title as string,
      date: data.date as string,
      tag: data.tag as Tag,
      summary: data.summary as string | undefined,
      draft: data.draft as boolean | undefined,
      body: content,
    } satisfies Note;
  });

  const isProd = process.env.NODE_ENV === "production";
  return notes
    .filter((n) => !isProd || !n.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNoteBySlug(slug: string): Note | null {
  return getAllNotes().find((n) => n.slug === slug) ?? null;
}

export function getNotesByTag(tag: Tag): Note[] {
  return getAllNotes().filter((n) => n.tag === tag);
}

export function getPublishedCount(): number {
  return getAllNotes().length;
}
