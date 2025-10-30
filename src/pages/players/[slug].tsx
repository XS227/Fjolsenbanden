"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import MemberLoginView from "@/components/MemberLoginView";
import { useAdminState } from "@/lib/admin-state";
import PlayerProfileView from "@/components/PlayerProfileView";
import { useMemberAuth } from "@/lib/member-auth";

export default function PlayerProfilePage() {
  const memberAuth = useMemberAuth();
  const { state, findPlayerBySlug } = useAdminState();
  const { siteSettings } = state;
  const [slug, setSlug] = useState(() => "");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const pathSlug = window.location.pathname.split("/").filter(Boolean).pop() ?? "";
    setSlug(decodeURIComponent(pathSlug));
  }, []);

  const player = useMemo(() => (slug ? findPlayerBySlug(slug) : null), [findPlayerBySlug, slug]);

  if (!memberAuth.state.isAuthenticated) {
    return (
      <MemberLoginView
        auth={memberAuth}
        title="Medlemsinnhold"
        description="Logg inn som medlem (brukernavn og passord: User) for å se spillerprofilen."
      />
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
          <Shield className="h-12 w-12 text-emerald-300" />
          <h1 className="text-3xl font-semibold text-white">Profilen er ikke klar ennå</h1>
          <p className="max-w-lg text-sm text-slate-300">
            Vi fant ingen spiller med denne adressen. Oppdater adminpanelet og lag en ny profil for spilleren, eller del en
            gyldig lenke.
          </p>
          <Button className="bg-cyan-500 text-cyan-950 hover:bg-cyan-400">
            <a href="/admin" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Tilbake til admin
            </a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PlayerProfileView
      player={player}
      siteSettings={siteSettings}
      backLink={{ href: "/players", label: "Til spilleroversikt" }}
      extraActions={
        <Button
          variant="outline"
          className="border-white/15 bg-white/5 text-white hover:bg-white/15"
          onClick={memberAuth.logout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Logg ut
        </Button>
      }
    />
  );
}
