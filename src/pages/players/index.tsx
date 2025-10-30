"use client";

import { useMemo } from "react";
import { ArrowRight, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MemberLoginView from "@/components/MemberLoginView";
import { useAdminState } from "@/lib/admin-state";
import { useMemberAuth } from "@/lib/member-auth";

export default function PlayersIndexPage() {
  const memberAuth = useMemberAuth();
  const { state } = useAdminState();
  const { siteSettings, players, statsHistory } = state;

  if (!memberAuth.state.isAuthenticated) {
    return (
      <MemberLoginView
        auth={memberAuth}
        description="Logg inn som medlem for å se spilleroversikten og profiler med medlemsinnhold."
      />
    );
  }

  const totalMembers = statsHistory.at(-1)?.members ?? players.length * 120;
  const tournaments = statsHistory.reduce((sum, point) => sum + point.tournaments, 0);

  const featuredPlayers = useMemo(() => players.slice(0, 6), [players]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="border-white/15 bg-white/5 text-white hover:bg-white/15"
            onClick={memberAuth.logout}
          >
            Logg ut
          </Button>
        </div>
        <header className="space-y-6 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-cyan-100">
            <Users className="h-3.5 w-3.5" /> Spillerstallen
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Spillere i {siteSettings.heroTitle || "Fjolsenbanden"}
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-300 sm:text-base">
            Communityet vokser hver uke. Her finner du oversikt over våre trygge og familievennlige streamere, med lenker til
            deres profiler og sosiale kanaler.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-200">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Users className="h-4 w-4 text-emerald-300" /> {totalMembers.toLocaleString("no-NO")} medlemmer
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Trophy className="h-4 w-4 text-amber-300" /> {tournaments} turneringer i år
            </span>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {featuredPlayers.map((player) => (
            <Card key={player.id} className="border-white/10 bg-white/5 text-white">
              <CardHeader className="flex items-center gap-4">
                <img src={player.avatarUrl} alt={player.gamerTag} className="h-14 w-14 rounded-2xl object-cover" />
                <div>
                  <CardTitle className="text-xl text-white">{player.gamerTag}</CardTitle>
                  <p className="text-xs uppercase tracking-wide text-slate-300">{player.mainGame}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-200 line-clamp-3">{player.bio}</p>
                <div className="text-xs uppercase tracking-wide text-slate-300">
                  Med siden {new Date(player.joinDate).toLocaleDateString("no-NO", { month: "short", year: "numeric" })}
                </div>
                <a
                  href={`/players/${player.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-cyan-950 shadow transition hover:bg-cyan-400"
                >
                  Se profil <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
          {featuredPlayers.length === 0 ? (
            <Card className="border-white/10 bg-white/5 text-white">
              <CardContent className="p-8 text-center text-sm text-slate-300">
                Ingen spillere er registrert ennå. Opprett deres første profil i adminpanelet.
              </CardContent>
            </Card>
          ) : null}
        </section>
      </div>
    </div>
  );
}
