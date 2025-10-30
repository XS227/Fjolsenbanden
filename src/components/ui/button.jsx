import * as React from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
const baseClasses = "inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";
const variantClasses = {
    default: "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900",
    outline: "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-200",
};
const sizeClasses = {
    default: "h-10 px-4 text-sm rounded-xl",
    sm: "h-9 px-3 text-sm rounded-lg",
    lg: "h-11 px-6 text-base rounded-2xl",
};
export const Button = React.forwardRef(({ className, variant = "default", size = "default", type, ...props }, ref) => {
    return (React.createElement("button", { ref: ref, type: type !== null && type !== void 0 ? type : "button", className: cn(baseClasses, variantClasses[variant], sizeClasses[size], className), ...props }));
});
Button.displayName = "Button";
