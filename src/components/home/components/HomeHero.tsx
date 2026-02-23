import React from "react";

import { motion } from "framer-motion";
import { BookOpen, MoveRight } from "lucide-react";

import { cn } from "../../../utils/cn";
import { colors } from "../../../utils/color";
import { Button } from "../../../common/button/Button";

import type { translations } from "../../../constants/homeTranslations";

type TabId = "Home" | "Convert" | "Tutorial";
type HomeTranslation = (typeof translations)[keyof typeof translations];

interface HomeHeroProps {
    isDark: boolean;
    t: HomeTranslation;
    setActiveTab: (tab: TabId) => void;
}

/**
 * Komponen HomeHero - Section hero utama di halaman Home.
 * Menampilkan judul, deskripsi animasi, dan CTA buttons.
 */
const HomeHero: React.FC<HomeHeroProps> = ({ isDark, t, setActiveTab }) => {
    return (
        <motion.main
            key="home-hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="relative flex-1 w-full max-w-6xl mx-auto px-6 lg:px-10 flex flex-col justify-center py-20 z-10 pointer-events-none"
        >
            <div className="max-w-xl space-y-8 pointer-events-auto">
                {/* Badge headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors duration-200",
                        isDark
                            ? "bg-bg-dark-base/60 border-white/10"
                            : "bg-bg-light-base/60 border-brand-red/20"
                    )}
                >
                    <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                    <span className="text-[10px] font-bold text-brand-red uppercase tracking-[0.2em]">
                        {t.headline}
                    </span>
                </motion.div>

                {/* Judul utama */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02, x: 15 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="space-y-4 cursor-default group"
                >
                    <h1
                        className={cn(
                            "text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] transition-colors duration-200",
                            isDark ? "text-white" : "text-neutral-900"
                        )}
                    >
                        Geo
                        <span className="text-brand-red text-glow-red group-hover:brightness-125 transition-colors duration-200">
                            Convert
                        </span>
                    </h1>
                    <p
                        className={cn(
                            "text-2xl md:text-3xl font-medium tracking-tight leading-snug transition-colors duration-200",
                            isDark
                                ? "text-neutral-500 group-hover:text-white"
                                : "text-neutral-500 group-hover:text-neutral-900"
                        )}
                    >
                        {t.subtitle}
                    </p>
                </motion.div>

                {/* Deskripsi animasi per kata */}
                <div
                    className={cn(
                        "font-medium leading-relaxed text-sm md:text-base max-w-lg flex flex-wrap transition-colors duration-200",
                        isDark ? "text-neutral-600" : "text-neutral-500"
                    )}
                >
                    {t.description.split(" ").map((word: string, i: number) => (
                        <motion.span
                            key={i}
                            animate={{
                                opacity: 1,
                                y: 0,
                                color: [
                                    isDark ? colors.neutral[700] : "#6B7280",
                                    colors.brand[600],
                                    isDark ? colors.neutral[700] : "#6B7280",
                                    isDark ? colors.neutral[700] : "#6B7280"
                                ]
                            }}
                            transition={{
                                delay: 0.5 + i * 0.05,
                                color: {
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    times: [0, 0.1, 0.2, 1],
                                    ease: "easeInOut"
                                }
                            }}
                            className="inline-block mr-[0.35em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center gap-4 pt-4"
                >
                    <Button
                        size="lg"
                        color="primary"
                        onClick={() => setActiveTab("Convert")}
                        className={cn(
                            "rounded-2xl shadow-xl gap-2",
                            isDark ? "shadow-black/60" : "shadow-rose-200/50"
                        )}
                    >
                        <span className="flex items-center gap-2">
                            {t.ctaStart}
                            <MoveRight
                                size={20}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </span>
                    </Button>

                    <Button
                        variant="outline"
                        color="neutral"
                        size="lg"
                        onClick={() => setActiveTab("Tutorial")}
                        className={cn(
                            "rounded-2xl shadow-lg gap-2",
                            isDark
                                ? "bg-bg-dark-base/40 border-white/10 text-neutral-500 shadow-black/40"
                                : "bg-bg-light-base/40 border-neutral-100 text-neutral-600 shadow-neutral-100"
                        )}
                    >
                        <BookOpen
                            size={20}
                            className={cn(
                                "group-hover:text-brand-red",
                                isDark ? "text-neutral-600" : "text-neutral-400"
                            )}
                        />
                        {t.ctaTutorial}
                    </Button>
                </motion.div>
            </div>
        </motion.main>
    );
};

export default HomeHero;
