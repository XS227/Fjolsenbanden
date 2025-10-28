"use client";

import React from "react";
import {
  ArrowRight,
  Gamepad2,
  Instagram,
  Mail,
  Megaphone,
  Rocket,
  Sparkles,
  Trophy,
  Twitch,
  Users,
  Video,
  Youtube,
} from "lucide-react";

const socialLinks = [
  {
    label: "Twitch",
    href: "https://www.twitch.tv/fjolsenbanden",
    icon: <Twitch className="h-5 w-5" aria-hidden="true" />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@fjolsenbanden",
    icon: <Video className="h-5 w-5" aria-hidden="true" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@fjolsenbanden",
    icon: <Youtube className="h-5 w-5" aria-hidden="true" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/fjolsenbanden",
    icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
  },
] as const;

const stats = [
  { label: "Discord", value: "2 500+" },
  { label: "Twitch", value: "3 200+" },
  { label: "TikTok", value: "4 200+" },
] as const;

const partners = ["Lenovo", "Samsung", "Philips", "Komplett.no"] as const;

const offerCards = [
  {
    icon: <Megaphone className="h-6 w-6 text-cyan-300" aria-hidden="true" />,
    title: "Foredrag",
    description:
      "FjOlsen besøker skoler, idrettslag og e-sportklubber for å snakke om streaming, gaming-kultur og nettvett.",
  },
  {
    icon: <Trophy className="h-6 w-6 text-emerald-300" aria-hidden="true" />,
    title: "Events",
    description:
      "Vi arrangerer gaming-konkurranser for bedrifter, skoler og klubber – både digitalt og fysisk.",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-pink-300" aria-hidden="true" />,
    title: "Unboxing",
    description:
      "Profesjonelle unboxing-videoer som kan brukes i markedsføring og deles med communityet vårt.",
  },
  {
    icon: <Rocket className="h-6 w-6 text-purple-300" aria-hidden="true" />,
    title: "Streamer for hire",
    description:
      "Co-streams, produktlanseringer og kampanjer der FjOlsen løfter budskapet ditt til tusenvis av følgere.",
  },
  {
    icon: <Users className="h-6 w-6 text-sky-300" aria-hidden="true" />,
    title: "Coaching",
    description:
      "1-til-1 coaching med Norges dyktigste Fortnite-spillere – fokus på strategi, samarbeid og trygg nettkultur.",
  },
] as const;

export default function FjolsenbandenHome(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090b2a] via-[#0d1238] to-[#08091f] text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 10% 20%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 90% 10%, rgba(236,72,153,0.35), transparent 45%)",
        }}
      />

      <header className="relative">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 pt-16 lg:flex-row lg:items-center">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm tracking-wide text-cyan-200">
              <Gamepad2 className="h-4 w-4" aria-hidden="true" /> Velkommen til FjOlsenbanden
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Norges mest inkluderende gaming-community
            </h1>
            <p className="text-lg text-slate-200">
              FjOlsenbanden samler over 10&nbsp;000 følgere på tvers av Discord, Twitch, TikTok og YouTube. Vi skaper et trygt
              og positivt miljø der hele familien kan game uten hets eller mobbing.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#live"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black shadow-[0_12px_30px_rgba(34,211,238,0.4)] transition hover:bg-cyan-300"
              >
                Se FjOlsen Live
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#bli-medlem"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Bli medlem
              </a>
            </div>
          </div>
          <div className="relative w-full max-w-xl">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-cyan-500/40 via-transparent to-purple-500/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#10173d] via-[#0f1b4f] to-[#141030] shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.45),transparent_55%)]" />
              <div className="relative flex min-h-[320px] flex-col justify-end gap-6 p-10">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-200">
                  Live på stream
                </span>
                <p className="text-2xl font-semibold text-white">
                  🎥 Se FjOlsen live mens han guider communityet gjennom turneringer, turneringer og samarbeidsprosjekter.
                </p>
                <p className="text-sm text-slate-300">
                  Fellesskap, spilleglede og respekt er alltid i sentrum – uansett om du følger på Twitch, TikTok eller YouTube.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="space-y-28 pb-24">
        <section id="hva-er" className="px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold sm:text-4xl">🎮 Hva er FjOlsenbanden?</h2>
              <p className="text-lg text-slate-200">
                FjOlsenbanden er et raskt voksende gaming-community med over 2&nbsp;500 medlemmer på Discord, 3&nbsp;200+ følgere på
                Twitch og 4&nbsp;200+ på TikTok. Her møtes barn, ungdom og foreldre for å game trygt sammen.
              </p>
              <p className="text-lg text-slate-200">
                Målet vårt er enkelt: å skape et inkluderende miljø der alle kan spille uten hets, mobbing eller negativ adferd.
                FjOlsen legger ned mange timer hver uke på konkurranser, turneringer og aktiviteter – alltid med fellesskap og
                spilleglede i sentrum.
              </p>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg">
                <p className="text-base text-slate-200">
                  🎥 Se videoen til høyre for å møte FjOlsen og bli kjent med communityet!
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/P01NkLOA39A?si=LYD3IVf5SSZrehsJ"
                title="Møt FjOlsen"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full min-h-[280px] w-full"
              />
            </div>
          </div>
        </section>

        <section id="live" className="px-6">
          <div className="mx-auto grid max-w-6xl gap-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#121a4b]/80 via-[#10153b]/80 to-[#0c122d]/80 p-12 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold sm:text-4xl">📈 Følg FjOlsenbanden</h2>
              <p className="text-lg text-slate-200">
                Totalt over 10&nbsp;000 følgere på tvers av alle plattformer! Finn oss der du liker å se gaming-innhold – og bli en del av et hyggelig og støttende fellesskap.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-2xl font-bold text-cyan-300">{stat.value}</p>
                    <p className="text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
                🎥 Se FjOlsen LIVE! Til venstre: Stream-vindu. Til høyre: Chat-feed. 👉 Følg oss her: TikTok · YouTube · Instagram · Twitch
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="relative col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200">
                  🔴 Live preview
                </span>
                <p className="mt-4 text-sm text-slate-300">
                  Stream-vindu – se FjOlsen ta communityet gjennom nye utfordringer og konkurranser.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Chat</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  <li>💬 Lina: «Haha, den bossen var vilt!»</li>
                  <li>💬 Jonas: «Gleder meg til premie-trekningen 🔥»</li>
                  <li>💬 Sara: «Hei fra TikTok 😎»</li>
                  <li>💬 Marius: «Bra lyd i dag!»</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Fellesskap</p>
                <p className="mt-4 text-sm text-slate-200">
                  Vi holder chatten trygg med dedikerte moderatorer og tydelige regler mot hets, mobbing og negativ adferd.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="bli-medlem" className="px-6">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/5 p-12 shadow-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">💬 Bli medlem</h2>
            <p className="mt-4 text-lg text-slate-200">
              Det er gratis å bli med i FjOlsenbanden! Alle kan delta i konkurranser, men for å vinne premier må du være registrert medlem.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.fjolsenbanden.no/medlem/under-18"
                className="inline-flex items-center gap-3 rounded-2xl bg-indigo-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.45)] transition hover:bg-indigo-400"
              >
                🔵 Under 18 år
              </a>
              <a
                href="https://www.fjolsenbanden.no/medlem/over-18"
                className="inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.45)] transition hover:bg-emerald-400"
              >
                🟢 Over 18 år
              </a>
            </div>
          </div>
        </section>

        <section id="samarbeid" className="px-6">
          <div className="mx-auto max-w-6xl space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">🤝 Samarbeidspartnere</h2>
            <p className="text-lg text-slate-200">
              Vi har allerede samarbeidet med flere kjente merkevarer – og vi er alltid på utkikk etter nye partnere som ønsker synlighet mot et engasjert gaming-publikum.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-lg font-semibold tracking-wide text-slate-200"
                >
                  {partner}
                </div>
              ))}
            </div>
            <div className="rounded-[2rem] border border-emerald-400/30 bg-emerald-500/10 p-8 text-slate-100 shadow-lg">
              <p className="text-lg font-semibold">🎯 Ønsker du å synliggjøre din merkevare?</p>
              <p className="mt-2 text-base text-slate-200">
                Ta kontakt for samarbeid! Vi skreddersyr kampanjer som treffer målgruppen din.
              </p>
              <a
                href="#kontakt"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
              >
                📩 Kontakt oss
              </a>
            </div>
          </div>
        </section>

        <section id="andre-tilbud" className="px-6">
          <div className="mx-auto max-w-6xl space-y-8">
            <h2 className="text-3xl font-bold sm:text-4xl">⚡ Andre tilbud</h2>
            <p className="text-lg text-slate-200">
              FjOlsenbanden tilbyr mer enn bare streaming. Vi hjelper deg med alt fra markedsføring til kompetansebygging.
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
              {offerCards.map((offer) => (
                <div key={offer.title} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    {offer.icon}
                  </div>
                  <h3 className="text-2xl font-semibold">{offer.title}</h3>
                  <p className="text-base text-slate-200">{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="kontakt" className="px-6">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#1f2c70] via-[#171f56] to-[#10163a] p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">📬 Kontakt oss</h2>
            <p className="mt-4 text-lg text-slate-200">
              Har du spørsmål, forslag eller ønsker du samarbeid? Vi hører gjerne fra deg.
            </p>
            <a
              href="https://www.fjolsenbanden.no/kontakt"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-black shadow-[0_12px_30px_rgba(34,211,238,0.4)] transition hover:bg-cyan-300"
            >
              <Mail className="h-5 w-5" aria-hidden="true" /> Send oss en melding via kontaktskjemaet
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
