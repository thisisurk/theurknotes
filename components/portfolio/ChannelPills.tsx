import type { CSSProperties, ReactNode } from "react";
import type { Channel } from "@/lib/portfolio";

type Props = {
  channels?: Channel[];
  accent: string;
};

// Channel chips — facebook / youtube / x / line / github / web. Render as
// <a target="_blank"> when href present, plain <span> otherwise.
export function ChannelPills({ channels, accent }: Props) {
  if (!channels || channels.length === 0) return null;

  return (
    <div className="ck-channel-pills">
      {channels.map((c, i) => {
        const Icon = CHANNEL_ICON[c.type] ?? CHANNEL_ICON.web;
        const borderStyle: CSSProperties = {
          borderColor: hexAlpha(accent, 0.27),
        };
        const inner = (
          <span className="ck-channel-pill" style={borderStyle}>
            <span className="ck-channel-pill-icon" style={{ color: accent }}>
              <Icon />
            </span>
            <span className="ck-channel-pill-label">{c.label}</span>
            {c.count != null && (
              <span style={{ color: accent }}>{c.count}</span>
            )}
          </span>
        );
        if (c.href) {
          return (
            <a
              key={`${c.type}-${i}`}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              {inner}
            </a>
          );
        }
        return <span key={`${c.type}-${i}`}>{inner}</span>;
      })}
    </div>
  );
}

// Append an alpha pair to a hex color. `accent` may be `#RRGGBB` or a CSS var
// reference — in the var case we just fall back to a neutral border tint.
function hexAlpha(hex: string, alpha: number): string {
  if (!hex.startsWith("#")) return "var(--border)";
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

type IconCmp = () => ReactNode;

// Inline brand SVGs — tiny so we don't pull a sprite library for 6 glyphs.
const CHANNEL_ICON: Record<Channel["type"], IconCmp> = {
  facebook: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.26 10.44 22v-7.02H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22C18.34 21.26 22 17.1 22 12.07z" />
    </svg>
  ),
  youtube: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" />
    </svg>
  ),
  x: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  ),
  line: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.36 9.84c0-3.96-3.97-7.18-8.85-7.18S1.66 5.88 1.66 9.84c0 3.55 3.15 6.52 7.4 7.08.29.06.68.19.78.43.09.22.06.57.03.79l-.13.76c-.04.22-.18.88.77.48s5.13-3.02 7-5.17c1.29-1.42 1.85-2.85 1.85-4.37zM8.04 12.16h-1.6c-.23 0-.42-.19-.42-.42V8.32c0-.23.19-.42.42-.42s.42.19.42.42v3h1.18c.23 0 .42.19.42.42s-.19.42-.42.42zm1.65-.42c0 .23-.19.42-.42.42s-.42-.19-.42-.42V8.32c0-.23.19-.42.42-.42s.42.19.42.42v3.42zm4.1 0c0 .18-.12.34-.29.4h-.13c-.13 0-.26-.06-.34-.17l-1.74-2.36v2.13c0 .23-.19.42-.42.42s-.42-.19-.42-.42V8.32c0-.18.12-.34.29-.4.04-.01.09-.02.13-.02.13 0 .26.06.34.17l1.74 2.36V8.32c0-.23.19-.42.42-.42s.42.19.42.42v3.42zm2.92-1.71h-1.18v.74h1.18c.23 0 .42.19.42.42s-.19.42-.42.42h-1.6c-.23 0-.42-.19-.42-.42V8.32c0-.23.19-.42.42-.42h1.6c.23 0 .42.19.42.42s-.19.42-.42.42h-1.18v.74h1.18c.23 0 .42.19.42.42s-.19.42-.42.42z" />
    </svg>
  ),
  github: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.96 10.96 0 0 1 5.74 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.26 5.68.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  ),
  web: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  other: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
    </svg>
  ),
};
