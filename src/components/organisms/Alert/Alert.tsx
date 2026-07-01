import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../../atoms/Icon";
import styles from "./Alert.module.css";

export type AlertTone = "neutral" | "success" | "information" | "warning" | "error";

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Optional action node(s), e.g. Buttons, shown below the description. */
  actions?: ReactNode;
  /** Show a dismiss (close) button. */
  onDismiss?: () => void;
  children?: ReactNode;
}

const toneIcon: Record<AlertTone, IconName> = {
  neutral: "info",
  success: "success",
  information: "info",
  warning: "warning",
  error: "error",
};

export function Alert({
  tone = "neutral",
  title,
  actions,
  onDismiss,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      role="alert"
      className={[styles.alert, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className={styles.icon}>
        <Icon name={toneIcon[tone]} size={20} />
      </span>
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <p className={styles.description}>{children}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
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
