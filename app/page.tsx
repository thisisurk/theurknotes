import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { VentureCard } from "@/components/VentureCard";
import { JsonLd } from "@/components/JsonLd";
import { ventures } from "@/lib/ventures";
import { sections, site } from "@/lib/content";

export default function HomePage() {
  // Emit SoftwareApplication JSON-LD only for live + near-ship ventures.
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

      {/* Ventures */}
      <section
        id="ventures"
        className="px-6 py-24 md:py-32"
        aria-labelledby="ventures-label"
      >
        <div className="mx-auto max-w-[960px]">
          <header className="mb-10 flex flex-col gap-2">
            <p id="ventures-label" className="section-label">
              {sections.ventures.label}
            </p>
            <p
              className="text-secondary"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              {sections.ventures.intro}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {ventures.map((v) => (
              <VentureCard key={v.id} venture={v} />
            ))}
          </div>
        </div>
      </section>

      <About />

      {ventureJsonLd.map((data, i) => (
        <JsonLd key={`ld-venture-${i}`} data={data} id={`ld-venture-${i}`} />
      ))}
    </>
  );
}
