/**
 * Utility untuk format angka.
 *
 * Dirancang untuk kebutuhan GeoConvert:
 * - Format koordinat (latitude, longitude) dengan presisi konsisten
 * - Format angka umum dengan separator ribuan
 *
 * @module formatNumber
 */

/**
 * Format koordinat ke string dengan jumlah desimal tetap.
 *
 * @example
 * formatCoordinate(-6.917384)     // "-6.917384"
 * formatCoordinate(106.845, 4)    // "106.8450"
 * formatCoordinate(undefined)     // "-"
 *
 * @param value - Nilai koordinat
 * @param precision - Jumlah angka di belakang koma (default: 6)
 * @param fallback - Nilai fallback jika input null/undefined (default: "-")
 * @returns String terformat
 */
export function formatCoordinate(
    value?: number | null,
    precision = 6,
    fallback = "-"
): string {
    if (value == null || isNaN(value)) return fallback;

    return value.toFixed(precision);
}

/**
 * Format angka dengan separator ribuan (titik) sesuai format Indonesia.
 *
 * @example
 * formatNumber(1234567)       // "1.234.567"
 * formatNumber(1234567.89)    // "1.234.567,89"
 * formatNumber(1234567, 2)    // "1.234.567,00"
 * formatNumber(undefined)     // "-"
 *
 * @param value - Angka yang akan diformat
 * @param decimals - Jumlah desimal (opsional)
 * @param fallback - Nilai fallback jika input null/undefined (default: "-")
 * @returns String terformat dengan separator Indonesia (titik ribuan, koma desimal)
 */
export function formatNumber(
    value?: number | null,
    decimals?: number,
    fallback = "-"
): string {
    if (value == null || isNaN(value)) return fallback;

    return value.toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

/**
 * Format angka menjadi versi ringkas (1K, 1.2M, dsb).
 *
 * @example
 * formatCompact(1500)      // "1,5K"
 * formatCompact(2500000)   // "2,5M"
 * formatCompact(500)       // "500"
 *
 * @param value - Angka yang akan diformat
 * @param fallback - Nilai fallback jika input null/undefined (default: "-")
 * @returns String terformat ringkas
 */
export function formatCompact(
    value?: number | null,
    fallback = "-"
): string {
    if (value == null || isNaN(value)) return fallback;

    return value.toLocaleString("id-ID", { notation: "compact" });
}

/**
 * Clamp angka dalam range tertentu.
 *
 * @example
 * clamp(150, 0, 100)  // 100
 * clamp(-10, 0, 100)  // 0
 * clamp(50, 0, 100)   // 50
 *
 * @param value - Angka yang akan di-clamp
 * @param min - Batas bawah
 * @param max - Batas atas
 * @returns Angka yang sudah di-clamp
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
