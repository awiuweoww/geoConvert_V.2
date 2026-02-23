/**
 * Titik Koordinat yang tersimpan.
 */
export interface SavedPoint {
    /** ID unik berbasis timestamp. */
    id: string;
    /** Nilai Latitude dalam format Decimal Degrees. */
    lat: number;
    /** Nilai Longitude dalam format Decimal Degrees. */
    lon: number;
    /** Waktu penyimpanan (millidetik). */
    timestamp: number;
    /** Tipe format input asli. */
    type: "DMS" | "DD";
}

/**
 * Interface untuk koordinat dalam format Degrees Minutes Seconds.
 */
export interface DMS {
    /** Derajat (Degrees). */
    deg: number;
    /** Menit (Minutes). */
    min: number;
    /** Detik (Seconds). */
    sec: number;
    /** Arah (Direction): N, S, E, atau W. */
    dir: "N" | "S" | "E" | "W";
}
