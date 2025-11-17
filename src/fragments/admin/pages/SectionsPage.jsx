import React, { useRef, useState } from "react";
import { ArrowDown, ArrowUp, EyeOff, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteConfig } from "@/fragments/admin/context/SiteConfigContext";
import { generateId } from "@/fragments/admin/data/defaultSiteState";

const SECTION_TABS = [
    { id: "home", label: "Hjem" },
    { id: "live", label: "Live" },
    { id: "about", label: "Om" },
    { id: "membership", label: "Medlemskap" },
    { id: "offerings", label: "Andre tilbud" },
    { id: "rewards", label: "Premier" },
    { id: "partners", label: "Partnere" },
    { id: "contact", label: "Kontakt" },
    { id: "feedback", label: "Feedback" },
];

const LIVE_PLATFORMS = [
    { value: "twitch", label: "Twitch" },
    { value: "youtube", label: "YouTube" },
];

export default function SectionsPage() {
    const { activeSiteState, updateDraftConfig, setSectionVisibility, simulateUpload, uploadState } = useSiteConfig();
    const [activeTab, setActiveTab] = useState("home");
    const moderation = activeSiteState?.moderation.sections ?? {};

    if (!activeSiteState) {
        return null;
    }

    const draft = activeSiteState.draft;

    const toggleVisibility = (sectionKey) => {
        const isHidden = moderation[sectionKey]?.hidden;
        setSectionVisibility(sectionKey, isHidden);
    };

    const renderTabContent = (tabId) => {
        switch (tabId) {
            case "home":
                return React.createElement(HomeSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "live":
                return React.createElement(LiveSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "about":
                return React.createElement(AboutSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "membership":
                return React.createElement(MembershipSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "offerings":
                return React.createElement(OfferingsSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "rewards":
                return React.createElement(RewardsSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "partners":
                return React.createElement(PartnersSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig, simulateUpload: simulateUpload, uploadState: uploadState });
            case "contact":
                return React.createElement(ContactSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            case "feedback":
                return React.createElement(FeedbackSectionForm, { draft: draft, updateDraftConfig: updateDraftConfig });
            default:
                return null;
        }
    };

    return (
        React.createElement(Card, { className: "border-slate-800 bg-slate-900/70" },
            React.createElement(CardHeader, null,
                React.createElement(CardTitle, { className: "text-lg text-slate-100" }, "Seksjoner"),
                React.createElement("p", { className: "text-sm text-slate-400" }, "Oppdater innholdet for hver seksjon")),
            React.createElement(CardContent, { className: "space-y-6" },
                React.createElement("div", { className: "flex flex-wrap gap-2" }, SECTION_TABS.map((tab) => (
                    React.createElement(Button, {
                        key: tab.id,
                        type: "button",
                        onClick: () => setActiveTab(tab.id),
                        className: `rounded-full border px-4 py-2 text-sm ${activeTab === tab.id
                            ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
                            : "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"}`,
                    }, tab.label)
                ))),
                React.createElement("div", { className: "flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3" },
                React.createElement("div", null,
                    React.createElement("p", { className: "text-sm font-semibold text-slate-100" }, "Moderering"),
                    React.createElement("p", { className: "text-xs text-slate-400" }, "Moderatorer kan aktivere eller deaktivere seksjoner uten å slette dem")),
                React.createElement(Button, {
                    type: "button",
                    className: moderation[activeTab]?.hidden
                        ? "bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                        : "bg-slate-800 text-slate-200 hover:bg-slate-700",
                    onClick: () => toggleVisibility(activeTab),
                },
                    React.createElement(EyeOff, { size: 16, className: "mr-2" }),
                    moderation[activeTab]?.hidden ? "Aktiver seksjon" : "Deaktiver seksjon")),
                React.createElement("div", { className: "space-y-4" }, renderTabContent(activeTab)))
        )
    );
}

function HomeSectionForm({ draft, updateDraftConfig }) {
    const section = draft.sections.home;
    return (
        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement(Field, {
                label: "Tittel",
                value: section.title,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.home.title = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "Undertittel",
                value: section.subtitle,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.home.subtitle = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "CTA label",
                value: section.ctaLabel,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.home.ctaLabel = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "CTA URL",
                value: section.ctaUrl,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.home.ctaUrl = value;
                    return next;
                }),
            }))
    );
}

function LiveSectionForm({ draft, updateDraftConfig }) {
    const section = draft.sections.live;
    return (
        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement(Field, {
                label: "Plattform",
                value: section.platform,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.live.platform = value;
                    return next;
                }),
                renderInput: (props) => (
                    React.createElement("select", { ...props, className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100" },
                        LIVE_PLATFORMS.map((platform) =>
                            React.createElement("option", { key: platform.value, value: platform.value }, platform.label)))
                ),
            }),
            React.createElement(Field, {
                label: "Kanal",
                value: section.channel,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.live.channel = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "Embed URL",
                value: section.embedUrl,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.live.embedUrl = value;
                    return next;
                }),
                fullWidth: true,
            }),
            React.createElement("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300 sm:col-span-2" },
                "Forhåndsvisning:",
                React.createElement("div", { className: "mt-3 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950" },
                    React.createElement("iframe", { title: "Live preview", src: section.embedUrl, className: "h-full w-full", allow: "autoplay; encrypted-media" }))))
    );
}

function AboutSectionForm({ draft, updateDraftConfig }) {
    const section = draft.sections.about;
    return (React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
        React.createElement(Field, { label: "Seksjonstittel", value: section.title, onChange: (value) => updateDraftConfig((next) => {
                next.sections.about.title = value;
                return next;
            }), fullWidth: true }),
        React.createElement(Field, { label: "Video-embed URL", value: section.videoUrl, onChange: (value) => updateDraftConfig((next) => {
                next.sections.about.videoUrl = value;
                return next;
            }), fullWidth: true }),
        React.createElement(Field, { label: "Ingress", value: section.lead, onChange: (value) => updateDraftConfig((next) => {
                next.sections.about.lead = value;
                return next;
            }), fullWidth: true }),
        React.createElement(Field, { label: "Hovedtekst", value: section.body, onChange: (value) => updateDraftConfig((next) => {
                next.sections.about.body = value;
                return next;
            }), fullWidth: true, renderInput: (props) => (React.createElement("textarea", { ...props, rows: 4, className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100" })) }),
        React.createElement("div", { className: "rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300 sm:col-span-2" },
            "Forhåndsvisning:",
            React.createElement("div", { className: "mt-3 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" },
                React.createElement("div", { className: "overflow-hidden rounded-xl border border-slate-800 bg-slate-950" },
                    React.createElement("iframe", { title: "Om-seksjon video", src: section.videoUrl, className: "aspect-video w-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture", allowFullScreen: true })),
                React.createElement("div", { className: "space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4" },
                    React.createElement("p", { className: "text-xs uppercase tracking-[0.3em] text-slate-400" }, section.title),
                    React.createElement("h4", { className: "text-lg font-semibold text-white" }, section.lead),
                    React.createElement("p", { className: "text-sm leading-relaxed text-slate-200" }, section.body)))))));
}

function MembershipSectionForm({ draft, updateDraftConfig }) {
    const plans = draft.sections.membership.plans;

    const movePlan = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= plans.length) {
            return;
        }
        updateDraftConfig((next) => {
            const items = [...next.sections.membership.plans];
            const [removed] = items.splice(index, 1);
            items.splice(targetIndex, 0, removed);
            next.sections.membership.plans = items;
            return next;
        });
    };

    const updatePlan = (index, mutate) => {
        updateDraftConfig((next) => {
            const item = { ...next.sections.membership.plans[index] };
            mutate(item);
            item.buttons = Array.isArray(item.buttons) ? item.buttons.slice(0, 2) : [];
            next.sections.membership.plans[index] = item;
            return next;
        });
    };

    const addPlan = () => {
        updateDraftConfig((next) => {
            next.sections.membership.plans.push({
                id: generateId("plan"),
                name: "Ny plan",
                price: "0",
                features: ["Ny fordel"],
                buttons: [],
            });
            return next;
        });
    };

    const removePlan = (index) => {
        updateDraftConfig((next) => {
            next.sections.membership.plans.splice(index, 1);
            return next;
        });
    };

    const updateFeature = (index, featureIndex, value) => {
        updateDraftConfig((next) => {
            next.sections.membership.plans[index].features[featureIndex] = value;
            return next;
        });
    };

    const addFeature = (index) => {
        updateDraftConfig((next) => {
            next.sections.membership.plans[index].features.push("Ny fordel");
            return next;
        });
    };

    const removeFeature = (index, featureIndex) => {
        updateDraftConfig((next) => {
            next.sections.membership.plans[index].features.splice(featureIndex, 1);
            return next;
        });
    };

    const updateButton = (planIndex, buttonIndex, field, value) => {
        updateDraftConfig((next) => {
            const buttons = Array.isArray(next.sections.membership.plans[planIndex].buttons)
                ? [...next.sections.membership.plans[planIndex].buttons]
                : [];
            buttons[buttonIndex] = {
                ...buttons[buttonIndex],
                [field]: value,
            };
            next.sections.membership.plans[planIndex].buttons = buttons.slice(0, 2);
            return next;
        });
    };

    const addButton = (planIndex) => {
        updateDraftConfig((next) => {
            const buttons = Array.isArray(next.sections.membership.plans[planIndex].buttons)
                ? [...next.sections.membership.plans[planIndex].buttons]
                : [];
            if (buttons.length >= 2) {
                return next;
            }
            buttons.push({ label: "Ny knapp", url: "" });
            next.sections.membership.plans[planIndex].buttons = buttons;
            return next;
        });
    };

    const removeButton = (planIndex, buttonIndex) => {
        updateDraftConfig((next) => {
            const buttons = Array.isArray(next.sections.membership.plans[planIndex].buttons)
                ? [...next.sections.membership.plans[planIndex].buttons]
                : [];
            buttons.splice(buttonIndex, 1);
            next.sections.membership.plans[planIndex].buttons = buttons;
            return next;
        });
    };

    return (
        React.createElement("div", { className: "space-y-4" },
            plans.map((plan, index) => (
                React.createElement(Card, { key: plan.id, className: "border-slate-800 bg-slate-900/60" },
                    React.createElement(CardHeader, { className: "flex flex-col gap-2 border-b border-slate-800/60 pb-3 sm:flex-row sm:items-center sm:justify-between" },
                        React.createElement(CardTitle, { className: "text-base text-slate-100" }, plan.name),
                        React.createElement("div", { className: "flex gap-2" },
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                                onClick: () => movePlan(index, -1),
                                disabled: index === 0,
                            }, React.createElement(ArrowUp, { size: 16 })),
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                                onClick: () => movePlan(index, 1),
                                disabled: index === plans.length - 1,
                            }, React.createElement(ArrowDown, { size: 16 })),
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
                                onClick: () => removePlan(index),
                            },
                                React.createElement(Trash2, { size: 16, className: "mr-1" }),
                                "Fjern"))),
                    React.createElement(CardContent, { className: "space-y-4" },
                        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                            React.createElement(Field, {
                                label: "Navn",
                                value: plan.name,
                                onChange: (value) => updatePlan(index, (item) => (item.name = value)),
                            }),
                            React.createElement(Field, {
                                label: "Pris",
                                value: plan.price,
                                onChange: (value) => updatePlan(index, (item) => (item.price = value)),
                            })),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "Fordeler"),
                            plan.features.map((feature, featureIndex) => (
                                React.createElement("div", { key: featureIndex, className: "flex gap-2" },
                                    React.createElement(Input, {
                                        value: feature,
                                        onChange: (event) => updateFeature(index, featureIndex, event.target.value),
                                        className: "flex-1 border-slate-800 bg-slate-900 text-slate-100",
                                    }),
                                    React.createElement(Button, {
                                        type: "button",
                                        className: "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
                                        onClick: () => removeFeature(index, featureIndex),
                                    },
                                        React.createElement(Trash2, { size: 14 }))))),
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                                onClick: () => addFeature(index),
                            },
                                React.createElement(Plus, { size: 16, className: "mr-2" }),
                                "Ny fordel")),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "Knapper (maks 2)"),
                            (plan.buttons || []).map((button, buttonIndex) => (
                                React.createElement("div", { key: `${plan.id}-button-${buttonIndex}`, className: "grid gap-2 rounded-xl border border-slate-800/80 bg-slate-900/70 p-3 sm:grid-cols-[1fr,1fr,auto]" },
                                    React.createElement(Input, {
                                        placeholder: "Label",
                                        value: button.label,
                                        onChange: (event) => updateButton(index, buttonIndex, "label", event.target.value),
                                        className: "border-slate-800 bg-slate-900 text-slate-100",
                                    }),
                                    React.createElement(Input, {
                                        placeholder: "Lenke",
                                        value: button.url,
                                        onChange: (event) => updateButton(index, buttonIndex, "url", event.target.value),
                                        className: "border-slate-800 bg-slate-900 text-slate-100",
                                    }),
                                    React.createElement(Button, {
                                        type: "button",
                                        className: "justify-center bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
                                        onClick: () => removeButton(index, buttonIndex),
                                    },
                                        React.createElement(Trash2, { size: 14 })))),
                            React.createElement(Button, {
                                type: "button",
                                className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                                onClick: () => addButton(index),
                                disabled: (plan.buttons || []).length >= 2,
                            },
                                React.createElement(Plus, { size: 16, className: "mr-2" }),
                                "Ny knapp"))))
            )),
            React.createElement(Button, {
                type: "button",
                className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                onClick: addPlan,
            },
                React.createElement(Plus, { size: 16, className: "mr-2" }),
                "Legg til plan"))
    );
}

function OfferingsSectionForm({ draft, updateDraftConfig }) {
    const section = draft.sections.offerings;
    const items = section.items ?? [];
    const addItem = () => {
        if (items.length >= 9) {
            return;
        }
        updateDraftConfig((next) => {
            next.sections.offerings.items.push({
                id: generateId("offer"),
                title: "Nytt tilbud",
                description: "Oppdater teksten for dette tilbudet.",
            });
            return next;
        });
    };
    const removeItem = (index) => {
        updateDraftConfig((next) => {
            next.sections.offerings.items.splice(index, 1);
            return next;
        });
    };
    const moveItem = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= items.length) {
            return;
        }
        updateDraftConfig((next) => {
            const list = [...next.sections.offerings.items];
            const [removed] = list.splice(index, 1);
            list.splice(targetIndex, 0, removed);
            next.sections.offerings.items = list;
            return next;
        });
    };
    const updateItem = (index, mutate) => {
        updateDraftConfig((next) => {
            const entry = { ...next.sections.offerings.items[index] };
            mutate(entry);
            next.sections.offerings.items[index] = entry;
            return next;
        });
    };
    const cards = items.map((item, index) => (React.createElement(Card, { key: item.id, className: "border-slate-800 bg-slate-900/60" },
        React.createElement(CardHeader, { className: "flex flex-col gap-2 border-b border-slate-800/60 pb-3 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement(CardTitle, { className: "text-base text-slate-100" }, item.title || "Tilbud"),
            React.createElement("div", { className: "flex gap-2" },
                React.createElement(Button, { type: "button", className: "bg-slate-800 text-slate-200 hover:bg-slate-700", onClick: () => moveItem(index, -1), disabled: index === 0 },
                    React.createElement(ArrowUp, { size: 16 })),
                React.createElement(Button, { type: "button", className: "bg-slate-800 text-slate-200 hover:bg-slate-700", onClick: () => moveItem(index, 1), disabled: index === items.length - 1 },
                    React.createElement(ArrowDown, { size: 16 })),
                React.createElement(Button, { type: "button", className: "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20", onClick: () => removeItem(index) },
                    React.createElement(Trash2, { size: 16, className: "mr-1" }),
                    "Fjern"))),
        React.createElement(CardContent, { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement(Field, { label: "Tittel", value: item.title, onChange: (value) => updateItem(index, (entry) => (entry.title = value)) }),
            React.createElement(Field, { label: "Beskrivelse", value: item.description, onChange: (value) => updateItem(index, (entry) => (entry.description = value)), fullWidth: true, renderInput: (props) => (React.createElement("textarea", { ...props, rows: 3, className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100" }))) })))));
    return (React.createElement("div", { className: "space-y-4" },
        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement(Field, { label: "Tittel", value: section.title, onChange: (value) => updateDraftConfig((next) => {
                    next.sections.offerings.title = value;
                    return next;
                }) }),
            React.createElement(Field, { label: "Ingress", value: section.description, onChange: (value) => updateDraftConfig((next) => {
                    next.sections.offerings.description = value;
                    return next;
                }), fullWidth: true, renderInput: (props) => (React.createElement("textarea", { ...props, rows: 2, className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100" }))) }),
        cards,
        React.createElement(Button, { type: "button", className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400", onClick: addItem, disabled: items.length >= 9 },
            React.createElement(Plus, { size: 16, className: "mr-2" }),
            items.length >= 9 ? "Maks 9 bokser" : "Legg til tekstboks")));
}

function RewardsSectionForm({ draft, updateDraftConfig }) {
    const items = draft.sections.rewards.items;

    const moveItem = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= items.length) {
            return;
        }
        updateDraftConfig((next) => {
            const list = [...next.sections.rewards.items];
            const [removed] = list.splice(index, 1);
            list.splice(targetIndex, 0, removed);
            next.sections.rewards.items = list;
            return next;
        });
    };

    const updateItem = (index, mutate) => {
        updateDraftConfig((next) => {
            const entry = { ...next.sections.rewards.items[index] };
            mutate(entry);
            next.sections.rewards.items[index] = entry;
            return next;
        });
    };

    const addItem = () => {
        updateDraftConfig((next) => {
            next.sections.rewards.items.push({
                id: generateId("reward"),
                title: "Ny premie",
                image: "",
                link: "",
                alt: "",
            });
            return next;
        });
    };

    const removeItem = (index) => {
        updateDraftConfig((next) => {
            next.sections.rewards.items.splice(index, 1);
            return next;
        });
    };

    const rewardCards = items.map((item, index) =>
        React.createElement(
            Card,
            { key: item.id, className: "border-slate-800 bg-slate-900/60" },
            React.createElement(
                CardHeader,
                {
                    className: "flex flex-col gap-2 border-b border-slate-800/60 pb-3 sm:flex-row sm:items-center sm:justify-between",
                },
                React.createElement(CardTitle, { className: "text-base text-slate-100" }, item.title || "Premie"),
                React.createElement(
                    "div",
                    { className: "flex gap-2" },
                    React.createElement(
                        Button,
                        {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: () => moveItem(index, -1),
                            disabled: index === 0,
                        },
                        React.createElement(ArrowUp, { size: 16 })
                    ),
                    React.createElement(
                        Button,
                        {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: () => moveItem(index, 1),
                            disabled: index === items.length - 1,
                        },
                        React.createElement(ArrowDown, { size: 16 })
                    ),
                    React.createElement(
                        Button,
                        {
                            type: "button",
                            className: "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
                            onClick: () => removeItem(index),
                        },
                        React.createElement(Trash2, { size: 16, className: "mr-1" }),
                        "Fjern"
                    )
                )
            ),
            React.createElement(
                CardContent,
                { className: "grid gap-4 sm:grid-cols-2" },
                React.createElement(Field, {
                    label: "Tittel",
                    value: item.title,
                    onChange: (value) => updateItem(index, (entry) => (entry.title = value)),
                }),
                React.createElement(Field, {
                    label: "Lenke",
                    value: item.link,
                    onChange: (value) => updateItem(index, (entry) => (entry.link = value)),
                }),
                React.createElement(Field, {
                    label: "Bilde",
                    value: item.image,
                    onChange: (value) => updateItem(index, (entry) => (entry.image = value)),
                }),
                React.createElement(Field, {
                    label: "Alt-tekst",
                    value: item.alt ?? "",
                    onChange: (value) => updateItem(index, (entry) => (entry.alt = value)),
                })
            )
        )
    );

    return React.createElement(
        "div",
        { className: "space-y-4" },
        rewardCards,
        React.createElement(
            Button,
            {
                type: "button",
                className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                onClick: addItem,
            },
            React.createElement(Plus, { size: 16, className: "mr-2" }),
            "Legg til premie"
        )
    );
}

function PartnersSectionForm({ draft, updateDraftConfig, simulateUpload, uploadState }) {
    const logos = draft.sections.partners.logos;
    const section = draft.sections.partners;
    const fileInputs = useRef([]);

    const moveLogo = (index, direction) => {
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= logos.length) {
            return;
        }
        updateDraftConfig((next) => {
            const list = [...next.sections.partners.logos];
            const [removed] = list.splice(index, 1);
            list.splice(targetIndex, 0, removed);
            next.sections.partners.logos = list;
            return next;
        });
    };

    const updateLogo = (index, mutate) => {
        updateDraftConfig((next) => {
            const entry = { ...next.sections.partners.logos[index] };
            mutate(entry);
            next.sections.partners.logos[index] = entry;
            return next;
        });
    };

    const handleLogoUpload = async (index, event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        event.target.value = "";
        if (!file) {
            return;
        }
        try {
            const path = await simulateUpload(file);
            updateLogo(index, (entry) => (entry.image = path));
        }
        catch (error) {
            window.alert((error === null || error === void 0 ? void 0 : error.message) || "Kunne ikke laste opp filen");
        }
    };

    const addLogo = () => {
        updateDraftConfig((next) => {
            next.sections.partners.logos.push({
                id: generateId("partner"),
                name: "Ny partner",
                image: "",
                url: "",
            });
            return next;
        });
    };

    const removeLogo = (index) => {
        updateDraftConfig((next) => {
            next.sections.partners.logos.splice(index, 1);
            return next;
        });
    };

    const partnerCards = logos.map((logo, index) =>
        React.createElement(
            Card,
            { key: logo.id, className: "border-slate-800 bg-slate-900/60" },
            React.createElement(
                CardHeader,
                {
                    className: "flex flex-col gap-2 border-b border-slate-800/60 pb-3 sm:flex-row sm:items-center sm:justify-between",
                },
                React.createElement(CardTitle, { className: "text-base text-slate-100" }, logo.name || "Partner"),
                React.createElement(
                    "div",
                    { className: "flex gap-2" },
                    React.createElement(
                        Button,
                        {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: () => moveLogo(index, -1),
                            disabled: index === 0,
                        },
                        React.createElement(ArrowUp, { size: 16 })
                    ),
                    React.createElement(
                        Button,
                        {
                            type: "button",
                            className: "bg-slate-800 text-slate-200 hover:bg-slate-700",
                            onClick: () => moveLogo(index, 1),
                            disabled: index === logos.length - 1,
                        },
                        React.createElement(ArrowDown, { size: 16 })
                    ),
                    React.createElement(
                        Button,
                        {
                            type: "button",
                            className: "bg-rose-500/10 text-rose-300 hover:bg-rose-500/20",
                            onClick: () => removeLogo(index),
                        },
                        React.createElement(Trash2, { size: 16, className: "mr-1" }),
                        "Fjern"
                    )
                )
            ),
            React.createElement(
                CardContent,
                { className: "grid gap-4 sm:grid-cols-2" },
                React.createElement(Field, {
                    label: "Navn",
                    value: logo.name,
                    onChange: (value) => updateLogo(index, (entry) => (entry.name = value)),
                }),
                React.createElement(Field, {
                    label: "Lenke",
                    value: logo.url,
                    onChange: (value) => updateLogo(index, (entry) => (entry.url = value)),
                }),
                React.createElement(Field, {
                    label: "Logo-URL",
                    value: logo.image,
                    onChange: (value) => updateLogo(index, (entry) => (entry.image = value)),
                    renderInput: (inputProps) => (React.createElement("div", { className: "flex gap-2" },
                        React.createElement(Input, { ...inputProps }),
                        React.createElement("input", { type: "file", accept: "image/png,image/jpeg,image/svg+xml", className: "hidden", ref: (node) => (fileInputs.current[index] = node), onChange: (event) => handleLogoUpload(index, event) }),
                        React.createElement(Button, { type: "button", className: "bg-slate-800 text-slate-100 hover:bg-slate-700", onClick: () => { var _a; return (_a = fileInputs.current[index]) === null || _a === void 0 ? void 0 : _a.click(); }, disabled: uploadState === null || uploadState === void 0 ? void 0 : uploadState.isUploading },
                            React.createElement(ArrowUp, { size: 14, className: "mr-1" }),
                            uploadState !== null && uploadState !== void 0 && uploadState.isUploading ? "Laster..." : "Last opp")))
                })
            )
        )
    );

    return React.createElement(
        "div",
        { className: "space-y-4" },
        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement(Field, {
                label: "Seksjonstittel",
                value: section.title,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.partners.title = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "Seksjonstekst",
                value: section.description,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.partners.description = value;
                    return next;
                }),
                renderInput: (inputProps) => React.createElement("textarea", { ...inputProps, rows: 2, className: `${inputProps.className} resize-none` }),
                fullWidth: true,
            })),
        partnerCards,
        React.createElement(
            Button,
            {
                type: "button",
                className: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
                onClick: addLogo,
            },
            React.createElement(Plus, { size: 16, className: "mr-2" }),
            "Legg til partner"
        )
    );
}

function ContactSectionForm({ draft, updateDraftConfig }) {
    const section = draft.sections.contact;
    return (
        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement(Field, {
                label: "Tittel",
                value: section.title,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.title = value;
                    return next;
                }),
                fullWidth: true,
            }),
            React.createElement(Field, {
                label: "Ingress",
                value: section.description,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.description = value;
                    return next;
                }),
                renderInput: (props) => (React.createElement("textarea", { ...props, rows: 3 })),
                fullWidth: true,
            }),
            React.createElement(Field, {
                label: "E-post",
                value: section.email,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.email = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "Knappfarge",
                value: section.buttonColor,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.buttonColor = value;
                    return next;
                }),
                renderInput: (props) => (React.createElement("input", { ...props, type: "color", className: "h-10 w-full rounded-xl border border-slate-800 bg-slate-900 p-1" })),
            }),
            React.createElement(Field, {
                label: "Discord",
                value: section.discord,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.discord = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "TikTok",
                value: section.tiktok,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.tiktok = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "YouTube",
                value: section.youtube,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.youtube = value;
                    return next;
                }),
            }),
            React.createElement(Field, {
                label: "Skjema-endepunkt",
                value: section.formEndpoint,
                onChange: (value) => updateDraftConfig((next) => {
                    next.sections.contact.formEndpoint = value;
                    return next;
                }),
                fullWidth: true,
            }))
    );
}

function FeedbackSectionForm({ draft, updateDraftConfig }) {
    var _a, _b;
    const entries = (_b = (_a = draft.sections.feedback) === null || _a === void 0 ? void 0 : _a.entries) !== null && _b !== void 0 ? _b : [];

    const addEntry = () => {
        updateDraftConfig((next) => {
            var _a;
            const list = [...((_a = next.sections.feedback) === null || _a === void 0 ? void 0 : _a.entries) || []];
            list.push({ id: generateId("feedback"), quote: "", author: "" });
            next.sections.feedback = next.sections.feedback || { entries: [] };
            next.sections.feedback.entries = list;
            return next;
        });
    };

    const updateEntry = (index, key, value) => {
        updateDraftConfig((next) => {
            const list = [...(next.sections.feedback?.entries ?? [])];
            if (!list[index]) {
                return next;
            }
            list[index] = { ...list[index], [key]: value };
            next.sections.feedback = next.sections.feedback || { entries: [] };
            next.sections.feedback.entries = list;
            return next;
        });
    };

    const removeEntry = (index) => {
        updateDraftConfig((next) => {
            const list = [...(next.sections.feedback?.entries ?? [])];
            list.splice(index, 1);
            next.sections.feedback = next.sections.feedback || { entries: [] };
            next.sections.feedback.entries = list;
            return next;
        });
    };

    return (React.createElement("div", { className: "space-y-4" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("div", { className: "space-y-1" },
                React.createElement("p", { className: "text-sm font-semibold text-slate-100" }, "Tilbakemeldinger"),
                React.createElement("p", { className: "text-xs text-slate-400" }, "Legg til sitater fra medlemmer eller foresatte.")),
            React.createElement(Button, { type: "button", onClick: addEntry, className: "border border-slate-800 bg-slate-900 text-slate-100 hover:bg-slate-800" },
                React.createElement(Plus, { size: 16, className: "mr-2" }),
                "Ny tilbakemelding")),
        entries.length === 0
            ? (React.createElement("p", { className: "text-sm text-slate-400" }, "Ingen tilbakemeldinger enda. Klikk \"Ny tilbakemelding\" for å starte."))
            : (React.createElement("div", { className: "space-y-4" }, entries.map((entry, index) => (React.createElement(Card, { key: entry.id, className: "border-slate-800 bg-slate-900/60" },
                React.createElement(CardContent, { className: "space-y-3" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("p", { className: "text-sm font-semibold text-slate-200" }, "Tilbakemelding ", index + 1),
                        React.createElement(Button, { type: "button", size: "icon", variant: "ghost", className: "text-slate-400 hover:text-red-400", onClick: () => removeEntry(index) },
                            React.createElement(Trash2, { size: 16 })) ),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "Tekst"),
                        React.createElement(Textarea, { value: entry.quote, onChange: (event) => updateEntry(index, "quote", event.target.value), rows: 3, className: "border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement(Label, { className: "text-xs uppercase text-slate-400" }, "Forfatter"),
                        React.createElement(Input, { value: entry.author, onChange: (event) => updateEntry(index, "author", event.target.value), className: "border-slate-800 bg-slate-900 text-slate-100 placeholder:text-slate-500" }))))))))
    );
}

function Field({ label, value, onChange, renderInput, fullWidth }) {
    const inputProps = {
        value,
        onChange: (event) => onChange(event.target.value),
        className: "w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100",
    };
    return (
        React.createElement("div", { className: fullWidth ? "sm:col-span-2" : undefined },
            React.createElement(Label, { className: "mb-1 block text-xs uppercase text-slate-400" }, label),
            renderInput ? renderInput(inputProps) : React.createElement(Input, { ...inputProps }))
    );
}
