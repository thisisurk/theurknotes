// Portfolio schema (Phase C foundation)
// Single source of truth for what TheUrk is doing — three kinds:
//   - business  → commercial ventures (FLAGSHIP / BUILDING / NEAR LAUNCH …)
//   - tool      → personal-use stacks (LIVE / PERSONAL)
//   - creation  → output without commercial intent (videos, indie game)
//
// Mirrors v6 mockup (test-gemini/index-gemini-v6.html lines 1189-1313)
// and the meta-block convention in WEB-ARCHITECTURE.md §2 / BRAND-DNA §3.

export type PortfolioKind = "business" | "tool" | "creation";

// Maps to status pill color in v6 (.pill.gold/.blue/.green/.neutral/.amber).
export type StatusKind = "gold" | "blue" | "green" | "neutral" | "amber";

export type MetaRow = { label: string; value: string };

export type Channel = {
  type: "web" | "facebook" | "youtube" | "x" | "line" | "github" | "other";
  label: string;
  href: string | null;
  count?: number | null;
};

export type PortfolioItem = {
  id: string;
  kind: PortfolioKind;
  name: string;
  status: string;          // free-form label e.g. "FLAGSHIP", "NEAR LAUNCH"
  statusKind: StatusKind;
  accent: string;          // hex — drives gradient/glow per card
  desc: string;
  meta: MetaRow[];         // 3 rows · Business=SCOPE/TRACTION/STACK · Tool=PURPOSE/USE/STACK · Creation=MEDIUM/YEAR/MADE WITH
  tag: string;             // short caption shown beside title
  featured?: boolean;
  image?: string | null;
  channels?: Channel[];
  video?: string | null;   // creation-specific
  ctaLabel?: string;       // creation-specific · WATCH · PLAY · LISTEN · VIEW · READ
};

// ---------------------------------------------------------------------------
// Businesses — commercial ventures
// ---------------------------------------------------------------------------

export const businesses: PortfolioItem[] = [
  {
    id: "mongtam",
    kind: "business",
    name: "พระมองตาม",
    status: "FLAGSHIP",
    statusKind: "gold",
    accent: "#A78BFA",
    desc: "ธุรกิจครอบครัวสระแก้ว — หล่อพระพุทธรูปจากหินทรายธรรมชาติบดละเอียด ด้วยเทคนิคเฉพาะ ลิขสิทธิ์เจ้าเดียวในโลก",
    meta: [
      { label: "SCOPE", value: "Family · Sakaeo · Aranyaprathet" },
      { label: "ROLE", value: "Solo digital + automation lead" },
      { label: "NEXT", value: "Rebrand · AI/automation 2026" },
    ],
    tag: "Heritage · Track 1",
    featured: true,
    image: null,
    channels: [
      { type: "facebook", label: "Mongtaam", href: "https://facebook.com/Mongtaam" },
      { type: "web", label: "OTOP 5-star", href: null },
    ],
  },
  {
    id: "vendo",
    kind: "business",
    name: "Vendo",
    status: "BUILDING",
    statusKind: "blue",
    accent: "#60A5FA",
    desc: "LINE Mini App SaaS สำหรับร้าน F&B — ระบบจัดการร้านอัตโนมัติ (Order · Queue · CRM)",
    meta: [
      { label: "SCOPE", value: "Solo · LINE Mini App SaaS" },
      { label: "TRACTION", value: "First customer live · TofuQ" },
      { label: "STACK", value: "LIFF · Stripe · Supabase" },
    ],
    tag: "SaaS · Track 2",
    channels: [{ type: "web", label: "vendo.app", href: null }],
  },
  {
    id: "ayu",
    kind: "business",
    name: "AYU",
    status: "NEAR LAUNCH",
    statusKind: "gold",
    accent: "#D4A853",
    desc: "แบรนด์น้ำเต้าหู้ปั่นเพื่อสุขภาพ — physical business ที่ออกแบบหลังบ้านให้รัน solo + automation ได้",
    meta: [
      { label: "SCOPE", value: "Solo · F&B brand" },
      { label: "TRACTION", value: "Q3 2026 launch" },
      { label: "MODEL", value: "Brand · Franchise-ready" },
    ],
    tag: "F&B · Track 3",
  },
];

// ---------------------------------------------------------------------------
// Tools — own-use stacks
// ---------------------------------------------------------------------------

export const tools: PortfolioItem[] = [
  {
    id: "goldlog",
    kind: "tool",
    name: "GoldLog",
    status: "LIVE",
    statusKind: "green",
    accent: "#4ADE80",
    desc: "XAUUSD Trading Journal — บันทึกและวิเคราะห์การเทรดทองอัตโนมัติ",
    meta: [
      { label: "PURPOSE", value: "Personal trading journal" },
      { label: "USE", value: "Daily personal use" },
      { label: "STACK", value: "Next.js · Supabase · Vercel" },
    ],
    tag: "Journal · Built",
    channels: [{ type: "web", label: "goldlog.app", href: "https://goldlog.app" }],
  },
  {
    id: "agents",
    kind: "tool",
    name: "Solo Operating Stack",
    status: "PERSONAL",
    statusKind: "neutral",
    accent: "#94A3B8",
    desc: "Execution stack ที่ใช้รัน ventures ทั้งหมดด้วยตัวคนเดียว — AI agents เป็นแรงงานหลัก",
    meta: [
      { label: "PURPOSE", value: "Solo execution layer" },
      { label: "USE", value: "Powers Vendo · GoldLog · ops" },
      { label: "STACK", value: "Claude · n8n · custom" },
    ],
    tag: "Stack · Internal",
  },
];

// ---------------------------------------------------------------------------
// Creations — output, not commercial
// CTA per medium per WEB-ARCHITECTURE §2: WATCH · PLAY · LISTEN · VIEW · READ
// ---------------------------------------------------------------------------

export const creations: PortfolioItem[] = [
  {
    id: "vote-buying",
    kind: "creation",
    name: "ซื้อเสียง",
    status: "RELEASED",
    statusKind: "gold",
    accent: "#F472B6",
    desc: "AI-generated short film — สะท้อนภาพการเมืองไทย",
    meta: [
      { label: "MEDIUM", value: "AI VIDEO" },
      { label: "YEAR", value: "2026" },
      { label: "MADE WITH", value: "Banana Pro · VEO3" },
    ],
    tag: "Short film · 2026",
    featured: true,
    video: null, // TODO: drop file under /public/videos/ then set path
    ctaLabel: "WATCH",
  },
  {
    id: "thai-no-war",
    kind: "creation",
    name: "ยึดไทย ไม่ต้องรบ",
    status: "RELEASED",
    statusKind: "gold",
    accent: "#C084FC",
    desc: "AI-generated short film — แนวคิดและภาพสะท้อนเชิงสังคม",
    meta: [
      { label: "MEDIUM", value: "AI VIDEO" },
      { label: "YEAR", value: "2026" },
      { label: "MADE WITH", value: "Banana Pro · VEO3" },
    ],
    tag: "Short film · 2026",
    video: null,
    ctaLabel: "WATCH",
  },
  {
    id: "next-drop",
    kind: "creation",
    name: "Next Drop",
    status: "WIP",
    statusKind: "neutral",
    accent: "#A78BFA",
    desc: "Indie game prototype — solo experiment in procedural narrative",
    meta: [
      { label: "MEDIUM", value: "INDIE GAME" },
      { label: "YEAR", value: "2026" },
      { label: "MADE WITH", value: "Godot · Aseprite" },
    ],
    tag: "Game · Prototype",
    video: null,
    ctaLabel: "PLAY",
  },
];

// Convenience: flat list (Home + /what-i-do can both consume)
export const portfolio: PortfolioItem[] = [...businesses, ...tools, ...creations];

// Status-pill style config — components read this so visual stays single-source.
export const statusPill: Record<
  StatusKind,
  { color: string; border: string; dot: string }
> = {
  gold: {
    color: "var(--accent-gold)",
    border: "var(--accent-gold-soft)",
    dot: "var(--accent-gold)",
  },
  blue: {
    color: "var(--status-blue)",
    border: "rgba(96,165,250,0.4)",
    dot: "var(--status-blue)",
  },
  green: {
    color: "var(--success)",
    border: "rgba(74,222,128,0.4)",
    dot: "var(--success)",
  },
  neutral: {
    color: "var(--text-secondary)",
    border: "var(--border)",
    dot: "var(--text-muted)",
  },
  amber: {
    color: "var(--status-amber)",
    border: "rgba(251,191,36,0.4)",
    dot: "var(--status-amber)",
  },
};
