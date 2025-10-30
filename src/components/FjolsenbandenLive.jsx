import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LiveChat from "@/components/LiveChat";
import LivePlayer from "@/components/LivePlayer";
import PlatformButtons from "@/components/PlatformButtons";
import { DEMO_STREAM_URL } from "@/lib/demoStream";
import { FJOLSEN_TWITCH_CHANNEL } from "@/lib/community";
import { aggregateLiveStatus, } from "@/lib/liveStatus";
const NAV_LINKS = ["Hjem", "Premier", "Foreldre", "Sponsorer", "Kontakt"];
const YOUTUBE_CHANNEL_ID = "@fjolsenbanden";
const REFRESH_INTERVAL_MS = 60000;
export default function FjolsenbandenLive() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [statusData, setStatusData] = useState(null);
    const [statusError, setStatusError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        async function loadStatus() {
            try {
                const data = await aggregateLiveStatus({
                    config: {
                        twitch: { channel: FJOLSEN_TWITCH_CHANNEL },
                        youtube: { channelId: YOUTUBE_CHANNEL_ID },
                    },
                });
                if (isMounted) {
                    setStatusData(data);
                    setStatusError(null);
                }
            }
            catch (error) {
                if (isMounted) {
                    setStatusError(error instanceof Error ? error.message : "Klarte ikke å hente live-status.");
                }
            }
        }
        loadStatus();
        const intervalId = typeof window !== "undefined"
            ? window.setInterval(() => {
                void loadStatus();
            }, REFRESH_INTERVAL_MS)
            : undefined;
        return () => {
            isMounted = false;
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, []);
    const statusMap = useMemo(() => {
        const map = {};
        statusData === null || statusData === void 0 ? void 0 : statusData.statuses.forEach((status) => {
            map[status.platform] = status;
        });
        return map;
    }, [statusData]);
    const twitchStatus = statusMap.twitch;
    const lastUpdated = (statusData === null || statusData === void 0 ? void 0 : statusData.updatedAt)
        ? new Date(statusData.updatedAt).toLocaleTimeString("nb-NO", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : null;
    return (React.createElement("div", { className: "relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0d0d1a] to-[#1a1a2e] text-white" },
        React.createElement(motion.div, { className: "absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,207,255,0.15),transparent_70%)]", animate: { opacity: [0.7, 0.9, 0.7] }, transition: { duration: 8, repeat: Infinity } }),
        React.createElement("header", { className: "sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 font-extrabold text-black" }, "FB"),
                React.createElement("h1", { className: "text-lg font-bold" }, "Fjolsenbanden")),
            React.createElement("button", { onClick: () => setMenuOpen((open) => !open), className: "p-2 md:hidden", "aria-label": "Toggle menu" }, menuOpen ? React.createElement(X, { size: 24 }) : React.createElement(Menu, { size: 24 })),
            React.createElement("nav", { className: `absolute right-0 top-16 rounded-xl border border-white/10 bg-[#0d0d1a]/90 p-4 shadow-xl transition-all md:static md:flex md:border-none md:bg-transparent md:p-0 md:shadow-none ${menuOpen ? "block" : "hidden md:flex"}` },
                React.createElement("ul", { className: "flex flex-col gap-4 text-sm font-medium md:flex-row" }, NAV_LINKS.map((item) => (React.createElement("li", { key: item, className: "cursor-pointer hover:text-cyan-300" }, item)))))),
        React.createElement("main", { className: "relative mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-3" },
            React.createElement("div", { className: "relative space-y-4 lg:col-span-2" },
                React.createElement(LivePlayer, { channel: FJOLSEN_TWITCH_CHANNEL, status: twitchStatus, demoUrl: DEMO_STREAM_URL }),
                React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-300" },
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("span", { className: "inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wide text-white/80" }, (twitchStatus === null || twitchStatus === void 0 ? void 0 : twitchStatus.isLive) ? "Vi er live nå" : "Streamen er offline"),
                        typeof (twitchStatus === null || twitchStatus === void 0 ? void 0 : twitchStatus.viewers) === "number" ? (React.createElement("span", null,
                            twitchStatus.viewers.toLocaleString(),
                            " seere f\u00F8lger med")) : null),
                    React.createElement("div", { className: "flex items-center gap-3" },
                        statusError ? React.createElement("span", { className: "text-rose-300" }, statusError) : null,
                        lastUpdated ? React.createElement("span", null,
                            "Sist oppdatert ",
                            lastUpdated) : null)),
                React.createElement(PlatformButtons, { statusMap: statusMap }),
                React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300" },
                    React.createElement("p", { className: "font-semibold text-white" }, "Vil du teste livestream-opplevelsen?"),
                    React.createElement("p", { className: "mt-1" },
                        "\u00C5pne ",
                        React.createElement("a", { href: DEMO_STREAM_URL, target: "_blank", rel: "noopener noreferrer", className: "text-cyan-300 underline-offset-2 hover:underline" }, "demo-streamen i nytt vindu"),
                        " ",
                        "for \u00E5 verifisere avspilleren n\u00E5r hovedkanalen er offline."))),
            React.createElement("div", { className: "lg:col-span-1" },
                React.createElement(LiveChat, null))),
        React.createElement("footer", { className: "border-t border-white/10 py-6 text-center text-xs text-zinc-400" },
            "\u00A9 ",
            new Date().getFullYear(),
            " Fjolsenbanden \u2013 Stream. Spill. Vinn.")));
}
