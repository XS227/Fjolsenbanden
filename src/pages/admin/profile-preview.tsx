"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import PlayerProfileView from "@/components/PlayerProfileView";
import { useAdminAuth } from "@/lib/admin-auth";
import { useAdminState } from "@/lib/admin-state";

export default function AdminProfilePreviewPage() {
  const auth = useAdminAuth();

  if (!auth.state.isAuthenticated) {
    return <PreviewGate hint={auth.hint} />;
  }

  return <ProfilePreviewContent />;
}

function ProfilePreviewContent() {
  const { state } = useAdminState();
  const { siteSettings, players } = state;
  const [selectedPlayerId, setSelectedPlayerId] = useState(() => players[0]?.id ?? "");

  useEffect(() => {
    if (!players.length) {
      setSelectedPlayerId("");
      return;
    }

    const hasSelected = players.some((player) => player.id === selectedPlayerId);
    if (!hasSelected) {
      setSelectedPlayerId(players[0]!.id);
    }
  }, [players, selectedPlayerId]);

  const selectedPlayer = useMemo(
    () => players.find((player) => player.id === selectedPlayerId) ?? players[0] ?? null,
    [players, selectedPlayerId],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="space-y-6">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
              <Eye className="h-4 w-4" /> Forhåndsvis spillerprofil
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Hvordan ser profilen ut for medlemmene?</h1>
            <p className="max-w-2xl text-sm text-slate-300">
              Velg en spiller fra listen for å se den publiserte profilen slik den fremstår for medlemmer og foreldre. Endringer du gjør i adminpanelet oppdateres her så du kan kvalitetssikre alt før deling.
            </p>
          </div>

          {players.length ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor="preview-player" className="text-sm font-semibold text-slate-200">
                  Velg spiller
                </Label>
                <select
                  id="preview-player"
                  value={selectedPlayerId}
                  onChange={(event) => setSelectedPlayerId(event.currentTarget.value)}
                  className="w-full max-w-xs rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9]"
                >
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.gamerTag} ({player.mainGame})
                    </option>
                  ))}
                </select>
              </div>

              {selectedPlayer ? (
                <Button
                  variant="outline"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/15"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(`/players/${selectedPlayer.slug}`, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" /> Åpne offentlig profil
                </Button>
              ) : null}
            </div>
          ) : null}
        </header>

        {!players.length ? (
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white">Ingen spillere registrert ennå</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <p>Legg til en spiller i adminpanelet for å kunne forhåndsvise profilen deres.</p>
              <p>
                Gå til <a href="/admin" className="text-cyan-300 underline">adminpanelet</a> og bruk «Legg til spiller»-skjemaet for å komme i gang.
              </p>
            </CardContent>
          </Card>
        ) : selectedPlayer ? (
          <PlayerProfileView
            player={selectedPlayer}
            siteSettings={siteSettings}
            extraActions={
              <Button
                className="rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(`/players/${selectedPlayer.slug}`, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                Se profil i ny fane
              </Button>
            }
          />
        ) : null}
      </div>
    </div>
  );
}

function PreviewGate({ hint }: { hint: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6">
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-200">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl text-white">Logg inn for å se forhåndsvisningen</CardTitle>
            <p className="text-sm text-slate-300">
              Denne siden er for administratorer. Logg inn via adminpanelet for å forhåndsvise spillerprofiler.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <p>{hint}</p>
            <Button
              className="w-full bg-cyan-500 text-cyan-950 hover:bg-cyan-400"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/admin";
                }
              }}
            >
              Gå til admininnlogging
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
