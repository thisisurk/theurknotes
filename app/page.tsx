import { Hero } from "@/components/Hero";
import { CockpitDivider } from "@/components/CockpitDivider";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { NotesPreview } from "@/components/sections/NotesPreview";
import { LiveLog } from "@/components/sections/LiveLog";
import { ActivityShowcase } from "@/components/sections/ActivityShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
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
        <CockpitDivider label="01 / ABOUT" tone="gold" />
        <AboutSection />

        <CockpitDivider label="02 / WHAT I DO" tone="blue" />
        <WhatIDoSection />

        <CockpitDivider label="03 / NOTES" tone="purple" />
        <NotesPreview />

        <CockpitDivider label="04 / ACTIVITY" tone="green" />
        <ActivityShowcase />

        <CockpitDivider label="05 / LIVE LOG" tone="gold" />
        <LiveLog />
      </div>

      {ventureJsonLd.map((data, i) => (
        <JsonLd key={`ld-venture-${i}`} data={data} id={`ld-venture-${i}`} />
      ))}
    </>
  );
}
