import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/whatido-f4-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375",  width: 375,  height: 812 },
];

const TARGETS = [
  { name: "whatido", url: "http://localhost:3000/what-i-do", section: "#what-i-do" },
  { name: "home",    url: "http://localhost:3000/",          section: "#what-i-do" },
];

const browser = await chromium.launch();
for (const t of TARGETS) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await ctx.newPage();
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1800);
    await page.addStyleTag({
      content: `
        .ck-boot-overlay, .boot-overlay, [data-boot-overlay],
        .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise,
        canvas { display: none !important; }
      `,
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${t.name}-${vp.name}-full.png`, fullPage: true });
    const sec = await page.$(t.section);
    if (sec) {
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await sec.screenshot({ path: `${OUT}/${t.name}-${vp.name}-section.png` });
    }

    const lessonCount = await page.$$eval(".ck-pf-lesson", (els) => els.length);
    const introText = await page
      .$eval(".ck-page-intro", (e) => e.textContent?.trim() ?? "")
      .catch(() => null);
    const horiz = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    console.log(`[${t.name}/${vp.name}] lesson rows: ${lessonCount} · horiz: ${horiz}${introText ? ` · intro: "${introText.slice(0, 80)}..."` : ""}`);

    await ctx.close();
  }
}
await browser.close();
console.log("done");
