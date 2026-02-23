import React from "react";

import { motion } from "framer-motion";
import { Crosshair, Minus, Plus, Trash2 } from "lucide-react";
import { fromLonLat } from "ol/proj";

import { cn } from "../../../utils/cn";
import TooltipHover from "../../../common/tooltip-hover/TooltipHover";

interface FloatingControlsProps {
    isDark: boolean;
    mapRef: React.MutableRefObject<any>;
    clearAllPoints: () => void;
}

/**
 * Komponen FloatingControls - Kontrol peta (zoom in/out, reset, hapus semua).
 * Menggunakan komponen TooltipHover standar dari common utils.
 */
const FloatingControls: React.FC<FloatingControlsProps> = ({
    isDark,
    mapRef,
    clearAllPoints
}) => {
    const handleZoomIn = () => {
        mapRef.current?.getView().animate({
            zoom: (mapRef.current?.getView().getZoom() || 0) + 1,
            duration: 250
        });
    };

    const handleZoomOut = () => {
        mapRef.current?.getView().animate({
            zoom: (mapRef.current?.getView().getZoom() || 0) - 1,
            duration: 250
        });
    };

    const handleResetView = () => {
        mapRef.current?.getView().animate({
            center: fromLonLat([107.824969, -6.282392]),
            zoom: 13,
            duration: 1000
        });
    };

    const controlBtnClass = cn(
        "p-3 rounded-xl border shadow-lg transition-all active:scale-90",
        isDark
            ? "bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800"
            : "bg-white border-neutral-100 text-neutral-700 hover:bg-neutral-50"
    );

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute right-6 bottom-32 flex flex-col gap-3 z-10"
        >
            <TooltipHover tooltipsText="Zoom In" position="left">
                <button onClick={handleZoomIn} className={controlBtnClass}>
                    <Plus size={20} />
                </button>
            </TooltipHover>

            <TooltipHover tooltipsText="Zoom Out" position="left">
                <button onClick={handleZoomOut} className={controlBtnClass}>
                    <Minus size={20} />
                </button>
            </TooltipHover>

            <TooltipHover tooltipsText="Kembali ke Titik Tengah" position="left">
                <button onClick={handleResetView} className={controlBtnClass}>
                    <Crosshair size={20} />
                </button>
            </TooltipHover>

            <TooltipHover tooltipsText="Hapus Semua Data" position="left">
                <button
                    onClick={clearAllPoints}
                    className={cn(controlBtnClass, "text-brand-red")}
                >
                    <Trash2 size={20} />
                </button>
            </TooltipHover>
        </motion.div>
    );
};

export default FloatingControls;
