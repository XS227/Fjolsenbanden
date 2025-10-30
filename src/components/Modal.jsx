"use client";
export function Modal({ open, onClose, title, children }) {
    useEffect(() => {
        if (!open) {
            return;
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose === null || onClose === void 0 ? void 0 : onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);
    import { type ReactNode, useEffect, type MouseEvent } from "react";
    export function Modal({ open, onClose, children, title }) {
        useEffect(() => {
            if (!open || typeof document === "undefined") {
                return undefined;
            }
            const { body } = document;
            const originalOverflow = body.style.overflow;
            body.style.overflow = "hidden";
            return () => {
                body.style.overflow = originalOverflow;
            };
        }, [open]);
        if (!open) {
            return null;
        }
        return (React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center" },
            React.createElement("div", { className: "absolute inset-0 bg-black/70", onClick: onClose, "aria-hidden": "true" }),
            React.createElement("div", { className: "relative z-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950/90 p-8 shadow-2xl" },
                title ? React.createElement("h3", { className: "text-2xl font-semibold text-white" }, title) : null,
                React.createElement("div", { className: "mt-6 text-white" }, children),
                "const handleContentClick = (event: MouseEvent",
                React.createElement(HTMLDivElement, null,
                    ") => ",
                    event.stopPropagation(),
                    "; }; return (",
                    React.createElement("div", { className: "fixed inset-0 z-50" },
                        React.createElement("div", { className: "absolute inset-0 bg-black/60", onClick: onClose }),
                        React.createElement("div", { className: "relative mx-auto flex h-full w-full max-w-lg items-start justify-center overflow-y-auto px-4 py-10 sm:py-16" },
                            React.createElement("div", { className: "w-full overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-2xl", role: "dialog", "aria-modal": "true", onClick: handleContentClick },
                                React.createElement("div", { className: "sticky top-0 flex items-center justify-between gap-4 bg-zinc-900/95 px-5 py-4" },
                                    React.createElement("h3", { className: "text-lg font-bold" }, title),
                                    React.createElement("button", { type: "button", onClick: onClose, className: "rounded-lg bg-white/10 p-2 transition hover:bg-white/20", "aria-label": "Lukk" }, "\u2715")),
                                React.createElement("div", { className: "max-h-[70vh] overflow-y-auto px-5 pb-5" }, children)))),
                    "); }"))));
    }
}
