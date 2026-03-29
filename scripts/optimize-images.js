/**
 * Image optimization script
 * Converts JPG/PNG to WebP (quality 80, max 1920px wide)
 * Re-compresses existing WebP files (quality 80)
 * Run: node scripts/optimize-images.js
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const QUALITY = 80;
const MAX_WIDTH = 1920;

// Skip these files
const SKIP = new Set(["logo.png", "vercel.svg", "next.svg", "file.svg", "window.svg", "globe.svg"]);

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  const outputPath = base + ".webp";
  const stat = fs.statSync(filePath);
  const beforeKB = (stat.size / 1024).toFixed(0);

  try {
    const img = sharp(filePath).resize(MAX_WIDTH, null, { withoutEnlargement: true });

    if (ext === ".webp") {
      // Re-compress existing webp via temp file (can't overwrite in-place)
      const tmp = outputPath + ".tmp.webp";
      await img.webp({ quality: QUALITY }).toFile(tmp);
      fs.renameSync(tmp, outputPath);
    } else {
      await img.webp({ quality: QUALITY }).toFile(outputPath);
    }

    const afterKB = (fs.statSync(outputPath).size / 1024).toFixed(0);
    const saved = (((stat.size - fs.statSync(outputPath).size) / stat.size) * 100).toFixed(0);
    const arrow = saved > 0 ? "→" : "~";
    console.log(`  ✓ ${path.basename(filePath).padEnd(28)} ${beforeKB}KB ${arrow} ${afterKB}KB  (${saved}% saved)`);
  } catch (err) {
    console.error(`  ✗ ${path.basename(filePath)}: ${err.message}`);
  }
}

async function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    const name = entry.name;
    if (SKIP.has(name)) {
      console.log(`  — ${name.padEnd(28)} (skipped)`);
      continue;
    }
    const ext = path.extname(name).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) continue;
    await processImage(path.join(dir, name));
  }
}

async function main() {
  console.log("\n━━━ Image Optimizer ━━━\n");

  const dirs = [
    "public",
    "public/images",
    "public/landingvideo",
  ];

  let totalBefore = 0;
  let totalAfter = 0;

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => !e.isDirectory())
      .filter(e => /\.(jpg|jpeg|png|webp)$/i.test(e.name))
      .filter(e => !SKIP.has(e.name));

    if (files.length === 0) continue;
    console.log(`\n📁 ${dir}/`);

    for (const f of files) {
      const fp = path.join(dir, f.name);
      totalBefore += fs.statSync(fp).size;
    }

    await processDir(dir);

    // Re-measure after (now counting the new .webp files)
  }

  // Re-count final sizes
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => !e.isDirectory())
      .filter(e => e.name.endsWith(".webp"))
      .filter(e => !SKIP.has(e.name));
    for (const f of files) {
      totalAfter += fs.statSync(path.join(dir, f.name)).size;
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Total source images:  ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Total WebP output:    ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Estimated reduction:  ~${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%`);
  console.log("\nDone! Update image references in code to use .webp extensions.\n");
}

main().catch(console.error);
