
import { forwardRef, memo } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type CardProps = {
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    footer?: ReactNode;
    fullWidth?: boolean;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Card = memo(
    forwardRef<HTMLDivElement, CardProps>(
        ({ className, title, subtitle, children, footer, fullWidth = false, ...props }, ref) => {
            return (
                <div
                    ref={ref}
                    className={cn(
                        "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-950/5 dark:bg-neutral-900 dark:ring-neutral-800 font-montserrat",
                        fullWidth ? "w-full" : "w-fit",
                        className
                    )}
                    {...props}
                >
                    {(title || subtitle) && (
                        <div className="flex flex-col space-y-1.5 pb-4">
                            {title && (
                                <h3 className="font-semibold leading-none tracking-tight text-xl text-neutral-900 dark:text-neutral-50">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}
                    <div className={cn("text-neutral-700 dark:text-neutral-300", !title && !subtitle && "pt-0")}>
                        {children}
                    </div>
                    {footer && (
                        <div className="flex items-center pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800">
                            {footer}
                        </div>
                    )}
                </div>
            );
        }
    )
);

Card.displayName = "Card";

export default Card;
