import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import LivePlayer from "@/components/LivePlayer";
import LiveChat from "@/components/LiveChat";
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
    return (React.createElement("div", { className: "relative min-h-screen overflow-hidden bg-[#050816] text-white" },
        React.createElement(motion.div, { className: "absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(32,181,255,0.22),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(255,63,145,0.18),transparent_55%),linear-gradient(180deg,#050816_0%,#0b1430_100%)]", animate: { opacity: [0.75, 0.9, 0.75] }, transition: { duration: 12, repeat: Infinity } }),
        React.createElement("header", { className: "sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-cyan-400 font-extrabold text-black" }, "FB"),
                React.createElement("h1", { className: "text-lg font-bold" }, "Fjolsenbanden")),
            React.createElement("button", { onClick: () => setMenuOpen((open) => !open), className: "p-2 md:hidden", "aria-label": "Toggle menu" }, menuOpen ? React.createElement(X, { size: 24 }) : React.createElement(Menu, { size: 24 })),
            React.createElement("nav", { className: `absolute right-0 top-16 rounded-xl border border-white/10 bg-[#0d0d1a]/90 p-4 shadow-xl transition-all md:static md:flex md:border-none md:bg-transparent md:p-0 md:shadow-none ${menuOpen ? "block" : "hidden md:flex"}` },
                React.createElement("ul", { className: "flex flex-col gap-4 text-sm font-medium md:flex-row" }, NAV_LINKS.map((item) => (React.createElement("li", { key: item, className: "cursor-pointer hover:text-cyan-300" }, item)))))),
        React.createElement("main", { className: "relative mx-auto w-full max-w-6xl px-4 py-12" },
            React.createElement("div", { className: "relative overflow-hidden rounded-[40px] border border-white/10 bg-[#0b132a]/80 p-8 shadow-[0_60px_140px_rgba(5,8,22,0.7)] backdrop-blur-xl" },
                React.createElement("div", { className: "pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" }),
                React.createElement("div", { className: "pointer-events-none absolute bottom-0 right-[-80px] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" }),
                React.createElement("div", { className: "relative grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(320px,1.1fr)]" },
                    React.createElement("div", { className: "space-y-8" },
                        React.createElement("div", { className: "space-y-6" },
                            React.createElement("div", { className: "flex flex-col gap-2" },
                                React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.4em] text-cyan-200" }, "Livestream"),
                                React.createElement("h2", { className: "text-3xl font-bold text-white" }, "Fjolsenbanden direkte"),
                                React.createElement("p", { className: "max-w-xl text-sm text-zinc-300" }, "Bli med p\u00E5 sendingen og snakk med oss i sanntid mens vi spiller, trekker premier og svarer p\u00E5 sp\u00F8rsm\u00E5l fra chatten.")),
                            React.createElement(LivePlayer, { channel: FJOLSEN_TWITCH_CHANNEL, status: twitchStatus, demoUrl: DEMO_STREAM_URL })),
                        React.createElement("div", { className: "grid gap-4 rounded-[28px] border border-white/5 bg-white/5 p-6 text-sm text-zinc-300 shadow-[0_24px_60px_rgba(4,7,20,0.45)]" },
                            React.createElement("div", { className: "flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-white/80" },
                                React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 font-semibold text-rose-200" }, (twitchStatus === null || twitchStatus === void 0 ? void 0 : twitchStatus.isLive) ? "🔴 Vi er live n\u00E5" : "● Streamen er offline"),
                                typeof (twitchStatus === null || twitchStatus === void 0 ? void 0 : twitchStatus.viewers) === "number" ? (React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-medium" },
                                    twitchStatus.viewers.toLocaleString(),
                                    " seere f\u00F8lger med")) : null,
                                lastUpdated ? React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1" },
                                    "Sist oppdatert ",
                                    lastUpdated) : null),
                            statusError ? React.createElement("p", { className: "text-rose-300" }, statusError) : null,
                            React.createElement("p", null,
                                "\u00C5pne ",
                                React.createElement("a", { href: DEMO_STREAM_URL, target: "_blank", rel: "noopener noreferrer", className: "text-cyan-300 underline-offset-2 hover:underline" }, "demo-streamen i nytt vindu"),
                                " for \u00E5 teste opplevelsen n\u00E5r hovedkanalen er offline.")),
                        React.createElement(PlatformButtons, { statusMap: statusMap })),
                    React.createElement(LiveChat, null)))),
        React.createElement("footer", { className: "border-t border-white/10 py-6 text-center text-xs text-zinc-400" },
            "\u00A9 ",
            new Date().getFullYear(),
            " Fjolsenbanden \u2013 Stream. Spill. Vinn.")));
}
