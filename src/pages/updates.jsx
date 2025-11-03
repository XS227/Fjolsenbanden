import React, { useEffect, useMemo, useState } from "react";

const NAV_LINKS = [
  { href: "updates.html", label: "Oppdateringer" },
  { href: "index.html#medlem", label: "Medlemskap" },
  { href: "index.html#premier", label: "Premier" },
  { href: "index.html#aktiviteter", label: "Aktiviteter" },
  { href: "index.html#foreldre", label: "Foreldre" },
  { href: "index.html#community", label: "Community" },
  { href: "index.html#tor-martin", label: "Tor Martin" },
  { href: "index.html#sponsor", label: "Sponsorer" },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const body = document.body;
    if (mobileMenuOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = () => setMobileMenuOpen((open) => !open);
  const closeMenu = () => setMobileMenuOpen(false);

  const menuButtonProps = {
    "aria-controls": "mobile-menu-panel",
    "aria-expanded": mobileMenuOpen ? "true" : "false",
  };

  return (
    React.createElement(
      "div",
      {
        className:
          "relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#FFF5F7] via-[#F6F7FF] to-[#ECFEFF] text-slate-900",
      },
      React.createElement(
        "header",
        { className: "sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur" },
        React.createElement(
          "div",
          { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4" },
          React.createElement(
            "a",
            {
              className: "flex items-center gap-3",
              href: "index.html",
              "aria-label": "Gå til forsiden",
            },
            React.createElement(
              "div",
              {
                className:
                  "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-lg font-extrabold text-white shadow-lg",
              },
              "FB",
            ),
            React.createElement(
              "div",
              { className: "leading-tight" },
              React.createElement(
                "span",
                {
                  className: "block text-xs uppercase tracking-[0.3em] text-[#FF7AD9]",
                },
                "Fjolsenbanden",
              ),
              React.createElement(
                "span",
                { className: "text-base font-semibold" },
                "Spillglede for hele familien",
              ),
            ),
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-3" },
            React.createElement(
              "nav",
              { className: "hidden items-center gap-4 text-sm font-semibold text-slate-600 md:flex" },
              NAV_LINKS.map((link) =>
                React.createElement(
                  "a",
                  {
                    key: link.label,
                    className: "rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[#FF7AD9]",
                    href: link.href,
                  },
                  link.label,
                ),
              ),
            ),
            React.createElement(
              "a",
              {
                className:
                  "hidden rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C] sm:inline-flex",
                href: "index.html#foreldre",
              },
              "Logg inn med Vipps",
            ),
            React.createElement(
              "button",
              Object.assign(
                {
                  type: "button",
                  className:
                    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#FF7AD9]/30 bg-white text-[#FF7AD9] shadow-sm transition hover:border-[#FF7AD9] md:hidden",
                  onClick: toggleMenu,
                },
                menuButtonProps,
              ),
              React.createElement("span", { className: "sr-only" }, "Åpne meny"),
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "h-5 w-5" },
                React.createElement("path", {
                  d: "M4 7.5h16M4 12h16M4 16.5h16",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                }),
              ),
            ),
          ),
        ),
      ),
      React.createElement(
        "div",
        {
          id: "mobile-menu-panel",
          className: `fixed inset-0 z-50 md:hidden ${mobileMenuOpen ? "" : "hidden"}`,
          role: "dialog",
          "aria-modal": mobileMenuOpen ? "true" : "false",
        },
        React.createElement("div", {
          className: "absolute inset-0 bg-slate-900/50",
          onClick: closeMenu,
          "aria-hidden": "true",
        }),
        React.createElement(
          "nav",
          {
            className:
              "absolute left-1/2 top-24 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 space-y-4 rounded-3xl bg-white/95 p-6 shadow-2xl",
          },
          React.createElement(
            "div",
            { className: "flex items-center justify-between" },
            React.createElement(
              "div",
              { className: "flex items-center gap-3" },
              React.createElement(
                "div",
                {
                  className:
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-sm font-extrabold text-white",
                },
                "FB",
              ),
              React.createElement(
                "span",
                { className: "text-sm font-semibold text-slate-700" },
                "Meny",
              ),
            ),
            React.createElement(
              "button",
              {
                type: "button",
                className:
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FF7AD9]/30 text-[#FF7AD9] transition hover:border-[#FF7AD9]",
                onClick: closeMenu,
              },
              React.createElement("span", { className: "sr-only" }, "Lukk meny"),
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", className: "h-4 w-4" },
                React.createElement("path", {
                  d: "M6 6l12 12M18 6L6 18",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                }),
              ),
            ),
          ),
          React.createElement(
            "div",
            { className: "space-y-2 text-sm font-semibold text-slate-600" },
            NAV_LINKS.map((link) =>
              React.createElement(
                "a",
                {
                  key: link.label,
                  className:
                    "flex items-center justify-between rounded-2xl border border-transparent bg-slate-50 px-4 py-3 transition hover:border-[#FF7AD9]/40 hover:bg-white hover:text-[#FF7AD9]",
                  href: link.href,
                  onClick: closeMenu,
                },
                link.label,
                React.createElement("span", { "aria-hidden": "true" }, "→"),
              ),
            ),
          ),
          React.createElement(
            "a",
            {
              className:
                "inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]",
              href: "index.html#foreldre",
              onClick: closeMenu,
            },
            "Logg inn med Vipps",
          ),
        ),
      ),
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
      React.createElement(
        "div",
        {
          className:
            "fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-white/90 backdrop-blur md:hidden",
        },
        React.createElement(
          "div",
          { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-3" },
          React.createElement(
            "a",
            { href: "#top", className: "flex items-center gap-2", onClick: closeMenu },
            React.createElement(
              "div",
              {
                className:
                  "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-sm font-extrabold text-white",
              },
              "FB",
            ),
            React.createElement(
              "span",
              {
                className:
                  "text-xs font-semibold uppercase tracking-widest text-[#FF7AD9]",
              },
              "Fjolsenbanden",
            ),
          ),
          React.createElement(
            "div",
            { className: "flex items-center gap-2" },
            React.createElement(
              "a",
              {
                className:
                  "inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-4 text-xs font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]",
                href: "index.html#foreldre",
                onClick: closeMenu,
              },
              "Vipps",
            ),
            React.createElement(
              "button",
              Object.assign(
                {
                  type: "button",
                  className:
                    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FF7AD9]/30 bg-white text-[#FF7AD9] shadow-sm transition hover:border-[#FF7AD9]",
                  onClick: toggleMenu,
                },
                menuButtonProps,
              ),
              React.createElement("span", { className: "sr-only" }, "Åpne meny"),
              React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "h-5 w-5" },
                React.createElement("path", {
                  d: "M4 7.5h16M4 12h16M4 16.5h16",
                  stroke: "currentColor",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
