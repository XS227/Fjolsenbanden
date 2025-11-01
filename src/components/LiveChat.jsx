import React, { useEffect, useMemo, useState } from "react";
import { FJOLSEN_TWITCH_CHANNEL } from "@/lib/community";

const GRADIENT_HEADER = "bg-[linear-gradient(90deg,#13a0f9,#ff2f9c)]";
const SHADOW_CLASS = "shadow-[0_20px_60px_rgba(0,0,0,0.3)]";

export function LiveChat() {
    const [parentHost, setParentHost] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        setParentHost(window.location.hostname);
    }, []);

    const chatSrc = useMemo(() => {
        if (!parentHost) {
            return null;
        }

        const params = new URLSearchParams({
            parent: parentHost,
            darkpopout: "",
            theme: "dark",
        });

        return `https://www.twitch.tv/embed/${FJOLSEN_TWITCH_CHANNEL}/chat?${params.toString()}`;
    }, [parentHost]);

    return (
        React.createElement("section", { className: `flex h-full min-h-[480px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${SHADOW_CLASS}` },
            React.createElement("header", { className: `px-5 py-3 text-center text-sm font-extrabold uppercase tracking-wide ${GRADIENT_HEADER}` },
                "\uD83C\uDFAE Fjolsenbanden \u2013 Live Twitch-chat"),
            React.createElement("div", { className: "relative flex-1 bg-black/20" },
                chatSrc ? (React.createElement("iframe", { className: "absolute inset-0 h-full w-full", src: chatSrc, title: "Fjolsenbanden Twitch chat", allowFullScreen: true })) : (React.createElement("div", { className: "flex h-full items-center justify-center text-sm text-zinc-300" }, "Laster Twitch-chat ..."))),
            React.createElement("footer", { className: "border-t border-white/10 bg-cyan-500/5 px-5 py-3 text-center text-sm text-cyan-100" },
                "Koblet til kanal: ",
                React.createElement("code", { className: "text-white" }, FJOLSEN_TWITCH_CHANNEL))));
}

export default LiveChat;
