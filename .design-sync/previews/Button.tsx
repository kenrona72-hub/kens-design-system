import { Button } from 'kens-design-system';

export const Solid = () => (
  <Button variant="solid" size="lg">Termin vereinbaren</Button>
);

export const Outline = () => (
  <Button variant="outline" size="lg">Jetzt anrufen</Button>
);

export const Ghost = () => (
  <Button variant="ghost">Mehr erfahren</Button>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button size="sm">Klein</Button>
    <Button size="md">Mittel</Button>
    <Button size="lg">Groß</Button>
  </div>
);
