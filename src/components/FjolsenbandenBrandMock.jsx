"use client";
import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, Menu, Play, ShieldCheck, Smartphone, Sparkles, Trophy, Twitch, Users, X, Youtube, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminState } from "@/lib/admin-state";
const BRAND = {
    midnight: "#020824",
    midnightSoft: "#0E1A42",
    navy: "#041149",
    blue: "#13A0F9",
    blueSoft: "#9BD9FF",
    pink: "#FF2F9C",
    violet: "#6827FF",
    indigo: "#223067",
    salmon: "#FF5A00",
};
const SECTION_BACKGROUNDS = {
    hero: `linear-gradient(160deg, ${BRAND.navy} 0%, ${BRAND.midnight} 100%)`,
    membership: `linear-gradient(160deg, rgba(34,48,103,0.92) 0%, rgba(10,24,62,0.9) 100%)`,
    rewards: `linear-gradient(160deg, rgba(255,47,156,0.35) 0%, rgba(48,9,56,0.92) 100%)`,
    parents: `linear-gradient(160deg, rgba(19,160,249,0.18) 0%, rgba(5,22,58,0.88) 100%)`,
};
const PRIZES = [
    {
        brand: "Lenovo Legion",
        item: "Gaming headset",
        value: "Verdi 1 299,-",
        image: "/assets/prize-legion-headset.svg",
    },
    {
        brand: "Samsung Odyssey",
        item: "27\" QHD skjerm",
        value: "Verdi 4 990,-",
        image: "/assets/prize-odyssey-monitor.svg",
    },
    {
        brand: "Philips Hue",
        item: "Smart startpakke",
        value: "Verdi 1 599,-",
        image: "/assets/prize-hue-kit.svg",
    },
];
export default function FjolsenbandenBrandMock() {
    const [menu, setMenu] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const { state } = useAdminState();
    const { siteSettings } = state;
    const navItems = useMemo(() => ["Live", "Premier", "Medlemskap", "Foreldre", "Community", "Sponsorer"], []);
    const toggleMenu = () => setMenu((value) => !value);
    const closeMenu = () => setMenu(false);
    return (React.createElement("div", { className: "min-h-screen text-white", style: {
            background: `radial-gradient(circle at 18% -12%, ${BRAND.blueSoft}22, transparent 55%), ${BRAND.midnight}`,
            fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, Roboto, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        } },
        React.createElement("header", { className: "sticky top-0 z-50 border-b border-white/10 backdrop-blur", style: { background: "rgba(3, 12, 42, 0.82)" } },
            React.createElement("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("img", { src: siteSettings.logoUrl || "https://setaei.com/Fjolsen/Liggende-M%E2%94%9C%E2%95%95rk.png", alt: siteSettings.heroTitle || "Fjolsenbanden", className: "hidden h-8 w-auto sm:block" }),
                    React.createElement("div", { className: "grid h-10 w-10 place-items-center rounded-xl font-black sm:hidden", style: { background: BRAND.blue, color: BRAND.navy } }, "FB")),
                React.createElement("nav", { className: "hidden items-center gap-6 text-sm md:flex" }, navItems.map((label) => (React.createElement("a", { key: label, href: `#${label.toLowerCase()}`, className: "transition hover:text-white/80" }, label)))),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement(VippsButton, { className: "hidden text-sm md:inline-flex" }, "Logg inn med Vipps"),
                    React.createElement("button", { type: "button", className: "md:hidden", onClick: toggleMenu, "aria-label": menu ? "Lukk meny" : "Åpne meny", "aria-expanded": menu, "aria-controls": "mobilmeny" }, menu ? React.createElement(X, { "aria-hidden": "true" }) : React.createElement(Menu, { "aria-hidden": "true" })))),
            menu ? (React.createElement("div", { id: "mobilmeny", className: "space-y-2 border-t border-white/10 px-4 py-3 md:hidden", style: { background: "rgba(4, 17, 73, 0.85)" } },
                navItems.map((label) => (React.createElement("a", { key: label, href: `#${label.toLowerCase()}`, className: "block py-2", onClick: closeMenu }, label))),
                React.createElement(VippsButton, { className: "w-full justify-center text-sm" }, "Logg inn med Vipps"))) : null),
        React.createElement("main", null,
            React.createElement("section", { className: "px-4 py-12", id: "live", style: { background: SECTION_BACKGROUNDS.hero } },
                React.createElement("div", { className: "mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2" },
                    React.createElement("div", null,
                        React.createElement("h1", { className: "text-4xl font-black leading-tight sm:text-6xl", style: {
                                fontFamily: '"Luckiest Guy", "Inter", sans-serif',
                                letterSpacing: "0.05em",
                                textShadow: "0 10px 32px rgba(11,21,60,0.6)",
                            } }, siteSettings.heroTitle || "FJOLSENBANDEN"),
                        React.createElement("p", { className: "mt-4 max-w-xl text-base text-zinc-100 sm:text-lg" }, siteSettings.heroTagline ||
                            "Spillglede for hele familien. Trygge streams, turneringer og premier – foreldre verifiserer med Vipps."),
                        React.createElement("div", { className: "mt-6 flex flex-wrap gap-3" },
                            React.createElement(motion.div, { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } },
                                React.createElement(Button, { className: "rounded-full px-6 py-6 text-base font-semibold text-white shadow-lg", style: {
                                        background: `linear-gradient(120deg, ${BRAND.blue} 0%, ${BRAND.violet} 100%)`,
                                        boxShadow: `0 20px 38px ${BRAND.blue}45`,
                                    } }, "Se neste stream")),
                            React.createElement(motion.div, { whileHover: { scale: 1.03 }, whileTap: { scale: 0.98 } },
                                React.createElement(Button, { className: "rounded-full px-6 py-6 text-base font-semibold text-white shadow-lg", style: {
                                        background: `linear-gradient(120deg, ${BRAND.pink} 0%, ${BRAND.blue} 100%)`,
                                        boxShadow: `0 20px 38px ${BRAND.pink}35`,
                                    } }, "Meld inn barn"))),
                        React.createElement("div", { className: "mt-6 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3" },
                            React.createElement(Stat, { num: "3.2k", label: "Twitch" }),
                            React.createElement(Stat, { num: "4.2k", label: "YouTube" }),
                            React.createElement(Stat, { num: "2.5k", label: "Discord" }))),
                    React.createElement("div", { className: "relative" },
                        React.createElement(motion.div, { className: "absolute -inset-6 rounded-3xl blur-2xl", style: { background: `conic-gradient(from 120deg, ${BRAND.blue}, ${BRAND.pink})`, opacity: 0.28 }, animate: prefersReducedMotion ? undefined : { opacity: [0.25, 0.4, 0.25] }, transition: prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity } }),
                        React.createElement("div", { className: "relative aspect-video overflow-hidden rounded-3xl border border-white/15 bg-black/50 shadow-2xl" },
                            React.createElement(motion.div, { className: "absolute left-3 top-3 px-3 py-1 text-[11px] font-semibold", style: {
                                    background: BRAND.pink,
                                    color: "#000",
                                    borderRadius: 999,
                                    boxShadow: `0 0 24px ${BRAND.pink}7a`,
                                }, animate: prefersReducedMotion ? undefined : { opacity: [1, 0.6, 1] }, transition: prefersReducedMotion ? undefined : { repeat: Infinity, duration: 1.4 } }, "\uD83D\uDD34 LIVE"),
                            React.createElement(motion.img, { src: "/assets/mascot.svg", alt: "Fjolsenbanden maskot", className: "absolute bottom-4 right-4 w-28 opacity-90 sm:w-36", initial: prefersReducedMotion ? undefined : { y: 6 }, animate: prefersReducedMotion ? undefined : { y: [6, -4, 6] }, transition: prefersReducedMotion
                                    ? undefined
                                    : { duration: 4, repeat: Infinity, ease: "easeInOut" } }),
                            React.createElement("div", { className: "grid h-full w-full place-items-center text-zinc-300" },
                                React.createElement(Play, { className: "h-12 w-12", style: { color: BRAND.blue } }),
                                React.createElement("p", { className: "mt-2 text-xs opacity-80" }, "1\u2011min forh\u00E5ndsvisning \u2013 Twitch/YouTube")),
                            React.createElement("div", { className: "absolute bottom-5 left-5 right-5 space-y-2 rounded-2xl border border-white/10 bg-black/60 p-4 text-left text-sm text-zinc-100 shadow-xl" },
                                React.createElement("div", { className: "flex items-center gap-2 text-xs uppercase tracking-wide text-emerald-200" },
                                    React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                                    " Familievennlig oppdatering"),
                                React.createElement("p", null, siteSettings.announcement || "Neste livesending starter 20:00 med co-op og premier fra Lenovo."))),
                        React.createElement("div", { className: "mt-4 flex flex-wrap gap-3" },
                            React.createElement(Pill, { icon: React.createElement(Twitch, { className: "h-4 w-4" }), label: "Twitch", accent: "rgba(145,70,255,0.22)" }),
                            React.createElement(Pill, { icon: React.createElement(Youtube, { className: "h-4 w-4" }), label: "YouTube", accent: "rgba(255,82,82,0.22)" }),
                            React.createElement(Pill, { icon: React.createElement(Smartphone, { className: "h-4 w-4" }), label: "TikTok", accent: "rgba(255,122,255,0.18)" }),
                            React.createElement(Pill, { icon: React.createElement(Instagram, { className: "h-4 w-4" }), label: "Instagram", accent: "rgba(67,97,238,0.18)" }))))),
            React.createElement("section", { id: "medlemskap", className: "px-4 py-12", style: { background: SECTION_BACKGROUNDS.membership } },
                React.createElement("div", { className: "mx-auto max-w-7xl" },
                    React.createElement("h2", { className: "mb-6 text-2xl font-bold", style: { fontFamily: '"Luckiest Guy", cursive' } }, "Medlemskap"),
                    React.createElement("div", { className: "grid gap-6 md:grid-cols-3" },
                        React.createElement(Tier, { title: "Gratis", price: "0 kr", bullets: ["Discord & streams", "Ukentlige events", "Foreldre‑verifisering"], accent: BRAND.indigo }),
                        React.createElement(Tier, { title: "Premie", price: "49 kr/mnd", bullets: ["Vinne premier", "Ekstra konkurranser", "Prioritert support"], accent: BRAND.blue, hot: true }),
                        React.createElement(Tier, { title: "Sponsor", price: "299 kr/mnd", bullets: ["Synlighet på nettside/stream", "Logo‑vegg", "VIP‑events"], accent: BRAND.pink })))),
            React.createElement("section", { id: "premier", className: "px-4 py-12", style: { background: SECTION_BACKGROUNDS.rewards } },
                React.createElement("div", { className: "mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "mb-2 text-2xl font-bold", style: { fontFamily: '"Luckiest Guy", cursive' } }, "Premier & trekninger"),
                        React.createElement("ul", { className: "space-y-2 text-sm text-zinc-100" }, ["Ukentlig quiz + trekning", "Månedlig hovedpremie", "Sesongfinale med ekstra gevinster"].map((item) => (React.createElement("li", { key: item, className: "flex items-center gap-2" },
                            React.createElement(Trophy, { className: "h-4 w-4" }),
                            item))))),
                    React.createElement(Card, { className: "rounded-2xl border-white/10 backdrop-blur", style: { background: "rgba(9, 15, 47, 0.78)" } },
                        React.createElement(CardContent, { className: "grid gap-4 p-6 sm:grid-cols-3" }, PRIZES.map((prize) => (React.createElement(PrizeCard, { key: prize.brand, prize: prize }))))))),
            React.createElement("section", { id: "foreldre", className: "px-4 py-12", style: { background: SECTION_BACKGROUNDS.parents } },
                React.createElement("div", { className: "mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2" },
                    React.createElement(Card, { className: "rounded-2xl border-white/10 backdrop-blur", style: { background: "rgba(9, 15, 47, 0.78)" } },
                        React.createElement(CardHeader, null,
                            React.createElement(CardTitle, { className: "flex items-center gap-2" },
                                React.createElement(ShieldCheck, { className: "h-5 w-5" }),
                                " Foreldre\u2011innmelding")),
                        React.createElement(CardContent, { className: "space-y-3 text-sm text-white/90" },
                            React.createElement("p", null, "Forelder verifiserer seg trygt med Vipps. Vi henter navn og f\u00F8dselsdato automatisk. Legg inn barnets info \u2013 ferdig."),
                            React.createElement(VippsModulePreview, null),
                            React.createElement("div", { className: "flex flex-wrap gap-3" },
                                React.createElement(VippsButton, { "aria-label": "Logg inn med Vipps" }, "Logg inn med Vipps"),
                                React.createElement(Button, { variant: "outline", className: "rounded-full border-white/30 text-white" }, "Les personvern")))),
                    React.createElement(Card, { className: "rounded-2xl border-white/10 backdrop-blur", style: { background: "rgba(9, 15, 47, 0.78)" } },
                        React.createElement(CardHeader, null,
                            React.createElement(CardTitle, { className: "flex items-center gap-2" },
                                React.createElement(Users, { className: "h-5 w-5" }),
                                " Community")),
                        React.createElement(CardContent, { className: "grid grid-cols-3 gap-4 text-center" },
                            React.createElement(Stat, { num: "3.2k", label: "Twitch" }),
                            React.createElement(Stat, { num: "4.2k", label: "YouTube" }),
                            React.createElement(Stat, { num: "2.5k", label: "Discord" })))))),
        React.createElement("footer", { className: "border-t border-white/10", style: { background: BRAND.midnightSoft } },
            React.createElement("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-white/80 md:grid-cols-3" },
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-2 font-semibold text-white" }, "Fjolsenbanden"),
                    React.createElement("p", null, "Trygge, barnevennlige streams og aktiviteter. Vipps\u2011verifisering for foreldre.")),
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-2 font-semibold text-white" }, "Lenker"),
                    React.createElement("ul", { className: "space-y-2" },
                        React.createElement("li", null,
                            React.createElement("a", { href: "#live", className: "hover:underline" }, "Live")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#medlemskap", className: "hover:underline" }, "Medlemskap")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#premier", className: "hover:underline" }, "Premier")),
                        React.createElement("li", null,
                            React.createElement("a", { href: "#foreldre", className: "hover:underline" }, "Foreldre")))),
                React.createElement("div", null,
                    React.createElement("div", { className: "mb-2 font-semibold text-white" }, "Kontakt"),
                    React.createElement("p", null, "partner@fjolsenbanden.no"))),
            React.createElement("div", { className: "pb-8 text-center text-xs text-white/50" },
                "\u00A9 ",
                new Date().getFullYear(),
                " Fjolsenbanden"))));
}
function Pill({ icon, label, accent = "rgba(255,255,255,0.12)", }) {
    return (React.createElement(motion.button, { whileHover: { scale: 1.05, y: -2 }, whileTap: { scale: 0.97 }, className: "flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white", style: { boxShadow: `0 12px 24px ${accent}` } },
        React.createElement("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-white/10", style: { color: "white" } }, icon),
        React.createElement("span", { className: "font-medium tracking-wide" }, label)));
}
function Stat({ num, label }) {
    return (React.createElement("div", { className: "rounded-xl border border-white/10 bg-white/10 p-4 text-center text-white" },
        React.createElement("div", { className: "text-2xl font-extrabold", style: { color: BRAND.blue } }, num),
        React.createElement("div", { className: "text-xs text-zinc-100" }, label)));
}
function Tier({ title, price, bullets, accent, hot, }) {
    return (React.createElement(Card, { className: "rounded-2xl border-white/10 backdrop-blur", style: { background: "rgba(9, 15, 47, 0.78)" } },
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: "flex items-center gap-2 text-base" },
                React.createElement("span", { className: "inline-block h-3 w-3 rounded-full", style: { background: accent } }),
                title,
                hot ? (React.createElement("span", { className: "ml-2 rounded-full px-2 py-0.5 text-[10px]", style: { background: BRAND.pink, color: "black" } }, "MEST VALGT")) : null)),
        React.createElement(CardContent, { className: "space-y-3" },
            React.createElement("div", { className: "text-3xl font-extrabold", style: { color: accent } }, price),
            React.createElement("ul", { className: "space-y-2 text-sm text-zinc-100" }, bullets.map((item) => (React.createElement("li", { key: item, className: "flex items-center gap-2" },
                React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                item)))),
            React.createElement(Button, { className: "w-full rounded-full text-sm font-semibold text-white", style: { background: accent } }, "Velg"))));
}
function PrizeCard({ prize }) {
    const prefersReducedMotion = useReducedMotion();
    return (React.createElement("div", { className: "relative overflow-hidden rounded-2xl border border-white/15 bg-[#090f2f]/80 p-5 text-left shadow-[0_18px_40px_rgba(9,17,58,0.35)]" },
        React.createElement("div", { className: "absolute right-4 top-4 h-10 w-10 rounded-full bg-white/5", "aria-hidden": true }),
        React.createElement(motion.div, { className: "absolute -right-6 -top-6 h-20 w-20 rounded-full", style: { background: `radial-gradient(circle, ${BRAND.pink}55 0%, transparent 65%)` }, animate: prefersReducedMotion ? undefined : { rotate: [0, 12, 0] }, transition: prefersReducedMotion ? undefined : { repeat: Infinity, duration: 8, ease: "easeInOut" } }),
        React.createElement("div", { className: "relative rounded-xl bg-gradient-to-br from-white/15 via-white/5 to-white/0 p-4" },
            React.createElement("img", { src: prize.image, alt: `${prize.brand} premie`, className: "mx-auto h-24 w-auto", style: { filter: "brightness(0) invert(1)" } })),
        React.createElement("div", { className: "mt-4 text-xs uppercase tracking-[0.28em] text-white/60" }, "Partner"),
        React.createElement("div", { className: "mt-1 text-lg font-semibold text-white" }, prize.brand),
        React.createElement("div", { className: "mt-1 text-sm text-white/80" }, prize.item),
        React.createElement("div", { className: "mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white" },
            React.createElement(Sparkles, { className: "h-4 w-4" }),
            prize.value)));
}
function VippsModulePreview() {
    return (React.createElement("div", { className: "rounded-2xl border border-white/10 bg-[#1a1f33] p-4 text-sm text-white/90 shadow-[0_12px_30px_rgba(9,15,47,0.35)]" },
        React.createElement("div", { className: "flex items-center justify-between gap-3" },
            React.createElement("div", { className: "flex items-center gap-2" },
                React.createElement(VippsGlyph, { className: "h-6 w-6" }),
                React.createElement("div", { className: "text-xs uppercase tracking-[0.24em] text-white/60" }, "Vipps-modul")),
            React.createElement("span", { className: "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white" }, "Klar")),
        React.createElement("div", { className: "mt-3 space-y-2 text-xs text-white/70" },
            React.createElement("p", { className: "flex items-center gap-2" },
                React.createElement("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white" }, "1"),
                "Forelder velger \u00ABLogg inn med Vipps\u00BB."),
            React.createElement("p", { className: "flex items-center gap-2" },
                React.createElement("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white" }, "2"),
                "Vipps bekrefter identiteten automatisk."),
            React.createElement("p", { className: "flex items-center gap-2" },
                React.createElement("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-white/10 text-white" }, "3"),
                "Barnets profil er klar for premier og turneringer."))));
}
const VippsButton = React.forwardRef(({ className = "", children, ...rest }, ref) => (React.createElement(Button, { ref: ref, ...rest, className: `group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(255,90,0,0.45)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 ${className}`, style: {
        background: BRAND.salmon,
        fontFamily: '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif',
    } },
    React.createElement(VippsWordmark, { className: "h-4" }),
    React.createElement("span", { className: "tracking-wide" }, children))));
VippsButton.displayName = "VippsButton";
function VippsWordmark({ className = "" }) {
    return (React.createElement("svg", { "aria-hidden": true, viewBox: "0 0 72 24", className: className, fill: "currentColor", role: "img", focusable: "false" },
        React.createElement("path", { d: "M7.64 18.22c-3.55 0-6.16-2.52-6.16-6.2 0-3.64 2.61-6.18 6.16-6.18 2.02 0 3.41.84 4.28 1.98l-2.12 1.6c-.48-.62-1.17-1.04-2.16-1.04-1.68 0-2.91 1.36-2.91 3.64 0 2.3 1.23 3.66 2.91 3.66.99 0 1.7-.43 2.18-1.07l2.12 1.6c-.89 1.16-2.3 2.01-4.32 2.01Zm8.77-.18h-2.86V1.78h2.86v16.26Zm8.33.23c-3.48 0-5.91-2.61-5.91-6.22 0-3.61 2.43-6.22 5.91-6.22 3.47 0 5.89 2.61 5.89 6.22 0 3.61-2.42 6.22-5.89 6.22Zm0-2.55c1.77 0 3.03-1.43 3.03-3.67 0-2.24-1.26-3.67-3.03-3.67-1.78 0-3.05 1.43-3.05 3.67 0 2.24 1.27 3.67 3.05 3.67Zm11.68 2.55c-3.47 0-5.91-2.61-5.91-6.22 0-3.61 2.44-6.22 5.91-6.22 3.48 0 5.9 2.61 5.9 6.22 0 3.61-2.42 6.22-5.9 6.22Zm0-2.55c1.78 0 3.04-1.43 3.04-3.67 0-2.24-1.26-3.67-3.04-3.67-1.77 0-3.04 1.43-3.04 3.67 0 2.24 1.27 3.67 3.04 3.67Zm12.14 2.3c-2.18 0-3.9-.75-5.13-2.07l1.73-1.95c.93.93 2.1 1.43 3.36 1.43 1.12 0 1.78-.41 1.78-1.07 0-.66-.51-.91-2.18-1.29-2.62-.6-4.5-1.23-4.5-3.67 0-2.18 1.84-3.57 4.53-3.57 2 0 3.53.63 4.73 1.78l-1.7 1.92c-.95-.82-2-.1-3.07-.1-1.01 0-1.56.39-1.56.98 0 .68.55.93 2.2 1.31 2.61.61 4.48 1.3 4.48 3.65 0 2.35-1.91 3.65-4.67 3.65Zm8.52-.1c-1.5 0-2.96-.52-4.02-1.41l1.17-2.26c.87.7 1.88 1.07 2.91 1.07 1.04 0 1.68-.39 1.68-1.14 0-.72-.48-1.07-1.96-1.47-2.52-.64-3.59-1.6-3.59-3.42 0-2.04 1.63-3.42 3.99-3.42 1.45 0 2.67.46 3.65 1.21l-1.12 2.26c-.81-.6-1.62-.93-2.5-.93-.99 0-1.58.43-1.58 1.07 0 .7.5 1.01 2 1.41 2.38.62 3.54 1.56 3.54 3.47 0 2.08-1.7 3.56-4.17 3.56Z" })));
}
function VippsGlyph({ className = "" }) {
    return (React.createElement("svg", { "aria-hidden": true, viewBox: "0 0 32 32", className: className, role: "img", focusable: "false" },
        React.createElement("circle", { cx: "16", cy: "16", r: "16", fill: "#FF5A00" }),
        React.createElement("path", { d: "M10.4 15.1c-.44-.95.1-2.1 1.13-2.3l.16-.03c.78-.15 1.54.28 1.82 1.02l1.62 4.08 4.18-6.22c.46-.68 1.38-.88 2.08-.46.76.46.99 1.46.51 2.2l-5.4 7.96c-.67.99-2.15.88-2.66-.21l-2.44-5.05Z", fill: "white" })));
}
