"use client";
import { useEffect, useMemo, useState } from "react";
import { Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PlayerProfileView from "@/components/PlayerProfileView";
import { useAdminAuth } from "@/lib/admin-auth";
import { useAdminState } from "@/lib/admin-state";
export default function AdminProfilePreviewPage() {
    const auth = useAdminAuth();
    if (!auth.state.isAuthenticated) {
        return React.createElement(PreviewGate, { hint: auth.hint });
    }
    return React.createElement(ProfilePreviewContent, null);
}
function ProfilePreviewContent() {
    const { state } = useAdminState();
    const { siteSettings, players } = state;
    const [selectedPlayerId, setSelectedPlayerId] = useState(() => { var _a, _b; return (_b = (_a = players[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : ""; });
    useEffect(() => {
        if (!players.length) {
            setSelectedPlayerId("");
            return;
        }
        const hasSelected = players.some((player) => player.id === selectedPlayerId);
        if (!hasSelected) {
            setSelectedPlayerId(players[0].id);
        }
    }, [players, selectedPlayerId]);
    const selectedPlayer = useMemo(() => { var _a, _b; return (_b = (_a = players.find((player) => player.id === selectedPlayerId)) !== null && _a !== void 0 ? _a : players[0]) !== null && _b !== void 0 ? _b : null; }, [players, selectedPlayerId]);
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("div", { className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12" },
            React.createElement("header", { className: "space-y-6" },
                React.createElement("div", { className: "space-y-3" },
                    React.createElement("p", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200" },
                        React.createElement(Eye, { className: "h-4 w-4" }),
                        " Forh\u00E5ndsvis spillerprofil"),
                    React.createElement("h1", { className: "text-3xl font-semibold text-white sm:text-4xl" }, "Hvordan ser profilen ut for medlemmene?"),
                    React.createElement("p", { className: "max-w-2xl text-sm text-slate-300" }, "Velg en spiller fra listen for \u00E5 se den publiserte profilen slik den fremst\u00E5r for medlemmer og foreldre. Endringer du gj\u00F8r i adminpanelet oppdateres her s\u00E5 du kan kvalitetssikre alt f\u00F8r deling.")),
                players.length ? (React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between" },
                    React.createElement("div", { className: "flex flex-col gap-2" },
                        React.createElement(Label, { htmlFor: "preview-player", className: "text-sm font-semibold text-slate-200" }, "Velg spiller"),
                        React.createElement("select", { id: "preview-player", value: selectedPlayerId, onChange: (event) => setSelectedPlayerId(event.currentTarget.value), className: "w-full max-w-xs rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }, players.map((player) => (React.createElement("option", { key: player.id, value: player.id },
                            player.gamerTag,
                            " (",
                            player.mainGame,
                            ")"))))),
                    selectedPlayer ? (React.createElement(Button, { variant: "outline", onClick: () => {
                            if (typeof window !== "undefined") {
                                window.open(`/players/${selectedPlayer.slug}`, "_blank", "noopener,noreferrer");
                            }
                        } },
                        React.createElement(Eye, { className: "mr-2 h-4 w-4" }),
                        " \u00C5pne offentlig profil")) : null)) : null),
            !players.length ? (React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "text-lg text-white" }, "Ingen spillere registrert enn\u00E5")),
                React.createElement(CardContent, { className: "space-y-3 text-sm text-slate-300" },
                    React.createElement("p", null, "Legg til en spiller i adminpanelet for \u00E5 kunne forh\u00E5ndsvise profilen deres."),
                    React.createElement("p", null,
                        "G\u00E5 til ",
                        React.createElement("a", { href: "https://fjolsenbanden.setaei.com/admin", className: "text-cyan-300 underline" }, "adminpanelet"),
                        " og bruk \u00ABLegg til spiller\u00BB-skjemaet for \u00E5 komme i gang.")))) : selectedPlayer ? (React.createElement(PlayerProfileView, { player: selectedPlayer, siteSettings: siteSettings, extraActions: React.createElement(Button, { className: "rounded-full px-6 py-2 text-sm font-semibold", onClick: () => {
                        if (typeof window !== "undefined") {
                            window.open(`/players/${selectedPlayer.slug}`, "_blank", "noopener,noreferrer");
                        }
                    } }, "Se profil i ny fane") })) : null)));
}
function PreviewGate({ hint }) {
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("div", { className: "mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6" },
            React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                React.createElement(CardHeader, { className: "space-y-3 text-center" },
                    React.createElement("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200" },
                        React.createElement(Lock, { className: "h-5 w-5" })),
                    React.createElement(CardTitle, { className: "text-2xl text-white" }, "Logg inn for \u00E5 se forh\u00E5ndsvisningen"),
                    React.createElement("p", { className: "text-sm text-slate-300" }, "Denne siden er for administratorer. Logg inn via adminpanelet for \u00E5 forh\u00E5ndsvise spillerprofiler.")),
                React.createElement(CardContent, { className: "space-y-4 text-sm text-slate-300" },
                    React.createElement("p", null, hint),
                    React.createElement(Button, { className: "w-full", onClick: () => {
                            if (typeof window !== "undefined") {
                                window.location.href = "https://fjolsenbanden.setaei.com/admin";
                            }
                        } }, "G\u00E5 til admininnlogging"))))));
}
