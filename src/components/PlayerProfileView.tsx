"use client";

import type { ReactNode } from "react";
import { ArrowLeft, Award, Gamepad2, MessageCircle, Music2, Twitch, Youtube } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlayerProfile, PlayerSocialHandles, SiteSettings } from "@/lib/admin-state";

interface PlayerProfileViewProps {
  player: PlayerProfile;
  siteSettings: SiteSettings;
  backLink?: {
    href: string;
    label: string;
  };
  extraActions?: ReactNode;
}

function PlayerProfileView({ player, siteSettings, backLink, extraActions }: PlayerProfileViewProps) {
  const heroTitle = siteSettings.heroTitle?.trim() || "Fjolsenbanden";
  const socialEntries = buildSocialEntries(player.socials);
  const segmentSummary = formatSegments(player.socials);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.25),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
          {backLink || extraActions ? (
            <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              {backLink ? (
                <a
                  href={backLink.href}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" /> {backLink.label}
                </a>
              ) : (
                <span className="hidden sm:block" />
              )}
              {extraActions ? <div className="flex justify-center sm:justify-end">{extraActions}</div> : null}
            </div>
          ) : null}

          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <img
              src={player.avatarUrl}
              alt={player.gamerTag}
              className="h-28 w-28 rounded-3xl border-4 border-white/30 object-cover shadow-xl"
            />
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-cyan-200">{heroTitle}</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">{player.gamerTag}</h1>
              <p className="text-sm text-slate-200 sm:text-base">{player.bio}</p>
              {socialEntries.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
                  {socialEntries.map((entry) => (
                    <SocialLink
                      key={entry.key}
                      href={entry.href}
                      label={entry.label}
                      handle={entry.handle}
                      icon={entry.icon}
                    />
                  ))}
                </div>
              ) : null}
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
                <InfoRow label="Hovedspill" value={player.mainGame} />
                <InfoRow
                  label="Med siden"
                  value={new Date(player.joinDate).toLocaleDateString("no-NO", {
                    month: "long",
                    year: "numeric",
                  })}
                />
                {segmentSummary ? <InfoRow label="Segmenter" value={segmentSummary} /> : null}
                <InfoRow label="Kontakt" value="Kontaktinfo deles kun gjennom Fjolsenbanden-admin." />
              </CardContent>
            </Card>
        </section>

        <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-slate-900/40 text-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-white">Hvorfor vi stoler på {player.gamerTag}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-200">
            <p>
              {player.gamerTag} er en del av {heroTitle} fordi spilleren skaper trygge og inkluderende opplevelser for hele
              familien. Foreldre får alltid informasjon om hvem barnet spiller med, og sendingene modereres av teamet vårt.
            </p>
            <p className="text-xs text-slate-300">
              Disse profilene administreres via det interne adminpanelet. Oppdater bio, logo og tekst der for å holde informasjonen fersk.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { PlayerProfileView };
export default PlayerProfileView;

interface SocialLinkProps {
  href?: string;
  label: string;
  handle: string;
  icon: ReactNode;
}

function SocialLink({ href, label, handle, icon }: SocialLinkProps) {
  const content = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">{icon}</span>
      <span className="flex flex-col text-left">
        <span className="text-[11px] uppercase tracking-widest text-slate-300">{label}</span>
        <span className="text-sm font-medium text-white">{handle}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white transition hover:border-cyan-400 hover:text-cyan-200"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs text-white">
      {content}
    </div>
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

function buildSocialEntries(socials: PlayerSocialHandles) {
  const config = [
    { key: "fortnite" as const, label: "Fortnite", icon: <Gamepad2 className="h-4 w-4" />, href: undefined },
    {
      key: "twitch" as const,
      label: "Twitch",
      icon: <Twitch className="h-4 w-4" />,
      href: (handle: string) => `https://twitch.tv/${stripHandle(handle)}`,
    },
    {
      key: "discord" as const,
      label: "Discord",
      icon: <MessageCircle className="h-4 w-4" />,
      href: undefined,
    },
    {
      key: "tiktok" as const,
      label: "TikTok",
      icon: <Music2 className="h-4 w-4" />,
      href: (handle: string) => `https://www.tiktok.com/@${stripHandle(handle)}`,
    },
    {
      key: "youtube" as const,
      label: "YouTube",
      icon: <Youtube className="h-4 w-4" />,
      href: (handle: string) => `https://www.youtube.com/@${stripHandle(handle)}`,
    },
  ];

  return config
    .map((item) => {
      const handle = socials[item.key];
      if (!handle) {
        return null;
      }
      const cleanHandle = handle.trim();
      const href = typeof item.href === "function" ? item.href(cleanHandle) : undefined;
      return {
        key: item.key,
        label: item.label,
        handle: cleanHandle,
        href,
        icon: item.icon,
      };
    })
    .filter((entry): entry is {
      key: keyof PlayerSocialHandles;
      label: string;
      handle: string;
      href?: string;
      icon: ReactNode;
    } => Boolean(entry));
}

function formatSegments(socials: PlayerSocialHandles): string {
  const segments = [
    socials.fortnite ? "Fortnite" : null,
    socials.twitch ? "Twitch" : null,
    socials.youtube ? "YouTube" : null,
    socials.discord ? "Discord" : null,
    socials.tiktok ? "TikTok" : null,
  ].filter(Boolean);

  return segments.join(" • ");
}

function stripHandle(handle: string): string {
  return handle.replace(/^@/, "");
}
