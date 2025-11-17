"use client";

import React, { useMemo } from "react";
import { ArrowLeft, ArrowUpRight, CheckCircle2, RefreshCcw, ShieldCheck, Sparkles } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/lib/admin-auth";
import { DEFAULT_ABOUT_BULLETS, DEFAULT_ABOUT_HIGHLIGHTS, useAdminState } from "@/lib/admin-state";

function normalizeHighlights(highlights) {
    const fallback = DEFAULT_ABOUT_HIGHLIGHTS;
    const source = Array.isArray(highlights) && highlights.length > 0 ? highlights : fallback;
    return source.map((item, index) => {
        var _a, _b, _c;
        const fallbackItem = (_a = fallback[index]) !== null && _a !== void 0 ? _a : fallback[0];
        const title = (typeof item.title === "string" && item.title.trim()) || fallbackItem.title;
        const description = (typeof item.description === "string" && item.description.trim()) || fallbackItem.description;
        return {
            id: ((_b = item.id) === null || _b === void 0 ? void 0 : _b.trim()) || fallbackItem.id || `about-${index + 1}`,
            title,
            description,
            badge: ((_c = item.badge) === null || _c === void 0 ? void 0 : _c.trim()) || "Trygt og positivt",
        };
    });
}

export default function AdminMarketingPage() {
    const auth = useAdminAuth();
    const { state, updateSiteSettings } = useAdminState();

    if (!auth.state.isAuthenticated) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" },
            React.createElement(LoginModal, { open: true, auth: auth, title: "Admininnlogging", description: "Logg inn for å administrere innholdet på forsiden.", accent: "emerald" })));
    }

    const { siteSettings } = state;
    const aboutBullets = useMemo(() => {
        return Array.isArray(siteSettings.aboutBullets) && siteSettings.aboutBullets.length > 0
            ? siteSettings.aboutBullets.map((item) => (typeof item === "string" ? item.trim() : "")).filter(Boolean)
            : DEFAULT_ABOUT_BULLETS;
    }, [siteSettings.aboutBullets]);
    const aboutHighlights = useMemo(() => normalizeHighlights(siteSettings.aboutHighlights), [siteSettings.aboutHighlights]);

    const handleFieldChange = (key, value) => {
        updateSiteSettings({ [key]: value });
    };

    const handleBulletChange = (value) => {
        const entries = value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
        updateSiteSettings({ aboutBullets: entries });
    };

    const updateHighlightField = (index, field, value) => {
        const next = normalizeHighlights(siteSettings.aboutHighlights);
        if (!next[index]) {
            return;
        }
        next[index] = { ...next[index], [field]: value };
        updateSiteSettings({ aboutHighlights: next });
    };

    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("div", { className: "mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10" },
            React.createElement("header", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("p", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200" },
                        React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                        " Om-seksjonen"),
                    React.createElement("h1", { className: "text-3xl font-semibold tracking-tight text-white sm:text-4xl" }, "Oppdater om-innhold"),
                    React.createElement("p", { className: "max-w-3xl text-base text-slate-300" }, "Rediger teksten som vises i seksjon nummer to på forsiden. Endringene lagres lokalt i nettleseren til du publiserer.")),
                React.createElement("div", { className: "flex flex-wrap gap-2" },
                    React.createElement(Button, { asChild: true, variant: "outline", className: "border-white/20 bg-white/5 text-white hover:bg-white/10" },
                        React.createElement("a", { href: "/admin" },
                            React.createElement(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                            "Tilbake til admin")),
                    React.createElement(Button, { asChild: true },
                        React.createElement("a", { href: "#forhandsvisning" },
                            React.createElement(ArrowUpRight, { className: "mr-2 h-4 w-4" }),
                            "Hopp til forhåndsvisning")))),
            React.createElement("div", { className: "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" },
                React.createElement(Card, { className: "border-white/10 bg-slate-900/70" },
                    React.createElement(CardHeader, { className: "space-y-1" },
                        React.createElement(CardTitle, { className: "text-lg text-white" }, "Hovedtekst"),
                        React.createElement("p", { className: "text-sm text-slate-300" }, "Tittel, overskrift og avsnitt som vises på venstre side av om-seksjonen.")),
                    React.createElement(CardContent, { className: "space-y-4" },
                        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                            React.createElement(Field, { label: "Seksjonstittel", id: "aboutTitle", value: (siteSettings.aboutTitle || "").toString(), onChange: (value) => handleFieldChange("aboutTitle", value) }),
                            React.createElement(Field, { label: "Overskrift", id: "aboutHeadline", value: (siteSettings.aboutHeadline || "").toString(), onChange: (value) => handleFieldChange("aboutHeadline", value) })),
                        React.createElement(Field, { label: "Første avsnitt", id: "aboutDescription", value: (siteSettings.aboutDescription || "").toString(), onChange: (value) => handleFieldChange("aboutDescription", value), component: Textarea }),
                        React.createElement(Field, { label: "Andre avsnitt", id: "aboutSecondaryDescription", value: (siteSettings.aboutSecondaryDescription || "").toString(), onChange: (value) => handleFieldChange("aboutSecondaryDescription", value), component: Textarea }),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement(Label, { htmlFor: "aboutBullets", className: "text-slate-200" }, "Punkter (én per linje)"),
                            React.createElement(Textarea, { id: "aboutBullets", className: "bg-slate-950/40 text-white placeholder:text-slate-500", rows: 4, value: aboutBullets.join("\n"), onChange: (event) => handleBulletChange(event.target.value), placeholder: "Legg til korte punkter..." }),
                            React.createElement("p", { className: "text-xs text-slate-400" }, "Vises som små høydepunkter under brødteksten.")))),
                React.createElement(Card, { className: "border-white/10 bg-slate-900/70" },
                    React.createElement(CardHeader, { className: "space-y-1" },
                        React.createElement(CardTitle, { className: "text-lg text-white" }, "Korttekster"),
                        React.createElement("p", { className: "text-sm text-slate-300" }, "Tre korte tekster som vises på høyre side.")),
                    React.createElement(CardContent, { className: "space-y-4" }, aboutHighlights.map((item, index) => {
                        const fallbackHighlight = DEFAULT_ABOUT_HIGHLIGHTS[index] || DEFAULT_ABOUT_HIGHLIGHTS[0];
                        return (React.createElement("div", { key: item.id, className: "rounded-2xl border border-white/10 bg-white/5 p-4" },
                            React.createElement("div", { className: "mb-3 flex items-center justify-between" },
                                React.createElement("div", { className: "flex items-center gap-2 text-sm font-semibold text-white" },
                                    React.createElement(Sparkles, { className: "h-4 w-4 text-[#13A0F9]" }),
                                    `Kort tekst ${index + 1}`),
                                React.createElement(Button, { type: "button", size: "sm", variant: "outline", className: "h-8 rounded-full border-white/20 bg-transparent text-xs text-slate-200 hover:bg-white/10", onClick: () => updateHighlightField(index, "description", fallbackHighlight.description) },
                                    React.createElement(RefreshCcw, { className: "mr-2 h-3.5 w-3.5" }),
                                    "Tilbakestill")),
                            React.createElement(Field, { label: "Tittel", id: `highlight-title-${item.id}`, value: item.title, onChange: (value) => updateHighlightField(index, "title", value) }),
                            React.createElement(Field, { label: "Beskrivelse", id: `highlight-description-${item.id}`, value: item.description, onChange: (value) => updateHighlightField(index, "description", value), component: Textarea })));
                    })))),
            React.createElement("section", { id: "forhandsvisning", className: "space-y-4" },
                React.createElement("div", { className: "flex items-center gap-2 text-sm font-semibold text-slate-200" },
                    React.createElement(ArrowUpRight, { className: "h-4 w-4 text-[#13A0F9]" }),
                    "Forhåndsvisning"),
                React.createElement(Card, { className: "border-white/10 bg-slate-900/60" },
                    React.createElement(CardContent, { className: "grid gap-8 rounded-[1.75rem] border border-white/10 bg-[#0b1b4d]/50 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]" },
                        React.createElement("div", { className: "space-y-4" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75" }, siteSettings.aboutTitle || "Hva er FjOlsenbanden?"),
                            React.createElement("h2", { className: "text-2xl font-bold text-white sm:text-3xl" }, siteSettings.aboutHeadline || "Spillglede for hele familien"),
                            React.createElement("p", { className: "text-sm text-slate-100" }, siteSettings.aboutDescription || DEFAULT_ABOUT_BULLETS[0]),
                            React.createElement("p", { className: "text-sm text-slate-100" }, siteSettings.aboutSecondaryDescription || DEFAULT_ABOUT_BULLETS[1]),
                            React.createElement("div", { className: "space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4" }, aboutBullets.map((item, index) => (React.createElement("div", { key: `${item}-${index}`, className: "flex gap-3" },
                                React.createElement("span", { className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-[#13A0F9]/15 text-[#13A0F9]" },
                                    React.createElement(CheckCircle2, { className: "h-4 w-4" })),
                                React.createElement("p", { className: "text-xs text-slate-100" }, item)))))),
                        React.createElement("div", { className: "grid gap-3" }, aboutHighlights.map((item, index) => (React.createElement("div", { key: item.id, className: "rounded-2xl border border-white/10 bg-[#071d6f]/80 p-4" },
                            React.createElement("div", { className: "flex items-center justify-between" },
                                React.createElement("p", { className: "text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70" }, item.badge),
                                React.createElement("span", { className: "rounded-full bg-white/5 px-2 py-1 text-[10px] font-semibold text-[#13A0F9]" }, String(index + 1).padStart(2, "0"))),
                            React.createElement("h3", { className: "mt-2 text-lg font-semibold text-white" }, item.title),
                            React.createElement("p", { className: "text-xs text-slate-100" }, item.description)))))))))));
}

function Field({ label, id, value, onChange, component: Component = Input }) {
    return (React.createElement("div", { className: "space-y-2" },
        React.createElement(Label, { htmlFor: id, className: "text-slate-200" }, label),
        React.createElement(Component, { id: id, value: value, onChange: (event) => onChange(event.target.value), className: "bg-slate-950/40 text-white placeholder:text-slate-500" })));}
