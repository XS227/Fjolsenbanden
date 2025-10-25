import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Trophy, Shield, Star, PlayCircle, Users } from "lucide-react";

type LevelAccent = "cyan" | "amber";

const levelAccentClasses: Record<LevelAccent, string> = {
  cyan: "border-cyan-300 ring-1 ring-cyan-400/40",
  amber: "border-amber-300 ring-1 ring-amber-400/40",
};

const navLinks = [
  { href: "#medlem", label: "Medlemskap" },
  { href: "#premier", label: "Premier" },
  { href: "#foreldre", label: "Foreldre" },
  { href: "#community", label: "Community" },
  { href: "#sponsor", label: "Sponsorer" },
] as const;

const membershipLevels = [
  {
    title: "Gratis",
    price: "0 kr",
    features: ["Tilgang til Discord", "Deltakelse i events"],
  },
  {
    title: "Premie",
    price: "49 kr/mnd",
    accent: "cyan" satisfies LevelAccent,
    features: [
      "Vinn premier",
      "Spesial-konkurranser",
      "Foreldreverifisering via Vipps",
    ],
  },
  {
    title: "Sponsor",
    price: "299 kr/mnd",
    accent: "amber" satisfies LevelAccent,
    features: ["Logo på nettside", "Synlighet i stream", "Tilgang til sponsor-events"],
  },
] as const;

const monthlyPrizes = [
  { brand: "Lenovo", item: "Gaming-headset" },
  { brand: "Samsung", item: "27” skjerm" },
  { brand: "Philips", item: "Hue-kit" },
  { brand: "NKI", item: "Kursstipend" },
] as const;

const communityStats = [
  { num: "3 200+", label: "Twitch" },
  { num: "4 200+", label: "TikTok" },
  { num: "2 500+", label: "Discord" },
  { num: "350+", label: "YouTube" },
] as const;

const sponsorLogos = ["Lenovo", "Samsung", "Philips", "NKI", "+ Din logo"] as const;

export default function FjolsenbandenPortalShort() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white text-zinc-900">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-[#00CFFF] px-3 py-2 font-bold text-white">FB</div>
            <span className="font-semibold">Fjolsenbanden</span>
          </div>
          <nav className="hidden gap-5 text-sm md:flex">
            {navLinks.map((link) => (
              <a key={link.href} className="transition hover:text-[#00CFFF]" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <Button className="rounded-full">Logg inn med Vipps</Button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-b from-[#00CFFF]/10 to-transparent py-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold">
          Spill, vinn og hør til – <span className="text-[#00CFFF]">Fjolsenbanden</span>
        </h1>
        <p className="mx-auto max-w-xl text-zinc-600">
          Norges tryggeste gaming-community for barn og unge. Foreldre logger inn via Vipps –
          alt er trygt, enkelt og gøy.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button className="rounded-full px-6 py-5 text-base">Meld inn barn</Button>
          <Button className="rounded-full px-6 py-5 text-base" variant="outline">
            Se neste stream
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-zinc-600">
          {communityStats.slice(0, 3).map((stat) => (
            <span key={stat.label} className="rounded-full border border-zinc-200 px-3 py-1">
              {stat.num} {stat.label}
            </span>
          ))}
        </div>
      </section>

      {/* MEDLEMSKAP */}
      <section id="medlem" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Velg medlemsnivå</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {membershipLevels.map((level) => (
            <LevelCard
              key={level.title}
              title={level.title}
              price={level.price}
              features={level.features}
              accent={level.accent}
            />
          ))}
        </div>
      </section>

      {/* PREMIER */}
      <section id="premier" className="border-t bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-2 text-2xl font-bold">Premier &amp; trekninger</h2>
          <p className="mb-6 text-zinc-600">
            Lenovo, Samsung, Philips, NKI og flere gir premier hver måned!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {monthlyPrizes.map((prize) => (
              <Prize key={prize.brand} brand={prize.brand} item={prize.item} />
            ))}
          </div>
        </div>
      </section>

      {/* FORELDRE */}
      <section id="foreldre" className="mx-auto grid max-w-5xl gap-8 px-4 py-16 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Trygg innmelding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-600">
            <p>
              Foreldre logger inn via Vipps. Vi henter kun navn og fødselsdato for å sikre trygg
              bruk.
            </p>
            <Button className="rounded-full">Logg inn med Vipps</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-[#00CFFF]/5 text-center">
          <CardContent className="p-6">
            <PlayCircle className="mx-auto mb-3 h-10 w-10 text-[#00CFFF]" />
            <h3 className="mb-2 font-semibold">Neste stream: Fredag 19:00</h3>
            <p className="text-sm text-zinc-600">Bli med live på Twitch eller YouTube.</p>
          </CardContent>
        </Card>
      </section>

      {/* COMMUNITY */}
      <section id="community" className="border-t bg-white px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.1fr,0.9fr]">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" /> Engasjert community
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-zinc-600 md:grid-cols-2">
              {communityStats.map((stat) => (
                <CommunityStat key={stat.label} num={stat.num} label={stat.label} />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl text-center">
            <CardContent className="space-y-4 p-6">
              <PlayCircle className="mx-auto h-10 w-10 text-[#00CFFF]" />
              <div>
                <h3 className="text-lg font-semibold">Ukentlige aktiviteter</h3>
                <p className="text-sm text-zinc-600">
                  Minecraft-builds, Kahoot-quiz og trygge gaming-kvelder hver helg.
                </p>
              </div>
              <Button className="rounded-full" variant="outline">
                Se aktivitetsplan
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SPONSOR */}
      <section id="sponsor" className="border-t bg-gradient-to-b from-white to-[#f7f7f7] px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-4 text-center">
          <h2 className="text-2xl font-bold">For sponsorer og partnere</h2>
          <p className="mx-auto max-w-lg text-zinc-600">
            Nå over 700+ aktive medlemmer, foreldre og unge gamere. Fjolsenbanden gir trygt
            engasjement og synlighet.
          </p>
          <Button className="rounded-full">Last ned sponsor-deck</Button>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold">
            {sponsorLogos.map((sponsor) => (
              <span key={sponsor} className="rounded-xl border px-4 py-2">
                {sponsor}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Fjolsenbanden – Et trygt community for unge spillere.
      </footer>
    </div>
  );
}

type LevelCardProps = {
  title: string;
  price: string;
  features: readonly string[];
  accent?: LevelAccent;
};

function LevelCard({ title, price, features, accent }: LevelCardProps) {
  return (
    <Card
      className={`rounded-2xl border ${
        accent ? levelAccentClasses[accent] : "border-zinc-200"
      }`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="text-2xl font-bold">{price}</div>
        {features.map((feature) => (
          <Feature key={feature} text={feature} />
        ))}
        <Button className="mt-3 w-full rounded-full">Velg</Button>
      </CardContent>
    </Card>
  );
}

function CommunityStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-200 p-4 text-center">
      <div className="text-2xl font-extrabold text-zinc-900">{num}</div>
      <div className="text-xs uppercase tracking-wide text-zinc-500">{label}</div>
    </div>
  );
}

function Prize({ brand, item }: { brand: string; item: string }) {
  return (
    <Card className="w-40 rounded-xl border p-4 text-center">
      <div className="text-xs uppercase text-zinc-500">Partner</div>
      <div className="font-bold">{brand}</div>
      <div className="mt-1 text-sm">{item}</div>
    </Card>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-600">
      <Check className="h-4 w-4 text-[#00CFFF]" />
      <span>{text}</span>
    </div>
  );
}
