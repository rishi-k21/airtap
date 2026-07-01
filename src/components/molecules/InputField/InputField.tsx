import { useId } from "react";
import { Input, type InputProps } from "../../atoms/Input";
import styles from "./InputField.module.css";

export interface InputFieldProps extends InputProps {
  label?: string;
  /** Helper text shown below the input. Replaced by errorMessage when present. */
  helperText?: string;
  /** Error message — also forces the input into its error state. */
  errorMessage?: string;
  required?: boolean;
}

/** Input Field — Figma "Input Field" (label + control + helper/error). */
export function InputField({
  label,
  helperText,
  errorMessage,
  required,
  id,
  ...inputProps
}: InputFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const message = errorMessage ?? helperText;
  const hasError = Boolean(errorMessage);
  const messageId = message ? `${fieldId}-message` : undefined;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={fieldId} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden>
              *
            </span>
          )}
        </label>
      )}
      <Input
        id={fieldId}
        error={hasError || inputProps.error}
        aria-describedby={messageId}
        required={required}
        {...inputProps}
      />
      {message && (
        <span
          id={messageId}
          className={[styles.message, hasError ? styles.error : undefined]
            .filter(Boolean)
            .join(" ")}
        >
          {message}
        </span>
      )}
    </div>
  );
}
