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
  about: {
    title: "About — TheUrk",
    description:
      "ตัวตน · Solo OS · operating principles · timeline จาก solo by nature → solo + AI",
  },
  whatIDo: {
    title: "What I Do — TheUrk",
    description:
      "Archive ของสามเสา — Businesses · Tools · Creations. Built solo, leveraged by tech.",
  },
  activity: {
    title: "Activity — TheUrk",
    description:
      "Life feed · ทุก activity ที่ผมทำและบันทึก — สุขภาพ · ความคิด · อาหาร · ท่องเที่ยว · events",
  },
  contact: {
    title: "Contact — TheUrk",
    description:
      "ช่องทางติดต่อ Urk — email, X, GitHub. เปิดสำหรับ ventures · collaborations · YEC · community.",
  },
};

export const nav = {
  brand: { lead: "The", accent: "Urk" },
  // 5 items per v6 mockup parity (Phase C/4.6).
  // Order encodes journey: Identity → Proof → Depth → Life → Reach.
  // Activity → /activity dedicated archive (shipped Phase F/1).
  // Contact → /contact dedicated page (shipped Phase F/2). Footer keeps a
  // direct mailto: shortcut via the socials column for quick-action UX.
  items: [
    { href: "/about", label: "About" },
    { href: "/what-i-do", label: "What I Do" },
    { href: "/notes", label: "Notes" },
    { href: "/activity", label: "Activity" },
    { href: "/contact", label: "Contact" },
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

  avatar: {
    src: "/avatars/ronin-sao1-660.webp",
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

  // CTA pair below identity stack.
  ctas: [
    { label: "EXPLORE PROJECTS", href: "/what-i-do", primary: true },
    { label: "READ NOTES", href: "/notes", primary: false },
  ],

  // Cockpit top bar — three segments above the avatar/name stack.
  cockpitBar: {
    location: "14°N · 102°E · TRAT, TH",
    fy: "FY2026 · OPUS·SOLO",
    status: "SYSTEM ACTIVE",
  },

  // 3 stat cards beneath the circuit divider — each accent matches its node.
  // `icon` keys map to <StatIcon name=… /> (clock / stack / mesh).
  proof: [
    {
      lbl: "Years Solo",
      val: "20+",
      sub: "discipline before AI",
      accent: "#D4A853",
      icon: "clock" as const,
      tag: "TIMELINE_001",
    },
    {
      lbl: "Active Projects",
      val: "3",
      sub: "physical & digital",
      accent: "#60A5FA",
      icon: "stack" as const,
      tag: "PORTFOLIO_03",
    },
    {
      lbl: "Team Size",
      val: "1+AI",
      sub: "solo + agents",
      accent: "#A78BFA",
      icon: "mesh" as const,
      tag: "AGENTS_INF",
    },
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

// Section copy — every section reads from here. Do not inline strings in JSX.
// `eyebrow` = small mono caption above title. `title` = h2 text.
// `intro` = short blurb beneath title. `allLink` = nav to dedicated page.
export const sections = {
  whatido: {
    label: "WHAT I DO",
    eyebrow: "Showcase · Curated",
    title: "What I Do",
    intro:
      "ของที่อยากแชร์ — businesses · tools · creations. Built solo, leveraged by tech.",
    allLink: { label: "All works →", href: "/what-i-do" },
    pillars: {
      business: {
        tag: "PILLAR_01",
        label: "BUSINESSES",
        note: "· revenue · brands · ventures",
      },
      tool: {
        tag: "PILLAR_02",
        label: "TOOLS",
        note: "· built by me · used by me",
      },
      creation: {
        tag: "PILLAR_03",
        label: "CREATIONS",
        note: "· video · game · art · music",
      },
    },
  },
  notes: {
    label: "NOTES",
    eyebrow: "Notes & Thoughts",
    title: "Notes",
    intro:
      "บันทึกความคิด — การออกแบบ, การตัดสินใจ, ชีวิตนอกจอ. ไม่เน้นวิชาการ",
    allLink: { label: "All notes →", href: "/notes" },
    filterAllLabel: "All",
    emptyTitle: "ยังไม่มีอะไรให้อ่าน — ช่วงนี้โฟกัส ship ก่อน",
    emptyBody:
      "เขียนเมื่อมีอะไรจะพูดจริงๆ ไม่ใช่เพื่อ update feed",
  },
  activity: {
    label: "ACTIVITY",
    eyebrow: "Life & Activity",
    title: "Activity",
    intro: "กิจกรรมต่างๆที่ผมทำครับ!",
    filterAllLabel: "All",
    allLink: { label: "All activity →", href: "/activity" },
  },
  about: {
    label: "ABOUT",
    eyebrow: "About",
    titleLead: "The Casual ",
    titleAccent: "Ronin",
    // Structured so the home section can insert a responsive break between
    // the two halves on mobile (mockup .ronin-dot / .ronin-break pattern).
    intro: {
      ronin: "Ronin = ลุยเดี่ยว ไร้สังกัด",
      casual: "Casual = ชิลๆ สบายๆ คุยได้กับทุกคน โดยเฉพาะหมาแมว",
    },
    allLink: { label: "Read full About →", href: "/about" },
  },
};

// About — full bio used by /about (Phase C/5). Each element = one paragraph.
export const about: string[] = [
  "ผมชื่อเอิ๊ก (ไม่ใช่เอิร์ก เอิร์ธ 555)",
  "Solo Founder จากตราด ที่ออกแบบระบบให้ AI ทำงานแทน ไม่ได้เขียน code เองทุกบรรทัด — แต่ออกแบบทั้งระบบให้มันเดินได้ คิด 70% Build 30%",
  "ในยุคที่ AI build ได้ทุกอย่าง สิ่งที่หายากจริงๆ คือ judgment — รู้ว่าควรสร้างอะไร ออกแบบยังไง ตัดสินใจยังไง AI build ได้ แต่ไม่รู้ว่าควรออกแบบอะไร นั่นคือ edge ที่ผมเลือกจะพัฒนา",
  "นอกจอ — เป็นประธาน YEC ตราด (หอการค้ารุ่นใหม่) ฝึก Bujinkan สายดำและมวยไทยมาหลายปี สนใจฟิสิกส์ ดาราศาสตร์ และพุทธปรัชญาแบบแก่นแท้ เวลาว่างเล่นเกม ดูคลิปหมาแมว ไม่ได้ลึกซึ้งตลอดเวลา 555",
  "ที่นี่คือที่ที่ผมบันทึก journey — ของที่สร้าง ระบบที่ออกแบบ และสิ่งที่เรียนรู้ระหว่างทาง ถ้าแนวทางตรงกัน ยินดีต้อนรับ",
];

// About preview — 2 short paragraphs shown on Home (slim version of `about`).
// Keep in sync with the lead of /about when Phase C/5 ships.
export const aboutPreview = {
  intro:
    "สวัสดีครับ ผมชื่อเอิ๊ก บ้านอยู่ตราด — Solo Founder ที่ออกแบบระบบให้ AI เป็น execution layer ครอบคลุมทุก venture ตั้งแต่ digital products, trading, ไปจนถึง physical ที่กำลังจะเกิด",
  body: "ยุคที่ AI build ได้ทุกอย่าง — คนที่ชนะคือคนที่รู้ว่า",
  accent: "ควรสร้างอะไร",
  bodyAfter:
    ". Edge อยู่ที่ judgment + system design ไม่ใช่ code. Solo เป็นนิสัยพื้นฐาน — discipline สะสมมา 20+ ปีคือ moat ที่ AI agents ไม่ได้ทดแทน",
};

// Footer cockpit — uses the year at render time (no stale "© 2026" string).
export const footer = {
  eyebrow: "SHUTDOWN_SEQUENCE",
  brand: { lead: "The", accent: "Urk" },
  tagline: "Solo Founder · architect, not builder",
  taglineTh: "ตราด, Thailand · solo by nature, since forever",
  // Bottom bar — mockup pattern: ">connection persistent[blink]" + © year locale.
  cursor: "connection persistent",
  copy: "TheUrk · ตราด, Thailand",

  // Right-column SYSTEM_STATUS box — SESSION value is computed client-side
  // (FooterSystemStatus island) so it stays fresh on every page load.
  systemStatus: {
    headLabel: "SYSTEM_STATUS",
    rows: [
      { k: "REGION", v: "14°N · 102°E · TRAT" },
      { k: "PROTOCOL", v: "DIRECT" },
      { k: "NEXT", v: "SHIP_OR_SLEEP" },
    ],
  },
};

// Footer socials — full social presence (broadcast + reach).
// Order: Email · X · Threads · Facebook · Instagram · YouTube · TikTok · GitHub
// Some entries use placeholder URLs marked with TODO — replace before
// announcing the new platforms publicly.
export const socials = [
  {
    label: "Email",
    url: "mailto:urk@theurknotes.com",
    icon: "Mail",
    ariaLabel: "Email Urk",
  },
  {
    label: "X",
    url: "https://x.com/theeark",
    icon: "Twitter",
    ariaLabel: "Urk on X",
  },
  // TODO: confirm Threads handle (same as IG handle on Meta)
  {
    label: "Threads",
    url: "https://www.threads.net/@theeark",
    icon: "Threads",
    ariaLabel: "Urk on Threads",
  },
  // TODO: replace with real Facebook page/profile URL
  {
    label: "Facebook",
    url: "https://www.facebook.com/",
    icon: "Facebook",
    ariaLabel: "Urk on Facebook",
  },
  // TODO: replace with real Instagram handle URL
  {
    label: "Instagram",
    url: "https://www.instagram.com/",
    icon: "Instagram",
    ariaLabel: "Urk on Instagram",
  },
  // TODO: replace with real YouTube channel URL
  {
    label: "YouTube",
    url: "https://www.youtube.com/",
    icon: "Youtube",
    ariaLabel: "Urk on YouTube",
  },
  // TODO: replace with real TikTok handle URL
  {
    label: "TikTok",
    url: "https://www.tiktok.com/",
    icon: "Tiktok",
    ariaLabel: "Urk on TikTok",
  },
  {
    label: "GitHub",
    url: "https://github.com/thisisurk",
    icon: "Github",
    ariaLabel: "Urk on GitHub",
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
  label: string;     // Mono-caps filter label (matches card category badge)
  accent: string;
  gradient: string;
  ghost: string;
  grid: string;
  icon: string;      // lucide-react name — components map to <Icon />
};

export const LIFE_CAT: Record<LifeCategory, LifeCatStyle> = {
  longevity: {
    label: "LONGEVITY",
    accent: "#34D399",
    gradient: "linear-gradient(135deg, #04140C 0%, #0A3020 45%, #10B981 100%)",
    ghost: "rgba(52,211,153,0.07)",
    grid: "rgba(52,211,153,0.06)",
    icon: "activity",
  },
  mind: {
    label: "MIND",
    accent: "#A78BFA",
    gradient: "linear-gradient(135deg, #100820 0%, #2D1060 45%, #6D28D9 100%)",
    ghost: "rgba(167,139,250,0.07)",
    grid: "rgba(167,139,250,0.06)",
    icon: "brain",
  },
  food: {
    label: "FOOD",
    accent: "#FB923C",
    gradient: "linear-gradient(135deg, #1F0A02 0%, #4A1F08 45%, #C2410C 100%)",
    ghost: "rgba(251,146,60,0.07)",
    grid: "rgba(251,146,60,0.06)",
    icon: "utensils",
  },
  travel: {
    label: "TRAVEL",
    accent: "#60A5FA",
    gradient: "linear-gradient(135deg, #050E1F 0%, #0F2550 45%, #1D4ED8 100%)",
    ghost: "rgba(96,165,250,0.07)",
    grid: "rgba(96,165,250,0.06)",
    icon: "compass",
  },
  events: {
    label: "EVENTS",
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
// /about page — full bio + Solo OS principles + runtime config + timeline.
// Mirrors v6 mockup §AboutSection (lines 1148-1187, 3120-3389).
// ---------------------------------------------------------------------------

export type AboutPrinciple = { en: string; th: string };

export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
  { en: "SOLO BY NATURE",  th: "ชอบอยู่คนเดียวตั้งแต่จำความได้ — นิสัยพื้นฐาน" },
  { en: "JUDGMENT > CODE", th: "เลือกถูก สำคัญกว่าเขียนเร็ว" },
  { en: "CASUAL · DIRECT", th: "ตรงๆ ชิลๆ ไม่ทางการ" },
  { en: "TECH = LEVERAGE", th: "AI/agents/automation = เครื่องมือทำงานให้ผม" },
];

export type RuntimeConfigRow = { label: string; value: string };

export const RUNTIME_CONFIG: RuntimeConfigRow[] = [
  { label: "MODE",     value: "AUTONOMOUS" },
  { label: "TARGET",   value: "FREEDOM" },
  { label: "RUNTIME",  value: "24 / 7" },
  { label: "PROTOCOL", value: "DIRECT" },
];

export type SoloPhaseState = "done" | "partial" | "active";

export type SoloPhase = {
  tag: string;
  en: string;
  th: string;
  state: SoloPhaseState;
};

export type ExperienceRow = {
  label: string; // mono tag — e.g. "FAMILY_BUSINESS"
  when: string;  // duration / era — e.g. "50 ปี · หยุดแล้ว"
  body: string;  // 1-2 sentence story line (Thai)
};

// EXPERIENCE — 3-row narrative arc: origin → mistake → present.
// Public version of PERSONAL-IDENTITY §3 — curated for credibility moat,
// not exhaustive CV. "เจ๊งหมดตัว" stays direct (Casual Ronin self-deprecation
// = failure as credibility).
export const EXPERIENCE_ROWS: ExperienceRow[] = [
  {
    label: "FAMILY_BUSINESS",
    when: "50 ปี · หยุดแล้ว",
    body: "\"อัครเค็ม\" — ปลาอินทรีเค็มของครอบครัว end-to-end (หั่น ทอด แพ็ค ส่ง). ทำเองตั้งแต่เด็ก ก่อน \"founder\" จะเป็นคำ trendy",
  },
  {
    label: "CRYPTO_WEB3",
    when: "~3 ปี · ออกแล้ว ~2 ปี",
    body: "Martingale bot · NFT 50x · airdrop farming · private rounds. เจ๊งหมดตัวจาก futures ที่ไม่มีหลักการ — บทเรียนที่ทำให้ discipline > opportunity",
  },
  {
    label: "CURRENT_VENTURES",
    when: "2026 → ",
    body: "หลาย ventures ขนานกัน — digital ล้วน + hybrid (digital × physical). Vehicle เลือกตามโอกาส · automation-first ทุกตัว. First ship: Vendo/TofuQ — LINE Mini App + ร้านน้ำเต้าหู้ปั่นของแฟน (first real customer)",
  },
];

export const SOLO_TIMELINE: SoloPhase[] = [
  {
    tag: "PHASE_00",
    en: "SOLO_NATURE",
    th: "ชอบอยู่คนเดียว ตั้งแต่จำความได้ — solo by default",
    state: "done",
  },
  {
    tag: "PHASE_01",
    en: "DISCIPLINE",
    th: "20+ ปี · running · gaming · martial arts · travel",
    state: "done",
  },
  {
    tag: "PHASE_02",
    en: "EXPERIMENTS",
    th: "ลอง SaaS, trading เป็น side — ยังไม่ได้เป็นอาชีพหลัก",
    state: "partial",
  },
  {
    tag: "PHASE_03 · NOW",
    en: "SOLO + AI",
    th: "solo เป็นหลัก + tech (AI · automation · IoT) เป็นเครื่องมือ",
    state: "active",
  },
];

// ---------------------------------------------------------------------------
// Dedicated page chrome — utility-density per WEB-ARCHITECTURE v0.3 §1.
// Plain dark + page header + filter/sort controls (no full Hero, no scanlines).
// Each page imports `pageHeaders[name]` and `pageControls[name]`.
// ---------------------------------------------------------------------------

export const pageHeaders = {
  about: {
    label: "ABOUT",
    eyebrow: "Identity · Long-form",
    titleLead: "The Casual ",
    titleAccent: "Ronin",
    intro:
      "Ronin = ลุยเดี่ยว ไร้สังกัด · Casual = ชิลๆ สบายๆ คุยได้กับทุกคน โดยเฉพาะหมาแมว",
    principlesLabel: "// OPERATING_PRINCIPLES",
    experienceLabel: "// EXPERIENCE",
    runtimeLabel: "// RUNTIME_CONFIG",
    timelineLabel: "▸ SOLO_TIMELINE",
    timelineMeta: "solo by nature → solo + tech",
  },
  whatIDo: {
    label: "WHAT I DO",
    eyebrow: "Proof · Archive",
    title: "What I Do",
    intro:
      "หลาย ventures ขนานกัน — digital ล้วน + hybrid (digital × physical). Built solo, automation-first ทุกตัว.",
    filterAllLabel: "All",
    sortLabel: "// SORT",
    countLabel: "// COUNT",
  },
  activity: {
    label: "ACTIVITY",
    eyebrow: "Life · Archive",
    title: "Activity",
    intro:
      "Life feed · ทุก activity ที่บันทึกไว้ — สุขภาพ · ความคิด · อาหาร · ท่องเที่ยว · events.",
    filterAllLabel: "All",
    countLabel: "// ITEMS",
    emptyTitle: "ยังไม่มี item ในหมวดนี้",
    emptyBody: "เลือก category อื่น หรือดู All",
    loadMoreLabel: "LOAD MORE →",
  },
  notes: {
    label: "NOTES",
    eyebrow: "Notes · Archive",
    title: "Notes",
    intro:
      "บันทึกความคิด — การออกแบบ, การตัดสินใจ, ชีวิตนอกจอ. ไม่เน้นวิชาการ",
    filterAllLabel: "All",
    emptyTitle: "ยังไม่มีอะไรให้อ่าน — ช่วงนี้โฟกัส ship ก่อน",
    emptyBody:
      "เขียนเมื่อมีอะไรจะพูดจริงๆ ไม่ใช่เพื่อ update feed",
  },
  contact: {
    label: "CONTACT",
    eyebrow: "Reach · Direct",
    title: "Contact",
    intro:
      "เปิดประตูสำหรับ ventures · collaborations · YEC · งาน community. ไม่มี newsletter, ไม่มี form — ส่งตรงครับ.",
    channels: [
      {
        key: "email",
        label: "EMAIL",
        handle: "urk@theurknotes.com",
        href: "mailto:urk@theurknotes.com",
        note: "Reply ภายใน 1-3 วัน · Thai-first",
      },
      {
        key: "x",
        label: "X",
        handle: "@theeark",
        href: "https://x.com/theeark",
        note: "DM open · email = primary channel",
      },
      // TODO: confirm Threads handle (Threads handle = IG handle on Meta).
      // If different from @theeark, update handle + href below.
      {
        key: "threads",
        label: "THREADS",
        handle: "@theeark",
        href: "https://www.threads.net/@theeark",
        note: "Long-form thoughts · DM open",
      },
      // TODO: replace with real Facebook URL (Page or personal profile?).
      // Placeholder currently points to facebook.com root — safe but inert.
      {
        key: "facebook",
        label: "FACEBOOK",
        handle: "TODO",
        href: "https://www.facebook.com/",
        note: "Public posts · TH network",
      },
    ],
    meta: [
      { label: "BASED IN",     value: "ตราด, Thailand · UTC+7" },
      { label: "AVAILABILITY", value: "Selective · ventures + collab" },
      { label: "BEST FOR",     value: "ventures · collab · YEC · community" },
      { label: "NOT FOR",      value: "spam · cold sales · job offers" },
    ],
  },
};

// What I Do — kind filter + sort options.
export type WhatIDoKindFilter = "all" | "business" | "tool" | "creation";

export const WHAT_I_DO_FILTERS: Array<{ id: WhatIDoKindFilter; label: string }> = [
  { id: "all",      label: "All" },
  { id: "business", label: "Businesses" },
  { id: "tool",     label: "Tools" },
  { id: "creation", label: "Creations" },
];

export type WhatIDoSort = "status" | "name" | "kind";

export const WHAT_I_DO_SORTS: Array<{ id: WhatIDoSort; label: string }> = [
  { id: "status", label: "Status" },
  { id: "kind",   label: "Kind"   },
  { id: "name",   label: "Name"   },
];

// Status sort priority — drives "sort by status" on /what-i-do.
// FLAGSHIP first, then live/near-launch, then internal/wip.
export const STATUS_PRIORITY: Record<string, number> = {
  FLAGSHIP: 0,
  "NEAR LAUNCH": 1,
  BUILDING: 2,
  LIVE: 3,
  RELEASED: 4,
  PERSONAL: 5,
  WIP: 6,
};
