import { useEffect, useRef, useState } from "react";

import Feature from "ol/Feature";
import Map from "ol/Map";
import View from "ol/View";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat, toLonLat } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";

import { ddToDms } from "../utils/conversion/coordinateService";
import { type DMS, type SavedPoint } from "../types/geoTypes";

/**
 * Hook kustom untuk mengelola inisialisasi dan interaksi peta OpenLayers.
 * Menangani pembuatan peta, marker, event klik, dan sinkronisasi dark mode pada tile.
 *
 * @param {boolean} isDark - Status mode gelap.
 * @param {SavedPoint[]} savedPoints - Daftar titik koordinat yang tersimpan.
 * @param {Function} setLatDd - Fungsi pengubah Latitude DD.
 * @param {Function} setLonDd - Fungsi pengubah Longitude DD.
 * @param {Function} setLatDms - Fungsi pengubah Latitude DMS.
 * @param {Function} setLonDms - Fungsi pengubah Longitude DMS.
 * @param {Function} setActiveTab - Fungsi pengubah tab aktif.
 * @param {Function} setIsModalOpen - Fungsi pembuka modal.
 * @returns {Object} Ref elemen peta dan state jumlah klik.
 */
export const useMapLogic = (
    isDark: boolean,
    savedPoints: SavedPoint[],
    setLatDd: (val: string) => void,
    setLonDd: (val: string) => void,
    setLatDms: (val: DMS) => void,
    setLonDms: (val: DMS) => void,
    setActiveTab: (tab: "DMS2DD" | "DD2DMS") => void,
    setIsModalOpen: (open: boolean) => void
) => {
    const mapElement = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map | null>(null);
    const vectorSourceRef = useRef<VectorSource>(new VectorSource());
    const tileLayerRef = useRef<TileLayer<OSM> | null>(null);

    // State untuk menghitung klik (Combo Click)
    const [clickCount, setClickCount] = useState(0);
    const lastClickTime = useRef<number>(0);

    useEffect(() => {
        if (!mapElement.current) return;

        const tileLayer = new TileLayer({ source: new OSM() });
        tileLayerRef.current = tileLayer;

        const vectorLayer = new VectorLayer({
            source: vectorSourceRef.current,
            style: new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                    scale: 0.1
                })
            })
        });

        // Add existing markers
        vectorSourceRef.current.clear();
        savedPoints.forEach((p) => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([p.lon, p.lat]))
            });
            vectorSourceRef.current.addFeature(feature);
        });

        const initialMap = new Map({
            target: mapElement.current,
            layers: [tileLayer, vectorLayer],
            view: new View({
                center: fromLonLat([107.824969, -6.282392]),
                zoom: 1
            }),
            controls: []
        });

        initialMap.on("click", (event) => {
            const now = Date.now();
            const timeDiff = now - lastClickTime.current;

            setClickCount((prev) => {
                const newCount = timeDiff < 500 ? prev + 1 : 1;

                if (newCount === 3) {
                    const coords = toLonLat(event.coordinate);
                    const lon = coords[0];
                    const lat = coords[1];

                    setLatDd(lat.toFixed(6));
                    setLonDd(lon.toFixed(6));
                    setLatDms(ddToDms(lat, true));
                    setLonDms(ddToDms(lon, false));

                    setActiveTab("DD2DMS");
                    setIsModalOpen(true);

                    return 0;
                }
                return newCount;
            });

            lastClickTime.current = now;
        });

        mapRef.current = initialMap;
        setTimeout(() => initialMap.updateSize(), 500);
        return () => initialMap.setTarget(undefined);
    }, []);

    // update poin untuk savedPoints
    useEffect(() => {
        if (vectorSourceRef.current) {
            vectorSourceRef.current.clear();
            savedPoints.forEach((p) => {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([p.lon, p.lat]))
                });
                vectorSourceRef.current.addFeature(feature);
            });
        }
    }, [savedPoints]);

    // mode gelap untuk tile layer
    useEffect(() => {
        const tileLayer = tileLayerRef.current;
        if (!tileLayer) return;

        const onPrerender = (event: any) => {
            const ctx = event.context;
            if (!ctx) return;
            ctx.save();
            if (isDark)
                ctx.filter =
                    "grayscale(100%) invert(90%) brightness(100%) contrast(90%)";
        };

        const onPostrender = (event: any) => {
            const ctx = event.context;
            if (!ctx) return;
            ctx.restore();
        };

        tileLayer.on("prerender", onPrerender);
        tileLayer.on("postrender", onPostrender);
        mapRef.current?.render();

        return () => {
            tileLayer.un("prerender", onPrerender);
            tileLayer.un("postrender", onPostrender);
        };
    }, [isDark]);

    return { mapElement, mapRef, vectorSourceRef, clickCount };
};
