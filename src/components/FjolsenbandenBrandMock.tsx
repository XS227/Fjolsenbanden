"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Facebook,
  Menu,
  Play,
  ShieldCheck,
  Smartphone,
  Trophy,
  Twitch,
  Users,
  X,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BRAND = {
  navy: "#041149",
  navyDeep: "#0B1230",
  blue: "#13A0F9",
  blueSoft: "#9BD9FF",
  pink: "#FF2F9C",
  pinkSoft: "#FF83CA",
  navy60: "#293660",
};

const SECTION_BACKGROUNDS = {
  hero: `linear-gradient(160deg, ${BRAND.navy} 0%, ${BRAND.navyDeep} 100%)`,
  membership: `linear-gradient(160deg, rgba(19,160,249,0.25) 0%, rgba(4,17,73,0.92) 100%)`,
  rewards: `linear-gradient(160deg, rgba(255,47,156,0.3) 0%, rgba(64,6,48,0.92) 100%)`,
  parents: `linear-gradient(160deg, rgba(155,217,255,0.28) 0%, rgba(4,25,73,0.9) 100%)`,
};

export default function FjolsenbandenBrandMock() {
  const [menu, setMenu] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const navItems = useMemo(
    () => ["Live", "Premier", "Medlemskap", "Foreldre", "Community", "Sponsorer"],
    [],
  );

  const toggleMenu = () => setMenu((value) => !value);
  const closeMenu = () => setMenu(false);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: `radial-gradient(circle at 20% -10%, ${BRAND.blueSoft}22, transparent 60%), ${BRAND.navyDeep}`,
        fontFamily:
          '"Segoe UI", "Inter", system-ui, -apple-system, Roboto, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      }}
    >
      <header
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur"
        style={{ background: "rgba(4, 17, 73, 0.7)" }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.svg" alt="Fjolsenbanden" className="hidden h-8 sm:block" />
            <div
              className="grid h-10 w-10 place-items-center rounded-xl font-black sm:hidden"
              style={{ background: BRAND.blue, color: BRAND.navy }}
            >
              FB
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="transition hover:text-white/80">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              className="rounded-full px-4 py-2 text-black shadow"
              style={{ background: BRAND.pink, boxShadow: `0 10px 32px ${BRAND.pink}45` }}
            >
              Logg inn med Vipps
            </Button>
            <button
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Åpne meny"
              aria-expanded={menu}
              aria-controls="mobilmeny"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu ? (
          <div
            id="mobilmeny"
            className="space-y-2 border-t border-white/10 px-4 py-3 md:hidden"
            style={{ background: "rgba(4, 17, 73, 0.85)" }}
          >
            {navItems.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="block py-2"
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <section className="px-4 py-12" id="live" style={{ background: SECTION_BACKGROUNDS.hero }}>
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <h1
                className="text-4xl font-black leading-tight sm:text-5xl"
                style={{
                  fontFamily:
                    '"Impact", "Haettenschweiler", "Arial Black", "Segoe UI", sans-serif',
                  letterSpacing: "0.08em",
                }}
              >
                FJOLSENBANDEN
              </h1>
              <p className="mt-3 max-w-xl text-sm text-zinc-100 sm:text-base">
                Spillglede for hele familien. Trygge streams, turneringer og premier – foreldre verifiserer med Vipps.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="rounded-full px-6 py-6 text-black shadow-lg"
                    style={{ background: BRAND.blue, boxShadow: `0 18px 32px ${BRAND.blue}40` }}
                  >
                    Se neste stream
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="rounded-full px-6 py-6 text-black shadow-lg"
                    style={{ background: BRAND.pink, boxShadow: `0 18px 32px ${BRAND.pink}35` }}
                  >
                    Meld inn barn
                  </Button>
                </motion.div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                <Stat num="3.2k" label="Twitch" />
                <Stat num="4.2k" label="TikTok" />
                <Stat num="2.5k" label="Discord" />
              </div>
            </div>
            <div className="relative">
              <motion.div
                className="absolute -inset-6 rounded-3xl blur-2xl"
                style={{ background: `conic-gradient(from 120deg, ${BRAND.blue}, ${BRAND.pink})`, opacity: 0.28 }}
                animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.4, 0.25] }}
                transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity }}
              />
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/15 bg-black/50 shadow-2xl">
                <motion.div
                  className="absolute left-3 top-3 px-3 py-1 text-[11px] font-semibold"
                  style={{
                    background: BRAND.pink,
                    color: "#000",
                    borderRadius: 999,
                    boxShadow: `0 0 24px ${BRAND.pink}7a`,
                  }}
                  animate={prefersReducedMotion ? undefined : { opacity: [1, 0.6, 1] }}
                  transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 1.4 }}
                >
                  🔴 LIVE
                </motion.div>
                <motion.img
                  src="/assets/mascot.svg"
                  alt="Fjolsenbanden maskot"
                  className="absolute bottom-4 right-4 w-28 opacity-90 sm:w-36"
                  initial={prefersReducedMotion ? undefined : { y: 6 }}
                  animate={prefersReducedMotion ? undefined : { y: [6, -4, 6] }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                <div className="grid h-full w-full place-items-center text-zinc-300">
                  <Play className="h-12 w-12" style={{ color: BRAND.blue }} />
                  <p className="mt-2 text-xs opacity-80">1‑min forhåndsvisning – Twitch/YouTube</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Pill icon={<Twitch className="h-4 w-4 text-purple-400" />} label="Se på Twitch" />
                <Pill icon={<Youtube className="h-4 w-4 text-red-500" />} label="Se på YouTube" />
                <Pill icon={<Smartphone className="h-4 w-4 text-pink-300" />} label="Se på TikTok" />
                <Pill icon={<Facebook className="h-4 w-4 text-blue-500" />} label="Facebook Gaming" />
              </div>
            </div>
          </div>
        </section>

        <section id="medlemskap" className="px-4 py-12" style={{ background: SECTION_BACKGROUNDS.membership }}>
          <div className="mx-auto max-w-7xl">
            <h2
              className="mb-6 text-2xl font-bold"
              style={{ fontFamily: '"Luckiest Guy", cursive' }}
            >
              Medlemskap
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Tier
                title="Gratis"
                price="0 kr"
                bullets={["Discord & streams", "Ukentlige events", "Foreldre‑verifisering"]}
                accent={BRAND.navy60}
              />
              <Tier
                title="Premie"
                price="49 kr/mnd"
                bullets={["Vinne premier", "Ekstra konkurranser", "Prioritert support"]}
                accent={BRAND.blue}
                hot
              />
              <Tier
                title="Sponsor"
                price="299 kr/mnd"
                bullets={["Synlighet på nettside/stream", "Logo‑vegg", "VIP‑events"]}
                accent={BRAND.pink}
              />
            </div>
          </div>
        </section>

        <section id="premier" className="px-4 py-12" style={{ background: SECTION_BACKGROUNDS.rewards }}>
          <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
            <div>
              <h2
                className="mb-2 text-2xl font-bold"
                style={{ fontFamily: '"Luckiest Guy", cursive' }}
              >
                Premier & trekninger
              </h2>
              <ul className="space-y-2 text-sm text-zinc-100">
                {["Ukentlig quiz + trekning", "Månedlig hovedpremie", "Sesongfinale med ekstra gevinster"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="rounded-2xl border-white/10 bg-black/30">
              <CardContent className="grid gap-4 p-6 text-center sm:grid-cols-3">
                {[
                  { brand: "Lenovo", item: "Legion headset" },
                  { brand: "Samsung", item: "Odyssey 27\"" },
                  { brand: "Philips", item: "Hue startpakke" },
                ].map((prize) => (
                  <div key={prize.brand} className="rounded-xl border border-white/10 p-4">
                    <div className="text-xs uppercase tracking-wide text-zinc-400">Partner</div>
                    <div className="font-bold">{prize.brand}</div>
                    <div className="mt-1 text-sm text-zinc-200">{prize.item}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="foreldre" className="px-4 py-12" style={{ background: SECTION_BACKGROUNDS.parents }}>
          <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2">
            <Card className="rounded-2xl border-white/10 bg-black/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" /> Foreldre‑innmelding
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-200">
                <p>
                  Forelder verifiserer seg trygt med Vipps. Vi henter navn og fødselsdato automatisk. Legg inn barnets info –
                  ferdig.
                </p>
                <div className="flex gap-3">
                  <Button className="rounded-full text-black" style={{ background: BRAND.pink }}>
                    Logg inn med Vipps
                  </Button>
                  <Button variant="outline" className="rounded-full border-white/20 text-white">
                    Les personvern
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-white/10 bg-black/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Community
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 text-center">
                <Stat num="3.2k" label="Twitch" />
                <Stat num="4.2k" label="TikTok" />
                <Stat num="2.5k" label="Discord" />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#020a27]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-zinc-300 md:grid-cols-3">
          <div>
            <div className="font-semibold mb-2">Fjolsenbanden</div>
            <p>Trygge, barnevennlige streams og aktiviteter. Vipps‑verifisering for foreldre.</p>
          </div>
          <div>
            <div className="font-semibold mb-2">Lenker</div>
            <ul className="space-y-2">
              <li>
                <a href="#live" className="hover:underline">
                  Live
                </a>
              </li>
              <li>
                <a href="#medlemskap" className="hover:underline">
                  Medlemskap
                </a>
              </li>
              <li>
                <a href="#premier" className="hover:underline">
                  Premier
                </a>
              </li>
              <li>
                <a href="#foreldre" className="hover:underline">
                  Foreldre
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Kontakt</div>
            <p>partner@fjolsenbanden.no</p>
          </div>
        </div>
        <div className="pb-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} Fjolsenbanden
        </div>
      </footer>
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-center">
      <div className="text-2xl font-extrabold" style={{ color: BRAND.blue }}>
        {num}
      </div>
      <div className="text-xs text-zinc-300">{label}</div>
    </div>
  );
}

function Tier({
  title,
  price,
  bullets,
  accent,
  hot,
}: {
  title: string;
  price: string;
  bullets: string[];
  accent: string;
  hot?: boolean;
}) {
  return (
    <Card className="rounded-2xl border-white/10 bg-black/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: accent }} />
          {title}
          {hot ? (
            <span className="ml-2 rounded-full px-2 py-0.5 text-[10px]" style={{ background: BRAND.pink, color: "black" }}>
              MEST VALGT
            </span>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-3xl font-extrabold" style={{ color: accent }}>
          {price}
        </div>
        <ul className="space-y-2 text-sm text-zinc-200">
          {bullets.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              {item}
            </li>
          ))}
        </ul>
        <Button className="w-full rounded-full text-black" style={{ background: accent }}>
          Velg
        </Button>
      </CardContent>
    </Card>
  );
}
