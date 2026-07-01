import { createElement, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Typography.module.css";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "bodySmall"
  | "bodyXSmall"
  | "caption";

export type TypographyColor =
  | "title"
  | "body"
  | "small"
  | "subtle"
  | "muted"
  | "disabled"
  | "success"
  | "info"
  | "warning"
  | "error";

export type TypographyWeight =
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /** Override the rendered element (defaults derived from variant). */
  as?: keyof React.JSX.IntrinsicElements;
  color?: TypographyColor;
  weight?: TypographyWeight;
  children?: ReactNode;
}

const defaultTag: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  bodySmall: "p",
  bodyXSmall: "p",
  caption: "span",
};

const colorClass: Record<TypographyColor, string> = {
  title: styles.colorTitle,
  body: styles.colorBody,
  small: styles.colorSmall,
  subtle: styles.colorSubtle,
  muted: styles.colorMuted,
  disabled: styles.colorDisabled,
  success: styles.colorSuccess,
  info: styles.colorInfo,
  warning: styles.colorWarning,
  error: styles.colorError,
};

const weightClass: Record<TypographyWeight, string> = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  medium: styles.weightMedium,
  semibold: styles.weightSemibold,
  bold: styles.weightBold,
};

export function Typography({
  variant = "body",
  as,
  color,
  weight,
  className,
  children,
  ...rest
}: TypographyProps) {
  const tag = as ?? defaultTag[variant];
  const classes = [
    styles.text,
    styles[variant],
    color ? colorClass[color] : undefined,
    weight ? weightClass[weight] : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createElement(tag, { className: classes, ...rest }, children);
}
