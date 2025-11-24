import React from "react";
import { motion } from "framer-motion";
import { Discord, Instagram, PlayCircle, Smartphone, Twitch, Youtube } from "lucide-react";
import { DEMO_STREAM_URL } from "@/lib/demoStream";
import { FJOLSEN_TWITCH_CHANNEL_URL } from "@/lib/community";
const PLATFORM_LINKS = [
    {
        id: "youtube",
        label: "Se på YouTube",
        href: "https://youtube.com/@fjolsenbanden",
        icon: React.createElement(Youtube, { className: "h-5 w-5" }),
        livePlatform: "youtube",
    },
    {
        id: "twitch",
        label: "Se på Twitch",
        href: FJOLSEN_TWITCH_CHANNEL_URL,
        icon: React.createElement(Twitch, { className: "h-5 w-5" }),
        livePlatform: "twitch",
    },
    {
        id: "tiktok",
        label: "Se på TikTok",
        href: "https://tiktok.com/@fjolsenbanden",
        icon: React.createElement(Smartphone, { className: "h-5 w-5" }),
    },
    {
        id: "instagram",
        label: "Følg på Instagram",
        href: "https://www.instagram.com/fjolsenbanden",
        icon: React.createElement(Instagram, { className: "h-5 w-5" }),
    },
    {
        id: "discord",
        label: "Bli med i Discord",
        href: "https://discord.gg/CbvBPHzg4D",
        icon: React.createElement(Discord, { className: "h-5 w-5" }),
    },
    {
        id: "demo",
        label: "Åpne demo-stream",
        href: DEMO_STREAM_URL,
        icon: React.createElement(PlayCircle, { className: "h-5 w-5 text-cyan-300" }),
    },
];
function getLiveBadge(status) {
    if (!status) {
        return null;
    }
    if (!status.isLive) {
        return status.error ? (React.createElement("span", { className: "text-[10px] uppercase tracking-wide text-amber-300" }, status.error)) : null;
    }
    return React.createElement("span", { className: "text-[10px] font-semibold uppercase tracking-wide text-rose-300" }, "Live n\u00E5");
}
export function PlatformButtons({ statusMap }) {
    return (React.createElement("div", { className: "mt-4 flex flex-wrap justify-center gap-4" }, PLATFORM_LINKS.map((platform) => {
        const status = platform.livePlatform ? statusMap === null || statusMap === void 0 ? void 0 : statusMap[platform.livePlatform] : undefined;
        return (React.createElement(motion.a, { key: platform.id, href: platform.href, target: "_blank", rel: "noopener noreferrer", whileHover: { scale: 1.05, y: -2 }, whileTap: { scale: 0.97 }, className: "flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/20" },
            React.createElement("span", { className: "text-white/90" }, platform.icon),
            React.createElement("span", { className: "text-sm" }, platform.label),
            getLiveBadge(status)));
    })));
}
export default PlatformButtons;
