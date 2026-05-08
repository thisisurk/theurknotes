// DEPRECATED — replaced by lib/portfolio.ts in Phase C/1 (2026-05-08).
//
// This file is a backward-compat shim so existing JSX components
// (app/page.tsx, components/VentureCard.tsx, components/StatusBadge.tsx)
// keep compiling while the redesign is in flight.
//
// To be removed in Phase C/2 once Hero + Home sections migrate to
// reading directly from `@/lib/portfolio`.

import { businesses, tools, type PortfolioItem, type StatusKind } from "./portfolio";

export type VentureStatus = "live" | "near-ship" | "wip" | "coming";

export type Venture = {
  id: string;
  title: string;
  status: VentureStatus;
  subtitle: string;
  body: string;
  link: {
    label: string;
    url: string | null;
  };
};

function mapStatus(kind: StatusKind): VentureStatus {
  switch (kind) {
    case "green":
      return "live";
    case "gold":
      return "near-ship";
    case "blue":
    case "amber":
      return "wip";
    case "neutral":
    default:
      return "coming";
  }
}

function splitDesc(desc: string): { subtitle: string; body: string } {
  const i = desc.indexOf("—");
  if (i === -1) return { subtitle: desc, body: desc };
  return {
    subtitle: desc.slice(0, i).trim(),
    body: desc.slice(i + 1).trim(),
  };
}

function adapt(item: PortfolioItem): Venture {
  const { subtitle, body } = splitDesc(item.desc);
  const web = item.channels?.find((c) => c.type === "web");
  return {
    id: item.id,
    title: item.name,
    status: mapStatus(item.statusKind),
    subtitle,
    body,
    link: {
      label: web?.label ?? "",
      url: web?.href ?? null,
    },
  };
}

export const ventures: Venture[] = [...businesses, ...tools].map(adapt);

export const statusBadge: Record<
  VentureStatus,
  { label: string; bg: string; text: string }
> = {
  live: {
    label: "Live",
    bg: "rgb(74 222 128 / 0.15)",
    text: "var(--success)",
  },
  "near-ship": {
    label: "Near Ship",
    bg: "var(--accent-gold-dim)",
    text: "var(--accent-gold)",
  },
  wip: {
    label: "WIP",
    bg: "var(--bg-card-hover)",
    text: "var(--text-muted)",
  },
  coming: {
    label: "Coming",
    bg: "var(--bg-card-hover)",
    text: "var(--text-muted)",
  },
};
