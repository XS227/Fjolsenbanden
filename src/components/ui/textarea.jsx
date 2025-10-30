import * as React from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (React.createElement("textarea", { ref: ref, className: cn("w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10", className), ...props }));
});
Textarea.displayName = "Textarea";
