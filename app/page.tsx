import { Hero } from "@/components/Hero";
import { CockpitDivider } from "@/components/CockpitDivider";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { NotesPreview } from "@/components/sections/NotesPreview";
import { LiveLog } from "@/components/sections/LiveLog";
import { ActivityShowcase } from "@/components/sections/ActivityShowcase";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { JsonLd } from "@/components/JsonLd";
import { ventures } from "@/lib/ventures";
import { site } from "@/lib/content";

export default function HomePage() {
  // Emit SoftwareApplication JSON-LD only for live + near-ship ventures —
  // backed by the lib/ventures shim that adapts from lib/portfolio.
  const venturesForSchema = ventures.filter(
    (v) => v.status === "live" || v.status === "near-ship",
  );

  const ventureJsonLd = venturesForSchema.map((v) => {
    const category =
      v.id === "goldlog" ? "FinanceApplication" : "BusinessApplication";
    const description =
      v.id === "goldlog"
        ? "XAUUSD trading journal for manual traders"
        : v.subtitle;
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: v.title,
      description,
      url: v.link.url ?? site.url,
      author: { "@id": `${site.url}/#person` },
      applicationCategory: category,
    } as Record<string, unknown>;
  });

  return (
    <>
      <Hero />

      <div className="ck-home-flow">
        <CockpitDivider label="WHAT I DO" tone="gold" />
        <WhatIDoSection />

        <CockpitDivider label="NOTES" tone="purple" />
        <NotesPreview />

        <CockpitDivider label="LIVE LOG" tone="blue" />
        <LiveLog />

        <CockpitDivider label="ACTIVITY" tone="green" />
        <ActivityShowcase />

        <CockpitDivider label="ABOUT" tone="gold" />
        <AboutPreview />
      </div>

      {ventureJsonLd.map((data, i) => (
        <JsonLd key={`ld-venture-${i}`} data={data} id={`ld-venture-${i}`} />
      ))}
    </>
  );
}
