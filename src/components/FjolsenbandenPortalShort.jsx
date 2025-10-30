import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Trophy, Shield, Star, PlayCircle, Menu, X } from "lucide-react";
import { DEMO_STREAM_URL } from "@/lib/demoStream";
const levelAccentClasses = {
    cyan: "border-cyan-300 ring-1 ring-cyan-400/40",
    amber: "border-amber-300 ring-1 ring-amber-400/40",
};
const navLinks = [
    { href: "#hjem", label: "Hjem" },
    { href: "#medlem", label: "Medlemskap" },
    { href: "#premier", label: "Premier" },
    { href: "#foreldre", label: "Foreldre" },
    { href: "#sponsor", label: "Sponsorer" },
];
const membershipLevels = [
    {
        title: "Gratis",
        price: "0 kr",
        features: ["Tilgang til Discord", "Deltakelse i events"],
    },
    {
        title: "Premie",
        price: "49 kr/mnd",
        accent: "cyan",
        features: [
            "Vinn premier",
            "Spesial-konkurranser",
            "Foreldreverifisering via Vipps",
        ],
    },
    {
        title: "Sponsor",
        price: "299 kr/mnd",
        accent: "amber",
        features: ["Logo på nettside", "Synlighet i stream", "Tilgang til sponsor-events"],
    },
];
const monthlyPrizes = [
    { brand: "Lenovo", item: "Gaming-headset" },
    { brand: "Samsung", item: "27” skjerm" },
    { brand: "Philips", item: "Hue-kit" },
    { brand: "NKI", item: "Kursstipend" },
];
const communityStats = [
    { num: "3 200+", label: "Twitch" },
    { num: "4 200+", label: "TikTok" },
    { num: "2 500+", label: "Discord" },
];
const sponsorLogos = ["Lenovo", "Samsung", "Philips", "NKI", "+ Din logo"];
export default function FjolsenbandenPortalShort() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white text-zinc-900" },
        React.createElement("header", { className: "sticky top-0 z-50 border-b bg-white/80 backdrop-blur" },
            React.createElement("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3" },
                React.createElement("div", { className: "flex items-center gap-2" },
                    React.createElement("div", { className: "rounded-xl bg-[#00CFFF] px-3 py-2 font-bold text-white" }, "FB"),
                    React.createElement("span", { className: "font-semibold" }, "Fjolsenbanden")),
                React.createElement("nav", { className: "hidden gap-5 text-sm md:flex" }, navLinks.map((link) => (React.createElement("a", { key: link.href, className: "rounded-full px-3 py-1 transition hover:bg-[#00CFFF]/10 hover:text-[#00CFFF]", href: link.href, onClick: () => setMenuOpen(false) }, link.label)))),
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement(Button, { className: "hidden rounded-full sm:inline-flex" }, "Logg inn med Vipps"),
                    React.createElement("button", { className: "rounded-full border border-zinc-200 p-2 md:hidden", "aria-label": menuOpen ? "Lukk meny" : "Åpne meny", "aria-expanded": menuOpen, "aria-controls": "portal-mobile-nav", onClick: () => setMenuOpen((open) => !open) }, menuOpen ? (React.createElement(X, { "aria-hidden": "true", className: "h-5 w-5" })) : (React.createElement(Menu, { "aria-hidden": "true", className: "h-5 w-5" }))))),
            menuOpen ? (React.createElement("nav", { id: "portal-mobile-nav", className: "border-t border-zinc-200 bg-white/95 py-3 md:hidden" },
                React.createElement("ul", { className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 text-sm" }, navLinks.map((link) => (React.createElement("li", { key: link.href },
                    React.createElement("a", { className: "flex items-center justify-between rounded-xl border border-zinc-200 px-3 py-2 font-medium text-zinc-700 transition hover:border-[#00CFFF] hover:text-[#00CFFF]", href: link.href, onClick: () => setMenuOpen(false) },
                        link.label,
                        React.createElement("span", { "aria-hidden": true }, "\u2192")))))))) : null),
        React.createElement("section", { id: "hjem", className: "bg-gradient-to-b from-[#00CFFF]/10 to-transparent py-12 text-center" },
            React.createElement("h1", { className: "mb-4 text-4xl font-extrabold" },
                "Spill, vinn og h\u00F8r til \u2013 ",
                React.createElement("span", { className: "text-[#00CFFF]" }, "Fjolsenbanden")),
            React.createElement("p", { className: "mx-auto max-w-xl text-zinc-600" }, "Norges tryggeste gaming-community for barn og unge. Foreldre logger inn via Vipps \u2013 alt er trygt, enkelt og g\u00F8y."),
            React.createElement("div", { className: "mt-6 flex justify-center gap-3" },
                React.createElement(Button, { className: "rounded-full px-6 py-4 text-base" }, "Meld inn barn"),
                React.createElement(Button, { className: "rounded-full px-6 py-4 text-base", variant: "outline", onClick: () => {
                        if (typeof window !== "undefined") {
                            window.open(DEMO_STREAM_URL, "_blank", "noopener,noreferrer");
                        }
                    } }, "Se demo stream")),
            React.createElement("div", { className: "mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-600" }, communityStats.map((stat) => (React.createElement("span", { key: stat.label, className: "rounded-full border border-zinc-200 px-3 py-1" },
                stat.num,
                " ",
                stat.label))))),
        React.createElement("section", { id: "medlem", className: "mx-auto max-w-6xl px-4 py-12" },
            React.createElement("h2", { className: "mb-6 text-center text-2xl font-bold" }, "Velg medlemsniv\u00E5"),
            React.createElement("div", { className: "grid gap-4 md:grid-cols-3" }, membershipLevels.map((level) => (React.createElement(LevelCard, { key: level.title, title: level.title, price: level.price, features: level.features, accent: level.accent }))))),
        React.createElement("section", { id: "premier", className: "border-t bg-white px-4 py-12" },
            React.createElement("div", { className: "mx-auto flex max-w-5xl flex-col gap-6 text-center md:flex-row md:text-left" },
                React.createElement("div", { className: "md:w-1/2" },
                    React.createElement("h2", { className: "mb-2 text-2xl font-bold" }, "Premier & trekninger"),
                    React.createElement("p", { className: "text-zinc-600" }, "Lenovo, Samsung, Philips, NKI og flere gir premier hver m\u00E5ned. Alle medlemmer f\u00E5r automatisk lodd n\u00E5r de deltar p\u00E5 ukens aktivitet."),
                    React.createElement("div", { className: "mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-600 md:justify-start" },
                        React.createElement("span", { className: "flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1" },
                            React.createElement(Trophy, { className: "h-4 w-4 text-[#00CFFF]" }),
                            " M\u00E5nedlige premier"),
                        React.createElement("span", { className: "flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1" },
                            React.createElement(PlayCircle, { className: "h-4 w-4 text-[#00CFFF]" }),
                            " Live trekninger"))),
                React.createElement("div", { className: "flex flex-1 flex-wrap justify-center gap-4 md:justify-end" }, monthlyPrizes.map((prize) => (React.createElement(Prize, { key: prize.brand, brand: prize.brand, item: prize.item })))))),
        React.createElement("section", { id: "foreldre", className: "mx-auto grid max-w-5xl gap-6 px-4 py-12 md:grid-cols-2" },
            React.createElement(Card, { className: "rounded-2xl" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "flex items-center gap-2" },
                        React.createElement(Shield, { className: "h-5 w-5" }),
                        " Trygg innmelding")),
                React.createElement(CardContent, { className: "space-y-3 text-sm text-zinc-600" },
                    React.createElement("p", null, "Foreldre logger inn via Vipps. Vi henter kun navn og f\u00F8dselsdato for \u00E5 sikre trygg bruk."),
                    React.createElement(Button, { className: "rounded-full" }, "Logg inn med Vipps"))),
            React.createElement(Card, { className: "rounded-2xl bg-[#00CFFF]/5 text-center" },
                React.createElement(CardContent, { className: "space-y-3 p-6" },
                    React.createElement(PlayCircle, { className: "mx-auto h-10 w-10 text-[#00CFFF]" }),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-semibold" }, "Neste stream: Fredag 19:00"),
                        React.createElement("p", { className: "text-sm text-zinc-600" }, "Bli med live p\u00E5 Twitch eller YouTube.")),
                    React.createElement(Button, { className: "rounded-full", variant: "outline" }, "Sett p\u00E5 p\u00E5minnelse")))),
        React.createElement("section", { id: "sponsor", className: "border-t bg-gradient-to-b from-white to-[#f7f7f7] px-4 py-12" },
            React.createElement("div", { className: "mx-auto max-w-4xl space-y-4 text-center" },
                React.createElement("h2", { className: "text-2xl font-bold" }, "For sponsorer og partnere"),
                React.createElement("p", { className: "mx-auto max-w-lg text-zinc-600" }, "N\u00E5 over 700+ aktive medlemmer, foreldre og unge gamere. Fjolsenbanden gir trygt engasjement og synlighet."),
                React.createElement(Button, { className: "rounded-full" }, "Last ned sponsor-deck"),
                React.createElement("div", { className: "mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold" }, sponsorLogos.map((sponsor) => (React.createElement("span", { key: sponsor, className: "rounded-xl border px-4 py-2" }, sponsor)))))),
        React.createElement("footer", { className: "border-t py-6 text-center text-xs text-zinc-500" },
            "\u00A9 ",
            new Date().getFullYear(),
            " Fjolsenbanden \u2013 Et trygt community for unge spillere.")));
}
function LevelCard({ title, price, features, accent }) {
    return (React.createElement(Card, { className: `rounded-2xl border ${accent ? levelAccentClasses[accent] : "border-zinc-200"}` },
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: "flex items-center gap-2" },
                React.createElement(Star, { className: "h-5 w-5" }),
                title)),
        React.createElement(CardContent, { className: "space-y-2 text-sm" },
            React.createElement("div", { className: "text-2xl font-bold" }, price),
            features.map((feature) => (React.createElement(Feature, { key: feature, text: feature }))),
            React.createElement(Button, { className: "mt-3 w-full rounded-full" }, "Velg"))));
}
function Prize({ brand, item }) {
    return (React.createElement(Card, { className: "w-40 rounded-xl border p-4 text-center" },
        React.createElement("div", { className: "text-xs uppercase text-zinc-500" }, "Partner"),
        React.createElement("div", { className: "font-bold" }, brand),
        React.createElement("div", { className: "mt-1 text-sm" }, item)));
}
function Feature({ text }) {
    return (React.createElement("div", { className: "flex items-center gap-2 text-zinc-600" },
        React.createElement(Check, { className: "h-4 w-4 text-[#00CFFF]" }),
        React.createElement("span", null, text)));
}
