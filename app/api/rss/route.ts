import { getAllNotes } from "@/lib/notes";
import { meta, site } from "@/lib/content";

export const dynamic = "force-static";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const notes = getAllNotes().slice(0, 20);

  const items = notes
    .map((n) => {
      const url = `${site.url}/notes/${n.slug}`;
      const description = n.summary ?? "";
      return `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(n.tag)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.notes.title)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(meta.notes.description)}</description>
    <language>th-th</language>
    <atom:link href="${site.url}/api/rss" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
