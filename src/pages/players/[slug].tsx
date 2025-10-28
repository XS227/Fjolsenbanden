"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Award, ExternalLink, Shield, Twitch, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminState } from "@/lib/admin-state";

export default function PlayerProfilePage() {
  const { state, findPlayerBySlug } = useAdminState();
  const { siteSettings } = state;
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const pathSlug = window.location.pathname.split("/").filter(Boolean).pop() ?? "";
    setSlug(decodeURIComponent(pathSlug));
  }, []);

  const player = useMemo(() => (slug ? findPlayerBySlug(slug) : null), [findPlayerBySlug, slug]);

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.25),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
          <a href="/players" className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Til spilleroversikt
          </a>
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <img
              src={player.avatarUrl}
              alt={player.gamerTag}
              className="h-28 w-28 rounded-3xl border-4 border-white/30 object-cover shadow-xl"
            />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-cyan-200">{siteSettings.heroTitle || "Fjolsenbanden"}</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">{player.gamerTag}</h1>
              <p className="text-sm text-slate-200 sm:text-base">{player.bio}</p>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                {player.socials.twitch ? (
                  <SocialLink href={player.socials.twitch} label="Twitch" icon={<Twitch className="h-4 w-4" />} />
                ) : null}
                {player.socials.youtube ? (
                  <SocialLink href={player.socials.youtube} label="YouTube" icon={<Youtube className="h-4 w-4" />} />
                ) : null}
                {player.socials.tiktok ? (
                  <SocialLink href={player.socials.tiktok} label="TikTok" icon={<ExternalLink className="h-4 w-4" />} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10">
        <section className="grid gap-6 sm:grid-cols-[2fr,1fr]">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-emerald-300" /> Meritter
              </CardTitle>
            </CardHeader>
            <CardContent>
              {player.achievements.length > 0 ? (
                <ul className="space-y-3 text-sm text-slate-200">
                  {player.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-300" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-300">Meritter legges til senere.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-white">Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-200">
              <InfoRow label="Navn" value={player.realName} />
              <InfoRow label="Hovedspill" value={player.mainGame} />
              <InfoRow
                label="Med siden"
                value={new Date(player.joinDate).toLocaleDateString("no-NO", { month: "long", year: "numeric" })}
              />
              <InfoRow
                label="Kontakt"
                value={siteSettings.announcement || "Send melding via Discord-kanal for foreldre"}
              />
            </CardContent>
          </Card>
        </section>

        <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-slate-900/40 text-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-white">Hvorfor vi stoler på {player.gamerTag}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-200">
            <p>
              {player.gamerTag} er en del av {siteSettings.heroTitle || "Fjolsenbanden"} fordi spilleren skaper trygge og
              inkluderende opplevelser for hele familien. Foreldre får alltid informasjon om hvem barnet spiller med, og
              sendingene modereres av teamet vårt.
            </p>
            <p className="text-xs text-slate-300">
              Disse profilene administreres via det interne adminpanelet. Oppdater bio, logo og tekst der for å holde
              informasjonen fersk.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  label: string;
  icon: ReactNode;
}

function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-200"
    >
      {icon}
      {label}
    </a>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-slate-300">{label}</p>
      <p className="mt-1 text-sm text-white">{value}</p>
    </div>
  );
}
