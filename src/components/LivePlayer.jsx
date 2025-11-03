import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FJOLSEN_TWITCH_CHANNEL_URL } from "@/lib/community";
function resolveParentDomain(parentDomain) {
    if (parentDomain) {
        return parentDomain;
    }
    if (typeof window !== "undefined" && window.location.hostname) {
        return window.location.hostname;
    }
    return "localhost";
}
export function LivePlayer({ channel, parentDomain, status, previewDuration = 60, demoUrl, }) {
    const [countdown, setCountdown] = useState(previewDuration);
    const [unmuted, setUnmuted] = useState(false);
    const hasPreview = previewDuration > 0;
    useEffect(() => {
        if (!hasPreview || unmuted) {
            return;
        }
        if (countdown <= 0) {
            return;
        }
        const timer = window.setTimeout(() => {
            setCountdown((value) => Math.max(0, value - 1));
        }, 1000);
        return () => window.clearTimeout(timer);
    }, [countdown, hasPreview, unmuted]);
    useEffect(() => {
        if (unmuted) {
            setCountdown(0);
        }
    }, [unmuted]);
    const iframeSrc = useMemo(() => {
        const parent = resolveParentDomain(parentDomain);
        const params = new URLSearchParams({
            channel,
            parent,
            muted: String(!unmuted),
        });
        return `https://player.twitch.tv/?${params.toString()}`;
    }, [channel, parentDomain, unmuted]);
    return (React.createElement("div", { className: "relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1a2033]/90 shadow-[0_34px_90px_rgba(8,11,26,0.65)]" },
        React.createElement("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(32,181,255,0.22),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,63,145,0.18),transparent_50%)]" }),
        React.createElement(motion.div, { className: "absolute left-5 top-5 z-10 rounded-full bg-rose-500/90 px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase text-white", animate: { opacity: [1, 0.6, 1] }, transition: { duration: 1.2, repeat: Infinity } }, (status === null || status === void 0 ? void 0 : status.isLive) ? "🔴 Live" : "● Offline"),
        (status === null || status === void 0 ? void 0 : status.title) ? (React.createElement("div", { className: "absolute bottom-6 left-6 right-6 z-10 hidden rounded-2xl bg-black/65 p-4 text-sm backdrop-blur md:block" },
            React.createElement("p", { className: "font-semibold" }, status.title),
            React.createElement("div", { className: "mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-300" },
                status.note ? React.createElement("span", null, status.note) : null,
                typeof status.viewers === "number" ? (React.createElement("span", null,
                    status.viewers.toLocaleString(),
                    " seere")) : null,
                status.error ? React.createElement("span", { className: "text-rose-300" }, status.error) : null))) : null,
        React.createElement("iframe", { src: iframeSrc, title: "Twitch Player", allowFullScreen: true, className: "relative z-[1] aspect-video w-full" }),
        !unmuted && hasPreview ? (React.createElement("div", { className: "absolute inset-0 z-20 grid place-items-center bg-[#0a0d1f]/85 px-6 text-center backdrop-blur-sm" },
            React.createElement("div", { className: "max-w-sm" },
                React.createElement("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500/80" },
                    React.createElement(Play, { className: "h-8 w-8 text-[#0a0d1f]" })),
                React.createElement("p", { className: "mb-5 text-sm text-zinc-200" },
                    "1-minutt forh\u00E5ndsvisning \u2013 ",
                    countdown,
                    "s igjen"),
                React.createElement(Button, { onClick: () => setUnmuted(true), className: "w-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 px-6 py-4 text-base font-semibold text-[#0a0d1f] shadow-[0_18px_40px_rgba(22,132,252,0.35)] transition hover:from-cyan-300 hover:via-sky-400 hover:to-indigo-400" }, "Se full stream"),
                React.createElement("p", { className: "mt-6 text-xs text-zinc-400" },
                    "eller fortsett p\u00E5 ",
                    React.createElement("a", { href: FJOLSEN_TWITCH_CHANNEL_URL, target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-cyan-300 hover:text-cyan-200" }, "Twitch"),
                    " | ",
                    React.createElement("a", { href: "https://www.youtube.com/@fjolsenbanden", target: "_blank", rel: "noopener noreferrer", className: "font-semibold text-cyan-300 hover:text-cyan-200" }, "YouTube")),
                demoUrl ? (React.createElement(Button, { variant: "outline", className: "mt-3 w-full rounded-full border-white/20 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10", onClick: () => {
                        if (typeof window !== "undefined") {
                            window.open(demoUrl, "_blank", "noopener,noreferrer");
                        }
                    } }, "\u00C5pne demo-stream")) : null))) : null));
}
export default LivePlayer;
