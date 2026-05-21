import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/h-shots";
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375", width: 375, height: 812 },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);

  const fullPath = `${OUT}/home-${vp.name}-full.png`;
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`✓ ${fullPath}`);

  // Per-section crops
  const sections = [
    { name: "hero", selector: "section.hero-section" },
    { name: "about", selector: "#about" },
    { name: "whatido", selector: "#what-i-do" },
    { name: "notes", selector: "#notes" },
    { name: "activity", selector: "#activity" },
  ];
  for (const s of sections) {
    try {
      const el = await page.$(s.selector);
      if (!el) {
        console.log(`! ${vp.name} ${s.name}: selector not found`);
        continue;
      }
      const cropPath = `${OUT}/home-${vp.name}-${s.name}.png`;
      await el.screenshot({ path: cropPath });
      console.log(`✓ ${cropPath}`);
    } catch (e) {
      console.log(`! ${vp.name} ${s.name}: ${e.message}`);
    }
  }

  // Verify LiveLog DOM is absent (H/4 success check)
  const hasLog = await page.$("#log");
  console.log(`  ${vp.name} #log present: ${!!hasLog} (expect false)`);

  await ctx.close();
}

await browser.close();
console.log("DONE");
