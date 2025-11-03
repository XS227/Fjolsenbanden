"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Loader2, Lock, ShieldCheck, Trash2, Users, } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminState, } from "@/lib/admin-state";
import { useAdminAuth } from "@/lib/admin-auth";
const emptyNewPlayer = () => ({
    gamerTag: "",
    realName: "",
    mainGame: "",
    bio: "",
    achievements: "",
    avatarUrl: "",
    joinDate: new Date().toISOString().slice(0, 10),
    email: "",
    phone: "",
    birthDate: new Date().toISOString().slice(0, 10),
    gender: "",
    postalCode: "",
    city: "",
    fortnite: "",
    twitch: "",
    discord: "",
    youtube: "",
    tiktok: "",
});
export default function AdminMemberManager() {
    const auth = useAdminAuth();
    if (!auth.state.isAuthenticated) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" },
            React.createElement(LoginModal, { open: true, auth: auth, title: "Admininnlogging", description: "Logg inn for \u00E5 administrere medlemmene dine.", accent: "emerald" })));
    }
    return React.createElement(MemberManagerContent, null);
}
function MemberManagerContent() {
    const { state, addPlayer, updatePlayer, removePlayer } = useAdminState();
    const { players } = state;
    const [newPlayer, setNewPlayer] = useState(emptyNewPlayer());
    const [justAddedPlayer, setJustAddedPlayer] = useState(null);
    useEffect(() => {
        if (justAddedPlayer) {
            const timeout = window.setTimeout(() => setJustAddedPlayer(null), 4000);
            return () => window.clearTimeout(timeout);
        }
        return undefined;
    }, [justAddedPlayer]);
    const handleAddPlayer = (event) => {
        event.preventDefault();
        if (!newPlayer.gamerTag.trim()) {
            return;
        }
        addPlayer({
            gamerTag: newPlayer.gamerTag.trim(),
            realName: newPlayer.realName.trim() || newPlayer.gamerTag.trim(),
            mainGame: newPlayer.mainGame.trim() || "Allsidig",
            bio: newPlayer.bio.trim() || "Ny i Fjolsenbanden. Profilen oppdateres snart!",
            achievements: extractAchievements(newPlayer.achievements),
            avatarUrl: newPlayer.avatarUrl.trim() ||
                "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=320&q=80",
            joinDate: newPlayer.joinDate,
            contact: {
                fullName: newPlayer.realName.trim() || newPlayer.gamerTag.trim(),
                email: newPlayer.email.trim(),
                phone: newPlayer.phone.trim(),
                birthDate: newPlayer.birthDate,
                gender: newPlayer.gender.trim(),
                postalCode: newPlayer.postalCode.trim(),
                city: newPlayer.city.trim(),
            },
            socials: {
                fortnite: newPlayer.fortnite.trim() || undefined,
                twitch: newPlayer.twitch.trim() || undefined,
                discord: newPlayer.discord.trim() || undefined,
                youtube: newPlayer.youtube.trim() || undefined,
                tiktok: newPlayer.tiktok.trim() || undefined,
            },
        });
        setJustAddedPlayer(newPlayer.gamerTag.trim());
        setNewPlayer(emptyNewPlayer());
    };
    const orderedPlayers = useMemo(() => [...players].sort((a, b) => a.gamerTag.localeCompare(b.gamerTag, "nb")), [players]);
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("div", { className: "mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12" },
            React.createElement("header", { className: "flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between" },
                React.createElement("div", { className: "space-y-3" },
                    React.createElement("p", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200" },
                        React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                        " Medlemsadministrasjon"),
                    React.createElement("h1", { className: "text-3xl font-semibold tracking-tight text-white sm:text-4xl" }, "Administrer medlemmer"),
                    React.createElement("p", { className: "max-w-2xl text-base text-slate-300" }, "Oppdater kontaktinfo, spillpreferanser og sosiale lenker for hele teamet. Endringer lagres lokalt i nettleseren, slik at du kan jobbe trygt f\u00F8r du deler dem."),
                    justAddedPlayer ? (React.createElement("div", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-100" },
                        React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                        " ",
                        justAddedPlayer,
                        " er klar med egen profilside")) : null),
                React.createElement("div", { className: "flex flex-col items-end gap-3" },
                    React.createElement("div", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100" },
                        React.createElement(Lock, { className: "h-3.5 w-3.5" }),
                        " Innlogget som administrator"),
                    React.createElement("div", { className: "flex flex-wrap justify-end gap-2" },
                        React.createElement(Button, { asChild: true, variant: "outline" },
                            React.createElement("a", { href: "/admin" },
                                React.createElement(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                                " Tilbake til kontrollpanelet")),
                        React.createElement(Button, { asChild: true },
                            React.createElement("a", { href: "/admin/profile-preview" },
                                React.createElement(ArrowUpRight, { className: "mr-2 h-4 w-4" }),
                                " Forh\u00E5ndsvis profiler"))))),
            React.createElement("section", { className: "grid gap-6 lg:grid-cols-[1.1fr,0.9fr]" },
                React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                    React.createElement(CardHeader, { className: "pb-4" },
                        React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                            React.createElement(Users, { className: "h-5 w-5 text-cyan-300" }),
                            " Legg til nytt medlem"),
                        React.createElement("p", { className: "text-sm text-slate-300" }, "Fyll ut skjemaet for \u00E5 opprette en ny spillerprofil med kontaktinfo og sosiale lenker.")),
                    React.createElement(CardContent, null,
                        React.createElement("form", { className: "space-y-4", onSubmit: handleAddPlayer },
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement(Label, { htmlFor: "gamerTag", className: "text-slate-200" }, "Gamertag"),
                                React.createElement(Input, { id: "gamerTag", name: "gamerTag", value: newPlayer.gamerTag, onChange: (event) => setNewPlayer((state) => ({ ...state, gamerTag: event.target.value })), placeholder: "FjolseFar", className: "bg-slate-950/40 text-white placeholder:text-slate-400", required: true })),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "realName", className: "text-slate-200" }, "Fullt navn"),
                                    React.createElement(Input, { id: "realName", name: "realName", value: newPlayer.realName, onChange: (event) => setNewPlayer((state) => ({ ...state, realName: event.target.value })), placeholder: "Marius Fjolsen", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "mainGame", className: "text-slate-200" }, "Hovedspill"),
                                    React.createElement(Input, { id: "mainGame", name: "mainGame", value: newPlayer.mainGame, onChange: (event) => setNewPlayer((state) => ({ ...state, mainGame: event.target.value })), placeholder: "Mario Kart 8 Deluxe", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement(Label, { htmlFor: "bio", className: "text-slate-200" }, "Kort bio"),
                                React.createElement(Textarea, { id: "bio", name: "bio", rows: 3, value: newPlayer.bio, onChange: (event) => setNewPlayer((state) => ({ ...state, bio: event.target.value })), placeholder: "Hva gj\u00F8r spilleren unik?", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement(Label, { htmlFor: "achievements", className: "text-slate-200" }, "Meritter (kommaseparert)"),
                                React.createElement(Textarea, { id: "achievements", name: "achievements", rows: 2, value: newPlayer.achievements, onChange: (event) => setNewPlayer((state) => ({ ...state, achievements: event.target.value })), placeholder: "Arrangerte familieligaen 2023, Vant h\u00F8stturneringen", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                            React.createElement("div", { className: "space-y-2" },
                                React.createElement(Label, { htmlFor: "avatarUrl", className: "text-slate-200" }, "Avatar-URL"),
                                React.createElement(Input, { id: "avatarUrl", name: "avatarUrl", value: newPlayer.avatarUrl, onChange: (event) => setNewPlayer((state) => ({ ...state, avatarUrl: event.target.value })), placeholder: "https://...", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "joinDate", className: "text-slate-200" }, "Bli-med-dato"),
                                    React.createElement(Input, { id: "joinDate", type: "date", name: "joinDate", value: newPlayer.joinDate, onChange: (event) => setNewPlayer((state) => ({ ...state, joinDate: event.target.value })), className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "birthDate", className: "text-slate-200" }, "F\u00F8dselsdato"),
                                    React.createElement(Input, { id: "birthDate", type: "date", name: "birthDate", value: newPlayer.birthDate, onChange: (event) => setNewPlayer((state) => ({ ...state, birthDate: event.target.value })), className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "email", className: "text-slate-200" }, "E-post"),
                                    React.createElement(Input, { id: "email", name: "email", type: "email", value: newPlayer.email, onChange: (event) => setNewPlayer((state) => ({ ...state, email: event.target.value })), placeholder: "navn@fjolsenbanden.no", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "phone", className: "text-slate-200" }, "Mobil"),
                                    React.createElement(Input, { id: "phone", name: "phone", type: "tel", value: newPlayer.phone, onChange: (event) => setNewPlayer((state) => ({ ...state, phone: event.target.value })), placeholder: "+47 123 45 678", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "gender", className: "text-slate-200" }, "Kj\u00F8nn"),
                                    React.createElement(Input, { id: "gender", name: "gender", value: newPlayer.gender, onChange: (event) => setNewPlayer((state) => ({ ...state, gender: event.target.value })), placeholder: "F.eks. Kvinne", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "postalCode", className: "text-slate-200" }, "Postnr"),
                                    React.createElement(Input, { id: "postalCode", name: "postalCode", value: newPlayer.postalCode, onChange: (event) => setNewPlayer((state) => ({ ...state, postalCode: event.target.value })), placeholder: "0000", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "city", className: "text-slate-200" }, "Sted"),
                                    React.createElement(Input, { id: "city", name: "city", value: newPlayer.city, onChange: (event) => setNewPlayer((state) => ({ ...state, city: event.target.value })), placeholder: "Oslo", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "fortnite", className: "text-slate-200" }, "Fortnite-brukernavn"),
                                    React.createElement(Input, { id: "fortnite", name: "fortnite", value: newPlayer.fortnite, onChange: (event) => setNewPlayer((state) => ({ ...state, fortnite: event.target.value })), placeholder: "FjolseFar#Nord", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "twitch", className: "text-slate-200" }, "Twitch-brukernavn (valgfritt)"),
                                    React.createElement(Input, { id: "twitch", name: "twitch", value: newPlayer.twitch, onChange: (event) => setNewPlayer((state) => ({ ...state, twitch: event.target.value })), placeholder: "fjolsefar", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "discord", className: "text-slate-200" }, "Discord (valgfritt)"),
                                    React.createElement(Input, { id: "discord", name: "discord", value: newPlayer.discord, onChange: (event) => setNewPlayer((state) => ({ ...state, discord: event.target.value })), placeholder: "FjolseFar#1024", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "youtube", className: "text-slate-200" }, "YouTube-brukernavn (valgfritt)"),
                                    React.createElement(Input, { id: "youtube", name: "youtube", value: newPlayer.youtube, onChange: (event) => setNewPlayer((state) => ({ ...state, youtube: event.target.value })), placeholder: "@fjolsefar", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "tiktok", className: "text-slate-200" }, "TikTok-brukernavn (valgfritt)"),
                                    React.createElement(Input, { id: "tiktok", name: "tiktok", value: newPlayer.tiktok, onChange: (event) => setNewPlayer((state) => ({ ...state, tiktok: event.target.value })), placeholder: "@fjolsefar", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                            React.createElement(Button, { type: "submit", className: "w-full" }, "Opprett profil")))),
                React.createElement(Card, { className: "border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-emerald-900/20 text-white" },
                    React.createElement(CardHeader, { className: "pb-3" },
                        React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                            React.createElement(ShieldCheck, { className: "h-5 w-5 text-emerald-200" }),
                            " Tips for strukturert medlemspleie")),
                    React.createElement(CardContent, { className: "space-y-3 text-sm text-emerald-50/90" },
                        React.createElement("p", null, "Bruk feltet for meritter til \u00E5 l\u00F8fte frem h\u00F8ydepunkter fra turneringer og community-arbeid. Det gir sponsorer og foreldre et raskt overblikk over hva medlemmene har oppn\u00E5dd."),
                        React.createElement("p", null, "Kontaktinformasjonen lagres kun lokalt i adminpanelet. N\u00E5r du er forn\u00F8yd, eksporter dataene og del dem sikkert med resten av teamet.")))),
            React.createElement("section", { className: "space-y-6" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "text-2xl font-semibold text-white" },
                        "Aktive medlemmer (",
                        players.length,
                        ")"),
                    React.createElement("p", { className: "text-sm text-slate-300" }, "Oppdater feltene under for \u00E5 holde spillerprofilene oppdaterte og klare for deling.")),
                React.createElement("div", { className: "space-y-6" },
                    orderedPlayers.map((player) => (React.createElement(PlayerEditor, { key: player.id, player: player, onRemove: () => removePlayer(player.id), onSave: (updates) => updatePlayer(player.id, updates) }))),
                    orderedPlayers.length === 0 ? (React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                        React.createElement(CardHeader, null,
                            React.createElement(CardTitle, { className: "text-lg text-white" }, "Ingen medlemmer registrert")),
                        React.createElement(CardContent, { className: "space-y-3 text-sm text-slate-300" },
                            React.createElement("p", null, "Bruk skjemaet over for \u00E5 opprette det f\u00F8rste medlemmet."),
                            React.createElement("p", null, "Alle nye spillere f\u00E5r automatisk en offentlig profilside som kan deles med communityet.")))) : null)))));
}
function PlayerEditor({ player, onSave, onRemove }) {
    const [form, setForm] = useState(() => createPlayerFormState(player));
    const [status, setStatus] = useState("idle");
    const [dirty, setDirty] = useState(false);
    useEffect(() => {
        setForm(createPlayerFormState(player));
        setDirty(false);
        setStatus("idle");
    }, [player]);
    const handleInputChange = (field) => (event) => {
        const value = event.target.value;
        setForm((current) => ({ ...current, [field]: value }));
        setDirty(true);
    };
    const handleSave = (event) => {
        event.preventDefault();
        if (!dirty) {
            return;
        }
        setStatus("saving");
        Promise.resolve(onSave(buildPlayerUpdates(form)))
            .then(() => {
            setStatus("saved");
            setDirty(false);
            window.setTimeout(() => setStatus("idle"), 2000);
        })
            .catch(() => setStatus("idle"));
    };
    return (React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
        React.createElement(CardHeader, { className: "space-y-3 pb-4" },
            React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("img", { src: form.avatarUrl || player.avatarUrl, alt: player.gamerTag, className: "h-16 w-16 rounded-2xl object-cover" }),
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xl font-semibold text-white" }, player.gamerTag),
                        React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-300" }, player.mainGame),
                        React.createElement("p", { className: "text-xs text-slate-400" },
                            "Med siden ",
                            formatDate(player.joinDate)))),
                React.createElement("div", { className: "flex flex-wrap gap-2" },
                    React.createElement(Button, { asChild: true, size: "sm", variant: "outline" },
                        React.createElement("a", { href: `/players/${player.slug}` }, "Se offentlig profil")),
                    React.createElement(Button, { size: "sm", variant: "outline", className: "border-rose-400/40 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20", onClick: onRemove },
                        React.createElement(Trash2, { className: "mr-2 h-4 w-4" }),
                        " Fjern medlem"))),
            React.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-300" },
                "Status:",
                status === "saving" ? (React.createElement("span", { className: "inline-flex items-center gap-1 text-cyan-200" },
                    React.createElement(Loader2, { className: "h-3.5 w-3.5 animate-spin" }),
                    " Lagre endringer\u2026")) : status === "saved" ? (React.createElement("span", { className: "inline-flex items-center gap-1 text-emerald-200" },
                    React.createElement(ShieldCheck, { className: "h-3.5 w-3.5" }),
                    " Lagret")) : dirty ? (React.createElement("span", { className: "text-amber-200" }, "Ulagrede endringer")) : (React.createElement("span", { className: "text-slate-400" }, "Ingen endringer")))),
        React.createElement(CardContent, null,
            React.createElement("form", { className: "space-y-5", onSubmit: handleSave },
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "Gamertag", id: `gamerTag-${player.id}`, value: form.gamerTag, onChange: handleInputChange("gamerTag") }),
                    React.createElement(Field, { label: "Fullt navn", id: `realName-${player.id}`, value: form.realName, onChange: handleInputChange("realName") })),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "Hovedspill", id: `mainGame-${player.id}`, value: form.mainGame, onChange: handleInputChange("mainGame") }),
                    React.createElement(Field, { label: "Avatar-URL", id: `avatarUrl-${player.id}`, value: form.avatarUrl, onChange: handleInputChange("avatarUrl"), placeholder: "https://..." })),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "Bli-med-dato", id: `joinDate-${player.id}`, type: "date", value: form.joinDate, onChange: handleInputChange("joinDate") }),
                    React.createElement(Field, { label: "F\u00F8dselsdato", id: `birthDate-${player.id}`, type: "date", value: form.birthDate, onChange: handleInputChange("birthDate") })),
                React.createElement(FieldArea, { label: "Kort bio", id: `bio-${player.id}`, value: form.bio, onChange: handleInputChange("bio") }),
                React.createElement(FieldArea, { label: "Meritter (kommaseparert)", id: `achievements-${player.id}`, value: form.achievements, onChange: handleInputChange("achievements"), rows: 2 }),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "E-post", id: `email-${player.id}`, type: "email", value: form.email, onChange: handleInputChange("email") }),
                    React.createElement(Field, { label: "Mobil", id: `phone-${player.id}`, value: form.phone, onChange: handleInputChange("phone") })),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "Kj\u00F8nn", id: `gender-${player.id}`, value: form.gender, onChange: handleInputChange("gender") }),
                    React.createElement(Field, { label: "Postnummer", id: `postal-${player.id}`, value: form.postalCode, onChange: handleInputChange("postalCode") })),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "Sted", id: `city-${player.id}`, value: form.city, onChange: handleInputChange("city") }),
                    React.createElement(Field, { label: "Fortnite", id: `fortnite-${player.id}`, value: form.fortnite, onChange: handleInputChange("fortnite"), placeholder: "FjolseFar#Nord" })),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "Twitch", id: `twitch-${player.id}`, value: form.twitch, onChange: handleInputChange("twitch") }),
                    React.createElement(Field, { label: "Discord", id: `discord-${player.id}`, value: form.discord, onChange: handleInputChange("discord") })),
                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(Field, { label: "YouTube", id: `youtube-${player.id}`, value: form.youtube, onChange: handleInputChange("youtube") }),
                    React.createElement(Field, { label: "TikTok", id: `tiktok-${player.id}`, value: form.tiktok, onChange: handleInputChange("tiktok") })),
                React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3" },
                    React.createElement("p", { className: "text-xs text-slate-400" }, "Endringer lagres lokalt. Eksporter fra hovedpanelet for \u00E5 dele med teamet."),
                    React.createElement(Button, { type: "submit", className: "px-6", disabled: !dirty || status === "saving" }, status === "saving" ? (React.createElement(React.Fragment, null,
                        React.createElement(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                        " Lagrer\u2026")) : ("Lagre endringer")))))));
}
function Field({ label, id, value, onChange, type = "text", placeholder, }) {
    return (React.createElement("div", { className: "space-y-2" },
        React.createElement(Label, { htmlFor: id, className: "text-slate-200" }, label),
        React.createElement(Input, { id: id, value: value, type: type, placeholder: placeholder, onChange: onChange, className: "bg-slate-950/40 text-white placeholder:text-slate-400" })));
}
function FieldArea({ label, id, value, onChange, rows = 3, placeholder, }) {
    return (React.createElement("div", { className: "space-y-2" },
        React.createElement(Label, { htmlFor: id, className: "text-slate-200" }, label),
        React.createElement(Textarea, { id: id, value: value, rows: rows, placeholder: placeholder, onChange: onChange, className: "bg-slate-950/40 text-white placeholder:text-slate-400" })));
}
function createPlayerFormState(player) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
        gamerTag: player.gamerTag,
        realName: player.realName,
        mainGame: player.mainGame,
        bio: player.bio,
        achievements: player.achievements.join(", "),
        avatarUrl: player.avatarUrl,
        joinDate: player.joinDate,
        email: (_a = player.contact.email) !== null && _a !== void 0 ? _a : "",
        phone: (_b = player.contact.phone) !== null && _b !== void 0 ? _b : "",
        birthDate: (_c = player.contact.birthDate) !== null && _c !== void 0 ? _c : "",
        gender: (_d = player.contact.gender) !== null && _d !== void 0 ? _d : "",
        postalCode: (_e = player.contact.postalCode) !== null && _e !== void 0 ? _e : "",
        city: (_f = player.contact.city) !== null && _f !== void 0 ? _f : "",
        fortnite: (_g = player.socials.fortnite) !== null && _g !== void 0 ? _g : "",
        twitch: (_h = player.socials.twitch) !== null && _h !== void 0 ? _h : "",
        discord: (_j = player.socials.discord) !== null && _j !== void 0 ? _j : "",
        youtube: (_k = player.socials.youtube) !== null && _k !== void 0 ? _k : "",
        tiktok: (_l = player.socials.tiktok) !== null && _l !== void 0 ? _l : "",
    };
}
function buildPlayerUpdates(form) {
    return {
        gamerTag: form.gamerTag.trim(),
        realName: form.realName.trim() || form.gamerTag.trim(),
        mainGame: form.mainGame.trim() || "Allsidig",
        bio: form.bio.trim(),
        achievements: extractAchievements(form.achievements),
        avatarUrl: form.avatarUrl.trim(),
        joinDate: form.joinDate,
        contact: {
            fullName: form.realName.trim() || form.gamerTag.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            birthDate: form.birthDate,
            gender: form.gender.trim(),
            postalCode: form.postalCode.trim(),
            city: form.city.trim(),
        },
        socials: {
            fortnite: form.fortnite.trim() || undefined,
            twitch: form.twitch.trim() || undefined,
            discord: form.discord.trim() || undefined,
            youtube: form.youtube.trim() || undefined,
            tiktok: form.tiktok.trim() || undefined,
        },
    };
}
function extractAchievements(input) {
    return input
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}
function formatDate(input) {
    if (!input) {
        return "Ukjent";
    }
    try {
        return new Date(input).toLocaleDateString("no-NO", {
            year: "numeric",
            month: "short",
        });
    }
    catch (error) {
        return input;
    }
}
