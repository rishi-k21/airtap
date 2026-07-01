import {
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  /** Tooltip content shown on hover/focus. */
  content: ReactNode;
  placement?: TooltipPlacement;
  /** The trigger element. */
  children: ReactNode;
}

export function Tooltip({
  content,
  placement = "top",
  children,
  className,
  ...rest
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(" ")}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={open ? tooltipId : undefined}
      {...rest}
    >
      {children}
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={[styles.bubble, styles[placement]].join(" ")}
        >
          {content}
        </span>
      )}
    </div>
  );
}
