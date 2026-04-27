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

// Reuse the system Chrome (avoids puppeteer's bundled-Chrome download).
const SYSTEM_CHROME_CANDIDATES = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);
const executablePath = SYSTEM_CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error(
    "Could not find a system Chrome/Edge install. Set PUPPETEER_EXECUTABLE_PATH to your browser .exe."
  );
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
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
