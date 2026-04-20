// Each venture is one card on the homepage.
// To add a new venture: append an object to the array.
// To change a status: edit the `status` field.

export type VentureStatus = "live" | "near-ship" | "wip" | "coming";

export type Venture = {
  id: string;
  title: string;
  status: VentureStatus;
  subtitle: string;
  body: string;
  link: {
    label: string;
    url: string | null; // null = muted, no hyperlink
  };
};

export const ventures: Venture[] = [
  {
    id: "goldlog",
    title: "GoldLog",
    status: "live",
    subtitle: "XAUUSD trading journal",
    body: "ผมเทรดทอง แล้วไม่มี tool ไหน cover workflow ที่ต้องการ เลยออกแบบของตัวเองขึ้นมา ใครที่เทรดแบบเดียวกันก็ใช้ได้",
    link: {
      label: "goldlog.app",
      url: "https://goldlog.app",
    },
  },
  {
    id: "vendo",
    title: "Vendo",
    status: "near-ship",
    subtitle: "LINE Mini App SaaS สำหรับร้าน F&B",
    body: "เริ่มจากร้านน้ำเต้าหู้ของแฟน ที่ใช้ LINE คุยลูกค้าอยู่แล้ว ไม่ต้องให้ลูกค้าโหลดแอปใหม่ — ออกออเดอร์ผ่าน LINE เลย",
    link: {
      label: "Coming soon",
      url: null,
    },
  },
  {
    id: "trading",
    title: "Trading System",
    status: "wip",
    subtitle: "ออกแบบระบบเทรดอัตโนมัติ",
    body: "ยังอยู่ระหว่างสอบ prop firm + ออกแบบระบบใหม่ ของเก่าพังแล้ว (บทเรียน) กำลังคิดจากศูนย์",
    link: {
      label: "ยังไม่มีอะไรให้ดู",
      url: null,
    },
  },
  {
    id: "next",
    title: "—",
    status: "coming",
    subtitle: "Venture ถัดไป",
    body: "ยังอยู่ในหัว ยังไม่บอก",
    link: {
      label: "",
      url: null,
    },
  },
];

// Badge styling per status. Components read from here.
export const statusBadge: Record<
  VentureStatus,
  { label: string; bg: string; text: string }
> = {
  live: {
    label: "Live",
    bg: "rgb(74 222 128 / 0.15)", // --success at 15%
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
