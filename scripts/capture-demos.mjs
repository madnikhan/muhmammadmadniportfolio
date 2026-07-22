#!/usr/bin/env node
/**
 * Capture hero screenshots + short motion demos for live project sites.
 * Usage:
 *   FUMARI_USER=... FUMARI_PASS=... CAPTURE_ONLY=fumari-rms npm run capture:demos
 *   SHOWROOM_EMAIL=... SHOWROOM_PASS=... CAPTURE_ONLY=motor-gurus npm run capture:demos
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "projects");
const BASE_SHOWROOM = "https://showroom-tawny.vercel.app";
const BASE_FUMARI = "https://www.fumarisystem.com";

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
    url: `${BASE_FUMARI}/login`,
    fumari: true,
    sections: [
      { path: "/dashboard/tables-system", file: "hero.png" },
      { path: "/dashboard/tables-system", file: "screen-2.png", scroll: true },
      { path: "/dashboard/orders", file: "orders.png" },
      { path: "/dashboard/kitchen", file: "kitchen.png" },
      { path: "/dashboard/kitchen/cocktail", file: "kitchen-cocktail.png" },
      { path: "/dashboard/kitchen/main", file: "kitchen-main.png" },
      { path: "/dashboard/kitchen/shisha", file: "kitchen-shisha.png" },
      { path: "/dashboard/staff", file: "staff.png" },
      { path: "/dashboard/hr", file: "hr.png" },
      { path: "/dashboard/hr/schedule", file: "hr-schedule.png" },
      { path: "/dashboard/accounting", file: "accounting.png", accounting: true },
      {
        path: "/dashboard/accounting/reports",
        file: "accounting-reports.png",
        accounting: true,
      },
    ],
  },
  {
    slug: "sparex-parts",
    url: "https://spareparts-liart.vercel.app/",
    scroll: true,
  },
  {
    slug: "motor-gurus",
    url: `${BASE_SHOWROOM}/login`,
    showroom: true,
    sections: [
      { path: "/", file: "hero.png" },
      { path: "/", file: "screen-2.png", scroll: true },
      { path: "/orders", file: "orders.png" },
      { path: "/customers", file: "customers.png" },
      { path: "/vehicles", file: "vehicles.png" },
      { path: "/leads", file: "leads.png" },
      { path: "/reports", file: "reports.png" },
      { path: "/settings", file: "settings.png" },
    ],
  },
];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fillLogin(page, user, pass) {
  const userSel = [
    'input[name="email"]',
    'input[type="email"]',
    'input[name="username"]',
    'input[type="text"]',
    "#email",
    "#username",
  ];
  const passSel = ['input[name="password"]', 'input[type="password"]', "#password"];

  let filled = false;
  for (const u of userSel) {
    const el = page.locator(u).first();
    if ((await el.count()) > 0 && (await el.isVisible().catch(() => false))) {
      await el.fill(user);
      filled = true;
      break;
    }
  }
  for (const p of passSel) {
    const el = page.locator(p).first();
    if ((await el.count()) > 0 && (await el.isVisible().catch(() => false))) {
      await el.fill(pass);
      break;
    }
  }

  const submit = page
    .locator(
      'button[type="submit"], input[type="submit"], button:has-text("Sign"), button:has-text("Log"), button:has-text("Login")',
    )
    .first();
  if ((await submit.count()) > 0) {
    await submit.click();
  } else if (filled) {
    await page.keyboard.press("Enter");
  }
}

/** Motor Gurus: email → Continue → password → Sign In */
async function fillShowroomLogin(page, email, pass) {
  const emailInput = page.locator("#email, input[type='email']").first();
  await emailInput.waitFor({ state: "visible", timeout: 15000 });
  await emailInput.fill(email);

  const continueBtn = page
    .locator('button[type="submit"]:has-text("Continue"), button:has-text("Continue")')
    .first();
  await continueBtn.click();

  const passInput = page.locator('input[type="password"]').first();
  await passInput.waitFor({ state: "visible", timeout: 15000 });
  await passInput.fill(pass);

  const signIn = page
    .locator('button[type="submit"]:has-text("Sign In"), button:has-text("Sign In")')
    .first();
  await signIn.click();

  await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 30000 });
  await page.waitForTimeout(2000);
}

/**
 * Session-only DOM blur: brand "Fumari", logos, emails, phones, person-name-ish text.
 */
async function applyPrivacyBlur(page) {
  await page.addStyleTag({
    content: `
      [data-privacy-blur="1"] {
        filter: blur(7px) !important;
        user-select: none !important;
      }
    `,
  });

  await page.evaluate(() => {
    const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
    const PHONE_RE =
      /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{2,5}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}(?:[\s.-]?\d{1,4})?/;
    const FUMARI_RE = /fumari/i;
    // First+Last or Title Case names (conservative; skips short words)
    const NAME_RE = /\b([A-Z][a-z]{1,20})\s+([A-Z][a-z]{1,20})\b/;

    const mark = (el) => {
      if (!el || el.nodeType !== 1) return;
      el.setAttribute("data-privacy-blur", "1");
    };

    // Brand logos / header imagery
    document
      .querySelectorAll(
        'img[alt*="Fumari" i], img[src*="logo" i], img[src*="fumari" i], header img, nav img, aside img, [class*="logo" i] img, [class*="Logo"] img, svg[aria-label*="Fumari" i]',
      )
      .forEach(mark);

    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(mark);

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walk.nextNode()) textNodes.push(walk.currentNode);

    for (const node of textNodes) {
      const text = (node.nodeValue || "").trim();
      if (!text || text.length < 2) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;

      const looksSensitive =
        FUMARI_RE.test(text) ||
        EMAIL_RE.test(text) ||
        (PHONE_RE.test(text) && /\d{5,}/.test(text.replace(/\D/g, ""))) ||
        (NAME_RE.test(text) &&
          text.split(/\s+/).length <= 4 &&
          !/^(Today|Tomorrow|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|Dashboard|Kitchen|Orders|Staff|Schedule|Accounting|Reports|Tables|Mocktail|Main|Shisha|View|Orders|Back|Login|Password|Email|Username)/i.test(
            text,
          ));

      if (looksSensitive) mark(parent);
    }

    // Common staff / profile chrome
    document
      .querySelectorAll(
        '[class*="avatar" i], [class*="profile" i], [data-testid*="user" i], [class*="user-name" i], [class*="staff-name" i]',
      )
      .forEach(mark);
  });

  await page.waitForTimeout(200);
}

async function tryAccountingLogin(page, user, pass) {
  const passVisible = await page
    .locator('input[type="password"]')
    .first()
    .isVisible()
    .catch(() => false);
  if (!passVisible) return;
  await fillLogin(page, user, pass);
  await page.waitForTimeout(2500);
}

async function finishVideo(videoDir, dir, slug) {
  try {
    const files = await fs.readdir(videoDir);
    const webm = files.find((f) => f.endsWith(".webm"));
    if (webm) {
      await fs.rename(path.join(videoDir, webm), path.join(dir, "demo.webm"));
    }
    await fs.rm(videoDir, { recursive: true, force: true });
  } catch (err) {
    console.warn(`  ! video move ${slug}:`, err.message);
  }
}

async function captureSectionTour(page, dir, sections, baseUrl, options = {}) {
  const { user, pass } = options;
  for (const section of sections) {
    const url = `${baseUrl}${section.path}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2500);

    if (section.accounting && user && pass) {
      await tryAccountingLogin(page, user, pass);
    }

    await applyPrivacyBlur(page);

    if (section.scroll) {
      await page.evaluate(() =>
        window.scrollBy(0, Math.min(500, document.body.scrollHeight * 0.25)),
      );
      await page.waitForTimeout(800);
      await applyPrivacyBlur(page);
    }

    await page.screenshot({ path: path.join(dir, section.file), type: "png" });
    console.log(`    · ${section.file}`);

    await page.evaluate(() => window.scrollBy(0, 160));
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await page.waitForTimeout(500);
  }
}

async function captureShowroom(browser, site) {
  const email = process.env.SHOWROOM_EMAIL;
  const pass = process.env.SHOWROOM_PASS;
  if (!email || !pass) {
    console.warn(`  ⚠ skip ${site.slug}: set SHOWROOM_EMAIL and SHOWROOM_PASS (see .env.example)`);
    return;
  }

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
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2000);
    await fillShowroomLogin(page, email, pass);
    await captureSectionTour(page, dir, site.sections, BASE_SHOWROOM);
  } catch (err) {
    console.error(`  ! failed ${site.slug}:`, err.message);
    try {
      await page.screenshot({ path: path.join(dir, "hero.png"), type: "png" });
    } catch {
      /* ignore */
    }
  }

  await context.close();
  await finishVideo(videoDir, dir, site.slug);
  console.log(`  ✓ ${site.slug}`);
}

async function captureFumari(browser, site) {
  const user = process.env.FUMARI_USER;
  const pass = process.env.FUMARI_PASS;
  if (!user || !pass) {
    console.warn(`  ⚠ skip ${site.slug}: set FUMARI_USER and FUMARI_PASS (see .env.example)`);
    return;
  }

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
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2000);
    await fillLogin(page, user, pass);
    await page.waitForTimeout(3500);
    // Prefer leaving /login; continue anyway if already on dashboard
    try {
      await page.waitForURL((url) => !url.pathname.includes("/login"), { timeout: 20000 });
    } catch {
      /* may already be authenticated or redirect differs */
    }
    await page.waitForTimeout(1500);
    await captureSectionTour(page, dir, site.sections, BASE_FUMARI, { user, pass });
  } catch (err) {
    console.error(`  ! failed ${site.slug}:`, err.message);
    try {
      await applyPrivacyBlur(page);
      await page.screenshot({ path: path.join(dir, "hero.png"), type: "png" });
    } catch {
      /* ignore */
    }
  }

  await context.close();
  await finishVideo(videoDir, dir, site.slug);
  console.log(`  ✓ ${site.slug}`);
}

async function captureSite(browser, site) {
  if (site.showroom) {
    await captureShowroom(browser, site);
    return;
  }
  if (site.fumari) {
    await captureFumari(browser, site);
    return;
  }

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
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(2500);

    await page.screenshot({ path: path.join(dir, "hero.png"), type: "png" });

    if (site.scroll) {
      await page.evaluate(() =>
        window.scrollBy(0, Math.min(900, document.body.scrollHeight * 0.35)),
      );
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(dir, "screen-2.png"), type: "png" });
    } else {
      await page.screenshot({ path: path.join(dir, "screen-2.png"), type: "png" });
    }

    for (let i = 0; i < 6; i++) {
      await page.evaluate((n) => {
        window.scrollBy(0, 180 + (n % 3) * 40);
      }, i);
      await page.waitForTimeout(700);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await page.waitForTimeout(1200);
  } catch (err) {
    console.error(`  ! failed ${site.slug}:`, err.message);
    try {
      await page.screenshot({ path: path.join(dir, "hero.png"), type: "png" });
      await page.screenshot({ path: path.join(dir, "screen-2.png"), type: "png" });
    } catch {
      /* ignore */
    }
  }

  await context.close();
  await finishVideo(videoDir, dir, site.slug);
  console.log(`  ✓ ${site.slug}`);
}

async function main() {
  await ensureDir(OUT);
  const only = process.env.CAPTURE_ONLY
    ? process.env.CAPTURE_ONLY.split(",").map((s) => s.trim()).filter(Boolean)
    : null;
  const sites = only ? SITES.filter((s) => only.includes(s.slug)) : SITES;
  if (sites.length === 0) {
    console.error("No sites matched CAPTURE_ONLY");
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  for (const site of sites) {
    await captureSite(browser, site);
  }
  await browser.close();
  console.log("Done. Assets in public/projects/<slug>/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
