import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    value: number; // 0 to 100
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("h-2 w-full bg-neutral-200 rounded-full overflow-hidden", className)}
                {...props}
            >
                <div
                    className="h-full bg-primary transition-all duration-500 ease-in-out"
                    style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
                />
            </div>
        );
    }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
