"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  Crown,
  GripVertical,
  Lock,
  LogOut,
  MessageCircle,
  PieChart,
  Plus,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Trash2,
  UploadCloud,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DEFAULT_SITE_MODULES,
  DEFAULT_SECTION_ORDER,
  type MembershipTierSettings,
  type PartnerLogo,
  type PlayerProfile,
  type SectionKey,
  type SiteModules,
  type SiteSettings,
  StatsPoint,
  useAdminState,
} from "@/lib/admin-state";
import { useAdminAuth } from "@/lib/admin-auth";

const brandBackground = "radial-gradient(circle at 15% 15%, rgba(64,172,255,0.3), transparent 55%), #03091b";

type BrandFormState = Pick<
  SiteSettings,
  | "logoUrl"
  | "heroTitle"
  | "heroTagline"
  | "announcement"
  | "presentationVideoUrl"
  | "twitchEmbedUrl"
>;

type ModuleKey = keyof SiteModules;

interface SectionListItem {
  key: SectionKey;
  label: string;
  description: string;
  Icon: LucideIcon;
  moduleKey?: ModuleKey;
}

const SECTION_ITEMS: ReadonlyArray<SectionListItem> = [
  {
    key: "heroIntro",
    label: "Hero & intro",
    description: "Åpningsseksjonen med video, høydepunkter og velkomsttekst.",
    Icon: ShieldCheck,
  },
  {
    key: "liveStream",
    label: "Live-sending",
    description: "Viser Twitch-forhåndsvisningen og chatten på forsiden.",
    Icon: Activity,
    moduleKey: "liveStream",
  },
  {
    key: "membership",
    label: "Medlemskap",
    description: "Prisplaner og medlemsfordeler som kan oppdateres her.",
    Icon: Users,
  },
  {
    key: "prizes",
    label: "Premier",
    description: "Presentasjon av premier og sponsorlogoer.",
    Icon: Trophy,
    moduleKey: "partners",
  },
  {
    key: "partners",
    label: "Samarbeidspartnere",
    description: "Logoer og omtale av samarbeidspartnere.",
    Icon: Crown,
    moduleKey: "partners",
  },
  {
    key: "contact",
    label: "Kontakt",
    description: "Kontaktskjema for henvendelser fra besøkende.",
    Icon: MessageCircle,
    moduleKey: "contactForm",
  },
];

const ADMIN_NAV_ITEMS = [
  { id: "overview", label: "Oversikt", Icon: ShieldCheck },
  { id: "site", label: "Nettside og moduler", Icon: UploadCloud },
  { id: "memberships", label: "Medlemskap & partnere", Icon: Users },
  { id: "insights", label: "Statistikk", Icon: BarChart3 },
  { id: "team", label: "Team & profiler", Icon: Trophy },
] as const;

export default function AdminDashboard() {
  const auth = useAdminAuth();

  if (!auth.state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <LoginModal
          open
          auth={auth}
          title="Admininnlogging"
          description="Oppgi brukernavn og passord for administratorer for å åpne kontrollpanelet."
          accent="emerald"
        />
      </div>
    );
  }

  return <AdminDashboardContent auth={auth} />;
}

interface DashboardContentProps {
  auth: ReturnType<typeof useAdminAuth>;
}

function AdminDashboardContent({ auth }: DashboardContentProps) {
  const { state, updateSiteSettings } = useAdminState();
  const { siteSettings, players, statsHistory } = state;

  const [brandForm, setBrandForm] = useState<BrandFormState>(siteSettings);
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(() =>
    normalizeSectionOrder(siteSettings.sectionOrder),
  );
  const [draggingSection, setDraggingSection] = useState<SectionKey | null>(null);
  const [dragOverSection, setDragOverSection] = useState<SectionKey | null>(null);
  const [membershipDrafts, setMembershipDrafts] = useState<MembershipTierSettings[]>(
    () => siteSettings.membershipTiers,
  );
  const [partnerLogos, setPartnerLogos] = useState<PartnerLogo[]>(() => siteSettings.partnerLogos);

  useEffect(() => {
    setBrandForm(siteSettings);
    setSectionOrder(normalizeSectionOrder(siteSettings.sectionOrder));
    setMembershipDrafts(siteSettings.membershipTiers);
    setPartnerLogos(siteSettings.partnerLogos);
  }, [siteSettings]);

  const moduleSettings = useMemo<SiteModules>(
    () => ({ ...DEFAULT_SITE_MODULES, ...(siteSettings.modules ?? DEFAULT_SITE_MODULES) }),
    [siteSettings.modules],
  );

  const sectionItemMap = useMemo(() => new Map(SECTION_ITEMS.map((item) => [item.key, item])), []);

  const orderedSectionItems = useMemo(() => {
    const order = normalizeSectionOrder(sectionOrder);
    return order
      .map((key) => sectionItemMap.get(key))
      .filter((value): value is SectionListItem => Boolean(value));
  }, [sectionItemMap, sectionOrder]);

  const handleSectionDragStart = (key: SectionKey) => (event: React.DragEvent<HTMLDivElement>) => {
    setDraggingSection(key);
    setDragOverSection(null);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", key);
    }
  };

  const handleSectionDragEnter = (key: SectionKey) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggingSection === key) {
      return;
    }
    setDragOverSection(key);
  };

  const handleSectionDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move";
    }
  };

  const handleSectionDrop = (targetKey: SectionKey) => (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const sourceKey = (event.dataTransfer?.getData("text/plain") as SectionKey | undefined) ?? draggingSection;
    if (!sourceKey || sourceKey === targetKey) {
      setDragOverSection(null);
      setDraggingSection(null);
      return;
    }

    setSectionOrder((current) => {
      const normalized = normalizeSectionOrder(current);
      const next = reorderSectionKeys(normalized, sourceKey, targetKey);
      updateSiteSettings({ sectionOrder: next });
      return next;
    });

    setDragOverSection(null);
    setDraggingSection(null);
  };

  const handleSectionDragEnd = () => {
    setDragOverSection(null);
    setDraggingSection(null);
  };

  const handleMembershipFieldChange = <K extends keyof MembershipTierSettings>(
    id: string,
    field: K,
    value: MembershipTierSettings[K],
  ) => {
    setMembershipDrafts((current) => {
      const next = current.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier));
      updateSiteSettings({ membershipTiers: next });
      return next;
    });
  };

  const handleMembershipFeaturesChange = (id: string, value: string) => {
    const features = value
      .split(/\r?\n/)
      .map((feature) => feature.trim())
      .filter(Boolean);
    handleMembershipFieldChange(id, "features", features);
  };

  const addMembershipTier = () => {
    const newTier: MembershipTierSettings = {
      id: generateLocalId("tier"),
      title: "Nytt medlemskap",
      price: "0 kr / mnd",
      color: "green",
      features: ["Fordel 1", "Fordel 2"],
    };

    setMembershipDrafts((current) => {
      const next = [...current, newTier];
      updateSiteSettings({ membershipTiers: next });
      return next;
    });
  };

  const removeMembershipTier = (id: string) => {
    setMembershipDrafts((current) => {
      const next = current.filter((tier) => tier.id !== id);
      const safeNext = next.length > 0 ? next : current;
      updateSiteSettings({ membershipTiers: safeNext });
      return safeNext;
    });
  };

  const handlePartnerFieldChange = (id: string, field: keyof PartnerLogo, value: string) => {
    setPartnerLogos((current) => {
      const next = current.map((partner) =>
        partner.id === id ? { ...partner, [field]: value } : partner,
      );
      updateSiteSettings({ partnerLogos: next });
      return next;
    });
  };

  const addPartnerLogo = () => {
    const newPartner: PartnerLogo = {
      id: generateLocalId("partner"),
      name: "Ny partner",
      logoUrl: "",
    };

    setPartnerLogos((current) => {
      const next = [...current, newPartner];
      updateSiteSettings({ partnerLogos: next });
      return next;
    });
  };

  const removePartnerLogo = (id: string) => {
    setPartnerLogos((current) => {
      const next = current.filter((partner) => partner.id !== id);
      updateSiteSettings({ partnerLogos: next });
      return next.length > 0 ? next : current;
    });
  };

  const handlePartnerLogoUpload = (id: string) => async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      handlePartnerFieldChange(id, "logoUrl", dataUrl);
    } finally {
      event.target.value = "";
    }
  };

  const handleLogoFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setBrandForm((state) => ({ ...state, logoUrl: dataUrl }));
      updateSiteSettings({ logoUrl: dataUrl });
    } finally {
      event.target.value = "";
    }
  };

  const totals = useMemo(() => {
    const totalMembers = statsHistory.at(-1)?.members ?? 0;
    const totalWatchHours = statsHistory.reduce((sum, point) => sum + point.watchHours, 0);
    const totalTournaments = statsHistory.reduce((sum, point) => sum + point.tournaments, 0);
    const totalNewMembers = statsHistory.reduce((sum, point) => sum + point.newMembers, 0);
    const growth = computeGrowth(statsHistory);

    return { totalMembers, totalWatchHours, totalTournaments, totalNewMembers, growth };
  }, [statsHistory]);

  const chart = useMemo(() => buildChartPoints(statsHistory), [statsHistory]);
  const sponsorSegments = useMemo(() => buildSponsorSegments(players), [players]);

  const handleBrandSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSiteSettings(brandForm);
  };

  const lastLogin = auth.state.lastLoginAt ? formatDateTime(auth.state.lastLoginAt) : null;

  const handleModuleToggle = (module: ModuleKey) => {
    const nextValue = !moduleSettings[module];
    updateSiteSettings({ modules: { [module]: nextValue } as Partial<SiteModules> });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-6 py-12">
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <nav className="sticky top-24 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Adminmeny</p>
              <ul className="mt-4 space-y-2">
                {ADMIN_NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-white"
                    >
                      <item.Icon className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full justify-start gap-2 bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                <a href="/admin/members">
                  <Users className="h-4 w-4" aria-hidden="true" /> Administrer medlemmer
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10">
                <a href="/admin/profile-preview">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> Forhåndsvis profiler
                </a>
              </Button>
            </div>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <header
            id="overview"
            className="scroll-mt-32 flex flex-col justify-between gap-6 lg:flex-row lg:items-start"
          >
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
                <ShieldCheck className="h-4 w-4" /> Intern oversikt
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Adminpanel for Fjolsenbanden</h1>
              <p className="max-w-2xl text-base text-slate-300">
                Oppdater profileringen, styr hvilke moduler som vises og følg med på vekst direkte fra ett samlet kontrollrom.
                Medlemsdata håndteres nå i en egen administrasjonsside.
              </p>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex flex-wrap items-center justify-end gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
                  <Lock className="h-3.5 w-3.5" /> Innlogget som administrator
                </span>
                <Button className="bg-white/10 text-white hover:bg-white/20" type="button">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Eksporter CSV
                </Button>
                <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/15" type="button">
                  <MessageCircle className="mr-2 h-4 w-4" /> Del status
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/15"
                  onClick={auth.logout}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logg ut
                </Button>
              </div>
              {lastLogin ? <p className="text-xs text-slate-400">Sist verifisert {lastLogin}</p> : null}
            </div>
          </header>

          <div className="lg:hidden">
            <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
              {ADMIN_NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <section id="site" className="grid gap-6 scroll-mt-32 lg:grid-cols-[1.2fr,1fr]">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white">Oppdater logo og tekst</CardTitle>
              <p className="text-sm text-slate-300">
                Tilpass hvordan Fjolsenbanden presenteres utad. Endringene vises med en gang i forhåndsvisningen.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-5" onSubmit={handleBrandSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="text-slate-200">
                    Logo-URL
                  </Label>
                  <Input
                    id="logoUrl"
                    name="logoUrl"
                    value={brandForm.logoUrl}
                    onChange={(event) => setBrandForm((state) => ({ ...state, logoUrl: event.target.value }))}
                    placeholder="https://..."
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
                      <UploadCloud className="h-4 w-4" aria-hidden="true" />
                      Last opp fil
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoFileChange}
                      />
                    </label>
                    <p className="text-xs text-slate-400">Støtter PNG, JPG og SVG. Maks 2&nbsp;MB anbefales.</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroTitle" className="text-slate-200">
                    Hovedtittel
                  </Label>
                  <Input
                    id="heroTitle"
                    name="heroTitle"
                    value={brandForm.heroTitle}
                    onChange={(event) => setBrandForm((state) => ({ ...state, heroTitle: event.target.value }))}
                    placeholder="FJOLSENBANDEN"
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heroTagline" className="text-slate-200">
                    Ingress / slagord
                  </Label>
                  <Textarea
                    id="heroTagline"
                    name="heroTagline"
                    rows={3}
                    value={brandForm.heroTagline}
                    onChange={(event) => setBrandForm((state) => ({ ...state, heroTagline: event.target.value }))}
                    placeholder="Beskriv kort hva Fjolsenbanden tilbyr"
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presentationVideoUrl" className="text-slate-200">
                    Presentasjonsvideo (YouTube-embed)
                  </Label>
                  <Input
                    id="presentationVideoUrl"
                    name="presentationVideoUrl"
                    value={brandForm.presentationVideoUrl}
                    onChange={(event) =>
                      setBrandForm((state) => ({ ...state, presentationVideoUrl: event.target.value }))
                    }
                    placeholder="https://www.youtube.com/embed/..."
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-400">
                    Lim inn adressen fra «Del» → «Bygg inn» (starter med https://www.youtube.com/embed/).
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitchEmbedUrl" className="text-slate-200">
                    Twitch-embed URL
                  </Label>
                  <Input
                    id="twitchEmbedUrl"
                    name="twitchEmbedUrl"
                    value={brandForm.twitchEmbedUrl}
                    onChange={(event) =>
                      setBrandForm((state) => ({ ...state, twitchEmbedUrl: event.target.value }))
                    }
                    placeholder="https://player.twitch.tv/?channel=...&parent=din-side.no"
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-400">
                    Husk å oppdatere <code className="rounded bg-white/10 px-1 py-[1px]">parent</code>-parameteren med domenet ditt.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="announcement" className="text-slate-200">
                    Aktuell melding
                  </Label>
                  <Textarea
                    id="announcement"
                    name="announcement"
                    rows={2}
                    value={brandForm.announcement}
                    onChange={(event) => setBrandForm((state) => ({ ...state, announcement: event.target.value }))}
                    placeholder="Neste livesending starter..."
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-400">
                    Lagres automatisk i nettleseren når du klikker «Publiser endringer».
                  </p>
                  <Button type="submit" className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                    Lagre endringer
                  </Button>
                </div>
              </form>
              <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-white">Moduler på forsiden</p>
                  <span className="text-xs text-slate-300">Slå av seksjoner som ikke skal vises.</span>
                </div>
                <div className="space-y-3">
                  {orderedSectionItems.map((item, index) => {
                    const enabled = item.moduleKey ? moduleSettings[item.moduleKey] : true;
                    const isDropTarget = dragOverSection === item.key;
                    const isDragging = draggingSection === item.key;
                    const orderLabel = String(index + 1).padStart(2, "0");

                    return (
                      <div
                        key={item.key}
                        draggable
                        onDragStart={handleSectionDragStart(item.key)}
                        onDragEnter={handleSectionDragEnter(item.key)}
                        onDragOver={handleSectionDragOver}
                        onDrop={handleSectionDrop(item.key)}
                        onDragEnd={handleSectionDragEnd}
                        className={`flex flex-col gap-4 rounded-xl border bg-slate-950/30 p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                          isDropTarget
                            ? "border-emerald-400/60 bg-emerald-500/10"
                            : isDragging
                            ? "border-cyan-400/60 bg-cyan-500/10"
                            : "border-white/10"
                        }`}
                      >
                        <div className="flex flex-1 items-start gap-3 text-left">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-emerald-200">
                            {orderLabel}
                          </span>
                          <div className="flex-1">
                            <p className="flex items-center gap-2 text-sm font-semibold text-white">
                              <item.Icon className="h-4 w-4 text-emerald-300" /> {item.label}
                            </p>
                            <p className="text-xs text-slate-300">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 self-stretch sm:self-auto">
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-widest text-slate-300">
                            <GripVertical className="h-3.5 w-3.5" aria-hidden="true" /> Flytt
                          </span>
                          {item.moduleKey ? (
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleModuleToggle(item.moduleKey!);
                              }}
                              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold transition ${
                                enabled
                                  ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
                                  : "border-white/20 bg-white/5 text-slate-200 hover:bg-white/10"
                              }`}
                              aria-pressed={enabled}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${enabled ? "bg-emerald-300" : "bg-slate-400"}`}
                                aria-hidden="true"
                              />
                              {enabled ? "Aktivert" : "Skjult"}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold text-slate-200">
                              <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" /> Alltid aktiv
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-indigo-900/80 via-indigo-950 to-slate-950 text-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-base text-white">
                Forhåndsvisning
                <span className="text-xs font-medium text-indigo-200">Oppdatert i sanntid</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div
                className="overflow-hidden rounded-2xl border border-white/10"
                style={{ background: brandBackground }}
              >
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                      {siteSettings.logoUrl ? (
                        <img
                          src={siteSettings.logoUrl}
                          alt="Fjolsenbanden-logo"
                          className="max-h-12 max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-lg font-semibold tracking-wide">FB</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-300">Brand hero</p>
                      <p className="text-lg font-semibold text-white">Førsteinntrykket ute på nettsiden</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                      {siteSettings.heroTitle || "FJOLSENBANDEN"}
                    </h2>
                    <p className="text-sm text-slate-200 sm:text-base">
                      {siteSettings.heroTagline ||
                        "Spillglede for hele familien – trygge streams, turneringer og premier."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button className="rounded-full bg-emerald-500 px-5 text-sm font-semibold text-emerald-950 shadow-lg">
                      Bli med på neste stream
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/30 bg-white/10 px-5 text-sm text-white hover:bg-white/20"
                    >
                      Les medlemsguiden
                    </Button>
                  </div>
                </div>
                <div className="border-t border-white/10 bg-white/5 px-6 py-4 text-xs text-slate-200">
                  <span className="font-semibold text-white">Nyhet:</span> {siteSettings.announcement}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-indigo-200">Medlemsvekst</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{totals.totalMembers.toLocaleString("no-NO")}</p>
                  <p className="text-xs text-indigo-100/80">Medlemmer totalt</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-indigo-200">Nye medlemmer</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{totals.totalNewMembers}</p>
                  <p className="text-xs text-indigo-100/80">Siste 6 måneder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

          <section id="memberships" className="grid gap-6 scroll-mt-32 lg:grid-cols-2">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-emerald-300" /> Medlemskap
              </CardTitle>
              <p className="text-sm text-slate-300">
                Oppdater navn, pris og fordeler for hver medlemskategori. Endringer lagres med en gang.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {membershipDrafts.map((tier) => (
                <div
                  key={tier.id}
                  className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{tier.title || "Medlemskap"}</p>
                      <p className="text-xs text-slate-400">Vises i prislisten på forsiden.</p>
                    </div>
                    <Button
                      variant="outline"
                      className="inline-flex items-center gap-2 border-white/20 bg-white/5 text-xs text-slate-200 hover:bg-white/10"
                      type="button"
                      onClick={() => removeMembershipTier(tier.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Fjern
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`tier-title-${tier.id}`} className="text-slate-200">
                        Navn
                      </Label>
                      <Input
                        id={`tier-title-${tier.id}`}
                        value={tier.title}
                        onChange={(event) => handleMembershipFieldChange(tier.id, "title", event.target.value)}
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`tier-price-${tier.id}`} className="text-slate-200">
                        Pris
                      </Label>
                      <Input
                        id={`tier-price-${tier.id}`}
                        value={tier.price}
                        onChange={(event) => handleMembershipFieldChange(tier.id, "price", event.target.value)}
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tier-color-${tier.id}`} className="text-slate-200">
                      Fargevalg
                    </Label>
                    <select
                      id={`tier-color-${tier.id}`}
                      value={tier.color}
                      onChange={(event) =>
                        handleMembershipFieldChange(
                          tier.id,
                          "color",
                          event.target.value as MembershipTierSettings["color"],
                        )
                      }
                      className="w-full rounded-lg border border-white/15 bg-slate-950/40 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="green">Grønn</option>
                      <option value="cyan">Turkis</option>
                      <option value="amber">Gul</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`tier-features-${tier.id}`} className="text-slate-200">
                      Fordeler (én per linje)
                    </Label>
                    <Textarea
                      id={`tier-features-${tier.id}`}
                      value={tier.features.join("\n")}
                      onChange={(event) => handleMembershipFeaturesChange(tier.id, event.target.value)}
                      rows={3}
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="inline-flex items-center gap-2 bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                onClick={addMembershipTier}
              >
                <Plus className="h-4 w-4" /> Legg til medlemskap
              </Button>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Crown className="h-5 w-5 text-amber-300" /> Samarbeidspartnere
              </CardTitle>
              <p className="text-sm text-slate-300">
                Last opp logoer og oppdater navn på partnerne som vises på forsiden.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {partnerLogos.map((partner) => (
                <div
                  key={partner.id}
                  className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={partner.name || "Partnerlogo"}
                          className="h-16 w-16 object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">Ingen logo</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor={`partner-name-${partner.id}`} className="text-slate-200">
                          Navn
                        </Label>
                        <Input
                          id={`partner-name-${partner.id}`}
                          value={partner.name}
                          onChange={(event) => handlePartnerFieldChange(partner.id, "name", event.target.value)}
                          className="bg-slate-950/40 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`partner-logo-${partner.id}`} className="text-slate-200">
                          Logo-URL
                        </Label>
                        <Input
                          id={`partner-logo-${partner.id}`}
                          value={partner.logoUrl}
                          onChange={(event) => handlePartnerFieldChange(partner.id, "logoUrl", event.target.value)}
                          placeholder="https://..."
                          className="bg-slate-950/40 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10">
                      <UploadCloud className="h-4 w-4" aria-hidden="true" />
                      Last opp logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePartnerLogoUpload(partner.id)}
                      />
                    </label>
                    <Button
                      variant="outline"
                      className="inline-flex items-center gap-2 border-white/20 bg-white/5 text-xs text-slate-200 hover:bg-white/10"
                      type="button"
                      onClick={() => removePartnerLogo(partner.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Fjern
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="inline-flex items-center gap-2 bg-cyan-500 text-cyan-950 hover:bg-cyan-400"
                onClick={addPartnerLogo}
              >
                <Plus className="h-4 w-4" /> Legg til partner
              </Button>
            </CardContent>
          </Card>
        </section>

          <section id="insights" className="grid gap-6 scroll-mt-32 lg:grid-cols-[2fr,1fr]">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex flex-col gap-2 pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <BarChart3 className="h-5 w-5 text-cyan-300" /> Medlemsutvikling
              </CardTitle>
              <p className="text-sm text-slate-300">
                Følg utviklingen i communityet. Grafen viser total medlemmer, mens tabellen under gir rask innsikt i aktiviteter per måned.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative h-56 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                    <defs>
                      <linearGradient id="memberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={chart.areaPath}
                      fill="url(#memberGradient)"
                      opacity={0.5}
                      stroke="none"
                    />
                    <path d={chart.linePath} fill="none" stroke="#22d3ee" strokeWidth={2} strokeLinecap="round" />
                    {chart.points.map((point) => (
                      <g key={point.month}>
                        <circle cx={point.x} cy={point.y} r={1.8} fill="#0ea5e9" />
                        <text
                          x={point.x}
                          y={point.y - 4}
                          textAnchor="middle"
                          fontSize={3}
                          fill="#bae6fd"
                          className="hidden sm:block"
                        >
                          {point.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <StatTile
                    icon={<Users className="h-5 w-5 text-emerald-300" />}
                    label="Medlemmer totalt"
                    value={totals.totalMembers.toLocaleString("no-NO")}
                    description={`+${totals.growth}% siste 6 mnd`}
                  />
                  <StatTile
                    icon={<Activity className="h-5 w-5 text-cyan-300" />}
                    label="Seertimer"
                    value={totals.totalWatchHours.toLocaleString("no-NO")}
                    description="Summerte strømmetimer"
                  />
                  <StatTile
                    icon={<Trophy className="h-5 w-5 text-amber-300" />}
                    label="Turneringer"
                    value={totals.totalTournaments}
                    description="Arrangert hittil i år"
                  />
                  <StatTile
                    icon={<TrendingUp className="h-5 w-5 text-pink-300" />}
                    label="Nye denne måneden"
                    value={`+${statsHistory.at(-1)?.newMembers ?? 0}`}
                    description="Registrerte medlemmer"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm text-slate-200">
                    <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
                      <tr>
                        <th className="px-4 py-3">Måned</th>
                        <th className="px-4 py-3">Medlemmer</th>
                        <th className="px-4 py-3">Nye medlemmer</th>
                        <th className="px-4 py-3">Turneringer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statsHistory.map((point) => (
                        <tr key={point.month} className="border-t border-white/5">
                          <td className="px-4 py-3 capitalize">{point.month}</td>
                          <td className="px-4 py-3 font-semibold text-white">{point.members}</td>
                          <td className="px-4 py-3 text-emerald-300">+{point.newMembers}</td>
                          <td className="px-4 py-3 text-slate-200">{point.tournaments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-900/30 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <PieChart className="h-5 w-5 text-cyan-200" /> Sponsorsegmenter
                </CardTitle>
                <p className="text-sm text-slate-200/90">
                  Se hvilke kanaler spillerne dekker for å målrette sponsorplassene bedre.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-wide text-cyan-100/80">Profiler klare</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{sponsorSegments.totalPlayers}</p>
                  <p className="text-xs text-cyan-100/70">Med komplette kontaktdata</p>
                </div>
                <div className="space-y-3">
                  {sponsorSegments.segments.map((segment) => (
                    <div key={segment.key} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-200">
                        <span className="uppercase tracking-wide text-slate-300">{segment.label}</span>
                        <span className="font-semibold text-white">{segment.members}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-cyan-400/80"
                          style={{ width: `${segment.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <CalendarCheck className="h-5 w-5 text-emerald-300" /> Kommende milepæler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-200">
                <Milestone
                  title="Sommerfinale med familiequiz"
                  date="24. juni"
                  description="Planlegg premier og send ut invitasjoner til foreldregruppen."
                />
                <Milestone
                  title="Lansering av foreldrehub"
                  date="3. juli"
                  description="Oppdater guider og videoopptak før publisering i medlemsportalen."
                />
                <Milestone
                  title="Back-to-school kampanje"
                  date="14. august"
                  description="Koordiner sponsorer for skolestart og sikre familievennlige premier."
                />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-emerald-900/20 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Crown className="h-5 w-5 text-emerald-200" /> Tips for nye medlemmer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-emerald-50/90">
                <p className="leading-relaxed">
                  Del logoen direkte med sponsorer, og bruk slagordet i overlay for livestreams. Trenger dere flere forslag til tekst? Test ulike varianter og lagre favorittene lokalt før dere publiserer.
                </p>
                <p className="text-xs text-emerald-100/80">
                  Endringene blir liggende i nettleseren din. Når du er fornøyd, kan du eksportere oppsettet og dele med resten av teamet.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="team" className="space-y-6 scroll-mt-32">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Team og profiler</h2>
              <p className="text-sm text-slate-300">
                Hver spiller får automatisk en profilside. Administrer detaljer fra medlemsoversikten.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                <a href="/admin/members">Åpne medlemsadministrasjon</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/15"
              >
                <a href="/admin/profile-preview">Forhåndsvis profiler</a>
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-300" /> Aktive spillere
                  </span>
                  <span className="text-xs text-slate-300">{players.length} totalt</span>
                </CardTitle>
                <p className="text-sm text-slate-300">
                  Se en rask oversikt over laget. For å oppdatere informasjon, bruk medlemsadministrasjonen.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.length ? (
                    players.slice(0, 4).map((player) => (
                      <article
                        key={player.id}
                        className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={player.avatarUrl}
                            alt={player.gamerTag}
                            className="h-16 w-16 rounded-2xl object-cover"
                          />
                          <div>
                            <p className="text-lg font-semibold text-white">{player.gamerTag}</p>
                            <p className="text-xs uppercase tracking-wide text-slate-300">{player.mainGame}</p>
                            <p className="text-xs text-slate-400">Med siden {formatDate(player.joinDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <Button asChild size="sm" className="bg-cyan-500 text-cyan-950 hover:bg-cyan-400">
                            <a href={`/players/${player.slug}`}>
                              <ArrowUpRight className="mr-2 h-4 w-4" /> Åpne profil
                            </a>
                          </Button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-300">
                      Ingen spillere er registrert ennå. Opprett den første via medlemsadministrasjonen.
                    </p>
                  )}
                  {players.length > 4 ? (
                    <p className="text-xs text-slate-400">
                      Vis hele listen og gjør endringer under «Administrer medlemmer».
                    </p>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-slate-900/40 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShieldCheck className="h-5 w-5 text-cyan-200" /> Slik jobber du med medlemmene
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-200">
                <p>
                  All medlemsdata – inkludert kontaktinfo og sosiale kanaler – ligger samlet på den nye siden for medlemshåndtering.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li>• Oppdater biografi, spill og sosiale lenker direkte per medlem.</li>
                  <li>• Registrer nye spillere med full kontaktinfo og tildel slug automatisk.</li>
                  <li>• Bruk forhåndsvisningen for å kvalitetssikre profilen før du deler den.</li>
                </ul>
                <Button asChild variant="outline" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/15">
                  <a href="/admin/members">Gå til medlemshåndtering</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

function normalizeSectionOrder(order?: SectionKey[]): SectionKey[] {
  const fallback = DEFAULT_SECTION_ORDER;
  const incoming = Array.isArray(order) ? order : [];
  const combined = [...incoming, ...fallback];
  const seen = new Set<SectionKey>();
  const result: SectionKey[] = [];

  combined.forEach((key) => {
    if (fallback.includes(key) && !seen.has(key)) {
      seen.add(key);
      result.push(key);
    }
  });

  return result;
}

function reorderSectionKeys(order: SectionKey[], source: SectionKey, target: SectionKey): SectionKey[] {
  const sourceIndex = order.indexOf(source);
  const targetIndex = order.indexOf(target);
  if (sourceIndex === -1 || targetIndex === -1) {
    return order;
  }

  const next = [...order];
  next.splice(sourceIndex, 1);
  next.splice(targetIndex, 0, source);
  return next;
}

function generateLocalId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(typeof reader.result === "string" ? reader.result : "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatDateTime(input: string): string {
  if (!input) {
    return "";
  }
  try {
    return new Date(input).toLocaleString("no-NO", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (error) {
    return input;
  }
}

function computeGrowth(history: StatsPoint[]): number {
  if (history.length < 2) {
    return 0;
  }
  const first = history[0]?.members ?? 0;
  const last = history.at(-1)?.members ?? 0;
  if (!first) {
    return last ? 100 : 0;
  }
  return Math.round(((last - first) / first) * 100);
}

function buildChartPoints(history: StatsPoint[]) {
  if (history.length === 0) {
    return { points: [], linePath: "", areaPath: "" };
  }
  const maxMembers = Math.max(...history.map((point) => point.members));
  const minMembers = Math.min(...history.map((point) => point.members));
  const range = Math.max(maxMembers - minMembers, 1);
  const horizontalStep = history.length > 1 ? 100 / (history.length - 1) : 0;

  const points = history.map((point, index) => {
    const x = index * horizontalStep;
    const y = 100 - ((point.members - minMembers) / range) * 90 - 5;
    return { x, y, month: point.month, label: point.members.toString() };
  });

  const linePath = points.reduce((path, point, index) => {
    const command = index === 0 ? "M" : "L";
    return `${path} ${command}${point.x},${point.y}`;
  }, "").trim();

  const areaPath = `${linePath} L${points.at(-1)?.x ?? 100},100 L${points[0]?.x ?? 0},100 Z`;

  return { points, linePath, areaPath };
}

function buildSponsorSegments(players: PlayerProfile[]) {
  const definitions = [
    { key: "fortnite" as const, label: "Fortnite" },
    { key: "twitch" as const, label: "Twitch" },
    { key: "discord" as const, label: "Discord" },
    { key: "tiktok" as const, label: "TikTok" },
    { key: "youtube" as const, label: "YouTube" },
  ];

  const segments = definitions.map((definition) => {
    const members = players.filter((player) => {
      const handle = player.socials[definition.key];
      return Boolean(handle && handle.trim());
    }).length;
    return { ...definition, members };
  });

  const maxMembers = Math.max(1, ...segments.map((segment) => segment.members));

  return {
    totalPlayers: players.length,
    segments: segments.map((segment) => ({
      ...segment,
      percent:
        segment.members > 0 ? Math.max((segment.members / maxMembers) * 100, 12) : 0,
    })),
  };
}

function formatDate(input: string): string {
  if (!input) {
    return "Ukjent";
  }
  try {
    return new Date(input).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "short",
    });
  } catch (error) {
    return input;
  }
}

interface StatTileProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
}

function StatTile({ icon, label, value, description }: StatTileProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
        <span>{label}</span>
        {icon}
      </div>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="text-xs text-slate-300">{description}</p>
    </div>
  );
}

interface MilestoneProps {
  title: string;
  date: string;
  description: string;
}

function Milestone({ title, date, description }: MilestoneProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-300">
        <span>{title}</span>
        <span className="text-emerald-200">{date}</span>
      </div>
      <p className="mt-2 text-sm text-slate-200">{description}</p>
    </div>
  );
}
