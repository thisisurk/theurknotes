import { aboutPreview, sections } from "@/lib/content";
import { Glass } from "../portfolio/Glass";

// About preview — slim 2-paragraph version of /about.
// Title splits "The Casual " + gold "Ronin" per BRAND-DNA.
export function AboutPreview() {
  const c = sections.about;

  return (
    <section
      id="about"
      className="ck-section"
      aria-labelledby="about-preview-title"
    >
      <header className="ck-section-header">
        <div>
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 id="about-preview-title" className="ck-section-title">
            {c.titleLead}
            <span className="accent">{c.titleAccent}</span>
          </h2>
          <p className="ck-section-intro">{c.intro}</p>
        </div>
      </header>

      <Glass className="ck-about-preview">
        <p>{aboutPreview.intro}</p>
        <p>
          {aboutPreview.body}
          <span className="accent"> {aboutPreview.accent}</span>
          {aboutPreview.bodyAfter}
        </p>
        <div className="ck-about-foot">
          <a className="ck-btn" href={c.allLink.href}>
            {c.allLink.label}
          </a>
        </div>
      </Glass>
    </section>
  );
}
