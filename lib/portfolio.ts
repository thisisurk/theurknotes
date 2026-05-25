// Portfolio schema (Phase C foundation)
// Single source of truth for what TheUrk is doing — three kinds:
//   - business  → commercial ventures (LIVE / BUILDING / CONCEPT)
//   - tool      → personal-use stacks (LIVE / BUILDING)
//   - creation  → output without commercial intent (LIVE / BUILDING)
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
  status: string;          // 3 labels: "LIVE" · "BUILDING" · "CONCEPT"
  statusKind: StatusKind;
  accent: string;          // hex — drives gradient/glow per card
  desc: string;
  meta: MetaRow[];         // 3 rows · Business=SCOPE/TRACTION/STACK · Tool=PURPOSE/USE/STACK · Creation=MEDIUM/YEAR/MADE WITH
  tag: string;             // short caption shown beside title
  featured?: boolean;
  image?: string | null;
  channels?: Channel[];
  video?: string | null;   // creation-specific
  href?: string | null;    // Home card click target. https://… → opens in new tab.
                           //   /… → client-side nav. null/omitted → /what-i-do archive fallback.
  ctaLabel?: string;       // creation-specific · WATCH · PLAY · LISTEN · VIEW · READ
  lesson?: string;         // F/4: 1-line specific learning/outcome · only rendered on /what-i-do (showLesson prop), hidden on home
};

// ---------------------------------------------------------------------------
// Businesses — commercial ventures
// ---------------------------------------------------------------------------

export const businesses: PortfolioItem[] = [
  {
    id: "mongtam",
    kind: "business",
    name: "พระมองตาม",
    status: "LIVE",
    statusKind: "green",
    accent: "#A78BFA",
    desc: "ธุรกิจครอบครัวสระแก้ว — หล่อพระพุทธรูปจากหินทรายธรรมชาติบดละเอียด ด้วยเทคนิคเฉพาะ ลิขสิทธิ์เจ้าเดียวในโลก",
    meta: [
      { label: "SCOPE", value: "Family · Sakaeo · Aranyaprathet" },
      { label: "ROLE", value: "Solo digital + automation lead" },
      { label: "NEXT", value: "Rebrand · AI/automation 2026" },
    ],
    tag: "Heritage · Track 1",
    featured: true,
    image: "/portfolio/mongtam/cover.webp",
    channels: [
      { type: "facebook", label: "Mongtaam", href: "https://facebook.com/Mongtaam" },
      { type: "web", label: "OTOP 5-star", href: null },
    ],
    href: "https://facebook.com/Mongtaam",
    lesson: "ครอบครัวทำมานาน · รุ่นผมเข้ามาในบทบาท digital + automation lead. Heritage scale ได้โดยไม่เสีย craft — automation จัดการหลังบ้าน ผู้ก่อตั้งทำของไป",
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
      { label: "TRACTION", value: "First customer · ร้านน้ำเต้าหู้ปั่น" },
      { label: "STACK", value: "LIFF · Stripe · Supabase" },
    ],
    tag: "SaaS · Track 1",
    featured: true,
    image: "/portfolio/vendo/cover.webp",
    channels: [{ type: "web", label: "vendo.app", href: null }],
    lesson: "First real customer = ร้านน้ำเต้าหู้ปั่นของแฟน. Build → ship → ใช้จริง → iterate. ไม่ทำ POC สำหรับ market ที่สมมติขึ้น",
  },
  {
    id: "ayu",
    kind: "business",
    name: "AYU",
    status: "CONCEPT",
    statusKind: "amber",
    accent: "#D4A853",
    desc: "แบรนด์น้ำเต้าหู้ปั่นเพื่อสุขภาพ — physical business ที่ออกแบบหลังบ้านให้รัน solo + automation ได้",
    meta: [
      { label: "SCOPE", value: "Solo · F&B brand" },
      { label: "STAGE", value: "Concept · Naming" },
      { label: "MODEL", value: "Brand · Franchise-ready" },
    ],
    tag: "F&B · Track 2",
    featured: true,
    image: "/portfolio/ayu/cover.webp",
    lesson: "ออกแบบหลังบ้านก่อนเปิดร้าน — ระบบสำคัญกว่าหน้าร้าน. Franchise-ready ตั้งแต่ store แรก ไม่ retrofit ทีหลัง",
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
    featured: true,
    image: "/portfolio/goldlog/cover.webp",
    channels: [{ type: "web", label: "goldlog.app", href: "https://goldlog.app" }],
    href: "https://goldlog.app",
    lesson: "เครื่องมือที่ผมใช้ทุกวัน — discipline ใน trading เริ่มที่บันทึก ไม่ใช่ที่ strategy. Build for self first ก็พอ",
  },
  {
    id: "agents",
    kind: "tool",
    name: "Solo Operating Stack",
    status: "LIVE",
    statusKind: "green",
    accent: "#94A3B8",
    desc: "Execution stack ที่ใช้รัน ventures ทั้งหมดด้วยตัวคนเดียว — AI agents เป็นแรงงานหลัก",
    meta: [
      { label: "PURPOSE", value: "Solo execution layer" },
      { label: "USE", value: "Powers Vendo · GoldLog · ops" },
      { label: "STACK", value: "Claude · n8n · custom" },
    ],
    tag: "Stack · Internal",
    featured: true,
    image: "/portfolio/agents/cover.webp",
    lesson: "Stack เดียวที่รันทุก venture — Claude + n8n + custom. ของผมไม่ใช่ product · เป็น operating layer",
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
    status: "LIVE",
    statusKind: "green",
    accent: "#F472B6",
    desc: "AI-generated short film — สะท้อนภาพการเมืองไทย",
    meta: [
      { label: "MEDIUM", value: "AI VIDEO" },
      { label: "YEAR", value: "2026" },
      { label: "MADE WITH", value: "Banana Pro · VEO3" },
    ],
    tag: "Short film · 2026",
    featured: true,
    image: "/portfolio/vote-buying/cover.webp",
    video: null, // TODO: drop file under /public/videos/ then set path
    ctaLabel: "WATCH",
    lesson: "AI video pipeline ทำให้คนเดียว ship short film cinematic-grade ในวันเดียว — ของที่ก่อนหน้านี้ต้องทีม",
  },
  {
    id: "thai-no-war",
    kind: "creation",
    name: "ยึดไทย ไม่ต้องรบ",
    status: "LIVE",
    statusKind: "green",
    accent: "#C084FC",
    desc: "AI-generated short film — แนวคิดและภาพสะท้อนเชิงสังคม",
    meta: [
      { label: "MEDIUM", value: "AI VIDEO" },
      { label: "YEAR", value: "2026" },
      { label: "MADE WITH", value: "Banana Pro · VEO3" },
    ],
    tag: "Short film · 2026",
    featured: true,
    image: "/portfolio/thai-no-war/cover.webp",
    video: null,
    ctaLabel: "WATCH",
    lesson: "Run 2 ของ pipeline เดิม — same tools, different angle. Iteration ที่ยืนยันว่าของแรกไม่ใช่ลูกหลง",
  },
  {
    id: "next-drop",
    kind: "creation",
    name: "Next Drop",
    status: "BUILDING",
    statusKind: "blue",
    accent: "#A78BFA",
    desc: "Indie game prototype — solo experiment in procedural narrative",
    meta: [
      { label: "MEDIUM", value: "INDIE GAME" },
      { label: "YEAR", value: "2026" },
      { label: "MADE WITH", value: "Godot · Aseprite" },
    ],
    tag: "Game · Prototype",
    featured: true,
    image: "/portfolio/next-drop/cover.webp",
    video: null,
    ctaLabel: "PLAY",
    lesson: "Solo indie prototype — ทดลอง procedural narrative ใน Godot. ของที่ไม่ commercial = lab สำหรับ skill cross-domain",
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
