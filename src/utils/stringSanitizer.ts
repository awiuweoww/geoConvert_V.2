/**
 * String sanitization utilities untuk proyek GeoConvert.
 *
 * Mencakup:
 * - Sanitasi input umum (XSS prevention)
 * - Sanitasi input numerik (koordinat, DMS)
 * - Normalisasi whitespace
 * - Truncation untuk tampilan
 *
 * @module stringSanitizer
 */

/**
 * Menghapus tag HTML dan script dari string untuk mencegah XSS.
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>') // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 * escapeHtml('Hello & "World"')               // "Hello &amp; &quot;World&quot;"
 *
 * @param input - String yang akan di-escape
 * @returns String yang aman untuk ditampilkan di HTML
 */
export function escapeHtml(input: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };

    return input.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

/**
 * Membersihkan input string dari karakter berbahaya.
 * Menghapus tag HTML, trim whitespace, dan normalisasi spasi.
 *
 * @example
 * sanitize("  Hello   <b>World</b>  ") // "Hello World"
 * sanitize(undefined)                  // ""
 *
 * @param input - String yang akan disanitasi
 * @returns String yang sudah bersih
 */
export function sanitize(input?: string | null): string {
    if (input == null) return "";

    return input
        .replace(/<[^>]*>/g, "") // Hapus semua HTML tags
        .replace(/\s+/g, " ") // Normalisasi multiple spaces
        .trim();
}

/**
 * Sanitasi input numerik — hanya izinkan angka, titik desimal, dan tanda minus.
 * Cocok untuk input koordinat latitude/longitude.
 *
 * @example
 * sanitizeNumeric("  -6.abc917  ")   // "-6.917"
 * sanitizeNumeric("12°34'56\"")      // "123456"
 * sanitizeNumeric("--6..917")        // "-6.917"
 * sanitizeNumeric(undefined)         // ""
 *
 * @param input - String input dari user
 * @returns String yang hanya berisi karakter numerik valid
 */
export function sanitizeNumeric(input?: string | null): string {
    if (input == null) return "";

    // Hapus semua kecuali angka, titik, dan minus
    let cleaned = input.replace(/[^0-9.\-]/g, "");

    // Handle multiple minus — hanya izinkan di awal
    const isNegative = cleaned.startsWith("-");
    cleaned = cleaned.replace(/-/g, "");
    if (isNegative) cleaned = "-" + cleaned;

    // Handle multiple dots — hanya ambil yang pertama
    const parts = cleaned.split(".");
    if (parts.length > 2) {
        cleaned = parts[0] + "." + parts.slice(1).join("");
    }

    return cleaned;
}

/**
 * Sanitasi input integer — hanya izinkan angka bulat positif.
 * Cocok untuk input degrees dan minutes di DMS.
 *
 * @example
 * sanitizeInteger("12.5abc")  // "12"
 * sanitizeInteger("-6")       // "6"
 * sanitizeInteger(undefined)  // ""
 *
 * @param input - String input dari user
 * @returns String yang hanya berisi digit
 */
export function sanitizeInteger(input?: string | null): string {
    if (input == null) return "";

    return input.replace(/\D/g, "");
}

/**
 * Memotong string jika melebihi panjang tertentu, dengan suffix ellipsis.
 *
 * @example
 * truncate("Koordinat sangat panjang sekali", 20) // "Koordinat sangat pan…"
 * truncate("Pendek", 20)                          // "Pendek"
 *
 * @param input - String yang akan dipotong
 * @param maxLength - Panjang maksimum (default: 50)
 * @param suffix - Karakter penanda potongan (default: "…")
 * @returns String yang sudah dipotong jika perlu
 */
export function truncate(
    input: string,
    maxLength = 50,
    suffix = "…"
): string {
    if (input.length <= maxLength) return input;

    return input.slice(0, maxLength) + suffix;
}

/**
 * Normalisasi whitespace — collapse multiple spaces, trim, dan hapus line breaks.
 *
 * @example
 * normalizeWhitespace("  Hello \n  World  ") // "Hello World"
 *
 * @param input - String yang akan dinormalisasi
 * @returns String dengan whitespace yang sudah dinormalisasi
 */
export function normalizeWhitespace(input: string): string {
    return input.replace(/\s+/g, " ").trim();
}

/**
 * Sanitasi input koordinat — parse string menjadi number yang valid.
 * Mengembalikan `NaN` jika input tidak bisa di-parse.
 *
 * @example
 * sanitizeCoordinate("  -6.917  ")     // -6.917
 * sanitizeCoordinate("abc")            // NaN
 * sanitizeCoordinate("106.845")        // 106.845
 *
 * @param input - String input koordinat
 * @returns Number atau NaN jika tidak valid
 */
export function sanitizeCoordinate(input?: string | null): number {
    if (input == null) return NaN;

    const cleaned = sanitizeNumeric(input);

    if (cleaned === "" || cleaned === "-" || cleaned === ".") return NaN;

    return parseFloat(cleaned);
}

/**
 * Validasi apakah nilai latitude valid (-90 sampai 90).
 *
 * @param value - Nilai latitude
 * @returns true jika valid
 */
export function isValidLatitude(value: number): boolean {
    return !isNaN(value) && value >= -90 && value <= 90;
}

/**
 * Validasi apakah nilai longitude valid (-180 sampai 180).
 *
 * @param value - Nilai longitude
 * @returns true jika valid
 */
export function isValidLongitude(value: number): boolean {
    return !isNaN(value) && value >= -180 && value <= 180;
}

/**
 * Sanitasi dan validasi input koordinat sekaligus.
 * Mengembalikan `null` jika tidak valid.
 *
 * @example
 * parseAndValidateCoordinate("-6.917", "lat")  // -6.917
 * parseAndValidateCoordinate("999", "lat")     // null (di luar range)
 * parseAndValidateCoordinate("abc", "lon")     // null (bukan angka)
 *
 * @param input - String input
 * @param type - Tipe koordinat: "lat" atau "lon"
 * @returns Number yang valid atau null
 */
export function parseAndValidateCoordinate(
    input: string | null | undefined,
    type: "lat" | "lon"
): number | null {
    const value = sanitizeCoordinate(input);

    if (isNaN(value)) return null;

    const isValid =
        type === "lat" ? isValidLatitude(value) : isValidLongitude(value);

    return isValid ? value : null;
}
