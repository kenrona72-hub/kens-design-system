import type { HTMLAttributes } from "react";
import "./Badge.css";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic tone - separate from the brand accent, used for status meaning. */
  tone?: "neutral" | "positive" | "accent";
}

/**
 * Small status label, e.g. "Live" / "Entwurf" on a project card, or a
 * category tag. Keep the text to one or two words.
 *
 * @example
 * <Badge tone="positive">Live</Badge>
 * <Badge tone="neutral">Entwurf</Badge>
 */
export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  const classes = ["kds-badge", `kds-badge--${tone}`, className].filter(Boolean).join(" ");
  return <span className={classes} {...props} />;
}
