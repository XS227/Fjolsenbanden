"use client";

import React, { useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CheckCircle2,
  Gamepad2,
  Gift,
  HandHeart,
  PartyPopper,
  Sparkles,
  Star,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const vippsBrandColor = "#FF5B24";

type FormData = {
  heroName: string;
  hypeSong: string;
  dreamSquadName: string;
  xpGoal: string;
  snack: string;
  energyLevel: string;
  vibeBadges: string[];
  parentName: string;
  parentPhone: string;
  parentCheerMessage: string;
};

type CheckboxFieldName = "vibeBadges";
type TextFieldName = Exclude<keyof FormData, CheckboxFieldName>;

type QuestField =
  | {
      name: TextFieldName;
      label: string;
      description?: string;
      type: "text" | "textarea" | "select";
      placeholder?: string;
      options?: readonly string[];
    }
  | {
      name: CheckboxFieldName;
      label: string;
      description?: string;
      type: "checkboxes";
      options: readonly string[];
    };

type Quest = {
  id: string;
  title: string;
  description: string;
  reward: string;
  icon: LucideIcon;
  fields: readonly QuestField[];
};

const initialFormData: FormData = {
  heroName: "",
  hypeSong: "",
  dreamSquadName: "",
  xpGoal: "",
  snack: "",
  energyLevel: "",
  vibeBadges: [],
  parentName: "",
  parentPhone: "",
  parentCheerMessage: "",
};

const quests: readonly Quest[] = [
  {
    id: "origin",
    title: "Quest 1: Origin Story",
    description:
      "Gi oss den episke introen! Tenk på dette som første scene i din egen gaming-serie.",
    reward: "+200 hype XP",
    icon: Sparkles,
    fields: [
      {
        name: "heroName",
        label: "Hva er ditt gamer-alias?",
        placeholder: "Captain Clutch, PixelPirate, ...",
        description: "Vi printer det på ditt virtuelle superhelt-kort!",
        type: "text",
      },
      {
        name: "hypeSong",
        label: "Hvilken låt spiller i bakgrunnen når du går inn i lobbyen?",
        placeholder: "Skriv inn din ultimate hype-låt",
        type: "text",
      },
      {
        name: "dreamSquadName",
        label: "Hva heter drømmeteamet ditt?",
        placeholder: "Fjolsen Flares, Northern Ninjas, ...",
        type: "text",
      },
    ],
  },
  {
    id: "gear",
    title: "Quest 2: Loot & Lag",
    description:
      "Fortell oss hvordan du lader opp energien og hva slags stemning du tar med deg inn i kampen.",
    reward: "+350 energi XP",
    icon: Gamepad2,
    fields: [
      {
        name: "xpGoal",
        label: "Hva er ditt neste gaming-mål?",
        type: "select",
        options: [
          "Vinnekroner i Fortnite",
          "Bygge tidens kuleste Minecraft-base",
          "Lede laget til Rocket League-seier",
          "Arrangere familiens spillkveld",
        ],
      },
      {
        name: "snack",
        label: "Hva er din hemmelige power-snack?",
        placeholder: "F.eks. blåbær, ostesmørbrød eller mormors vafler",
        type: "text",
      },
      {
        name: "energyLevel",
        label: "Hvordan beskriver du energinivået ditt i en turnering?",
        type: "select",
        options: [
          "Zen-master: Fokusert og iskald",
          "Party booster: Høy energi og masse latter",
          "Strategiguru: Tenker tre moves frem",
          "Wildcard: Holder alle på tærne",
        ],
      },
      {
        name: "vibeBadges",
        label: "Hvilke badges matcher deg best?",
        description: "Trykk på alle som passer – jo flere, jo bedre bragging rights!",
        type: "checkboxes",
        options: [
          "Lagkaptein",
          "Emoji-spammer",
          "Clutch-konge",
          "Support-helt",
          "Strategi-ninja",
          "Mememester",
        ],
      },
    ],
  },
  {
    id: "vipps",
    title: "Quest 3: Crew Approval",
    description:
      "Tid for high-five fra de hjemme. Foreldre eller foresatte må også bli med på hypen!",
    reward: "Vipps boost + trygg registrering",
    icon: HandHeart,
    fields: [
      {
        name: "parentName",
        label: "Hvem er din hype-manager hjemme (forelder/foresatt)?",
        placeholder: "Navn",
        type: "text",
      },
      {
        name: "parentPhone",
        label: "Hva er Vipps-nummeret deres?",
        placeholder: "8 sifre",
        type: "text",
      },
      {
        name: "parentCheerMessage",
        label: "Hva vil du at vi skal fortelle dem i Vipps-popupen?",
        placeholder: "Skriv en morsom beskjed – vi legger den i Vipps-notatet!",
        type: "textarea",
      },
    ],
  },
];

export default function MotivasjonsSkjemaPage() {
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showVippsModal, setShowVippsModal] = useState(false);
  const [vippsModalStep, setVippsModalStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const progress = useMemo(
    () => Math.round(((currentQuestIndex + 1) / quests.length) * 100),
    [currentQuestIndex]
  );

  const currentQuest = quests[currentQuestIndex];
  const QuestIcon = currentQuest.icon;

  const handleFieldChange = <K extends TextFieldName>(name: K, value: FormData[K]) => {
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleBadgeToggle = (name: CheckboxFieldName, option: string) => {
    setFormData((previous) => {
      const currentValues = previous[name];
      const updatedValues = currentValues.includes(option)
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option];

      return { ...previous, [name]: updatedValues };
    });
  };

  const ensureQuestCompleted = (quest: Quest) => {
    const missingField = quest.fields.find((field) => {
      if (field.type === "checkboxes") {
        return formData[field.name].length === 0;
      }

      const value = formData[field.name];
      return typeof value !== "string" || value.trim().length === 0;
    });

    if (missingField) {
      setValidationMessage(
        `Wooops! ${missingField.label} mangler. Fullfør questen for å låse opp neste steg.`
      );
      return false;
    }

    setValidationMessage(null);
    return true;
  };

  const handleNextQuest = () => {
    if (!ensureQuestCompleted(currentQuest)) {
      return;
    }

    setCurrentQuestIndex((previous) => Math.min(previous + 1, quests.length - 1));
  };

  const handlePreviousQuest = () => {
    setValidationMessage(null);
    setCurrentQuestIndex((previous) => Math.max(previous - 1, 0));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ensureQuestCompleted(currentQuest)) {
      return;
    }

    setVippsModalStep(0);
    setShowVippsModal(true);
  };

  const handleVippsComplete = () => {
    setShowVippsModal(false);
    setFormSubmitted(true);
    setVippsModalStep(0);
  };

  const handleVippsCancel = () => {
    setShowVippsModal(false);
    setVippsModalStep(0);
  };

  const vippsModalSlides = useMemo(
    () => [
      {
        id: "intro",
        title: "Steg 1: Vipps-varsel på vei",
        description:
          formData.parentName && formData.parentPhone
            ? `Vi sender en Vipps-popup til ${formData.parentName} på ${formData.parentPhone}. Be dem sjekke mobilen sin.`
            : "Vi sender en Vipps-popup til foresatte. Be dem sjekke mobilen sin.",
        content: (
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li className="flex items-start gap-3">
              <Sparkles className="mt-1 h-4 w-4 text-[#FF5B24]" aria-hidden="true" />
              <span>Vipps ber dem bekrefte at de godkjenner innmeldingen.</span>
            </li>
            <li className="flex items-start gap-3">
              <Sparkles className="mt-1 h-4 w-4 text-[#FF5B24]" aria-hidden="true" />
              <span>De kan trygt se over navn, nummer og beskjed fra deg.</span>
            </li>
          </ul>
        ),
      },
      {
        id: "message",
        title: "Steg 2: Beskjeden din",
        description: "Dette er teksten som vises i Vipps-popupen. Les over at alt ser riktig ut.",
        content: (
          <div className="mt-4 rounded-2xl bg-zinc-100 px-5 py-4 text-sm text-zinc-700">
            <p>
              Din beskjed:
              <span className="ml-2 font-semibold text-zinc-900">
                “{formData.parentCheerMessage || "Ingen beskjed fylt inn enda"}”
              </span>
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-zinc-500">Sendes direkte i Vipps-notatet</p>
          </div>
        ),
      },
      {
        id: "confirm",
        title: "Steg 3: Klar til å starte",
        description: "Når foresatte trykker godkjenn i Vipps er du klar. Trykk på knappen under for å sende popupen.",
        content: (
          <div className="mt-4 grid gap-3 text-sm text-zinc-600">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden="true" />
              <span>Du får beskjed i chatten når bekreftelsen er gjennomført.</span>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle className="mt-0.5 h-5 w-5 text-[#13A0F9]" aria-hidden="true" />
              <span>Gi dem et hint om at Vipps-varslet kommer nå – det gjør prosessen raskere.</span>
            </div>
          </div>
        ),
      },
    ],
    [formData.parentCheerMessage, formData.parentName, formData.parentPhone]
  );

  const handleVippsNextStep = () => {
    setVippsModalStep((previous) => Math.min(previous + 1, vippsModalSlides.length - 1));
  };

  const handleVippsPreviousStep = () => {
    setVippsModalStep((previous) => Math.max(previous - 1, 0));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentQuestIndex(0);
    setFormSubmitted(false);
    setValidationMessage(null);
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
        <main className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/20 text-emerald-300">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-200/80">
                  Mission accomplished
                </p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  Vipps high-five! Skjemaet er sendt.
                </h1>
                <p className="mt-3 text-lg text-zinc-200">
                  Vi pakker sammen svarene dine og sender en Vipps-popup til hype-manageren din.
                  I mellomtiden kan du varme opp emote-dansen!
                </p>
              </div>
            </div>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Gamer-navn</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.heroName}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Hype-låt</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.hypeSong}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Drømmeteam</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.dreamSquadName}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Neste mål</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.xpGoal}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Power-snack</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.snack}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Turneringsenergi</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.energyLevel}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 sm:col-span-2">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Badges</dt>
                <dd className="mt-2 text-lg font-semibold text-white">
                  {formData.vibeBadges.join(", ")}
                </dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Hype-manager</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.parentName}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Vipps-nummer</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{formData.parentPhone}</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-5 sm:col-span-2">
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Melding til Vipps</dt>
                <dd className="mt-2 text-lg font-semibold text-white">
                  {formData.parentCheerMessage}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-zinc-300">
                <PartyPopper className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <span>Neste steg: Vent på Vipps-bekreftelsen og gled deg til neste quest!</span>
              </div>
              <Button onClick={handleReset} className="rounded-2xl bg-white/10 px-6 text-sm hover:bg-white/20">
                Start et nytt eventyr
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <div className="bg-gradient-to-r from-[#151D2E] via-[#1C2438] to-[#1F1B2F] px-8 py-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/60">Fjolsen Quest Board</p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Utfyll skjemaet og lås opp Vipps-portalen
                </h1>
                <p className="mt-4 max-w-xl text-base text-zinc-300">
                  Vi har laget et skjema som føles mer som en questline enn papirarbeid. Fullfør alle spørsmålene,
                  så sender vi en glitrende Vipps-popup til hype-manageren din for bekreftelse.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3 rounded-2xl border border-white/10 bg-white/10 p-5 text-right">
                <div className="flex items-center gap-2 text-sm text-zinc-200">
                  <Star className="h-4 w-4 text-yellow-300" aria-hidden="true" />
                  <span>{progress}% klar</span>
                </div>
                <div className="h-2 w-48 rounded-full bg-white/20">
                  <div
                    className="h-2 rounded-full bg-[#13A0F9] transition-all"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="text-xs uppercase tracking-[0.24em] text-white/60">
                  Quest {currentQuestIndex + 1} av {quests.length}
                </div>
              </div>
            </div>
          </div>

          <form className="px-8 py-10" onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#13A0F9]">
                  <QuestIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{currentQuest.title}</h2>
                  <p className="mt-1 text-sm text-zinc-300">{currentQuest.description}</p>
                </div>
              </div>
              <div className="rounded-xl bg-white/5 px-4 py-2 text-sm text-emerald-200">
                <Gift className="mr-2 inline h-4 w-4" aria-hidden="true" />
                {currentQuest.reward}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {currentQuest.fields.map((field) => {
                if (field.type === "checkboxes") {
                  const selectedValues = formData[field.name];
                  return (
                    <div key={field.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <label className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                            {field.label}
                          </label>
                          {field.description ? (
                            <p className="mt-1 text-sm text-zinc-300">{field.description}</p>
                          ) : null}
                        </div>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                          Velg så mange du vil
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {field.options.map((option) => {
                          const isActive = selectedValues.includes(option);
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleBadgeToggle(field.name, option)}
                              className={`rounded-2xl px-4 py-2 text-sm transition-all ${
                                isActive
                                  ? "bg-[#13A0F9]/20 text-[#13A0F9] shadow-lg shadow-[#13A0F9]/30"
                                  : "bg-white/10 text-white/80 hover:bg-white/20"
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const sharedClasses =
                  "mt-3 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-base text-white placeholder:text-zinc-500 focus:border-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]/40";

                return (
                  <div key={field.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <label className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      {field.label}
                    </label>
                    {field.description ? (
                      <p className="mt-1 text-sm text-zinc-300">{field.description}</p>
                    ) : null}
                    {field.type === "textarea" ? (
                      <textarea
                        value={formData[field.name] as string}
                        onChange={(event) => handleFieldChange(field.name, event.target.value)}
                        rows={4}
                        placeholder={field.placeholder}
                        className={`${sharedClasses} resize-none`}
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={formData[field.name] as string}
                        onChange={(event) => handleFieldChange(field.name, event.target.value)}
                        className={`${sharedClasses} appearance-none`}
                      >
                        <option value="">Velg et alternativ</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        value={formData[field.name] as string}
                        onChange={(event) => handleFieldChange(field.name, event.target.value)}
                        type="text"
                        placeholder={field.placeholder}
                        className={sharedClasses}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {validationMessage ? (
              <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-400/10 px-5 py-4 text-sm text-amber-200">
                {validationMessage}
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <Button
                type="button"
                onClick={handlePreviousQuest}
                className="rounded-2xl bg-white/10 px-5 text-sm hover:bg-white/20"
                disabled={currentQuestIndex === 0}
              >
                Tilbake
              </Button>
              <div className="flex items-center gap-3">
                {currentQuestIndex < quests.length - 1 ? (
                  <Button
                    type="button"
                    onClick={handleNextQuest}
                    className="rounded-2xl bg-[#13A0F9] px-6 text-sm hover:bg-[#1090df]"
                  >
                    Neste quest <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-2xl px-6 text-sm text-white"
                    style={{ backgroundColor: vippsBrandColor }}
                  >
                    Send inn og åpne Vipps
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      {showVippsModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div
            role="dialog"
            aria-modal="true"
            className="max-w-xl rounded-3xl border border-white/10 bg-white p-10 text-zinc-900 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${vippsBrandColor}1A`, color: vippsBrandColor }}
              >
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Vipps-popup klar!</h2>
                <p className="mt-1 text-sm text-zinc-600">
                  Følg de tre stegene under for å sende Vipps-popupen til {formData.parentName || "foresatte"}. Hver slide forklarer
                  hva som skjer.
                </p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${vippsModalStep * 100}%)` }}
              >
                {vippsModalSlides.map((slide) => (
                  <div key={slide.id} className="min-w-full flex-shrink-0">
                    <h3 className="text-lg font-semibold text-zinc-900">{slide.title}</h3>
                    <p className="mt-2 text-sm text-zinc-600">{slide.description}</p>
                    {slide.content}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {vippsModalSlides.map((slide, index) => (
                <span
                  key={slide.id}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === vippsModalStep ? "bg-[#FF5B24]" : "bg-zinc-200"
                  }`}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl border-zinc-300 px-5 text-sm text-zinc-700 hover:bg-zinc-100"
                onClick={handleVippsCancel}
              >
                Avbryt
              </Button>
              <div className="flex flex-wrap justify-end gap-3">
                {vippsModalStep > 0 ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-2xl border-zinc-200 px-5 text-sm text-zinc-700 hover:bg-zinc-100"
                    onClick={handleVippsPreviousStep}
                  >
                    Forrige steg
                  </Button>
                ) : null}
                {vippsModalStep < vippsModalSlides.length - 1 ? (
                  <Button
                    type="button"
                    className="rounded-2xl bg-[#13A0F9] px-6 text-sm text-white hover:bg-[#1090df]"
                    onClick={handleVippsNextStep}
                  >
                    Neste steg
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="rounded-2xl px-6 text-sm text-white"
                    style={{ backgroundColor: vippsBrandColor }}
                    onClick={handleVippsComplete}
                  >
                    Start Vipps-popup
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
