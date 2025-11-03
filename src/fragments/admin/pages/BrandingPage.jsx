import React from "react";
import { Loader2, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";

const THEMES = [
    { id: "classic", label: "Classic", description: "Blå primærfarge, rosa aksent" },
    { id: "fortnite", label: "Fortnite", description: "Neon og høy energi" },
    { id: "minecraft", label: "Minecraft", description: "Pixelert og grønt" },
];

export default function BrandingPage() {
    const { activeSiteState, updateDraftConfig, simulateUpload, uploadState, activeSite, updateSiteMeta } = useSiteConfig();
    const branding = activeSiteState?.draft.branding;

    if (!branding) {
        return null;
    }

    const handleColorChange = (key, value) => {
        updateDraftConfig((draft) => {
            draft.branding.colors[key] = value;
            return draft;
        });
    };

    const handleFontChange = (key, value) => {
        updateDraftConfig((draft) => {
            draft.branding.fonts[key] = value;
            return draft;
        });
    };

    const handleThemeSelect = (themeId) => {
        updateDraftConfig((draft) => {
            draft.theme = themeId;
            return draft;
        });
        updateSiteMeta((meta) => ({ ...meta, theme: themeId }));
    };

    const handleFileUpload = async (event, key) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }
        try {
            const path = await simulateUpload(file);
            updateDraftConfig((draft) => {
                if (key === "logo") {
                    draft.branding.logo = path;
                }
                if (key === "og") {
                    draft.seo.image = path;
                }
                return draft;
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        React.createElement("div", { className: "grid gap-6 lg:grid-cols-[2fr_1fr]" },
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-lg text-slate-100" },
                        React.createElement(Palette, { size: 18, className: "text-emerald-400" }),
                        "Branding"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Last opp logo, sett farger og skrifttyper")),
                React.createElement(CardContent, { className: "space-y-6" },
                    React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                        React.createElement(BrandingField, {
                            label: "Primærfarge",
                            value: branding.colors.primary,
                            onChange: (value) => handleColorChange("primary", value),
                        }),
                        React.createElement(BrandingField, {
                            label: "Aksentfarge",
                            value: branding.colors.accent,
                            onChange: (value) => handleColorChange("accent", value),
                        })),
                    React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                        React.createElement(BrandingField, {
                            label: "Display-font",
                            value: branding.fonts.display,
                            onChange: (value) => handleFontChange("display", value),
                        }),
                        React.createElement(BrandingField, {
                            label: "Brødtekst-font",
                            value: branding.fonts.text,
                            onChange: (value) => handleFontChange("text", value),
                        })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "Logo"),
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement(Input, {
                                type: "file",
                                accept: "image/png,image/svg+xml,image/jpeg",
                                onChange: (event) => handleFileUpload(event, "logo"),
                                className: "border-slate-800 bg-slate-900 text-slate-200",
                            }),
                            uploadState.isUploading && React.createElement(Loader2, { className: "h-4 w-4 animate-spin text-emerald-400" })),
                        React.createElement("p", { className: "text-xs text-slate-500" }, "PNG, JPG eller SVG, maks 2MB"),
                        branding.logo && React.createElement("p", { className: "text-xs text-emerald-400" }, `Gjeldende logo: ${branding.logo}`)),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "OpenGraph-bilde"),
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement(Input, {
                                type: "file",
                                accept: "image/png,image/jpeg",
                                onChange: (event) => handleFileUpload(event, "og"),
                                className: "border-slate-800 bg-slate-900 text-slate-200",
                            }),
                            uploadState.isUploading && React.createElement(Loader2, { className: "h-4 w-4 animate-spin text-emerald-400" })),
                        React.createElement("p", { className: "text-xs text-slate-500" }, "Anbefalt størrelse 1200x675"),
                        activeSiteState?.draft.seo.image && React.createElement("p", { className: "text-xs text-emerald-400" }, `Lagrer som ${activeSiteState.draft.seo.image}`))),
            React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
                React.createElement(CardHeader, null,
                    React.createElement(CardTitle, { className: "flex items-center gap-2 text-lg text-slate-100" },
                        React.createElement(Sparkles, { size: 18, className: "text-emerald-400" }),
                        "Tema"),
                    React.createElement("p", { className: "text-sm text-slate-400" }, "Velg tema for landingssiden")),
                React.createElement(CardContent, { className: "space-y-3" }, THEMES.map((theme) => (
                    React.createElement(Button, {
                        key: theme.id,
                        type: "button",
                        onClick: () => handleThemeSelect(theme.id),
                        className: `w-full justify-start border ${activeSite?.theme === theme.id
                            ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                            : "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800"}`,
                    },
                        React.createElement("div", { className: "flex flex-col" },
                            React.createElement("span", { className: "text-sm font-semibold" }, theme.label),
                            React.createElement("span", { className: "text-xs text-slate-400" }, theme.description)))))))
    );
}

function BrandingField({ label, value, onChange }) {
    return (
        React.createElement("div", { className: "space-y-2" },
            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, label),
            React.createElement(Input, {
                value: value,
                onChange: (event) => onChange(event.target.value),
                className: "border-slate-800 bg-slate-900 text-slate-100",
            }))
    );
}
