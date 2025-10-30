"use client";
import { useEffect, useMemo, useState } from "react";
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function SlideStepper({ steps, onFinish, className }) {
    var _a;
    const visibleSteps = useMemo(() => steps, [steps]);
    const [activeIndex, setActiveIndex] = useState(0);
    useEffect(() => {
        if (activeIndex > visibleSteps.length - 1) {
            setActiveIndex(Math.max(visibleSteps.length - 1, 0));
        }
    }, [activeIndex, visibleSteps.length]);
    if (visibleSteps.length === 0) {
        return null;
    }
    const handleNext = async () => {
        const current = visibleSteps[activeIndex];
        if (current === null || current === void 0 ? void 0 : current.validate) {
            const valid = await current.validate();
            if (!valid) {
                return;
            }
        }
        if (activeIndex === visibleSteps.length - 1) {
            await (onFinish === null || onFinish === void 0 ? void 0 : onFinish());
            return;
        }
        setActiveIndex((index) => Math.min(index + 1, visibleSteps.length - 1));
    };
    const handlePrevious = () => {
        setActiveIndex((index) => Math.max(index - 1, 0));
    };
    const progress = ((activeIndex + 1) / visibleSteps.length) * 100;
    return (React.createElement("div", { className: cn("flex flex-col gap-6", className) },
        React.createElement("div", { className: "flex flex-col gap-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("p", { className: "text-sm font-medium text-white/70" },
                    "Steg ",
                    activeIndex + 1,
                    " av ",
                    visibleSteps.length),
                React.createElement("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50" }, visibleSteps.map((step, index) => (React.createElement("span", { key: step.id, className: cn("inline-flex h-6 items-center justify-center rounded-full border px-3 transition", index === activeIndex
                        ? "border-sky-400/80 bg-sky-400/10 text-sky-200"
                        : "border-white/10 bg-white/5 text-white/40") }, step.label))))),
            React.createElement("div", { className: "h-1 w-full overflow-hidden rounded-full bg-white/10" },
                React.createElement("div", { className: "h-full rounded-full bg-sky-500 transition-all", style: { width: `${progress}%` } }))),
        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-black/30 p-6 shadow-lg" }, (_a = visibleSteps[activeIndex]) === null || _a === void 0 ? void 0 : _a.content),
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("button", { type: "button", onClick: handlePrevious, disabled: activeIndex === 0, className: cn("rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition", activeIndex === 0
                    ? "cursor-not-allowed opacity-40"
                    : "hover:border-white/30 hover:text-white") }, "Forrige"),
            React.createElement("button", { type: "button", onClick: handleNext, className: "rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400" }, activeIndex === visibleSteps.length - 1 ? "Fullfør" : "Neste")),
        "import ", (AnimatePresence, motion),
        " from \"framer-motion\"; import ", (useCallback,
        useEffect,
        useState,
        type),
        " ReactNode, } from \"react\"; const variants = ",
        enter,
        ": (dir: number) => (",
        x,
        ": dir > 0 ? 120 : -120, opacity: 0 }), center: ",
        x,
        ": 0, opacity: 1 }, exit: (dir: number) => (",
        x,
        ": dir > 0 ? -120 : 120, opacity: 0 }), }; export function SlideStepper(", (steps,
        onFinish,
    ),
        ": ",
        steps,
        ": ReactNode[]; onFinish: () => void; }) ",
    ,
        "const [i, setI] = useState(0); const [dir, setDir] = useState(1); const next = useCallback(() => ",
        setDir(1),
        "; setI((prev) => ",
    ,
        "if (prev ",
        React.createElement(steps.length, null),
        " - 1) ",
    ,
        "return prev + 1; } onFinish(); return prev; }); }, [onFinish, steps.length]); const back = useCallback(() => ",
        setDir(-1),
        "; setI((prev) => (prev > 0 ? prev - 1 : prev)); }, []); useEffect(() => ",
    ,
        "const handleKeyDown = (event: KeyboardEvent) => ",
    ,
        "if (event.key === \"ArrowRight\") ",
        next(),
        "; } else if (event.key === \"ArrowLeft\") ",
        back(),
        "; } }; window.addEventListener(\"keydown\", handleKeyDown); return () => window.removeEventListener(\"keydown\", handleKeyDown); }, [back, next]); return (",
        React.createElement("div", { className: "relative" },
            React.createElement(AnimatePresence, { initial: false, custom: dir, mode: "popLayout" },
                React.createElement(motion.div, { key: i, custom: dir, variants: variants, initial: "enter", animate: "center", exit: "exit", transition: { type: "spring", stiffness: 300, damping: 30 }, className: "min-h-[320px]" }, steps[i])),
            React.createElement("div", { className: "mt-4 flex justify-between" },
                React.createElement("button", { onClick: back, disabled: i === 0, className: "px-4 py-2 rounded-xl disabled:opacity-40 bg-white/10 text-white" }, "Tilbake"),
                React.createElement("button", { onClick: next, className: "px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 text-white" }, "Neste")),
            React.createElement("div", { className: "mt-3 text-center text-xs text-zinc-400" },
                i + 1,
                " / ",
                steps.length)),
        "); }"));
}
