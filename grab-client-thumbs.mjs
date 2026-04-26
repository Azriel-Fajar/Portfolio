// grab-client-thumbs.mjs
// One-shot helper: screenshots each local client site at viewport size and
// saves them as the project thumbnails the Portfolio uses.
//
// Run once (sites must be reachable on localhost via XAMPP):
//   node grab-client-thumbs.mjs

import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";

const targets = [
  { url: "http://localhost/FIT%20Website/", out: "IMG/projects/fit.png" },
  { url: "http://localhost/Parallaxnet%20CA/", out: "IMG/projects/parallaxnet-ca.png" },
  { url: "http://localhost/SSS/", out: "IMG/projects/sss.png" },
];

const outRoot = process.cwd();
fs.mkdirSync(path.join(outRoot, "IMG", "projects"), { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});
try {
  for (const t of targets) {
    const page = await browser.newPage();
    page.on("pageerror", (e) => console.warn(t.url, "pageerror:", e.message));
    try {
      await page.goto(t.url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1000));
      const outPath = path.join(outRoot, t.out);
      // Viewport-only (1440x900) — gives a clean hero crop ideal for cards.
      await page.screenshot({ path: outPath, fullPage: false });
      console.log("saved:", outPath);
    } catch (e) {
      console.error("failed:", t.url, e.message);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
