import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../../atoms/Icon";
import styles from "./Snackbar.module.css";

export type SnackbarTone = "neutral" | "success" | "information" | "warning" | "error";

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  tone?: SnackbarTone;
  message: ReactNode;
  /** Optional action label rendered as a text button. */
  actionLabel?: string;
  onAction?: () => void;
  /** Show a dismiss (close) button. */
  onDismiss?: () => void;
}

const toneIcon: Record<SnackbarTone, IconName | null> = {
  neutral: null,
  success: "success",
  information: "info",
  warning: "warning",
  error: "error",
};

export function Snackbar({
  tone = "neutral",
  message,
  actionLabel,
  onAction,
  onDismiss,
  className,
  ...rest
}: SnackbarProps) {
  const iconName = toneIcon[tone];

  return (
    <div
      role="status"
      aria-live="polite"
      className={[styles.snackbar, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {iconName && (
        <span className={styles.icon}>
          <Icon name={iconName} />
        </span>
      )}
      <span className={styles.message}>{message}</span>
      {actionLabel && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          className={styles.close}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <Icon name="close" />
        </button>
      )}
    </div>
  );
}
