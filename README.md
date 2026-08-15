# Kens Design System

A small, themeable React component kit for the client websites built under
[Kens Webspace](https://github.com/kenrona72-hub/Webseiten) — buttons, cards,
badges and layout primitives on a single design-token layer, so a new client
site can be reskinned by overriding CSS custom properties instead of
rewriting components.

## Why this exists

Each client site (e.g. Hani Hairstyle) was previously hand-built as static
HTML/CSS. The patterns that kept recurring — pill buttons with a fill-sweep
hover, eyebrow-labeled section headings, status badges, metadata tags — are
pulled out here as real, typed React components so future sites reuse them
instead of re-deriving the same CSS.

## Installation

```bash
npm install
npm run dev        # local preview at src/dev — all components, theme + brand toggle
npm run build      # emits dist/ (ESM + type declarations + one styles.css)
npm run build:demo # emits demo-dist/ — the same preview, built as a static site
npm run typecheck
```

The `build:demo` output is deployed to GitHub Pages on every push to `main`
via `.github/workflows/deploy-pages.yml`, so the component showcase always
reflects the latest `main`.

## Usage

```tsx
import { Button, Card, Badge, SectionHeading, Tag } from "kens-design-system";
import "kens-design-system/styles.css";

<SectionHeading eyebrow="Services" heading="Unsere Dienstleistungen" align="center" />
<Card eyebrow="Damen" heading="Waschen, Schneiden, Föhnen" footer="42 €">
  Inklusive Beratung und Stylingprodukt.
</Card>
<Button variant="solid" size="lg">Termin vereinbaren</Button>
```

## Theming a new client

Every visual property components read comes from the CSS custom properties
in `src/tokens.css` (prefixed `--kds-*`). Reskin a site by overriding them in
a scoped block instead of touching component CSS:

```css
[data-brand="acme"] {
  --kds-color-accent: #2563eb;
  --kds-color-accent-strong: #1d4ed8;
  --kds-font-display: "Fraunces", Georgia, serif;
}
```

Then set `data-brand="acme"` on any ancestor element (or `<html>`). An
optional dark mode ships the same way via `data-theme="dark"`.

## Components

| Component | Purpose |
|---|---|
| `Button` | Primary interactive control — `solid` / `outline` / `ghost` variants |
| `Card` | General content container — `eyebrow` / `title` / body / `footer` |
| `Badge` | Status label with semantic tone (`neutral` / `positive` / `accent`) |
| `Tag` | Compact metadata chip, no semantic tone |
| `SectionHeading` | Eyebrow + heading pair; `index` is opt-in and only for genuine numbered sequences |

## Status

Early / v0.1 — five components, extracted from the first two sites built
under Kens Webspace. Add components here as new site patterns repeat across
two or more client projects, not speculatively.
