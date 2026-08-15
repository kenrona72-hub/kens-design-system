## Conventions

**No provider or wrapper required.** Every component is a plain, self-contained React function — no `ThemeProvider`, no context. Just import and render.

**Styling idiom: CSS custom properties, not utility classes or style props.** Every visual value components read comes from `--kds-*` tokens defined in `tokens.css` on `:root`. Never pass raw colors, spacing, or fonts as props or inline styles — override the token instead, scoped to a wrapper element:

```css
[data-brand="acme"] {
  --kds-color-accent: #2563eb;
  --kds-color-accent-strong: #1d4ed8;
  --kds-font-display: "Fraunces", Georgia, serif;
}
```

Real token names (the full set — do not invent others):
- Color: `--kds-color-bg`, `--kds-color-surface`, `--kds-color-surface-hover`, `--kds-color-text`, `--kds-color-text-muted`, `--kds-color-border`, `--kds-color-accent`, `--kds-color-accent-strong`, `--kds-color-accent-contrast`
- Radius: `--kds-radius-sm`, `--kds-radius-md`, `--kds-radius-full`
- Spacing scale: `--kds-space-1` (4px) through `--kds-space-8` (32px), steps 1/2/3/4/6/8
- Type: `--kds-font-display` (Playfair Display, headings/serif accents), `--kds-font-body` (Jost, running text/buttons), `--kds-font-mono` (IBM Plex Mono, eyebrows/labels/metadata)
- Shadow: `--kds-shadow-sm`, `--kds-shadow-md`
- Motion: `--kds-transition`

An optional dark theme ships the same way: set `data-theme="dark"` on any ancestor (`<html>` or a section wrapper) to flip every token to its dark value — no separate dark component variants exist.

**Where the truth lives.** Read `styles.css` (imports `tokens.css` + `_ds_bundle.css`) before styling anything — it is the complete, authoritative token list. Each component also ships a `.prompt.md` with its real usage examples; prefer those over guessing prop shapes.

**Component vocabulary — five primitives, compose them, don't reinvent:**
- `Button` — `variant`: `solid` (primary CTA) / `outline` / `ghost`; `size`: `sm` / `md` / `lg`.
- `Card` — `eyebrow`, `heading` (not `title` — reserved for the native tooltip attribute), children as body, `footer`; `flat` removes border/shadow for use on already-bordered surfaces.
- `Badge` — status pill with semantic `tone`: `neutral` / `positive` / `accent`. Tone is meaning, not brand color — never use it to pick an accent shade.
- `Tag` — plain metadata chip, no semantic tone. Use for tech-stack labels, filters, non-status metadata.
- `SectionHeading` — `eyebrow` + `heading` pair for opening a page section. `index` (a number) adds a numbered marker — set it **only** when the surrounding sections are a genuine ordered sequence, never for decoration.

**Idiomatic example** (a service card row, the DS's own composition style):

```tsx
import { Button, Card, SectionHeading } from "kens-design-system";
import "kens-design-system/styles.css";

<SectionHeading eyebrow="Services" heading="Unsere Dienstleistungen" align="center" />
<Card eyebrow="Damen" heading="Waschen, Schneiden, Föhnen" footer="42 €">
  Inklusive Beratung und Stylingprodukt.
</Card>
<Button variant="solid" size="lg">Termin vereinbaren</Button>
```
