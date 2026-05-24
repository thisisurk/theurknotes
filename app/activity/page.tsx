import type { Metadata } from "next";
import { ActivityArchive } from "@/components/sections/ActivityArchive";
import { ACTIVITY_ITEMS, meta, pageHeaders } from "@/lib/content";

export const metadata: Metadata = {
  title: meta.activity.title,
  description: meta.activity.description,
  alternates: { canonical: "/activity" },
  openGraph: {
    title: meta.activity.title,
    description: meta.activity.description,
    url: "/activity",
  },
};

export default function ActivityPage() {
  const c = pageHeaders.activity;

  return (
    <section
      id="activity"
      className="ck-page ck-page--wide"
      aria-labelledby="activity-page-title"
    >
      <header className="ck-page-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 id="activity-page-title" className="ck-page-title">
          {c.title}
        </h1>
        <p className="ck-page-intro">{c.intro}</p>
      </header>

      <ActivityArchive items={ACTIVITY_ITEMS} />
    </section>
  );
}
