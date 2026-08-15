# design-sync notes — kens-design-system

## Setup
- Shape: `package` (no Storybook in this repo).
- Build: `npm run build` (Vite library mode) → `dist/kens-design-system.js` + `dist/style.css` + `dist/index.d.ts`.
- Playwright: the environment's cached chromium is build **1194**. `npm i -D playwright` alone installs latest, which pins a mismatched build (`Executable doesn't exist`). Install `playwright@1.56.1` explicitly (matches the cache) with `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` set, so it doesn't try to fetch its own copy.
- Fonts: the repo doesn't ship font files (Google Fonts loaded via `<link>` in consuming apps). Sourced Jost (400/500/600), IBM Plex Mono (400/500), and Playfair Display (600, 700, 400 italic) from Google Fonts as static `.woff`/`.woff2` + a hand-written `fonts.css`, saved to `.design-sync/fonts/` and wired via `cfg.extraFonts`. If the DS's own font weights change, re-fetch matching weights the same way (per-weight `family=Name:wght@N` requests with a Safari UA — combined multi-weight requests can return the same file for every weight, a Google Fonts API quirk, not a script bug).
- `SectionHeading` needed `cfg.overrides.SectionHeading: {"cardMode": "column"}` — its `LeftAligned` story overflowed the default grid cell width.

## Known render warns
- None outstanding — all 5 components fully authored and graded `good`; render check clean (0 bad, 0 thin, 0 variantsIdentical).

## Re-sync risks
- Font weights are pinned to what was fetched (see Setup) — if a future component adds a new weight/style not listed above, `[FONT_MISSING]` will fire for it; fetch and add to `.design-sync/fonts/fonts.css`.
- `dist/` is gitignored (standard for a built package) — a re-sync must run `npm run build` first; the converter will fail with `[NO_DIST]` otherwise.
- Preview scope was "author everything" (only 5 components total) — any new component added to the library should get an authored preview too, not left on the floor card, to keep the whole set consistent.
