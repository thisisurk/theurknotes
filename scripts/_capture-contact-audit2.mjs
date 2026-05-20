import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const OUT = "/tmp/contact-audit2-shots";
mkdirSync(OUT, { recursive: true });
const VPS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375", width: 375, height: 812 },
];
const browser = await chromium.launch();
for (const vp of VPS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/contact", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1200);
  await page.addStyleTag({
    content:
      ".ck-boot-overlay, .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise, canvas { display: none !important; }",
  });
  await page.waitForTimeout(200);
  const sec = await page.$("#contact");
  if (sec) await sec.screenshot({ path: `${OUT}/contact-${vp.name}-section.png` });
  const labels = await page.$$eval(".ck-contact-card-label", (els) => els.map((e) => e.textContent?.trim()));
  const notes = await page.$$eval(".ck-contact-card-note", (els) => els.map((e) => e.textContent?.trim()));
  const meta = await page.$$eval(".ck-contact-meta-row", (els) =>
    els.map((e) => ({
      label: e.querySelector(".ck-contact-meta-label")?.textContent?.trim(),
      value: e.querySelector(".ck-contact-meta-value")?.textContent?.trim(),
    })),
  );
  const horiz = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[${vp.name}] labels: ${JSON.stringify(labels)} · notes: ${JSON.stringify(notes)} · horiz: ${horiz}`);
  console.log(`[${vp.name}] meta:`, JSON.stringify(meta));
  await ctx.close();
}
await browser.close();
console.log("done");
