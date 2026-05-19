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

// `selector` may be a string (same for both targets) or a fn(targetName) → string
// because the mockup's hero <section> has no id/className while impl does.
const CROPS = [
  { name: "nav",    selector: (t) => t === "mockup" ? "header" : "header.nav-cockpit" },
  { name: "hero",   selector: (t) => t === "mockup" ? "section" : "section.hero-section" },
  { name: "about",  selector: () => "#about" },
  { name: "footer", selector: () => "footer.footer-cockpit" },
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

    // Hide overlays + ambient canvases via CSS injection (don't remove nodes —
    // React may try to reconcile). `canvas` hides StarField in BOTH impl
    // (.ck-starfield) and mockup (unclassed inline-styled canvas) symmetrically,
    // plus the About Hologram canvas in both — keeps drift diff layout-focused.
    // `nextjs-portal` removes the Next.js dev-mode compile indicator from
    // dev-server captures so impl/mockup screenshots are comparable.
    await page.addStyleTag({
      content: `
        .ck-boot-overlay, .boot-overlay, [data-boot-overlay],
        .scan-overlay, .crt-noise, .ck-scan-overlay, .ck-crt-noise,
        nextjs-portal,
        canvas { display: none !important; }
      `,
    });
    await page.waitForTimeout(400);

    await page.screenshot({ path: `${OUT}/${t.name}-${vp.name}-full.png`, fullPage: true });

    for (const c of CROPS) {
      const sel = typeof c.selector === "function" ? c.selector(t.name) : c.selector;
      const el = await page.$(sel);
      if (!el) { console.log(`! ${t.name} ${vp.name}: missing ${sel}`); continue; }
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
