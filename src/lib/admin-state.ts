"use client";

import { usePersistentState } from "@/lib/persistent-state";

export interface SiteModules {
  liveStream: boolean;
  partners: boolean;
  contactForm: boolean;
}

export interface SiteSettings {
  logoUrl: string;
  heroTitle: string;
  heroTagline: string;
  announcement: string;
  presentationVideoUrl: string;
  modules: SiteModules;
}

export interface PlayerContactInfo {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  postalCode: string;
  city: string;
}

export interface PlayerSocialHandles {
  fortnite?: string;
  twitch?: string;
  discord?: string;
  tiktok?: string;
  youtube?: string;
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
  contact: PlayerContactInfo;
  socials: PlayerSocialHandles;
}

type StoredPlayerProfile = Omit<PlayerProfile, "contact" | "socials"> & {
  contact?: Partial<PlayerContactInfo>;
  socials?: Partial<PlayerSocialHandles>;
};

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

export type SiteSettingsUpdate =
  Partial<Omit<SiteSettings, "modules">> & { modules?: Partial<SiteModules> };

export const DEFAULT_SITE_MODULES: SiteModules = {
  liveStream: true,
  partners: true,
  contactForm: true,
};

const DEFAULT_STATE: AdminState = {
  siteSettings: {
    logoUrl: "/assets/logo.svg",
    heroTitle: "FJOLSENBANDEN",
    heroTagline: "Spillglede for hele familien – trygge streams, turneringer og premier.",
    announcement: "Neste livesending starter 20:00 med co-op i Mario Kart og premier fra Lenovo!",
    presentationVideoUrl:
      "https://www.youtube.com/embed/8EgRIkmvmtM?si=qMzmEaMfP-2ODMbc",
    modules: DEFAULT_SITE_MODULES,
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
      contact: {
        fullName: "Marius Fjolsen",
        email: "marius@fjolsenbanden.no",
        phone: "+47 998 33 221",
        birthDate: "1987-04-11",
        gender: "Mann",
        postalCode: "0456",
        city: "Oslo",
      },
      socials: {
        fortnite: "FjolseFar#Nord",
        twitch: "fjolsefar",
        youtube: "FjolseFar",
        discord: "FjolseFar#1024",
        tiktok: "@fjolsefar",
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
      contact: {
        fullName: "June Olsen",
        email: "june@fjolsenbanden.no",
        phone: "+47 913 55 402",
        birthDate: "1991-09-23",
        gender: "Kvinne",
        postalCode: "3111",
        city: "Tønsberg",
      },
      socials: {
        fortnite: "PixelineNo",
        twitch: "pixeline",
        youtube: "PixelinePlays",
        discord: "pixeline",
        tiktok: "@pixeline",
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
      contact: {
        fullName: "Tor Martin Fjolsen",
        email: "tormartin@fjolsenbanden.no",
        phone: "+47 974 66 110",
        birthDate: "2002-02-17",
        gender: "Mann",
        postalCode: "4321",
        city: "Sandnes",
      },
      socials: {
        fortnite: "ShieldKid",
        twitch: "shieldkid",
        youtube: "ShieldKidTV",
        discord: "shieldkid#7777",
        tiktok: "@shieldkid",
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

function ensurePlayerProfile(player: StoredPlayerProfile): PlayerProfile {
  const fallbackName = player.realName?.trim() || player.gamerTag?.trim() || "Spiller";
  const achievements = Array.isArray(player.achievements) ? player.achievements : [];
  const contact = player.contact ?? {};
  const socials = player.socials ?? {};

  return {
    ...player,
    realName: player.realName ?? fallbackName,
    gamerTag: player.gamerTag ?? fallbackName,
    achievements,
    avatarUrl:
      player.avatarUrl ??
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=320&q=80",
    joinDate: player.joinDate ?? new Date().toISOString(),
    contact: {
      fullName: contact.fullName?.trim() || fallbackName,
      email: contact.email?.trim() || "",
      phone: contact.phone?.trim() || "",
      birthDate: contact.birthDate || "",
      gender: contact.gender?.trim() || "",
      postalCode: contact.postalCode?.trim() || "",
      city: contact.city?.trim() || "",
    },
    socials: {
      fortnite: sanitizeHandle(socials.fortnite),
      twitch: sanitizeHandle(socials.twitch),
      discord: sanitizeHandle(socials.discord),
      tiktok: sanitizeHandle(socials.tiktok),
      youtube: sanitizeHandle(socials.youtube),
    },
  } as PlayerProfile;
}

function sanitizeHandle(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function useAdminState() {
  const [persistedState, setPersistedState] = usePersistentState<AdminState>(
    "fjolsenbanden-admin",
    DEFAULT_STATE,
  );

  const state = ensureStateShape(persistedState);

  const updateSiteSettings = (input: SiteSettingsUpdate) => {
    setPersistedState((current) => {
      const safeCurrent = ensureStateShape(current);
      return {
        ...safeCurrent,
        siteSettings: mergeSiteSettings(safeCurrent.siteSettings, input),
      };
    });
  };

  const addPlayer = (player: Omit<PlayerProfile, "id" | "slug">) => {
    setPersistedState((current) => {
      const safeCurrent = ensureStateShape(current);
      const baseSlug = slugify(player.gamerTag);
      const slug = ensureUniqueSlug(safeCurrent.players, baseSlug);
      const newPlayer: PlayerProfile = ensurePlayerProfile({
        ...player,
        id: generateId(),
        slug,
      });
      return {
        ...safeCurrent,
        players: [newPlayer, ...safeCurrent.players],
      };
    });
  };

  const updatePlayer = (id: string, updates: Partial<PlayerProfile>) => {
    setPersistedState((current) => {
      const safeCurrent = ensureStateShape(current);
      return {
        ...safeCurrent,
        players: safeCurrent.players.map((player) =>
          player.id === id
            ? ensurePlayerProfile({
                ...player,
                ...updates,
                contact: { ...player.contact, ...(updates.contact ?? {}) },
                socials: { ...player.socials, ...(updates.socials ?? {}) },
                slug: updates.gamerTag
                  ? ensureUniqueSlug(
                      safeCurrent.players.filter((item) => item.id !== id),
                      slugify(updates.gamerTag),
                    )
                  : player.slug,
              })
            : player,
        ),
      };
    });
  };

  const removePlayer = (id: string) => {
    setPersistedState((current) => {
      const safeCurrent = ensureStateShape(current);
      return {
        ...safeCurrent,
        players: safeCurrent.players.filter((player) => player.id !== id),
      };
    });
  };

  const findPlayerBySlug = (slug: string) => state.players.find((player) => player.slug === slug) ?? null;

  return {
    state,
    updateSiteSettings,
    addPlayer,
    updatePlayer,
    removePlayer,
    findPlayerBySlug,
  };
}

export type UseAdminStateReturn = ReturnType<typeof useAdminState>;

function ensureStateShape(input: AdminState): AdminState {
  const siteSettings = mergeSiteSettings(DEFAULT_STATE.siteSettings, input.siteSettings ?? {});

  const players = [...(input.players ?? DEFAULT_STATE.players)].map((player) =>
    ensurePlayerProfile(player as StoredPlayerProfile),
  );

  return {
    siteSettings,
    players,
    statsHistory: [...(input.statsHistory ?? DEFAULT_STATE.statsHistory)],
  };
}

function mergeSiteSettings(base: SiteSettings, updates: SiteSettingsUpdate): SiteSettings {
  const { modules: moduleUpdates, ...rest } = updates;
  return {
    ...base,
    ...rest,
    modules: {
      ...base.modules,
      ...(moduleUpdates ?? {}),
    },
  };
}

function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
