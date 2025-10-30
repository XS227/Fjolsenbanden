import * as React from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
export const Card = React.forwardRef(({ className, ...props }, ref) => (React.createElement("div", { ref: ref, className: cn("rounded-2xl border border-zinc-200 bg-white shadow-sm", className), ...props })));
Card.displayName = "Card";
export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (React.createElement("div", { ref: ref, className: cn("p-6", className), ...props })));
CardHeader.displayName = "CardHeader";
export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (React.createElement("h3", { ref: ref, className: cn("text-lg font-semibold", className), ...props })));
CardTitle.displayName = "CardTitle";
export const CardContent = React.forwardRef(({ className, ...props }, ref) => (React.createElement("div", { ref: ref, className: cn("px-6 pb-6", className), ...props })));
CardContent.displayName = "CardContent";
export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (React.createElement("div", { ref: ref, className: cn("px-6 pb-6", className), ...props })));
CardFooter.displayName = "CardFooter";
