import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small label above the heading, e.g. a category or price. */
  eyebrow?: ReactNode;
  /** Card heading. Named `heading` (not `title`) to avoid colliding with the native tooltip attribute. */
  heading?: ReactNode;
  /** Rendered below the body; typically actions or metadata. */
  footer?: ReactNode;
  /** Removes the shadow/border for use on already-bordered surfaces. */
  flat?: boolean;
}

/**
 * General-purpose content container - a service card, project card, or
 * pricing tile. Compose `eyebrow` / `heading` / children / `footer` rather
 * than styling ad hoc divs so spacing stays consistent across a site.
 *
 * @example
 * <Card eyebrow="Damen" heading="Waschen, Schneiden, Föhnen" footer="42 €">
 *   Inklusive Beratung und Stylingprodukt.
 * </Card>
 */
export function Card({ eyebrow, heading, footer, flat = false, className, children, ...props }: CardProps) {
  const classes = ["kds-card", flat && "kds-card--flat", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      {eyebrow && <div className="kds-card__eyebrow">{eyebrow}</div>}
      {heading && <div className="kds-card__title">{heading}</div>}
      {children && <div className="kds-card__body">{children}</div>}
      {footer && <div className="kds-card__footer">{footer}</div>}
    </div>
  );
}
