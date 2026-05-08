// All human-readable copy lives here.
// Update this file to change what the site says without touching components.

export const site = {
  name: "TheUrk",
  url: "https://theurknotes.com",
  domain: "theurknotes.com",
  locale: "th_TH",
  ogImage: "/og-home.png",
};

export const meta = {
  home: {
    title: "Urk — Solo Founder · Systems Designer",
    description:
      "Solo Founder จากตราด ออกแบบระบบให้ AI ทำงานแทน — Architect ไม่ใช่ Builder",
  },
  notes: {
    title: "Notes — TheUrk",
    description:
      "บันทึกความคิด การออกแบบ การตัดสินใจ และชีวิตนอกจอ",
  },
};

export const nav = {
  brand: { lead: "The", accent: "Urk" },
  // 4 items per WEB-ARCHITECTURE v0.3 §1 (no Contact — footer email is enough).
  // Order encodes journey: Identity → Proof → Depth → Frequency.
  items: [
    { href: "/about", label: "About" },
    { href: "/what-i-do", label: "What I Do" },
    { href: "/notes", label: "Notes" },
    { href: "/log", label: "Log" },
  ],
};

// Annual theme — Layer B "Current Era Subtitle" per BRAND-DNA §5.
// Permanent identity ("Solo Founder จากตราด") lives in `hero.identity`.
export const annualTheme = {
  year: "2026",
  text: "สร้างระบบให้ AI Agents ทำงานให้ผม",
};

export const hero = {
  wordmark: "TheUrk",
  name: "Urk",
  identity: "Solo Founder จากตราด — ออกแบบระบบให้ AI ทำงานแทน",
  // "THINK · DESIGN · SHIP" demoted to private mantra per BRAND-DNA §5.
  tagline: "ARCHITECT",
  microLine: "Architect ไม่ใช่ Builder",

  // Cockpit top bar — three short mono segments above identity stack.
  cockpit: {
    region: "14°N · 102°E · TRAT, TH",
    framework: "FY2026 · OPUS·SOLO",
    status: "SYSTEM ACTIVE",
  },

  // Avatar — temporary asset per consolidation decision (replace later).
  avatar: {
    src: "/avatars/PB1_9757.jpg",
    alt: "Urk",
  },

  // Eyebrow above the wordmark — permanent identity (no tech coupling).
  eyebrow: "Solo Founder · ตราด, Thailand",

  // h1 wordmark split — "The" + gold "Urk".
  headline: { lead: "The", accent: "Urk" },

  // Headline punch — lead Thai sentence with one gold-accented fragment.
  punch: {
    before: "ลุยเดี่ยว. ",
    accent: "สร้างอิสรภาพ",
    after: "ด้วยเทคโนโลยี.",
  },

  // Focus block — annual theme (Layer B subtitle, current era).
  focus: {
    label: "Focus · 2026",
    body: "สร้างระบบให้ AI Agents ทำงานให้ผม",
    accent: "AI Agents",
  },

  // Role rotator — 4 facets cycle every 2.2s. Reduced-motion safe.
  roleLabel: "ROLE_",
  roles: ["ARCHITECT", "OPERATOR", "BUILDER", "OBSERVER"] as const,

  // 3 bilingual operating principles, shown vertically below identity.
  manifesto: [
    { en: "ARCHITECT FIRST", th: "ออกแบบระบบก่อนลงมือ" },
    { en: "SYSTEMS > EFFORT", th: "ระบบสำคัญกว่าแรงงาน" },
    { en: "COMPOUND > RUSH", th: "สะสมสำคัญกว่าเร่งรีบ" },
  ],

  // CTA pair below identity stack.
  ctas: [
    { label: "EXPLORE PROJECTS", href: "/what-i-do", primary: true },
    { label: "READ NOTES", href: "/notes", primary: false },
  ],

  // Live-feed ticker — short status lines, scroll horizontally.
  tickerLabel: "▸ LIVE_FEED",
  ticker: [
    "2026-05-06 · Vendo dashboard refactor",
    "Note 089 · Solo Founder Mental Models",
    "Ayu — beta deploy scheduled",
    "Field log · Muay Thai 5/5 morning",
    "2026-05-05 · Stripe webhook verified",
    "Reading · Antifragile (re-read)",
    "theurknotes.com · design v6 in progress",
  ],
};

export const sections = {
  ventures: {
    label: "VENTURES",
    intro: "ของที่ผมสร้าง — หรือกำลังสร้าง",
  },
  about: {
    label: "ABOUT",
  },
  notes: {
    label: "NOTES",
    intro: "บันทึกความคิด — การออกแบบ, การตัดสินใจ, ชีวิตนอกจอ",
    emptyTitle: "ยังไม่มีอะไรให้อ่าน — ช่วงนี้โฟกัส ship ก่อน",
    emptyBody: "เขียนเมื่อมีอะไรจะพูดจริงๆ ไม่ใช่เพื่อ update feed",
    allLink: "← All notes",
  },
  whatido: {
    label: "WHAT I DO",
    intro: "Businesses · Tools · Creations — สามขาที่ผมเดินอยู่",
  },
  activity: {
    label: "ACTIVITY",
    intro: "กิจกรรมต่างๆที่ผมทำครับ!",
  },
  log: {
    label: "LIVE LOG",
    intro: "Field log · ของที่เพิ่งทำ ของที่กำลังคิด",
    allLink: "View full log →",
  },
};

// About is an array. Each element is one paragraph.
// Blank line between paragraphs is rendered automatically.
export const about: string[] = [
  "ผมชื่อเอิ๊ก (ไม่ใช่เอิร์ก เอิร์ธ 555)",
  "Solo Founder จากตราด ที่ออกแบบระบบให้ AI ทำงานแทน ไม่ได้เขียน code เองทุกบรรทัด — แต่ออกแบบทั้งระบบให้มันเดินได้ คิด 70% Build 30%",
  "ในยุคที่ AI build ได้ทุกอย่าง สิ่งที่หายากจริงๆ คือ judgment — รู้ว่าควรสร้างอะไร ออกแบบยังไง ตัดสินใจยังไง AI build ได้ แต่ไม่รู้ว่าควรออกแบบอะไร นั่นคือ edge ที่ผมเลือกจะพัฒนา",
  "นอกจอ — เป็นประธาน YEC ตราด (หอการค้ารุ่นใหม่) ฝึก Bujinkan สายดำและมวยไทยมาหลายปี สนใจฟิสิกส์ ดาราศาสตร์ และพุทธปรัชญาแบบแก่นแท้ เวลาว่างเล่นเกม ดูคลิปหมาแมว ไม่ได้ลึกซึ้งตลอดเวลา 555",
  "ที่นี่คือที่ที่ผมบันทึก journey — ของที่สร้าง ระบบที่ออกแบบ และสิ่งที่เรียนรู้ระหว่างทาง ถ้าแนวทางตรงกัน ยินดีต้อนรับ",
];

// Footer cockpit — uses the year at render time (no stale "© 2026" string).
export const footer = {
  eyebrow: "SHUTDOWN_SEQUENCE",
  brand: { lead: "The", accent: "Urk" },
  tagline: "Solo Founder · architect, not builder",
  taglineTh: "ตราด, Thailand · solo by nature, since forever",
  // Bottom bar — locale + year. {year} is replaced at render.
  locale: "ตราด, Thailand",
  cursor: "connection persistent",
};

export const socials = [
  {
    label: "X",
    url: "https://x.com/theeark",
    icon: "Twitter",
    ariaLabel: "Urk on X",
  },
  {
    label: "GitHub",
    url: "https://github.com/thisisurk",
    icon: "Github",
    ariaLabel: "Urk on GitHub",
  },
  {
    label: "Email",
    url: "mailto:hi@theurknotes.com",
    icon: "Mail",
    ariaLabel: "Email Urk",
  },
] as const;

export const TAGS = ["building", "trat", "thoughts", "life"] as const;
export type Tag = (typeof TAGS)[number];

export const tagLabels: Record<Tag, string> = {
  building: "Building",
  trat: "Trat",
  thoughts: "Thoughts",
  life: "Life",
};

// ---------------------------------------------------------------------------
// Activity (Home section 04 · LIFE_CAT — 5 categories) — showcase, not tracker
// Per WEB-ARCHITECTURE §2: Longevity · Mind · Food · Travel · Events
// ---------------------------------------------------------------------------

export const LIFE_CAT_KEYS = [
  "longevity",
  "mind",
  "food",
  "travel",
  "events",
] as const;
export type LifeCategory = (typeof LIFE_CAT_KEYS)[number];

export type LifeCatStyle = {
  label: string;     // Audience-friendly Thai label
  accent: string;
  gradient: string;
  ghost: string;
  grid: string;
  icon: string;      // lucide-react name — components map to <Icon />
};

export const LIFE_CAT: Record<LifeCategory, LifeCatStyle> = {
  longevity: {
    label: "สุขภาพ + การออกกำลัง",
    accent: "#34D399",
    gradient: "linear-gradient(135deg, #04140C 0%, #0A3020 45%, #10B981 100%)",
    ghost: "rgba(52,211,153,0.07)",
    grid: "rgba(52,211,153,0.06)",
    icon: "activity",
  },
  mind: {
    label: "ความคิด + หนังสือ",
    accent: "#A78BFA",
    gradient: "linear-gradient(135deg, #100820 0%, #2D1060 45%, #6D28D9 100%)",
    ghost: "rgba(167,139,250,0.07)",
    grid: "rgba(167,139,250,0.06)",
    icon: "brain",
  },
  food: {
    label: "อาหาร + กาแฟ",
    accent: "#FB923C",
    gradient: "linear-gradient(135deg, #1F0A02 0%, #4A1F08 45%, #C2410C 100%)",
    ghost: "rgba(251,146,60,0.07)",
    grid: "rgba(251,146,60,0.06)",
    icon: "utensils",
  },
  travel: {
    label: "ท่องเที่ยว",
    accent: "#60A5FA",
    gradient: "linear-gradient(135deg, #050E1F 0%, #0F2550 45%, #1D4ED8 100%)",
    ghost: "rgba(96,165,250,0.07)",
    grid: "rgba(96,165,250,0.06)",
    icon: "compass",
  },
  events: {
    label: "งาน + community",
    accent: "#D4A853",
    gradient: "linear-gradient(135deg, #2A1500 0%, #6B3010 45%, #C17820 100%)",
    ghost: "rgba(212,168,83,0.07)",
    grid: "rgba(212,168,83,0.06)",
    icon: "trophy",
  },
};

export type ActivitySize = "tall" | "wide" | "normal";

export type ActivityItem = {
  id: number;
  category: LifeCategory;
  label: string;
  when: string;
  image: string | null;
  size: ActivitySize;
  snippet: string;
  recent?: boolean;
};

// Magazine-grid order is intentional — first item gets `recent: true`
// and `size: 'tall'` so the visual lead-in works.
export const ACTIVITY_ITEMS: ActivityItem[] = [
  {
    id: 1,
    category: "events",
    label: "พิธีเปิดงาน YEC",
    when: "2d ago",
    image: null,
    size: "tall",
    snippet: "เปิดงานในฐานะประธาน YEC — ภูมิใจที่ได้เป็นส่วนหนึ่ง",
    recent: true,
  },
  {
    id: 2,
    category: "longevity",
    label: "ซ้อมมวยไทย",
    when: "4d ago",
    image: null,
    size: "tall",
    snippet: "Round 5 รับนานเกิน — guard ต้องสูงกว่านี้ ครูมวยเตือนแล้ว",
  },
  {
    id: 3,
    category: "food",
    label: "คาเฟ่ใหม่ในจันท์",
    when: "1w ago",
    image: null,
    size: "normal",
    snippet: "เจอร้านลับๆ — กาแฟดี บรรยากาศใช้ได้",
  },
  {
    id: 4,
    category: "mind",
    label: "จบ Hollow Knight",
    when: "1w ago",
    image: null,
    size: "normal",
    snippet: "112 ชั่วโมง · Pantheon of Hallownest ผ่านสุดท้าย",
  },
  {
    id: 5,
    category: "travel",
    label: "เลาะชายหาดตราด",
    when: "1mo ago",
    image: null,
    size: "tall",
    snippet: "กลับบ้าน recharge — ทะเลฝั่งตะวันออกเงียบกว่าที่คิด",
  },
  {
    id: 6,
    category: "longevity",
    label: "วิ่งตอนเช้า",
    when: "3w ago",
    image: null,
    size: "normal",
    snippet: "5km ก่อนตี 6 — รู้สึกสมองโล่งขึ้นเยอะ",
  },
  {
    id: 7,
    category: "events",
    label: "ประชุม CSR ผู้ว่า",
    when: "5d ago",
    image: null,
    size: "normal",
    snippet: "นั่งโต๊ะกับผู้ว่า · CSR project ปีหน้าเริ่มไตรมาส 1",
  },
  {
    id: 8,
    category: "food",
    label: "Cafe coding",
    when: "2w ago",
    image: null,
    size: "normal",
    snippet: "นั่งจด 4 ชม. · เจ้าของร้านชะโงกดูจอ — โน้ตเบ้อเริ่ม",
  },
  {
    id: 9,
    category: "mind",
    label: "ดูจบ Frieren",
    when: "3d ago",
    image: null,
    size: "normal",
    snippet: "Episode 28 — ทำใจ 30 นาทีหลังจบ · จะอ่านมังงะต่อ",
  },
];

// ---------------------------------------------------------------------------
// LIVE LOG (Home section 05 + /log page · LOG_CAT — 4 categories)
// Per WEB-ARCHITECTURE §2: Training · Build · Read · Travel
// Distinct from Activity: high-frequency builder signal, work-progress vocab.
// ---------------------------------------------------------------------------

export const LOG_CAT_KEYS = ["training", "build", "read", "travel"] as const;
export type LogCategory = (typeof LOG_CAT_KEYS)[number];

export type LogCatStyle = {
  label: string;
  accent: string;
  gradient: string;
  ghost: string;
  grid: string;
  icon: string;
};

export const LOG_CAT: Record<LogCategory, LogCatStyle> = {
  training: {
    label: "Training",
    accent: "#D4A853",
    gradient: "linear-gradient(135deg, #2A1500 0%, #6B3010 45%, #C17820 100%)",
    ghost: "rgba(212,168,83,0.07)",
    grid: "rgba(212,168,83,0.06)",
    icon: "swords",
  },
  build: {
    label: "Build",
    accent: "#60A5FA",
    gradient: "linear-gradient(135deg, #050E1F 0%, #0F2550 45%, #1D4ED8 100%)",
    ghost: "rgba(96,165,250,0.07)",
    grid: "rgba(96,165,250,0.06)",
    icon: "code",
  },
  read: {
    label: "Read",
    accent: "#A78BFA",
    gradient: "linear-gradient(135deg, #100820 0%, #2D1060 45%, #6D28D9 100%)",
    ghost: "rgba(167,139,250,0.07)",
    grid: "rgba(167,139,250,0.06)",
    icon: "book-open",
  },
  travel: {
    label: "Travel",
    accent: "#4ADE80",
    gradient: "linear-gradient(135deg, #041410 0%, #0A3020 45%, #15803D 100%)",
    ghost: "rgba(74,222,128,0.07)",
    grid: "rgba(74,222,128,0.06)",
    icon: "tent-tree",
  },
};

export type LogEntry = {
  id: number;
  when: string;
  category: LogCategory;
  image: string | null;
  text: string;
};

// LIVE LOG entries — image: null = text-only fallback, image set = photo card.
export const LOG_ENTRIES: LogEntry[] = [
  {
    id: 1,
    when: "2d ago",
    category: "training",
    image: null,
    text: "มวยไทย session — round 5 รับนานเกิน guard ต้องสูงกว่านี้ ครูมวยเตือนแล้ว",
  },
  {
    id: 2,
    when: "5d ago",
    category: "build",
    image: null,
    text: "Vendo queue v0.7 — 11/13 tasks closed ที่เหลือคือ edge cases ของ LINE webhook",
  },
  {
    id: 3,
    when: "1w ago",
    category: "read",
    image: null,
    text: "\"Book of Five Rings\" — re-read เล่ม Earth ตรงกับงานออกแบบระบบมากกว่าครั้งแรกที่อ่าน",
  },
  {
    id: 4,
    when: "2w ago",
    category: "travel",
    image: null,
    text: "เดินป่าเขาคิชฌกูฏ — reset operating system เก็บ 3 idea กลับมา ยังไม่ได้ ship",
  },
];
