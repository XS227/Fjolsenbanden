"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    Bell,
    CalendarCheck,
    Crown,
    Globe,
    GripVertical,
    Instagram,
    Lock,
    LogOut,
    Menu,
    MessageCircle,
    Monitor,
    PieChart,
    Plus,
    Search,
    ShieldCheck,
    TrendingUp,
    Trophy,
    Trash2,
    UploadCloud,
    Users,
    Youtube,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    DEFAULT_SITE_MODULES,
    DEFAULT_SECTION_ORDER,
    useAdminState,
} from "@/lib/admin-state";
import { useAdminAuth } from "@/lib/admin-auth";

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
    { id: "statistics", label: "Statistikk", Icon: BarChart3 },
    { id: "sections", label: "Oppdater sideinnhold", Icon: GripVertical },
    { id: "membership", label: "Medlemskap", Icon: ShieldCheck },
    { id: "partners", label: "Sponsorer & partnere", Icon: Crown },
    { id: "members", label: "Team & profiler", Icon: Users },
];

export default function AdminDashboard() {
    const auth = useAdminAuth();

    if (!auth.state.isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-100">
                <LoginModal
                    open
                    auth={auth}
                    title="Admininnlogging"
                    description="Oppgi brukernavn og passord for administratorer for å åpne kontrollpanelet."
                    accent="emerald"
                />
            </div>
        );
    }

    return <AdminDashboardContent auth={auth} />;
}

function AdminDashboardContent({ auth }) {
    const { state, updateSiteSettings } = useAdminState();
    const { siteSettings, players, statsHistory } = state;

    const [brandForm, setBrandForm] = useState(siteSettings);
    const [sectionOrder, setSectionOrder] = useState(() =>
        normalizeSectionOrder(siteSettings.sectionOrder),
    );
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

    const moduleSettings = useMemo(
        () => ({
            ...DEFAULT_SITE_MODULES,
            ...(siteSettings.modules ?? DEFAULT_SITE_MODULES),
        }),
        [siteSettings.modules],
    );

    const sectionItemMap = useMemo(
        () => new Map(SECTION_ITEMS.map((item) => [item.key, item])),
        [],
    );

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
        event.preventDefault();
        const sourceKey = event.dataTransfer?.getData("text/plain") ?? draggingSection;
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
            const next = current.map((tier) =>
                tier.id === id ? { ...tier, [field]: value } : tier,
            );
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
            const next = current.map((partner) =>
                partner.id === id ? { ...partner, [field]: value } : partner,
            );
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
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        try {
            const dataUrl = await readFileAsDataUrl(file);
            handlePartnerFieldChange(id, "logoUrl", dataUrl);
        } finally {
            event.target.value = "";
        }
    };

    const handleLogoFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        try {
            const dataUrl = await readFileAsDataUrl(file);
            setBrandForm((state) => ({ ...state, logoUrl: dataUrl }));
            updateSiteSettings({ logoUrl: dataUrl });
        } finally {
            event.target.value = "";
        }
    };

    const totals = useMemo(() => {
        const totalMembers = statsHistory.at(-1)?.members ?? 0;
        const totalWatchHours = statsHistory.reduce((sum, point) => sum + point.watchHours, 0);
        const totalTournaments = statsHistory.reduce((sum, point) => sum + point.tournaments, 0);
        const totalNewMembers = statsHistory.reduce((sum, point) => sum + point.newMembers, 0);
        const growth = computeGrowth(statsHistory);
        return { totalMembers, totalWatchHours, totalTournaments, totalNewMembers, growth };
    }, [statsHistory]);

    const latestStats = statsHistory.at(-1) ?? {
        members: 0,
        watchHours: 0,
        tournaments: 0,
        newMembers: 0,
    };
    const previousStats = statsHistory.length > 1 ? statsHistory[statsHistory.length - 2] : latestStats;

    const overviewCards = [
        {
            key: "members",
            label: "Medlemmer",
            icon: Users,
            value: totals.totalMembers.toLocaleString("no-NO"),
            helper: "Totalt i communityet",
            change: totals.growth,
        },
        {
            key: "watch",
            label: "Seertimer",
            icon: Monitor,
            value: `${latestStats.watchHours.toLocaleString("no-NO")} t`,
            helper: "Siste måned",
            change: percentageChange(latestStats.watchHours, previousStats.watchHours),
        },
        {
            key: "events",
            label: "Turneringer",
            icon: CalendarCheck,
            value: latestStats.tournaments.toLocaleString("no-NO"),
            helper: "Planlagt / måned",
            change: percentageChange(latestStats.tournaments, previousStats.tournaments),
        },
        {
            key: "new",
            label: "Nye medlemmer",
            icon: TrendingUp,
            value: latestStats.newMembers.toLocaleString("no-NO"),
            helper: "Registrert siste måned",
            change: percentageChange(latestStats.newMembers, previousStats.newMembers),
        },
    ];

    const analyticsOverview = useMemo(
        () => buildAnalyticsOverview(statsHistory),
        [statsHistory],
    );
    const topPageStats = useMemo(
        () => buildTopPageStats(siteSettings, statsHistory),
        [siteSettings, statsHistory],
    );
    const deviceBreakdown = useMemo(
        () => buildDeviceBreakdown(statsHistory),
        [statsHistory],
    );
    const channelBreakdown = useMemo(
        () => buildChannelBreakdown(statsHistory),
        [statsHistory],
    );
    const trafficTable = useMemo(
        () => buildTrafficTable(statsHistory),
        [statsHistory],
    );
    const trafficChart = useMemo(
        () => buildTrafficChart(statsHistory),
        [statsHistory],
    );
    const sponsorSegments = useMemo(
        () => buildSponsorSegments(players),
        [players],
    );

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
            ? "inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600"
            : "inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600";
        const formatted = `${positive ? "+" : ""}${value.toFixed(1)}%`;
        return (
            <span className={classes}>
                <Icon className="h-3.5 w-3.5" />
                {formatted}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <div className="flex min-h-screen">
                <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white/80 backdrop-blur-xl xl:flex">
                    <div className="flex flex-col gap-10 px-6 py-10">
                        <div className="flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-lg font-semibold text-emerald-600">
                                FB
                            </span>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Admin</p>
                                <p className="text-base font-semibold">Fjolsenbanden</p>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Medlemsvekst
                                </p>
                                <p className="mt-3 text-3xl font-semibold">
                                    {totals.totalMembers.toLocaleString("no-NO")}
                                </p>
                                <p className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {`+${totals.growth}% siste 6 mnd`}
                                </p>
                            </div>
                            <nav className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                        Navigasjon
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Utforsk alt i kontrollpanelet
                                    </p>
                                </div>
                                <ul className="space-y-2">
                                    {ADMIN_NAV_ITEMS.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className="flex items-center gap-3 rounded-2xl border border-transparent px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                                            >
                                                <item.Icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="space-y-3">
                                <Button
                                    asChild
                                    className="w-full justify-start gap-2 rounded-2xl bg-emerald-500 text-emerald-950 shadow-sm hover:bg-emerald-400"
                                >
                                    <a href="/admin/members">
                                        <Users className="h-4 w-4" /> Administrer medlemmer
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full justify-start gap-2 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50"
                                >
                                    <a href="/admin/profile-preview">
                                        <ArrowUpRight className="h-4 w-4" /> Forhåndsvis profiler
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="flex flex-1 flex-col">
                    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
                        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border-slate-200 text-slate-600 xl:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                                <div>
                                    <h1 className="text-xl font-semibold text-slate-900">Kontrollpanel</h1>
                                    <p className="text-sm text-slate-500">
                                        Følg med på communityet og oppdater nettsiden i sanntid.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-end gap-4">
                                <div className="hidden max-w-md flex-1 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm md:flex">
                                    <Search className="h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Søk i kontoen"
                                        className="h-8 w-full border-none bg-transparent text-sm text-slate-600 focus:outline-none"
                                    />
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden h-10 w-10 items-center justify-center rounded-2xl border-slate-200 text-slate-600 md:inline-flex"
                                >
                                    <Bell className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="hidden h-10 w-10 items-center justify-center rounded-2xl border-slate-200 text-slate-600 lg:inline-flex"
                                >
                                    <PieChart className="h-5 w-5" />
                                </Button>
                                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-1.5">
                                    <div className="hidden text-right sm:block">
                                        <p className="text-sm font-semibold text-slate-700">
                                            Admin
                                        </p>
                                        {lastLogin ? (
                                            <p className="text-xs text-slate-400">Sist innlogget {lastLogin}</p>
                                        ) : null}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="inline-flex h-10 items-center gap-2 rounded-xl border-emerald-200 bg-emerald-50 px-3 text-emerald-600 hover:bg-emerald-100"
                                        onClick={auth.logout}
                                    >
                                        <LogOut className="h-4 w-4" /> Logg ut
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto px-6 py-10">
                        <section id="statistics" className="space-y-6">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                    Oversikt
                                </p>
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Nøkkeltall for Fjolsenbanden
                                </h2>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                                {overviewCards.map((card) => (
                                    <Card key={card.key} className="border-slate-200 bg-white shadow-sm">
                                        <CardContent className="flex flex-col gap-4 p-5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                                        {card.label}
                                                    </p>
                                                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                                                        {card.value}
                                                    </p>
                                                    <p className="text-xs text-slate-500">{card.helper}</p>
                                                </div>
                                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                                    <card.icon className="h-5 w-5" />
                                                </span>
                                            </div>
                                            {renderTrendPill(card.change)}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>

                        <section
                            id="insights"
                            className="mt-12 grid gap-6 xl:grid-cols-[1.8fr,1fr]"
                        >
                            <Card className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="flex flex-col gap-1">
                                    <CardTitle className="text-xl font-semibold text-slate-900">
                                        Arbeidsanalyse
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Nettstedsdata oppsummert {analyticsOverview.periodLabel.toLowerCase()}.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
                                        <div className="space-y-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-sm text-slate-500">Sidevisninger</p>
                                                    <p className="text-3xl font-semibold text-slate-900">
                                                        {analyticsOverview.pageViews.value.toLocaleString("no-NO")}
                                                    </p>
                                                </div>
                                                {renderTrendPill(analyticsOverview.pageViews.change)}
                                            </div>
                                            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                                <div className="relative h-56 w-full">
                                                    <svg
                                                        viewBox="0 0 100 100"
                                                        className="h-full w-full"
                                                        preserveAspectRatio="none"
                                                    >
                                                        {[20, 40, 60, 80].map((y) => (
                                                            <line
                                                                key={y}
                                                                x1="0"
                                                                x2="100"
                                                                y1={y}
                                                                y2={y}
                                                                stroke="#E2E8F0"
                                                                strokeDasharray="2 4"
                                                                strokeWidth="0.5"
                                                            />
                                                        ))}
                                                        {trafficChart.series.map((series) => (
                                                            <g key={series.key}>
                                                                <path
                                                                    d={series.path}
                                                                    fill="none"
                                                                    stroke={series.color}
                                                                    strokeWidth={2.4}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                {series.points.map((point) => (
                                                                    <circle
                                                                        key={`${series.key}-${point.x}`}
                                                                        cx={point.x}
                                                                        cy={point.y}
                                                                        r={1.4}
                                                                        fill="#fff"
                                                                        stroke={series.color}
                                                                        strokeWidth={0.8}
                                                                    />
                                                                ))}
                                                            </g>
                                                        ))}
                                                    </svg>
                                                </div>
                                                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-slate-400">
                                                    {trafficChart.months.map((month) => (
                                                        <span key={month}>{month.toUpperCase()}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-3">
                                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                                        Nye medlemmer
                                                    </p>
                                                    <p className="mt-2 text-xl font-semibold text-slate-900">
                                                        {analyticsOverview.latestNewMembers}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        Registrert siste periode
                                                    </p>
                                                </div>
                                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                                        Snittid på siden
                                                    </p>
                                                    <p className="mt-2 text-xl font-semibold text-slate-900">
                                                        {analyticsOverview.averageTime.value}
                                                    </p>
                                                    {renderTrendPill(analyticsOverview.averageTime.change)}
                                                </div>
                                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                                        Aktive moduler
                                                    </p>
                                                    <p className="mt-2 text-xl font-semibold text-slate-900">
                                                        {Object.values(moduleSettings).filter(Boolean).length}
                                                    </p>
                                                    <p className="text-xs text-slate-500">På forsiden nå</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-5">
                                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        Hurtigstatistikk
                                                    </p>
                                                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                                                        Oppdatert nå
                                                    </span>
                                                </div>
                                                <div className="mt-4 space-y-4">
                                                    {analyticsOverview.quickStats.map((stat) => (
                                                        <div key={stat.label} className="space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-medium text-slate-600">
                                                                    {stat.label}
                                                                </p>
                                                                {renderTrendPill(stat.change)}
                                                            </div>
                                                            <p className="text-lg font-semibold text-slate-900">
                                                                {stat.value}
                                                            </p>
                                                            <p className="text-xs text-slate-500">{stat.caption}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <Card className="border-slate-200 bg-white shadow-sm">
                                                <CardContent className="flex flex-col gap-4 p-5">
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        Trafikkilder
                                                    </p>
                                                    <div className="space-y-3">
                                                        {trafficTable.map((row) => (
                                                            <div key={row.source} className="space-y-1">
                                                                <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                                                                    <span>{row.source}</span>
                                                                    <span>{row.visits.toLocaleString("no-NO")}</span>
                                                                </div>
                                                                <div className="flex items-center justify-between text-xs text-slate-400">
                                                                    <span>{row.uniqueVisitors.toLocaleString("no-NO")} unike</span>
                                                                    <span>{row.avgDuration}</span>
                                                                </div>
                                                                <div className="h-2 rounded-full bg-slate-200">
                                                                    <div
                                                                        className="h-full rounded-full bg-emerald-400"
                                                                        style={{ width: `${row.progress}%` }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="space-y-6">
                                <Card className="border-slate-200 bg-white shadow-sm">
                                    <CardHeader className="gap-1">
                                        <CardTitle className="text-lg font-semibold text-slate-900">
                                            Sesjonsenheter
                                        </CardTitle>
                                        <p className="text-sm text-slate-500">
                                            Fordeling basert på siste måneds aktivitet.
                                        </p>
                                    </CardHeader>
                                    <CardContent className="flex items-center gap-6 p-5">
                                        <div className="relative h-36 w-36">
                                            <div
                                                className="absolute inset-0 rounded-full"
                                                style={{ background: `conic-gradient(${deviceGradient})` }}
                                            />
                                            <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-white text-center">
                                                <span className="text-xs font-medium text-slate-500">
                                                    Totalt
                                                </span>
                                                <span className="text-lg font-semibold text-slate-900">
                                                    {deviceBreakdown.totalSessions}
                                                </span>
                                                <span className="text-[10px] text-slate-400">
                                                    økter
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            {deviceBreakdown.segments.map((segment) => (
                                                <div key={segment.key} className="space-y-1">
                                                    <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                                                        <span className="flex items-center gap-2">
                                                            <span
                                                                className="h-2.5 w-2.5 rounded-full"
                                                                style={{ backgroundColor: segment.color }}
                                                            />
                                                            {segment.label}
                                                        </span>
                                                        <span>{segment.percent.toFixed(1)}%</span>
                                                    </div>
                                                    <div className="h-2 rounded-full bg-slate-200">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${segment.percent}%`,
                                                                backgroundColor: segment.color,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-slate-200 bg-white shadow-sm">
                                    <CardHeader className="gap-1">
                                        <CardTitle className="text-lg font-semibold text-slate-900">
                                            Viktigste kanaler
                                        </CardTitle>
                                        <p className="text-sm text-slate-500">
                                            Trafikkfordeling på de mest brukte kildene.
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-4 p-5">
                                        {channelBreakdown.channels.map((channel) => (
                                            <div key={channel.key} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                                                        <channel.Icon className="h-4 w-4 text-slate-600" />
                                                    </span>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {channel.label}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {channel.visitors.toLocaleString("no-NO")} besøk
                                                        </p>
                                                    </div>
                                                </div>
                                                {renderTrendPill(channel.trend)}
                                            </div>
                                        ))}
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                            <p>
                                                Totalt {channelBreakdown.totalVisitors.toLocaleString("no-NO")} besøk denne perioden.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                        <section className="mt-12 grid gap-6 xl:grid-cols-[1.6fr,1fr]">
                            <Card className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="gap-1">
                                    <CardTitle className="text-lg font-semibold text-slate-900">
                                        Viktigste sider
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Se hvilke områder som får mest trafikk den siste måneden.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="grid grid-cols-[1.4fr,1fr,auto] gap-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                        <span>Side</span>
                                        <span>Visninger</span>
                                        <span className="text-right">Endring</span>
                                    </div>
                                    <div className="space-y-3">
                                        {topPageStats.map((page) => (
                                            <div
                                                key={page.url}
                                                className="grid grid-cols-[1.4fr,1fr,auto] items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                                                        {page.url}
                                                    </span>
                                                    <span className="text-xs text-slate-400">
                                                        {page.unique.toLocaleString("no-NO")} unike
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-slate-800">
                                                    {page.views.toLocaleString("no-NO")}
                                                </span>
                                                <span className="justify-self-end">
                                                    {renderTrendPill(page.change)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="gap-1">
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                        <Lock className="h-5 w-5 text-emerald-500" /> Sikkerhetsstatus
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Trygg administrasjon for hele teamet.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                                        <p className="font-semibold">Alt ser bra ut!</p>
                                        <p>Tofaktor er aktivert for alle eiere av kontoen.</p>
                                    </div>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        <li className="flex items-start gap-3">
                                            <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-500" />
                                            <span>Planlegg revisjon av tilganger hver andre måned.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <Users className="mt-0.5 h-4 w-4 text-emerald-500" />
                                            <span>Send invitasjon til nye moderatorer direkte fra medlemssiden.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <MessageCircle className="mt-0.5 h-4 w-4 text-emerald-500" />
                                            <span>Del ukentlig status i #admin-samtaler for full oversikt.</span>
                                        </li>
                                    </ul>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                        <p className="font-semibold text-slate-700">Neste steg</p>
                                        <p>Oppdater passordpolicyen for supportfrivillige innen 30. juni.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                        <section id="sections" className="mt-12 space-y-6">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                                    Nettside og moduler
                                </p>
                                <h2 className="text-2xl font-semibold text-slate-900">
                                    Oppdater merkevare og seksjoner
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Endringer lagres med en gang og vises i forhåndsvisningen på forsiden.
                                </p>
                            </div>
                            <div className="grid gap-6 xl:grid-cols-[1.6fr,1fr]">
                                <Card className="border-slate-200 bg-white shadow-sm">
                                    <CardHeader className="gap-1">
                                        <CardTitle className="text-lg font-semibold text-slate-900">
                                            Grunnleggende brandinnstillinger
                                        </CardTitle>
                                        <p className="text-sm text-slate-500">
                                            Logo, hero-innhold og videolenker for forsiden.
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-6 p-6">
                                        <form className="space-y-5" onSubmit={handleBrandSubmit}>
                                            <div className="space-y-2">
                                                <Label htmlFor="logoUrl">Logo-URL</Label>
                                                <Input
                                                    id="logoUrl"
                                                    name="logoUrl"
                                                    value={brandForm.logoUrl}
                                                    onChange={(event) =>
                                                        setBrandForm((state) => ({
                                                            ...state,
                                                            logoUrl: event.target.value,
                                                        }))
                                                    }
                                                    placeholder="https://..."
                                                />
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-100">
                                                        <UploadCloud className="h-4 w-4" />
                                                        Last opp fil
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleLogoFileChange}
                                                        />
                                                    </label>
                                                    <p className="text-xs text-slate-500">
                                                        Støtter PNG, JPG og SVG. Maks 2 MB anbefales.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="heroTitle">Hovedtittel</Label>
                                                    <Input
                                                        id="heroTitle"
                                                        name="heroTitle"
                                                        value={brandForm.heroTitle}
                                                        onChange={(event) =>
                                                            setBrandForm((state) => ({
                                                                ...state,
                                                                heroTitle: event.target.value,
                                                            }))
                                                        }
                                                        placeholder="FJOLSENBANDEN"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="announcement">Aktuell melding</Label>
                                                    <Input
                                                        id="announcement"
                                                        name="announcement"
                                                        value={brandForm.announcement}
                                                        onChange={(event) =>
                                                            setBrandForm((state) => ({
                                                                ...state,
                                                                announcement: event.target.value,
                                                            }))
                                                        }
                                                        placeholder="Neste livesending starter..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="heroTagline">Ingress / slagord</Label>
                                                <Textarea
                                                    id="heroTagline"
                                                    name="heroTagline"
                                                    rows={3}
                                                    value={brandForm.heroTagline}
                                                    onChange={(event) =>
                                                        setBrandForm((state) => ({
                                                            ...state,
                                                            heroTagline: event.target.value,
                                                        }))
                                                    }
                                                    placeholder="Beskriv kort hva Fjolsenbanden tilbyr"
                                                />
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor="presentationVideoUrl">
                                                        Presentasjonsvideo (YouTube-embed)
                                                    </Label>
                                                    <Input
                                                        id="presentationVideoUrl"
                                                        name="presentationVideoUrl"
                                                        value={brandForm.presentationVideoUrl}
                                                        onChange={(event) =>
                                                            setBrandForm((state) => ({
                                                                ...state,
                                                                presentationVideoUrl: event.target.value,
                                                            }))
                                                        }
                                                        placeholder="https://www.youtube.com/embed/..."
                                                    />
                                                    <p className="text-xs text-slate-500">
                                                        Lim inn adressen fra «Del» → «Bygg inn».
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="twitchEmbedUrl">Twitch-embed URL</Label>
                                                    <Input
                                                        id="twitchEmbedUrl"
                                                        name="twitchEmbedUrl"
                                                        value={brandForm.twitchEmbedUrl}
                                                        onChange={(event) =>
                                                            setBrandForm((state) => ({
                                                                ...state,
                                                                twitchEmbedUrl: event.target.value,
                                                            }))
                                                        }
                                                        placeholder="https://player.twitch.tv/?channel=...&parent=din-side.no"
                                                    />
                                                    <p className="text-xs text-slate-500">
                                                        Husk å oppdatere <code className="rounded bg-slate-100 px-1 py-[1px]">parent</code>-parameteren.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                                                <p>
                                                    Lagres automatisk i nettleseren når du publiserer.
                                                </p>
                                                <Button type="submit" className="rounded-xl bg-emerald-500 px-4 text-emerald-950 hover:bg-emerald-400">
                                                    Lagre endringer
                                                </Button>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                                <div className="space-y-6">
                                    <Card className="border-slate-200 bg-white shadow-sm">
                                        <CardHeader className="gap-1">
                                            <CardTitle className="text-lg font-semibold text-slate-900">
                                                Seksjoner på forsiden
                                            </CardTitle>
                                            <p className="text-sm text-slate-500">
                                                Dra for å endre rekkefølge eller slå av moduler.
                                            </p>
                                        </CardHeader>
                                        <CardContent className="space-y-3 p-5">
                                            {orderedSectionItems.map((item, index) => {
                                                const enabled = item.moduleKey ? moduleSettings[item.moduleKey] : true;
                                                const isDropTarget = dragOverSection === item.key;
                                                const isDragging = draggingSection === item.key;
                                                return (
                                                    <div
                                                        key={item.key}
                                                        draggable
                                                        onDragStart={handleSectionDragStart(item.key)}
                                                        onDragEnter={handleSectionDragEnter(item.key)}
                                                        onDragOver={handleSectionDragOver}
                                                        onDrop={handleSectionDrop(item.key)}
                                                        onDragEnd={handleSectionDragEnd}
                                                        className={`flex flex-col gap-4 rounded-2xl border bg-white p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                                                            isDropTarget
                                                                ? "border-emerald-300 bg-emerald-50"
                                                                : isDragging
                                                                ? "border-cyan-300 bg-cyan-50"
                                                                : "border-slate-200"
                                                        }`}
                                                    >
                                                        <div className="flex flex-1 items-start gap-3">
                                                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-500">
                                                                {String(index + 1).padStart(2, "0")}
                                                            </span>
                                                            <div className="flex-1">
                                                                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                                    <item.Icon className="h-4 w-4 text-emerald-500" />
                                                                    {item.label}
                                                                </p>
                                                                <p className="text-xs text-slate-500">{item.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 self-stretch sm:self-auto">
                                                            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-500">
                                                                <GripVertical className="h-3.5 w-3.5" /> Flytt
                                                            </span>
                                                            {item.moduleKey ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={(event) => {
                                                                        event.stopPropagation();
                                                                        handleModuleToggle(item.moduleKey);
                                                                    }}
                                                                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold transition ${
                                                                        enabled
                                                                            ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                                                                            : "border-slate-200 bg-white text-slate-500"
                                                                    }`}
                                                                >
                                                                    <span
                                                                        className={`h-2 w-2 rounded-full ${
                                                                            enabled ? "bg-emerald-500" : "bg-slate-300"
                                                                        }`}
                                                                    />
                                                                    {enabled ? "Aktiv" : "Skjult"}
                                                                </button>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1 text-xs font-semibold text-slate-500">
                                                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                                                    Alltid aktiv
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </CardContent>
                                    </Card>
                                    <Card className="border-slate-200 bg-white shadow-sm">
                                        <CardHeader className="gap-1">
                                            <CardTitle className="text-lg font-semibold text-slate-900">
                                                Forhåndsvisning
                                            </CardTitle>
                                            <p className="text-sm text-slate-500">
                                                Slik ser hero-seksjonen ut for besøkende akkurat nå.
                                            </p>
                                        </CardHeader>
                                        <CardContent className="space-y-5 p-5">
                                            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-inner">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow">
                                                        {siteSettings.logoUrl ? (
                                                            <img
                                                                src={siteSettings.logoUrl}
                                                                alt="Fjolsenbanden-logo"
                                                                className="max-h-12 max-w-full object-contain"
                                                            />
                                                        ) : (
                                                            <span className="text-lg font-semibold tracking-wide text-slate-500">
                                                                FB
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wide text-slate-400">
                                                            Brand hero
                                                        </p>
                                                        <p className="text-lg font-semibold text-slate-800">
                                                            Førsteinntrykket ute på nettsiden
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-6 space-y-3">
                                                    <h3 className="text-2xl font-black text-slate-900">
                                                        {siteSettings.heroTitle || "FJOLSENBANDEN"}
                                                    </h3>
                                                    <p className="text-sm text-slate-600">
                                                        {siteSettings.heroTagline ||
                                                            "Spillglede for hele familien – trygge streams, turneringer og premier."}
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        <Button className="rounded-full bg-emerald-500 px-5 text-sm text-emerald-950 shadow-sm hover:bg-emerald-400">
                                                            Bli med på neste stream
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="rounded-full border-slate-200 bg-white px-5 text-sm text-slate-700 hover:bg-slate-50"
                                                        >
                                                            Les medlemsguiden
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="mt-5 rounded-2xl bg-white/60 p-4 text-xs text-slate-600">
                                                    <span className="font-semibold text-slate-800">Nyhet:</span> {siteSettings.announcement}
                                                </div>
                                            </div>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                                        Medlemsvekst
                                                    </p>
                                                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                                                        {totals.totalMembers.toLocaleString("no-NO")}
                                                    </p>
                                                    <p className="text-xs text-slate-500">Medlemmer totalt</p>
                                                </div>
                                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                                    <p className="text-xs uppercase tracking-wide text-slate-400">
                                                        Nye medlemmer
                                                    </p>
                                                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                                                        {totals.totalNewMembers.toLocaleString("no-NO")}
                                                    </p>
                                                    <p className="text-xs text-slate-500">Siste 6 måneder</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>
                        <section id="membership" className="mt-12 grid gap-6 xl:grid-cols-[1.6fr,1fr]">
                            <Card className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="gap-1">
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                        <Users className="h-5 w-5 text-emerald-500" /> Medlemskap
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Oppdater navn, pris og fordeler for hver medlemskategori.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    {membershipDrafts.map((tier) => (
                                        <div key={tier.id} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {tier.title || "Medlemskap"}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        Vises i prislisten på forsiden.
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    className="inline-flex items-center gap-2 border-slate-200 bg-white text-xs text-slate-600 hover:bg-slate-100"
                                                    type="button"
                                                    onClick={() => removeMembershipTier(tier.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" /> Fjern
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`tier-title-${tier.id}`}>Navn</Label>
                                                    <Input
                                                        id={`tier-title-${tier.id}`}
                                                        value={tier.title}
                                                        onChange={(event) =>
                                                            handleMembershipFieldChange(
                                                                tier.id,
                                                                "title",
                                                                event.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`tier-price-${tier.id}`}>Pris</Label>
                                                    <Input
                                                        id={`tier-price-${tier.id}`}
                                                        value={tier.price}
                                                        onChange={(event) =>
                                                            handleMembershipFieldChange(
                                                                tier.id,
                                                                "price",
                                                                event.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`tier-color-${tier.id}`}>Fargevalg</Label>
                                                <select
                                                    id={`tier-color-${tier.id}`}
                                                    value={tier.color}
                                                    onChange={(event) =>
                                                        handleMembershipFieldChange(
                                                            tier.id,
                                                            "color",
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                                >
                                                    <option value="green">Grønn</option>
                                                    <option value="cyan">Turkis</option>
                                                    <option value="amber">Gul</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`tier-features-${tier.id}`}>
                                                    Fordeler (én per linje)
                                                </Label>
                                                <Textarea
                                                    id={`tier-features-${tier.id}`}
                                                    value={tier.features.join("\n")}
                                                    onChange={(event) =>
                                                        handleMembershipFeaturesChange(
                                                            tier.id,
                                                            event.target.value,
                                                        )
                                                    }
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 text-emerald-950 hover:bg-emerald-400"
                                        onClick={addMembershipTier}
                                    >
                                        <Plus className="h-4 w-4" /> Legg til medlemskap
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card id="partners" className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="gap-1">
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                        <Crown className="h-5 w-5 text-emerald-500" /> Partnere
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Hold oversikt over logoer og lenker til samarbeidspartnere.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    {partnerLogos.map((partner) => (
                                        <div key={partner.id} className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="grid gap-3 sm:grid-cols-[auto,1fr] sm:items-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white">
                                                    {partner.logoUrl ? (
                                                        <img
                                                            src={partner.logoUrl}
                                                            alt={partner.name}
                                                            className="max-h-10 max-w-full object-contain"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-slate-400">Logo</span>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor={`partner-name-${partner.id}`}>Navn</Label>
                                                    <Input
                                                        id={`partner-name-${partner.id}`}
                                                        value={partner.name}
                                                        onChange={(event) =>
                                                            handlePartnerFieldChange(
                                                                partner.id,
                                                                "name",
                                                                event.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor={`partner-logo-${partner.id}`}>
                                                    Logo-URL
                                                </Label>
                                                <Input
                                                    id={`partner-logo-${partner.id}`}
                                                    value={partner.logoUrl}
                                                    onChange={(event) =>
                                                        handlePartnerFieldChange(
                                                            partner.id,
                                                            "logoUrl",
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="https://..."
                                                />
                                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-100">
                                                    <UploadCloud className="h-4 w-4" /> Last opp
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handlePartnerLogoUpload(partner.id)}
                                                    />
                                                </label>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    className="inline-flex items-center gap-2 border-slate-200 bg-white text-xs text-rose-600 hover:bg-rose-50"
                                                    type="button"
                                                    onClick={() => removePartnerLogo(partner.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" /> Fjern
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="button"
                                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 text-white hover:bg-slate-800"
                                        onClick={addPartnerLogo}
                                    >
                                        <Plus className="h-4 w-4" /> Ny partner
                                    </Button>
                                </CardContent>
                            </Card>
                        </section>

                        <section id="members" className="mt-12 grid gap-6 xl:grid-cols-[1.6fr,1fr]">
                            <Card className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="gap-1">
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                        <Trophy className="h-5 w-5 text-emerald-500" /> Team & profiler
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Hurtigoversikt over spillere i Fjolsenbanden.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-5 p-6">
                                    {players.length > 0 ? (
                                        <div className="space-y-4">
                                            {players.slice(0, 5).map((player) => (
                                                <div
                                                    key={player.id}
                                                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={player.avatarUrl}
                                                            alt={player.gamerTag}
                                                            className="h-14 w-14 rounded-2xl object-cover"
                                                        />
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-700">
                                                                {player.gamerTag}
                                                            </p>
                                                            <p className="text-xs text-slate-500">
                                                                {player.mainGame}
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                Med siden {formatDate(player.joinDate)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 self-end sm:self-auto">
                                                        <Button
                                                            asChild
                                                            size="sm"
                                                            className="rounded-xl bg-cyan-500 px-3 text-xs font-semibold text-cyan-950 hover:bg-cyan-400"
                                                        >
                                                            <a href={`/players/${player.slug}`}>
                                                                <ArrowUpRight className="mr-1 h-4 w-4" /> Åpne profil
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                                            Ingen spillere registrert ennå. Legg til via medlemsadministrasjonen.
                                        </p>
                                    )}
                                    {players.length > 4 ? (
                                        <p className="text-xs text-slate-400">
                                            Vis hele listen og gjør endringer under «Administrer medlemmer».
                                        </p>
                                    ) : null}
                                </CardContent>
                            </Card>
                            <Card className="border-slate-200 bg-white shadow-sm">
                                <CardHeader className="gap-1">
                                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                                        <ShieldCheck className="h-5 w-5 text-emerald-500" /> Sponsorelementer
                                    </CardTitle>
                                    <p className="text-sm text-slate-500">
                                        Hvor mange spillere som har registrert partner-lenker.
                                    </p>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                        Totalt {sponsorSegments.totalPlayers} profiler med komplette sponsorsett.
                                    </div>
                                    <div className="space-y-3">
                                        {sponsorSegments.segments.map((segment) => (
                                            <div key={segment.key} className="space-y-1">
                                                <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                                                    <span>{segment.label}</span>
                                                    <span>{segment.members} profiler</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-slate-200">
                                                    <div
                                                        className="h-full rounded-full bg-indigo-400"
                                                        style={{ width: `${segment.percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                                        <p className="font-semibold text-slate-700">Tips</p>
                                        <p>
                                            Oppdater kontaktinfo og sosiale lenker direkte på medlemssidene for å holde oversikten oppdatert.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

function normalizeSectionOrder(order) {
    const incoming = Array.isArray(order) ? order : [];
    const combined = [...incoming, ...DEFAULT_SECTION_ORDER];
    const seen = new Set();
    const result = [];
    for (const key of combined) {
        if (DEFAULT_SECTION_ORDER.includes(key) && !seen.has(key)) {
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
    } catch (error) {
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
    const averageTimeChange = percentageChange(
        last.watchHours / Math.max(last.members || 1, 1),
        prev.watchHours / Math.max(prev.members || 1, 1),
    );
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
            {
                label: "Besøksverdi",
                value: `${visitorValue.toLocaleString("no-NO")} kr`,
                change: percentageChange(visitorValue, visitorPrev),
                caption: "Gjennomsnittlig verdi per besøk",
            },
            {
                label: "Konverteringsrate",
                value: `${conversionRate.toFixed(1)}%`,
                change: percentageChange(conversionRate, conversionPrev),
                caption: "Registreringer / totalt besøk",
            },
            {
                label: "Kampanjeklikk",
                value: campaignClicks.toLocaleString("no-NO"),
                change: percentageChange(campaignClicks, campaignPrev),
                caption: "Fra pågående annonse",
            },
            {
                label: "Måloppnåelse",
                value: `${goalProgress}%`,
                change: percentageChange(goalProgress, goalPrev),
                caption: "Mot månedsmålet",
            },
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
            const handle = player.socials?.[definition.key];
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
        return new Date(input).toLocaleDateString("no-NO", {
            year: "numeric",
            month: "short",
        });
    } catch (error) {
        return input;
    }
}

function percentageChange(current, previous) {
    if (previous === 0) {
        return current === 0 ? 0 : 100;
    }
    return ((current - previous) / Math.abs(previous)) * 100;
}

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}m ${String(remainder).padStart(2, "0")}s`;
}
