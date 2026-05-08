import type { Metadata } from "next";
import { LogArchive } from "@/components/sections/LogArchive";
import { LOG_ENTRIES, meta, pageHeaders } from "@/lib/content";

export const metadata: Metadata = {
  title: meta.log.title,
  description: meta.log.description,
  alternates: { canonical: "/log" },
  openGraph: {
    title: meta.log.title,
    description: meta.log.description,
    url: "/log",
  },
};

export default function LogPage() {
  const c = pageHeaders.log;

  return (
    <section
      id="log"
      className="ck-page"
      aria-labelledby="log-page-title"
    >
      <header className="ck-page-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 id="log-page-title" className="ck-page-title">
          {c.title}
        </h1>
        <p className="ck-page-intro">{c.intro}</p>
      </header>

      <LogArchive entries={LOG_ENTRIES} />
    </section>
  );
}
