"use client";
import React from "react";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  ClipboardCheck,
  Clock3,
  FileSpreadsheet,
  LayoutDashboard,
  Lock,
  Palette,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const backgroundStyle = {
  background:
    "radial-gradient(circle at 18% 15%, rgba(19,160,249,0.25), transparent 55%), radial-gradient(circle at 82% 8%, rgba(255,47,156,0.18), transparent 45%), #03091b",
};

const heroStats = [
  { label: "Moduler du kontrollerer", value: "6", description: "Hero, live-sending, medlemskap og mer" },
  { label: "Tid spart per lansering", value: "12 t", description: "Ferdige maler og lokal lagring" },
  { label: "Tilpassede profiler", value: "25+", description: "Oppdater spillere på minutter" },
];

const featureCards = [
  {
    title: "Visuell redigering",
    description:
      "Flytt seksjoner, oppdater tekster og endre merkevarefarger i sanntid – alt skjer i et trygt arbeidsområde før publisering.",
    Icon: Palette,
  },
  {
    title: "Team- og medlemsstyring",
    description:
      "Legg til nye medlemmer, oppdater kontaktpunkter og hold oversikten med kraftige filtre og eksport til CSV.",
    Icon: Users,
  },
  {
    title: "Innebygd trygghet",
    description:
      "Vipps-verifisering, foreldretillatelser og aktivitetslogger gjør at både foreldre og sponsorer kan stole på prosessen.",
    Icon: Lock,
  },
];

const moduleHighlights = [
  {
    title: "Nettsidemoduler",
    description: "Aktiver eller skjul live-sending, premier og partnerskap på forsiden med ett klikk.",
    Icon: Blocks,
  },
  {
    title: "Automatiske oversikter",
    description: "Dashboardet viser reach, kampanjer og aktivitetsnivå slik at du alltid ser utviklingen.",
    Icon: BarChart3,
  },
  {
    title: "Publiseringsflyt",
    description: "Lokal lagring sørger for at du kan teste endringer før de deles med resten av Fjolsenbanden.",
    Icon: Clock3,
  },
];

const workflowSteps = [
  {
    title: "1. Planlegg",
    body: "Velg hvilke seksjoner som skal fremheves og legg inn den nyeste informasjonen om arrangementer og kampanjer.",
  },
  {
    title: "2. Oppdater",
    body: "Dra og slipp modulene i ønsket rekkefølge, legg til nye medlemmer og oppdater partnerlogoene på minutter.",
  },
  {
    title: "3. Publiser",
    body: "Når du er fornøyd, deler du endringene med resten av klubben – og alle ser den samme, polerte opplevelsen.",
  },
];

function HeroStats() {
  return React.createElement(
    "dl",
    { className: "mt-10 grid gap-6 text-left sm:grid-cols-3" },
    heroStats.map((stat) =>
      React.createElement(
        "div",
        {
          key: stat.label,
          className:
            "rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 shadow-[0_16px_32px_rgba(8,18,40,0.45)] backdrop-blur",
        },
        React.createElement(
          "dt",
          { className: "text-xs uppercase tracking-widest text-slate-400" },
          stat.label
        ),
        React.createElement(
          "dd",
          { className: "mt-2 text-2xl font-semibold text-white" },
          stat.value
        ),
        React.createElement("p", { className: "mt-1 text-xs text-slate-300" }, stat.description)
      )
    )
  );
}

function FeatureSection() {
  return React.createElement(
    "section",
    { className: "space-y-8" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-3" },
      React.createElement(
        "span",
        {
          className:
            "inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sky-200",
        },
        React.createElement(Settings2, { className: "h-3.5 w-3.5" }),
        "Funksjoner i adminpanelet"
      ),
      React.createElement(
        "h2",
        { className: "text-3xl font-semibold text-white sm:text-4xl" },
        "Alt du trenger for å holde Fjolsenbanden oppdatert"
      ),
      React.createElement(
        "p",
        { className: "max-w-2xl text-sm text-slate-300" },
        "Kontrollrommet er laget for en liten organisasjon med store ambisjoner. Her samarbeider styret, foreldre og innholdsprodusenter på en felles plattform."
      )
    ),
    React.createElement(
      "div",
      { className: "grid gap-6 lg:grid-cols-3" },
      featureCards.map(({ title, description, Icon }) =>
        React.createElement(
          Card,
          {
            key: title,
            className:
              "border-white/10 bg-white/5 text-white shadow-[0_18px_36px_rgba(12,24,48,0.45)] transition hover:border-white/20 hover:bg-white/10",
          },
          React.createElement(
            CardHeader,
            { className: "space-y-3" },
            React.createElement(
              "div",
              { className: "inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10" },
              React.createElement(Icon, { className: "h-5 w-5 text-sky-200" })
            ),
            React.createElement(CardTitle, { className: "text-lg text-white" }, title)
          ),
          React.createElement(
            CardContent,
            { className: "text-sm text-slate-300" },
            description
          )
        )
      )
    )
  );
}

function ModuleHighlights() {
  return React.createElement(
    "section",
    { className: "space-y-6" },
    React.createElement(
      "div",
      { className: "flex flex-col gap-2" },
      React.createElement(
        "h3",
        { className: "text-2xl font-semibold text-white" },
        "Moduler som følger Fjolsenbanden sin rytme"
      ),
      React.createElement(
        "p",
        { className: "max-w-2xl text-sm text-slate-300" },
        "Slå av seksjoner som ikke er aktuelle, planlegg kampanjer og la resten oppdatere seg automatisk."
      )
    ),
    React.createElement(
      "div",
      { className: "grid gap-4 md:grid-cols-3" },
      moduleHighlights.map(({ title, description, Icon }) =>
        React.createElement(
          "div",
          {
            key: title,
            className:
              "rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-5 text-sm text-slate-200 shadow-[0_16px_32px_rgba(10,20,40,0.45)]",
          },
          React.createElement(
            "div",
            { className: "flex items-center gap-3" },
            React.createElement(
              "span",
              { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white/10" },
              React.createElement(Icon, { className: "h-4 w-4 text-sky-200" })
            ),
            React.createElement(
              "p",
              { className: "font-semibold text-white" },
              title
            )
          ),
          React.createElement("p", { className: "mt-3 text-xs text-slate-300" }, description)
        )
      )
    )
  );
}

function Workflow() {
  return React.createElement(
    "section",
    { className: "grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:items-center" },
    React.createElement(
      "div",
      { className: "space-y-4" },
      React.createElement(
        "span",
        {
          className:
            "inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-pink-200",
        },
        React.createElement(Sparkles, { className: "h-3.5 w-3.5" }),
        "Arbeidsflyt"
      ),
      React.createElement(
        "h2",
        { className: "text-3xl font-semibold text-white" },
        "Jobb kreativt – publiser når du er klar"
      ),
      React.createElement(
        "p",
        { className: "text-sm text-slate-300" },
        "Adminpanelet lagrer alt lokalt i nettleseren din. Du kan jobbe frem neste sesongs profilering uten å forstyrre det som allerede ligger ute."
      )
    ),
    React.createElement(
      "ol",
      { className: "space-y-4" },
      workflowSteps.map(({ title, body }) =>
        React.createElement(
          "li",
          {
            key: title,
            className:
              "group rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200 shadow-[0_16px_32px_rgba(8,18,40,0.45)] transition hover:border-white/20 hover:bg-white/10",
          },
          React.createElement(
            "div",
            { className: "flex items-center justify-between" },
            React.createElement(
              "h3",
              { className: "text-base font-semibold text-white" },
              title
            ),
            React.createElement(ClipboardCheck, {
              className: "h-4 w-4 text-sky-200 opacity-0 transition-opacity group-hover:opacity-100",
            })
          ),
          React.createElement("p", { className: "mt-3 text-xs text-slate-300" }, body)
        )
      )
    )
  );
}

function AdminScreenMosaic() {
  return React.createElement(
    "section",
    { className: "grid gap-6 lg:grid-cols-2" },
    React.createElement(DashboardPreview, null),
    React.createElement(CustomerListPreview, null),
    React.createElement(CreateCustomerPreview, null),
    React.createElement(CustomerDetailsPreview, null)
  );
}

function DashboardPreview() {
  return React.createElement(
    "div",
    {
      className:
        "rounded-3xl border border-white/10 bg-gradient-to-br from-[#11183b] via-[#0c102e] to-[#050916] p-6 shadow-[0_24px_48px_rgba(8,18,40,0.55)]",
    },
    React.createElement(
      "header",
      { className: "flex items-center justify-between" },
      React.createElement(
        "div",
        { className: "space-y-1" },
        React.createElement("p", { className: "text-xs text-slate-400" }, "Dashboard"),
        React.createElement(
          "h3",
          { className: "text-lg font-semibold text-white" },
          "Status for Fjolsenbanden"
        )
      ),
      React.createElement(
        "span",
        { className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300" },
        "Live"
      )
    ),
    React.createElement(
      "div",
      { className: "mt-6 grid gap-4 sm:grid-cols-2" },
      [
        { label: "Nye medlemmer", value: "+18", trend: "↑ 12%" },
        { label: "Avg. seertid", value: "42 min", trend: "↑ 5%" },
        { label: "Aktive foreldre", value: "128", trend: "↑ 9%" },
        { label: "Partnerkampanjer", value: "6", trend: "↑ 2" },
      ].map((item) =>
        React.createElement(
          "div",
          {
            key: item.label,
            className:
              "rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300",
          },
          React.createElement(
            "p",
            { className: "text-xs uppercase tracking-widest text-slate-400" },
            item.label
          ),
          React.createElement(
            "p",
            { className: "mt-2 text-xl font-semibold text-white" },
            item.value
          ),
          React.createElement(
            "span",
            { className: "text-xs text-emerald-300" },
            item.trend
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mt-6 rounded-2xl border border-white/10 bg-white/5 p-4" },
      React.createElement(
        "p",
        { className: "text-xs uppercase tracking-widest text-slate-400" },
        "Fremdrift på kampanjer"
      ),
      React.createElement(
        "div",
        { className: "mt-4 space-y-3" },
        [
          { label: "Sommerturnering", progress: 80 },
          { label: "Sponsorvideo", progress: 45 },
          { label: "Foreldremøte", progress: 60 },
        ].map((campaign) =>
          React.createElement(
            "div",
            { key: campaign.label },
            React.createElement(
              "div",
              { className: "flex items-center justify-between text-xs text-slate-300" },
              React.createElement("span", null, campaign.label),
              React.createElement("span", null, `${campaign.progress}%`)
            ),
            React.createElement(
              "div",
              { className: "mt-2 h-2 rounded-full bg-white/10" },
              React.createElement("div", {
                className: "h-2 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400",
                style: { width: `${campaign.progress}%` },
              })
            )
          )
        )
      )
    )
  );
}

function CustomerListPreview() {
  return React.createElement(
    "div",
    {
      className:
        "rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_24px_48px_rgba(8,18,40,0.45)]",
    },
    React.createElement(
      "header",
      { className: "flex items-center justify-between" },
      React.createElement(
        "div",
        { className: "space-y-1" },
        React.createElement("p", { className: "text-xs text-slate-400" }, "Medlemmer"),
        React.createElement(
          "h3",
          { className: "text-lg font-semibold text-white" },
          "Medlemsliste"
        )
      ),
      React.createElement(
        Button,
        {
          size: "sm",
          className:
            "h-8 rounded-lg border border-white/20 bg-white/10 px-3 text-xs font-semibold text-white hover:bg-white/20",
        },
        React.createElement(
          "span",
          { className: "flex items-center gap-2" },
          React.createElement(Users, { className: "h-3.5 w-3.5" }),
          "Legg til"
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mt-4 overflow-hidden rounded-2xl border border-white/10" },
      React.createElement(
        "table",
        { className: "min-w-full divide-y divide-white/10 text-left text-xs" },
        React.createElement(
          "thead",
          { className: "bg-white/5 text-slate-300" },
          React.createElement(
            "tr",
            null,
            ["Spiller", "Hovedspill", "Status", "Forelder"].map((heading) =>
              React.createElement(
                "th",
                { key: heading, className: "px-4 py-3 font-semibold" },
                heading
              )
            )
          )
        ),
        React.createElement(
          "tbody",
          { className: "divide-y divide-white/10 bg-white/5 text-slate-200" },
          [
            { name: "Luna", game: "Fortnite", status: "Aktiv", parent: "Kari" },
            { name: "Felix", game: "Rocket League", status: "På prøve", parent: "Stian" },
            { name: "Maja", game: "Minecraft", status: "Aktiv", parent: "Eline" },
            { name: "Odin", game: "Valorant", status: "Pause", parent: "Runar" },
          ].map((row) =>
            React.createElement(
              "tr",
              { key: row.name, className: "transition hover:bg-white/10" },
              React.createElement("td", { className: "px-4 py-3" }, row.name),
              React.createElement("td", { className: "px-4 py-3" }, row.game),
              React.createElement(
                "td",
                { className: "px-4 py-3" },
                React.createElement(
                  "span",
                  {
                    className:
                      "inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200",
                  },
                  row.status
                )
              ),
              React.createElement("td", { className: "px-4 py-3" }, row.parent)
            )
          )
        )
      )
    )
  );
}

function CreateCustomerPreview() {
  return React.createElement(
    "div",
    {
      className:
        "rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_24px_48px_rgba(8,18,40,0.45)]",
    },
    React.createElement(
      "header",
      { className: "space-y-1" },
      React.createElement("p", { className: "text-xs text-slate-400" }, "Skjema"),
      React.createElement(
        "h3",
        { className: "text-lg font-semibold text-white" },
        "Opprett nytt medlem"
      )
    ),
    React.createElement(
      "div",
      { className: "mt-4 grid gap-4 md:grid-cols-2" },
      [
        { label: "Navn", placeholder: "Ola Nordmann" },
        { label: "Gamer-tag", placeholder: "fjolsenola" },
        { label: "Hovedspill", placeholder: "Velg spill" },
        { label: "Foreldrekontakt", placeholder: "Navn og nummer" },
      ].map((field) =>
        React.createElement(
          "label",
          { key: field.label, className: "space-y-2 text-xs text-slate-300" },
          React.createElement("span", { className: "block font-semibold text-white" }, field.label),
          React.createElement("div", {
            className:
              "h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-slate-200",
          },
            field.placeholder
          )
        )
      )
    ),
    React.createElement(
      "label",
      { className: "mt-4 block space-y-2 text-xs text-slate-300" },
      React.createElement("span", { className: "block font-semibold text-white" }, "Interesser"),
      React.createElement(
        "div",
        { className: "h-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300" },
        "Fortnite turneringer, streaming, nettvett"
      )
    ),
    React.createElement(
      "div",
      { className: "mt-5 flex flex-wrap gap-3" },
      React.createElement(
        Button,
        {
          size: "sm",
          className:
            "h-9 rounded-lg bg-gradient-to-r from-sky-400 to-emerald-400 px-4 text-xs font-semibold text-slate-900 hover:from-sky-300 hover:to-emerald-300",
        },
        React.createElement(
          "span",
          { className: "flex items-center gap-2" },
          React.createElement(FileSpreadsheet, { className: "h-3.5 w-3.5" }),
          "Lagre"
        )
      ),
      React.createElement(
        Button,
        {
          size: "sm",
          variant: "outline",
          className:
            "h-9 rounded-lg border-white/20 bg-white/5 px-4 text-xs font-semibold text-white hover:bg-white/15",
        },
        "Avbryt"
      )
    )
  );
}

function CustomerDetailsPreview() {
  return React.createElement(
    "div",
    {
      className:
        "rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-6 text-slate-200 shadow-[0_24px_48px_rgba(8,18,40,0.45)]",
    },
    React.createElement(
      "header",
      { className: "flex items-center justify-between" },
      React.createElement(
        "div",
        { className: "space-y-1" },
        React.createElement("p", { className: "text-xs text-slate-400" }, "Oversikt"),
        React.createElement(
          "h3",
          { className: "text-lg font-semibold text-white" },
          "Medlemsdetaljer"
        )
      ),
      React.createElement(
        Button,
        {
          size: "sm",
          className:
            "h-8 rounded-lg border border-white/20 bg-white/10 px-3 text-xs font-semibold text-white hover:bg-white/20",
        },
        React.createElement(
          "span",
          { className: "flex items-center gap-2" },
          React.createElement(ArrowRight, { className: "h-3.5 w-3.5" }),
          "Del"
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mt-4 grid gap-4 md:grid-cols-2" },
      [
        { label: "Status", value: "Aktivt medlem" },
        { label: "Foreldretillatelse", value: "Godkjent" },
        { label: "Sist logget inn", value: "24. juni" },
        { label: "Neste aktivitet", value: "Fredag 18:00" },
      ].map((field) =>
        React.createElement(
          "div",
          {
            key: field.label,
            className:
              "rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200",
          },
          React.createElement(
            "p",
            { className: "text-xs uppercase tracking-widest text-slate-400" },
            field.label
          ),
          React.createElement(
            "p",
            { className: "mt-2 text-base font-semibold text-white" },
            field.value
          )
        )
      )
    ),
    React.createElement(
      "div",
      { className: "mt-6 space-y-3" },
      [
        "Vipps-verifisert forelder",
        "Registrerte turneringer",
        "Discord-tag og kontaktinfo",
      ].map((item) =>
        React.createElement(
          "div",
          {
            key: item,
            className:
              "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs",
          },
          React.createElement("span", { className: "text-slate-300" }, item),
          React.createElement(
            "span",
            { className: "text-emerald-300" },
            "✔"
          )
        )
      )
    )
  );
}

function CTASection() {
  return React.createElement(
    "section",
    {
      className:
        "rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-transparent to-pink-500/20 p-10 text-center text-slate-200 shadow-[0_24px_48px_rgba(8,18,40,0.45)]",
    },
    React.createElement(
      "h2",
      { className: "text-3xl font-semibold text-white" },
      "Klar for å strømline Fjolsenbanden?"
    ),
    React.createElement(
      "p",
      { className: "mx-auto mt-4 max-w-2xl text-sm text-slate-200" },
      "Ta i bruk adminpanelet for å forenkle kommunikasjonen mellom spillere, foreldre og samarbeidspartnere. Du får kontroll, trygghet og et profesjonelt uttrykk – hver gang."
    ),
    React.createElement(
      "div",
      { className: "mt-8 flex flex-wrap justify-center gap-4" },
      React.createElement(
        Button,
        {
          size: "lg",
          className:
            "rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-pink-500 px-8 text-base text-slate-950 shadow-[0_18px_38px_rgba(19,160,249,0.45)] hover:from-sky-300 hover:via-sky-400 hover:to-pink-400",
          onClick: () => {
            if (typeof window !== "undefined") {
              window.location.href = "/admin";
            }
          },
        },
        React.createElement(
          "span",
          { className: "flex items-center gap-2" },
          "Logg inn som administrator",
          React.createElement(ArrowRight, { className: "h-4 w-4" })
        )
      ),
      React.createElement(
        Button,
        {
          size: "lg",
          variant: "outline",
          className:
            "rounded-2xl border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white/20",
          onClick: () => {
            if (typeof window !== "undefined") {
              window.open("/admin-dashboard-preview.html", "_blank", "noopener,noreferrer");
            }
          },
        },
        React.createElement(
          "span",
          { className: "flex items-center gap-2" },
          "Se interaktiv demo",
          React.createElement(ArrowRight, { className: "h-4 w-4" })
        )
      )
    )
  );
}

export default function AdminMarketingPage() {
  return React.createElement(
    "div",
    {
      className:
        "min-h-screen bg-slate-950 text-slate-100",
      style: backgroundStyle,
    },
    React.createElement("div", {
      className:
        "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(19,160,249,0.18),transparent_55%),radial-gradient(circle_at_88%_12%,rgba(255,47,156,0.12),transparent_45%)]",
      "aria-hidden": "true",
    }),
    React.createElement(
      "main",
      { className: "relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16" },
      React.createElement(
        "section",
        { className: "space-y-10" },
        React.createElement(
          "div",
          { className: "max-w-3xl space-y-6" },
          React.createElement(
            "span",
            {
              className:
                "inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200",
            },
            React.createElement(LayoutDashboard, { className: "h-3.5 w-3.5" }),
            "Fjolsenbanden Admin"
          ),
          React.createElement(
            "h1",
            { className: "text-4xl font-semibold text-white sm:text-5xl" },
            "Markedsfør Fjolsenbanden med et profesjonelt kontrollrom"
          ),
          React.createElement(
            "p",
            { className: "max-w-2xl text-base text-slate-300" },
            "Adminpanelet samler all merkevarebygging, medlemsinformasjon og sponsoroppfølging. Endringer lagres lokalt, så du kan teste kampanjer før publisering."
          )
        ),
        React.createElement(
          "div",
          { className: "flex flex-wrap gap-3" },
          React.createElement(
            Button,
            {
              size: "lg",
              className:
                "rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-pink-500 px-8 text-base text-slate-950 shadow-[0_18px_38px_rgba(19,160,249,0.45)] hover:from-sky-300 hover:via-sky-400 hover:to-pink-400",
              onClick: () => {
                if (typeof window !== "undefined") {
                  window.location.href = "/admin";
                }
              },
            },
            React.createElement(
              "span",
              { className: "flex items-center gap-2" },
              "Gå til adminpanelet",
              React.createElement(ArrowRight, { className: "h-4 w-4" })
            )
          ),
          React.createElement(
            Button,
            {
              size: "lg",
              variant: "outline",
              className:
                "rounded-2xl border-white/20 bg-white/10 px-8 text-base text-white hover:bg-white/20",
              onClick: () => {
                if (typeof window !== "undefined") {
                  window.open("/admin-dashboard-preview.html", "_blank", "noopener,noreferrer");
                }
              },
            },
            React.createElement(
              "span",
              { className: "flex items-center gap-2" },
              "Se demo",
              React.createElement(ArrowRight, { className: "h-4 w-4" })
            )
          )
        ),
        React.createElement(HeroStats, null)
      ),
      React.createElement(AdminScreenMosaic, null),
      React.createElement(FeatureSection, null),
      React.createElement(ModuleHighlights, null),
      React.createElement(Workflow, null),
      React.createElement(CTASection, null)
    )
  );
}
