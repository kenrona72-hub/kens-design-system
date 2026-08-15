import { useState } from "react";
import { Button, Card, Badge, SectionHeading, Tag } from "../index";
import "./dev.css";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [brand, setBrand] = useState<"default" | "sage">("default");

  return (
    <div data-theme={theme} data-brand={brand} className="dev-page">
      <header className="dev-toolbar">
        <strong>Kens Design System — Preview</strong>
        <div className="dev-toolbar__actions">
          <Button size="sm" variant="outline" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Theme: {theme}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setBrand(brand === "default" ? "sage" : "default")}
          >
            Brand: {brand}
          </Button>
        </div>
      </header>

      <main className="dev-content">
        <SectionHeading index={1} eyebrow="Buttons" heading="Button" align="left" />
        <div className="dev-row">
          <Button variant="solid">Termin vereinbaren</Button>
          <Button variant="outline">Jetzt anrufen</Button>
          <Button variant="ghost">Mehr erfahren</Button>
        </div>

        <SectionHeading index={2} eyebrow="Status" heading="Badge & Tag" />
        <div className="dev-row">
          <Badge tone="positive">Live</Badge>
          <Badge tone="neutral">Entwurf</Badge>
          <Badge tone="accent">Neu</Badge>
          <Tag>HTML</Tag>
          <Tag>CSS</Tag>
          <Tag>JS</Tag>
        </div>

        <SectionHeading index={3} eyebrow="Container" heading="Card" />
        <div className="dev-grid">
          <Card eyebrow="Damen" heading="Waschen, Schneiden, Föhnen" footer="42 €">
            Inklusive Beratung und Stylingprodukt.
          </Card>
          <Card eyebrow="Hani Hairstyle" heading="Friseur Neu-Ulm" footer="Entwurf">
            One-Page-Website mit Services, Galerie und Standort.
          </Card>
          <Card flat eyebrow="Flach" heading="Ohne Schatten">
            Für bereits umrandete Flächen.
          </Card>
        </div>
      </main>
    </div>
  );
}
