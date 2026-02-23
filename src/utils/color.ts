/**
 * Color palette utama untuk proyek GeoConvert.
 *
 * Disesuaikan dari referensi dengan skema warna:
 * - Primary: Rose Red (#E11D48) sebagai brand color
 * - Neutral: Skala zinc/gray untuk teks dan background
 * - Semantic: Error, Success, Warning, Info
 * - Background: Dark mode (zinc-based) dan Light mode (white-based)
 */
export const colors = {
    /** Warna netral untuk teks, border, dan elemen umum */
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

    /** Warna brand utama — Rose Red */
    brand: {
        50: "#FFF1F2",
        100: "#FFE4E6",
        200: "#FECDD3",
        300: "#FDA4AF",
        400: "#FB7185",
        500: "#F43F5E",
        600: "#E11D48",
        700: "#BE123C",
        800: "#9F1239",
        900: "#881337",
        950: "#4C0519",
    },

    /** Alias langsung untuk warna brand primer */
    primary: {
        light: "#FB7185",
        DEFAULT: "#E11D48",
        dark: "#BE123C",
    },

    /** Warna status error / destructive */
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

    /** Warna status success */
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

    /** Warna status warning */
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

    /** Warna status info */
    info: {
        light: "#3B82F6",
        DEFAULT: "#2563EB",
        dark: "#1D4ED8",
    },

    /** Warna background untuk dark mode */
    "bg-dark": {
        base: "#0A0A0A",
        raised: "#18181B",
        overlay: "#27272A",
        subtle: "#1A1A1A",
        muted: "#3F3F46",
    },

    /** Warna background untuk light mode */
    "bg-light": {
        base: "#FFFFFF",
        raised: "#F4F4F5",
        overlay: "#E4E4E7",
        subtle: "#FAFAFA",
        muted: "#F9FAFB",
    },

    /** Warna untuk border */
    border: {
        light: "#E4E4E7",
        DEFAULT: "#D4D4D8",
        dark: "#3F3F46",
        subtle: "#27272A",
    },

    /** Warna untuk tombol (button) */
    btn: {
        primary: "#E11D48",
        "primary-hover": "#BE123C",
        success: "#16A34A",
        "success-hover": "#15803D",
        error: "#DC2626",
        "error-hover": "#B91C1C",
        secondary: "#27272A",
        "secondary-hover": "#3F3F46",
        ghost: "transparent",
    },

    /** Warna indikator status */
    indicator: {
        critical: "#EF4444",
        warning: "#F59E0B",
        success: "#22C55E",
        info: "#3B82F6",
        default: "#A1A1AA",
    },

    /** Warna aksen untuk highlight dan dekorasi */
    accent: {
        rose: "#E11D48",
        "rose-glow": "rgba(225, 29, 72, 0.8)",
        "rose-soft": "rgba(225, 29, 72, 0.1)",
        zinc: "#52525B",
    },
} as const;

/** Brand red — shortcut untuk warna utama */
export const BRAND_RED = colors.brand[600];

/** Type helper: Semua key warna yang tersedia */
export type ColorKey = keyof typeof colors;

export default colors;
