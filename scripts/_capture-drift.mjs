import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/drift-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "375", width: 375, height: 812 },
];

const TARGETS = [
  { name: "impl",   url: "http://localhost:3000/" },
  { name: "mockup", url: "file:///Users/theurk/Workspace/Personal/theurknotes/index-gemini-v6.html" },
];

const CROPS = [
  { name: "about",  selector: "#about" },
  { name: "footer", selector: "footer.footer-cockpit" },
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
    try {
      await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    } catch (e) {
      console.log(`! goto ${t.name} ${vp.name}: ${e.message}`);
    }

    // Wait for boot overlay (mockup) — 6 lines × 140ms + 450ms = ~1.3s + babel parse
    await page.waitForTimeout(4500);

    // Wait until #about exists (mockup React mount can take longer the first time)
    try {
      await page.waitForSelector("#about", { timeout: 20000, state: "attached" });
    } catch {
      console.log(`! ${t.name} ${vp.name}: #about did not appear`);
    }

    // Hide overlays via CSS injection (don't remove nodes — React may try to reconcile)
    await page.addStyleTag({
      content: `
        .ck-boot-overlay, .boot-overlay, [data-boot-overlay],
        .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise,
        .ck-starfield, canvas.starfield { display: none !important; }
      `,
    });
    await page.waitForTimeout(400);

    await page.screenshot({ path: `${OUT}/${t.name}-${vp.name}-full.png`, fullPage: true });

    for (const c of CROPS) {
      const el = await page.$(c.selector);
      if (!el) { console.log(`! ${t.name} ${vp.name}: missing ${c.selector}`); continue; }
      try {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await el.screenshot({ path: `${OUT}/${t.name}-${vp.name}-${c.name}.png` });
      } catch (e) { console.log(`! crop ${t.name} ${vp.name} ${c.name}: ${e.message}`); }
    }
    await ctx.close();
    console.log(`✓ ${t.name} ${vp.name}`);
  }
}
await browser.close();
console.log("DONE");
