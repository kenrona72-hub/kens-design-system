import { Card } from 'kens-design-system';

export const Default = () => (
  <Card eyebrow="Damen" heading="Waschen, Schneiden, Föhnen" footer="42 €">
    Inklusive Beratung und Stylingprodukt.
  </Card>
);

export const ProjectCard = () => (
  <Card eyebrow="Hani Hairstyle" heading="Friseur Neu-Ulm" footer="Entwurf">
    One-Page-Website mit Services, Galerie und Standort.
  </Card>
);

export const Flat = () => (
  <Card flat eyebrow="Flach" heading="Ohne Schatten">
    Für bereits umrandete Flächen.
  </Card>
);
