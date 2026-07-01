import type { HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Diameter in px. */
  size?: number;
  /** Stroke thickness in px. */
  thickness?: number;
  label?: string;
}

/** Infinite Loader — Figma "Infinite Loader". */
export function Spinner({
  size = 24,
  thickness = 3,
  label = "Loading",
  className,
  style,
  ...rest
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={[styles.spinner, className].filter(Boolean).join(" ")}
      style={{ width: size, height: size, borderWidth: thickness, ...style }}
      {...rest}
    />
  );
}
