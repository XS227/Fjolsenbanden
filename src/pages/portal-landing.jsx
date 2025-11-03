import React from "react";
import {
  ArrowRight,
  Check,
  LineChart,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sellingPoints = [
  {
    title: "Sett opp på minutter",
    description:
      "Vi leverer ferdig innhold, Vipps-integrasjon og medlemsflyt slik at spilleren er live før neste turnering.",
    icon: Rocket,
  },
  {
    title: "Trygghet med Vipps",
    description:
      "Foreldre verifiserer barna sine og kjøper medlemskap direkte i portalen – uten ekstra utvikling.",
    icon: ShieldCheck,
  },
  {
    title: "Design som matcher profilen",
    description:
      "Velg mellom forhåndslagde temaer eller bestill deres egne farger, bakgrunner og innholdskort.",
    icon: Palette,
  },
];

const integrationSteps = [
  {
    title: "Del logo og farger",
    description: "Vi bygger en versjon av Fjolsenbandens portal med partnerens profil og domene.",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    title: "Aktiver medlemskap",
    description: "Vipps-login, premier og aktiviteter er allerede klare – vi legger til partnerens tekst.",
    accent: "from-violet-400 via-fuchsia-500 to-pink-500",
  },
  {
    title: "Lanser og mål",
    description: "Publiser portalen og følg med på medlemmer, salg og engasjement i admin-panelet.",
    accent: "from-emerald-400 via-teal-500 to-cyan-500",
  },
];

const themeOptions = [
  {
    name: "Nordlys",
    description: "Friske blå- og grønn-toner inspirert av nordisk e-sport.",
    gradient: "from-sky-500/80 via-cyan-500/70 to-emerald-500/80",
  },
  {
    name: "Night Mode",
    description: "Mørk bakgrunn med neonaksenter for streamere og pro-lag.",
    gradient: "from-slate-900/90 via-indigo-800/80 to-fuchsia-700/80",
  },
  {
    name: "Familievennlig",
    description: "Lysere pastellfarger for klubber og fritidsordninger.",
    gradient: "from-amber-200/80 via-rose-200/80 to-sky-200/80",
  },
];

const highlights = [
  {
    title: "Ferdige medlemsmoduler",
    description: "Oppfølging av premier, aktivitetshjul og live trekkninger er inkludert.",
    icon: Sparkles,
  },
  {
    title: "Rapporter og innsikt",
    description: "Se antall medlemmer, åpninger og konverteringer i sanntid.",
    icon: LineChart,
  },
  {
    title: "Bygget for samarbeid",
    description: "Del portalen med klubber, sponsorer og skoler uten å skrive kode.",
    icon: Users,
  },
];

export default function PortalLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 text-center md:py-20">
          <div className="mx-auto w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
            Fjolsenbanden Portal
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            En ferdig salgs-side for spillere og lag på eget domene
          </h1>
          <p className="mx-auto max-w-3xl text-base text-slate-300 sm:text-lg">
            Vis frem streams, premier og medlemskap i en portal som er klar «på en, to, tre». Vi håndterer teknikken – partneren får et komplett landingpage-oppsett som konverterer nye medlemmer.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="rounded-full px-7">
              Book en demo
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-7">
              Se eksempelportal
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
        <section className="grid gap-6 md:grid-cols-3">
          {sellingPoints.map((point) => (
            <Card key={point.title} className="h-full bg-white/5 text-left backdrop-blur">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-lg text-white">{point.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-300">{point.description}</CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-white/5 text-left backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Tre steg til lansering</CardTitle>
              <p className="text-sm text-slate-300">
                Fra ferdig innhold til publisering. Vi bistår partneren under hele prosessen.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              {integrationSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${step.accent} opacity-40`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 text-sm font-semibold text-sky-200">
                    <span className="grid h-9 w-9 place-content-center rounded-full border border-white/40 bg-white/10 text-base">
                      {index + 1}
                    </span>
                    {step.title}
                  </div>
                  <p className="mt-3 text-sm text-slate-200">{step.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between bg-white/5 text-left backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Velg tema</CardTitle>
              <p className="text-sm text-slate-300">
                Standardoppsettet kan skreddersys. Start med et tema og finjuster for klubben eller streameren.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {themeOptions.map((theme) => (
                <div
                  key={theme.name}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div
                    className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${theme.gradient}`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-white">{theme.name}</h3>
                      <p className="text-sm text-slate-200">{theme.description}</p>
                    </div>
                    <Palette className="h-5 w-5 text-white/80" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="h-full bg-white/5 text-left backdrop-blur">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pink-500/10 text-pink-200">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-lg text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <p>{item.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-200/70">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Deles på portal, admin og mobil.
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-emerald-500/20 p-10 text-center shadow-[0_24px_60px_rgba(15,94,255,0.18)]">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-3xl font-semibold text-white">Klar for å lansere deres versjon av Fjolsenbanden?</h2>
            <p className="text-base text-slate-100/80">
              Vi hjelper streamere, klubber og organisasjoner med å få en trygg portal med medlemssalg, premier og aktiviteter.
              Send oss en melding, så er dere i gang i løpet av få dager.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" className="rounded-full px-7">
                Avtal et møte
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-7">
                Kontakt oss
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Fjolsenbanden. Del portalen, behold magien.
      </footer>
    </div>
  );
}
