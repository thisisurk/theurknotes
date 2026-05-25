# EDIT-GUIDE.md — แก้เว็บเองโดยไม่ต้องถาม AI ทุกครั้ง

> สำหรับเอิ๊ก (architect, not builder) เวลาอยากเปลี่ยน content บนเว็บ.
> อ่านครั้งเดียว — กลับมาดูเฉพาะตอนต้องการ recipe ที่ลืม.

---

## 1. Mental model — แก้ที่ไหนจะกระทบที่ไหน

เว็บมี **3 ที่หลัก** ที่เก็บ content. ถ้ารู้ว่าอยู่ที่ไหน ก็แก้ได้:

| ที่ | เก็บอะไร | format |
|---|---|---|
| `lib/content.ts` | ทุก copy ที่โชว์บนหน้าเว็บ — hero, nav, sections, footer, activity items, social links | TypeScript object |
| `content/notes/` | ทุก note (1 ไฟล์ = 1 note) | MDX (Markdown + frontmatter) |
| `lib/portfolio.ts` | ทุก venture/tool/creation บน /what-i-do + home | TypeScript object |

**กฎเหล็ก:** components (`components/*.tsx`) **ห้ามแตะ**. ถ้าอยากแก้ข้อความที่ขึ้นบนเว็บ → ไปแก้ที่ 3 ที่ด้านบนเท่านั้น.

---

## 2. Quick Recipes — งานที่ทำบ่อย

### Recipe A · เขียน note ใหม่

1. สร้างไฟล์ใหม่ที่ `content/notes/YYYY-MM-DD-slug.mdx`
   - `YYYY-MM-DD` = วันที่จะ publish (ใช้สำหรับเรียงลำดับใน /notes)
   - `slug` = url สั้นๆ คั่นด้วย `-` (ห้ามมีช่องว่าง/ตัวพิเศษ)
   - ตัวอย่าง: `2026-06-01-why-i-moved-to-trat.mdx`

2. ใส่ frontmatter (ส่วนระหว่าง `---`) ตามนี้:

   ```mdx
   ---
   title: "ชื่อ note ที่โชว์บนเว็บ"
   slug: "url-slug-ตรงกับชื่อไฟล์"
   date: "2026-06-01"
   tag: "thoughts"
   summary: "สรุป 1-2 ประโยคที่โชว์บน card + meta description"
   draft: false
   ---

   เริ่มเขียนต่อด้านล่างนี้ ใช้ markdown ปกติ.
   ```

3. `tag` ใช้ได้แค่ 4 ค่า:
   - `building` — process · features · what I shipped
   - `trat` — เรื่องตราด · local · place
   - `thoughts` — philosophy · positioning · strategy
   - `life` — non-screen life · martial arts · family

4. ใน body **ห้ามใช้** `# Heading` ที่ระดับ h1 (เพราะ title โผล่เป็น h1 อยู่แล้ว). เริ่มที่ `## Heading` ถ้าอยากใส่หัวข้อย่อย.

### Recipe B · ทำ draft (เขียนค้างไว้ก่อน)

ใน frontmatter เปลี่ยน `draft: false` → `draft: true`:
- บน dev (`npm run dev`) → ยังเห็น (debug ได้)
- บน production → ถูกซ่อน ไม่โชว์ /notes ไม่นับใน sitemap

พร้อม publish เมื่อไหร่ → กลับมาเปลี่ยน `true` → `false`.

### Recipe C · แก้ note ที่มีอยู่

เปิด `content/notes/<ชื่อไฟล์>.mdx` แล้วแก้ body หรือ frontmatter ตรงๆ.
- เปลี่ยน title → แก้ใน frontmatter
- ห้ามเปลี่ยน slug (จะทำ URL เก่าพัง · ถ้าจำเป็นจริงๆ บอก AI ให้ตั้ง redirect)

### Recipe D · เพิ่ม activity item ใหม่

เปิด `lib/content.ts` หา `ACTIVITY_ITEMS`. เพิ่ม object ใหม่:

```ts
{
  id: 10,                            // ตัวเลขถัดไป (ไม่ซ้ำกับที่มี)
  category: "longevity",             // longevity | mind | food | travel | events
  label: "วิ่ง 10K ครั้งแรก",
  when: "1d ago",                    // free-form text — "2d ago", "1w ago", "ก่อนหน้านี้"
  image: null,                       // null = fallback gradient, หรือ "/images/activity/10-run-10k/cover.webp" (ดู Recipe I)
  size: "normal",                    // "tall" | "wide" | "normal"
  snippet: "10K ที่เนินสนามจันท์ — เข่าซ้ายยังไม่เสีย",
  recent: false,                     // true = ใส่ dot ถัดจาก category badge (มี item นึงต่อ home preview)
},
```

**Tip:** ใส่ item ใหม่ **ไว้บน** array (index 0) เพื่อให้โชว์เป็นอันแรก. Home preview = 5 ตัวบนสุด · /activity = ทั้งหมด.

### Recipe E · แก้ hero ticker (ข้อความวิ่งบน home)

เปิด `lib/content.ts` หา `hero.ticker`. เป็น array ของ string — แก้ / เพิ่ม / ลบ ได้ตรงๆ:

```ts
ticker: [
  "2026-05-22 · Vendo first ship",
  "Note · Quiet Architect published",
  ...
],
```

### Recipe F · แก้ section intro (เช่น About blurb บน home)

ทุก section บน home/page เก็บ copy ที่ `lib/content.ts`:

| Section | path ใน content.ts |
|---|---|
| Hero (eyebrow, headline, punch, focus) | `hero.*` |
| What I Do section intro | `sections.whatido.intro` |
| Notes section intro | `sections.notes.intro` |
| Activity section intro | `sections.activity.intro` |
| About section intro | `sections.about.intro` |
| About page full bio | `about[]` (array · 1 ประโยค = 1 paragraph) |
| /about preview บน home | `aboutPreview.*` |

แก้ string ตรงๆ — ห้ามลบ key, ห้ามเปลี่ยน type.

### Recipe G · เพิ่ม / แก้ venture (What I Do)

เปิด `lib/portfolio.ts`. มี 3 array หลัก:
- `businesses` — ธุรกิจจริง (พระมองตาม · Vendo · AYU · …)
- `tools` — เครื่องมือที่ใช้เอง
- `creations` — งาน creative

เพิ่ม object ใหม่ตาม template ของตัวอื่นใน array เดียวกัน. ฟิลด์สำคัญ:
- `id` — slug-style ห้ามซ้ำ
- `status` + `statusKind` — `LIVE` (green) · `BUILDING` (blue) · `CONCEPT` (amber)
- `accent` — hex color ที่ขับ gradient/glow
- `desc` — ใช้ `—` (em dash) คั่น subtitle กับ body
- `meta` — 3 rows · convention: Business=SCOPE/TRACTION/STACK · Tool=PURPOSE/USE/STACK · Creation=MEDIUM/YEAR/MADE WITH
- `featured: true` → โชว์บน home preview ด้วย
- `image: "/portfolio/<id>/cover.webp"` → ถ้ามีรูป

### Recipe H · แก้ social links

เปิด `lib/content.ts` หา `socials`. แก้ url ของแต่ละช่องตรงๆ. **อย่าลบ entry** — ลบ icon จะหายไปจาก footer + /contact.

### Recipe I · เปลี่ยน / เพิ่มรูป activity card

**Convention:** ทุก activity item มี folder ของตัวเองที่ `public/images/activity/{id}-{slug}/cover.webp`:

```
public/images/activity/
├── 1-yec-opening/cover.webp
├── 2-muay-thai/cover.webp
├── 3-cafe-chan/cover.webp
└── ...
```

**เปลี่ยนรูปที่มีอยู่ (id 1-9):**
1. ลากรูปใหม่ลง folder ที่ตรง · ตั้งชื่อ `cover.jpg` (ทับของเก่าได้)
2. บอก AI: *"optimize activity image folder X"* — AI run sharp resize + convert เป็น `cover.webp` + ลบ `cover.jpg`
3. AI commit + push

**เพิ่ม activity ใหม่ที่มีรูป:**
1. เพิ่ม item ใน `ACTIVITY_ITEMS` ตาม Recipe D · `image: "/images/activity/{id}-{slug}/cover.webp"`
2. สร้าง folder `public/images/activity/{id}-{slug}/`
3. drop `cover.jpg` ลงไป · บอก AI optimize

**กฎ:**
- path ใน `image:` ต้องตรงกับ folder name pixel-by-pixel (typo → fallback gradient โชว์แทน)
- ถ้ารูปยังไม่มี ใส่ `image: null` ไปก่อน — fallback gradient ตามสีของ category
- ขนาดที่แนะนำ: max 1200px ฝั่งกว้าง · WebP q80 · target <300KB ต่อรูป
- ทุก aspect ratio ใช้ได้ — CSS `background-size: cover` จะ crop ตรงกลาง

---

## 3. Deploy flow — แก้แล้วขึ้นเว็บยังไง

หลังแก้ไฟล์เสร็จ ทำ 3 ขั้นใน terminal:

```bash
git add -A                              # stage ทุกไฟล์ที่แก้
git commit -m "edit: <สรุปสั้นๆว่าแก้อะไร>"
git push origin main                    # ส่งไป GitHub → Vercel deploy ให้อัตโนมัติ
```

**เกิดอะไรขึ้นต่อ:**
1. GitHub รับ push → trigger Vercel webhook
2. Vercel build (10-30 วินาที)
3. Production URL update — เห็นบนเว็บใน ~30-60 วินาที

ถ้าอยาก preview ก่อน push → ดู §4

---

## 4. Preview ก่อน push (recommended สำหรับการแก้ใหญ่)

```bash
npm run dev                             # start local server
# เปิด browser: http://localhost:3000
# (ถ้า port 3000 ถูกใช้ จะใช้ 3001, 3002, … แทน — ดู log)
```

- เปิดหน้าที่แก้ → เช็คว่าออกมาตามตั้งใจ
- กด Ctrl+C ใน terminal เพื่อหยุด dev server
- ถ้าโอเค → push (§3). ถ้ายังไม่ดี → แก้ต่อ

**สำคัญ:** dev mode **โชว์ draft notes ด้วย** (เพื่อให้ debug ได้). production จะซ่อน — อย่าตกใจถ้าเห็น draft โผล่ใน /notes ตอน dev.

---

## 5. Safety check — build ผ่านก่อน push (สำหรับการแก้ที่ไม่มั่นใจ)

```bash
npm run build
```

ต้องขึ้น `✓ Compiled successfully` + ไม่มี `error` / `warning`. ถ้ามี error → อ่านดูว่าฟ้องที่ไฟล์/บรรทัดไหน. ถ้าไม่เข้าใจ → §7 (ถาม AI)

**Acceptance bar ของเว็บนี้:**
- Build = zero errors, zero warnings
- Lighthouse Perf ≥95 · A11y = 100 · CLS < 0.05
- ไม่มี horizontal scroll ที่ width 375px

---

## 6. ห้ามแตะ (without AI help)

ไฟล์/โฟลเดอร์เหล่านี้ = system layer · แก้ผิดแล้วเว็บพังทั้งเว็บ:

```
app/                          # routes, layout, metadata
components/                   # UI components ทุกตัว
lib/notes.ts                  # MDX parser
lib/utils.ts                  # helpers
app/globals.css               # design tokens + every style rule
package.json                  # dependencies
next.config.* / tsconfig.json # build/type config
```

ถ้าอยากแก้สิ่งที่อยู่ในไฟล์เหล่านี้ — เปิดสนทนากับ AI assistant แทน.

**กรณียกเว้น:** `CLAUDE.md` (instructions ให้ AI) + `*.md` ที่ root + ไฟล์ใน `public/` (assets) แก้เองได้.

---

## 7. Stuck? — escape hatch

| Symptom | ทำยังไง |
|---|---|
| Build error | copy error message ไปถาม AI · บอกว่าแก้อะไรไว้ก่อนหน้า |
| เว็บ deploy แต่ที่หน้าเว็บไม่อัพเดต | รอ 1-2 นาที · CDN propagate · หรือ Vercel dashboard ดู deploy status |
| Push แล้ว Vercel build fail | เปิด vercel.com → project → deployments → คลิก deploy ล่าสุด → ดู log |
| Email พัง หลังแก้ DNS | rollback DNS ทันที · email หาย = critical · บอก AI |
| ไม่แน่ใจ "อันนี้แก้ตรงไหน" | ถาม AI ก่อนแก้ ดีกว่าแก้ผิด |

---

## 8. Tag conventions (สำหรับ memory ของตัวเอง)

ในเซสชั่นกับ AI · ถ้าจะให้ AI ทำ content edit ให้พี่ — บอกแบบนี้:

- "เพิ่ม note ใหม่ — title X · tag thoughts · summary Y"
- "แก้ ACTIVITY_ITEMS เพิ่ม item วิ่ง 10K"
- "เปลี่ยน hero ticker · เอาบรรทัด stripe ออก เพิ่ม Vendo customer 2"
- "อัพเดต status ของ Vendo ใน portfolio.ts จาก BUILDING → LIVE"

specific = AI ทำได้เร็ว · vague = ใช้เวลา clarify นาน.

---

*Last updated: 2026-05-23 · Phase L (added Recipe I · activity cover image workflow). ถ้าโครงสร้างเปลี่ยน (เพิ่ม section ใหม่, เปลี่ยน SSoT) — กลับมาอัพเดตไฟล์นี้ด้วย.*
