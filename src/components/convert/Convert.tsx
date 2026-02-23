import React, { useEffect, useState } from "react";

import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { AnimatePresence, motion } from "framer-motion";
import { History, MousePointer2, RefreshCw } from "lucide-react";

import ConvertModal from "./components/ConvertModal";
import FloatingControls from "./components/FloatingControls";
import SavedPointsListModal from "./components/SavedPointsListModal";
import { coordinateClient, type PointData } from "../../utils/api/coordinate/coordinateGrpcClient";
import { translations as convertTranslations } from "../../constants/convertTranslations";
import { useCoordinateConverter } from "../../hooks/useCoordinateConverter";
import { useMapLogic } from "../../hooks/useMapLogic";
import type { SavedPoint } from "../../types/geoTypes";
import { cn } from "../../utils/cn";
import { Button } from "../../common/button/Button";

// ─── Inline Sub-Components ──────────────────────────────────────────────────

/** Tooltip bantuan klik peta (atas tengah peta). */
const InfoHelper: React.FC<{ isDark: boolean; helperText: string; clickCount: number }> = ({
	isDark, helperText, clickCount
}) => (
	<div className={cn(
		"absolute top-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border flex items-center gap-3 shadow-xl z-10 backdrop-blur-md transition-all",
		isDark ? "bg-neutral-900/60 border-neutral-800 text-neutral-400" : "bg-white/60 border-neutral-100 text-neutral-500"
	)}>
		<MousePointer2 size={14} className="text-brand-red" />
		<span className="text-[10px] font-black uppercase tracking-[0.2em]">{helperText}</span>
		{clickCount > 0 && (
			<div className="flex gap-1 ml-1">
				{[0, 1, 2].map((i) => (
					<div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-colors", i < clickCount ? "bg-brand-red" : "bg-neutral-700")} />
				))}
			</div>
		)}
	</div>
);

/** Badge jumlah titik tersimpan (kiri bawah peta). */
const SavedPointsBadge: React.FC<{ isDark: boolean; count: number; label: string; onClick?: () => void }> = ({
	isDark, count, label, onClick
}) => {
	if (count === 0) return null;
	return (
		<button onClick={onClick} className={cn(
			"absolute left-6 bottom-10 px-4 py-2 rounded-full border flex items-center gap-2 shadow-lg z-10 transition-transform active:scale-95",
			isDark ? "bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800" : "bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50"
		)}>
			<History size={14} />
			<span className="text-[10px] font-black uppercase tracking-widest">{count} {label}</span>
		</button>
	);
};

// ─── Main Component ─────────────────────────────────────────────────────────

/**
 * Komponen Convert - Menampilkan peta interaktif dengan fitur konversi,
 * penyimpanan titik ke database, dan interaksi klik peta.
 */
const Convert: React.FC<{
	isDark: boolean;
	hideUI?: boolean;
	lang: "ID" | "EN";
}> = ({ isDark, hideUI = false, lang }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isListModalOpen, setIsListModalOpen] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [savedPoints, setSavedPoints] = useState<SavedPoint[]>([]);

	useEffect(() => {
		const fetchInitialPoints = async () => {
			try {
				const response = await coordinateClient.getPoints({});
				const pointsFromDb = response.points.map((p: PointData) => ({
					id: p.id.toString(),
					lat: p.latitude,
					lon: p.longitude,
					timestamp: new Date(p.createdAt).getTime(),
					type: "DD" as const
				}));
				setSavedPoints(pointsFromDb);
			} catch (error) {
				console.error("Gagal mengambil data awal:", error);
			}
		};
		fetchInitialPoints();
	}, []);

	const t = convertTranslations[lang];

	const {
		activeTab, setActiveTab,
		latDms, setLatDms,
		lonDms, setLonDms,
		latDd, setLatDd,
		lonDd, setLonDd,
		resultDd, resultDms
	} = useCoordinateConverter();

	const { mapElement, mapRef, vectorSourceRef, clickCount } = useMapLogic(
		isDark, savedPoints, setLatDd, setLonDd, setLatDms, setLonDms, setActiveTab, setIsModalOpen
	);

	const handleConfirmPin = async () => {
		let lat, lon;
		if (activeTab === "DMS2DD" && resultDd) {
			lat = resultDd.lat;
			lon = resultDd.lon;
		} else if (activeTab === "DD2DMS") {
			lat = parseFloat(latDd);
			lon = parseFloat(lonDd);
		}

		if (lat !== undefined && lon !== undefined && !isNaN(lat) && !isNaN(lon)) {
			try {
				const response = await coordinateClient.savePoint({ latitude: lat, longitude: lon });
				if (response.point) {
					const newPoint: SavedPoint = {
						id: response.point.id.toString(),
						lat, lon,
						timestamp: response.point.createdAt as any, // Simpan string tanggal langsung
						type: activeTab === "DMS2DD" ? "DMS" : "DD"
					};
					setSavedPoints([...savedPoints, newPoint]);

					const feature = new Feature({ geometry: new Point(fromLonLat([lon, lat])) });
					vectorSourceRef.current.addFeature(feature);
					mapRef.current?.getView().animate({ center: fromLonLat([lon, lat]), zoom: 16, duration: 1000 });

					setShowConfirm(false);
					setIsModalOpen(false);
				}
			} catch (error) {
				console.error("Failed to save point to database:", error);
				alert("Gagal menyimpan ke database. Pastikan server backend berjalan.");
			}
		}
	};

	const clearAllPoints = async () => {
		if (window.confirm(t.clearConfirm)) {
			try {
				await coordinateClient.deleteAllPoints({});
				vectorSourceRef.current.clear();
				setSavedPoints([]);
				alert("Semua data berhasil dihapus dari database dan peta.");
			} catch (error) {
				console.error("Gagal menghapus semua data:", error);
				alert("Gagal menghapus data dari database.");
			}
		}
	};

	const handlePointDeleted = (id: number) => {
		setSavedPoints((prev) => prev.filter((p) => p.id !== id.toString()));
	};

	return (
		<div className={cn("relative w-full h-full overflow-hidden transition-colors duration-300", isDark ? "bg-bg-dark-base" : "bg-neutral-100")}>
			<div ref={mapElement} className="absolute inset-0 z-0 w-full h-full cursor-crosshair transition-all duration-700 scale-100" />

			{!hideUI && (
				<>
					<FloatingControls isDark={isDark} mapRef={mapRef} clearAllPoints={clearAllPoints} />

					<motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute right-6 bottom-10 z-20">
						<Button size="lg" onClick={() => setIsModalOpen(true)} className="rounded-2xl shadow-2xl gap-3">
							<RefreshCw size={20} />
							Convert
						</Button>
					</motion.div>

					<InfoHelper isDark={isDark} helperText={t.helper} clickCount={clickCount} />
					<SavedPointsBadge isDark={isDark} count={savedPoints.length} label={t.savedPoints} onClick={() => setIsListModalOpen(true)} />
				</>
			)}

			<AnimatePresence>
				{isModalOpen && (
					<ConvertModal
						isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
						isDark={isDark} lang={lang}
						activeTab={activeTab} setActiveTab={setActiveTab}
						latDms={latDms} setLatDms={setLatDms}
						lonDms={lonDms} setLonDms={setLonDms}
						latDd={latDd} setLatDd={setLatDd}
						lonDd={lonDd} setLonDd={setLonDd}
						resultDd={resultDd} resultDms={resultDms}
						showConfirm={showConfirm} setShowConfirm={setShowConfirm}
						handleConfirmPin={handleConfirmPin}
					/>
				)}
			</AnimatePresence>

			<SavedPointsListModal
				isOpen={isListModalOpen} onClose={() => setIsListModalOpen(false)}
				isDark={isDark} onPointDeleted={handlePointDeleted}
			/>
		</div>
	);
};

export default Convert;
