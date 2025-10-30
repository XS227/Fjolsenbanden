"use client";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
const initialFormData = {
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    postalCode: "",
    city: "",
    fortniteUsername: "",
    twitchUsername: "",
    discordName: "",
    tiktokUsername: "",
    youtubeUsername: "",
    streams: "",
    streamLink: "",
    platforms: [],
    otherPlatform: "",
    games: [],
    otherGame: "",
    rulesConsent: false,
    guardianConsent: false,
};
const platformOptions = ["PC", "Playstation", "Xbox", "Nintendo"];
const gameOptions = [
    "Fortnite",
    "FC25/FC26",
    "F1 25",
    "Valorant",
    "Roblox",
    "Minecraft",
    "Call of Duty / Battlefield",
    "Rocket League",
    "Apex Legends",
    "Counter-Strike 2",
    "Overwatch 2",
    "Stumble Guys",
];
const inputClasses = "mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-zinc-400 focus:border-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]/40";
const checkboxBaseClasses = "h-5 w-5 rounded-md border border-white/20 bg-white/5 text-[#13A0F9] focus:ring-[#13A0F9]";
export default function RegistrationFormPage() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const selectedPlatforms = useMemo(() => [...formData.platforms, formData.otherPlatform].filter(Boolean).join(", "), [formData.otherPlatform, formData.platforms]);
    const selectedGames = useMemo(() => [...formData.games, formData.otherGame].filter(Boolean).join(", "), [formData.games, formData.otherGame]);
    const handleTextChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };
    const handleCheckboxToggle = (collection, value) => {
        setFormData((previous) => {
            const existing = previous[collection];
            const hasValue = existing.includes(value);
            return {
                ...previous,
                [collection]: hasValue
                    ? existing.filter((entry) => entry !== value)
                    : [...existing, value],
            };
        });
    };
    const handleConsentToggle = (name) => {
        setFormData((previous) => ({ ...previous, [name]: !previous[name] }));
    };
    const validateForm = () => {
        const issues = [];
        if (!formData.name.trim()) {
            issues.push("Fyll inn barnets navn.");
        }
        if (!formData.email.trim()) {
            issues.push("Legg inn en gyldig e-postadresse.");
        }
        if (!formData.birthDate.trim()) {
            issues.push("Fødselsdato må fylles inn.");
        }
        if (!formData.postalCode.trim() || !formData.city.trim()) {
            issues.push("Postnummer og sted må fylles inn.");
        }
        if (!formData.rulesConsent) {
            issues.push("Du må godta retningslinjer og personvernerklæring.");
        }
        if (!formData.guardianConsent) {
            issues.push("Foresatt må samtykke til deltakelse og premier.");
        }
        return issues;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationIssues = validateForm();
        if (validationIssues.length > 0) {
            setErrors(validationIssues);
            return;
        }
        setErrors([]);
        setIsSubmitted(true);
    };
    const handleReset = () => {
        setFormData(initialFormData);
        setErrors([]);
        setIsSubmitted(false);
    };
    if (isSubmitted) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white" },
            React.createElement("main", { className: "mx-auto max-w-4xl px-6 py-16" },
                React.createElement("div", { className: "rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur" },
                    React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start" },
                        React.createElement("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300" },
                            React.createElement(CheckCircle2, { className: "h-7 w-7", "aria-hidden": "true" })),
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-xs uppercase tracking-[0.28em] text-emerald-200/80" }, "Registrering fullf\u00F8rt"),
                            React.createElement("h1", { className: "mt-2 text-3xl font-bold sm:text-4xl" }, "Takk! Skjemaet er sendt inn."),
                            React.createElement("p", { className: "mt-3 text-lg text-zinc-200" }, "Vi lagrer informasjonen og f\u00F8lger opp via e-post eller telefon. Du kan n\u00E5r som helst sende inn flere barn eller oppdatere informasjonen ved \u00E5 fylle ut skjemaet p\u00E5 nytt."))),
                    React.createElement("section", { className: "mt-10 grid gap-6" },
                        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-zinc-950/50 p-6" },
                            React.createElement("h2", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-white/70" }, "Foresatt kontakt"),
                            React.createElement("dl", { className: "mt-4 grid gap-4 sm:grid-cols-3" },
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Navn"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.parentName || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "E-post"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.parentEmail || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Telefon"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.parentPhone || "Ikke oppgitt")))),
                        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-zinc-950/50 p-6" },
                            React.createElement("h2", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-white/70" }, "Personinformasjon"),
                            React.createElement("dl", { className: "mt-4 grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Navn"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.name)),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "E-post"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.email)),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Telefon"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.phone || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "F\u00F8dselsdato"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.birthDate)),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Kj\u00F8nn"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.gender || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Sted"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" },
                                        formData.postalCode,
                                        " ",
                                        formData.city)))),
                        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-zinc-950/50 p-6" },
                            React.createElement("h2", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-white/70" }, "Spill- og plattforminfo"),
                            React.createElement("dl", { className: "mt-4 grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Fortnite-brukernavn"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.fortniteUsername || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Twitch"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.twitchUsername || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Discord"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.discordName || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "TikTok"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.tiktokUsername || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "YouTube"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.youtubeUsername || "Ikke oppgitt")),
                                React.createElement("div", null,
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Streamer"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, formData.streams === "ja" ? `Ja${formData.streamLink ? ` – ${formData.streamLink}` : ""}` : "Nei")),
                                React.createElement("div", { className: "sm:col-span-2" },
                                    React.createElement("dt", { className: "text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Plattformer"),
                                    React.createElement("dd", { className: "mt-1 text-base font-semibold text-white" }, selectedPlatforms || "Ingen valgt")))),
                        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-zinc-950/50 p-6" },
                            React.createElement("h2", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-white/70" }, "Favorittspill"),
                            React.createElement("p", { className: "mt-2 text-sm text-zinc-300" }, selectedGames || "Ingen spill valgt"))),
                    React.createElement("div", { className: "mt-10 flex flex-wrap items-center justify-between gap-4" },
                        React.createElement(Button, { type: "button", onClick: handleReset, className: "rounded-2xl bg-white/10 px-6 text-sm text-white hover:bg-white/20" }, "Registrer nytt medlem"),
                        React.createElement("div", { className: "flex items-center gap-2 text-sm text-zinc-300" },
                            React.createElement(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }),
                            React.createElement("span", null, "Trykk for \u00E5 sende inn et nytt svar")))))));
    }
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white" },
        React.createElement("main", { className: "mx-auto max-w-4xl px-6 py-16" },
            React.createElement("div", { className: "rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur" },
                React.createElement("header", { className: "max-w-3xl" },
                    React.createElement("p", { className: "text-xs uppercase tracking-[0.28em] text-white/60" }, "Innmeldingsskjema FjOlsenbanden"),
                    React.createElement("h1", { className: "mt-4 text-3xl font-bold sm:text-4xl" }, "Meld barnet inn og l\u00E5s opp premier"),
                    React.createElement("p", { className: "mt-3 text-base text-zinc-200" }, "Foreldre m\u00E5 registrere barnet for at vi skal kunne dele ut premier og invitere til eventer. Fyll f\u00F8rst inn foresattes kontaktinfo, deretter barnets detaljer og spillvaner.")),
                React.createElement("form", { className: "mt-10 space-y-10", onSubmit: handleSubmit },
                    React.createElement("section", { className: "rounded-2xl border border-white/10 bg-zinc-950/40 p-6" },
                        React.createElement("h2", { className: "text-lg font-semibold text-white" }, "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 Foresatt kontakt"),
                        React.createElement("p", { className: "mt-1 text-sm text-zinc-300" }, "Fylles ut dersom barnet er under 18 \u00E5r."),
                        React.createElement("div", { className: "mt-6 grid gap-6 sm:grid-cols-3" },
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Navn foresatt",
                                React.createElement("input", { name: "parentName", type: "text", value: formData.parentName, onChange: handleTextChange, placeholder: "Navn", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "E-post foresatt",
                                React.createElement("input", { name: "parentEmail", type: "email", value: formData.parentEmail, onChange: handleTextChange, placeholder: "navn@epost.no", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Telefonnummer foresatt",
                                React.createElement("input", { name: "parentPhone", type: "tel", value: formData.parentPhone, onChange: handleTextChange, placeholder: "8 sifre", className: inputClasses })))),
                    React.createElement("section", { className: "rounded-2xl border border-white/10 bg-zinc-950/40 p-6" },
                        React.createElement("h2", { className: "text-lg font-semibold text-white" }, "\uD83D\uDC64 Del 1: Personinformasjon"),
                        React.createElement("p", { className: "mt-1 text-sm text-zinc-300" }, "Oppgi kontaktinformasjon til den som skal delta i FjOlsenbandens aktiviteter."),
                        React.createElement("div", { className: "mt-6 grid gap-6 sm:grid-cols-2" },
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white sm:col-span-2" },
                                "Navn",
                                React.createElement("input", { name: "name", type: "text", value: formData.name, onChange: handleTextChange, placeholder: "Fornavn Etternavn", className: inputClasses, required: true })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "E-post",
                                React.createElement("input", { name: "email", type: "email", value: formData.email, onChange: handleTextChange, placeholder: "navn@epost.no", className: inputClasses, required: true })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Telefon",
                                React.createElement("input", { name: "phone", type: "tel", value: formData.phone, onChange: handleTextChange, placeholder: "Valgfritt", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "F\u00F8dselsdato",
                                React.createElement("input", { name: "birthDate", type: "date", value: formData.birthDate, onChange: handleTextChange, className: inputClasses, required: true })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Kj\u00F8nn (valgfritt)",
                                React.createElement("input", { name: "gender", type: "text", value: formData.gender, onChange: handleTextChange, placeholder: "Valgfritt", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Postnummer",
                                React.createElement("input", { name: "postalCode", type: "text", value: formData.postalCode, onChange: handleTextChange, placeholder: "####", className: inputClasses, required: true })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Sted",
                                React.createElement("input", { name: "city", type: "text", value: formData.city, onChange: handleTextChange, placeholder: "By eller kommune", className: inputClasses, required: true }))),
                        React.createElement("p", { className: "mt-4 text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Segmentering p\u00E5 region hjelper oss \u00E5 arrangere lokale eventer.")),
                    React.createElement("section", { className: "rounded-2xl border border-white/10 bg-zinc-950/40 p-6" },
                        React.createElement("h2", { className: "text-lg font-semibold text-white" }, "\uD83C\uDFAE Del 2: Spill- og plattforminfo"),
                        React.createElement("div", { className: "mt-6 grid gap-6 sm:grid-cols-2" },
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Fortnite-brukernavn",
                                React.createElement("input", { name: "fortniteUsername", type: "text", value: formData.fortniteUsername, onChange: handleTextChange, placeholder: "Valgfritt", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Twitch-brukernavn",
                                React.createElement("input", { name: "twitchUsername", type: "text", value: formData.twitchUsername, onChange: handleTextChange, placeholder: "Valgfritt", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Discord-navn",
                                React.createElement("input", { name: "discordName", type: "text", value: formData.discordName, onChange: handleTextChange, placeholder: "Brukernavn#0000", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "TikTok-brukernavn",
                                React.createElement("input", { name: "tiktokUsername", type: "text", value: formData.tiktokUsername, onChange: handleTextChange, placeholder: "Valgfritt", className: inputClasses })),
                            React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "YouTube-brukernavn",
                                React.createElement("input", { name: "youtubeUsername", type: "text", value: formData.youtubeUsername, onChange: handleTextChange, placeholder: "Valgfritt", className: inputClasses }))),
                        React.createElement("div", { className: "mt-8 space-y-4" },
                            React.createElement("span", { className: "text-sm font-medium text-white" }, "Streamer ditt barn?"),
                            React.createElement("div", { className: "flex flex-wrap gap-4 text-sm text-white" }, ["nei", "ja"].map((option) => (React.createElement("label", { key: option, className: "flex items-center gap-2" },
                                React.createElement("input", { type: "radio", name: "streams", value: option, checked: formData.streams === option, onChange: (event) => {
                                        const nextValue = event.target.value;
                                        setFormData((previous) => ({
                                            ...previous,
                                            streams: nextValue,
                                            streamLink: nextValue === "nei" ? "" : previous.streamLink,
                                        }));
                                    }, className: "h-5 w-5 border border-white/20 bg-white/5 text-[#13A0F9] focus:ring-[#13A0F9]" }),
                                option === "ja" ? "Ja" : "Nei")))),
                            formData.streams === "ja" ? (React.createElement("label", { className: "flex flex-col text-sm font-medium text-white" },
                                "Link til stream",
                                React.createElement("input", { name: "streamLink", type: "url", value: formData.streamLink, onChange: handleTextChange, placeholder: "https://", className: inputClasses }))) : null),
                        React.createElement("div", { className: "mt-8" },
                            React.createElement("span", { className: "text-sm font-medium text-white" }, "Hvilke plattformer spiller barnet p\u00E5?"),
                            React.createElement("div", { className: "mt-3 grid gap-3 sm:grid-cols-2" },
                                platformOptions.map((platform) => (React.createElement("label", { key: platform, className: "flex items-center gap-3 text-sm text-white" },
                                    React.createElement("input", { type: "checkbox", className: checkboxBaseClasses, checked: formData.platforms.includes(platform), onChange: () => handleCheckboxToggle("platforms", platform) }),
                                    platform))),
                                React.createElement("label", { className: "flex items-center gap-3 text-sm text-white" },
                                    React.createElement("input", { type: "checkbox", className: checkboxBaseClasses, checked: Boolean(formData.otherPlatform), onChange: (event) => setFormData((previous) => ({
                                            ...previous,
                                            otherPlatform: event.target.checked ? previous.otherPlatform : "",
                                        })) }),
                                    React.createElement("div", { className: "flex-1" },
                                        "Annet",
                                        React.createElement("input", { name: "otherPlatform", type: "text", value: formData.otherPlatform, onChange: handleTextChange, placeholder: "Skriv plattform", className: `${inputClasses} mt-3` })))),
                            React.createElement("p", { className: "mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Plattformdata er verdifull for partnere og sponsorater."))),
                    React.createElement("section", { className: "rounded-2xl border border-white/10 bg-zinc-950/40 p-6" },
                        React.createElement("h2", { className: "text-lg font-semibold text-white" }, "\uD83D\uDD79\uFE0F Del 3: Spill du spiller"),
                        React.createElement("p", { className: "mt-1 text-sm text-zinc-300" }, "Velg spillene som spilles oftest."),
                        React.createElement("div", { className: "mt-6 grid gap-3 sm:grid-cols-2" },
                            gameOptions.map((game) => (React.createElement("label", { key: game, className: "flex items-center gap-3 text-sm text-white" },
                                React.createElement("input", { type: "checkbox", className: checkboxBaseClasses, checked: formData.games.includes(game), onChange: () => handleCheckboxToggle("games", game) }),
                                game))),
                            React.createElement("label", { className: "flex items-center gap-3 text-sm text-white sm:col-span-2" },
                                React.createElement("input", { type: "checkbox", className: checkboxBaseClasses, checked: Boolean(formData.otherGame), onChange: (event) => setFormData((previous) => ({
                                        ...previous,
                                        otherGame: event.target.checked ? previous.otherGame : "",
                                    })) }),
                                React.createElement("div", { className: "flex-1" },
                                    "Annet",
                                    React.createElement("input", { name: "otherGame", type: "text", value: formData.otherGame, onChange: handleTextChange, placeholder: "Legg til spill", className: `${inputClasses} mt-3` })))),
                        React.createElement("p", { className: "mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400" }, "Denne innsikten hjelper oss \u00E5 planlegge turneringer og events.")),
                    React.createElement("section", { className: "rounded-2xl border border-white/10 bg-zinc-950/40 p-6" },
                        React.createElement("h2", { className: "text-lg font-semibold text-white" }, "\uD83D\uDCCA Del 4: Samtykke"),
                        React.createElement("p", { className: "mt-1 text-sm text-zinc-300" }, "Samtykke gj\u00F8r det mulig \u00E5 sende informasjon og dele ut premier via Vipps, gavekort eller utstyr."),
                        React.createElement("div", { className: "mt-6 space-y-4" },
                            React.createElement("label", { className: "flex items-start gap-3 text-sm text-white" },
                                React.createElement("input", { type: "checkbox", className: checkboxBaseClasses, checked: formData.rulesConsent, onChange: () => handleConsentToggle("rulesConsent"), required: true }),
                                React.createElement("span", null, "Jeg godtar FjOlsenbandens retningslinjer og personvernerkl\u00E6ring.")),
                            React.createElement("label", { className: "flex items-start gap-3 text-sm text-white" },
                                React.createElement("input", { type: "checkbox", className: checkboxBaseClasses, checked: formData.guardianConsent, onChange: () => handleConsentToggle("guardianConsent") }),
                                React.createElement("span", null, "Jeg (foresatt) samtykker til at mitt barn kan delta i aktiviteter og motta premier fra FjOlsenbanden.")))),
                    errors.length > 0 ? (React.createElement("div", { className: "rounded-2xl border border-amber-300/40 bg-amber-400/10 px-5 py-4 text-sm text-amber-100" },
                        React.createElement("p", { className: "font-semibold" }, "Vennligst sjekk skjemaet p\u00E5 nytt:"),
                        React.createElement("ul", { className: "mt-2 list-disc space-y-1 pl-4" }, errors.map((error) => (React.createElement("li", { key: error }, error)))))) : null,
                    React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-4" },
                        React.createElement(Button, { type: "button", onClick: handleReset, className: "rounded-2xl bg-white/10 px-5 text-sm text-white hover:bg-white/20" }, "Nullstill skjema"),
                        React.createElement(Button, { type: "submit", className: "rounded-2xl bg-[#13A0F9] px-6 text-sm text-white hover:bg-[#1090df]" }, "Send inn skjema")))))));
}
