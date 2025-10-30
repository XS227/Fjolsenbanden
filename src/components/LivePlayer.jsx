import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    return (React.createElement("div", { className: "relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl" },
        React.createElement(motion.div, { className: "absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold", animate: { opacity: [1, 0.6, 1] }, transition: { duration: 1.2, repeat: Infinity } }, (status === null || status === void 0 ? void 0 : status.isLive) ? "🔴 LIVE" : "● OFFLINE"),
        (status === null || status === void 0 ? void 0 : status.title) ? (React.createElement("div", { className: "absolute bottom-4 left-4 right-4 hidden rounded-xl bg-black/60 p-3 text-sm backdrop-blur md:block" },
            React.createElement("p", { className: "font-semibold" }, status.title),
            React.createElement("div", { className: "mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-300" },
                status.note ? React.createElement("span", null, status.note) : null,
                typeof status.viewers === "number" ? (React.createElement("span", null,
                    status.viewers.toLocaleString(),
                    " seere")) : null,
                status.error ? React.createElement("span", { className: "text-rose-300" }, status.error) : null))) : null,
        React.createElement("iframe", { src: iframeSrc, title: "Twitch Player", allowFullScreen: true, className: "aspect-video w-full" }),
        !unmuted && hasPreview ? (React.createElement("div", { className: "absolute inset-0 grid place-items-center bg-black/70 p-6 text-center" },
            React.createElement("div", null,
                React.createElement(Play, { className: "mx-auto mb-3 h-12 w-12 text-cyan-400" }),
                React.createElement("p", { className: "mb-4 text-sm text-zinc-300" },
                    "1-minutt forh\u00E5ndsvisning \u2013 ",
                    countdown,
                    "s igjen"),
                React.createElement(Button, { onClick: () => setUnmuted(true), className: "rounded-full px-6 py-4 text-base" }, "Se full stream"),
                demoUrl ? (React.createElement(Button, { variant: "outline", className: "mt-3 rounded-full px-6 py-3 text-sm", onClick: () => {
                        if (typeof window !== "undefined") {
                            window.open(demoUrl, "_blank", "noopener,noreferrer");
                        }
                    } }, "\u00C5pne demo-stream")) : null))) : null));
}
export default LivePlayer;
