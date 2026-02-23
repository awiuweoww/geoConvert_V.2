import { useMemo, useState } from "react";

import { ddToDms, dmsToDd } from "../utils/conversion/coordinateService";
import { type DMS } from "../types/geoTypes";

/**
 * Hook kustom untuk mengelola state dan logika konversi koordinat.
 * Mendukung konversi dua arah antara DMS (Degrees, Minutes, Seconds) dan DD (Decimal Degrees).
 * 
 * @returns 
 * Objek yang berisi state input (`latDms`, `lonDms`, `latDd`, `lonDd`) 
 * dan hasil kalkulasi memoized (`resultDd`, `resultDms`).
 */
export const useCoordinateConverter = () => {
    const [activeTab, setActiveTab] = useState<"DMS2DD" | "DD2DMS">("DMS2DD");

    // State Input
    const [latDms, setLatDms] = useState<DMS>({
        deg: 0,
        min: 0,
        sec: 0,
        dir: "S"
    });
    const [lonDms, setLonDms] = useState<DMS>({
        deg: 0,
        min: 0,
        sec: 0,
        dir: "E"
    });
    const [latDd, setLatDd] = useState<string>("");
    const [lonDd, setLonDd] = useState<string>("");

    // Calculated Results derived from input state
    const resultDd = useMemo(() => {
        return { lat: dmsToDd(latDms), lon: dmsToDd(lonDms) };
    }, [latDms, lonDms]);

    const resultDms = useMemo(() => {
        const numLat = parseFloat(latDd);
        const numLon = parseFloat(lonDd);
        if (!isNaN(numLat) && !isNaN(numLon)) {
            return { lat: ddToDms(numLat, true), lon: ddToDms(numLon, false) };
        }
        return null;
    }, [latDd, lonDd]);

    return {
        activeTab,
        setActiveTab,
        latDms,
        setLatDms,
        lonDms,
        setLonDms,
        latDd,
        setLatDd,
        lonDd,
        setLonDd,
        resultDd,
        resultDms
    };
};
