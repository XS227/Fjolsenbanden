import React, { useEffect, useMemo, useRef, useState } from "react";

const MESSAGE_SCRIPT = [
    {
        id: "welcome",
        author: "FjolsenBot",
        badge: "HOST",
        text: "Hei! Velkommen til Fjolsenbandens sending 🙌",
    },
    {
        id: "rule-1",
        author: "ModMira",
        badge: "MOD",
        text: "Regel 1: Del god energi. Heia på laget – aldri på dårlige vibber.",
    },
    {
        id: "rule-2",
        author: "ModMira",
        badge: "MOD",
        text: "Regel 2: Bruk ord som passer for hele familien. Emojis + caps = lov, stygt språk = nope.",
    },
    {
        id: "rule-3",
        author: "FjolsenBot",
        badge: "HOST",
        text: "Regel 3: Spoilers? Marker dem, så får alle oppleve spenningen samtidig!",
    },
    {
        id: "rule-4",
        author: "CaptainChat",
        badge: "CREW",
        text: "Regel 4: Ingen reklame eller spam. Ett klapp er kult, 20 på rad er bot-bait 🤖",
    },
    {
        id: "rule-5",
        author: "ModMira",
        badge: "MOD",
        text: "Mod-teamet har siste ord. Vi er her for å hjelpe – spør hvis du lurer på noe!",
    },
    {
        id: "call-to-action",
        author: "FjolsenBot",
        badge: "HOST",
        text: "Klar for moro? Sleng inn et hei i chatten og bli med i gjengen!",
    },
];

const TYPING_SPEED = 35;
const MESSAGE_DELAY = 1400;
const LOOP_DELAY = 9000;

export function LiveChat() {
    const [displayedMessages, setDisplayedMessages] = useState([]);
    const [typingMessage, setTypingMessage] = useState(null);
    const [messageIndex, setMessageIndex] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        let typingInterval = null;
        let nextMessageTimeout = null;
        let loopResetTimeout = null;

        if (messageIndex >= MESSAGE_SCRIPT.length) {
            loopResetTimeout = window.setTimeout(() => {
                setDisplayedMessages([]);
                setMessageIndex(0);
            }, LOOP_DELAY);

            return () => {
                if (loopResetTimeout) {
                    window.clearTimeout(loopResetTimeout);
                }
            };
        }

        const currentMessage = MESSAGE_SCRIPT[messageIndex];
        setTypingMessage({ ...currentMessage, text: "" });
        let charIndex = 0;

        typingInterval = window.setInterval(() => {
            charIndex += 1;
            setTypingMessage({ ...currentMessage, text: currentMessage.text.slice(0, charIndex) });

            if (charIndex >= currentMessage.text.length) {
                if (typingInterval) {
                    window.clearInterval(typingInterval);
                }

                setDisplayedMessages((prev) => [...prev, currentMessage]);
                setTypingMessage(null);

                nextMessageTimeout = window.setTimeout(() => {
                    setMessageIndex((prev) => prev + 1);
                }, MESSAGE_DELAY);
            }
        }, TYPING_SPEED);

        return () => {
            if (typingInterval) {
                window.clearInterval(typingInterval);
            }
            if (nextMessageTimeout) {
                window.clearTimeout(nextMessageTimeout);
            }
            if (loopResetTimeout) {
                window.clearTimeout(loopResetTimeout);
            }
        };
    }, [messageIndex]);

    useEffect(() => {
        if (!scrollRef.current) {
            return;
        }

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [displayedMessages, typingMessage]);

    const renderMessage = useMemo(() => {
        return (message, isLive) => (
            React.createElement("li", { key: `${message.id}-${isLive ? "typing" : "posted"}` },
                React.createElement("div", { className: "flex items-start gap-3" },
                    React.createElement("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/40 to-indigo-500/40 text-sm font-semibold text-cyan-100" }, message.author.slice(0, 2).toUpperCase()),
                    React.createElement("div", { className: "space-y-1" },
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("span", { className: "text-sm font-semibold text-white" }, message.author),
                            message.badge ? (React.createElement("span", { className: "rounded-full bg-white/10 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200" }, message.badge)) : null,
                            isLive ? (React.createElement("span", { className: "flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.24em] text-emerald-300" },
                                React.createElement("span", { className: "h-1.5 w-1.5 animate-ping rounded-full bg-emerald-300" }),
                                "Skriver")) : null),
                        React.createElement("p", { className: `max-w-xs rounded-2xl bg-white/5 px-4 py-3 text-sm leading-relaxed text-zinc-100 ${isLive ? "border border-cyan-400/40" : "border border-white/5"}` }, message.text + (isLive ? "▋" : ""))))));
    }, []);

    return (
        React.createElement("section", { className: "flex h-full min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#1e2438]/90 shadow-[0_34px_90px_rgba(8,11,26,0.55)] backdrop-blur" },
            React.createElement("header", { className: "flex items-center justify-between border-b border-white/10 px-6 py-5" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("span", { className: "grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 text-base font-semibold text-[#0b0f1f]" }, "💬"),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200" }, "Live chat"),
                        React.createElement("p", { className: "text-xs text-zinc-400" }, "Regler som skrives i sanntid"))),
                React.createElement("span", { className: "rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-rose-200" }, "Direkte")),
            React.createElement("div", { className: "relative flex-1 bg-[#12172b]" },
                React.createElement("div", { ref: scrollRef, className: "flex h-full flex-col justify-end gap-4 overflow-hidden px-6 py-6" },
                    React.createElement("ul", { className: "flex flex-1 flex-col justify-end gap-5 overflow-y-auto pr-2" },
                        displayedMessages.map((message) => renderMessage(message, false)),
                        typingMessage ? renderMessage(typingMessage, true) : null),
                    React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] uppercase tracking-[0.32em] text-zinc-300" }, "Respekter alle • Hold chatten vennlig • Mods hjelper deg"))),
            React.createElement("footer", { className: "border-t border-white/10 bg-[#141a2d] px-6 py-4 text-xs text-zinc-400" },
                "Oppdateres automatisk • Fjolsenbanden"))
    );
}

export default LiveChat;
