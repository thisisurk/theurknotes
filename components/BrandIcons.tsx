import type { SVGProps } from "react";

// Lucide v1 dropped brand icons. Inline SVG keeps them on-brand,
// stroke-style and currentColor-based to match the rest of the icon set.

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const baseProps = (size: number, props: IconProps): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  ...props,
});

export function TwitterIcon({ size = 20, ...props }: IconProps) {
  // X (formerly Twitter) — minimalist X mark
  return (
    <svg {...baseProps(size, props)}>
      <path d="M3 3l8.5 11.2L3.5 21H6l7-7.5L18 21h3l-9-11.7L20.5 3H18l-6.5 7L6 3H3z" />
    </svg>
  );
}

export function GithubIcon({ size = 20, ...props }: IconProps) {
  // Simplified GitHub octocat outline — stroke style
  return (
    <svg {...baseProps(size, props)}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1a4.7 4.7 0 0 0-1.3-3.3c.1-.3.6-1.6-.1-3.4 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.7 2.4 5.6 2.7 5.6 2.7c-.7 1.8-.2 3.1-.1 3.4A4.7 4.7 0 0 0 4.2 9.4c0 4.6 2.7 5.7 5.5 6.1-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

export function ThreadsIcon({ size = 20, ...props }: IconProps) {
  // Threads (Meta) — stylized "@" curl. Not in lucide; custom stroke.
  return (
    <svg {...baseProps(size, props)}>
      <path d="M16 7.5c-1-1.5-2.6-2.5-4.5-2.5C7.5 5 5.5 7.5 5.5 12s2 7 6 7c4 0 6-2 6-4.5 0-2-1.5-3.5-4-3.5-1.6 0-2.7 1-2.7 2 0 .9.6 1.5 1.5 1.5" />
    </svg>
  );
}

export function TiktokIcon({ size = 20, ...props }: IconProps) {
  // TikTok — stylized music-note "d". Not in lucide; custom stroke.
  return (
    <svg {...baseProps(size, props)}>
      <path d="M13 4v11a4 4 0 1 1-4-4" />
      <path d="M13 4c0 2 1.6 3.5 3.5 3.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, ...props }: IconProps) {
  // Facebook "f" mark in circle — outline traced
  return (
    <svg {...baseProps(size, props)}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }: IconProps) {
  // Instagram — rounded square + inner circle + sparkle dot
  return (
    <svg {...baseProps(size, props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, ...props }: IconProps) {
  // YouTube — rounded rectangle frame + play triangle
  return (
    <svg {...baseProps(size, props)}>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <path d="M10 9.5l5 2.5-5 2.5v-5z" />
    </svg>
  );
}
