import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/socials-g1-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375",  width: 375,  height: 812 },
];

const browser = await chromium.launch();

// /contact page
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/contact", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1300);
  await page.addStyleTag({
    content:
      ".ck-boot-overlay, .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise, canvas { display: none !important; }",
  });
  await page.waitForTimeout(200);
  const sec = await page.$("#contact");
  if (sec) await sec.screenshot({ path: `${OUT}/contact-${vp.name}-section.png` });

  const channels = await page.$$eval(".ck-contact-card-label", (els) => els.map((e) => e.textContent?.trim()));
  const cardCount = (await page.$$(".ck-contact-card")).length;
  const horiz = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[contact/${vp.name}] cards: ${cardCount} · labels: ${JSON.stringify(channels)} · horiz: ${horiz}`);

  await ctx.close();
}

// Home — capture footer socials section
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await page.addStyleTag({
    content:
      ".ck-boot-overlay, .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise, canvas { display: none !important; }",
  });
  await page.waitForTimeout(200);
  const footer = await page.$(".footer-cockpit");
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await footer.screenshot({ path: `${OUT}/footer-${vp.name}.png` });
  }
  const socials = await page.$$eval(".footer-social-btn", (els) => els.map((e) => e.getAttribute("aria-label")));
  const horiz = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`[home-footer/${vp.name}] socials: ${socials.length} · labels: ${JSON.stringify(socials)} · horiz: ${horiz}`);
  await ctx.close();
}

await browser.close();
console.log("done");
