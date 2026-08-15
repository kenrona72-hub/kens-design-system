import type { HTMLAttributes } from "react";
import "./Tag.css";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {}

/**
 * Small outlined chip for a piece of metadata - a tech-stack label, a
 * social-link pill, a filter value. Unlike `Badge`, `Tag` carries no
 * semantic tone; it's purely a compact label.
 *
 * @example
 * <Tag>HTML</Tag>
 * <Tag>CSS</Tag>
 */
export function Tag({ className, ...props }: TagProps) {
  const classes = ["kds-tag", className].filter(Boolean).join(" ");
  return <span className={classes} {...props} />;
}
