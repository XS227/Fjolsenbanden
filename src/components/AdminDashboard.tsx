"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  Crown,
  Loader2,
  Lock,
  LogOut,
  MessageCircle,
  Plus,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatsPoint, useAdminState } from "@/lib/admin-state";
import { useAdminAuth } from "@/lib/admin-auth";

const brandBackground = "radial-gradient(circle at 15% 15%, rgba(64,172,255,0.3), transparent 55%), #03091b";

interface BrandFormState {
  logoUrl: string;
  heroTitle: string;
  heroTagline: string;
  announcement: string;
}

interface NewPlayerState {
  gamerTag: string;
  realName: string;
  mainGame: string;
  bio: string;
  achievements: string;
  avatarUrl: string;
  joinDate: string;
  twitch?: string;
  youtube?: string;
  tiktok?: string;
}

const emptyNewPlayer = (): NewPlayerState => ({
  gamerTag: "",
  realName: "",
  mainGame: "",
  bio: "",
  achievements: "",
  avatarUrl: "",
  joinDate: new Date().toISOString().slice(0, 10),
  twitch: "",
  youtube: "",
  tiktok: "",
});

export default function AdminDashboard() {
  const auth = useAdminAuth();

  if (!auth.state.isAuthenticated) {
    return <AdminLoginView auth={auth} />;
  }

  return <AdminDashboardContent auth={auth} />;
}

interface DashboardContentProps {
  auth: ReturnType<typeof useAdminAuth>;
}

function AdminDashboardContent({ auth }: DashboardContentProps) {
  const { state, updateSiteSettings, addPlayer, removePlayer } = useAdminState();
  const { siteSettings, players, statsHistory } = state;

  const [brandForm, setBrandForm] = useState<BrandFormState>(siteSettings);
  const [newPlayer, setNewPlayer] = useState<NewPlayerState>(emptyNewPlayer());
  const [justAddedPlayer, setJustAddedPlayer] = useState<string | null>(null);

  useEffect(() => {
    setBrandForm(siteSettings);
  }, [siteSettings]);

  const totals = useMemo(() => {
    const totalMembers = statsHistory.at(-1)?.members ?? 0;
    const totalWatchHours = statsHistory.reduce((sum, point) => sum + point.watchHours, 0);
    const totalTournaments = statsHistory.reduce((sum, point) => sum + point.tournaments, 0);
    const totalNewMembers = statsHistory.reduce((sum, point) => sum + point.newMembers, 0);
    const growth = computeGrowth(statsHistory);

    return { totalMembers, totalWatchHours, totalTournaments, totalNewMembers, growth };
  }, [statsHistory]);

  const chart = useMemo(() => buildChartPoints(statsHistory), [statsHistory]);

  const handleBrandSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateSiteSettings(brandForm);
  };

  const handleAddPlayer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPlayer.gamerTag.trim()) {
      return;
    }

    addPlayer({
      gamerTag: newPlayer.gamerTag.trim(),
      realName: newPlayer.realName.trim() || newPlayer.gamerTag.trim(),
      mainGame: newPlayer.mainGame.trim() || "Allsidig",
      bio: newPlayer.bio.trim() || "Ny i Fjolsenbanden. Profilen oppdateres snart!",
      achievements: extractAchievements(newPlayer.achievements),
      avatarUrl:
        newPlayer.avatarUrl.trim() ||
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=320&q=80",
      joinDate: newPlayer.joinDate,
      socials: {
        twitch: newPlayer.twitch?.trim() || undefined,
        youtube: newPlayer.youtube?.trim() || undefined,
        tiktok: newPlayer.tiktok?.trim() || undefined,
      },
    });

    setJustAddedPlayer(newPlayer.gamerTag.trim());
    setNewPlayer(emptyNewPlayer());
  };

  const lastLogin = auth.state.lastLoginAt ? formatDateTime(auth.state.lastLoginAt) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
              <ShieldCheck className="h-4 w-4" /> Intern oversikt
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Adminpanel for Fjolsenbanden</h1>
            <p className="max-w-2xl text-base text-slate-300">
              Oppdater profileringen, legg til nye spillere og følg med på vekst direkte fra ett samlet kontrollrom. Endringer
              lagres lokalt i nettleseren slik at du kan jobbe trygt før publisering.
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

        <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white">Oppdater logo og tekst</CardTitle>
              <p className="text-sm text-slate-300">
                Tilpass hvordan Fjolsenbanden presenteres utad. Endringene vises med en gang i forhåndsvisningen.
              </p>
            </CardHeader>
            <CardContent>
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

        <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
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

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">Spillerprofiler</h2>
              <p className="text-sm text-slate-300">
                Hver spiller får automatisk en profilside som du kan dele med communityet.
              </p>
            </div>
            {justAddedPlayer ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-100">
                <ShieldCheck className="h-4 w-4" /> {justAddedPlayer} er klar med egen profilside
              </span>
            ) : null}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-cyan-300" /> Aktive spillere
                </CardTitle>
                <p className="text-sm text-slate-300">
                  Klikk på navnet for å åpne offentlig profil. Du kan også fjerne spillere herfra ved behov.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player) => (
                    <article
                      key={player.id}
                      className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[auto,1fr,auto] sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={player.avatarUrl}
                          alt={player.gamerTag}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />
                        <div>
                          <a
                            href={`/players/${player.slug}`}
                            className="text-lg font-semibold text-white hover:text-cyan-200"
                          >
                            {player.gamerTag}
                          </a>
                          <p className="text-xs uppercase tracking-wide text-slate-300">{player.mainGame}</p>
                          <p className="mt-1 text-sm text-slate-300 line-clamp-2">{player.bio}</p>
                        </div>
                      </div>
                      <dl className="grid grid-cols-2 gap-2 text-xs text-slate-300 sm:justify-self-end">
                        <div>
                          <dt className="uppercase tracking-wide text-slate-400">Ble med</dt>
                          <dd className="font-medium text-white">{formatDate(player.joinDate)}</dd>
                        </div>
                        <div>
                          <dt className="uppercase tracking-wide text-slate-400">Meritter</dt>
                          <dd className="font-medium text-emerald-200">{player.achievements.length}</dd>
                        </div>
                      </dl>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          className="border-white/20 bg-white/5 text-white hover:bg-white/20"
                          onClick={() => removePlayer(player.id)}
                        >
                          Fjern
                        </Button>
                        <Button className="bg-cyan-500 text-cyan-950 hover:bg-cyan-400" asChild>
                          <a href={`/players/${player.slug}`}>
                            <ArrowUpRight className="mr-2 h-4 w-4" /> Åpne profil
                          </a>
                        </Button>
                      </div>
                    </article>
                  ))}
                  {players.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-slate-300">
                      Ingen spillere er registrert ennå. Legg til den første spilleren i skjemaet ved siden av.
                    </p>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 via-indigo-500/10 to-slate-900/40 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Plus className="h-5 w-5 text-cyan-300" /> Legg til ny spiller
                </CardTitle>
                <p className="text-sm text-slate-300">
                  Fyll inn detaljene under for å opprette en ny profil i Fjolsenbanden.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleAddPlayer}>
                  <div className="space-y-2">
                    <Label htmlFor="gamerTag" className="text-slate-200">
                      Gamertag
                    </Label>
                    <Input
                      id="gamerTag"
                      name="gamerTag"
                      value={newPlayer.gamerTag}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, gamerTag: event.target.value }))}
                      placeholder="FjolseFar"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="realName" className="text-slate-200">
                        Fullt navn
                      </Label>
                      <Input
                        id="realName"
                        name="realName"
                        value={newPlayer.realName}
                        onChange={(event) => setNewPlayer((state) => ({ ...state, realName: event.target.value }))}
                        placeholder="Marius Fjolsen"
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mainGame" className="text-slate-200">
                        Hovedspill
                      </Label>
                      <Input
                        id="mainGame"
                        name="mainGame"
                        value={newPlayer.mainGame}
                        onChange={(event) => setNewPlayer((state) => ({ ...state, mainGame: event.target.value }))}
                        placeholder="Mario Kart 8 Deluxe"
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-slate-200">
                      Kort bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={newPlayer.bio}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, bio: event.target.value }))}
                      placeholder="Hva gjør spilleren unik?"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="achievements" className="text-slate-200">
                      Meritter (kommaseparert)
                    </Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      rows={2}
                      value={newPlayer.achievements}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, achievements: event.target.value }))}
                      placeholder="Arrangerte familieligaen 2023, Vant høstturneringen"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatarUrl" className="text-slate-200">
                      Avatar-URL
                    </Label>
                    <Input
                      id="avatarUrl"
                      name="avatarUrl"
                      value={newPlayer.avatarUrl}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, avatarUrl: event.target.value }))}
                      placeholder="https://..."
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="joinDate" className="text-slate-200">
                        Bli-med-dato
                      </Label>
                      <Input
                        id="joinDate"
                        type="date"
                        name="joinDate"
                        value={newPlayer.joinDate}
                        onChange={(event) => setNewPlayer((state) => ({ ...state, joinDate: event.target.value }))}
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitch" className="text-slate-200">
                        Twitch (valgfritt)
                      </Label>
                      <Input
                        id="twitch"
                        name="twitch"
                        value={newPlayer.twitch}
                        onChange={(event) => setNewPlayer((state) => ({ ...state, twitch: event.target.value }))}
                        placeholder="https://twitch.tv/..."
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="youtube" className="text-slate-200">
                        YouTube (valgfritt)
                      </Label>
                      <Input
                        id="youtube"
                        name="youtube"
                        value={newPlayer.youtube}
                        onChange={(event) => setNewPlayer((state) => ({ ...state, youtube: event.target.value }))}
                        placeholder="https://youtube.com/@..."
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tiktok" className="text-slate-200">
                        TikTok (valgfritt)
                      </Label>
                      <Input
                        id="tiktok"
                        name="tiktok"
                        value={newPlayer.tiktok}
                        onChange={(event) => setNewPlayer((state) => ({ ...state, tiktok: event.target.value }))}
                        placeholder="https://www.tiktok.com/@..."
                        className="bg-slate-950/40 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-cyan-500 py-3 text-cyan-950 hover:bg-cyan-400">
                    Opprett profil
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

interface AdminLoginProps {
  auth: ReturnType<typeof useAdminAuth>;
}

function AdminLoginView({ auth }: AdminLoginProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const result = await auth.login(passcode);
    if (!result.success) {
      setError(result.error ?? "Kunne ikke logge inn.");
      return;
    }
    setPasscode("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-20">
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl text-white">Admininnlogging</CardTitle>
            <p className="text-sm text-slate-300">
              Oppgi tilgangskoden som deles med administratorteamet for å åpne kontrollpanelet.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="passcode" className="text-slate-200">
                  Tilgangskode
                </Label>
                <Input
                  id="passcode"
                  name="passcode"
                  type="password"
                  autoComplete="current-password"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                  placeholder="Skriv inn koden"
                  className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  disabled={auth.isVerifying}
                  required
                />
              </div>
              {error ? (
                <p className="text-sm text-rose-300">{error}</p>
              ) : (
                <p className="text-xs text-slate-400">{auth.hint}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
                disabled={auth.isVerifying}
              >
                {auth.isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifiserer…
                  </>
                ) : (
                  "Logg inn"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-slate-500">
          Endringene du gjør etter innlogging lagres lokalt i nettleseren inntil du publiserer dem.
        </p>
      </div>
    </div>
  );
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

function extractAchievements(input: string): string[] {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
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
