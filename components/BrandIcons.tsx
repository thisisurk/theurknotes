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
