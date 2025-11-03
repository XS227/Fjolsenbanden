import React, { useEffect, useMemo, useState } from "react";
import { FJOLSEN_TWITCH_CHANNEL } from "@/lib/community";

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
        React.createElement("section", { className: "flex h-full min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#1e2438]/90 shadow-[0_34px_90px_rgba(8,11,26,0.55)] backdrop-blur" },
            React.createElement("header", { className: "flex items-center justify-between border-b border-white/10 px-6 py-5" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-base font-semibold text-[#0b0f1f]" }, "💬"),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200" }, "Live chat"),
                        React.createElement("p", { className: "text-xs text-zinc-400" }, "Direkte fra Twitch"))),
                React.createElement("span", { className: "rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-300" }, "Synkronisert")),
            React.createElement("div", { className: "relative flex-1 bg-[#12172b]" },
                chatSrc ? (React.createElement("iframe", { className: "absolute inset-0 h-full w-full", src: chatSrc, title: "Fjolsenbanden Twitch chat", allowFullScreen: true })) : (React.createElement("div", { className: "flex h-full flex-col items-center justify-center gap-3 text-sm text-zinc-300" },
                    React.createElement("span", { className: "h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/40 border-t-cyan-300" }),
                    React.createElement("p", null, "Laster Twitch-chat ...")))),
            React.createElement("footer", { className: "border-t border-white/10 bg-[#141a2d] px-6 py-4 text-xs text-zinc-400" },
                "Koblet til kanal ",
                React.createElement("span", { className: "font-semibold text-zinc-200" }, FJOLSEN_TWITCH_CHANNEL))));
}

export default LiveChat;
