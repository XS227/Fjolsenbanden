"use client";

import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  Facebook,
  Gift,
  Menu,
  MessageCircle,
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
import type { LucideIcon } from "lucide-react";

type PlatformLink = {
  icon: ReactNode;
  label: string;
  href: string;
};

type MembershipTier = {
  title: string;
  price: string;
  color: "green" | "cyan" | "amber";
  features: readonly string[];
};

type Stat = {
  title: string;
  value: string;
};

type Prize = {
  brand: string;
  item: string;
};

const navLinks = [
  { name: "Hjem", href: "#" },
  { name: "Live", href: "#live" },
  { name: "Premier", href: "#premier" },
  { name: "Medlemskap", href: "#medlemskap" },
  { name: "Foreldre", href: "#foreldre" },
  { name: "Sponsorer", href: "#sponsorer" },
] as const;

const platformLinks: readonly PlatformLink[] = [
  {
    icon: <Twitch className="h-5 w-5 text-purple-500" />,
    label: "Twitch",
    href: "https://www.twitch.tv/fjolsenbanden",
  },
  {
    icon: <Youtube className="h-5 w-5 text-red-500" />,
    label: "YouTube",
    href: "https://youtube.com/@fjolsenbanden",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-pink-500" />,
    label: "TikTok",
    href: "https://www.tiktok.com/@fjolsenbanden",
  },
  {
    icon: <Facebook className="h-5 w-5 text-blue-500" />,
    label: "Facebook Gaming",
    href: "https://www.facebook.com/fjolsenbanden",
  },
] as const;

const membershipTiers: readonly MembershipTier[] = [
  {
    title: "Gratis",
    price: "0 kr/mnd",
    color: "green",
    features: ["Tilgang til Discord", "Ukentlige streams", "Felles events"],
  },
  {
    title: "Premie",
    price: "49 kr/mnd",
    color: "cyan",
    features: ["Alle Gratis-tilbud", "Deltakelse i premier", "Eksklusive quests"],
  },
  {
    title: "Sponsor",
    price: "299 kr/mnd",
    color: "amber",
    features: ["Alle Premie-tilbud", "Merkevare-synlighet", "VIP support", "Egne events"],
  },
] as const;

const stats: readonly Stat[] = [
  { title: "Twitch følgere", value: "3.2k" },
  { title: "TikTok følgere", value: "4.2k" },
  { title: "Discord medlemmer", value: "2.5k" },
  { title: "Live seere", value: "50+" },
] as const;

const prizes: readonly Prize[] = [
  { brand: "Lenovo", item: "Legion gaming headset" },
  { brand: "Samsung", item: "Odyssey 27\" skjerm" },
  { brand: "Philips", item: "Hue startpakke" },
] as const;

const sponsors = ["Lenovo", "Samsung", "Philips", "NKI", "Microsoft"] as const;

const demoChat = [
  { user: "Lina", message: "Haha, den bossen var vilt!" },
  { user: "Jonas", message: "Gleder meg til premie-trekningen 🔥" },
  { user: "Sara", message: "Hei fra TikTok 😎" },
  { user: "Marius", message: "Bra lyd i dag!" },
] as const;

export default function FjolsenbandenHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const [previewCountdown, setPreviewCountdown] = useState(60);

  useEffect(() => {
    if (unmuted) {
      return undefined;
    }

    if (previewCountdown <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setPreviewCountdown((prev: number) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [previewCountdown, unmuted]);

  const scrollToAnchor = (selector: string) => {
    if (typeof window === "undefined") {
      return;
    }

    const anchor = document.querySelector(selector);

    if (anchor instanceof HTMLElement) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0e0b1a] via-[#151f2c] to-[#0e0b1a] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,206,255,0.2), transparent 60%)",
        }}
      />

      <nav className="relative z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-content-center rounded-xl bg-[#00CFFF] font-bold text-black">
            FB
          </div>
          <span className="hidden text-lg font-semibold sm:block">Fjolsenbanden</span>
        </div>
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a className="transition-colors duration-150 hover:text-[#00CFFF]" href={link.href}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setMenuOpen((prev: boolean) => !prev)}
          className="rounded-md p-2 transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {menuOpen ? (
          <ul className="absolute right-4 top-full mt-2 flex flex-col gap-3 rounded-xl border border-white/10 bg-[#1f2940] p-4 text-sm shadow-lg transition md:hidden">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block rounded-md px-4 py-2 transition hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>

      <section className="mt-6 space-y-6 px-6 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Spill glede for hele familien med <span className="text-[#00CFFF]">Fjolsenbanden</span>
        </h1>
        <p className="mx-auto max-w-3xl text-base text-zinc-300 sm:text-lg">
          Trygge streams, ukentlige turneringer og en leken verden for barn og unge. Foreldre logger inn via Vipps for
          enkel, trygg verifisering.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-[#00CFFF] px-6 text-black hover:bg-[#00bcd4]"
            onClick={() => scrollToAnchor("#medlemskap")}
          >
            Meld inn barn
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 px-6 hover:bg-white/10"
            onClick={() => scrollToAnchor("#live")}
          >
            Se neste stream
          </Button>
        </div>
        <div className="mt-4 flex justify-center gap-6 text-sm text-zinc-400">
          <span>3200+ følgere på Twitch</span>
          <span>4200+ følgere på TikTok</span>
          <span>2500+ medlemmer i Discord</span>
        </div>
      </section>

      <section id="live" className="relative mt-12 px-6">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-4 py-1 text-xs font-semibold text-white shadow animate-pulse">
                🔴 LIVE
              </span>
              <iframe
                src={`https://player.twitch.tv/?channel=fjolsenbanden&parent=fjolsenbanden.setaei.com&muted=${!unmuted}`}
                title="Fjolsenbanden Twitch Player"
                allowFullScreen
                className="aspect-video w-full bg-black"
              />
              {!unmuted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 p-6 text-center">
                  <Play className="h-12 w-12 text-[#00CFFF]" />
                  <p className="text-sm text-zinc-300">1-minutt forhåndsvisning – {previewCountdown}s igjen</p>
                  <Button
                    size="lg"
                    className="rounded-full bg-[#00CFFF] px-6 text-black hover:bg-[#00bcd4]"
                    onClick={() => setUnmuted(true)}
                  >
                    Se full stream
                  </Button>
                  <div className="flex gap-3 text-xs text-zinc-400">
                    <span>
                      eller fortsett på
                      <a
                        href="https://www.twitch.tv/fjolsenbanden"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-[#00CFFF]"
                      >
                        Twitch
                      </a>
                    </span>
                    <span>|</span>
                    <span>
                      <a
                        href="https://youtube.com/@fjolsenbanden"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00CFFF]"
                      >
                        YouTube
                      </a>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {platformLinks.map(({ icon, label, href }) => (
                <React.Fragment key={label}>
                  <PlatformButton icon={icon} label={label} href={href} />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex max-h-[640px] flex-col rounded-2xl border border-white/10 bg-[#1f2940] p-4">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-cyan-300">
              <MessageCircle className="h-4 w-4" /> Live chat
            </h3>
            <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
              {demoChat.map((chat) => (
                <div key={chat.user} className="rounded-lg bg-white/5 px-3 py-2">
                  <span className="mr-2 font-semibold text-cyan-300">{chat.user}</span>
                  <span className="text-zinc-200">{chat.message}</span>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Skriv en kommentar..."
              className="mt-3 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-[#00CFFF]"
            />
          </div>
        </div>
      </section>

      <section id="medlemskap" className="mt-20 px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">Velg ditt medlemskap</h2>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          Bli med i Fjolsenbanden og lås opp premier, turneringer og unike perks. Foreldre verifiserer via Vipps.
        </p>
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {membershipTiers.map(({ title, price, color, features }) => (
            <React.Fragment key={title}>
              <MembershipCard title={title} price={price} color={color} features={features} />
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="mt-20 px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">Et levende community</h2>
        <p className="mx-auto mb-8 max-w-xl text-zinc-300">
          Fjolsenbanden vokser hver dag. Se hvor mange vi er og bli en del av eventyret!
        </p>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-4">
          {stats.map(({ title, value }) => (
            <React.Fragment key={title}>
              <StatCard title={title} value={value} Icon={Users} />
            </React.Fragment>
          ))}
        </div>
      </section>

      <section id="premier" className="mt-20 px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">Premier &amp; Sponsorer</h2>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          Vi samarbeider med ledende merkevarer for å gi deg fantastiske premier. Hver måned trekker vi nye vinnere!
        </p>
        <div className="mx-auto mb-10 grid max-w-7xl gap-8 md:grid-cols-3">
          {prizes.map(({ brand, item }) => (
            <React.Fragment key={brand}>
              <PrizeCard brand={brand} item={item} />
            </React.Fragment>
          ))}
        </div>
        <div id="sponsorer" className="flex flex-wrap justify-center gap-6">
          {sponsors.map((name) => (
            <span
              key={name}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <section id="foreldre" className="mt-20 grid gap-10 px-6 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Informasjon til foreldre</h2>
          <p className="text-zinc-300">
            Som forelder kan du stole på Fjolsenbanden. Vi bruker Vipps for å verifisere alder og innhente samtykke. Ditt
            barn kan trygt delta i streams, premier og konkurranser – alt innenfor trygge rammer.
          </p>
          <Button size="lg" className="rounded-full bg-[#00CFFF] px-6 text-black hover:bg-[#00bcd4]">
            Logg inn med Vipps
          </Button>
        </div>
        <Card className="rounded-2xl border border-white/10 bg-[#1f2940]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-300">
              <ShieldCheck className="h-6 w-6" /> Trygt og sikkert
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-300">
            <p>Vipps-innlogging sikrer at voksne verifiserer barna sine.</p>
            <p>Alle data lagres trygt og brukes kun til medlemsadministrasjon.</p>
            <p>Du har full oversikt over medlemskap og premier via dashbordet.</p>
          </CardContent>
        </Card>
      </section>

      <footer className="mt-20 border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Fjolsenbanden. Alle rettigheter reservert.
      </footer>
    </div>
  );
}

function PlatformButton({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex transform items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm transition duration-200 hover:-translate-y-1 hover:bg-white/20 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00CFFF] active:scale-95"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function MembershipCard({
  title,
  price,
  color,
  features,
}: {
  title: string;
  price: string;
  color: "green" | "cyan" | "amber";
  features: readonly string[];
}) {
  const colorClass = (tierColor: "green" | "cyan" | "amber") => {
    switch (tierColor) {
      case "green":
        return "border-green-400/40 ring-green-400/50";
      case "cyan":
        return "border-cyan-400/40 ring-cyan-400/50";
      case "amber":
        return "border-amber-400/40 ring-amber-400/50";
      default:
        return "";
    }
  };

  return (
    <Card
      className={`rounded-2xl border bg-[#1f2940] shadow-lg transition-transform hover:-translate-y-1 ${colorClass(
        color,
      )}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Gift className="h-6 w-6" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-white">{price}</div>
        <ul className="space-y-2 text-sm text-zinc-300">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[#00CFFF]" /> {feature}
            </li>
          ))}
        </ul>
        <Button size="lg" className="w-full rounded-full bg-[#00CFFF] text-black hover:bg-[#00bcd4]">
          Velg
        </Button>
      </CardContent>
    </Card>
  );
}

function StatCard({ title, value, Icon }: { title: string; value: string; Icon: LucideIcon }) {
  return (
    <div className="flex flex-col items-center space-y-3 rounded-2xl border border-white/10 bg-[#1f2940] p-6 text-center shadow-md">
      <Icon className="h-8 w-8 text-[#00CFFF]" />
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="text-sm text-zinc-300">{title}</div>
    </div>
  );
}

function PrizeCard({ brand, item }: { brand: string; item: string }) {
  return (
    <Card className="rounded-2xl border border-white/10 bg-[#1f2940] shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">{brand}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-zinc-300">{item}</CardContent>
    </Card>
  );
}
