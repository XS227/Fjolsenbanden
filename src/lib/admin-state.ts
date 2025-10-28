"use client";

import { usePersistentState } from "@/lib/persistent-state";

export interface SiteSettings {
  logoUrl: string;
  heroTitle: string;
  heroTagline: string;
  announcement: string;
}

export interface PlayerProfile {
  id: string;
  slug: string;
  gamerTag: string;
  realName: string;
  mainGame: string;
  bio: string;
  achievements: string[];
  avatarUrl: string;
  joinDate: string;
  socials: {
    twitch?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface StatsPoint {
  month: string;
  members: number;
  watchHours: number;
  tournaments: number;
  newMembers: number;
}

export interface AdminState {
  siteSettings: SiteSettings;
  players: PlayerProfile[];
  statsHistory: StatsPoint[];
}

const DEFAULT_STATE: AdminState = {
  siteSettings: {
    logoUrl: "/assets/logo.svg",
    heroTitle: "FJOLSENBANDEN",
    heroTagline: "Spillglede for hele familien – trygge streams, turneringer og premier.",
    announcement: "Neste livesending starter 20:00 med co-op i Mario Kart og premier fra Lenovo!",
  },
  players: [
    {
      id: "1",
      slug: "fjolsefar",
      gamerTag: "FjolseFar",
      realName: "Marius Fjolsen",
      mainGame: "Mario Kart 8 Deluxe",
      bio: "Trygghetskaptein og far til to. Leder familie-ligakveldene og sørger for god stemning i chatten.",
      achievements: ["Arrangerte 12 familiecups i 2023", "Sertifisert Trygg Streaming-ambassadør"],
      avatarUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80",
      joinDate: "2021-08-16",
      socials: {
        twitch: "https://twitch.tv/fjolsefar",
        youtube: "https://youtube.com/@fjolsefar",
      },
    },
    {
      id: "2",
      slug: "pixeline",
      gamerTag: "Pixeline",
      realName: "June Olsen",
      mainGame: "Stardew Valley",
      bio: "Community-mamma som elsker å samle foreldre og barn til kreative events og trygge samtaler.",
      achievements: ["Lanserte Fjolsens Sommerleir", "Bygget foreldreguiden for nye medlemmer"],
      avatarUrl:
        "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=320&q=80",
      joinDate: "2022-02-04",
      socials: {
        twitch: "https://twitch.tv/pixeline",
        tiktok: "https://www.tiktok.com/@pixeline",
      },
    },
    {
      id: "3",
      slug: "shieldkid",
      gamerTag: "ShieldKid",
      realName: "Tor Martin Fjolsen",
      mainGame: "Fortnite",
      bio: "Mod-teamets yngste beskytter som lærer bort trygge spillvaner til barn og foreldre.",
      achievements: ["Vant familieligaen vår 2023", "Holdt 18 foreldreworkshops om trygg gaming"],
      avatarUrl:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=320&q=80",
      joinDate: "2020-11-09",
      socials: {
        twitch: "https://twitch.tv/shieldkid",
        youtube: "https://youtube.com/@shieldkid",
      },
    },
  ],
  statsHistory: [
    { month: "jan", members: 620, watchHours: 480, tournaments: 3, newMembers: 54 },
    { month: "feb", members: 640, watchHours: 520, tournaments: 4, newMembers: 62 },
    { month: "mar", members: 675, watchHours: 610, tournaments: 5, newMembers: 70 },
    { month: "apr", members: 712, watchHours: 660, tournaments: 4, newMembers: 58 },
    { month: "mai", members: 756, watchHours: 720, tournaments: 6, newMembers: 81 },
    { month: "jun", members: 802, watchHours: 760, tournaments: 5, newMembers: 73 },
  ],
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function ensureUniqueSlug(existing: PlayerProfile[], base: string): string {
  let candidate = base || "spiller";
  let counter = 1;
  while (existing.some((player) => player.slug === candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }
  return candidate;
}

export function useAdminState() {
  const [state, setState] = usePersistentState<AdminState>("fjolsenbanden-admin", DEFAULT_STATE);

  const updateSiteSettings = (input: Partial<SiteSettings>) => {
    setState((current) => ({
      ...current,
      siteSettings: { ...current.siteSettings, ...input },
    }));
  };

  const addPlayer = (player: Omit<PlayerProfile, "id" | "slug">) => {
    setState((current) => {
      const baseSlug = slugify(player.gamerTag);
      const slug = ensureUniqueSlug(current.players, baseSlug);
      const newPlayer: PlayerProfile = {
        ...player,
        id: generateId(),
        slug,
      };
      return {
        ...current,
        players: [newPlayer, ...current.players],
      };
    });
  };

  const updatePlayer = (id: string, updates: Partial<PlayerProfile>) => {
    setState((current) => ({
      ...current,
      players: current.players.map((player) =>
        player.id === id
          ? {
              ...player,
              ...updates,
              slug: updates.gamerTag
                ? ensureUniqueSlug(
                    current.players.filter((item) => item.id !== id),
                    slugify(updates.gamerTag)
                  )
                : player.slug,
            }
          : player
      ),
    }));
  };

  const removePlayer = (id: string) => {
    setState((current) => ({
      ...current,
      players: current.players.filter((player) => player.id !== id),
    }));
  };

  const findPlayerBySlug = (slug: string) => state.players.find((player) => player.slug === slug) ?? null;

  return {
    state,
    setState,
    updateSiteSettings,
    addPlayer,
    updatePlayer,
    removePlayer,
    findPlayerBySlug,
  };
}

export type UseAdminStateReturn = ReturnType<typeof useAdminState>;

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
