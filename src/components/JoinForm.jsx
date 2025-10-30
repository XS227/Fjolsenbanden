"use client";
import { Children, cloneElement, isValidElement, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal } from "@/components/Modal";
import { SlideStepper } from "@/components/SlideStepper";
const schema = z
    .object({
    guardianName: z.string().optional(),
    guardianEmail: z.string().email("Legg inn en gyldig e-postadresse.").optional(),
    guardianPhone: z.string().optional(),
    name: z.string().min(2, "Navn må inneholde minst to tegn."),
    email: z.string().email("Legg inn en gyldig e-postadresse."),
    phone: z.string().min(5, "Legg inn et telefonnummer."),
    birthdate: z.string().min(1, "Velg en fødselsdato."),
    gender: z.string().optional(),
    postalCode: z.string().min(2, "Postnummer må fylles ut."),
    city: z.string().min(2, "Sted må fylles ut."),
    fortnite: z.string().optional(),
    twitch: z.string().optional(),
    discord: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    childStreams: z.enum(["nei", "ja"]).optional(),
    childStreamUrl: z.string().url("Legg inn en gyldig lenke.").optional(),
    platforms: z.array(z.string()).default([]),
    games: z.array(z.string()).default([]),
    tos: z.boolean().refine((value) => value, {
        message: "Du må godta retningslinjer og personvern.",
    }),
    guardianConsent: z.boolean().optional(),
})
    .superRefine((data, ctx) => {
    var _a, _b, _c;
    const birthdate = parseBirthdate(data.birthdate);
    if (!birthdate) {
        ctx.addIssue({
            path: ["birthdate"],
            code: z.ZodIssueCode.custom,
            message: "Oppgi en gyldig fødselsdato.",
        });
        return;
    }
    const age = calculateAge(birthdate);
    if (age < 0) {
        ctx.addIssue({
            path: ["birthdate"],
            code: z.ZodIssueCode.custom,
            message: "Fødselsdato kan ikke være i fremtiden.",
        });
        return;
    }
    if (age > 120) {
        ctx.addIssue({
            path: ["birthdate"],
            code: z.ZodIssueCode.custom,
            message: "Oppgi en realistisk fødselsdato.",
        });
        return;
    }
    const isMinor = age < 18;
    if (data.childStreams === "ja" && !data.childStreamUrl) {
        ctx.addIssue({
            path: ["childStreamUrl"],
            code: z.ZodIssueCode.custom,
            message: "Legg inn lenke til streamen.",
        });
    }
    if (isMinor) {
        if (!((_a = data.guardianName) === null || _a === void 0 ? void 0 : _a.trim())) {
            ctx.addIssue({
                path: ["guardianName"],
                code: z.ZodIssueCode.custom,
                message: "Foresattes navn må fylles ut.",
            });
        }
        if (!((_b = data.guardianEmail) === null || _b === void 0 ? void 0 : _b.trim())) {
            ctx.addIssue({
                path: ["guardianEmail"],
                code: z.ZodIssueCode.custom,
                message: "Foresattes e-post må fylles ut.",
            });
        }
        if (!((_c = data.guardianPhone) === null || _c === void 0 ? void 0 : _c.trim())) {
            ctx.addIssue({
                path: ["guardianPhone"],
                code: z.ZodIssueCode.custom,
                message: "Foresattes telefon må fylles ut.",
            });
        }
        if (!data.guardianConsent) {
            ctx.addIssue({
                path: ["guardianConsent"],
                code: z.ZodIssueCode.custom,
                message: "Foresatt må samtykke til deltakelse og premier.",
            });
        }
    }
});
export default function JoinForm({ open, onClose }) {
    const form = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur",
        defaultValues: {
            guardianConsent: false,
            tos: false,
            platforms: [],
            games: [],
        },
    });
    const { register, handleSubmit, trigger, watch, formState: { errors, isSubmitting }, } = form;
    const birthdateValue = watch("birthdate");
    const isMinor = useMemo(() => {
        const birthdate = parseBirthdate(birthdateValue);
        if (!birthdate) {
            return false;
        }
        return calculateAge(birthdate) < 18;
    }, [birthdateValue]);
    const childStreamsValue = watch("childStreams");
    const steps = useMemo(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const definitions = [
            {
                id: "guardian",
                label: "Foresatt",
                hidden: !isMinor,
                validate: () => (isMinor ? trigger(["guardianName", "guardianEmail", "guardianPhone"]) : true),
                content: (React.createElement("section", { className: "space-y-4" },
                    React.createElement("header", null,
                        React.createElement("h4", { className: "text-lg font-semibold text-white" }, "Foresatt kontakt"),
                        React.createElement("p", { className: "text-sm text-zinc-400" }, "Brukes kun til samtykke og premier.")),
                    React.createElement(Input, { id: "guardianName", label: "Navn foresatt", error: (_a = errors.guardianName) === null || _a === void 0 ? void 0 : _a.message, ...register("guardianName") }),
                    React.createElement(Input, { id: "guardianEmail", type: "email", label: "E-post foresatt", error: (_b = errors.guardianEmail) === null || _b === void 0 ? void 0 : _b.message, ...register("guardianEmail") }),
                    React.createElement(Input, { id: "guardianPhone", label: "Telefon foresatt", error: (_c = errors.guardianPhone) === null || _c === void 0 ? void 0 : _c.message, ...register("guardianPhone") }))),
            },
            {
                id: "person",
                label: "Del 1",
                validate: () => trigger(["name", "email", "phone", "birthdate", "postalCode", "city", "gender"]),
                content: (React.createElement("section", { className: "space-y-4" },
                    React.createElement("header", null,
                        React.createElement("h4", { className: "text-lg font-semibold text-white" }, "Del 1: Personinformasjon")),
                    React.createElement(Input, { id: "name", label: "Navn", error: (_d = errors.name) === null || _d === void 0 ? void 0 : _d.message, ...register("name") }),
                    React.createElement(Input, { id: "email", type: "email", label: "E-post", error: (_e = errors.email) === null || _e === void 0 ? void 0 : _e.message, ...register("email") }),
                    React.createElement(Input, { id: "phone", label: "Telefon", error: (_f = errors.phone) === null || _f === void 0 ? void 0 : _f.message, ...register("phone") }),
                    React.createElement(Input, { id: "birthdate", type: "date", label: "F\u00F8dselsdato", error: (_g = errors.birthdate) === null || _g === void 0 ? void 0 : _g.message, ...register("birthdate") }),
                    React.createElement(Select, { id: "gender", label: "Kj\u00F8nn (valgfritt)", error: (_h = errors.gender) === null || _h === void 0 ? void 0 : _h.message, ...register("gender") },
                        React.createElement("option", { value: "" }, "Velg\u2026"),
                        React.createElement("option", { value: "kvinne" }, "Kvinne"),
                        React.createElement("option", { value: "mann" }, "Mann"),
                        React.createElement("option", { value: "annet" }, "Annet")),
                    React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                        React.createElement(Input, { id: "postalCode", label: "Postnummer", error: (_j = errors.postalCode) === null || _j === void 0 ? void 0 : _j.message, ...register("postalCode") }),
                        React.createElement(Input, { id: "city", label: "Sted", error: (_k = errors.city) === null || _k === void 0 ? void 0 : _k.message, ...register("city") })))),
            },
            {
                id: "platforms",
                label: "Del 2",
                validate: () => trigger(["fortnite", "twitch", "discord", "tiktok", "youtube", "childStreams", "childStreamUrl", "platforms"]),
                content: (React.createElement("section", { className: "space-y-4" },
                    React.createElement("header", null,
                        React.createElement("h4", { className: "text-lg font-semibold text-white" }, "Del 2: Spill- og plattforminfo")),
                    React.createElement(Input, { id: "fortnite", label: "Fortnite-brukernavn", error: (_l = errors.fortnite) === null || _l === void 0 ? void 0 : _l.message, ...register("fortnite") }),
                    React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                        React.createElement(Input, { id: "twitch", label: "Twitch", error: (_m = errors.twitch) === null || _m === void 0 ? void 0 : _m.message, ...register("twitch") }),
                        React.createElement(Input, { id: "discord", label: "Discord", error: (_o = errors.discord) === null || _o === void 0 ? void 0 : _o.message, ...register("discord") }),
                        React.createElement(Input, { id: "tiktok", label: "TikTok", error: (_p = errors.tiktok) === null || _p === void 0 ? void 0 : _p.message, ...register("tiktok") }),
                        React.createElement(Input, { id: "youtube", label: "YouTube", error: (_q = errors.youtube) === null || _q === void 0 ? void 0 : _q.message, ...register("youtube") })),
                    React.createElement(RadioGroup, { label: "Streamer barnet?", name: "childStreams", register: register, error: (_r = errors.childStreams) === null || _r === void 0 ? void 0 : _r.message },
                        React.createElement(Radio, { value: "nei", label: "Nei" }),
                        React.createElement(Radio, { value: "ja", label: "Ja" })),
                    childStreamsValue === "ja" ? (React.createElement(Input, { id: "childStreamUrl", label: "Lenke til stream", placeholder: "https://", error: (_s = errors.childStreamUrl) === null || _s === void 0 ? void 0 : _s.message, ...register("childStreamUrl") })) : null,
                    React.createElement(CheckboxGroup, { label: "Plattform", error: (_t = errors.platforms) === null || _t === void 0 ? void 0 : _t.message }, PLATFORM_OPTIONS.map((option) => (React.createElement(Checkbox, { key: option, name: "platforms", value: option, register: register }, option)))))),
            },
            {
                id: "games",
                label: "Del 3",
                validate: () => trigger(["games"]),
                content: (React.createElement("section", { className: "space-y-4" },
                    React.createElement("header", null,
                        React.createElement("h4", { className: "text-lg font-semibold text-white" }, "Del 3: Spill du spiller")),
                    React.createElement(CheckboxGrid, { name: "games", register: register, options: GAME_OPTIONS, error: (_u = errors.games) === null || _u === void 0 ? void 0 : _u.message }))),
            },
            {
                id: "consent",
                label: "Del 4",
                validate: () => trigger(isMinor ? ["tos", "guardianConsent"] : ["tos"]),
                content: (React.createElement("section", { className: "space-y-4" },
                    React.createElement("header", null,
                        React.createElement("h4", { className: "text-lg font-semibold text-white" }, "Del 4: Samtykke")),
                    React.createElement(Check, { label: "Jeg godtar retningslinjer og personvern", error: (_v = errors.tos) === null || _v === void 0 ? void 0 : _v.message, disabled: isSubmitting, ...register("tos") }),
                    isMinor ? (React.createElement(Check, { label: "(Foresatt) samtykker til deltakelse og premier", error: (_w = errors.guardianConsent) === null || _w === void 0 ? void 0 : _w.message, disabled: isSubmitting, ...register("guardianConsent") })) : null,
                    React.createElement("p", { className: "text-xs text-zinc-400" }, "Samtykke inkluderer info p\u00E5 e-post/SMS og premier via Vipps/gavekort/utstyr."))),
            },
        ];
        return definitions.filter((step) => !step.hidden);
    }, [childStreamsValue, errors, isMinor, register, trigger, isSubmitting]);
    const onSubmit = handleSubmit((data) => {
        console.log("Join form submitted", data);
        onClose();
    });
    return (React.createElement(Modal, { open: open, onClose: onClose, title: "Bli med i FjOlsenbanden" },
        React.createElement(SlideStepper, { steps: steps, onFinish: onSubmit })));
}
const PLATFORM_OPTIONS = ["PC", "Playstation", "Xbox", "Nintendo", "Annet"];
const GAME_OPTIONS = [
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
    "Annet",
];
function parseBirthdate(value) {
    if (!value) {
        return null;
    }
    const [year, month, day] = value.split("-").map((entry) => Number.parseInt(entry, 10));
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
        return null;
    }
    const date = new Date(Date.UTC(year, month - 1, day));
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return date;
}
function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getUTCFullYear() - birthdate.getUTCFullYear();
    const monthDiff = today.getUTCMonth() - birthdate.getUTCMonth();
    const dayDiff = today.getUTCDate() - birthdate.getUTCDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age -= 1;
    }
    return age;
}
function Input({ label, error, id, className, ...props }) {
    const inputId = id || props.name;
    return (React.createElement("label", { className: "block text-sm text-white", htmlFor: inputId },
        React.createElement("span", { className: "mb-1 block text-sm font-medium text-white/80" }, label),
        React.createElement("input", { id: inputId, ...props, className: `w-full rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 ${className !== null && className !== void 0 ? className : ""}` }),
        error ? React.createElement("span", { className: "mt-1 block text-xs text-rose-300" }, error) : null));
}
function Select({ label, error, id, className, children, ...props }) {
    const selectId = id || props.name;
    return (React.createElement("label", { className: "block text-sm text-white", htmlFor: selectId },
        React.createElement("span", { className: "mb-1 block text-sm font-medium text-white/80" }, label),
        React.createElement("select", { id: selectId, ...props, className: `w-full rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 ${className !== null && className !== void 0 ? className : ""}` }, children),
        error ? React.createElement("span", { className: "mt-1 block text-xs text-rose-300" }, error) : null));
}
function RadioGroup({ label, name, register, error, children }) {
    const registration = register(name);
    return (React.createElement("fieldset", { className: "space-y-2" },
        React.createElement("legend", { className: "text-sm font-medium text-white/80" }, label),
        React.createElement("div", { className: "flex flex-wrap gap-3" }, Children.map(children, (child) => {
            if (!isValidElement(child)) {
                return child;
            }
            return cloneElement(child, {
                registration,
                name: registration.name,
            });
        })),
        error ? React.createElement("span", { className: "block text-xs text-rose-300" }, error) : null));
}
function Radio({ value, label, registration, name }) {
    const inputId = name ? `${name}-${value}` : `${value}`;
    return (React.createElement("label", { className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/30", htmlFor: inputId },
        React.createElement("input", { id: inputId, type: "radio", value: value, ...registration, className: "h-4 w-4 text-sky-400 focus:ring-sky-400" }),
        React.createElement("span", null, label)));
}
function CheckboxGroup({ label, error, children }) {
    return (React.createElement("fieldset", { className: "space-y-2" },
        React.createElement("legend", { className: "text-sm font-medium text-white/80" }, label),
        React.createElement("div", { className: "flex flex-wrap gap-3" }, children),
        error ? React.createElement("span", { className: "block text-xs text-rose-300" }, error) : null));
}
function Checkbox({ name, value, register, children, className }) {
    const registration = register(name);
    const inputId = `${registration.name}-${value}`;
    return (React.createElement("label", { className: `flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/30 ${className !== null && className !== void 0 ? className : ""}`, htmlFor: inputId },
        React.createElement("input", { id: inputId, type: "checkbox", value: value, ...registration, className: "h-4 w-4 rounded border-white/20 bg-zinc-900 text-sky-400 focus:ring-sky-400" }),
        React.createElement("span", null, children)));
}
function CheckboxGrid({ name, register, options, error }) {
    return (React.createElement("div", { className: "space-y-2" },
        React.createElement("div", { className: "grid gap-3 sm:grid-cols-2" }, options.map((option) => (React.createElement(Checkbox, { key: option, name: name, value: option, register: register }, option)))),
        error ? React.createElement("span", { className: "block text-xs text-rose-300" }, error) : null));
}
function Check({ label, error, id, className, ...props }) {
    const inputId = id || props.name;
    return (React.createElement("label", { className: "flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-white/30", htmlFor: inputId },
        React.createElement("input", { id: inputId, type: "checkbox", ...props, className: `mt-1 h-5 w-5 rounded border-white/20 bg-zinc-900 text-sky-400 focus:ring-sky-400 ${className !== null && className !== void 0 ? className : ""}` }),
        React.createElement("span", { className: "flex-1" },
            React.createElement("span", { className: "font-medium text-white" }, label),
            error ? React.createElement("span", { className: "mt-1 block text-xs text-rose-300" }, error) : null)));
}
