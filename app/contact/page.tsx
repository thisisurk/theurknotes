import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import { Mail } from "lucide-react";
import { meta, pageHeaders } from "@/lib/content";
import {
  TwitterIcon,
  ThreadsIcon,
  FacebookIcon,
} from "@/components/BrandIcons";
import { Glass } from "@/components/portfolio/Glass";

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: meta.contact.title,
    description: meta.contact.description,
    url: "/contact",
  },
};

const iconMap: Record<string, IconComp> = {
  email: Mail as unknown as IconComp,
  x: TwitterIcon,
  threads: ThreadsIcon,
  facebook: FacebookIcon,
};

export default function ContactPage() {
  const c = pageHeaders.contact;

  return (
    <section
      id="contact"
      className="ck-page"
      aria-labelledby="contact-page-title"
    >
      <header className="ck-page-header">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 id="contact-page-title" className="ck-page-title">
          {c.title}
        </h1>
        <p className="ck-page-intro">{c.intro}</p>
      </header>

      <div className="ck-contact-grid">
        {c.channels.map((ch) => {
          const Icon = iconMap[ch.key] ?? Mail;
          const external = ch.href.startsWith("http");
          return (
            <Glass key={ch.key} hover className="ck-contact-card">
              <a
                href={ch.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="ck-contact-card-link"
                aria-label={`${ch.label} · ${ch.handle}`}
              >
                <div className="ck-contact-card-head">
                  <span className="ck-contact-card-icon" aria-hidden="true">
                    <Icon size={14} strokeWidth={1.75} />
                  </span>
                  <span className="ck-contact-card-label">{ch.label}</span>
                </div>
                <div className="ck-contact-card-handle">{ch.handle}</div>
                <p className="ck-contact-card-note">{ch.note}</p>
              </a>
            </Glass>
          );
        })}
      </div>

      <ul className="ck-contact-meta" aria-label="Contact preferences">
        {c.meta.map((row) => (
          <li key={row.label} className="ck-contact-meta-row">
            <span className="ck-contact-meta-label">{row.label}</span>
            <span className="ck-contact-meta-value">{row.value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
