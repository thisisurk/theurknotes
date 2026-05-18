import { chromium } from "playwright";

const URL = "http://localhost:3000/";
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768",  width: 768,  height: 1024 },
  { name: "375",  width: 375,  height: 812 },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const pick = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        position: cs.position,
        paddingTop: cs.paddingTop,
        paddingLeft: cs.paddingLeft,
        minHeight: cs.minHeight,
      };
    };
    return {
      nav: pick(".nav-cockpit"),
      hero: pick("section.hero-section"),
      cockpit: pick(".cockpit-bar"),
      h1: pick("#hero-name"),
    };
  });
  console.log(`\n=== ${vp.name} ===`);
  for (const [k, v] of Object.entries(data)) {
    console.log(`${k}:`, v);
  }
  await ctx.close();
}
await browser.close();
