import React from "react";

import { motion } from "framer-motion";
import { Globe, Languages, Moon, Sun } from "lucide-react";

import { cn } from "../../../utils/cn";

type TabId = "Home" | "Convert" | "Tutorial";

interface NavbarProps {
    /** Status apakah mode gelap aktif. */
    isDark: boolean;
    /** Fungsi untuk mengubah status mode gelap. */
    toggleDark: () => void;
    /** Kode bahasa aktif ("ID" untuk Indonesia, "EN" untuk Inggris). */
    lang: "ID" | "EN";
    /** Fungsi untuk mengubah bahasa aplikasi. */
    toggleLang: () => void;
    /** ID tab yang saat ini aktif. */
    activeTab: TabId;
    /** Fungsi untuk berpindah tab navigasi. */
    setActiveTab: (tab: TabId) => void;
    /** Daftar item navigasi yang akan ditampilkan di menu. */
    navItems: { id: TabId; label: string }[];
}

/**
 * Komponen Navbar - Navigasi utama dengan logo brand, menu, toggle bahasa & dark mode.
 */
const Navbar: React.FC<NavbarProps> = ({
    isDark,
    toggleDark,
    lang,
    toggleLang,
    activeTab,
    setActiveTab,
    navItems
}) => {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-5xl"
        >
            <div
                className={cn(
                    "backdrop-blur-xl border transition-colors duration-200 ease-in-out rounded-full py-3 px-8 flex justify-between items-center shadow-2xl",
                    isDark
                        ? "bg-bg-dark-base/40 border-white/10 shadow-black"
                        : "bg-bg-light-base/80 border-neutral-100 shadow-neutral-200/50"
                )}
            >
                {/* Sisi Kiri: Logo brand */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("Home")}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className={cn(
                            "w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-200",
                            isDark
                                ? "shadow-rose-950/30"
                                : "shadow-rose-200 group-hover:shadow-rose-300"
                        )}
                    >
                        <Globe size={18} />
                    </motion.div>
                    <span
                        className={cn(
                            "text-xl font-bold tracking-tight transition-colors duration-200 ease-in-out",
                            isDark ? "text-white" : "text-neutral-900"
                        )}
                    >
                        Geo
                        <span className="text-brand-red text-glow-red group-hover:brightness-110 transition-colors duration-200 ease-in-out">
                            Convert
                        </span>
                    </span>
                </motion.div>

                {/* Tengah: Menu Navigasi Utama */}
                <div className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "text-sm font-bold transition-colors duration-200 relative",
                                activeTab === item.id
                                    ? "text-brand-red"
                                    : isDark
                                        ? "text-neutral-500 hover:text-white"
                                        : "text-neutral-500 hover:text-neutral-800"
                            )}
                        >
                            {item.label}
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Sisi Kanan: Bahasa dan Toggle Mode */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleLang}
                        className={cn(
                            "flex items-center gap-2 transition-colors duration-200 group",
                            isDark
                                ? "text-neutral-500 hover:text-white"
                                : "text-neutral-500 hover:text-neutral-800"
                        )}
                    >
                        <Languages
                            size={18}
                            className="text-neutral-500 group-hover:text-brand-red transition-colors"
                        />
                        <span className="text-sm font-bold tracking-tight">
                            {lang}
                        </span>
                    </button>

                    <button
                        onClick={toggleDark}
                        className={cn(
                            "hover:text-brand-red transition-colors duration-200",
                            isDark ? "text-white" : "text-gray-400"
                        )}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
