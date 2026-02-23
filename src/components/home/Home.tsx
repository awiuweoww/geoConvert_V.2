import React, { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import Convert from "../convert/Convert";
import Tutorial from "../tutorial/Tutorial";
import BackgroundOverlays from "./components/BackgroundOverlays";
import HomeHero from "./components/HomeHero";
import Navbar from "./components/Navbar";
import { translations as homeTranslations } from "../../constants/homeTranslations";
import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../utils/cn";

type TabId = "Home" | "Convert" | "Tutorial";

/**
 * Komponen Home - Halaman utama aplikasi GeoConvert.
 * Peta OpenLayers sekarang menjadi latar belakang tetap yang menyatu di seluruh aplikasi.
 * Komponen ini mengatur state global untuk bahasa dan navigasi tab antar view.
 */
const Home: React.FC = () => {
	const { isDark, toggleDark } = useTheme();
	/** State bahasa yang dipersist ke LocalStorage. */
	const [lang, setLang] = useState<"ID" | "EN">(() => {
		const storedLang = localStorage.getItem("lang");
		return storedLang === "ID" || storedLang === "EN" ? storedLang : "ID";
	});
	/** State tab aktif untuk menentukan konten overlay yang ditampilkan. */
	const [activeTab, setActiveTab] = useState<TabId>("Home");

	useEffect(() => {
		localStorage.setItem("lang", lang);
	}, [lang]);

	const t = homeTranslations[lang];

	const navItems: { id: TabId; label: string }[] = [
		{ id: "Home", label: t.nav.home },
		{ id: "Convert", label: t.nav.convert },
		{ id: "Tutorial", label: t.nav.tutorial }
	];

	return (
		<div
			className={cn(
				"relative min-h-screen w-full flex flex-col transition-colors duration-200 ease-in-out selection:bg-rose-100 selection:text-brand-red",
				isDark
					? "bg-bg-dark-base text-zinc-100"
					: "bg-bg-light-base text-gray-900"
			)}
		>
			{/* Latar Belakang Peta Interaktif Permanen */}
			<div className="fixed inset-0 z-0">
				<Convert isDark={isDark} hideUI={activeTab !== "Convert"} lang={lang} />
			</div>

			<Navbar
				isDark={isDark}
				toggleDark={toggleDark}
				lang={lang}
				toggleLang={() => setLang(lang === "ID" ? "EN" : "ID")}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				navItems={navItems}
			/>

			<BackgroundOverlays isDark={isDark} activeTab={activeTab} />

			{/* Konten Utama Overlay */}
			<AnimatePresence mode="wait">
				{activeTab === "Home" ? (
					<HomeHero isDark={isDark} t={t} setActiveTab={setActiveTab} />
				) : activeTab === "Convert" ? (
					<motion.div
						key="convert-view"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex-1 pointer-events-none"
					/>
				) : activeTab === "Tutorial" ? (
					<motion.div
						key="tutorial-view"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="flex-1 overflow-y-auto"
					>
						<Tutorial isDark={isDark} lang={lang} />
					</motion.div>
				) : (
					<div className="flex-1" />
				)}
			</AnimatePresence>
		</div>
	);
};

export default Home;
