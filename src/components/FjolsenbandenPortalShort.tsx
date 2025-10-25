import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Trophy,
  Shield,
  Star,
  PlayCircle,
  Users,
  Sparkles,
  Gamepad2,
  Rocket,
  PartyPopper,
  Heart,
  Palette,
} from "lucide-react";

type LevelAccent = "sunrise" | "lagoon" | "starlight";

type LevelCardContent = {
  title: string;
  price: string;
  tagline: string;
  features: readonly string[];
  accent: LevelAccent;
};

const levelAccentStyles: Record<LevelAccent, { card: string; badge: string; button: string; feature: string; text: string }> = {
  sunrise: {
    card:
      "border-transparent bg-gradient-to-br from-[#FFD6E8] via-[#FFF6B7] to-[#FFC8DD] text-[#3B0764] shadow-[0_20px_45px_rgba(255,182,193,0.35)]",
    badge: "bg-white/70 text-[#C026D3]",
    button: "bg-white/80 text-[#C026D3] hover:bg-white",
    feature: "text-[#EA580C]",
    text: "text-[#3B0764]",
  },
  lagoon: {
    card:
      "border-transparent bg-gradient-to-br from-[#C8F2FF] via-[#8DE5FF] to-[#B5F5DC] text-[#083344] shadow-[0_20px_45px_rgba(34,211,238,0.35)]",
    badge: "bg-white/80 text-[#0F766E]",
    button: "bg-white/80 text-[#0E7490] hover:bg-white",
    feature: "text-[#0EA5E9]",
    text: "text-[#0F172A]",
  },
  starlight: {
    card:
      "border-transparent bg-gradient-to-br from-[#E8E7FF] via-[#D4C5FF] to-[#FFDEE9] text-[#1E1B4B] shadow-[0_20px_45px_rgba(137,134,255,0.35)]",
    badge: "bg-white/70 text-[#6D28D9]",
    button: "bg-white/80 text-[#4C1D95] hover:bg-white",
    feature: "text-[#7C3AED]",
    text: "text-[#1E1B4B]",
  },
};

const navLinks = [
  { href: "#medlem", label: "Medlemskap" },
  { href: "#premier", label: "Premier" },
  { href: "#aktiviteter", label: "Aktiviteter" },
  { href: "#foreldre", label: "Foreldre" },
  { href: "#community", label: "Community" },
  { href: "#sponsor", label: "Sponsorer" },
] as const;

const heroHighlights = [
  {
    label: "Trygge turneringer for 8–16 år",
    gradient: "from-[#FF8CF3] via-[#FFB36C] to-[#FFEE8C]",
  },
  {
    label: "Premier og quester hver uke",
    gradient: "from-[#7DD3FC] via-[#C4B5FD] to-[#F9A8D4]",
  },
  {
    label: "Foreldre har full oversikt",
    gradient: "from-[#BBF7D0] via-[#86EFAC] to-[#6EE7B7]",
  },
] as const;

const membershipLevels: readonly LevelCardContent[] = [
  {
    title: "Gratis",
    price: "0 kr",
    tagline: "Start eventyret",
    features: ["Discord og trygg chat", "Åpne aktivitetskvelder", "Stem på fremtidige streams"],
    accent: "sunrise",
  },
  {
    title: "Premie",
    price: "49 kr/mnd",
    tagline: "Vinn og glitr",
    features: ["Eksklusive premier hver uke", "VIP-plasser i turneringer", "Foreldreverifisering via Vipps"],
    accent: "lagoon",
  },
  {
    title: "Sponsor",
    price: "299 kr/mnd",
    tagline: "Gi tilbake",
    features: ["Logo i sending", "Skreddersydde sponsor-events", "Samarbeid med trygge rollemodeller"],
    accent: "starlight",
  },
];

const monthlyPrizes = [
  { brand: "Lenovo", item: "Legendarisk gaming-kit", gradient: "from-[#FFAFBD] to-[#ffc3a0]" },
  { brand: "Samsung", item: "Superfresh 27” skjerm", gradient: "from-[#A0E9FF] to-[#AEBAF8]" },
  { brand: "Philips", item: "Hue party-pack", gradient: "from-[#FDC5F5] to-[#F7AEF8]" },
  { brand: "NKI", item: "Kreativt kursstipend", gradient: "from-[#B9FBC0] to-[#98F5E1]" },
] as const;

const activityCards = [
  {
    title: "Kreative byggedager",
    description: "Minecraft, Roblox og byggeutfordringer med veiledere til stede.",
    icon: Palette,
    gradient: "from-[#FFDEE9] to-[#B5FFFC]",
  },
  {
    title: "Squad challenges",
    description: "Lag vennelag, spill trygge e-sport-kamper og vinn badges.",
    icon: Rocket,
    gradient: "from-[#B5FFBC] to-[#76E4F7]",
  },
  {
    title: "Feelgood fredager",
    description: "Kahoot, tegne-quiz og musikkbingo ledet av Fjolsenbanden.",
    icon: PartyPopper,
    gradient: "from-[#CABDFF] to-[#FFE0F5]",
  },
] as const;

const communityStats = [
  { num: "3 200+", label: "Twitch-venner", gradient: "from-[#FF9A9E] to-[#FAD0C4]" },
  { num: "4 200+", label: "TikTok-heiarop", gradient: "from-[#B5FFFC] to-[#CFFAFE]" },
  { num: "2 500+", label: "Discord-prater", gradient: "from-[#E0C3FC] to-[#8EC5FC]" },
  { num: "350+", label: "YouTube-klipp", gradient: "from-[#FBC2EB] to-[#A6C1EE]" },
] as const;

const carePillars = [
  "Vipps-verifisering av foreldre",
  "Sertifiserte trygge moderatorer",
  "Positiv chat og venneskole",
] as const;

const sponsorLogos = ["Lenovo", "Samsung", "Philips", "NKI", "+ Din logo"] as const;

export default function FjolsenbandenPortalShort() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF6F0] via-[#F6F7FF] to-[#FFFFFF] text-zinc-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#FFB4D3]/40 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[#A5F3FC]/40 blur-3xl" />
        <div className="absolute left-10 top-1/3 h-64 w-64 rounded-full bg-[#FDE68A]/30 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-base font-bold text-white shadow-lg">
              FB
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm uppercase tracking-[0.2em] text-[#FF7AD9]">Fjolsenbanden</span>
              <span className="font-semibold">Spillglede for hele familien</span>
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-full bg-white/0 px-4 py-2 font-medium text-zinc-600 transition hover:bg-white/70 hover:text-[#FF7AD9]"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button className="rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 text-sm font-semibold text-white shadow-md hover:from-[#FF87F3] hover:to-[#FFB86C]">
            Logg inn med Vipps
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4">
        <section className="relative overflow-hidden py-20 text-center">
          <div className="absolute inset-x-0 top-8 mx-auto hidden max-w-4xl rounded-3xl bg-white/60 p-6 shadow-xl ring-1 ring-white/60 md:block">
            <div className="flex items-center justify-center gap-3 text-sm font-medium text-[#FF7AD9]">
              <Sparkles className="h-4 w-4" />
              Barn og unge møtes i et trygt, fargerikt univers
            </div>
          </div>

          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5E9] shadow-sm ring-1 ring-[#0EA5E9]/20">
              <Heart className="h-4 w-4 text-[#FF7AD9]" />
              Norges gladeste gaming-community
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Fargelegg spillkveldene med <span className="bg-gradient-to-r from-[#FF7AD9] via-[#7DD3FC] to-[#FACC15] bg-clip-text text-transparent">Fjolsenbanden</span>
            </h1>
            <p className="max-w-2xl text-base text-zinc-600 sm:text-lg">
              Foreldre logger inn via Vipps og inviterer barna til et lekent univers med turneringer, kreative prosjekter og premier som inspirerer til samarbeid og trygg digital kultur.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="rounded-full bg-gradient-to-r from-[#7C3AED] via-[#FF7AD9] to-[#F97316] px-7 py-5 text-base text-white shadow-lg hover:opacity-95">
                Meld inn barn
              </Button>
              <Button
                className="rounded-full border-2 border-[#7DD3FC] bg-white/80 px-7 py-5 text-base text-[#0EA5E9] shadow-sm hover:bg-[#E0F2FE]"
                variant="outline"
              >
                Se neste stream
              </Button>
            </div>
            <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className={`rounded-2xl bg-gradient-to-r ${highlight.gradient} px-4 py-3 text-sm font-semibold text-[#1F2937] shadow-lg shadow-black/5`}
                >
                  {highlight.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="medlem" className="relative mt-4 rounded-[2.5rem] bg-white/80 p-1 shadow-[0_25px_70px_rgba(148,163,184,0.25)]">
          <div className="rounded-[2.4rem] bg-gradient-to-br from-white via-[#FFF7FB] to-[#F3FAFF] px-6 py-16 sm:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FFEEF6] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#DB2777]">
                Medlemskap
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#1D1B4C] sm:text-4xl">Velg nivå som matcher eventyret deres</h2>
              <p className="mt-3 text-sm text-zinc-600 sm:text-base">
                Alle nivåer inkluderer trygg moderering, vennlige spillkvelder og fellesskap i Fjolsenbanden.
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {membershipLevels.map((level) => (
                <LevelCard key={level.title} {...level} />
              ))}
            </div>
          </div>
        </section>

        <section id="aktiviteter" className="mt-20 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-[#F8F5FF] via-[#FFF3FB] to-[#F2FBFF] p-8 shadow-[0_20px_60px_rgba(99,102,241,0.15)]">
            <CardHeader className="space-y-4 border-none p-0">
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-[#4C1D95]">
                <Gamepad2 className="h-8 w-8 rounded-2xl bg-white/80 p-1 text-[#7C3AED] shadow" />
                Ukens lekenheter
              </CardTitle>
              <p className="max-w-xl text-sm text-[#312E81] sm:text-base">
                Variasjon holder kreativiteten i gang! Hver uke lanserer vi nye quester, samarbeid og utfordringer tilpasset aldersgrupper og nivå.
              </p>
            </CardHeader>
            <CardContent className="grid gap-5 border-none p-0 pt-8 sm:grid-cols-3">
              {activityCards.map((activity) => (
                <div
                  key={activity.title}
                  className={`group flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br ${activity.gradient} p-5 text-left shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1`}
                >
                  <div>
                    <span className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#6366F1] shadow-sm">
                      Aktiviteter
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-[#1F2937]">{activity.title}</h3>
                    <p className="mt-2 text-sm text-[#374151]">{activity.description}</p>
                  </div>
                  <activity.icon className="mt-6 h-10 w-10 text-[#6D28D9] opacity-80" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-gradient-to-br from-[#FFF0F8] via-[#FFE8D6] to-[#FFF6FE] p-8 text-center shadow-[0_20px_60px_rgba(249,115,22,0.15)]">
            <CardContent className="flex h-full flex-col items-center justify-center gap-5 p-0 text-[#9A3412]">
              <PlayCircle className="h-16 w-16 text-[#F97316]" />
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Neste stream starter fredag 19:00</h3>
                <p className="text-sm text-[#7C2D12]">
                  Samle familien og bli med live på Twitch og YouTube. Velg mellom kreativ bygg, story-mode og party games.
                </p>
              </div>
              <Button className="rounded-full bg-white/90 px-6 text-[#F97316] hover:bg-white">Skap påminnelse</Button>
            </CardContent>
          </Card>
        </section>

        <section id="premier" className="mt-20 rounded-[2.5rem] bg-white/80 p-1 shadow-[0_25px_70px_rgba(253,186,116,0.25)]">
          <div className="rounded-[2.4rem] bg-gradient-to-br from-[#FFF8EB] via-[#FFF3F4] to-[#F4F9FF] px-6 py-16 sm:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FEF3C7] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#B45309]">
                Premier &amp; trekninger
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#92400E] sm:text-4xl">Fargerike premier fra vennene våre</h2>
              <p className="mt-3 text-sm text-[#A16207] sm:text-base">
                Lenovo, Samsung, Philips, NKI og flere bidrar med glede. Vi feirer innsats, samarbeid og god gaming-etikette.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {monthlyPrizes.map((prize) => (
                <Prize key={prize.brand} {...prize} />
              ))}
            </div>
          </div>
        </section>

        <section id="foreldre" className="mt-20 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="rounded-3xl border-0 bg-gradient-to-br from-[#E0F2FE] via-[#F5F3FF] to-[#FFF0F6] p-8 shadow-[0_20px_60px_rgba(14,165,233,0.15)]">
            <CardHeader className="space-y-4 border-none p-0">
              <CardTitle className="flex flex-wrap items-center gap-3 text-2xl font-bold text-[#0F172A]">
                <Shield className="h-8 w-8 rounded-2xl bg-white/80 p-1 text-[#0EA5E9] shadow" />
                Foreldre + Fjolsenbanden = trygg magi
              </CardTitle>
              <p className="text-sm text-[#0F172A]/80 sm:text-base">
                Logg inn via Vipps for å bekrefte foresatt-rollen, legg til barna dine og følg med på høydepunkter, premier og læringsmål i portalen.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4 border-none p-0 pt-8 sm:grid-cols-2">
              <div className="space-y-4">
                {carePillars.map((pillar) => (
                  <Feature key={pillar} text={pillar} iconClassName="text-[#0EA5E9]" textClassName="text-[#0F172A]" />
                ))}
              </div>
              <div className="rounded-3xl bg-white/75 p-6 text-center shadow-lg shadow-black/5">
                <h3 className="text-lg font-semibold text-[#1E293B]">Få ukentlig familie-oversikt</h3>
                <p className="mt-2 text-sm text-[#334155]">
                  Vi sender koselige oppsummeringer av progresjon, vennskap og premier direkte til foresatte.
                </p>
                <Button className="mt-5 w-full rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] text-white shadow-md hover:from-[#38BDF8] hover:to-[#818CF8]">
                  Logg inn med Vipps
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-gradient-to-br from-[#FDF2F8] via-[#E0E7FF] to-[#F0F9FF] p-8 text-center shadow-[0_20px_60px_rgba(232,121,249,0.18)]">
            <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-0">
              <Users className="h-16 w-16 text-[#6366F1]" />
              <h3 className="text-2xl font-bold text-[#4338CA]">Community med hjertet først</h3>
              <p className="text-sm text-[#312E81]">
                Vi bygger vennskap, samhold og godt nettvett gjennom modererte kanaler og hyggelige aktiviteter.
              </p>
              <Button className="rounded-full bg-white/90 px-6 text-[#6366F1] shadow hover:bg-white">Se foreldreguiden</Button>
            </CardContent>
          </Card>
        </section>

        <section id="community" className="mt-20 rounded-[2.5rem] bg-white/80 p-1 shadow-[0_25px_70px_rgba(99,102,241,0.2)]">
          <div className="rounded-[2.4rem] bg-gradient-to-br from-[#F5F3FF] via-[#ECFEFF] to-[#FFF7F0] px-6 py-16 sm:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#4338CA]">
                Community
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#312E81] sm:text-4xl">Bli med i en glad og trygg vennegjeng</h2>
              <p className="mt-3 text-sm text-[#4338CA]/80 sm:text-base">
                Tallene stiger hver uke – og viktigst av alt: alle blir sett, heiet frem og veiledet i positiv online kultur.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
              {communityStats.map((stat) => (
                <CommunityStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        <section id="sponsor" className="mt-20 rounded-[2.5rem] bg-white/80 p-1 shadow-[0_25px_70px_rgba(251,191,36,0.25)]">
          <div className="rounded-[2.4rem] bg-gradient-to-br from-[#FFF7ED] via-[#FFF1F2] to-[#FDF4FF] px-6 py-16 sm:px-10 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FDE68A] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#92400E]">
                Sponsorer &amp; partnere
              </span>
              <h2 className="text-3xl font-bold text-[#B45309] sm:text-4xl">Spre trygg og positiv spillglede sammen med oss</h2>
              <p className="text-sm text-[#B45309]/80 sm:text-base">
                Nå foreldre, lærere og unge gamere med kampanjer som gjør en forskjell. Vi skreddersyr aktiviteter og synlighet.
              </p>
              <Button className="rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F97316] px-8 text-white shadow-lg hover:from-[#FACC15] hover:to-[#FB923C]">
                Last ned sponsor-deck
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-semibold">
              {sponsorLogos.map((sponsor) => (
                <span
                  key={sponsor}
                  className="rounded-2xl border border-[#F97316]/30 bg-white/70 px-5 py-3 text-[#B45309] shadow-sm"
                >
                  {sponsor}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-white/60 bg-white/70 py-10 text-center text-xs text-zinc-500 backdrop-blur">
        © {new Date().getFullYear()} Fjolsenbanden – Et fargerikt og trygt community for unge spillere.
      </footer>
    </div>
  );
}

function LevelCard({ title, price, features, accent, tagline }: LevelCardContent) {
  const styles = levelAccentStyles[accent];
  return (
    <Card className={`rounded-3xl ${styles.card}`}>
      <CardHeader className="space-y-3 border-none p-6 pb-0">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${styles.badge}`}>
          <Star className="h-4 w-4" /> {tagline}
        </div>
        <CardTitle className={`text-2xl font-bold ${styles.text}`}>{title}</CardTitle>
        <div className={`text-xl font-black ${styles.text}`}>{price}</div>
      </CardHeader>
      <CardContent className="space-y-3 border-none p-6 pt-4">
        {features.map((feature) => (
          <Feature
            key={feature}
            text={feature}
            iconClassName={`text-lg ${styles.feature}`}
            textClassName={`${styles.text} text-sm font-medium`}
          />
        ))}
        <Button className={`mt-4 w-full rounded-full ${styles.button}`}>Velg</Button>
      </CardContent>
    </Card>
  );
}

function CommunityStat({
  num,
  label,
  gradient,
}: {
  num: string;
  label: string;
  gradient: string;
}) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${gradient} p-6 text-center shadow-lg shadow-black/5 transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="text-3xl font-black text-[#1F2937]">{num}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#475569]">{label}</div>
    </div>
  );
}

function Prize({
  brand,
  item,
  gradient,
}: {
  brand: string;
  item: string;
  gradient: string;
}) {
  return (
    <Card className={`w-48 rounded-3xl border-0 bg-gradient-to-br ${gradient} p-6 text-center shadow-lg shadow-black/5`}>
      <div className="text-xs uppercase tracking-wide text-[#1F2937]/70">Partner</div>
      <div className="mt-2 text-lg font-bold text-[#111827]">{brand}</div>
      <div className="mt-2 text-sm text-[#374151]">{item}</div>
      <Trophy className="mx-auto mt-4 h-8 w-8 text-[#9333EA]" />
    </Card>
  );
}

function Feature({
  text,
  iconClassName,
  textClassName,
}: {
  text: string;
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${textClassName ?? "text-sm text-zinc-600"}`}>
      <Check className={`h-5 w-5 ${iconClassName ?? "text-[#FF7AD9]"}`} />
      <span>{text}</span>
    </div>
  );
}
