"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, LogOut, Shield } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { useAdminState } from "@/lib/admin-state";
import PlayerProfileView from "@/components/PlayerProfileView";
import { useMemberAuth } from "@/lib/member-auth";
export default function PlayerProfilePage() {
    const memberAuth = useMemberAuth();
    const { state, findPlayerBySlug } = useAdminState();
    const { siteSettings } = state;
    const [slug, setSlug] = useState(() => "");
    useEffect(() => {
        var _a;
        if (typeof window === "undefined") {
            return;
        }
        const pathSlug = (_a = window.location.pathname.split("/").filter(Boolean).pop()) !== null && _a !== void 0 ? _a : "";
        setSlug(decodeURIComponent(pathSlug));
    }, []);
    const player = useMemo(() => (slug ? findPlayerBySlug(slug) : null), [findPlayerBySlug, slug]);
    if (!memberAuth.state.isAuthenticated) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" },
            React.createElement(LoginModal, { open: true, auth: memberAuth, title: "Medlemsinnhold", description: "Logg inn som medlem for \u00E5 se spillerprofilen.", accent: "cyan" })));
    }
    if (!player) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
            React.createElement("div", { className: "mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center" },
                React.createElement(Shield, { className: "h-12 w-12 text-emerald-300" }),
                React.createElement("h1", { className: "text-3xl font-semibold text-white" }, "Profilen er ikke klar enn\u00E5"),
                React.createElement("p", { className: "max-w-lg text-sm text-slate-300" }, "Vi fant ingen spiller med denne adressen. Oppdater adminpanelet og lag en ny profil for spilleren, eller del en gyldig lenke."),
                React.createElement(Button, { asChild: true, className: "gap-2" },
                    React.createElement("a", { href: "https://fjolsenbanden.setaei.com/admin", className: "flex items-center gap-2" },
                        React.createElement(ArrowLeft, { className: "h-4 w-4" }),
                        " Tilbake til admin")))));
    }
    return (React.createElement(PlayerProfileView, { player: player, siteSettings: siteSettings, backLink: { href: "https://fjolsenbanden.setaei.com/players", label: "Til spilleroversikt" }, extraActions: React.createElement(Button, { variant: "outline", onClick: memberAuth.logout },
            React.createElement(LogOut, { className: "mr-2 h-4 w-4" }),
            " Logg ut") }));
}
