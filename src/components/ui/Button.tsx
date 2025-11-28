import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    // Variants
                    variant === "primary" && "bg-primary text-white hover:bg-[#00664F]",
                    variant === "secondary" && "bg-white border border-neutral-200 text-neutral-900 hover:bg-neutral-50",
                    variant === "ghost" && "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
                    // Sizes
                    size === "sm" && "px-3 py-1.5 text-sm",
                    size === "md" && "px-5 py-3 text-base",
                    size === "lg" && "px-6 py-4 text-lg",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
