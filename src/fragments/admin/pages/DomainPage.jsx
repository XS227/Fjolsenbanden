import React, { useState } from "react";
import { CheckCircle2, Loader2, RefreshCw, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

export default function DomainPage() {
    const { activeSiteState, activeSite, updateDomainSettings, checkDns } = useSiteConfig();
    const domain = activeSiteState?.domain;
    const [subdomain, setSubdomain] = useState(domain?.subdomain ?? "");
    const [customDomain, setCustomDomain] = useState(domain?.customDomain ?? "");
    const [dnsStatus, setDnsStatus] = useState(domain?.dnsStatus ?? "unknown");
    const [isChecking, setIsChecking] = useState(false);

    if (!domain || !activeSite) {
        return null;
    }

    const handleSave = () => {
        const computedCustom = customDomain || `${subdomain}.${domain.rootDomain}`;
        updateDomainSettings((current) => ({
            ...current,
            subdomain,
            customDomain: computedCustom,
            dnsStatus: current.dnsStatus === "connected" ? "pending" : current.dnsStatus,
        }));
        setDnsStatus((current) => (current === "connected" ? "pending" : current));
    };

    const handleGenerate = () => {
        const slug = activeSite.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const value = slug || activeSite.id;
        setSubdomain(value);
        setCustomDomain(`${value}.${domain.rootDomain}`);
    };

    const handleCheckDns = async () => {
        setIsChecking(true);
        const status = await checkDns();
        setDnsStatus(status);
        setIsChecking(false);
    };

    return (
        React.createElement("div", { className: "grid gap-6 lg:grid-cols-[2fr_1fr]" },
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "Domeneinnstillinger"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Konfigurer subdomene eller legg til eget domene")),
                React.createElement(CardContent, { className: "space-y-4" },
                    React.createElement(DomainField, {
                        label: "Subdomene",
                        value: subdomain,
                        onChange: setSubdomain,
                        help: `Publiseres som ${subdomain ? `${subdomain}.${domain.rootDomain}` : "{sub}.setaei.com"}`,
                    }),
                    React.createElement(DomainField, {
                        label: "Eget domene",
                        value: customDomain,
                        onChange: setCustomDomain,
                        help: "F.eks. fjolsenbanden.no",
                    }),
                    React.createElement("div", { className: "flex flex-wrap gap-2" },
                        React.createElement(Button, {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: handleGenerate,
                        },
                            React.createElement(Wand2, { size: 16, className: "mr-2" }),
                            "Generer forslag"),
                        React.createElement(Button, {
                            type: "button",
                            className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                            onClick: handleSave,
                        },
                            React.createElement(CheckCircle2, { size: 16, className: "mr-2" }),
                            "Lagre")))),
            React.createElement(SidebarCard, {
                dnsStatus: dnsStatus,
                lastCheckedAt: domain.lastCheckedAt,
                onCheck: handleCheckDns,
                isChecking: isChecking,
            }))
    );
}

function DomainField({ label, value, onChange, help }) {
    return (
        React.createElement("div", { className: "space-y-2" },
            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, label),
            React.createElement(Input, {
                value: value,
                onChange: (event) => onChange(event.target.value),
                className: "border-slate-800 bg-slate-900 text-slate-100",
            }),
            help && React.createElement("p", { className: "text-xs text-slate-500" }, help))
    );
}

function SidebarCard({ dnsStatus, lastCheckedAt, onCheck, isChecking }) {
    const statusMap = {
        connected: { label: "Tilkoblet", tone: "text-emerald-400" },
        pending: { label: "Venter", tone: "text-amber-400" },
        error: { label: "Feil", tone: "text-rose-400" },
        unknown: { label: "Ukjent", tone: "text-slate-400" },
    };
    const status = statusMap[dnsStatus] ?? statusMap.unknown;
    return (
        React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
            React.createElement(CardHeader, null,
                React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "DNS-status"),
                React.createElement("p", { className: "text-sm text-slate-400" }, "Sjekk at CNAME peker mot plattformen")),
            React.createElement(CardContent, { className: "space-y-4" },
                React.createElement("p", { className: `text-sm font-semibold ${status.tone}` }, status.label),
                React.createElement("p", { className: "text-xs text-slate-400" }, lastCheckedAt
                    ? `Sist sjekket ${new Date(lastCheckedAt).toLocaleString("nb-NO")}`
                    : "Aldri sjekket"),
                React.createElement("div", { className: "rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs text-slate-300" },
                    React.createElement("p", { className: "font-semibold text-slate-200" }, "CNAME-instruks"),
                    React.createElement("p", null, "Sett CNAME for ditt domene til pages.setaei.com")),
                React.createElement(Button, {
                    type: "button",
                    className: "w-full bg-slate-800 text-slate-200 hover:bg-slate-700",
                    onClick: onCheck,
                    disabled: isChecking,
                },
                    isChecking ? React.createElement(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : React.createElement(RefreshCw, { size: 16, className: "mr-2" }),
                    isChecking ? "Sjekker DNS..." : "Sjekk DNS")))
    );
}
