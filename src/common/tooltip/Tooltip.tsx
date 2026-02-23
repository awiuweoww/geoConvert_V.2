
import { type FC, memo } from "react";
import { cn } from "../../utils/cn";

export interface TooltipProps {
    x: number;
    y: number;
    text: string;
}

/**
 * A small tooltip that appears at a given (x, y) coordinate, containing some text.
 * This is a very simple component, and does not include any behavior for handling
 * mouse events, or for preventing the tooltip from appearing outside the bounds of
 * the window.
 *
 * @param {{ x: number, y: number, text: string }} x
 *   The coordinates of the tooltip, and the text to display.
 * @returns {JSX.Element}
 *   A div, with the given text as its contents, and with its position set to
 *   "fixed" at the given coordinates.
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
            "bg-neutral-900 dark:bg-neutral-800", // Fallback for bg-background-100-2
            "text-xs text-white",
            "shadow-md whitespace-nowrap",
            "ring-1 ring-white/40", // Replaced outline with ring for better control
            "font-montserrat",
            "animate-in fade-in zoom-in-95 duration-200"
        )}
    >
        {text}
    </div>
);

export default memo(Tooltip);
