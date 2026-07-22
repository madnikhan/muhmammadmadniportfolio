#!/usr/bin/env node
/**
 * Capture hero screenshots + short motion demos for live project sites.
 * Usage: FUMARI_USER=admin FUMARI_PASS=... npm run capture:demos
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "projects");

const SITES = [
  {
    slug: "invoice-manager",
    url: "https://invoicemanager-pi.vercel.app/",
    scroll: true,
  },
  {
    slug: "zarkari-ecommerce",
    url: "https://www.zarkari.co.uk/",
    scroll: true,
  },
  {
    slug: "lstf-education",
    url: "https://www.lstfinance.com/",
    scroll: true,
  },
  {
    slug: "finest-plastering",
    url: "https://finestplastering-flax.vercel.app/",
    scroll: true,
  },
  {
    slug: "fumari-rms",
    url: "https://fumari.vercel.app/login",
    scroll: false,
    fumari: true,
  },
  {
    slug: "sparex-parts",
    url: "https://spareparts-liart.vercel.app/",
    scroll: true,
  },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function captureSite(browser, site) {
  const dir = path.join(OUT, site.slug);
  await ensureDir(dir);
  const videoDir = path.join(dir, "_video-tmp");
  await ensureDir(videoDir);

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } },
  });
  const page = await context.newPage();

  console.log(`→ ${site.slug}: ${site.url}`);

  try {
    if (site.fumari) {
      const user = process.env.FUMARI_USER || "admin";
      const pass = process.env.FUMARI_PASS;
      if (!pass) {
        throw new Error("Set FUMARI_PASS in the environment to capture Fumari (see .env.example)");
      }
      await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90000 });
      await page.waitForTimeout(1500);

      const userSel = [
        'input[name="username"]',
        'input[name="email"]',
        'input[type="email"]',
        'input[type="text"]',
        "#username",
        "#email",
      ];
      const passSel = ['input[name="password"]', 'input[type="password"]', "#password"];

      let filled = false;
      for (const u of userSel) {
        const el = page.locator(u).first();
        if ((await el.count()) > 0) {
          await el.fill(user);
          filled = true;
          break;
        }
      }
      for (const p of passSel) {
        const el = page.locator(p).first();
        if ((await el.count()) > 0) {
          await el.fill(pass);
          break;
        }
      }

      const submit = page
        .locator('button[type="submit"], input[type="submit"], button:has-text("Sign"), button:has-text("Log"), button:has-text("Login")')
        .first();
      if ((await submit.count()) > 0) {
        await submit.click();
      } else if (filled) {
        await page.keyboard.press("Enter");
      }

      await page.waitForTimeout(2500);
      await page.goto("https://fumari.vercel.app/dashboard/tables", {
        waitUntil: "domcontentloaded",
        timeout: 90000,
      });
      await page.waitForTimeout(3000);
    } else {
      await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90000 });
      await page.waitForTimeout(2500);
    }

    // Hero viewport screenshot
    await page.screenshot({
      path: path.join(dir, "hero.png"),
      type: "png",
    });

    // Second screen — scrolled mid-page
    if (site.scroll) {
      await page.evaluate(() => window.scrollBy(0, Math.min(900, document.body.scrollHeight * 0.35)));
      await page.waitForTimeout(800);
      await page.screenshot({
        path: path.join(dir, "screen-2.png"),
        type: "png",
      });
    } else {
      await page.screenshot({
        path: path.join(dir, "screen-2.png"),
        type: "png",
      });
    }

    // Motion: scroll / pan for a few seconds while video records
    const steps = 6;
    for (let i = 0; i < steps; i++) {
      await page.evaluate((n) => {
        window.scrollBy(0, 180 + (n % 3) * 40);
      }, i);
      await page.waitForTimeout(700);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await page.waitForTimeout(1200);
  } catch (err) {
    console.error(`  ! failed ${site.slug}:`, err.message);
    // Still try a blank-safe screenshot if possible
    try {
      await page.screenshot({ path: path.join(dir, "hero.png"), type: "png" });
      await page.screenshot({ path: path.join(dir, "screen-2.png"), type: "png" });
    } catch {
      /* ignore */
    }
  }

  await context.close();

  // Move recorded webm to demo.webm
  try {
    const files = await fs.readdir(videoDir);
    const webm = files.find((f) => f.endsWith(".webm"));
    if (webm) {
      await fs.rename(path.join(videoDir, webm), path.join(dir, "demo.webm"));
    }
    await fs.rm(videoDir, { recursive: true, force: true });
  } catch (err) {
    console.warn(`  ! video move ${site.slug}:`, err.message);
  }

  console.log(`  ✓ ${site.slug}`);
}

async function main() {
  await ensureDir(OUT);
  const browser = await chromium.launch({ headless: true });
  for (const site of SITES) {
    await captureSite(browser, site);
  }
  await browser.close();
  console.log("Done. Assets in public/projects/<slug>/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
