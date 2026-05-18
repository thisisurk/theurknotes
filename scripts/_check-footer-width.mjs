import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
await p.waitForSelector("footer.footer-cockpit", { timeout: 15000 });
const info = await p.evaluate(() => {
  const f = document.querySelector("footer.footer-cockpit");
  const r = f.getBoundingClientRect();
  const cs = getComputedStyle(f);
  const parent = f.parentElement;
  const pr = parent.getBoundingClientRect();
  const pcs = getComputedStyle(parent);
  return {
    footerRect: { x: r.x, y: r.y, w: r.width, h: r.height },
    footerCss: { maxWidth: cs.maxWidth, margin: cs.margin, padding: cs.padding, display: cs.display },
    parentTag: parent.tagName,
    parentClass: parent.className,
    parentRect: { x: pr.x, w: pr.width },
    parentCss: { maxWidth: pcs.maxWidth, display: pcs.display, width: pcs.width },
  };
});
console.log(JSON.stringify(info, null, 2));
await b.close();
