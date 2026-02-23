/**
 * Utility untuk membungkus Promise dengan kontrol minimum durasi dan timeout.
 *
 * Digunakan untuk:
 * 1. **Minimum duration** — Memastikan loading state tampil cukup lama agar
 *    tidak terasa "flicker" (misal spinner muncul hanya 50ms lalu hilang).
 * 2. **Timeout protection** — Mencegah Promise yang hang selamanya.
 *
 * @example
 * // Pastikan loading spinner tampil minimal 300ms
 * const data = await withTimeout(coordinateClient.getPoints({}));
 *
 * // Custom minimum duration 500ms
 * const data = await withTimeout(coordinateClient.savePoint(req), 500);
 *
 * // Dengan timeout 10 detik (gagal jika server tidak merespons)
 * const data = await withTimeout(fetch("/api/data"), 300, 10000);
 *
 * @module withTimeout
 */

/**
 * Membungkus sebuah Promise agar:
 * - Resolve/reject tertunda sampai `minDurationMs` tercapai (anti-flicker).
 * - Otomatis reject jika melebihi `timeoutMs` (timeout protection).
 *
 * @typeParam T - Tipe return value dari Promise
 * @param promise - Promise yang akan dibungkus
 * @param minDurationMs - Durasi minimum sebelum resolve/reject (default: 300ms)
 * @param timeoutMs - Batas waktu maksimum sebelum reject dengan error Timeout (default: 15000ms / 15 detik)
 * @returns Promise yang resolve/reject setelah durasi minimum tercapai
 * @throws {Error} "Timeout" jika melebihi timeoutMs
 */
export const withTimeout = <T>(
    promise: Promise<T>,
    minDurationMs = 300,
    timeoutMs = 15_000
): Promise<T> => {
    const start = Date.now();

    return new Promise<T>((resolve, reject) => {
        let settled = false;

        /**
         * Menunggu sisa waktu minimum sebelum menjalankan callback.
         * Jika durasi minimum sudah tercapai, langsung jalankan.
         */
        const settleAfterMinDuration = (callback: () => void): void => {
            const elapsed = Date.now() - start;
            const remaining = minDurationMs - elapsed;

            if (remaining > 0) {
                setTimeout(callback, remaining);
            } else {
                callback();
            }
        };

        // Handle resolve
        promise
            .then((value) => {
                if (settled) return;
                settled = true;
                settleAfterMinDuration(() => resolve(value));
            })
            .catch((error: unknown) => {
                if (settled) return;
                settled = true;

                const normalized =
                    error instanceof Error ? error : new Error(String(error));
                settleAfterMinDuration(() => reject(normalized));
            });

        // Timeout enforcement
        setTimeout(() => {
            if (!settled) {
                settled = true;
                reject(new Error("Timeout"));
            }
        }, timeoutMs);
    });
};

export default withTimeout;
