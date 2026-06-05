#!/usr/bin/env node
/**
 * Convert public/images PNG files to WebP (keeps PNG as fallback).
 * Run: npm run images:optimize
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public/images");

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.name.endsWith(".png")) files.push(full);
  }
  return files;
}

const files = (await walk(ROOT)).filter(Boolean);
let saved = 0;

for (const file of files) {
  const out = file.replace(/\.png$/, ".webp");
  const before = (await fs.promises.stat(file)).size;
  await sharp(file).webp({ quality: 82 }).toFile(out);
  const after = (await fs.promises.stat(out)).size;
  saved += before - after;
  console.log(
    `${path.relative(ROOT, out)}  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`,
  );
}

console.log(`Done. ${files.length} files. ~${Math.round(saved / 1024)}KB saved.`);
