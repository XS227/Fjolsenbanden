import * as React from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const Label = React.forwardRef(({ className, ...props }, ref) => (React.createElement("label", { ref: ref, className: cn("text-sm font-medium text-zinc-700", className), ...props })));
Label.displayName = "Label";
