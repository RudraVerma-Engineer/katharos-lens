export const colors = {
  // === BACKGROUNDS ===
  background: "#0A0A0F",
  surface: "#13131A",
  surfaceElevated: "#1C1C26",
  surfaceBorder: "#2A2A38",

  // === BRAND ===
  primary: "#6C63FF",
  primaryLight: "#8B85FF",
  primaryDark: "#4F48CC",
  primaryFaded: "rgba(108, 99, 255, 0.15)",

  // === ACCENT ===
  accent: "#00D4AA",
  accentFaded: "rgba(0, 212, 170, 0.12)",

  // === IMPACT LEVELS ===
  impactHigh: "#FF5C5C",
  impactHighFaded: "rgba(255, 92, 92, 0.12)",
  impactMedium: "#FFB347",
  impactMediumFaded: "rgba(255, 179, 71, 0.12)",
  impactLow: "#6BCF7F",
  impactLowFaded: "rgba(107, 207, 127, 0.12)",

  // === TEXT ===
  textPrimary: "#F0F0F8",
  textSecondary: "#9090A8",
  textMuted: "#55556A",
  textOnPrimary: "#FFFFFF",

  // === STATUS ===
  success: "#6BCF7F",
  warning: "#FFB347",
  error: "#FF5C5C",
  info: "#5BC0F8",

  // === UTILITY ===
  transparent: "transparent",
  overlay: "rgba(0, 0, 0, 0.7)",
  white: "#FFFFFF",
  black: "#000000",
};

export const typography = {
  // Font sizes
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    display: 36,
  },

  // Font weights
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  xxl: 28,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  primary: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Reusable style patterns
export const commonStyles = {
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
  },
  sectionTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.surfaceBorder,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.textPrimary,
    fontSize: typography.size.base,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.textOnPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    letterSpacing: 0.3,
  },
};

// Category color mapping
export const categoryColors = {
  Operations: "#6C63FF",
  Sales: "#00D4AA",
  Product: "#5BC0F8",
  "Customer Experience": "#FFB347",
  Delivery: "#FF7EB3",
  Finance: "#6BCF7F",
  Other: "#9090A8",
};

// Helper: get impact color
export const getImpactColor = (impact) => {
  switch (impact?.toLowerCase()) {
    case "high":
      return colors.impactHigh;
    case "medium":
      return colors.impactMedium;
    case "low":
      return colors.impactLow;
    default:
      return colors.textMuted;
  }
};

// Helper: get impact faded background
export const getImpactFaded = (impact) => {
  switch (impact?.toLowerCase()) {
    case "high":
      return colors.impactHighFaded;
    case "medium":
      return colors.impactMediumFaded;
    case "low":
      return colors.impactLowFaded;
    default:
      return colors.surfaceElevated;
  }
};
