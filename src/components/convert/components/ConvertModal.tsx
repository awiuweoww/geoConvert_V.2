import React from "react";

import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";

import { type DMS } from "../../../types/geoTypes";
import { translations as convertTranslations } from "../../../constants/convertTranslations";
import { cn } from "../../../utils/cn";
import { formatDmsString } from "../../../utils/conversion/coordinateService";
import { formatCoordinate } from "../../../utils/formatNumber";
import Modal from "../../../common/modal/Modal";
import { Button } from "../../../common/button/Button";

// ─── Sub-Components (internal) ──────────────────────────────────────────────

/** Input group untuk Decimal Degrees (latitude / longitude). */
const DdInputGroup: React.FC<{
    isDark: boolean;
    label: string;
    value: string;
    placeholder: string;
    onChange: (val: string) => void;
}> = ({ isDark, label, value, placeholder, onChange }) => (
    <div className="flex items-center gap-3">
        <span className="w-8 text-[11px] font-bold text-neutral-500">{label}</span>
        <input
            type="number"
            step="any"
            placeholder={placeholder}
            className={cn(
                "flex-1 p-3.5 rounded-full border text-sm focus:ring-1 focus:ring-brand-red outline-none transition-all",
                isDark ? "bg-bg-dark-raised border-neutral-800 text-white" : "bg-neutral-50 text-neutral-900"
            )}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

/** Input group untuk Degrees / Minutes / Seconds + Direction toggle. */
const DmsInputGroup: React.FC<{
    isDark: boolean;
    label: string;
    value: DMS;
    onChange: (val: DMS) => void;
}> = ({ isDark, label, value, onChange }) => {
    const handleDirToggle = () => {
        const isLat = label.toLowerCase().includes("lat");
        const nextDir = isLat
            ? value.dir === "N" ? "S" : "N"
            : value.dir === "E" ? "W" : "E";
        onChange({ ...value, dir: nextDir as any });
    };

    const inputClass = cn(
        "w-full p-3 text-center rounded-full border text-sm focus:ring-1 focus:ring-brand-red outline-none transition-all",
        isDark ? "bg-bg-dark-raised border-neutral-800 text-white" : "bg-neutral-50 text-neutral-900"
    );

    return (
        <div className="flex items-center gap-3">
            <span className="w-8 text-[11px] font-bold text-neutral-500">{label}</span>
            <div className="flex-1 flex gap-2">
                <input type="number" placeholder="Deg" className={inputClass}
                    value={value.deg || ""} onChange={(e) => onChange({ ...value, deg: Number(e.target.value) })} />
                <input type="number" placeholder="Min" className={inputClass}
                    value={value.min || ""} onChange={(e) => onChange({ ...value, min: Number(e.target.value) })} />
                <input type="number" placeholder="Sec" className={inputClass}
                    value={value.sec || ""} onChange={(e) => onChange({ ...value, sec: Number(e.target.value) })} />
                <button onClick={handleDirToggle}
                    className={cn(
                        "w-14 p-3 rounded-full border text-xs font-bold transition-all active:scale-95 hover:text-brand-red",
                        isDark ? "bg-bg-dark-raised border-neutral-800 text-white hover:bg-neutral-800" : "bg-neutral-50 text-neutral-900 hover:bg-neutral-100"
                    )}
                >
                    {value.dir}
                </button>
            </div>
        </div>
    );
};

/** Panel hasil konversi (read-only). */
const ResultPanel: React.FC<{
    isDark: boolean;
    activeTab: "DMS2DD" | "DD2DMS";
    resultDd: { lat: number; lon: number } | null;
    resultDms: { lat: DMS; lon: DMS } | null;
}> = ({ isDark, activeTab, resultDd, resultDms }) => {
    const fmt = (type: "lat" | "lon") =>
        activeTab === "DMS2DD"
            ? resultDd ? formatCoordinate(resultDd[type]) : "-"
            : resultDms ? formatDmsString(resultDms[type]) : "-";

    const fieldClass = cn(
        "flex-1 p-3.5 rounded-full border font-mono text-sm",
        isDark ? "bg-neutral-900/30 border-neutral-900 text-white" : "bg-neutral-50 text-neutral-900"
    );

    return (
        <div className="space-y-4">
            {(["lat", "lon"] as const).map((type) => (
                <div key={type} className="flex items-center gap-3">
                    <span className="w-20 text-[11px] font-bold text-neutral-500">
                        {type === "lat" ? "Latitude" : "Longitude"}
                    </span>
                    <div className={fieldClass}>{fmt(type)}</div>
                </div>
            ))}
        </div>
    );
};

/** Overlay konfirmasi sebelum pin ditambahkan ke peta. */
const ConfirmOverlay: React.FC<{
    show: boolean;
    isDark: boolean;
    t: any;
    onCancel: () => void;
    onConfirm: () => void;
}> = ({ show, isDark, t, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-8"
        >
            <div className={cn("absolute inset-0 rounded-[2.5rem]", isDark ? "bg-bg-dark-base/95" : "bg-white/95")} />
            <div className="relative text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-brand-red/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-brand-red">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className={cn("text-xl font-black", isDark ? "text-white" : "text-neutral-900")}>
                        {t.confirmTitle}
                    </h3>
                    <p className={cn("text-sm font-medium", isDark ? "text-neutral-500" : "text-neutral-400")}>
                        {t.confirmDesc}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" color="neutral" onClick={onCancel} fullWidth
                        className="h-12 rounded-xl text-xs uppercase tracking-widest">
                        {t.btnCancel}
                    </Button>
                    <Button onClick={onConfirm} fullWidth
                        className="h-12 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-brand-red/30">
                        {t.btnConfirm}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Main Component ─────────────────────────────────────────────────────────

interface ConvertModalProps {
    isOpen: boolean;
    onClose: () => void;
    isDark: boolean;
    lang: "ID" | "EN";
    activeTab: "DMS2DD" | "DD2DMS";
    setActiveTab: (tab: "DMS2DD" | "DD2DMS") => void;
    latDms: DMS;
    setLatDms: (dms: DMS) => void;
    lonDms: DMS;
    setLonDms: (dms: DMS) => void;
    latDd: string;
    setLatDd: (val: string) => void;
    lonDd: string;
    setLonDd: (val: string) => void;
    resultDd: { lat: number; lon: number } | null;
    resultDms: { lat: DMS; lon: DMS } | null;
    showConfirm: boolean;
    setShowConfirm: (show: boolean) => void;
    handleConfirmPin: () => void;
}

/**
 * Komponen Modal utama untuk konversi koordinat.
 * Menggabungkan input DMS/DD, result panel, dan confirm overlay dalam satu file.
 * Menggunakan common Modal sebagai wrapper.
 */
const ConvertModal: React.FC<ConvertModalProps> = ({
    isOpen,
    onClose,
    isDark,
    lang,
    activeTab,
    setActiveTab,
    latDms, setLatDms,
    lonDms, setLonDms,
    latDd, setLatDd,
    lonDd, setLonDd,
    resultDd, resultDms,
    showConfirm, setShowConfirm,
    handleConfirmPin
}) => {
    const t = convertTranslations[lang];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            className={cn(
                "rounded-[2.5rem] overflow-visible",
                isDark ? "bg-bg-dark-base border-neutral-800 shadow-black" : "bg-white border-neutral-100"
            )}
        >
            {/* Confirm overlay (absolute positioned inside modal) */}
            <ConfirmOverlay
                show={showConfirm}
                isDark={isDark}
                t={t}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirmPin}
            />

            {/* Modal Title */}
            <h2 className={cn("text-xl font-black tracking-tight mb-4", isDark ? "text-white" : "text-neutral-900")}>
                {t.modalTitle}
            </h2>

            {/* Tab Switcher */}
            <div className={cn("flex p-1 rounded-full mb-5", isDark ? "bg-bg-dark-raised" : "bg-neutral-100")}>
                {(["DMS2DD", "DD2DMS"] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all",
                            activeTab === tab
                                ? isDark ? "bg-bg-dark-base text-white shadow-lg" : "bg-white text-neutral-900 shadow-sm"
                                : isDark ? "text-neutral-500 hover:text-neutral-300" : "text-neutral-500 hover:text-neutral-700"
                        )}
                    >
                        {tab === "DMS2DD" ? "DMS to DD" : "DD to DMS"}
                    </button>
                ))}
            </div>

            {/* Input Section */}
            <div className="space-y-5">
                <div>
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.15em] px-1", isDark ? "text-neutral-500" : "text-neutral-400")}>
                        {t.from} ({activeTab === "DMS2DD" ? "DMS" : "DD"})
                    </span>
                    <div className="space-y-3 mt-1.5">
                        {activeTab === "DMS2DD" ? (
                            <>
                                <DmsInputGroup isDark={isDark} label={t.placeholderLat} value={latDms} onChange={setLatDms} />
                                <DmsInputGroup isDark={isDark} label={t.placeholderLon} value={lonDms} onChange={setLonDms} />
                            </>
                        ) : (
                            <>
                                <DdInputGroup isDark={isDark} label={t.placeholderLat} value={latDd} placeholder="-6.2088" onChange={setLatDd} />
                                <DdInputGroup isDark={isDark} label={t.placeholderLon} value={lonDd} placeholder="106.8456" onChange={setLonDd} />
                            </>
                        )}
                    </div>
                </div>

                {/* Divider with icon */}
                <div className="relative flex justify-center py-6 h-4">
                    <div className={cn("absolute top-1/2 left-0 right-0 h-[1px]", isDark ? "bg-neutral-900" : "bg-neutral-100")} />
                    <div className={cn("relative z-10 w-8 h-8 rounded-full border flex items-center justify-center text-brand-red",
                        isDark ? "bg-bg-dark-base border-neutral-800" : "bg-white")}>
                        <ArrowDownUp size={14} strokeWidth={3} />
                    </div>
                </div>

                {/* Output Section */}
                <div>
                    <span className={cn("text-[10px] font-black uppercase tracking-[0.15em] px-1", isDark ? "text-neutral-500" : "text-neutral-400")}>
                        {t.to} ({activeTab === "DMS2DD" ? "DD" : "DMS"})
                    </span>
                    <div className="mt-1.5">
                        <ResultPanel isDark={isDark} activeTab={activeTab} resultDd={resultDd} resultDms={resultDms} />
                    </div>
                </div>

                {/* Save Button */}
                <Button fullWidth size="lg" onClick={() => setShowConfirm(true)}
                    className="rounded-2xl shadow-xl shadow-rose-500/20 text-xs font-black uppercase tracking-[0.2em] mt-4">
                    {t.btnSave}
                </Button>
            </div>
        </Modal>
    );
};

export default ConvertModal;
