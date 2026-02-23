import { useEffect, useState } from "react";

/**
 * Hook kustom untuk mengelola tema aplikasi (Dark Mode / Light Mode).
 * Menangani persistensi tema di LocalStorage dan manipulasi class CSS pada elemen root.
 * 
 * @returns 
 * - `isDark`: Status boolean mode gelap aktif.
 * - `setIsDark`: Fungsi untuk mengatur status mode gelap secara manual.
 * - `toggleDark`: Fungsi kemudahan untuk membalikkan status mode gelap.
 */
export const useTheme = () => {
    const [isDark, setIsDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleDark = () => setIsDark(!isDark);

    return { isDark, setIsDark, toggleDark };
};
