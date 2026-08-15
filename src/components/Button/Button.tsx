import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `solid` is the primary call-to-action style. */
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

/**
 * Primary interactive control. Renders a native `<button>` so it keeps
 * all built-in keyboard and form behavior - pass `type="submit"` etc as needed.
 *
 * @example
 * <Button variant="solid" size="lg">Termin vereinbaren</Button>
 * <Button variant="outline">Jetzt anrufen</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", size = "md", className, ...props }, ref) => {
    const classes = ["kds-btn", `kds-btn--${variant}`, `kds-btn--${size}`, className]
      .filter(Boolean)
      .join(" ");
    return <button ref={ref} className={classes} {...props} />;
  }
);
Button.displayName = "Button";
