import React from "react";
import { Clock, FileDown, History, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

export default function LogsPage() {
    const { activeSiteState, restoreVersion } = useSiteConfig();
    const changeLog = activeSiteState?.changeLog ?? [];
    const versions = activeSiteState?.versions ?? [];
    const uploads = activeSiteState?.uploads ?? [];

    return (
        React.createElement(
            "div",
            { className: "grid gap-6 lg:grid-cols-[3fr_2fr]" },
            React.createElement(
                Card,
                { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(
                    CardHeader,
                    null,
                    React.createElement(
                        CardTitle,
                        { className: "flex items-center gap-2 text-lg text-slate-100" },
                        React.createElement(History, { size: 18, className: "text-emerald-400" }),
                        "Endringslogg",
                    ),
                    React.createElement(
                        "p",
                        { className: "text-sm text-slate-400" },
                        "Siste handlinger på denne siden",
                    ),
                ),
                React.createElement(
                    CardContent,
                    { className: "space-y-3" },
                    changeLog.slice(0, 10).map((entry) =>
                        React.createElement(
                            "div",
                            {
                                key: entry.id,
                                className:
                                    "flex items-start justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4",
                            },
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "p",
                                    { className: "text-sm font-semibold text-slate-100" },
                                    entry.summary,
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-xs text-slate-400" },
                                    `${entry.by} • ${new Date(entry.at).toLocaleString("nb-NO")}`,
                                ),
                            ),
                            React.createElement(
                                "span",
                                {
                                    className: `text-xs font-semibold uppercase ${statusTone(entry.status)}`,
                                },
                                entry.status,
                            ),
                        ),
                    ),
                ),
            ),
            React.createElement(
                "div",
                { className: "space-y-6" },
                React.createElement(
                    Card,
                    { className: "border-slate-800 bg-slate-900/70" },
                    React.createElement(
                        CardHeader,
                        null,
                        React.createElement(
                            CardTitle,
                            { className: "flex items-center gap-2 text-lg text-slate-100" },
                            React.createElement(RotateCw, { size: 18, className: "text-emerald-400" }),
                            "Versjoner",
                        ),
                        React.createElement(
                            "p",
                            { className: "text-sm text-slate-400" },
                            "Tilbakestill til en tidligere publisering",
                        ),
                    ),
                    React.createElement(
                        CardContent,
                        { className: "space-y-3" },
                        versions.map((version) =>
                            React.createElement(
                                "div",
                                {
                                    key: version.id,
                                    className:
                                        "flex items-start justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4",
                                },
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "p",
                                        { className: "text-sm font-semibold text-slate-100" },
                                        version.label,
                                    ),
                                    React.createElement(
                                        "p",
                                        { className: "text-xs text-slate-400" },
                                        `${version.author} • ${new Date(version.createdAt).toLocaleString("nb-NO")}`,
                                    ),
                                    version.note &&
                                        React.createElement(
                                            "p",
                                            { className: "text-xs text-slate-500" },
                                            version.note,
                                        ),
                                ),
                                React.createElement(
                                    Button,
                                    {
                                        type: "button",
                                        className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                                        onClick: () => restoreVersion(version.id),
                                    },
                                    React.createElement(Clock, { size: 16, className: "mr-2" }),
                                    "Tilbakestill",
                                ),
                            ),
                        ),
                    ),
                ),
                React.createElement(
                    Card,
                    { className: "border-slate-800 bg-slate-900/70" },
                    React.createElement(
                        CardHeader,
                        null,
                        React.createElement(
                            CardTitle,
                            { className: "flex items-center gap-2 text-lg text-slate-100" },
                            React.createElement(FileDown, { size: 18, className: "text-emerald-400" }),
                            "Opplastinger",
                        ),
                        React.createElement(
                            "p",
                            { className: "text-sm text-slate-400" },
                            "Sist opplastede filer",
                        ),
                    ),
                    React.createElement(
                        CardContent,
                        { className: "space-y-2" },
                        uploads.slice(0, 6).map((upload) =>
                            React.createElement(
                                "div",
                                {
                                    key: upload.id,
                                    className: "rounded-xl border border-slate-800 bg-slate-900/60 p-3",
                                },
                                React.createElement(
                                    "p",
                                    { className: "text-sm font-semibold text-slate-100" },
                                    upload.name,
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-xs text-slate-400" },
                                    `${((upload.size ?? 0) / 1024).toFixed(1)} kB • ${upload.type}`,
                                ),
                                React.createElement(
                                    "p",
                                    { className: "text-xs text-slate-500" },
                                    new Date(upload.uploadedAt).toLocaleString("nb-NO"),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        )
    );
}

function statusTone(status) {
    switch (status) {
        case "published":
            return "text-emerald-400";
        case "pending":
            return "text-amber-400";
        case "draft":
            return "text-slate-400";
        default:
            return "text-slate-400";
    }
}
