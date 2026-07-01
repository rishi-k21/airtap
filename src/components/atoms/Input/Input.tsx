import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Input.module.css";

export type InputSize = "small" | "medium" | "large";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  /** Render the error visual state. */
  error?: boolean;
  /** Content rendered before the input (e.g. an Icon). */
  startAdornment?: ReactNode;
  /** Content rendered after the input (e.g. an Icon or button). */
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "medium",
      error = false,
      startAdornment,
      endAdornment,
      disabled,
      className,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const wrapperClasses = [
      styles.wrapper,
      styles[inputSize],
      focused ? styles.focused : undefined,
      error ? styles.error : undefined,
      disabled ? styles.disabled : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={wrapperClasses}>
        {startAdornment && <span className={styles.affix}>{startAdornment}</span>}
        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          aria-invalid={error || undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {endAdornment && <span className={styles.affix}>{endAdornment}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
