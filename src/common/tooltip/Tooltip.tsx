
import { type FC, memo } from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
    x: number;
    y: number;
    text: string;
}

/**
 * Tooltip kecil yang muncul pada koordinat (x, y) tertentu, berisi teks.
 * Ini adalah komponen yang sangat sederhana, dan tidak menyertakan perilaku apa pun untuk menangani
 * peristiwa mouse, atau untuk mencegah tooltip muncul di luar batas jendela.
 *
 * @param {{ x: number, y: number, text: string }} props
 *   Koordinat tooltip dan teks yang akan ditampilkan.
 * @returns {JSX.Element}
 *   Sebuah div, dengan teks yang diberikan sebagai isinya, dan dengan posisinya diatur ke
 *   "fixed" pada koordinat yang diberikan.
 */
const Tooltip: FC<TooltipProps> = ({ x, y, text }) => (
    <div
        style={{
            position: "fixed",
            left: x,
            top: y,
            zIndex: 9999,
            pointerEvents: "none"
        }}
        className={cn(
            "rounded-md px-3 py-1.5",
            "bg-neutral-900 dark:bg-neutral-800", // Cadangan untuk bg-background-100-2
            "text-xs text-white",
            "shadow-md whitespace-nowrap",
            "ring-1 ring-white/40", // Mengganti outline dengan ring untuk kontrol yang lebih baik
            "font-montserrat",
            "animate-in fade-in zoom-in-95 duration-200"
        )}
    >
        {text}
    </div>
);

export default memo(Tooltip);
