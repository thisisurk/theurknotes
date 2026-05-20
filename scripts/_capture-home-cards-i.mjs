import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/i-shots";
const PORT = process.env.PORT || "3000";
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
  await page.goto(`http://localhost:${PORT}/`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await page.waitForSelector("#what-i-do", { timeout: 30000 });
  await page.waitForTimeout(2000);

  const fullPath = `${OUT}/i-${vp.name}-full.png`;
  await page.screenshot({ path: fullPath, fullPage: true });
  console.log(`✓ ${fullPath}`);

  const sections = [
    { name: "hero", selector: "section.hero-section" },
    { name: "about", selector: "#about" },
    { name: "whatido", selector: "#what-i-do" },
    { name: "notes", selector: "#notes" },
    { name: "activity", selector: "#activity" },
  ];
  for (const s of sections) {
    const el = await page.$(s.selector);
    if (!el) {
      console.log(`! ${vp.name} ${s.name}: selector not found`);
      continue;
    }
    const cropPath = `${OUT}/i-${vp.name}-${s.name}.png`;
    await el.screenshot({ path: cropPath });
    console.log(`✓ ${cropPath}`);
  }

  // Sanity: count What I Do home cards (expect 8) + Activity cards (expect 5)
  const homeCards = await page.$$eval(".ck-card-home", (els) => els.length);
  const actCards = await page.$$eval(".ck-activity-card", (els) => els.length);
  console.log(`  ${vp.name} home cards: ${homeCards} (expect 8)`);
  console.log(`  ${vp.name} activity cards: ${actCards} (expect 5)`);

  await ctx.close();
}

await browser.close();
console.log("DONE");
