"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, CalendarCheck, Crown, Globe, GripVertical, Instagram, Lock, LogOut, MessageCircle, Monitor, PieChart, Plus, ShieldCheck, TrendingUp, Trophy, Trash2, UploadCloud, Users, Youtube, } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_SITE_MODULES, useAdminState, } from "@/lib/admin-state";
import { useAdminAuth } from "@/lib/admin-auth";
const SIDEBAR_GRADIENT = "radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.18), transparent 55%), radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.12), transparent 45%), #03091b";
const SECTION_ITEMS = [
    {
        key: "heroIntro",
        label: "Hero & intro",
        description: "Åpningsseksjonen med video, høydepunkter og velkomsttekst.",
        Icon: ShieldCheck,
    },
    {
        key: "liveStream",
        label: "Live-sending",
        description: "Viser Twitch-forhåndsvisningen og chatten på forsiden.",
        Icon: Activity,
        moduleKey: "liveStream",
    },
    {
        key: "membership",
        label: "Medlemskap",
        description: "Prisplaner og medlemsfordeler som kan oppdateres her.",
        Icon: Users,
    },
    {
        key: "prizes",
        label: "Premier",
        description: "Presentasjon av premier og sponsorlogoer.",
        Icon: Trophy,
        moduleKey: "partners",
    },
    {
        key: "partners",
        label: "Samarbeidspartnere",
        description: "Logoer og omtale av samarbeidspartnere.",
        Icon: Crown,
        moduleKey: "partners",
    },
    {
        key: "contact",
        label: "Kontakt",
        description: "Kontaktskjema for henvendelser fra besøkende.",
        Icon: MessageCircle,
        moduleKey: "contactForm",
    },
];
const ADMIN_NAV_ITEMS = [
    { id: "overview", label: "Oversikt", Icon: ShieldCheck },
    { id: "site", label: "Nettside og moduler", Icon: UploadCloud },
    { id: "memberships", label: "Medlemskap & partnere", Icon: Users },
    { id: "insights", label: "Statistikk", Icon: BarChart3 },
    { id: "team", label: "Team & profiler", Icon: Trophy },
];
export default function AdminDashboard() {
    const auth = useAdminAuth();
    if (!auth.state.isAuthenticated) {
        return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" },
            React.createElement(LoginModal, { open: true, auth: auth, title: "Admininnlogging", description: "Oppgi brukernavn og passord for administratorer for \u00E5 \u00E5pne kontrollpanelet.", accent: "emerald" })));
    }
    return React.createElement(AdminDashboardContent, { auth: auth });
}
function AdminDashboardContent({ auth }) {
    var _a, _b, _c, _d, _e, _f;
    const { state, updateSiteSettings } = useAdminState();
    const { siteSettings, players, statsHistory } = state;
    const [brandForm, setBrandForm] = useState(siteSettings);
    const [sectionOrder, setSectionOrder] = useState(() => normalizeSectionOrder(siteSettings.sectionOrder));
    const [draggingSection, setDraggingSection] = useState(null);
    const [dragOverSection, setDragOverSection] = useState(null);
    const [membershipDrafts, setMembershipDrafts] = useState(() => siteSettings.membershipTiers);
    const [partnerLogos, setPartnerLogos] = useState(() => siteSettings.partnerLogos);
    useEffect(() => {
        setBrandForm(siteSettings);
        setSectionOrder(normalizeSectionOrder(siteSettings.sectionOrder));
        setMembershipDrafts(siteSettings.membershipTiers);
        setPartnerLogos(siteSettings.partnerLogos);
    }, [siteSettings]);
    const moduleSettings = useMemo(() => { var _a; return ({ ...DEFAULT_SITE_MODULES, ...((_a = siteSettings.modules) !== null && _a !== void 0 ? _a : DEFAULT_SITE_MODULES) }); }, [siteSettings.modules]);
    const sectionItemMap = useMemo(() => new Map(SECTION_ITEMS.map((item) => [item.key, item])), []);
    const orderedSectionItems = useMemo(() => {
        const order = normalizeSectionOrder(sectionOrder);
        return order
            .map((key) => sectionItemMap.get(key))
            .filter((value) => Boolean(value));
    }, [sectionItemMap, sectionOrder]);
    const handleSectionDragStart = (key) => (event) => {
        setDraggingSection(key);
        setDragOverSection(null);
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", key);
        }
    };
    const handleSectionDragEnter = (key) => (event) => {
        event.preventDefault();
        if (draggingSection === key) {
            return;
        }
        setDragOverSection(key);
    };
    const handleSectionDragOver = (event) => {
        event.preventDefault();
        if (event.dataTransfer) {
            event.dataTransfer.dropEffect = "move";
        }
    };
    const handleSectionDrop = (targetKey) => (event) => {
        var _a, _b;
        event.preventDefault();
        const sourceKey = (_b = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain")) !== null && _b !== void 0 ? _b : draggingSection;
        if (!sourceKey || sourceKey === targetKey) {
            setDragOverSection(null);
            setDraggingSection(null);
            return;
        }
        setSectionOrder((current) => {
            const normalized = normalizeSectionOrder(current);
            const next = reorderSectionKeys(normalized, sourceKey, targetKey);
            updateSiteSettings({ sectionOrder: next });
            return next;
        });
        setDragOverSection(null);
        setDraggingSection(null);
    };
    const handleSectionDragEnd = () => {
        setDragOverSection(null);
        setDraggingSection(null);
    };
    const handleMembershipFieldChange = (id, field, value) => {
        setMembershipDrafts((current) => {
            const next = current.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier));
            updateSiteSettings({ membershipTiers: next });
            return next;
        });
    };
    const handleMembershipFeaturesChange = (id, value) => {
        const features = value
            .split(/\r?\n/)
            .map((feature) => feature.trim())
            .filter(Boolean);
        handleMembershipFieldChange(id, "features", features);
    };
    const addMembershipTier = () => {
        const newTier = {
            id: generateLocalId("tier"),
            title: "Nytt medlemskap",
            price: "0 kr / mnd",
            color: "green",
            features: ["Fordel 1", "Fordel 2"],
        };
        setMembershipDrafts((current) => {
            const next = [...current, newTier];
            updateSiteSettings({ membershipTiers: next });
            return next;
        });
    };
    const removeMembershipTier = (id) => {
        setMembershipDrafts((current) => {
            const next = current.filter((tier) => tier.id !== id);
            const safeNext = next.length > 0 ? next : current;
            updateSiteSettings({ membershipTiers: safeNext });
            return safeNext;
        });
    };
    const handlePartnerFieldChange = (id, field, value) => {
        setPartnerLogos((current) => {
            const next = current.map((partner) => partner.id === id ? { ...partner, [field]: value } : partner);
            updateSiteSettings({ partnerLogos: next });
            return next;
        });
    };
    const addPartnerLogo = () => {
        const newPartner = {
            id: generateLocalId("partner"),
            name: "Ny partner",
            logoUrl: "",
        };
        setPartnerLogos((current) => {
            const next = [...current, newPartner];
            updateSiteSettings({ partnerLogos: next });
            return next;
        });
    };
    const removePartnerLogo = (id) => {
        setPartnerLogos((current) => {
            const next = current.filter((partner) => partner.id !== id);
            updateSiteSettings({ partnerLogos: next });
            return next.length > 0 ? next : current;
        });
    };
    const handlePartnerLogoUpload = (id) => async (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        try {
            const dataUrl = await readFileAsDataUrl(file);
            handlePartnerFieldChange(id, "logoUrl", dataUrl);
        }
        finally {
            event.target.value = "";
        }
    };
    const handleLogoFileChange = async (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file) {
            return;
        }
        try {
            const dataUrl = await readFileAsDataUrl(file);
            setBrandForm((state) => ({ ...state, logoUrl: dataUrl }));
            updateSiteSettings({ logoUrl: dataUrl });
        }
        finally {
            event.target.value = "";
        }
    };
    const totals = useMemo(() => {
        var _a, _b;
        const totalMembers = (_b = (_a = statsHistory.at(-1)) === null || _a === void 0 ? void 0 : _a.members) !== null && _b !== void 0 ? _b : 0;
        const totalWatchHours = statsHistory.reduce((sum, point) => sum + point.watchHours, 0);
        const totalTournaments = statsHistory.reduce((sum, point) => sum + point.tournaments, 0);
        const totalNewMembers = statsHistory.reduce((sum, point) => sum + point.newMembers, 0);
        const growth = computeGrowth(statsHistory);
        return { totalMembers, totalWatchHours, totalTournaments, totalNewMembers, growth };
    }, [statsHistory]);
    const sponsorSegments = useMemo(() => buildSponsorSegments(players), [players]);
    const analyticsOverview = useMemo(() => buildAnalyticsOverview(statsHistory), [statsHistory]);
    const topPageStats = useMemo(() => buildTopPageStats(siteSettings, statsHistory), [siteSettings, statsHistory]);
    const deviceBreakdown = useMemo(() => buildDeviceBreakdown(statsHistory), [statsHistory]);
    const channelBreakdown = useMemo(() => buildChannelBreakdown(statsHistory), [statsHistory]);
    const trafficTable = useMemo(() => buildTrafficTable(statsHistory), [statsHistory]);
    const trafficChart = useMemo(() => buildTrafficChart(statsHistory), [statsHistory]);
    const deviceGradient = useMemo(() => {
        let start = 0;
        return deviceBreakdown.segments
            .map((segment) => {
            const end = start + segment.percent;
            const part = `${segment.color} ${start}% ${end}%`;
            start = end;
            return part;
        })
            .join(", ");
    }, [deviceBreakdown.segments]);
    const handleBrandSubmit = (event) => {
        event.preventDefault();
        updateSiteSettings(brandForm);
    };
    const lastLogin = auth.state.lastLoginAt ? formatDateTime(auth.state.lastLoginAt) : null;
    const handleModuleToggle = (module) => {
        const nextValue = !moduleSettings[module];
        updateSiteSettings({ modules: { [module]: nextValue } });
    };
    const renderTrendPill = (value) => {
        const positive = value >= 0;
        const Icon = positive ? ArrowUpRight : ArrowDownRight;
        const classes = positive
            ? "inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-200"
            : "inline-flex items-center gap-1 rounded-full border border-rose-400/40 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-200";
        const formatted = `${positive ? "+" : ""}${value.toFixed(1)}%`;
        return (React.createElement("span", { className: classes },
            React.createElement(Icon, { className: "h-3.5 w-3.5" }),
            formatted));
    };
    return (React.createElement("div", { className: "min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" },
        React.createElement("div", { className: "mx-auto flex w-full max-w-6xl gap-8 px-6 py-12" },
            React.createElement("aside", { className: "hidden lg:flex lg:w-72 lg:flex-shrink-0" },
                React.createElement("div", { className: "sticky top-24 flex w-full flex-col gap-8 rounded-3xl border border-white/10 px-6 py-8 shadow-[0_30px_80px_-40px_rgba(16,185,129,0.6)] backdrop-blur", style: { background: SIDEBAR_GRADIENT } },
                    React.createElement("div", { className: "flex items-center gap-3" },
                        React.createElement("span", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/10 text-lg font-semibold text-emerald-200" }, "FB"),
                        React.createElement("div", { className: "space-y-1" },
                            React.createElement("p", { className: "text-xs uppercase tracking-[0.32em] text-emerald-200/80" }, "Admin"),
                            React.createElement("p", { className: "text-base font-semibold text-white" }, "Fjolsenbanden"))),
                    React.createElement("div", { className: "rounded-2xl border border-white/10 bg-slate-950/40 p-4" },
                        React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-400" }, "Medlemsvekst"),
                        React.createElement("p", { className: "mt-2 text-2xl font-semibold text-white" }, totals.totalMembers.toLocaleString("no-NO")),
                        React.createElement("p", { className: "flex items-center gap-1 text-xs text-emerald-300" },
                            React.createElement(ArrowUpRight, { className: "h-3.5 w-3.5" }),
                            `+${totals.growth}% siste 6 mnd`)),
                    React.createElement("nav", { className: "space-y-4" },
                        React.createElement("div", { className: "space-y-1" },
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.28em] text-slate-400" }, "Navigasjon"),
                            React.createElement("p", { className: "text-sm text-slate-300" }, "Utforsk alt i kontrollpanelet")),
                        React.createElement("ul", { className: "space-y-1" }, ADMIN_NAV_ITEMS.map((item) => (React.createElement("li", { key: item.id },
                            React.createElement("a", { href: `#${item.id}`, className: "flex items-center gap-3 rounded-2xl border border-white/5 bg-white/0 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-white" },
                                React.createElement(item.Icon, { className: "h-4 w-4 text-emerald-300", "aria-hidden": "true" }),
                                React.createElement("span", null, item.label))))))),
                    React.createElement("div", { className: "space-y-3" },
                        React.createElement(Button, { asChild: true, className: "w-full justify-start gap-2 rounded-2xl bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400" },
                            React.createElement("a", { href: "/admin/members" },
                                React.createElement(Users, { className: "h-4 w-4", "aria-hidden": "true" }),
                                " Administrer medlemmer")),
                        React.createElement(Button, { asChild: true, variant: "outline", className: "w-full justify-start gap-2 rounded-2xl border-white/20 bg-white/5 text-white hover:bg-white/10" },
                            React.createElement("a", { href: "/admin/profile-preview" },
                                React.createElement(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": "true" }),
                                " Forh\u00E5ndsvis profiler"))))),
            React.createElement("div", { className: "flex min-w-0 flex-1 flex-col gap-10" },
                React.createElement("header", { id: "overview", className: "scroll-mt-32 flex flex-col justify-between gap-6 lg:flex-row lg:items-start" },
                    React.createElement("div", { className: "space-y-3" },
                        React.createElement("p", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200" },
                            React.createElement(ShieldCheck, { className: "h-4 w-4" }),
                            " Intern oversikt"),
                        React.createElement("h1", { className: "text-3xl font-semibold tracking-tight text-white sm:text-4xl" }, "Adminpanel for Fjolsenbanden"),
                        React.createElement("p", { className: "max-w-2xl text-base text-slate-300" }, "Oppdater profileringen, styr hvilke moduler som vises og f\u00F8lg med p\u00E5 vekst direkte fra ett samlet kontrollrom. Medlemsdata h\u00E5ndteres n\u00E5 i en egen administrasjonsside.")),
                    React.createElement("div", { className: "flex flex-col items-end gap-4" },
                        React.createElement("div", { className: "flex flex-wrap items-center justify-end gap-3" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100" },
                                React.createElement(Lock, { className: "h-3.5 w-3.5" }),
                                " Innlogget som administrator"),
                            React.createElement(Button, { className: "bg-white/10 text-white hover:bg-white/20", type: "button" },
                                React.createElement(ArrowUpRight, { className: "mr-2 h-4 w-4" }),
                                " Eksporter CSV"),
                            React.createElement(Button, { variant: "outline", className: "border-white/20 bg-white/5 text-white hover:bg-white/15", type: "button" },
                                React.createElement(MessageCircle, { className: "mr-2 h-4 w-4" }),
                                " Del status"),
                            React.createElement(Button, { variant: "outline", className: "border-white/20 bg-white/5 text-white hover:bg-white/15", onClick: auth.logout },
                                React.createElement(LogOut, { className: "mr-2 h-4 w-4" }),
                                " Logg ut")),
                        lastLogin ? React.createElement("p", { className: "text-xs text-slate-400" },
                            "Sist verifisert ",
                            lastLogin) : null)),
                React.createElement("div", { className: "lg:hidden" },
                    React.createElement("div", { className: "-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2" }, ADMIN_NAV_ITEMS.map((item) => (React.createElement("a", { key: item.id, href: `#${item.id}`, className: "whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-white" }, item.label))))),
                React.createElement("section", { id: "site", className: "grid gap-6 scroll-mt-32 lg:grid-cols-[1.2fr,1fr]" },
                    React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                        React.createElement(CardHeader, null,
                            React.createElement(CardTitle, { className: "text-lg text-white" }, "Oppdater logo og tekst"),
                            React.createElement("p", { className: "text-sm text-slate-300" }, "Tilpass hvordan Fjolsenbanden presenteres utad. Endringene vises med en gang i forh\u00E5ndsvisningen.")),
                        React.createElement(CardContent, { className: "space-y-6" },
                            React.createElement("form", { className: "space-y-5", onSubmit: handleBrandSubmit },
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "logoUrl", className: "text-slate-200" }, "Logo-URL"),
                                    React.createElement(Input, { id: "logoUrl", name: "logoUrl", value: brandForm.logoUrl, onChange: (event) => setBrandForm((state) => ({ ...state, logoUrl: event.target.value })), placeholder: "https://...", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }),
                                    React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-center" },
                                        React.createElement("label", { className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10" },
                                            React.createElement(UploadCloud, { className: "h-4 w-4", "aria-hidden": "true" }),
                                            "Last opp fil",
                                            React.createElement("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleLogoFileChange })),
                                        React.createElement("p", { className: "text-xs text-slate-400" }, "St\u00F8tter PNG, JPG og SVG. Maks 2\u00A0MB anbefales."))),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "heroTitle", className: "text-slate-200" }, "Hovedtittel"),
                                    React.createElement(Input, { id: "heroTitle", name: "heroTitle", value: brandForm.heroTitle, onChange: (event) => setBrandForm((state) => ({ ...state, heroTitle: event.target.value })), placeholder: "FJOLSENBANDEN", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "heroTagline", className: "text-slate-200" }, "Ingress / slagord"),
                                    React.createElement(Textarea, { id: "heroTagline", name: "heroTagline", rows: 3, value: brandForm.heroTagline, onChange: (event) => setBrandForm((state) => ({ ...state, heroTagline: event.target.value })), placeholder: "Beskriv kort hva Fjolsenbanden tilbyr", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "presentationVideoUrl", className: "text-slate-200" }, "Presentasjonsvideo (YouTube-embed)"),
                                    React.createElement(Input, { id: "presentationVideoUrl", name: "presentationVideoUrl", value: brandForm.presentationVideoUrl, onChange: (event) => setBrandForm((state) => ({ ...state, presentationVideoUrl: event.target.value })), placeholder: "https://www.youtube.com/embed/...", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }),
                                    React.createElement("p", { className: "text-xs text-slate-400" }, "Lim inn adressen fra \u00ABDel\u00BB \u2192 \u00ABBygg inn\u00BB (starter med https://www.youtube.com/embed/).")),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "twitchEmbedUrl", className: "text-slate-200" }, "Twitch-embed URL"),
                                    React.createElement(Input, { id: "twitchEmbedUrl", name: "twitchEmbedUrl", value: brandForm.twitchEmbedUrl, onChange: (event) => setBrandForm((state) => ({ ...state, twitchEmbedUrl: event.target.value })), placeholder: "https://player.twitch.tv/?channel=...&parent=din-side.no", className: "bg-slate-950/40 text-white placeholder:text-slate-400" }),
                                    React.createElement("p", { className: "text-xs text-slate-400" },
                                        "Husk \u00E5 oppdatere ",
                                        React.createElement("code", { className: "rounded bg-white/10 px-1 py-[1px]" }, "parent"),
                                        "-parameteren med domenet ditt.")),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: "announcement", className: "text-slate-200" }, "Aktuell melding"),
                                    React.createElement(Textarea, { id: "announcement", name: "announcement", rows: 2, value: brandForm.announcement, onChange: (event) => setBrandForm((state) => ({ ...state, announcement: event.target.value })), placeholder: "Neste livesending starter...", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                React.createElement("div", { className: "flex items-center justify-between gap-3" },
                                    React.createElement("p", { className: "text-xs text-slate-400" }, "Lagres automatisk i nettleseren n\u00E5r du klikker \u00ABPubliser endringer\u00BB."),
                                    React.createElement(Button, { type: "submit", className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400" }, "Lagre endringer"))),
                            React.createElement("div", { className: "space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5" },
                                React.createElement("div", { className: "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between" },
                                    React.createElement("p", { className: "text-sm font-semibold text-white" }, "Moduler p\u00E5 forsiden"),
                                    React.createElement("span", { className: "text-xs text-slate-300" }, "Sl\u00E5 av seksjoner som ikke skal vises.")),
                                React.createElement("div", { className: "space-y-3" }, orderedSectionItems.map((item, index) => {
                                    const enabled = item.moduleKey ? moduleSettings[item.moduleKey] : true;
                                    const isDropTarget = dragOverSection === item.key;
                                    const isDragging = draggingSection === item.key;
                                    const orderLabel = String(index + 1).padStart(2, "0");
                                    return (React.createElement("div", { key: item.key, draggable: true, onDragStart: handleSectionDragStart(item.key), onDragEnter: handleSectionDragEnter(item.key), onDragOver: handleSectionDragOver, onDrop: handleSectionDrop(item.key), onDragEnd: handleSectionDragEnd, className: `flex flex-col gap-4 rounded-xl border bg-slate-950/30 p-4 transition sm:flex-row sm:items-center sm:justify-between ${isDropTarget
                                            ? "border-emerald-400/60 bg-emerald-500/10"
                                            : isDragging
                                                ? "border-cyan-400/60 bg-cyan-500/10"
                                                : "border-white/10"}` },
                                        React.createElement("div", { className: "flex flex-1 items-start gap-3 text-left" },
                                            React.createElement("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-emerald-200" }, orderLabel),
                                            React.createElement("div", { className: "flex-1" },
                                                React.createElement("p", { className: "flex items-center gap-2 text-sm font-semibold text-white" },
                                                    React.createElement(item.Icon, { className: "h-4 w-4 text-emerald-300" }),
                                                    " ",
                                                    item.label),
                                                React.createElement("p", { className: "text-xs text-slate-300" }, item.description))),
                                        React.createElement("div", { className: "flex items-center gap-3 self-stretch sm:self-auto" },
                                            React.createElement("span", { className: "inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-300" },
                                                React.createElement(GripVertical, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
                                                " Flytt"),
                                            item.moduleKey ? (React.createElement("button", { type: "button", onClick: (event) => {
                                                    event.stopPropagation();
                                                    handleModuleToggle(item.moduleKey);
                                                }, className: `inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold transition ${enabled
                                                    ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
                                                    : "border-white/20 bg-white/5 text-slate-200 hover:bg-white/10"}`, "aria-pressed": enabled },
                                                React.createElement("span", { className: `h-2 w-2 rounded-full ${enabled ? "bg-emerald-300" : "bg-slate-400"}`, "aria-hidden": "true" }),
                                                enabled ? "Aktivert" : "Skjult")) : (React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold text-slate-200" },
                                                React.createElement("span", { className: "h-2 w-2 rounded-full bg-emerald-300", "aria-hidden": "true" }),
                                                " Alltid aktiv")))));
                                }))))),
                    React.createElement(Card, { className: "border-white/10 bg-gradient-to-br from-indigo-900/80 via-indigo-950 to-slate-950 text-white" },
                        React.createElement(CardHeader, { className: "pb-4" },
                            React.createElement(CardTitle, { className: "flex items-center justify-between text-base text-white" },
                                "Forh\u00E5ndsvisning",
                                React.createElement("span", { className: "text-xs font-medium text-indigo-200" }, "Oppdatert i sanntid"))),
                        React.createElement(CardContent, { className: "space-y-6" },
                            React.createElement("div", { className: "overflow-hidden rounded-2xl border border-white/10", style: { background: brandBackground } },
                                React.createElement("div", { className: "flex flex-col gap-6 p-6" },
                                    React.createElement("div", { className: "flex items-center gap-4" },
                                        React.createElement("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10" }, siteSettings.logoUrl ? (React.createElement("img", { src: siteSettings.logoUrl, alt: "Fjolsenbanden-logo", className: "max-h-12 max-w-full object-contain" })) : (React.createElement("span", { className: "text-lg font-semibold tracking-wide" }, "FB"))),
                                        React.createElement("div", null,
                                            React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-300" }, "Brand hero"),
                                            React.createElement("p", { className: "text-lg font-semibold text-white" }, "F\u00F8rsteinntrykket ute p\u00E5 nettsiden"))),
                                    React.createElement("div", { className: "space-y-3" },
                                        React.createElement("h2", { className: "text-3xl font-black tracking-tight text-white sm:text-4xl" }, siteSettings.heroTitle || "FJOLSENBANDEN"),
                                        React.createElement("p", { className: "text-sm text-slate-200 sm:text-base" }, siteSettings.heroTagline ||
                                            "Spillglede for hele familien – trygge streams, turneringer og premier.")),
                                    React.createElement("div", { className: "flex flex-wrap gap-3" },
                                        React.createElement(Button, { className: "rounded-full bg-emerald-500 px-5 text-sm font-semibold text-emerald-950 shadow-lg" }, "Bli med p\u00E5 neste stream"),
                                        React.createElement(Button, { variant: "outline", className: "rounded-full border-white/30 bg-white/10 px-5 text-sm text-white hover:bg-white/20" }, "Les medlemsguiden"))),
                                React.createElement("div", { className: "border-t border-white/10 bg-white/5 px-6 py-4 text-xs text-slate-200" },
                                    React.createElement("span", { className: "font-semibold text-white" }, "Nyhet:"),
                                    " ",
                                    siteSettings.announcement)),
                            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4" },
                                    React.createElement("p", { className: "text-xs uppercase tracking-wide text-indigo-200" }, "Medlemsvekst"),
                                    React.createElement("p", { className: "mt-2 text-2xl font-semibold text-white" }, totals.totalMembers.toLocaleString("no-NO")),
                                    React.createElement("p", { className: "text-xs text-indigo-100/80" }, "Medlemmer totalt")),
                                React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4" },
                                    React.createElement("p", { className: "text-xs uppercase tracking-wide text-indigo-200" }, "Nye medlemmer"),
                                    React.createElement("p", { className: "mt-2 text-2xl font-semibold text-white" }, totals.totalNewMembers),
                                    React.createElement("p", { className: "text-xs text-indigo-100/80" }, "Siste 6 m\u00E5neder")))))),
                React.createElement("section", { id: "memberships", className: "grid gap-6 scroll-mt-32 lg:grid-cols-2" },
                    React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                        React.createElement(CardHeader, null,
                            React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                                React.createElement(Users, { className: "h-5 w-5 text-emerald-300" }),
                                " Medlemskap"),
                            React.createElement("p", { className: "text-sm text-slate-300" }, "Oppdater navn, pris og fordeler for hver medlemskategori. Endringer lagres med en gang.")),
                        React.createElement(CardContent, { className: "space-y-4" },
                            membershipDrafts.map((tier) => (React.createElement("div", { key: tier.id, className: "space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4" },
                                React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "text-sm font-semibold text-white" }, tier.title || "Medlemskap"),
                                        React.createElement("p", { className: "text-xs text-slate-400" }, "Vises i prislisten p\u00E5 forsiden.")),
                                    React.createElement(Button, { variant: "outline", className: "inline-flex items-center gap-2 border-white/20 bg-white/5 text-xs text-slate-200 hover:bg-white/10", type: "button", onClick: () => removeMembershipTier(tier.id) },
                                        React.createElement(Trash2, { className: "h-3.5 w-3.5" }),
                                        " Fjern")),
                                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                    React.createElement("div", { className: "space-y-2" },
                                        React.createElement(Label, { htmlFor: `tier-title-${tier.id}`, className: "text-slate-200" }, "Navn"),
                                        React.createElement(Input, { id: `tier-title-${tier.id}`, value: tier.title, onChange: (event) => handleMembershipFieldChange(tier.id, "title", event.target.value), className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                    React.createElement("div", { className: "space-y-2" },
                                        React.createElement(Label, { htmlFor: `tier-price-${tier.id}`, className: "text-slate-200" }, "Pris"),
                                        React.createElement(Input, { id: `tier-price-${tier.id}`, value: tier.price, onChange: (event) => handleMembershipFieldChange(tier.id, "price", event.target.value), className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: `tier-color-${tier.id}`, className: "text-slate-200" }, "Fargevalg"),
                                    React.createElement("select", { id: `tier-color-${tier.id}`, value: tier.color, onChange: (event) => handleMembershipFieldChange(tier.id, "color", event.target.value), className: "w-full rounded-lg border border-white/15 bg-slate-950/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400" },
                                        React.createElement("option", { value: "green" }, "Gr\u00F8nn"),
                                        React.createElement("option", { value: "cyan" }, "Turkis"),
                                        React.createElement("option", { value: "amber" }, "Gul"))),
                                React.createElement("div", { className: "space-y-2" },
                                    React.createElement(Label, { htmlFor: `tier-features-${tier.id}`, className: "text-slate-200" }, "Fordeler (\u00E9n per linje)"),
                                    React.createElement(Textarea, { id: `tier-features-${tier.id}`, value: tier.features.join("\n"), onChange: (event) => handleMembershipFeaturesChange(tier.id, event.target.value), rows: 3, className: "bg-slate-950/40 text-white placeholder:text-slate-400" }))))),
                            React.createElement(Button, { type: "button", className: "inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 hover:bg-emerald-400", onClick: addMembershipTier },
                                React.createElement(Plus, { className: "h-4 w-4" }),
                                " Legg til medlemskap"))),
                    React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                        React.createElement(CardHeader, null,
                            React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                                React.createElement(Crown, { className: "h-5 w-5 text-amber-300" }),
                                " Samarbeidspartnere"),
                            React.createElement("p", { className: "text-sm text-slate-300" }, "Last opp logoer og oppdater navn p\u00E5 partnerne som vises p\u00E5 forsiden.")),
                        React.createElement(CardContent, { className: "space-y-4" },
                            partnerLogos.map((partner) => (React.createElement("div", { key: partner.id, className: "space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4" },
                                React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-start" },
                                    React.createElement("div", { className: "flex h-20 w-20 items-center justify-center rounded-xl border border-white/10 bg-white/5" }, partner.logoUrl ? (React.createElement("img", { src: partner.logoUrl, alt: partner.name || "Partnerlogo", className: "h-16 w-16 object-contain" })) : (React.createElement("span", { className: "text-xs text-slate-400" }, "Ingen logo"))),
                                    React.createElement("div", { className: "flex-1 space-y-3" },
                                        React.createElement("div", { className: "space-y-2" },
                                            React.createElement(Label, { htmlFor: `partner-name-${partner.id}`, className: "text-slate-200" }, "Navn"),
                                            React.createElement(Input, { id: `partner-name-${partner.id}`, value: partner.name, onChange: (event) => handlePartnerFieldChange(partner.id, "name", event.target.value), className: "bg-slate-950/40 text-white placeholder:text-slate-400" })),
                                        React.createElement("div", { className: "space-y-2" },
                                            React.createElement(Label, { htmlFor: `partner-logo-${partner.id}`, className: "text-slate-200" }, "Logo-URL"),
                                            React.createElement(Input, { id: `partner-logo-${partner.id}`, value: partner.logoUrl, onChange: (event) => handlePartnerFieldChange(partner.id, "logoUrl", event.target.value), placeholder: "https://...", className: "bg-slate-950/40 text-white placeholder:text-slate-400" })))),
                                React.createElement("div", { className: "flex flex-wrap items-center gap-3" },
                                    React.createElement("label", { className: "inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10" },
                                        React.createElement(UploadCloud, { className: "h-4 w-4", "aria-hidden": "true" }),
                                        "Last opp logo",
                                        React.createElement("input", { type: "file", accept: "image/*", className: "hidden", onChange: handlePartnerLogoUpload(partner.id) })),
                                    React.createElement(Button, { variant: "outline", className: "inline-flex items-center gap-2 border-white/20 bg-white/5 text-xs text-slate-200 hover:bg-white/10", type: "button", onClick: () => removePartnerLogo(partner.id) },
                                        React.createElement(Trash2, { className: "h-3.5 w-3.5" }),
                                        " Fjern"))))),
                            React.createElement(Button, { type: "button", className: "inline-flex items-center gap-2 bg-cyan-500 text-cyan-950 hover:bg-cyan-400", onClick: addPartnerLogo },
                                React.createElement(Plus, { className: "h-4 w-4" }),
                                " Legg til partner")))),

React.createElement("section", { id: "insights", className: "space-y-6 scroll-mt-32" },
    React.createElement("div", { className: "grid gap-6 xl:grid-cols-[1.4fr,1fr,1.1fr]" },
        React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
            React.createElement(CardHeader, { className: "flex flex-col gap-3 pb-4" },
                React.createElement(CardTitle, { className: "flex items-center justify-between text-white" },
                    React.createElement("span", { className: "inline-flex items-center gap-2" },
                        React.createElement(BarChart3, { className: "h-5 w-5 text-cyan-300" }),
                        " Topp-sider"),
                    React.createElement(Button, { variant: "outline", size: "sm", className: "rounded-full border-white/20 bg-white/5 text-xs font-semibold text-slate-200 hover:bg-white/15" },
                        React.createElement(ArrowUpRight, { className: "mr-1 h-3 w-3" }),
                        " Eksporter")),
                React.createElement("p", { className: "text-sm text-slate-300" }, "Se hvilke sider som driver mest trafikk akkurat nå.")),
            React.createElement(CardContent, { className: "space-y-3" }, topPageStats.map((page) => (React.createElement("div", { key: page.url, className: "flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3" },
                React.createElement("div", { className: "flex flex-col" },
                    React.createElement("span", { className: "font-medium text-white" }, page.url),
                    React.createElement("span", { className: "text-xs text-slate-400" }, `${page.unique.toLocaleString("no-NO")} unike besøk`)),
                React.createElement("div", { className: "flex items-center gap-6 text-sm" },
                    React.createElement("span", { className: "font-semibold text-white" }, page.views.toLocaleString("no-NO")),
                    renderTrendPill(page.change))))))),
        React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
            React.createElement(CardHeader, { className: "flex flex-col gap-3 pb-4" },
                React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                    React.createElement(Monitor, { className: "h-5 w-5 text-emerald-300" }),
                    " Sesjonsenheter"),
                React.createElement("p", { className: "text-sm text-slate-300" }, "Fordeling av siste 30 dagers besøk.")),
            React.createElement(CardContent, { className: "flex flex-col items-center gap-6" },
                React.createElement("div", { className: "relative h-36 w-36" },
                    React.createElement("div", { className: "absolute inset-0 rounded-full", style: { background: `conic-gradient(${deviceGradient})` } }),
                    React.createElement("div", { className: "absolute inset-[22%] rounded-full bg-slate-950/90" }),
                    React.createElement("div", { className: "absolute inset-[30%] flex flex-col items-center justify-center text-xs text-slate-300" },
                        React.createElement("span", { className: "text-sm font-semibold text-white" }, deviceBreakdown.totalSessions.toLocaleString("no-NO")),
                        React.createElement("span", null, "sesjoner"))),
                React.createElement("div", { className: "grid w-full gap-3" }, deviceBreakdown.segments.map((segment) => (React.createElement("div", { key: segment.key, className: "flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2" },
                    React.createElement("div", { className: "flex items-center gap-2" },
                        React.createElement("span", { className: "inline-flex h-2.5 w-2.5 rounded-full", style: { backgroundColor: segment.color } }),
                        React.createElement("span", { className: "text-sm text-slate-200" }, segment.label)),
                    React.createElement("span", { className: "text-sm font-semibold text-white" }, `${segment.percent.toFixed(1)}%`))))))),
        React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
            React.createElement(CardHeader, { className: "flex flex-col gap-3 pb-4" },
                React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                    React.createElement(Globe, { className: "h-5 w-5 text-sky-300" }),
                    " Toppkanaler"),
                React.createElement("div", { className: "flex items-baseline justify-between" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-400" }, "Totalt"),
                        React.createElement("p", { className: "text-3xl font-semibold text-white" }, channelBreakdown.totalVisitors.toLocaleString("no-NO"))),
                    renderTrendPill(channelBreakdown.change))),
            React.createElement(CardContent, { className: "space-y-3" }, channelBreakdown.channels.map((channel) => (React.createElement("div", { key: channel.key, className: "flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3" },
                React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement(channel.Icon, { className: "h-5 w-5" }),
                    React.createElement("div", null,
                        React.createElement("p", { className: "font-medium text-white" }, channel.label),
                        React.createElement("p", { className: "text-xs text-slate-400" }, `${channel.share}% av trafikken`))),
                React.createElement("div", { className: "flex items-center gap-4" },
                    React.createElement("span", { className: "font-semibold text-white" }, channel.visitors.toLocaleString("no-NO")),
                    renderTrendPill(channel.trend)))))))),
    React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
        React.createElement(CardHeader, { className: "flex flex-col gap-3 pb-4" },
            React.createElement(CardTitle, { className: "flex items-center justify-between text-white" },
                React.createElement("span", { className: "inline-flex items-center gap-2" },
                    React.createElement(PieChart, { className: "h-5 w-5 text-cyan-300" }),
                    " Analytisk oversikt"),
                React.createElement("span", { className: "rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200" },
                    "Vis: ",
                    analyticsOverview.periodLabel)),
            React.createElement("div", { className: "flex flex-wrap items-center gap-6" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-400" }, "Sidevisninger"),
                    React.createElement("p", { className: "text-3xl font-semibold text-white" }, analyticsOverview.pageViews.value.toLocaleString("no-NO"))),
                renderTrendPill(analyticsOverview.pageViews.change),
                React.createElement("div", null,
                    React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-400" }, "Tid på siden"),
                    React.createElement("p", { className: "text-2xl font-semibold text-white" }, analyticsOverview.averageTime.value)),
                renderTrendPill(analyticsOverview.averageTime.change))),
        React.createElement(CardContent, { className: "space-y-6" },
            React.createElement("div", { className: "relative h-64 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40" },
                React.createElement("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none", className: "h-full w-full" },
                    trafficChart.series.map((series) => (React.createElement("path", { key: series.key, d: series.path, fill: "none", stroke: series.color, strokeWidth: 2.5, strokeLinecap: "round", opacity: 0.9 }))),
                    trafficChart.series.map((series) => series.points.map((point) => (React.createElement("circle", { key: `${series.key}-${point.label}`, cx: point.x, cy: point.y, r: 1.6, fill: series.color }))))),
                React.createElement("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-6 pb-3 text-[10px] uppercase tracking-wide text-slate-500" }, trafficChart.months.map((month) => (React.createElement("span", { key: month }, month))))),
            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" },
                React.createElement(StatTile, { icon: React.createElement(Users, { className: "h-5 w-5 text-emerald-300" }), label: "Medlemmer totalt", value: totals.totalMembers.toLocaleString("no-NO"), description: `+${totals.growth}% siste 6 mnd` }),
                React.createElement(StatTile, { icon: React.createElement(Activity, { className: "h-5 w-5 text-cyan-300" }), label: "Seertimer", value: totals.totalWatchHours.toLocaleString("no-NO"), description: "Summerte strømmetimer" }),
                React.createElement(StatTile, { icon: React.createElement(Trophy, { className: "h-5 w-5 text-amber-300" }), label: "Turneringer", value: totals.totalTournaments, description: "Arrangert hittil i år" }),
                React.createElement(StatTile, { icon: React.createElement(TrendingUp, { className: "h-5 w-5 text-pink-300" }), label: "Nye denne måneden", value: `+${analyticsOverview.latestNewMembers}`, description: "Registrerte medlemmer" })),
            React.createElement("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-4" }, analyticsOverview.quickStats.map((stat) => (React.createElement("div", { key: stat.label, className: "rounded-2xl border border-white/10 bg-slate-950/40 p-4" },
                React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-400" }, stat.label),
                React.createElement("div", { className: "mt-2 flex items-baseline justify-between" },
                    React.createElement("span", { className: "text-2xl font-semibold text-white" }, stat.value),
                    renderTrendPill(stat.change)),
                stat.caption ? React.createElement("p", { className: "mt-1 text-xs text-slate-400" }, stat.caption) : null))))),
    React.createElement("div", { className: "grid gap-6 lg:grid-cols-[2fr,1fr]" },
        React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
            React.createElement(CardHeader, { className: "flex flex-col gap-3 pb-4" },
                React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                    React.createElement(BarChart3, { className: "h-5 w-5 text-emerald-300" }),
                    " Trafikkilder"),
                React.createElement("p", { className: "text-sm text-slate-300" }, "Hvordan ulike kilder bidrar til trafikk og måloppnåelse.")),
            React.createElement(CardContent, { className: "overflow-x-auto" },
                React.createElement("table", { className: "min-w-full text-left text-sm text-slate-200" },
                    React.createElement("thead", { className: "bg-white/5 text-xs uppercase tracking-wide text-slate-300" },
                        React.createElement("tr", null,
                            React.createElement("th", { className: "px-4 py-3 font-medium" }, "Kilde"),
                            React.createElement("th", { className: "px-4 py-3 font-medium" }, "Besøk"),
                            React.createElement("th", { className: "px-4 py-3 font-medium" }, "Unike"),
                            React.createElement("th", { className: "px-4 py-3 font-medium" }, "Bounce-rate"),
                            React.createElement("th", { className: "px-4 py-3 font-medium" }, "Sesjon"),
                            React.createElement("th", { className: "px-4 py-3 font-medium" }, "Mål"))),
                    React.createElement("tbody", null, trafficTable.map((row) => (React.createElement("tr", { key: row.source, className: "border-t border-white/10" },
                        React.createElement("td", { className: "px-4 py-3 font-medium text-white" }, row.source),
                        React.createElement("td", { className: "px-4 py-3" }, row.visits.toLocaleString("no-NO")),
                        React.createElement("td", { className: "px-4 py-3" }, row.uniqueVisitors.toLocaleString("no-NO")),
                        React.createElement("td", { className: "px-4 py-3" }, `${row.bounceRate.toFixed(1)}%`),
                        React.createElement("td", { className: "px-4 py-3" }, row.avgDuration),
                        React.createElement("td", { className: "px-4 py-3" },
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("div", { className: "h-2 w-24 overflow-hidden rounded-full bg-white/10" },
                                    React.createElement("div", { className: "h-full rounded-full bg-emerald-400/80", style: { width: `${row.progress}%` } })),
                                React.createElement("span", { className: "text-xs text-slate-300" }, `${row.progress}%`))))))))),
        React.createElement("div", { className: "space-y-6" },
            React.createElement(Card, { className: "border-white/10 bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-indigo-900/20 text-white" },
                React.createElement(CardHeader, { className: "pb-3" },
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                        React.createElement(PieChart, { className: "h-5 w-5 text-cyan-200" }),
                        " Sponsorsegmenter"),
                    React.createElement("p", { className: "text-sm text-slate-200/90" }, "Se hvilke kanaler spillerne dekker for å målrette sponsorplassene bedre.")),
                React.createElement(CardContent, { className: "space-y-4" },
                    React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/10 p-4" },
                        React.createElement("p", { className: "text-xs uppercase tracking-wide text-cyan-100/80" }, "Profiler klare"),
                        React.createElement("p", { className: "mt-1 text-2xl font-semibold text-white" }, sponsorSegments.totalPlayers),
                        React.createElement("p", { className: "text-xs text-cyan-100/70" }, "Med komplette kontaktdata")),
                    React.createElement("div", { className: "space-y-3" }, sponsorSegments.segments.map((segment) => (React.createElement("div", { key: segment.key, className: "space-y-2" },
                        React.createElement("div", { className: "flex items-center justify-between text-xs text-slate-200" },
                            React.createElement("span", { className: "uppercase tracking-wide text-slate-300" }, segment.label),
                            React.createElement("span", { className: "font-semibold text-white" }, segment.members)),
                        React.createElement("div", { className: "h-2 w-full overflow-hidden rounded-full bg-white/10" },
                            React.createElement("div", { className: "h-full rounded-full bg-cyan-400/80", style: { width: `${segment.percent}%` } })))))))),
            React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                React.createElement(CardHeader, { className: "pb-2" },
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                        React.createElement(CalendarCheck, { className: "h-5 w-5 text-emerald-300" }),
                        " Kommende milepæler")),
                React.createElement(CardContent, { className: "space-y-4 text-sm text-slate-200" },
                    React.createElement(Milestone, { title: "Sommerfinale med familiequiz", date: "24. juni", description: "Planlegg premier og send ut invitasjoner til foreldregruppen." }),
                    React.createElement(Milestone, { title: "Lansering av foreldrehub", date: "3. juli", description: "Oppdater guider og videoopptak før publisering i medlemsportalen." }),
                    React.createElement(Milestone, { title: "Back-to-school kampanje", date: "14. august", description: "Koordiner sponsorer for skolestart og sikre familievennlige premier." }))),
            React.createElement(Card, { className: "border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-emerald-900/20 text-white" },
                React.createElement(CardHeader, { className: "pb-2" },
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                        React.createElement(Crown, { className: "h-5 w-5 text-emerald-200" }),
                        " Tips for nye medlemmer")),
                React.createElement(CardContent, { className: "space-y-3 text-sm text-emerald-50/90" },
                    React.createElement("p", { className: "leading-relaxed" }, "Del logoen direkte med sponsorer, og bruk slagordet i overlay for livestreams. Trenger dere flere forslag til tekst? Test ulike varianter og lagre favorittene lokalt før dere publiserer."),
                    React.createElement("p", { className: "text-xs text-emerald-100/80" }, "Endringene blir liggende i nettleseren din. Når du er fornøyd, kan du eksportere oppsettet og dele med resten av teamet."))))))),
                React.createElement("section", { id: "team", className: "space-y-6 scroll-mt-32" },
                    React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-2xl font-semibold text-white" }, "Team og profiler"),
                            React.createElement("p", { className: "text-sm text-slate-300" }, "Hver spiller f\u00E5r automatisk en profilside. Administrer detaljer fra medlemsoversikten.")),
                        React.createElement("div", { className: "flex flex-wrap gap-2" },
                            React.createElement(Button, { asChild: true, className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400" },
                                React.createElement("a", { href: "/admin/members" }, "\u00C5pne medlemsadministrasjon")),
                            React.createElement(Button, { asChild: true, variant: "outline", className: "border-white/20 bg-white/5 text-white hover:bg-white/15" },
                                React.createElement("a", { href: "/admin/profile-preview" }, "Forh\u00E5ndsvis profiler")))),
                    React.createElement("div", { className: "grid gap-6 lg:grid-cols-[1.4fr,1fr]" },
                        React.createElement(Card, { className: "border-white/10 bg-white/5 text-white" },
                            React.createElement(CardHeader, { className: "pb-4" },
                                React.createElement(CardTitle, { className: "flex items-center justify-between text-white" },
                                    React.createElement("span", { className: "inline-flex items-center gap-2" },
                                        React.createElement(Users, { className: "h-5 w-5 text-cyan-300" }),
                                        " Aktive spillere"),
                                    React.createElement("span", { className: "text-xs text-slate-300" },
                                        players.length,
                                        " totalt")),
                                React.createElement("p", { className: "text-sm text-slate-300" }, "Se en rask oversikt over laget. For \u00E5 oppdatere informasjon, bruk medlemsadministrasjonen.")),
                            React.createElement(CardContent, null,
                                React.createElement("div", { className: "space-y-4" },
                                    players.length ? (players.slice(0, 4).map((player) => (React.createElement("article", { key: player.id, className: "flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between" },
                                        React.createElement("div", { className: "flex items-center gap-4" },
                                            React.createElement("img", { src: player.avatarUrl, alt: player.gamerTag, className: "h-16 w-16 rounded-2xl object-cover" }),
                                            React.createElement("div", null,
                                                React.createElement("p", { className: "text-lg font-semibold text-white" }, player.gamerTag),
                                                React.createElement("p", { className: "text-xs uppercase tracking-wide text-slate-300" }, player.mainGame),
                                                React.createElement("p", { className: "text-xs text-slate-400" },
                                                    "Med siden ",
                                                    formatDate(player.joinDate)))),
                                        React.createElement("div", { className: "flex items-center gap-2 self-end sm:self-auto" },
                                            React.createElement(Button, { asChild: true, size: "sm", className: "bg-cyan-500 text-cyan-950 hover:bg-cyan-400" },
                                                React.createElement("a", { href: `/players/${player.slug}` },
                                                    React.createElement(ArrowUpRight, { className: "mr-2 h-4 w-4" }),
                                                    " \u00C5pne profil"))))))) : (React.createElement("p", { className: "rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-300" }, "Ingen spillere er registrert enn\u00E5. Opprett den f\u00F8rste via medlemsadministrasjonen.")),
                                    players.length > 4 ? (React.createElement("p", { className: "text-xs text-slate-400" }, "Vis hele listen og gj\u00F8r endringer under \u00ABAdministrer medlemmer\u00BB.")) : null))),
                        React.createElement(Card, { className: "border-white/10 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-slate-900/40 text-white" },
                            React.createElement(CardHeader, { className: "pb-3" },
                                React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                                    React.createElement(ShieldCheck, { className: "h-5 w-5 text-cyan-200" }),
                                    " Slik jobber du med medlemmene")),
                            React.createElement(CardContent, { className: "space-y-4 text-sm text-slate-200" },
                                React.createElement("p", null, "All medlemsdata \u2013 inkludert kontaktinfo og sosiale kanaler \u2013 ligger samlet p\u00E5 den nye siden for medlemsh\u00E5ndtering."),
                                React.createElement("ul", { className: "space-y-2 text-slate-300" },
                                    React.createElement("li", null, "\u2022 Oppdater biografi, spill og sosiale lenker direkte per medlem."),
                                    React.createElement("li", null, "\u2022 Registrer nye spillere med full kontaktinfo og tildel slug automatisk."),
                                    React.createElement("li", null, "\u2022 Bruk forh\u00E5ndsvisningen for \u00E5 kvalitetssikre profilen f\u00F8r du deler den.")),
                                React.createElement(Button, { asChild: true, variant: "outline", className: "w-full border-white/20 bg-white/5 text-white hover:bg-white/15" },
                                    React.createElement("a", { href: "/admin/members" }, "G\u00E5 til medlemsh\u00E5ndtering")))))))),
function normalizeSectionOrder(order) {
    const fallback = DEFAULT_SECTION_ORDER;
    const incoming = Array.isArray(order) ? order : [];
    const combined = [...incoming, ...fallback];
    const seen = new Set();
    const result = [];
    for (const key of combined) {
        if (fallback.includes(key) && !seen.has(key)) {
            seen.add(key);
            result.push(key);
        }
    }
    return result;
}
function reorderSectionKeys(order, source, target) {
    const sourceIndex = order.indexOf(source);
    const targetIndex = order.indexOf(target);
    if (sourceIndex === -1 || targetIndex === -1) {
        return order;
    }
    const next = [...order];
    next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, source);
    return next;
}
function generateLocalId(prefix) {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(typeof reader.result === "string" ? reader.result : "");
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
function formatDateTime(input) {
    if (!input) {
        return "";
    }
    try {
        return new Date(input).toLocaleString("no-NO", { dateStyle: "medium", timeStyle: "short" });
    }
    catch (error) {
        return input;
    }
}
function computeGrowth(history) {
    if (history.length < 2) {
        return 0;
    }
    const first = history[0] ? history[0].members : 0;
    const last = history.at(-1) ? history.at(-1).members : 0;
    if (!first) {
        return last ? 100 : 0;
    }
    return Math.round(((last - first) / first) * 100);
}
function buildAnalyticsOverview(history) {
    if (history.length === 0) {
        return {
            periodLabel: "Månedlig",
            pageViews: { value: 0, change: 0 },
            averageTime: { value: "0m 00s", change: 0 },
            latestNewMembers: 0,
            quickStats: [],
        };
    }
    const last = history[history.length - 1];
    const prev = history.length > 1 ? history[history.length - 2] : last;
    const totalWatch = history.reduce((sum, point) => sum + point.watchHours, 0);
    const pageViewsValue = Math.round(totalWatch * 120);
    const pageViewsChange = percentageChange(last.watchHours, prev.watchHours);
    const averageSeconds = Math.max(60, Math.round((last.watchHours * 3600) / Math.max(last.members * 18, 1)));
    const averageTimeValue = formatDuration(averageSeconds);
    const averageTimeChange = percentageChange(last.watchHours / Math.max(last.members || 1, 1), prev.watchHours / Math.max(prev.members || 1, 1));
    const visitorValue = Math.round(last.watchHours * 14 + last.newMembers * 45);
    const visitorPrev = Math.round(prev.watchHours * 14 + prev.newMembers * 45);
    const conversionRate = Math.min(100, (last.newMembers / Math.max(last.members || 1, 1)) * 100);
    const conversionPrev = Math.min(100, (prev.newMembers / Math.max(prev.members || 1, 1)) * 100);
    const campaignClicks = Math.round(last.watchHours * 3 + last.tournaments * 120 + last.newMembers * 22);
    const campaignPrev = Math.round(prev.watchHours * 3 + prev.tournaments * 120 + prev.newMembers * 22);
    const goalProgress = Math.min(100, Math.round((last.members / Math.max(last.members + 180, 1)) * 100));
    const goalPrev = Math.min(100, Math.round((prev.members / Math.max(prev.members + 180, 1)) * 100));
    return {
        periodLabel: "Månedlig",
        pageViews: { value: pageViewsValue, change: pageViewsChange },
        averageTime: { value: averageTimeValue, change: averageTimeChange },
        latestNewMembers: last.newMembers,
        quickStats: [
            { label: "Besøksverdi", value: `${visitorValue.toLocaleString("no-NO")} kr`, change: percentageChange(visitorValue, visitorPrev), caption: "Gjennomsnittlig verdi per besøk" },
            { label: "Konverteringsrate", value: `${conversionRate.toFixed(1)}%`, change: percentageChange(conversionRate, conversionPrev), caption: "Registreringer / totalt besøk" },
            { label: "Kampanjeklikk", value: campaignClicks.toLocaleString("no-NO"), change: percentageChange(campaignClicks, campaignPrev), caption: "Fra pågående annonse" },
            { label: "Måloppnåelse", value: `${goalProgress}%`, change: percentageChange(goalProgress, goalPrev), caption: "Mot månedsmålet" },
        ],
    };
}
function buildTopPageStats(siteSettings, history) {
    const last = history.at(-1) || { members: 0, newMembers: 0 };
    const base = Math.max(last.members * 8 + last.newMembers * 40, 1800);
    const templates = [
        { url: "/dashboard", weight: 1.15, change: 1.8 },
        { url: "/live", weight: 1, change: 0.6 },
        { url: "/affiliate", weight: 0.82, change: -0.4 },
        { url: "/products", weight: 0.76, change: 1.2 },
        { url: "/sign-in", weight: 0.68, change: -0.7 },
    ];
    return templates.map((template, index) => {
        const views = Math.round(base * template.weight) + index * 42;
        const uniqueVisitors = Math.round(views * 0.36);
        return {
            url: template.url,
            views,
            unique: uniqueVisitors,
            change: template.change,
        };
    });
}
function buildDeviceBreakdown(history) {
    const last = history.at(-1) || { members: 0 };
    const totalSessions = Math.max(Math.round(last.members * 2.4), 0);
    const segments = [
        { key: "desktop", label: "Desktop", percent: 42.2, color: "#38bdf8" },
        { key: "mobile", label: "Mobil", percent: 33.6, color: "#22d3ee" },
        { key: "tablet", label: "Nettbrett", percent: 24.2, color: "#a855f7" },
    ];
    return { totalSessions, segments };
}
function buildChannelBreakdown(history) {
    const last = history.at(-1) || { members: 0, watchHours: 0, newMembers: 0 };
    const prev = history.length > 1 ? history[history.length - 2] : last;
    const totalVisitors = Math.max(Math.round(last.members * 99), 0);
    const baseChange = percentageChange(last.watchHours, prev.watchHours);
    const channels = [
        { key: "search", label: "Google", share: 44, icon: Globe, factor: 0.44, trend: baseChange + 1.2 },
        { key: "instagram", label: "Instagram", share: 27, icon: Instagram, factor: 0.27, trend: baseChange / 2 + 0.9 },
        { key: "youtube", label: "YouTube", share: 29, icon: Youtube, factor: 0.29, trend: baseChange / 3 },
    ].map((channel) => ({
        key: channel.key,
        label: channel.label,
        share: channel.share,
        visitors: Math.round(totalVisitors * channel.factor),
        trend: channel.trend,
        Icon: channel.icon,
    }));
    return { totalVisitors, change: baseChange, channels };
}
function buildTrafficTable(history) {
    const last = history.at(-1) || { members: 0, newMembers: 0, watchHours: 0 };
    const baseVisits = Math.max(last.members * 45, 2200);
    const rows = [
        { source: "Organisk", factor: 1.12, unique: 0.64, bounce: 12.4, duration: "4m 18s", progress: 74 },
        { source: "Henvisning", factor: 0.78, unique: 0.59, bounce: 18.3, duration: "3m 42s", progress: 58 },
        { source: "Direkte", factor: 0.66, unique: 0.55, bounce: 22.1, duration: "2m 56s", progress: 46 },
        { source: "Kampanjer", factor: 0.58, unique: 0.5, bounce: 28.6, duration: "2m 34s", progress: 32 },
    ];
    return rows.map((row) => ({
        source: row.source,
        visits: Math.round(baseVisits * row.factor),
        uniqueVisitors: Math.round(baseVisits * row.factor * row.unique),
        bounceRate: row.bounce,
        avgDuration: row.duration,
        progress: row.progress,
    }));
}
function buildTrafficChart(history) {
    if (history.length === 0) {
        return { months: [], series: [] };
    }
    const months = history.map((point) => point.month);
    const naturalValues = history.map((point) => Math.round(point.watchHours * 120 + point.members * 30));
    const referralValues = history.map((point) => Math.round(point.newMembers * 280 + point.tournaments * 220));
    const directValues = history.map((point) => Math.round(point.members * 55 + point.newMembers * 120));
    const allValues = [...naturalValues, ...referralValues, ...directValues];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const range = Math.max(max - min, 1);
    const horizontalStep = history.length > 1 ? 100 / (history.length - 1) : 0;
    const buildSeries = (key, label, color, values) => {
        const points = values.map((value, index) => {
            const x = index * horizontalStep;
            const y = 100 - ((value - min) / range) * 80 - 10;
            return { x, y, value, label: months[index] };
        });
        const path = points.reduce((acc, point, index) => acc + `${index === 0 ? "M" : "L"}${point.x},${point.y} `, "").trim();
        return { key, label, color, points, path };
    };
    return {
        months,
        series: [
            buildSeries("natural", "Naturlig", "#38bdf8", naturalValues),
            buildSeries("referral", "Henvisning", "#f97316", referralValues),
            buildSeries("direct", "Direkte", "#34d399", directValues),
        ],
    };
}
function buildSponsorSegments(players) {
    const definitions = [
        { key: "fortnite", label: "Fortnite" },
        { key: "twitch", label: "Twitch" },
        { key: "discord", label: "Discord" },
        { key: "tiktok", label: "TikTok" },
        { key: "youtube", label: "YouTube" },
    ];
    const segments = definitions.map((definition) => {
        const members = players.filter((player) => {
            var _a;
            const handle = (_a = player.socials) === null || _a === void 0 ? void 0 : _a[definition.key];
            return Boolean(handle && handle.trim());
        }).length;
        return { key: definition.key, label: definition.label, members };
    });
    const maxMembers = Math.max(1, ...segments.map((segment) => segment.members));
    return {
        totalPlayers: players.length,
        segments: segments.map((segment) => ({
            ...segment,
            percent: segment.members > 0 ? Math.max((segment.members / maxMembers) * 100, 12) : 0,
        })),
    };
}
function formatDate(input) {
    if (!input) {
        return "Ukjent";
    }
    try {
        return new Date(input).toLocaleDateString("no-NO", { year: "numeric", month: "short" });
    }
    catch (error) {
        return input;
    }
}
function StatTile({ icon, label, value, description }) {
    return (React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4" },
        React.createElement("div", { className: "flex items-center justify-between text-xs uppercase tracking-wide text-slate-300" },
            React.createElement("span", null, label),
            icon),
        React.createElement("p", { className: "mt-3 text-2xl font-semibold text-white" }, value),
        React.createElement("p", { className: "text-xs text-slate-300" }, description)));
}
function Milestone({ title, date, description }) {
    return (React.createElement("div", { className: "rounded-2xl border border-white/10 bg-white/5 p-4" },
        React.createElement("div", { className: "flex items-center justify-between text-xs uppercase tracking-wide text-slate-300" },
            React.createElement("span", null, title),
            React.createElement("span", { className: "text-emerald-200" }, date)),
        React.createElement("p", { className: "mt-2 text-sm text-slate-200" }, description)));
}
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}m ${remainder.toString().padStart(2, "0")}s`;
}
function percentageChange(current, previous) {
    if (previous === 0) {
        return current ? 100 : 0;
    }
    return Math.round(((current - previous) / Math.abs(previous)) * 10) / 10;
}

