"use client";
import { ArrowLeft, Award, Gamepad2, MessageCircle, Music2, Twitch, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function PlayerProfileView({ player, siteSettings, backLink, extraActions }) {
    var _a;
    const heroTitle = ((_a = siteSettings.heroTitle) === null || _a === void 0 ? void 0 : _a.trim()) || "Fjolsenbanden";
    const socialEntries = buildSocialEntries(player.socials);
    const segmentSummary = formatSegments(player.socials);
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("section", { className: "relative overflow-hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.25),transparent_55%)]" }),
            React.createElement("div", { className: "relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16" },
                backLink || extraActions ? (React.createElement("div", { className: "flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left" },
                    backLink ? (React.createElement("a", { href: backLink.href, className: "inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white" },
                        React.createElement(ArrowLeft, { className: "h-4 w-4" }),
                        " ",
                        backLink.label)) : (React.createElement("span", { className: "hidden sm:block" })),
                    extraActions ? React.createElement("div", { className: "flex justify-center sm:justify-end" }, extraActions) : null)) : null,
                React.createElement("div", { className: "flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left" },
                    React.createElement("img", { src: player.avatarUrl, alt: player.gamerTag, className: "h-28 w-28 rounded-3xl border-4 border-white/30 object-cover shadow-xl" }),
                    React.createElement("div", { className: "space-y-3" },
                        React.createElement("p", { className: "text-xs uppercase tracking-widest text-cyan-200" }, heroTitle),
                        React.createElement("h1", { className: "text-3xl font-semibold text-white sm:text-4xl" }, player.gamerTag),
                        React.createElement("p", { className: "text-sm text-slate-200 sm:text-base" }, player.bio),
                        socialEntries.length > 0 ? (React.createElement("div", { className: "flex flex-wrap justify-center gap-3 sm:justify-start" }, socialEntries.map((entry) => (React.createElement(SocialLink, { key: entry.key, href: entry.href, label: entry.label, handle: entry.handle, icon: entry.icon }))))) : null)))),
        React.createElement("div", { className: "mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10" },
            React.createElement("section", { className: "grid gap-6 sm:grid-cols-[2fr,1fr]" },
                React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                    React.createElement(CardHeader, { className: "pb-4" },
                        React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                            React.createElement(Award, { className: "h-5 w-5 text-emerald-300" }),
                            " Meritter")),
                    React.createElement(CardContent, null, player.achievements.length > 0 ? (React.createElement("ul", { className: "space-y-3 text-sm text-slate-200" }, player.achievements.map((achievement) => (React.createElement("li", { key: achievement, className: "flex items-start gap-3" },
                        React.createElement("span", { className: "mt-1 inline-block h-2 w-2 rounded-full bg-emerald-300" }),
                        React.createElement("span", null, achievement)))))) : (React.createElement("p", { className: "text-sm text-slate-300" }, "Meritter legges til senere.")))),
                React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                    React.createElement(CardHeader, { className: "pb-3" },
                        React.createElement(CardTitle, { className: "text-white" }, "Info")),
                    React.createElement(CardContent, { className: "space-y-3 text-sm text-slate-200" },
                        React.createElement(InfoRow, { label: "Hovedspill", value: player.mainGame }),
                        React.createElement(InfoRow, { label: "Med siden", value: new Date(player.joinDate).toLocaleDateString("no-NO", {
                                month: "long",
                                year: "numeric",
                            }) }),
                        segmentSummary ? React.createElement(InfoRow, { label: "Segmenter", value: segmentSummary }) : null,
                        React.createElement(InfoRow, { label: "Kontakt", value: "Kontaktinfo deles kun gjennom Fjolsenbanden-admin." })))),
            React.createElement(Card, { className: "border-white/10 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-slate-900/40 text-white" },
                React.createElement(CardHeader, { className: "pb-4" },
                    React.createElement(CardTitle, { className: "text-white" },
                        "Hvorfor vi stoler p\u00E5 ",
                        player.gamerTag)),
                React.createElement(CardContent, { className: "space-y-4 text-sm text-slate-200" },
                    React.createElement("p", null,
                        player.gamerTag,
                        " er en del av ",
                        heroTitle,
                        " fordi spilleren skaper trygge og inkluderende opplevelser for hele familien. Foreldre f\u00E5r alltid informasjon om hvem barnet spiller med, og sendingene modereres av teamet v\u00E5rt."),
                    React.createElement("p", { className: "text-xs text-slate-300" }, "Disse profilene administreres via det interne adminpanelet. Oppdater bio, logo og tekst der for \u00E5 holde informasjonen fersk."))))));
}
export { PlayerProfileView };
export default PlayerProfileView;
function SocialLink({ href, label, handle, icon }) {
    const content = (React.createElement(React.Fragment, null,
        React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white" }, icon),
        React.createElement("span", { className: "flex flex-col text-left" },
            React.createElement("span", { className: "text-[11px] uppercase tracking-widest text-slate-300" }, label),
            React.createElement("span", { className: "text-sm font-medium text-white" }, handle))));
    if (href) {
        return (React.createElement("a", { href: href, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-200" }, content));
    }
    return (React.createElement("div", { className: "inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs text-white" }, content));
}
function InfoRow({ label, value }) {
    return (React.createElement("div", { className: "rounded-xl border border-white/10 bg-white/5 px-4 py-3" },
        React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-300" }, label),
        React.createElement("p", { className: "mt-1 text-sm text-white" }, value)));
}
function buildSocialEntries(socials) {
    const config = [
        { key: "fortnite", label: "Fortnite", icon: React.createElement(Gamepad2, { className: "h-4 w-4" }), href: undefined },
        {
            key: "twitch",
            label: "Twitch",
            icon: React.createElement(Twitch, { className: "h-4 w-4" }),
            href: (handle) => `https://twitch.tv/${stripHandle(handle)}`,
        },
        {
            key: "discord",
            label: "Discord",
            icon: React.createElement(MessageCircle, { className: "h-4 w-4" }),
            href: undefined,
        },
        {
            key: "tiktok",
            label: "TikTok",
            icon: React.createElement(Music2, { className: "h-4 w-4" }),
            href: (handle) => `https://www.tiktok.com/@${stripHandle(handle)}`,
        },
        {
            key: "youtube",
            label: "YouTube",
            icon: React.createElement(Youtube, { className: "h-4 w-4" }),
            href: (handle) => `https://www.youtube.com/@${stripHandle(handle)}`,
        },
    ];
    return config
        .map((item) => {
        const handle = socials[item.key];
        if (!handle) {
            return null;
        }
        const cleanHandle = handle.trim();
        const href = typeof item.href === "function" ? item.href(cleanHandle) : undefined;
        return {
            key: item.key,
            label: item.label,
            handle: cleanHandle,
            href,
            icon: item.icon,
        };
    })
        .filter((entry) => Boolean(entry));
}
function formatSegments(socials) {
    const segments = [
        socials.fortnite ? "Fortnite" : null,
        socials.twitch ? "Twitch" : null,
        socials.youtube ? "YouTube" : null,
        socials.discord ? "Discord" : null,
        socials.tiktok ? "TikTok" : null,
    ].filter(Boolean);
    return segments.join(" • ");
}
function stripHandle(handle) {
    return handle.replace(/^@/, "");
}
