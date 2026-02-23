/**
 * Utility untuk format tanggal dan waktu.
 *
 * Mendukung input berupa:
 * - Epoch milliseconds (number)
 * - Date string (string)
 * - Date object
 *
 * @module formatDate
 */

type DateInput = number | string | Date | undefined | null;

/**
 * Format tanggal menjadi string dengan format: "HH:mm DD MMM YYYY"
 *
 * @example
 * formatDate(1698393600000)       // "10:00 27 Oct 2023"
 * formatDate("2023-10-27T10:00") // "10:00 27 Oct 2023"
 * formatDate(new Date())         // "14:00 16 Feb 2026"
 *
 * @param input - Epoch ms, date string, atau Date object
 * @returns String terformat atau empty string jika input tidak valid
 */
export function formatDate(input?: DateInput): string {
    if (input == null) return "";

    const date = input instanceof Date ? input : new Date(input);

    if (isNaN(date.getTime())) return "";

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day} ${month} ${year}`;
}

/**
 * Format tanggal menjadi string pendek tanpa waktu: "DD MMM YYYY"
 *
 * @example
 * formatDateShort(1698393600000) // "27 Oct 2023"
 *
 * @param input - Epoch ms, date string, atau Date object
 * @returns String terformat atau empty string jika input tidak valid
 */
export function formatDateShort(input?: DateInput): string {
    if (input == null) return "";

    const date = input instanceof Date ? input : new Date(input);

    if (isNaN(date.getTime())) return "";

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

/**
 * Format waktu saja: "HH:mm"
 *
 * @example
 * formatTime(1698393600000) // "10:00"
 *
 * @param input - Epoch ms, date string, atau Date object
 * @returns String terformat atau empty string jika input tidak valid
 */
export function formatTime(input?: DateInput): string {
    if (input == null) return "";

    const date = input instanceof Date ? input : new Date(input);

    if (isNaN(date.getTime())) return "";

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
}

/**
 * Format tanggal menjadi format relatif (e.g., "2 menit lalu", "1 jam lalu").
 * Cocok untuk tampilan di tabel atau notifikasi.
 *
 * @example
 * formatRelative(Date.now() - 30000)   // "30 detik lalu"
 * formatRelative(Date.now() - 3600000) // "1 jam lalu"
 *
 * @param input - Epoch ms, date string, atau Date object
 * @returns String relatif atau empty string jika input tidak valid
 */
export function formatRelative(input?: DateInput): string {
    if (input == null) return "";

    const date = input instanceof Date ? input : new Date(input);

    if (isNaN(date.getTime())) return "";

    const now = Date.now();
    const diffMs = now - date.getTime();

    // Jika di masa depan, tampilkan tanggal biasa
    if (diffMs < 0) return formatDate(date);

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} detik lalu`;
    if (minutes < 60) return `${minutes} menit lalu`;
    if (hours < 24) return `${hours} jam lalu`;
    if (days < 7) return `${days} hari lalu`;

    // Lebih dari 7 hari, tampilkan tanggal biasa
    return formatDate(date);
}
