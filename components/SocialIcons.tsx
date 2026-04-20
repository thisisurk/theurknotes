import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { socials } from "@/lib/content";
import { cn } from "@/lib/utils";
import { TwitterIcon, GithubIcon } from "./BrandIcons";

type IconComp = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

const iconMap: Record<string, IconComp> = {
  Twitter: TwitterIcon,
  Github: GithubIcon,
  Mail: Mail as unknown as IconComp,
};

type Props = {
  size?: number;
  gap?: string;
  className?: string;
};

export function SocialIcons({ size = 20, gap = "1.5rem", className }: Props) {
  return (
    <ul
      className={cn("flex items-center", className)}
      style={{ gap }}
      aria-label="Social links"
    >
      {socials.map((s) => {
        const Icon = iconMap[s.icon] ?? Mail;
        return (
          <li key={s.label}>
            <a
              href={s.url}
              aria-label={s.ariaLabel}
              className="link-gold inline-flex items-center justify-center"
              target={s.url.startsWith("http") ? "_blank" : undefined}
              rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon size={size} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
