/**
 * Color palette untuk Tailwind CSS config.
 * Diimport oleh tailwind.config.js melalui require("./src/utils/colors").
 *
 * Warna ini disesuaikan dengan desain GeoConvert:
 * - Brand: Rose Red
 * - Dark mode: Zinc-based backgrounds
 * - Light mode: White/gray-based backgrounds
 */

/** @type {Record<string, string | Record<string, string>>} */
const colors = {
    // Brand colors
    "brand-red": {
        50: "#FFF1F2",
        100: "#FFE4E6",
        200: "#FECDD3",
        300: "#FDA4AF",
        400: "#FB7185",
        500: "#F43F5E",
        DEFAULT: "#E11D48",
        600: "#E11D48",
        700: "#BE123C",
        800: "#9F1239",
        900: "#881337",
        950: "#4C0519",
    },

    // Neutral / zinc scale
    neutral: {
        50: "#FAFAFA",
        100: "#F4F4F5",
        200: "#E4E4E7",
        300: "#D4D4D8",
        400: "#A1A1AA",
        500: "#71717A",
        600: "#52525B",
        700: "#3F3F46",
        800: "#27272A",
        900: "#18181B",
        950: "#09090B",
    },

    // Semantic: Error
    error: {
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#EF4444",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
    },

    // Semantic: Success
    success: {
        50: "#F0FDF4",
        100: "#DCFCE7",
        200: "#BBF7D0",
        300: "#86EFAC",
        400: "#4ADE80",
        500: "#22C55E",
        600: "#16A34A",
        700: "#15803D",
        800: "#166534",
        900: "#14532D",
    },

    // Semantic: Warning
    warning: {
        50: "#FFFBEB",
        100: "#FEF3C7",
        200: "#FDE68A",
        300: "#FCD34D",
        400: "#FBBF24",
        500: "#F59E0B",
        600: "#D97706",
        700: "#B45309",
        800: "#92400E",
        900: "#78350F",
    },

    // Semantic: Info
    info: {
        light: "#3B82F6",
        DEFAULT: "#2563EB",
        dark: "#1D4ED8",
    },

    // Dark backgrounds
    "bg-dark": {
        base: "#0A0A0A",
        raised: "#18181B",
        overlay: "#27272A",
        subtle: "#1A1A1A",
        muted: "#3F3F46",
    },

    // Light backgrounds
    "bg-light": {
        base: "#FFFFFF",
        raised: "#F4F4F5",
        overlay: "#E4E4E7",
        subtle: "#FAFAFA",
        muted: "#F9FAFB",
    },

    // Button-specific
    btn: {
        primary: "#E11D48",
        "primary-hover": "#BE123C",
        success: "#16A34A",
        "success-hover": "#15803D",
        error: "#DC2626",
        "error-hover": "#B91C1C",
        secondary: "#27272A",
        "secondary-hover": "#3F3F46",
    },

    // Indicator
    indicator: {
        critical: "#EF4444",
        warning: "#F59E0B",
        success: "#22C55E",
        info: "#3B82F6",
        default: "#A1A1AA",
    },

    // Accent
    accent: {
        rose: "#E11D48",
        zinc: "#52525B",
    },
};

module.exports = colors;
