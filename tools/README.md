# Ken's shared dev tools

Reusable pieces for setting up new sites, kept here so they don't get
re-invented (or re-debugged) per repo. Not part of the published package —
these are scripts/templates you copy or run manually.

## `deploy-pages.yml.template`

Canonical GitHub Actions workflow for deploying a static site (or a
Vite build output) to GitHub Pages. Copy it into a new repo as
`.github/workflows/deploy-pages.yml`, then read the comments at the top —
there are two one-time manual steps in the GitHub UI (make the repo public,
set Pages Source to "GitHub Actions") that the Actions bot token cannot do
for itself on a repo's first-ever Pages deploy.

**Push it to `main` first**, even for a new repo. `workflow_dispatch` only
becomes callable via the API once the workflow file exists on the repo's
default branch — on a feature branch it 422s.

## `fetch-google-font.mjs`

Self-hosts Google Fonts (latin subset — covers German umlauts) as static
`.woff`/`.woff2` files plus a generated `fonts.css`, with no API key and no
build tool. Requires Node 18+ (uses global `fetch`).

```bash
node tools/fetch-google-font.mjs --family "Jost" --weights 400,500,600 --out ./fonts
node tools/fetch-google-font.mjs --family "Playfair Display" --weights 400,600,700 --italic 400 --out ./fonts
```

Run it once per family; it appends to `<out>/fonts.css`, so multiple calls
into the same `--out` build up one combined stylesheet. Link it with a plain
`<link rel="stylesheet" href="fonts.css">`.

Fetches one weight at a time on purpose — a combined multi-weight request
to the Google Fonts CSS API can return the identical file for every weight
requested at once.

## Branch policy for new personal/tooling repos

For repos that are Ken's own (not a client engagement with its own branch
requirements), commit straight to `main` instead of opening a long-lived
feature branch — see the `workflow_dispatch` note above for why that
actually matters, not just as a style preference.
