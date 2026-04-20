import { about, sections } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="px-6 py-24 md:py-32"
      aria-labelledby="about-label"
    >
      <div className="mx-auto max-w-[640px]">
        <p id="about-label" className="section-label mb-6">
          {sections.about.label}
        </p>
        {about.map((paragraph, i) => (
          <p
            key={i}
            className="text-primary"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
