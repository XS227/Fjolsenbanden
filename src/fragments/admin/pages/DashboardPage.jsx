import React from "react";
import { Activity, ArrowUpRight, BarChart2, CheckCircle2, Eye, Play, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

export default function DashboardPage() {
    const { activeSite, activeSiteState, requestPreview, publishDraft, submitForApproval } = useSiteConfig();
    const stats = activeSiteState?.stats;
    const workflow = activeSiteState?.workflow;

    if (!activeSite || !activeSiteState) {
        return React.createElement("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-300" }, "Velg en side for å vise dashboard");
    }

    const isPendingApproval = workflow?.status === "pending";

    return (
        React.createElement("div", { className: "space-y-6" },
            React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4" },
                React.createElement(SummaryCard, {
                    icon: Eye,
                    label: "Sidevisninger",
                    value: stats?.summary.views ?? 0,
                    trend: "+12%",
                    tone: "emerald",
                }),
                React.createElement(SummaryCard, {
                    icon: Users,
                    label: "Unike besøk",
                    value: stats?.summary.uniques ?? 0,
                    trend: "+8%",
                    tone: "sky",
                }),
                React.createElement(SummaryCard, {
                    icon: Activity,
                    label: "Snitt tid",
                    value: stats?.summary.avgTimeOnPage ?? "-",
                    trend: "+5%",
                    tone: "amber",
                }),
                React.createElement(SummaryCard, {
                    icon: BarChart2,
                    label: "CTA-klikk",
                    value: stats?.summary.ctaClicks ?? 0,
                    trend: "+17%",
                    tone: "pink",
                })),
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, { className: "flex flex-col gap-2 border-b border-slate-800/60 pb-4 sm:flex-row sm:items-center sm:justify-between" },
                    React.createElement("div", null,
                        React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "Workflow-status"),
                        React.createElement("p", { className: "text-sm text-slate-400" }, "Kontroller hvor i prosessen kladden er")),
                    React.createElement("div", { className: "flex flex-wrap gap-2" },
                        React.createElement(Button, {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: () => requestPreview(),
                        },
                            React.createElement(Play, { size: 16, className: "mr-2" }),
                            "Forhåndsvis"),
                        isPendingApproval
                            ? React.createElement(Button, {
                                type: "button",
                                className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                                onClick: () => publishDraft("Godkjent av moderator"),
                            },
                                React.createElement(CheckCircle2, { size: 16, className: "mr-2" }),
                                "Godkjenn & publiser")
                            : React.createElement(Button, {
                                type: "button",
                                className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                                onClick: () => submitForApproval("Kladd klar for godkjenning"),
                            },
                                React.createElement(ArrowUpRight, { size: 16, className: "mr-2" }),
                                "Send til godkjenning"))),
                React.createElement(CardContent, { className: "grid gap-4 py-6 sm:grid-cols-2" },
                    React.createElement(StatusBadge, {
                        label: "Workflow-status",
                        value: workflow?.status ?? "-",
                        description: "Nåværende steg for kladden",
                    }),
                    React.createElement(StatusBadge, {
                        label: "Sist publisert",
                        value: workflow?.lastPublishAt ? new Date(workflow.lastPublishAt).toLocaleString("nb-NO") : "Aldri",
                        description: "Tidspunkt for siste publisering",
                    }),
                    React.createElement(StatusBadge, {
                        label: "Sist forhåndsvist",
                        value: workflow?.lastPreviewAt ? new Date(workflow.lastPreviewAt).toLocaleString("nb-NO") : "Aldri",
                        description: "Når kladden sist ble forhåndsvist",
                    }),
                    React.createElement(StatusBadge, {
                        label: "Sist redigert av",
                        value: workflow?.lastEditor ?? "-",
                        description: workflow?.lastEditedAt
                            ? `Endret ${new Date(workflow.lastEditedAt).toLocaleString("nb-NO")}`
                            : "Ingen endringer ennå",
                    }))),
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "Live-ytelse"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Se hvor mange som ser live-seksjonene de siste 30 dagene")),
                React.createElement(CardContent, { className: "grid gap-4 sm:grid-cols-2" },
                    React.createElement(TrendCard, {
                        title: "Twitch",
                        value: stats?.live.twitchViews ?? 0,
                        description: "Visninger på embed",
                    }),
                    React.createElement(TrendCard, {
                        title: "YouTube",
                        value: stats?.live.youtubeViews ?? 0,
                        description: "Visninger på embed",
                    })))
        )
    );
}

function SummaryCard({ icon: Icon, label, value, trend, tone }) {
    const toneMap = {
        emerald: "bg-emerald-500/10 text-emerald-400",
        sky: "bg-sky-500/10 text-sky-400",
        amber: "bg-amber-500/10 text-amber-400",
        pink: "bg-pink-500/10 text-pink-400",
    };
    return (
        React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
            React.createElement(CardContent, { className: "flex items-center justify-between gap-4 py-6" },
                React.createElement("div", { className: "space-y-1" },
                    React.createElement("p", { className: "text-xs uppercase text-slate-400" }, label),
                    React.createElement("p", { className: "text-2xl font-semibold text-slate-100" }, typeof value === "number" ? value.toLocaleString("nb-NO") : value),
                    React.createElement("p", { className: "text-xs text-emerald-400" }, trend)),
                React.createElement("span", { className: `rounded-xl px-3 py-2 text-sm font-semibold ${toneMap[tone] ?? "bg-slate-800 text-slate-200"}` },
                    React.createElement(Icon, { size: 18, className: "mr-1 inline" }))))
    );
}

function StatusBadge({ label, value, description }) {
    return (
        React.createElement("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/50 p-4" },
            React.createElement("p", { className: "text-xs uppercase text-slate-500" }, label),
            React.createElement("p", { className: "mt-1 text-lg font-semibold text-slate-100" }, value),
            React.createElement("p", { className: "text-xs text-slate-400" }, description))
    );
}

function TrendCard({ title, value, description }) {
    const displayValue = typeof value === "number" ? value.toLocaleString("nb-NO") : value;
    return (
        React.createElement("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/50 p-5" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("h3", { className: "text-sm font-semibold text-slate-200" }, title),
                React.createElement("span", { className: "text-xs text-emerald-400" }, "+9%")),
            React.createElement("p", { className: "mt-2 text-3xl font-bold text-slate-100" }, displayValue),
            React.createElement("p", { className: "text-xs text-slate-400" }, description))
    );
}
