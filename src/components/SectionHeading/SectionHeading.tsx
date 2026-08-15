import type { HTMLAttributes, ReactNode } from "react";
import "./SectionHeading.css";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  /** Short uppercase label above the heading, e.g. "Services". */
  eyebrow: ReactNode;
  heading: ReactNode;
  /** Only pass this when the sections truly form a numbered sequence. */
  index?: number;
  align?: "left" | "center";
}

/**
 * Eyebrow + heading pair used to open a page section. `index` is optional
 * and should only be set when the surrounding sections are a real ordered
 * sequence - don't add numbering purely for decoration.
 *
 * @example
 * <SectionHeading eyebrow="Services" heading="Unsere Dienstleistungen" align="center" />
 */
export function SectionHeading({
  eyebrow,
  heading,
  index,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const classes = ["kds-heading", `kds-heading--${align}`, className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      <p className="kds-heading__eyebrow">
        {typeof index === "number" && (
          <span className="kds-heading__index">{String(index).padStart(2, "0")}</span>
        )}
        {eyebrow}
      </p>
      <h2 className="kds-heading__title">{heading}</h2>
    </div>
  );
}
