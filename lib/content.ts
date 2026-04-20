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
  brand: "TheUrk",
  links: {
    ventures: "Ventures",
    notes: "Notes",
    about: "About",
  },
};

export const hero = {
  wordmark: "TheUrk",
  name: "Urk",
  identity: "Solo Founder จากตราด — ออกแบบระบบให้ AI ทำงานแทน",
  tagline: "THINK · DESIGN · SHIP",
  microLine: "Architect ไม่ใช่ Builder",
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

export const footer = {
  copyright: "© 2026 TheUrk",
  easterEgg: "Think. Design. Ship. — ที่เหลือ AI จัดการ",
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
    url: "mailto:urk@theurknotes.com",
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
