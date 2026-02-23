import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../../utils/cn";

interface BackgroundOverlaysProps {
    isDark: boolean;
    activeTab: string;
}

/**
 * Komponen BackgroundOverlays - Overlay latar belakang yang berubah berdasarkan tab aktif.
 * - Home: blur overlay + grid pattern
 * - Tutorial: solid background menutupi peta
 */
const BackgroundOverlays: React.FC<BackgroundOverlaysProps> = ({
    isDark,
    activeTab
}) => {
    return (
        <AnimatePresence>
            {activeTab === "Home" && (
                <>
                    <motion.div
                        key="blur-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                            "fixed inset-0 pointer-events-none z-0",
                            isDark ? "bg-black/90" : "bg-bg-light-base/60"
                        )}
                        style={{
                            backdropFilter: "blur(16px)",
                            WebkitBackdropFilter: "blur(16px)",
                            maskImage:
                                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 90%)",
                            WebkitMaskImage:
                                "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 90%)"
                        }}
                    />
                    <motion.div
                        key="grid-pattern"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                            "fixed inset-0 pointer-events-none z-1 grid-pattern transition-opacity duration-200 ease-in-out",
                            isDark ? "opacity-[0.05]" : "opacity-[0.08]"
                        )}
                    />
                </>
            )}

            {/* Overlay Background Solid Khusus Tutorial (Menutup Peta) */}
            {activeTab === "Tutorial" && (
                <motion.div
                    key="tutorial-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "fixed inset-0 pointer-events-none z-1",
                        isDark ? "bg-bg-dark-base" : "bg-gray-50"
                    )}
                />
            )}
        </AnimatePresence>
    );
};

export default BackgroundOverlays;
