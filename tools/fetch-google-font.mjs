#!/usr/bin/env node
// Self-host Google Fonts (latin subset, covers German umlauts) without any
// API key or build tool. Fetches ONE weight/style at a time on purpose —
// a combined multi-weight request can silently return the identical file
// for every weight (a Google Fonts API quirk, not a bug here).
//
// Usage:
//   node fetch-google-font.mjs --family "Jost" --weights 400,500,600 --out ./fonts
//   node fetch-google-font.mjs --family "Playfair Display" --weights 400,600,700 --italic 400 --out ./fonts
//
// Appends to <out>/fonts.css so it can be run repeatedly for different
// families into one shared stylesheet. Link that file with a plain
// <link rel="stylesheet" href="fonts.css"> or @import.

import { writeFile, mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

// A modern desktop Safari UA — Google Fonts serves woff2 (or woff for
// legacy formats) as the "latin" block only to browsers it trusts to
// render locally hosted files; some UAs get served .ttf or extra formats.
const SAFARI_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";

function parseArgs(argv) {
  const args = { weights: [], italicWeights: [], out: "./fonts" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--family") args.family = argv[++i];
    else if (a === "--weights") args.weights = argv[++i].split(",").map(Number);
    else if (a === "--italic") args.italicWeights = argv[++i].split(",").map(Number);
    else if (a === "--out") args.out = argv[++i];
  }
  if (!args.family || args.weights.length === 0) {
    console.error(
      'Usage: fetch-google-font.mjs --family "Name" --weights 400,600 [--italic 400] [--out ./fonts]'
    );
    process.exit(1);
  }
  return args;
}

async function fetchWeight(family, weight, italic) {
  const familyParam = encodeURIComponent(family);
  const axis = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:${axis}&display=swap`;
  const res = await fetch(url, { headers: { "User-Agent": SAFARI_UA } });
  if (!res.ok) throw new Error(`${family} ${weight}${italic ? "i" : ""}: HTTP ${res.status}`);
  const css = await res.text();

  // Google's response has one @font-face block per Unicode subset it
  // covers for this family/weight. The LAST "/* latin */" block is the
  // one that actually covers German umlauts (ä/ö/ü/ß) — earlier blocks
  // can be latin-ext, vietnamese, etc., listed before it.
  const blocks = css.split("/* latin");
  if (blocks.length < 2) throw new Error(`${family} ${weight}: no latin subset found in response`);
  const latinBlock = "/* latin" + blocks[blocks.length - 1];
  const match = latinBlock.match(/url\((https:\/\/[^)]+)\)\s*format\('([\w-]+)'\)/);
  if (!match) throw new Error(`${family} ${weight}: could not parse font file URL`);
  const [, fontUrl, format] = match;

  const fontRes = await fetch(fontUrl);
  if (!fontRes.ok) throw new Error(`${family} ${weight}: font file download HTTP ${fontRes.status}`);
  const buffer = Buffer.from(await fontRes.arrayBuffer());
  const ext = format === "woff2" ? "woff2" : "woff";
  return { buffer, ext };
}

function fileSlug(family) {
  return family.toLowerCase().trim().replace(/\s+/g, "-");
}

async function main() {
  const { family, weights, italicWeights, out } = parseArgs(process.argv.slice(2));
  await mkdir(out, { recursive: true });
  const slug = fileSlug(family);

  const jobs = [
    ...weights.map((weight) => ({ weight, italic: false })),
    ...italicWeights.map((weight) => ({ weight, italic: true })),
  ];

  let cssOut = "";
  for (const { weight, italic } of jobs) {
    process.stdout.write(`Fetching ${family} ${weight}${italic ? " italic" : ""}... `);
    const { buffer, ext } = await fetchWeight(family, weight, italic);
    const fileName = `${slug}-${weight}${italic ? "italic" : ""}.${ext}`;
    await writeFile(path.join(out, fileName), buffer);
    console.log(`ok (${fileName})`);
    cssOut += `@font-face {
  font-family: "${family}";
  font-style: ${italic ? "italic" : "normal"};
  font-weight: ${weight};
  font-display: swap;
  src: url("./${fileName}") format("${ext}");
}
`;
  }

  await appendFile(path.join(out, "fonts.css"), cssOut);
  console.log(`Done — appended ${jobs.length} @font-face rule(s) to ${path.join(out, "fonts.css")}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
