import React from "react";
import { MessageCircle } from "lucide-react";
const FALLBACK_MESSAGES = [
    { user: "Lina", message: "Haha, den bossen var vilt!" },
    { user: "Jonas", message: "Gleder meg til premie-trekningen 🔥" },
    { user: "Sara", message: "Hei fra TikTok 😎" },
    { user: "Marius", message: "Bra lyd i dag!" },
];
export function LiveChat({ messages = FALLBACK_MESSAGES, placeholder }) {
    return (React.createElement("div", { className: "flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4" },
        React.createElement("h3", { className: "mb-2 flex items-center gap-2 text-cyan-300 font-semibold" },
            React.createElement(MessageCircle, { className: "h-4 w-4" }),
            " Live chat"),
        React.createElement("div", { className: "flex-1 space-y-2 overflow-y-auto text-sm text-zinc-300" }, messages.map((chat) => (React.createElement("div", { key: `${chat.user}-${chat.message}`, className: "rounded-lg bg-white/5 px-3 py-2" },
            React.createElement("span", { className: "font-semibold text-cyan-300" }, chat.user),
            ": ",
            chat.message)))),
        React.createElement("div", { className: "mt-3" },
            React.createElement("input", { type: "text", placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "Skriv en kommentar...", className: "w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-cyan-400", disabled: true }))));
}
export default LiveChat;
