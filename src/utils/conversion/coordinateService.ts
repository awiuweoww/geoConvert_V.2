import { type DMS } from "../../types/geoTypes";

/**
 * Mengkonversi Degrees Minutes Seconds (DMS) ke Decimal Degrees (DD).
 *
 * @param dms - Objek koordinat DMS yang berisi deg, min, sec, dan dir.
 * @returns Nilai koordinat dalam format desimal (max 6 angka dibelakang koma).
 * 
 * @example
 * ```ts
 * const dd = dmsToDd({ deg: 106, min: 48, sec: 0, dir: 'E' }); // 106.8
 * ```
 */
export const dmsToDd = (dms: DMS): number => {
	let dd = dms.deg + dms.min / 60 + dms.sec / 3600;
	if (dms.dir === "S" || dms.dir === "W") {
		dd = dd * -1;
	}
	return parseFloat(dd.toFixed(6));
};

/**
 * Mengkonversi Decimal Degrees (DD) ke Degrees Minutes Seconds (DMS).
 *
 * @param dd - Nilai koordinat dalam format desimal.
 * @param isLat - Flag untuk menentukan apakah ini Latitude (N/S) atau Longitude (E/W).
 * @returns Objek koordinat dalam format DMS.
 * 
 * @example
 * ```ts
 * const dms = ddToDms(-6.2, true); // { deg: 6, min: 12, sec: 0, dir: 'S' }
 * ```
 */
export const ddToDms = (dd: number, isLat: boolean): DMS => {
	const absolute = Math.abs(dd);
	const deg = Math.floor(absolute);
	const minFloat = (absolute - deg) * 60;
	const min = Math.floor(minFloat);
	const sec = parseFloat(((minFloat - min) * 60).toFixed(2));

	let dir: "N" | "S" | "E" | "W";
	if (isLat) {
		dir = dd >= 0 ? "N" : "S";
	} else {
		dir = dd >= 0 ? "E" : "W";
	}

	return { deg, min, sec, dir };
};

/**
 * Format DMS object menjadi string yang mudah dibaca.
 * Contoh: 6° 54' 53" S
 * @param dms
 */
export const formatDmsString = (dms: DMS): string => {
	return `${dms.deg}° ${dms.min}' ${dms.sec}" ${dms.dir}`;
};
