// screenshot.mjs — Puppeteer screenshot helper.
// Usage:
//   node screenshot.mjs <url> [label] [width] [height]
// Examples:
//   node screenshot.mjs http://localhost/Portfolio/
//   node screenshot.mjs http://localhost/Portfolio/ hero 1440 900
//   node screenshot.mjs http://localhost/Portfolio/ mobile 390 844
//
// Saves to ./temporary screenshots/screenshot-{N}[-label].png (full page).

import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const url = process.argv[2];
if (!url) {
  console.error("usage: node screenshot.mjs <url> [label] [width] [height]");
  process.exit(1);
}
const label = process.argv[3] || "";
const width = parseInt(process.argv[4] || "1440", 10);
const height = parseInt(process.argv[5] || "900", 10);

// Reuse the system Chrome instead of letting puppeteer download its own.
// Override with PUPPETEER_EXECUTABLE_PATH if your Chrome lives elsewhere.
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

const outDir = path.join(process.cwd(), "temporary screenshots");
fs.mkdirSync(outDir, { recursive: true });

// Increment a per-run counter
const existing = fs
  .readdirSync(outDir)
  .map((f) => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map((m) => parseInt(m[1], 10));
const n = (existing.length ? Math.max(...existing) : 0) + 1;

const fileName = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;
const outPath = path.join(outDir, fileName);

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  defaultViewport: { width, height, deviceScaleFactor: 1 },
});
try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.error("pageerror:", e.message));
  page.on("requestfailed", (r) =>
    console.error("requestfailed:", r.url(), r.failure()?.errorText)
  );

  // Cache-bust: append a query param so puppeteer doesn't reuse stale CSS.
  const bust = (url.includes("?") ? "&" : "?") + "t=" + Date.now();
  await page.setCacheEnabled(false);
  await page.goto(url + bust, { waitUntil: "networkidle2", timeout: 45000 });
  // Let fonts settle
  await new Promise((r) => setTimeout(r, 600));

  // Force-reveal any scroll-reveal elements + dismiss the skeleton. Headless
  // screenshots can't reliably trip IntersectionObserver, and we want a clean
  // static capture anyway — animations are not what we're reviewing.
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal], [data-aos]").forEach((el) => {
      el.classList.add("is-revealed", "aos-animate");
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    // Counters: animations.js sets textContent to "0..." until the IO fires.
    // Restore the final value from the data attribute it stashes for us.
    document.querySelectorAll("[data-counter-target]").forEach((el) => {
      el.textContent = el.getAttribute("data-counter-target");
    });
    const sk = document.querySelector(".skeleton-root");
    if (sk && sk.parentNode) sk.parentNode.removeChild(sk);
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 300));

  await page.screenshot({ path: outPath, fullPage: true });
  console.log("saved:", outPath);
} finally {
  await browser.close();
}
