import type { Metadata } from "next";
import { WhatIDoArchive } from "@/components/sections/WhatIDoArchive";
import { meta, pageHeaders } from "@/lib/content";
import { portfolio } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: meta.whatIDo.title,
  description: meta.whatIDo.description,
  alternates: { canonical: "/what-i-do" },
  openGraph: {
    title: meta.whatIDo.title,
    description: meta.whatIDo.description,
    url: "/what-i-do",
  },
};

export default function WhatIDoPage() {
  const c = pageHeaders.whatIDo;

  return (
    <section
      id="what-i-do"
      className="ck-page ck-page--wide"
      aria-labelledby="whatido-page-title"
    >
      <header className="ck-page-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 id="whatido-page-title" className="ck-page-title">
          {c.title}
        </h1>
        <p className="ck-page-intro">{c.intro}</p>
      </header>

      <WhatIDoArchive items={portfolio} />
    </section>
  );
}
