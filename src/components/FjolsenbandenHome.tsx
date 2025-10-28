"use client";

import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Box,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Discord,
  Gift,
  GraduationCap,
  Lock,
  Megaphone,
  Menu,
  MessageCircle,
  Mic,
  Phone,
  Play,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Twitch,
  Users,
  Video,
  X,
  Youtube,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

type Offering = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type VippsUser = {
  name: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
};

type VippsFlow = "minor" | "adult" | null;

type FavoriteGame =
  | "Fortnite"
  | "Minecraft"
  | "Rocket League"
  | "EA FC 24"
  | "Valorant"
  | "Roblox";

type ProfileFormValues = {
  twitch: string;
  youtube: string;
  tiktok: string;
  discord: string;
  gamertag: string;
  favoriteGames: FavoriteGame[];
  showOnLeaderboards: boolean;
  parentName: string;
  parentPhone: string;
  parentConsent: boolean;
  address: string;
  postalCode: string;
  acceptPrivacy: boolean;
  acceptRules: boolean;
};

const navLinks = [
  { name: "Hjem", href: "#" },
  { name: "Live", href: "#live" },
  { name: "Medlemskap", href: "#medlemskap" },
  { name: "Premier", href: "#premier" },
  { name: "Samarbeid", href: "#sponsorer" },
  { name: "Kontakt", href: "#kontakt" },
] as const;

const platformLinks: readonly PlatformLink[] = [
  {
    icon: <Twitch className="h-5 w-5" aria-hidden="true" />,
    label: "Twitch",
    href: "https://www.twitch.tv/FjOlsenFN",
  },
  {
    icon: <Youtube className="h-5 w-5" aria-hidden="true" />,
    label: "YouTube",
    href: "https://youtube.com/@fjolsenbanden",
  },
  {
    icon: <Smartphone className="h-5 w-5" aria-hidden="true" />,
    label: "TikTok",
    href: "https://www.tiktok.com/@fjolsenbanden",
  },
  {
    icon: <Instagram className="h-5 w-5" aria-hidden="true" />,
    label: "Instagram",
    href: "https://www.instagram.com/fjolsenbanden",
  },
  {
    icon: <Discord className="h-5 w-5" aria-hidden="true" />,
    label: "Discord",
    href: "https://discord.gg/fjolsenbanden",
  },
] as const;

const socialLinks: readonly PlatformLink[] = [
  {
    icon: <Discord className="h-4 w-4" aria-hidden="true" />,
    label: "Discord",
    href: "https://discord.gg/fjolsenbanden",
  },
  {
    icon: <Twitch className="h-4 w-4" aria-hidden="true" />,
    label: "Twitch",
    href: "https://www.twitch.tv/FjOlsenFN",
  },
  {
    icon: <Youtube className="h-4 w-4" aria-hidden="true" />,
    label: "YouTube",
    href: "https://youtube.com/@fjolsenbanden",
  },
  {
    icon: <Smartphone className="h-4 w-4" aria-hidden="true" />,
    label: "TikTok",
    href: "https://www.tiktok.com/@fjolsenbanden",
  },
  {
    icon: <Instagram className="h-4 w-4" aria-hidden="true" />,
    label: "Instagram",
    href: "https://www.instagram.com/fjolsenbanden",
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

const sponsors = [
  {
    name: "Lenovo",
    logoUrl:
      "https://wallpapers.com/images/hd/lenovo-logo-blue-background-5eusj88firqak72j-5eusj88firqak72j.jpg",
  },
  {
    name: "Samsung",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5b167HuOXql2HDZHamkzcYas962igQOzcqA&s",
  },
  {
    name: "Philips",
    logoUrl: "https://www.sthb.nl/wp-content/uploads/2016/02/Philips-Logo-HD.jpg",
  },
  {
    name: "Komplett.no",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYtpuPO71nnzwUIVosVdrevGmHTUrgoiqLGA&s",
  },
] as const;

const offerings: readonly Offering[] = [
  {
    title: "Foredrag",
    description:
      "FjOlsen besøker skoler, idrettslag og e-sportklubber for å snakke om streaming, gaming-kultur og nettvett.",
    Icon: Mic,
  },
  {
    title: "Events",
    description:
      "Vi arrangerer gaming-konkurranser for bedrifter, skoler og klubber – både digitalt og fysisk.",
    Icon: CalendarDays,
  },
  {
    title: "Unboxing",
    description:
      "FjOlsen lager profesjonelle unboxing-videoer av dine produkter som kan brukes i deres markedsføring og deles med vårt community.",
    Icon: Box,
  },
  {
    title: "Streamer for hire",
    description:
      "Ønsker du at FjOlsen skal streame på vegne av din merkevare? Han er tilgjengelig for co-streams, produktlanseringer og kampanjer – der ditt budskap blir formidlet på en autentisk og engasjerende måte til tusenvis av følgere.",
    Icon: Video,
  },
  {
    title: "Coaching",
    description:
      "I FjOlsenbanden finner du flere av Norges dyktigste Fortnite-spillere. Sammen tilbyr vi 1-til-1 coaching for barn og unge som ønsker å utvikle seg som spillere – med fokus på strategi, samarbeid, kommunikasjon og trygg nettkultur. Ta kontakt hvis du ønsker mer informasjon eller vil booke en økt.",
    Icon: GraduationCap,
  },
] as const;

const createDefaultVippsUser = (): VippsUser => ({
  name: "FjOlsen Fan",
  dateOfBirth: "2005-05-17",
  phoneNumber: "+47 987 65 432",
  email: "fjolsenfan@example.com",
});

const favoriteGameOptions: readonly FavoriteGame[] = [
  "Fortnite",
  "Minecraft",
  "Rocket League",
  "EA FC 24",
  "Valorant",
  "Roblox",
];

const createDefaultProfileDraft = (): ProfileFormValues => ({
  twitch: "",
  youtube: "",
  tiktok: "",
  discord: "",
  gamertag: "",
  favoriteGames: [],
  showOnLeaderboards: false,
  parentName: "",
  parentPhone: "",
  parentConsent: false,
  address: "",
  postalCode: "",
  acceptPrivacy: false,
  acceptRules: false,
});

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
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [vippsLoggedIn, setVippsLoggedIn] = useState(false);
  const [vippsDraft, setVippsDraft] = useState<VippsUser>(createDefaultVippsUser());
  const [vippsUser, setVippsUser] = useState<VippsUser | null>(null);
  const [vippsFlow, setVippsFlow] = useState<VippsFlow>(null);
  const [parentPhone, setParentPhone] = useState("");
  const [approvalSent, setApprovalSent] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [profileDraft, setProfileDraft] = useState<ProfileFormValues>(createDefaultProfileDraft());
  const [profileSubmitted, setProfileSubmitted] = useState(false);

  type ContactFormEvent = {
    preventDefault: () => void;
    currentTarget: HTMLFormElement;
  };

  type InputChangeEvent = {
    currentTarget: HTMLInputElement;
  };

  type SimpleFormEvent = {
    preventDefault: () => void;
  };

  const handleContactSubmit = (event: ContactFormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    const subject = encodeURIComponent("Kontakt via fjolsenbanden.no");
    const body = encodeURIComponent(
      `${message}\n\nNavn: ${name || "Ukjent"}\nE-post: ${email || "Ikke oppgitt"}`,
    );

    window.location.href = `mailto:kontakt@fjolsenbanden.no?subject=${subject}&body=${body}`;
    event.currentTarget.reset();
  };

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

  useEffect(() => {
    if (vippsFlow !== "minor") {
      setProfileDraft((previous) => {
        if (
          !previous.parentName &&
          !previous.parentPhone &&
          !previous.parentConsent &&
          !previous.address &&
          !previous.postalCode
        ) {
          return previous;
        }

        return {
          ...previous,
          parentName: "",
          parentPhone: "",
          parentConsent: false,
          address: "",
          postalCode: "",
        };
      });
      return;
    }

    if (!parentPhone) {
      return;
    }

    setProfileDraft((previous) => {
      if (previous.parentPhone) {
        return previous;
      }

      return { ...previous, parentPhone };
    });
  }, [parentPhone, vippsFlow]);

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) {
      return 0;
    }

    const dob = new Date(dateOfBirth);
    if (Number.isNaN(dob.getTime())) {
      return 0;
    }

    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age -= 1;
    }

    return age;
  };

  const openRegistration = (tier?: string) => {
    setRegistrationOpen(true);
    setSelectedTier(tier ?? null);
    setVippsLoggedIn(false);
    setVippsDraft(createDefaultVippsUser());
    setVippsUser(null);
    setVippsFlow(null);
    setParentPhone("");
    setApprovalSent(false);
    setPaymentInitiated(false);
    setProfileDraft(createDefaultProfileDraft());
    setProfileSubmitted(false);
  };

  const closeRegistration = () => {
    setRegistrationOpen(false);
  };

  const handleVippsLogin = () => {
    setVippsLoggedIn(true);
  };

  const handleVippsDraftChange = (
    event: InputChangeEvent,
    field: keyof VippsUser,
  ) => {
    const value = event.currentTarget.value;
    setVippsDraft((previous: VippsUser) => ({ ...previous, [field]: value }));
  };

  const handleVippsDetailsSubmit = (event: SimpleFormEvent) => {
    event.preventDefault();
    setVippsUser(vippsDraft);

    const age = calculateAge(vippsDraft.dateOfBirth);
    if (age > 0 && age < 18) {
      setVippsFlow("minor");
    } else {
      setVippsFlow("adult");
    }
  };

  const handleGuardianSubmit = (event: SimpleFormEvent) => {
    event.preventDefault();
    setApprovalSent(true);
  };

  const handleAdultCheckout = () => {
    setPaymentInitiated(true);
  };

  const handleProfileFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ProfileFormValues,
  ) => {
    const value = event.currentTarget.value;
    setProfileDraft((previous) => ({ ...previous, [field]: value }));
  };

  const handleProfileCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof ProfileFormValues,
  ) => {
    const checked = event.currentTarget.checked;
    setProfileDraft((previous) => ({ ...previous, [field]: checked }));
  };

  const handleFavoriteGameToggle = (
    event: React.ChangeEvent<HTMLInputElement>,
    game: FavoriteGame,
  ) => {
    const checked = event.currentTarget.checked;
    setProfileDraft((previous) => {
      const current = new Set(previous.favoriteGames);

      if (checked) {
        current.add(game);
      } else {
        current.delete(game);
      }

      return {
        ...previous,
        favoriteGames: favoriteGameOptions.filter((option) => current.has(option)),
      };
    });
  };

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!vippsUser) {
      return;
    }

    const payload = {
      vippsUser,
      profile: profileDraft,
      flow: vippsFlow,
      isMinor: vippsFlow === "minor",
    };

    console.log("Submit Vipps profile", payload);
    setProfileSubmitted(true);
  };

  const resolvedAge = vippsUser ? calculateAge(vippsUser.dateOfBirth) : null;
  const isMinor = vippsFlow === "minor";
  const showProfileForm = Boolean(
    vippsUser && ((isMinor && approvalSent) || (!isMinor && paymentInitiated)),
  );
  const resolvedName = (vippsUser?.name ?? "").trim();
  const [firstName, ...remainingNameParts] = resolvedName ? resolvedName.split(/\s+/) : [""];
  const lastName = remainingNameParts.join(" ");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#131A49] via-[#0B163F] to-[#050B24] text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, rgba(19,160,249,0.3), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,47,156,0.18), transparent 50%)",
        }}
      />

      <nav className="relative z-50 flex items-center justify-between px-6 py-4">
        <a className="flex items-center gap-3" href="#" aria-label="Fjolsenbanden hjem">
          <img
            src="https://yt3.googleusercontent.com/JDzOGDpzoZ-j6r2NGC-LboiPeK3qGmZqwSRTxgSvvMTmUbySUUGLm80RXmZtcbrAgKYacqTYzAs=s160-c-k-c0x00ffffff-no-rj"
            alt="Fjolsenbanden logo"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <span className="hidden text-lg font-semibold sm:block">Fjolsenbanden</span>
        </a>
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a className="transition-colors duration-150 hover:text-[#13A0F9]" href={link.href}>
                {link.name}
              </a>
              <a
                href="#bli-medlem"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
              >
                Bli medlem
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="relative z-10 pb-40">
      <section id="community" className="mt-6 px-6">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold sm:text-5xl">
                Velkommen til <span className="text-[#13A0F9]">FjOlsenbanden</span>
              </h1>
              <p className="text-base text-zinc-300 sm:text-lg">
                Norges mest inkluderende gaming-community for hele familien.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_18px_42px_rgba(12,21,45,0.45)]">
              <h2 className="text-xl font-semibold text-[#13A0F9]">🎮 Hva er FjOlsenbanden?</h2>
              <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                FjOlsenbanden er et raskt voksende gaming-community med over 2500 medlemmer på Discord, 3200+ følgere på Twitch og 4200+ på TikTok – både barn, ungdom og foreldre!
              </p>
              <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                <span className="font-semibold text-white">Målet vårt er enkelt:</span>
                <br className="hidden sm:block" />Å skape et trygt, positivt og inkluderende miljø der alle kan game uten hets, mobbing eller negativ adferd.
              </p>
              <p className="text-sm leading-relaxed text-zinc-200 sm:text-base">
                FjOlsen bruker mange timer hver uke på å arrangere konkurranser, turneringer og aktiviteter for medlemmene – alltid med fellesskap, spilleglede og respekt i sentrum.
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-xl flex-col items-center gap-6 lg:items-start">
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_28px_60px_rgba(7,12,28,0.6)]">
              <iframe
                className="aspect-video w-full"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/qaHsJWL4xpM?si=gXrmtGxiH5k7Ft80"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="w-full rounded-3xl border border-white/10 bg-[#101c37]/80 p-5 shadow-[0_18px_42px_rgba(12,21,45,0.45)]">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#13A0F9]" /> Følg FjOlsenbanden
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {platformLinks.map(({ icon, label, href }) => (
                  <PlatformButton key={label} icon={icon} label={label} href={href} />
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-zinc-400 sm:text-left">
                Totalt over 10&nbsp;000 følgere på tvers av Discord, Twitch, YouTube, TikTok og Instagram.
              </p>
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
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/20"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200">
                🎥 Se FjOlsen LIVE! Til venstre: Stream-vindu. Til høyre: Chat-feed. 👉 Følg oss her: Discord · Twitch · YouTube · TikTok · Instagram
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
                  <Play className="h-12 w-12 text-[#13A0F9]" />
                  <p className="text-sm text-zinc-300">
                    1-minutt forhåndsvisning –
                    <span data-preview-timer className="ml-1">
                      {previewCountdown}
                    </span>
                    s igjen
                  </p>
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
                    data-video-unmute
                    onClick={() => setUnmuted(true)}
                  >
                    Se full stream
                  </Button>
                  <div className="flex gap-3 text-xs text-zinc-400">
                    <span>
                      eller fortsett på
                      <a
                        href="https://www.twitch.tv/FjOlsenFN"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-[#13A0F9]"
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
                        className="text-[#13A0F9]"
                      >
                        YouTube
                      </a>
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex max-h-[640px] flex-col rounded-2xl border border-white/10 bg-[#1f2940] p-4">
            <h3 className="mb-3 flex items-center gap-2 font-semibold text-[#13A0F9]">
              <MessageCircle className="h-4 w-4" /> Live chat
            </h3>
            <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
                {demoChat.map((chat) => (
                  <div key={chat.user} className="rounded-lg bg-white/5 px-3 py-2">
                    <span className="mr-2 font-semibold text-[#13A0F9]">{chat.user}</span>
                    <span className="text-zinc-200">{chat.message}</span>
                  </div>
                ))}
            </div>
            <input
              type="text"
              placeholder="Skriv en kommentar..."
              className="mt-3 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-[#13A0F9]"
            />
          </div>
        </div>
      </section>

      <section id="medlemskap" className="mt-20 px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">Velg medlemskap</h2>
        <p className="mx-auto mb-8 max-w-2xl text-zinc-300">
          Bli med i konkurranser, streams og fellesskapet vårt på noen få klikk.
        </p>
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {membershipTiers.map(({ title, price, color, features }) => (
            <MembershipCard
              key={title}
              title={title}
              price={price}
              color={color}
              features={features}
              onSelect={openRegistration}
            />
          ))}
        </div>
      </section>

      <section id="premier" className="mt-20 px-6 text-center">
        <h2 className="mb-4 text-3xl font-bold">Samarbeidspartnere</h2>
        <p className="mx-auto max-w-3xl text-zinc-300">
          Vi har allerede hatt samarbeid med flere kjente merkevarer.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-zinc-300">
          Ønsker du å synliggjøre din merkevare for vårt engasjerte og voksende gaming-publikum?
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-zinc-300">Ta kontakt for samarbeid!</p>
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-8 py-3 font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
          >
            <a href="#kontakt">Kontakt oss</a>
          </Button>
        </div>
        <div id="sponsorer" className="mt-10 flex flex-wrap justify-center gap-6">
          {sponsors.map(({ name, logoUrl }) => (
            <div
              key={name}
              className="flex h-20 w-40 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_12px_24px_rgba(8,18,40,0.35)] transition hover:bg-white/10"
            >
              <img
                src={logoUrl}
                alt={name}
                className="h-full w-full object-contain"
                loading="lazy"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="tilbud" className="mt-20 px-6">
        <div className="mx-auto max-w-6xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_48px_rgba(6,14,35,0.45)]">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">Andre tilbud</h2>
            <p className="text-lg text-zinc-200">FjOlsenbanden tilbyr mer enn bare streaming!</p>
          </div>
          <div className="grid gap-6 text-left sm:grid-cols-2">
            {offerings.map(({ title, description, Icon }) => (
              <OfferingCard key={title} title={title} description={description} Icon={Icon} />
            ))}
          </div>
        </div>
      </section>

      <section id="kontakt" className="mt-20 px-6">
        <div className="mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/10 bg-[#161f33]/90 p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold">Kontakt oss</h2>
          <p className="text-zinc-300">
            Har du spørsmål om medlemskap, samarbeid eller events? Send oss en melding så kommer vi tilbake til deg.
          </p>
          <form className="grid gap-4 text-left md:grid-cols-2" onSubmit={handleContactSubmit}>
            <div>
              <label className="mb-1 block text-sm font-semibold text-zinc-200" htmlFor="name">
                Navn
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-zinc-200" htmlFor="email">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-zinc-200" htmlFor="message">
                Melding
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
              <span>Vi svarer så snart vi kan, som regel innen 1–2 virkedager.</span>
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
              >
                Send melding
              </Button>
            </div>
          </form>
        </div>
      </section>

      </main>

      <footer className="mt-20 border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        <div className="flex flex-col items-center justify-center gap-2 text-sm md:flex-row">
          <span>© {new Date().getFullYear()} Fjolsenbanden. Alle rettigheter reservert.</span>
          <a
            href="/admin"
            className="flex items-center gap-2 font-medium text-zinc-300 transition hover:text-white"
          >
            <UserCog className="h-4 w-4" aria-hidden="true" />
            <span>Admin</span>
          </a>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#080f2a]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-sm text-zinc-200 sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-medium text-white">Klar for å bli med i FjOlsenbanden?</span>
            <span className="text-xs text-zinc-400">© {new Date().getFullYear()} Fjolsenbanden</span>
          </div>
          <Button
            size="lg"
            className="w-full rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-8 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585] sm:w-auto"
            type="button"
            onClick={() => openRegistration()}
          >
            Bli medlem
          </Button>
        </div>
      </div>

      {registrationOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10">
          <button
            type="button"
            aria-label="Lukk registrering"
            onClick={closeRegistration}
            className="absolute inset-0 h-full w-full bg-black/70"
          />
          <div className="relative z-[101] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1733] shadow-[0_32px_80px_rgba(4,8,20,0.7)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#13A0F9]">
                  Medlemsregistrering
                </p>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  Bli med i FjOlsenbanden{selectedTier ? ` – ${selectedTier}` : ""}
                </h3>
                <p className="mt-2 max-w-xl text-sm text-zinc-300">
                  Følg Vipps-flyten for å aktivere medlemskapet ditt. Vi bruker Vipps Login til å hente nødvendige opplysninger
                  og sørger for trygg foreldre-godkjenning der det trengs.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/20 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                onClick={closeRegistration}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6 md:px-8">
              <div className="space-y-4 rounded-3xl border border-white/15 bg-[#131f3f]/80 p-5 shadow-inner">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-white">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Vipps Login først</p>
                    <p className="text-xs text-zinc-300">
                      Autentiser medlemmet og hent navn, fødselsdato, telefon og e-post sikkert via Vipps Login API.
                    </p>
                  </div>
                </div>

                {!vippsLoggedIn ? (
                  <Button
                    type="button"
                    size="lg"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5B24] font-semibold text-white shadow-[0_16px_34px_rgba(255,91,36,0.35)] transition hover:bg-[#ff6f40]"
                    onClick={handleVippsLogin}
                  >
                    <Lock className="h-4 w-4" /> Logg inn med Vipps
                  </Button>
                ) : (
                  <form className="grid gap-4 md:grid-cols-2" onSubmit={handleVippsDetailsSubmit}>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-name">
                        Navn
                      </label>
                      <input
                        id="vipps-name"
                        name="vipps-name"
                        type="text"
                        value={vippsDraft.name}
                        onChange={(event) => handleVippsDraftChange(event, "name")}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-dob">
                        Fødselsdato
                      </label>
                      <input
                        id="vipps-dob"
                        name="vipps-dob"
                        type="date"
                        value={vippsDraft.dateOfBirth}
                        onChange={(event) => handleVippsDraftChange(event, "dateOfBirth")}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-phone">
                        Telefon
                      </label>
                      <input
                        id="vipps-phone"
                        name="vipps-phone"
                        type="tel"
                        value={vippsDraft.phoneNumber}
                        onChange={(event) => handleVippsDraftChange(event, "phoneNumber")}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-email">
                        E-post
                      </label>
                      <input
                        id="vipps-email"
                        name="vipps-email"
                        type="email"
                        value={vippsDraft.email}
                        onChange={(event) => handleVippsDraftChange(event, "email")}
                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                        required
                      />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-400">
                        <ShieldCheck className="h-4 w-4 text-[#13A0F9]" /> Data mottatt fra Vipps
                      </div>
                      <p>
                        Når du bekrefter opplysningene, bruker vi fødselsdatoen til å styre riktig løp for foreldre-godkjenning eller betaling.
                      </p>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-2 text-sm text-zinc-300 md:flex-row md:items-center md:justify-between">
                      <span>
                        Bekreft og gå videre til neste steg{resolvedAge ? ` – alder ${resolvedAge} år` : ""}.
                      </span>
                      <Button
                        type="submit"
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
                      >
                        Fortsett
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {vippsUser && vippsFlow === "minor" ? (
                <div className="space-y-4 rounded-3xl border border-white/15 bg-[#101b35]/80 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#FF2F9C] to-[#13A0F9] text-white">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Foreldre-godkjenning i Vipps</p>
                      <p className="text-xs text-zinc-300">
                        Spilleren er under 18 år. Send Vipps-forespørselen til foresatte før registreringen fullføres.
                      </p>
                    </div>
                  </div>
                  {!approvalSent ? (
                    <form className="space-y-4" onSubmit={handleGuardianSubmit}>
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="guardian-phone">
                          Forelder/verge sitt Vipps-nummer
                        </label>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <input
                            id="guardian-phone"
                            name="guardian-phone"
                            type="tel"
                            value={parentPhone}
                            onChange={(event) => setParentPhone(event.currentTarget.value)}
                            placeholder="+47 400 00 000"
                            className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            required
                          />
                          <Button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
                          >
                            Send forespørsel
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Systemet oppretter en Vipps Payment-forespørsel til foresatte. Når betalingen eller samtykket bekreftes via callback-URLen, låses medlemskapet opp.
                      </p>
                    </form>
                  ) : (
                    <div className="space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200">
                      <div className="flex items-center gap-2 text-[#4ade80]">
                        <CheckCircle2 className="h-5 w-5" /> Forespørsel sendt til {parentPhone || "forelder"}
                      </div>
                      <p>
                        Når foresatte godkjenner i Vipps, aktiveres medlemskapet automatisk. Gi beskjed hvis du ikke får svar i løpet av få minutter.
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              {vippsUser && vippsFlow === "adult" ? (
                <div className="space-y-4 rounded-3xl border border-white/15 bg-[#101b35]/80 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#FF2F9C] to-[#13A0F9] text-white">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Vipps Checkout</p>
                      <p className="text-xs text-zinc-300">
                        Voksne medlemmer går direkte til betaling. Vipps bekrefter beløpet og returnerer status til backend.
                      </p>
                    </div>
                  </div>
                  {!paymentInitiated ? (
                    <Button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 font-semibold text-white shadow-[0_18px_36px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
                      onClick={handleAdultCheckout}
                    >
                      Start betaling i Vipps
                      <CreditCard className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200">
                      <div className="flex items-center gap-2 text-[#4ade80]">
                        <CheckCircle2 className="h-5 w-5" /> Vipps-betaling bekreftet
                      </div>
                      <p>
                        Kvitteringen er sendt til backend via callback. Du er klar til å fullføre registreringen og få tilgang til medlemsfordelene.
                      </p>
                    </div>
                  )}
                </div>
              ) : null}

              {showProfileForm ? (
                <div className="space-y-4 rounded-3xl border border-[#13A0F9]/40 bg-[#0f1a32]/90 p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-white">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">Fullfør registrering</p>
                      <p className="text-xs text-zinc-300">Suppler profilfeltene vi trenger ut over Vipps-data, og bekreft nødvendige samtykker.</p>
                    </div>
                  </div>

                  {profileSubmitted ? (
                    <div className="space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200">
                      <div className="flex items-center gap-2 text-[#4ade80]">
                        <CheckCircle2 className="h-5 w-5" /> Profilen er lagret
                      </div>
                      <p>Takk! Vi har registrert valgene dine og kan aktivere medlemskapet. Vipps-ID {vippsUser.phoneNumber} er knyttet til denne profilen.</p>
                    </div>
                  ) : (
                    <form className="space-y-6" onSubmit={handleProfileSubmit}>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-first-name">
                            Fornavn
                          </label>
                          <input
                            id="vipps-first-name"
                            name="vipps-first-name"
                            value={firstName}
                            readOnly
                            aria-readonly="true"
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-last-name">
                            Etternavn
                          </label>
                          <input
                            id="vipps-last-name"
                            name="vipps-last-name"
                            value={lastName}
                            readOnly
                            aria-readonly="true"
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-email-confirm">
                            E-post
                          </label>
                          <input
                            id="vipps-email-confirm"
                            name="vipps-email-confirm"
                            type="email"
                            value={vippsUser.email}
                            readOnly
                            aria-readonly="true"
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-phone-confirm">
                            Mobil
                          </label>
                          <input
                            id="vipps-phone-confirm"
                            name="vipps-phone-confirm"
                            type="tel"
                            value={vippsUser.phoneNumber}
                            readOnly
                            aria-readonly="true"
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90"
                          />
                        </div>
                        <div className="md:col-span-2 md:max-w-xs">
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="vipps-dob-confirm">
                            Fødselsdato
                          </label>
                          <input
                            id="vipps-dob-confirm"
                            name="vipps-dob-confirm"
                            type="date"
                            value={vippsUser.dateOfBirth}
                            readOnly
                            aria-readonly="true"
                            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90"
                          />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-zinc-300">
                          <ShieldCheck className="h-4 w-4 text-[#13A0F9]" />
                          Data hentet automatisk via Vipps Login
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Profilfelt (valgfritt)</h4>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="profile-twitch">
                              Twitch-brukernavn
                            </label>
                            <input
                              id="profile-twitch"
                              name="profile-twitch"
                              placeholder="fjolsenFN"
                              value={profileDraft.twitch}
                              onChange={(event) => handleProfileFieldChange(event, "twitch")}
                              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="profile-youtube">
                              YouTube-kanal / URL
                            </label>
                            <input
                              id="profile-youtube"
                              name="profile-youtube"
                              type="url"
                              placeholder="https://youtube.com/@..."
                              value={profileDraft.youtube}
                              onChange={(event) => handleProfileFieldChange(event, "youtube")}
                              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="profile-tiktok">
                              TikTok-brukernavn
                            </label>
                            <input
                              id="profile-tiktok"
                              name="profile-tiktok"
                              placeholder="@fjolsen"
                              value={profileDraft.tiktok}
                              onChange={(event) => handleProfileFieldChange(event, "tiktok")}
                              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="profile-discord">
                              Discord-tag
                            </label>
                            <input
                              id="profile-discord"
                              name="profile-discord"
                              placeholder="@brukernavn"
                              value={profileDraft.discord}
                              onChange={(event) => handleProfileFieldChange(event, "discord")}
                              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="profile-gamertag">
                              Epic / PSN / Xbox gamertag
                            </label>
                            <input
                              id="profile-gamertag"
                              name="profile-gamertag"
                              placeholder="Spillernavn"
                              value={profileDraft.gamertag}
                              onChange={(event) => handleProfileFieldChange(event, "gamertag")}
                              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Favorittspill</p>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {favoriteGameOptions.map((game) => (
                            <label key={game} className="flex items-center gap-2 text-sm text-zinc-200">
                              <input
                                type="checkbox"
                                name="favorite-games"
                                value={game}
                                checked={profileDraft.favoriteGames.includes(game)}
                                onChange={(event) => handleFavoriteGameToggle(event, game)}
                                className="h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                              />
                              <span>{game}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-zinc-400">Velg spillene du helst vil representere i turneringer og innhold.</p>
                      </div>

                      <label className="flex items-start gap-3 text-sm text-zinc-200">
                        <input
                          type="checkbox"
                          name="profile-leaderboard"
                          checked={profileDraft.showOnLeaderboards}
                          onChange={(event) => handleProfileCheckboxChange(event, "showOnLeaderboards")}
                          className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                        />
                        <span>Vis brukernavn i leaderboard og klipp</span>
                      </label>

                      {isMinor ? (
                        <div className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Foreldresamtykke</p>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="guardian-name">
                                Forelders navn
                              </label>
                              <input
                                id="guardian-name"
                                name="guardian-name"
                                required
                                placeholder="Navn på forelder/verge"
                                value={profileDraft.parentName}
                                onChange={(event) => handleProfileFieldChange(event, "parentName")}
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="guardian-phone-confirm">
                                Forelders mobil (Vipps)
                              </label>
                              <input
                                id="guardian-phone-confirm"
                                name="guardian-phone-confirm"
                                required
                                inputMode="tel"
                                pattern="^\d{8}$"
                                placeholder="8 sifre"
                                value={profileDraft.parentPhone}
                                onChange={(event) => handleProfileFieldChange(event, "parentPhone")}
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                              />
                              <p className="mt-1 text-xs text-zinc-400">Nummeret må matche Vipps-forespørselen som ble sendt.</p>
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="guardian-address">
                                Adresse (valgfritt)
                              </label>
                              <input
                                id="guardian-address"
                                name="guardian-address"
                                placeholder="Gateadresse"
                                value={profileDraft.address}
                                onChange={(event) => handleProfileFieldChange(event, "address")}
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300" htmlFor="guardian-postal">
                                Postnummer (valgfritt)
                              </label>
                              <input
                                id="guardian-postal"
                                name="guardian-postal"
                                inputMode="numeric"
                                pattern="^\d{4}$"
                                placeholder="0000"
                                value={profileDraft.postalCode}
                                onChange={(event) => handleProfileFieldChange(event, "postalCode")}
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                              />
                            </div>
                          </div>
                          <label className="flex items-start gap-3 text-sm text-zinc-200">
                            <input
                              type="checkbox"
                              name="guardian-consent"
                              required
                              checked={profileDraft.parentConsent}
                              onChange={(event) => handleProfileCheckboxChange(event, "parentConsent")}
                              className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                            />
                            <span>Jeg er forelder/verge og godkjenner medlemskap/abonnement</span>
                          </label>
                        </div>
                      ) : null}

                      <div className="space-y-3 text-sm text-zinc-200">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="profile-privacy"
                            required
                            checked={profileDraft.acceptPrivacy}
                            onChange={(event) => handleProfileCheckboxChange(event, "acceptPrivacy")}
                            className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                          />
                          <span>
                            Jeg samtykker til behandling av data iht. <a className="text-[#13A0F9] underline" href="/personvern" target="_blank" rel="noopener noreferrer">personvernerklæringen</a>
                          </span>
                        </label>
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="profile-rules"
                            required
                            checked={profileDraft.acceptRules}
                            onChange={(event) => handleProfileCheckboxChange(event, "acceptRules")}
                            className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                          />
                          <span>
                            Jeg godtar <a className="text-[#13A0F9] underline" href="/konkurranseregler" target="_blank" rel="noopener noreferrer">konkurranseregler og premier-vilkår</a>
                          </span>
                        </label>
                      </div>

                      <Button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]">
                        Lagre profil
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  )}
                </div>
              ) : null}

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PlatformButton({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/90 transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9] active:scale-95"
    >
      <span className="text-white/90">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function MembershipCard({
  title,
  price,
  color,
  features,
  onSelect,
}: {
  title: string;
  price: string;
  color: "green" | "cyan" | "amber";
  features: readonly string[];
  onSelect: (tier?: string) => void;
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
              <Trophy className="h-4 w-4 text-[#13A0F9]" /> {feature}
            </li>
          ))}
        </ul>
        <Button
          size="lg"
          className="w-full rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
          type="button"
          onClick={() => onSelect(title)}
        >
          Velg
        </Button>
      </CardContent>
    </Card>
  );
}

function OfferingCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#101a33]/80 p-6 shadow-[0_16px_32px_rgba(6,14,35,0.45)]">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-content-center rounded-xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-black">
          <Icon className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-zinc-300">{description}</p>
    </div>
  );
}

