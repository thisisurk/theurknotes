import Link from "next/link";
import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { footer, nav, socials } from "@/lib/content";
import {
  TwitterIcon,
  GithubIcon,
  ThreadsIcon,
  TiktokIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "./BrandIcons";
import { FooterSystemStatus } from "./FooterSystemStatus";

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComp> = {
  Twitter: TwitterIcon,
  Github: GithubIcon,
  Mail: Mail as unknown as IconComp,
  Threads: ThreadsIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
  Tiktok: TiktokIcon,
};

// Maps socials.icon → data-brand attr value for CSS hover color tinting.
// Twitter → "x" because the brand identifier in CSS uses the current name.
const brandKey: Record<string, string> = {
  Mail: "email",
  Twitter: "x",
  Threads: "threads",
  Facebook: "facebook",
  Instagram: "instagram",
  Youtube: "youtube",
  Tiktok: "tiktok",
  Github: "github",
};

function isExternal(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http");
}

// Cockpit footer (Phase C/2 + C/4.6): edge marker + 2-col grid.
// Left: brand · tagline · nav-mirror.  Right: SYSTEM_STATUS · socials.
// Year is rendered fresh (server) so no stale "© 2026" string ever ships.
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
        <div className="footer-col footer-col-left">
          <div className="footer-mark">
            {footer.brand.lead}
            <span className="accent">{footer.brand.accent}</span>
          </div>
          <p className="footer-tag">{footer.tagline}</p>
          <p className="footer-tag-th">{footer.taglineTh}</p>
          <nav className="footer-nav" aria-label="Footer">
            {nav.items.map((it) =>
              isExternal(it.href) ? (
                <a key={it.href} href={it.href} className="footer-link">
                  {it.label}
                </a>
              ) : (
                <Link key={it.href} href={it.href} className="footer-link">
                  {it.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="footer-col footer-col-right">
          <FooterSystemStatus />
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
                    data-brand={brandKey[s.icon]}
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
      </div>

      <div className="footer-bottom">
        <span className="footer-cursor">
          <span className="gt">&gt;</span>
          {footer.cursor}
          <span className="blink" aria-hidden="true" />
        </span>
        <span className="footer-copy">© {year} {footer.copy}</span>
      </div>
    </footer>
  );
}
