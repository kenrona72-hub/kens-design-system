import { SectionHeading } from 'kens-design-system';

export const LeftAligned = () => (
  <SectionHeading eyebrow="Services" heading="Unsere Dienstleistungen" />
);

export const Centered = () => (
  <SectionHeading eyebrow="Container" heading="Card" align="center" />
);

export const Numbered = () => (
  <SectionHeading index={1} eyebrow="Buttons" heading="Button" />
);
