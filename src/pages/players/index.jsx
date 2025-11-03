"use client";
import { useMemo } from "react";
import { ArrowRight, Trophy, Users } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminState } from "@/lib/admin-state";
import { useMemberAuth } from "@/lib/member-auth";
export default function PlayersIndexPage() {
    var _a, _b;
    const memberAuth = useMemberAuth();
    const { state } = useAdminState();
    const { siteSettings, players, statsHistory } = state;
    if (!memberAuth.state.isAuthenticated) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" },
            React.createElement(LoginModal, { open: true, auth: memberAuth, title: "Medlemsinnlogging", description: "Logg inn som medlem for \u00E5 se spilleroversikten og profiler med medlemsinnhold.", accent: "cyan" })));
    }
    const totalMembers = (_b = (_a = statsHistory.at(-1)) === null || _a === void 0 ? void 0 : _a.members) !== null && _b !== void 0 ? _b : players.length * 120;
    const tournaments = statsHistory.reduce((sum, point) => sum + point.tournaments, 0);
    const featuredPlayers = useMemo(() => players.slice(0, 6), [players]);
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("div", { className: "mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12" },
            React.createElement("div", { className: "flex justify-end" },
                React.createElement(Button, { variant: "outline", onClick: memberAuth.logout }, "Logg ut")),
            React.createElement("header", { className: "space-y-6 text-center" },
                React.createElement("p", { className: "inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-cyan-100" },
                    React.createElement(Users, { className: "h-3.5 w-3.5" }),
                    " Spillerstallen"),
                React.createElement("h1", { className: "text-3xl font-semibold tracking-tight text-white sm:text-4xl" },
                    "Spillere i ",
                    siteSettings.heroTitle || "Fjolsenbanden"),
                React.createElement("p", { className: "mx-auto max-w-2xl text-sm text-slate-300 sm:text-base" }, "Communityet vokser hver uke. Her finner du oversikt over v\u00E5re trygge og familievennlige streamere, med lenker til deres profiler og sosiale kanaler."),
                React.createElement("div", { className: "flex flex-wrap justify-center gap-4 text-sm text-slate-200" },
                    React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2" },
                        React.createElement(Users, { className: "h-4 w-4 text-emerald-300" }),
                        " ",
                        totalMembers.toLocaleString("no-NO"),
                        " medlemmer"),
                    React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2" },
                        React.createElement(Trophy, { className: "h-4 w-4 text-amber-300" }),
                        " ",
                        tournaments,
                        " turneringer i \u00E5r"))),
            React.createElement("section", { className: "grid gap-6 sm:grid-cols-2" },
                featuredPlayers.map((player) => (React.createElement(Card, { key: player.id, className: "border-white/10 bg-white/5 text-white" },
                    React.createElement(CardHeader, { className: "flex items-center gap-4" },
                        React.createElement("img", { src: player.avatarUrl, alt: player.gamerTag, className: "h-14 w-14 rounded-2xl object-cover" }),
                        React.createElement("div", null,
                            React.createElement(CardTitle, { className: "text-xl text-white" }, player.gamerTag),
                            React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-300" }, player.mainGame))),
                    React.createElement(CardContent, { className: "space-y-4" },
                        React.createElement("p", { className: "text-sm text-slate-200 line-clamp-3" }, player.bio),
                        React.createElement("div", { className: "text-xs uppercase tracking-wide text-slate-300" },
                            "Med siden ",
                            new Date(player.joinDate).toLocaleDateString("no-NO", { month: "short", year: "numeric" })),
                        React.createElement(Button, { asChild: true, className: "w-full rounded-2xl px-4 py-3 text-sm" },
                            React.createElement("a", { href: `/players/${player.slug}` },
                                "Se profil ",
                                React.createElement(ArrowRight, { className: "ml-2 h-4 w-4" }))))),
                featuredPlayers.length === 0 ? (React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                    React.createElement(CardContent, { className: "p-8 text-center text-sm text-slate-300" }, "Ingen spillere er registrert enn\u00E5. Opprett deres f\u00F8rste profil i adminpanelet."))) : null))));
}
