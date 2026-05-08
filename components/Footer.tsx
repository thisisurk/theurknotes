import Link from "next/link";
import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { footer, nav, site, socials } from "@/lib/content";
import { TwitterIcon, GithubIcon } from "./BrandIcons";

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComp> = {
  Twitter: TwitterIcon,
  Github: GithubIcon,
  Mail: Mail as unknown as IconComp,
};

// Cockpit footer (Phase C/2): edge marker + brand/tag/socials + nav mirror
// + bottom cursor line. Year is rendered fresh, never a stale string.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-cockpit" aria-label="Site footer">
      <div className="footer-edge">
        <span className="footer-eyebrow">
          <span className="dot" aria-hidden="true" />
          {footer.eyebrow}
        </span>
      </div>

      <div className="footer-grid">
        <div>
          <div className="footer-mark">
            {footer.brand.lead}
            <span className="accent">{footer.brand.accent}</span>
          </div>
          <p className="footer-tag">{footer.tagline}</p>
          <p className="footer-tag-th">{footer.taglineTh}</p>
          <ul className="footer-socials" aria-label="Social links">
            {socials.map((s) => {
              const Icon = iconMap[s.icon] ?? Mail;
              const external = s.url.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.url}
                    aria-label={s.ariaLabel}
                    className="footer-social-btn"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          {nav.items.map((it) => (
            <Link key={it.href} href={it.href} className="footer-link">
              {it.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="footer-cursor">
          <span className="gt">▸</span>
          {footer.locale} · {year} · {footer.cursor}
          <span className="blink" aria-hidden="true" />
        </span>
        <span className="footer-copy">© {year} {site.name}</span>
      </div>
    </footer>
  );
}
