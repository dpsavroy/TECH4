export const colors = {
  primary: {
    ink: "#0A1220",
    steel: "#1E3A5F",
    signal: "#2F6FED",
    mist: "#EAF1FF",
  },
  neutral: {
    0: "#FFFFFF",
    50: "#F7F8FA",
    100: "#EEF1F4",
    200: "#DDE3EA",
    300: "#C7D0DA",
    400: "#8D99A8",
    500: "#657181",
    600: "#4A5563",
    700: "#303A46",
    800: "#1B2430",
    900: "#0B111A",
  },
  background: {
    page: "#F7F8FA",
    surface: "#FFFFFF",
    elevated: "#FFFFFF",
    inverse: "#0A1220",
    muted: "#EEF1F4",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    mono: "var(--font-geist-mono), 'SFMono-Regular', Consolas, monospace",
  },
  scale: {
    xs: { fontSize: "0.75rem", lineHeight: "1rem" },
    sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
    base: { fontSize: "1rem", lineHeight: "1.5rem" },
    lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
    xl: { fontSize: "1.25rem", lineHeight: "1.75rem" },
    "2xl": { fontSize: "1.5rem", lineHeight: "2rem" },
    "3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" },
    "4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" },
    "5xl": { fontSize: "3rem", lineHeight: "1.08" },
    "6xl": { fontSize: "3.75rem", lineHeight: "1.05" },
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
  },
  tracking: {
    tight: "-0.01em",
    normal: "0",
    wide: "0.02em",
  },
} as const;

export const radius = {
  xs: "0.25rem",
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  full: "9999px",
} as const;

export const shadows = {
  none: "none",
  sm: "0 1px 2px rgb(10 18 32 / 0.06)",
  md: "0 8px 24px rgb(10 18 32 / 0.08)",
  lg: "0 18px 48px rgb(10 18 32 / 0.10)",
  focus: "0 0 0 3px rgb(47 111 237 / 0.18)",
} as const;

export const layout = {
  container: {
    sm: "40rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "90rem",
  },
  sectionSpacing: {
    xs: "3rem",
    sm: "4rem",
    md: "6rem",
    lg: "8rem",
    xl: "10rem",
  },
} as const;

export const buttons = {
  size: {
    sm: {
      height: "2.25rem",
      paddingInline: "0.875rem",
      fontSize: typography.scale.sm.fontSize,
    },
    md: {
      height: "2.75rem",
      paddingInline: "1.125rem",
      fontSize: typography.scale.base.fontSize,
    },
    lg: {
      height: "3.25rem",
      paddingInline: "1.5rem",
      fontSize: typography.scale.base.fontSize,
    },
  },
} as const;

export const transitions = {
  duration: {
    instant: "80ms",
    fast: "160ms",
    base: "240ms",
    slow: "360ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    entrance: "cubic-bezier(0.16, 1, 0.3, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const designTokens = {
  colors,
  typography,
  radius,
  shadows,
  layout,
  buttons,
  transitions,
} as const;
