import React, { useState } from "react";
import { AlertTriangle, Eye, Rocket, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

export default function PublishingPage() {
    const {
        activeSiteState,
        requestPreview,
        submitForApproval,
        publishDraft,
        discardDraftChanges,
        toggleApprovalRequirement,
    } = useSiteConfig();
    const workflow = activeSiteState?.workflow;
    const draft = activeSiteState?.draft;
    const [note, setNote] = useState("Publiserer oppdatert innhold");

    if (!workflow || !draft) {
        return null;
    }

    const isPendingApproval = workflow.status === "pending";
    const requiresApproval = workflow.requireApproval;

    return (
        React.createElement("div", { className: "grid gap-6 lg:grid-cols-[2fr_1fr]" },
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "Publiser kladd"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Forhåndsvis, send til godkjenning eller publiser endringene")),
                React.createElement(CardContent, { className: "space-y-4" },
                    React.createElement(Field, {
                        label: "Oppsummering",
                        description: "Legg ved en kort kommentar til loggen",
                        renderInput: (props) => React.createElement(Textarea, { ...props, rows: 3 }),
                        value: note,
                        onChange: setNote,
                    }),
                    React.createElement("div", { className: "flex flex-wrap gap-2" },
                        React.createElement(Button, {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: () => requestPreview(),
                        },
                            React.createElement(Eye, { size: 16, className: "mr-2" }),
                            "Forhåndsvis"),
                        requiresApproval && !isPendingApproval && (
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-amber-500 text-amber-950 hover:bg-amber-400",
                                onClick: () => submitForApproval(note),
                            },
                                React.createElement(AlertTriangle, { size: 16, className: "mr-2" }),
                                "Send til godkjenning")),
                        (!requiresApproval || isPendingApproval) && (
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                                onClick: () => publishDraft(note),
                            },
                                React.createElement(Rocket, { size: 16, className: "mr-2" }),
                                isPendingApproval ? "Godkjenn og publiser" : "Publiser nå")),
                        React.createElement(Button, {
                            type: "button",
                            className: "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
                            onClick: () => discardDraftChanges(),
                        },
                            React.createElement(Undo2, { size: 16, className: "mr-2" }),
                            "Forkast endringer"))),
            React.createElement(StatusCard, { workflow: workflow, draft: draft, onToggleApproval: toggleApprovalRequirement }))
    );
}

function StatusCard({ workflow, draft, onToggleApproval }) {
    const requiresApproval = workflow.requireApproval;
    return (
        React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
            React.createElement(CardHeader, null,
                React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "Status"),
                React.createElement("p", { className: "text-sm text-slate-400" }, "Hold oversikt over arbeidsflyten")),
            React.createElement(CardContent, { className: "space-y-4 text-sm text-slate-300" },
                React.createElement(StatusRow, { label: "Nåværende status", value: workflow.status }),
                React.createElement(StatusRow, {
                    label: "Sist publisert",
                    value: workflow.lastPublishAt ? new Date(workflow.lastPublishAt).toLocaleString("nb-NO") : "Aldri",
                }),
                React.createElement(StatusRow, {
                    label: "Sist redigert",
                    value: workflow.lastEditedAt ? new Date(workflow.lastEditedAt).toLocaleString("nb-NO") : "Aldri",
                }),
                React.createElement(StatusRow, { label: "Sist redigert av", value: workflow.lastEditor ?? "-" }),
                React.createElement("div", { className: "rounded-xl border border-slate-800 bg-slate-900/60 p-4" },
                    React.createElement("p", { className: "text-xs uppercase text-slate-500" }, "Godkjenning"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-200" }, requiresApproval
                        ? "Endringer må godkjennes av moderator"
                        : "Owner kan publisere direkte"),
                    React.createElement(Button, {
                        type: "button",
                        className: requiresApproval
                            ? "mt-3 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                            : "mt-3 bg-slate-800 text-slate-200 hover:bg-slate-700",
                        onClick: () => onToggleApproval(!requiresApproval),
                    }, requiresApproval ? "Skru av godkjenning" : "Krev godkjenning")),
                React.createElement("div", { className: "rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4" },
                    React.createElement("p", { className: "text-xs uppercase text-emerald-300" }, "Publiserte verdier"),
                    React.createElement("p", { className: "mt-1 text-sm text-emerald-100" }, `Tema: ${draft.theme}`),
                    React.createElement("p", { className: "text-xs text-emerald-200" }, `Oppdatert: ${draft.updatedAt ? new Date(draft.updatedAt).toLocaleString("nb-NO") : "-"}`))))
    );
}

function Field({ label, description, value, onChange, renderInput }) {
    const inputProps = {
        value,
        onChange: (event) => onChange(event.target.value),
        className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100",
    };
    return (
        React.createElement("div", { className: "space-y-2" },
            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, label),
            description && React.createElement("p", { className: "text-xs text-slate-500" }, description),
            renderInput ? renderInput(inputProps) : React.createElement(Input, { ...inputProps }))
    );
}

function StatusRow({ label, value }) {
    return (
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("span", { className: "text-xs uppercase text-slate-500" }, label),
            React.createElement("span", { className: "text-sm font-semibold text-slate-100" }, value))
    );
}
