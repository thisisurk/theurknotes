import type { MetadataRoute } from "next";
import { getAllNotes } from "@/lib/notes";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/notes`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const noteEntries: MetadataRoute.Sitemap = notes.map((n) => ({
    url: `${site.url}/notes/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const usedTags = Array.from(new Set(notes.map((n) => n.tag)));
  const tagEntries: MetadataRoute.Sitemap = usedTags.map((t) => ({
    url: `${site.url}/notes/tag/${t}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...noteEntries, ...tagEntries];
}
