import React, { useMemo, useState } from "react";
import { BarChart3, Brush, CloudUpload, Globe, LayoutDashboard, ListChecks, LogOut, TimerReset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardPage from "@/fragments/admin/pages/DashboardPage";
import BrandingPage from "@/fragments/admin/pages/BrandingPage";
import SectionsPage from "@/fragments/admin/pages/SectionsPage";
import SeoAnalyticsPage from "@/fragments/admin/pages/SeoAnalyticsPage";
import PublishingPage from "@/fragments/admin/pages/PublishingPage";
import DomainPage from "@/fragments/admin/pages/DomainPage";
import LogsPage from "@/fragments/admin/pages/LogsPage";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

const NAVIGATION = [
    { id: "dashboard", label: "Dashboard", description: "Oversikt over sider og nøkkeltall", icon: LayoutDashboard },
    { id: "branding", label: "Branding", description: "Logo, farger og tema", icon: Brush },
    { id: "sections", label: "Seksjoner", description: "Administrer sideinnhold", icon: ListChecks },
    { id: "seo", label: "SEO & Analyse", description: "Metadata og sporingsverktøy", icon: BarChart3 },
    { id: "publishing", label: "Publisering", description: "Forhåndsvis og publiser", icon: CloudUpload },
    { id: "domain", label: "Domene", description: "Subdomene og DNS", icon: Globe },
    { id: "logs", label: "Versjoner", description: "Historikk og tilbakerulling", icon: TimerReset },
];

const ROLE_OPTIONS = [
    { value: "owner", label: "Owner" },
    { value: "moderator", label: "Moderator" },
    { value: "admin", label: "Admin" },
    { value: "partner", label: "Partner" },
];

const PAGES = {
    dashboard: DashboardPage,
    branding: BrandingPage,
    sections: SectionsPage,
    seo: SeoAnalyticsPage,
    publishing: PublishingPage,
    domain: DomainPage,
    logs: LogsPage,
};

function RoleSelector() {
    const { currentRole, setCurrentRole } = useSiteConfig();
    return (
        React.createElement("div", { className: "space-y-2" },
            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "Rolle"),
            React.createElement("div", { className: "grid grid-cols-2 gap-2" }, ROLE_OPTIONS.map((option) => (
                React.createElement(Button, {
                    key: option.value,
                    type: "button",
                    variant: option.value === currentRole ? "default" : "outline",
                    className: option.value === currentRole
                        ? "bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        : "border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800",
                    onClick: () => setCurrentRole(option.value),
                }, option.label)
            )))
        )
    );
}

function SiteSwitcher() {
    const { sites, activeSite, selectSite } = useSiteConfig();
    const [search, setSearch] = useState("");
    const filtered = useMemo(() => {
        const needle = search.trim().toLowerCase();
        if (!needle) {
            return sites;
        }
        return sites.filter((site) =>
            site.name.toLowerCase().includes(needle) ||
            site.domain.toLowerCase().includes(needle) ||
            site.id.toLowerCase().includes(needle),
        );
    }, [search, sites]);

    return (
        React.createElement(Card, { className: "border-slate-800 bg-slate-950/80" },
            React.createElement(CardHeader, null,
                React.createElement(CardTitle, { className: "text-sm text-slate-200" }, "Mine sider"),
                React.createElement("p", { className: "text-xs text-slate-400" }, "Velg hvilken side du vil administrere")),
            React.createElement(CardContent, { className: "space-y-4" },
                React.createElement(Input, {
                    value: search,
                    onChange: (event) => setSearch(event.target.value),
                    placeholder: "Søk etter side eller domene",
                    className: "border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500",
                }),
                React.createElement("div", { className: "space-y-2" }, filtered.map((site) => (
                    React.createElement(Button, {
                        key: site.id,
                        type: "button",
                        onClick: () => selectSite(site.id),
                        className: `w-full justify-between border border-slate-800 bg-slate-900 text-left ${activeSite?.id === site.id
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "text-slate-200 hover:bg-slate-800"}`,
                    },
                        React.createElement("div", { className: "flex flex-col" },
                            React.createElement("span", { className: "text-sm font-semibold" }, site.name),
                            React.createElement("span", { className: "text-xs text-slate-400" }, site.domain)),
                        React.createElement("span", { className: `text-xs font-semibold ${site.status === "published"
                                ? "text-emerald-400"
                                : site.status === "pending"
                                    ? "text-amber-400"
                                    : "text-slate-400"}` }, site.status.toUpperCase()))
                )))
        ))
    );
}

function Navigation({ activePage, onNavigate }) {
    return (
        React.createElement("nav", { className: "space-y-1" }, NAVIGATION.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
                React.createElement(Button, {
                    key: item.id,
                    type: "button",
                    onClick: () => onNavigate(item.id),
                    variant: isActive ? "default" : "outline",
                    className: `group flex w-full items-center justify-start gap-3 border border-transparent ${isActive
                        ? "bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        : "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"}`,
                },
                    React.createElement(Icon, { size: 18, className: isActive ? "text-emerald-950" : "text-slate-400" }),
                    React.createElement("div", { className: "flex flex-col text-left" },
                        React.createElement("span", { className: "text-sm font-semibold" }, item.label),
                        React.createElement("span", { className: "text-xs text-slate-400" }, item.description)))
            );
        }))
    );
}

export default function AdminShell() {
    const { activeSite, currentUser } = useSiteConfig();
    const [activePage, setActivePage] = useState("dashboard");
    const PageComponent = PAGES[activePage] ?? DashboardPage;

    return (
        React.createElement("div", { className: "min-h-screen bg-slate-950 text-slate-100" },
            React.createElement("div", { className: "mx-auto flex max-w-[1400px] gap-6 px-6 py-10" },
                React.createElement("aside", { className: "w-72 space-y-6" },
                    React.createElement("div", { className: "flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3" },
                        React.createElement("div", null,
                            React.createElement("p", { className: "text-sm font-semibold text-slate-200" }, "Admin"),
                            React.createElement("p", { className: "text-xs text-slate-500" }, currentUser.name)),
                        React.createElement(Button, { type: "button", variant: "outline", size: "sm", className: "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800" },
                            React.createElement(LogOut, { size: 16, className: "mr-2" }),
                            "Logg ut")),
                    React.createElement(SiteSwitcher, null),
                    React.createElement(RoleSelector, null),
                    React.createElement(Navigation, { activePage: activePage, onNavigate: setActivePage })),
                React.createElement("main", { className: "flex-1 space-y-6" },
                    React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                        React.createElement(CardContent, { className: "flex items-center justify-between gap-6 py-4" },
                            React.createElement("div", null,
                                React.createElement("h1", { className: "text-2xl font-bold text-slate-100" }, activeSite?.name ?? "Velg side"),
                                React.createElement("p", { className: "text-sm text-slate-400" }, activeSite?.domain ?? "")),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement(Button, {
                                    type: "button",
                                    className: "border border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800",
                                    onClick: () => setActivePage("publishing"),
                                },
                                    React.createElement(CloudUpload, { size: 16, className: "mr-2" }),
                                    "Publiser"),
                                React.createElement(Button, {
                                    type: "button",
                                    className: "border border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800",
                                    onClick: () => setActivePage("sections"),
                                },
                                    React.createElement(ListChecks, { size: 16, className: "mr-2" }),
                                    "Rediger seksjoner")))),
                    React.createElement("section", { className: "space-y-6" },
                        React.createElement(PageComponent, null)))
            ))
    );
}
