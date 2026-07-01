import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "transparent";
export type ButtonSize = "small" | "medium" | "large" | "xlarge";
export type ButtonShape = "rounded" | "pill" | "rectangle";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style — maps to Figma "Button/{variant}". */
  variant?: ButtonVariant;
  /** Size — maps to Figma ".Button Size". */
  size?: ButtonSize;
  /** Corner style — maps to Figma ".Button Style". */
  shape?: ButtonShape;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  /** Show a loading spinner and disable interaction. */
  loading?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
  children?: ReactNode;
}

const shapeClass: Record<ButtonShape, string | undefined> = {
  rounded: undefined,
  pill: styles.pill,
  rectangle: styles.rectangle,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      shape = "rounded",
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const isIconOnly = !children && (!!startIcon || !!endIcon);

    const classes = [
      styles.button,
      styles[variant],
      styles[size],
      shapeClass[shape],
      fullWidth ? styles.fullWidth : undefined,
      isIconOnly ? styles.iconOnly : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading && <span className={styles.spinner} aria-hidden />}
        {!loading && startIcon && (
          <span className={styles.icon} aria-hidden>
            {startIcon}
          </span>
        )}
        {children}
        {!loading && endIcon && (
          <span className={styles.icon} aria-hidden>
            {endIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
