/**
 * Airtap DS — token reference for TypeScript/JS consumers.
 * Keys mirror the Figma variable names; values point at the CSS custom
 * properties declared in src/styles. Prefer these over hard-coded values.
 */

export const spacing = {
  "0": "var(--scale-0)",
  "25": "var(--scale-25)",
  "50": "var(--scale-50)",
  "100": "var(--scale-100)",
  "200": "var(--scale-200)",
  "300": "var(--scale-300)",
  "400": "var(--scale-400)",
  "500": "var(--scale-500)",
  "600": "var(--scale-600)",
  "700": "var(--scale-700)",
  "800": "var(--scale-800)",
  "900": "var(--scale-900)",
  "1000": "var(--scale-1000)",
  "1100": "var(--scale-1100)",
  "1200": "var(--scale-1200)",
  "1300": "var(--scale-1300)",
  "1400": "var(--scale-1400)",
  "1500": "var(--scale-1500)",
  "1600": "var(--scale-1600)",
} as const;

export const radius = {
  none: "var(--boder-radius-none)",
  sm: "var(--boder-radius-scale-100)",
  md: "var(--boder-radius-scale-200)",
  lg: "var(--boder-radius-scale-300)",
  xl: "var(--boder-radius-scale-400)",
  "2xl": "var(--boder-radius-scale-700)",
  full: "var(--boder-radius-full-round)",
} as const;

export const fontFamily = {
  primary: "var(--font-primary)",
  secondary: "var(--font-secondary)",
  code: "var(--font-code)",
} as const;

/** Typography ramp from Figma "Font Config" (Desktop mode). */
export const typography = {
  h1: { fontSize: "var(--font-config-h1-font-size)", lineHeight: "var(--font-config-h1-line-height)", fontWeight: "var(--font-config-h1-font-weight)", letterSpacing: "var(--font-config-h1-letter-spacing)" },
  h2: { fontSize: "var(--font-config-h2-font-size)", lineHeight: "var(--font-config-h2-line-height)", fontWeight: "var(--font-config-h2-font-weight)", letterSpacing: "var(--font-config-h2-letter-spacing)" },
  h3: { fontSize: "var(--font-config-h3-font-size)", lineHeight: "var(--font-config-h3-line-height)", fontWeight: "var(--font-config-h3-font-weight)", letterSpacing: "var(--font-config-h3-letter-spacing)" },
  h4: { fontSize: "var(--font-config-h4-font-size)", lineHeight: "var(--font-config-h4-line-height)", fontWeight: "var(--font-config-h4-font-weight)", letterSpacing: "var(--font-config-h4-letter-spacing)" },
  h5: { fontSize: "var(--font-config-h5-font-size)", lineHeight: "var(--font-config-h5-line-height)", fontWeight: "var(--font-config-h5-font-weight)", letterSpacing: "var(--font-config-h5-letter-spacing)" },
  h6: { fontSize: "var(--font-config-h6-font-size)", lineHeight: "var(--font-config-h6-line-height)", fontWeight: "var(--font-config-h6-font-weight)", letterSpacing: "var(--font-config-h6-letter-spacing)" },
  body: { fontSize: "var(--font-config-body-font-size)", lineHeight: "var(--font-config-body-line-height)", fontWeight: "var(--font-config-body-font-weight)" },
  bodyMedium: { fontSize: "var(--font-config-body-medium-font-size)", lineHeight: "var(--font-config-body-medium-line-height)", fontWeight: "var(--font-config-body-medium-font-weight)" },
  bodySmall: { fontSize: "var(--font-config-body-small-font-size)", lineHeight: "var(--font-config-body-small-line-height)", fontWeight: "var(--font-config-body-small-font-weight)" },
  bodyXSmall: { fontSize: "var(--font-config-body-x-small-font-size)", lineHeight: "var(--font-config-body-x-small-line-height)", fontWeight: "var(--font-config-body-x-small-font-weight)" },
  caption: { fontSize: "var(--font-config-caption-font-size)", lineHeight: "var(--font-config-caption-line-height)", fontWeight: "var(--font-config-caption-font-weight)", letterSpacing: "var(--font-config-caption-letter-spacing)" },
} as const;

export type ThemeName = "light" | "dark";
