import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { mdxComponents } from "@/components/mdx";
import { JsonLd } from "@/components/JsonLd";
import { sections, site, tagLabels } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  const description = note.summary ?? `${note.title} — TheUrk Notes`;
  return {
    title: note.title,
    description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: "article",
      title: note.title,
      description,
      url: `${site.url}/notes/${note.slug}`,
      publishedTime: note.date,
    },
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    datePublished: note.date,
    author: { "@id": `${site.url}/#person` },
    url: `${site.url}/notes/${note.slug}`,
  };

  return (
    <article className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[680px]">
        <div className="mb-3 flex items-center gap-2 text-muted text-xs">
          <time dateTime={note.date}>{formatDate(note.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{tagLabels[note.tag]}</span>
        </div>

        <h1
          className="text-primary"
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: "1.25rem",
          }}
        >
          {note.title}
        </h1>

        {note.summary && (
          <p
            className="text-secondary italic"
            style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "2.5rem" }}
          >
            {note.summary}
          </p>
        )}

        <div className="mdx-prose">
          <MDXRemote source={note.body} components={mdxComponents} />
        </div>

        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <Link
            href={`/notes/tag/${note.tag}`}
            className="inline-flex items-center rounded-full text-sm"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              padding: "0.4rem 1rem",
            }}
          >
            #{note.tag}
          </Link>
          <Link href="/notes" className="link-gold text-sm">
            {sections.notes.allLink}
          </Link>
        </div>
      </div>

      <JsonLd data={articleJsonLd} id={`ld-blog-${note.slug}`} />
    </article>
  );
}
