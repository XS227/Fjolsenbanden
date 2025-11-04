import React, { useMemo } from "react";

const WHATS_NEW = [
  "Ukentlige quester med digitale badges og spesialpremier fra våre partnere.",
  "Foreldre får et eget panel med tidsplan, anbefalt skjermtid og aktivitetsvarsler.",
  "Verifiserte veiledere følger hvert oppdrag med fokus på trygg chat og god språkbruk.",
];

const SCHEDULE = [
  {
    label: "Uke 1–2:",
    description: "Quest-board for Minecraft- og Roblox-kvelder. Foreldretester sendes ut.",
  },
  {
    label: "Uke 3:",
    description: "Lansering av familie-turneringer med Vipps-baserte påmeldinger.",
  },
  {
    label: "Uke 4:",
    description: "Nye streaming overlays og sponsoroppdrag live på Twitch.",
  },
];

const PARENT_TIPS = [
  "Sett opp familiens brukere i Vipps-innloggingen for å få riktige varsler.",
  "Planlegg spilltid sammen og velg hvilke quester som passer best denne uken.",
  "Bruk foreldrepanelet til å sende heiarop og emojis direkte inn i barnets quest-feed.",
];

const GAMER_TIPS = [
  "Fullfør minst tre quester i måneden for å låse opp «Quest Master»-badgen. Badgen gir ekstra lodd i månedens premiepott" +
    " og spesielle shoutouts under stream.",
  "Del fremgang på Discord i kanalen \"#quest-board\" for å inspirere andre og få bonuspoeng.",
];

export default function UpdatesPage() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    React.createElement(
      "div",
      {
        className:
          "relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#FFF5F7] via-[#F6F7FF] to-[#ECFEFF] text-slate-900",
      },
      React.createElement(
        "main",
        { className: "mx-auto max-w-5xl px-4 py-16" },
        React.createElement(
          "a",
          {
            className:
              "inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#FF7AD9] shadow-sm ring-1 ring-[#FF7AD9]/20 transition hover:bg-white",
            href: "index.html",
          },
          "← Tilbake til forsiden",
        ),
        React.createElement(
          "header",
          { className: "mt-8 space-y-4 text-center" },
          React.createElement(
            "span",
            {
              className:
                "inline-flex items-center gap-2 rounded-full bg-[#22D3EE]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5E9]",
            },
            "🌟 Oppdatering • Mai 2024",
          ),
          React.createElement(
            "h1",
            { className: "text-4xl font-black leading-tight sm:text-5xl" },
            "Lansering av Fjolsenbanden Quest-board",
          ),
          React.createElement(
            "p",
            { className: "mx-auto max-w-3xl text-base text-slate-600" },
            "Vi gjør spillhverdagen enda enklere for hele familien. Quest-boardet samler ukens aktiviteter, premier og trygghetsinformasjon på ett sted. Her får du full oversikt – uansett om du er forelder, spiller eller sponsor.",
          ),
        ),
        React.createElement(
          "section",
          { className: "mt-12 grid gap-6 md:grid-cols-3" },
          React.createElement(
            "article",
            { className: "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl" },
            React.createElement("h2", { className: "text-xl font-bold text-slate-800" }, "Hva er nytt?"),
            React.createElement(
              "ul",
              { className: "mt-4 space-y-3 text-sm text-slate-600" },
              WHATS_NEW.map((item) =>
                React.createElement(
                  "li",
                  { key: item, className: "flex items-start gap-3" },
                  React.createElement("span", { className: "mt-1 text-[#FF7AD9]" }, "✔"),
                  React.createElement("span", null, item),
                ),
              ),
            ),
          ),
          React.createElement(
            "article",
            { className: "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl" },
            React.createElement("h2", { className: "text-xl font-bold text-slate-800" }, "Tidsplan"),
            React.createElement(
              "ul",
              { className: "mt-4 space-y-3 text-sm text-slate-600" },
              SCHEDULE.map((item) =>
                React.createElement(
                  "li",
                  { key: item.label },
                  React.createElement("strong", null, item.label, " "),
                  item.description,
                ),
              ),
            ),
          ),
          React.createElement(
            "article",
            { className: "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl" },
            React.createElement("h2", { className: "text-xl font-bold text-slate-800" }, "Hvordan bli med"),
            React.createElement(
              "p",
              { className: "mt-4 text-sm text-slate-600" },
              "Logg inn via Vipps, besøk «Quest-board» i dashboardet og velg ukens oppdrag. Spillere får automatisk badges og trekker premie-lodd når oppdraget er fullført. Foreldre kan godkjenne deltakelse og få varsler om neste aktivitet rett i e-post og Discord.",
            ),
            React.createElement(
              "a",
              {
                className:
                  "mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#34D399] to-[#22D3EE] px-6 py-3 text-sm font-semibold text-white shadow transition hover:from-[#22C55E] hover:to-[#0EA5E9]",
                href: "index.html#medlem",
              },
              "Meld inn familien nå",
              React.createElement("span", { "aria-hidden": "true" }, "→"),
            ),
          ),
        ),
        React.createElement(
          "section",
          { className: "mt-16 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl" },
          React.createElement("h2", { className: "text-2xl font-extrabold text-slate-800" }, "Forberedelser for foreldre"),
          React.createElement(
            "div",
            { className: "mt-4 grid gap-6 md:grid-cols-2" },
            React.createElement(
              "ul",
              { className: "space-y-3 text-sm text-slate-600" },
              PARENT_TIPS.map((tip) =>
                React.createElement(
                  "li",
                  { key: tip, className: "flex items-start gap-3" },
                  React.createElement("span", { className: "mt-1 text-[#22D3EE]" }, "💡"),
                  React.createElement("span", null, tip),
                ),
              ),
            ),
            React.createElement(
              "div",
              {
                className:
                  "rounded-3xl bg-gradient-to-br from-[#FFF5F7] via-[#E0EAFF] to-[#F8F9FF] p-6 text-sm text-slate-600 shadow-inner",
              },
              React.createElement("h3", { className: "text-lg font-semibold text-slate-800" }, "Tips til gamerne"),
              GAMER_TIPS.map((tip, index) =>
                React.createElement(
                  "p",
                  { key: index, className: "mt-3" },
                  tip,
                ),
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        "footer",
        { className: "border-t border-white/40 bg-white/70 py-8 text-center text-xs text-slate-500" },
        "© ",
        currentYear,
        " Fjolsenbanden – Oppdateringer og nyheter.",
      ),
    ),
  );
}
