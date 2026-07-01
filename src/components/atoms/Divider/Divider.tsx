import type { HTMLAttributes } from "react";
import styles from "./Divider.module.css";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  orientation = "horizontal",
  className,
  ...rest
}: DividerProps) {
  return (
    <hr
      role="separator"
      aria-orientation={orientation}
      className={[styles.divider, styles[orientation], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
