import React from "react";
import { BarChart, Globe2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

export default function SeoAnalyticsPage() {
    const { activeSiteState, updateDraftConfig } = useSiteConfig();
    const seo = activeSiteState?.draft.seo;
    const analytics = activeSiteState?.draft.analytics;

    if (!seo || !analytics) {
        return null;
    }

    const updateSeoField = (key, value) => {
        updateDraftConfig((draft) => {
            draft.seo[key] = value;
            return draft;
        });
    };

    const updateAnalyticsField = (key, value) => {
        updateDraftConfig((draft) => {
            draft.analytics[key] = value;
            return draft;
        });
    };

    return (
        React.createElement("div", { className: "grid gap-6 lg:grid-cols-2" },
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-lg text-slate-100" },
                        React.createElement(Globe2, { size: 18, className: "text-emerald-400" }),
                        "SEO"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Oppdater metadata for søkemotorer")),
                React.createElement(CardContent, { className: "space-y-4" },
                    React.createElement(Field, {
                        label: "Tittel",
                        value: seo.title,
                        onChange: (value) => updateSeoField("title", value),
                    }),
                    React.createElement(Field, {
                        label: "Beskrivelse",
                        value: seo.description,
                        onChange: (value) => updateSeoField("description", value),
                        renderInput: (props) => React.createElement(Textarea, { ...props, rows: 4 }),
                    }),
                    React.createElement(Field, {
                        label: "OpenGraph-bilde",
                        value: seo.image,
                        onChange: (value) => updateSeoField("image", value),
                    }))),
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-lg text-slate-100" },
                        React.createElement(BarChart, { size: 18, className: "text-emerald-400" }),
                        "Analyse"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Spesifiser hvilke analyseverktøy som er i bruk")),
                React.createElement(CardContent, { className: "space-y-4" },
                    React.createElement(Field, {
                        label: "Google Analytics ID",
                        value: analytics.gaId,
                        onChange: (value) => updateAnalyticsField("gaId", value),
                    }),
                    React.createElement(Field, {
                        label: "Facebook Pixel ID",
                        value: analytics.pixelId ?? "",
                        onChange: (value) => updateAnalyticsField("pixelId", value),
                    }),
                    React.createElement(Field, {
                        label: "Matomo Site ID",
                        value: analytics.matomoSiteId ?? "",
                        onChange: (value) => updateAnalyticsField("matomoSiteId", value),
                    })),
                React.createElement(CardContent, { className: "border-t border-slate-800/60 pt-4" },
                    React.createElement("p", { className: "mb-2 text-xs uppercase text-slate-500" }, "Personvern"),
                    React.createElement("p", { className: "text-sm text-slate-300" }, "Husk å informere spillerne om hvilke sporingsverktøy som brukes."))))
    );
}

function Field({ label, value, onChange, renderInput }) {
    const inputProps = {
        value,
        onChange: (event) => onChange(event.target.value),
        className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100",
    };
    return (
        React.createElement("div", { className: "space-y-1" },
            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, label),
            renderInput ? renderInput(inputProps) : React.createElement(Input, { ...inputProps }))
    );
}
