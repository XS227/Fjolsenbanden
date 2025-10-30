import * as React from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (React.createElement("input", { ref: ref, type: type !== null && type !== void 0 ? type : "text", className: cn("h-10 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 shadow-sm transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10", className), ...props }));
});
Input.displayName = "Input";
