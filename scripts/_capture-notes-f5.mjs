import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/notes-f5-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375",  width: 375,  height: 812 },
];

const TARGETS = [
  { name: "notes-root", url: "http://localhost:3000/notes" },
  { name: "notes-tag",  url: "http://localhost:3000/notes/tag/building" },
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
    await page.waitForTimeout(1500);
    await page.addStyleTag({
      content: `
        .ck-boot-overlay, .boot-overlay, [data-boot-overlay],
        .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise,
        canvas { display: none !important; }
      `,
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/${t.name}-${vp.name}-full.png`, fullPage: true });
    const sec = await page.$("#notes");
    if (sec) {
      await sec.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await sec.screenshot({ path: `${OUT}/${t.name}-${vp.name}-section.png` });
    }

    const ckPage = (await page.$$(".ck-page")).length;
    const pageHeader = await page.$(".ck-page-header");
    const filterPills = (await page.$$(".ck-page-filter .ck-act-pill")).length;
    const activePill = await page
      .$eval(".ck-page-filter .ck-act-pill[data-active='true']", (el) => el.textContent?.trim())
      .catch(() => null);
    const emptyVisible = !!(await page.$(".ck-notes-empty"));
    const horiz = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    const intro = await page
      .$eval(".ck-page-intro", (e) => e.textContent?.trim() ?? "")
      .catch(() => null);
    console.log(`[${t.name}/${vp.name}] ck-page: ${ckPage} · header: ${!!pageHeader} · pills: ${filterPills} · active: "${activePill}" · empty: ${emptyVisible} · horiz: ${horiz}`);
    if (intro) console.log(`  intro: "${intro.slice(0, 120)}..."`);

    await ctx.close();
  }
}
await browser.close();
console.log("done");
