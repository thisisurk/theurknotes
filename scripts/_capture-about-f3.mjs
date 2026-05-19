import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/about-f3-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
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
  await page.goto("http://localhost:3000/about", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForTimeout(1500);
  // Hide ambient layers for clean comparison
  await page.addStyleTag({
    content: `
      .ck-boot-overlay, .boot-overlay, [data-boot-overlay],
      .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise,
      canvas { display: none !important; }
    `,
  });
  await page.waitForTimeout(300);

  // Full page (top of page may include nav)
  await page.screenshot({ path: `${OUT}/about-${vp.name}-full.png`, fullPage: true });

  // Crop just the about section
  const sec = await page.$("#about");
  if (sec) {
    await sec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await sec.screenshot({ path: `${OUT}/about-${vp.name}-section.png` });
  } else {
    console.log(`! ${vp.name}: #about missing`);
  }

  // Probes — block presence + ordering
  const blocks = await page.$$eval(".ck-about-block, .ck-about-bio", (els) =>
    els.map((e) => {
      const label = e.querySelector(".ck-about-block-label")?.textContent?.trim() ?? null;
      const cls = Array.from(e.classList);
      return { cls: cls.join(" "), label };
    })
  );
  const expRowCount = await page.$$eval(".ck-about-exp-row", (els) => els.length);
  const hasHorizontalScroll = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  console.log(`[${vp.name}] blocks:`, JSON.stringify(blocks));
  console.log(`[${vp.name}] exp rows: ${expRowCount} · horiz scroll: ${hasHorizontalScroll}`);

  await ctx.close();
}
await browser.close();
console.log("done");
