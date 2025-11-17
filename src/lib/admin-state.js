"use client";
import { INLINE_PARTNER_BADGES } from "@/lib/partner-badges";
import { usePersistentState } from "@/lib/persistent-state";
export const DEFAULT_SITE_MODULES = {
    liveStream: true,
    partners: true,
    contactForm: true,
};
export const DEFAULT_ABOUT_HIGHLIGHTS = [
    {
        id: "about-safe",
        title: "Trygg gamingarena",
        description: "Alle aktiviteter overvåkes av voksne moderatorer med klare regler mot mobbing og ekskludering.",
    },
    {
        id: "about-community",
        title: "Positivt fellesskap",
        description: "Vi dyrker et inkluderende miljø der både barn og foreldre kan dele spillglede, samarbeid og kommunikasjon.",
    },
    {
        id: "about-stream",
        title: "Familievennlig stream",
        description: "Sendingene våre er trygge for alle aldre, med aktiviteter som bygger trygghet, læring og lagfølelse.",
    },
];
export const DEFAULT_ABOUT_BULLETS = [
    "Målet vårt er å skape et trygt, positivt og inkluderende gamingmiljø der barn, ungdom – og mange foreldre – kan oppleve ekte mestring, samhold og fellesskap.",
    "Vi legger ned mange timer hver uke på aktiviteter, turneringer og samarbeid som øker engasjement og samhold i communityet.",
    "Premier og arrangementer støttes av samarbeidspartnere fra næringslivet, men alt styres med nulltoleranse for dårlig adferd.",
];
export const DEFAULT_SECTION_ORDER = [
    "heroIntro",
    "liveStream",
    "community",
    "membership",
    "partners",
    "offerings",
    "contact",
    "feedback",
];
export const DEFAULT_FEEDBACK_ENTRIES = [
    {
        id: "feedback-filip",
        quote: "\u201CH\u2665 Tusen takk for at jeg har fått muligheten til å spille hos FjOlsenbanden. Kan ikke takke nok for alt du har gjort for meg og alle andre. \u2665\u201D",
        author: "Filip",
        accent: "text-[#FF9B6A]",
    },
    {
        id: "feedback-rasmus",
        quote: "\u201CJeg elsker å spille customs-a dine, det er min favoritt. Jeg spiller ikke annet enn dine customs!\u201D",
        author: "Rasmus",
        accent: "text-[#13A0F9]",
    },
    {
        id: "feedback-pernille-terje",
        quote: "\u201CUansett er vi takknemlige for innsatsen du legger i trygge og engasjerende rammer for barn og ungdom – og veldig flott at du arrangerer egne jentekvelder.\u201D",
        author: "Pernille & Terje, foreldre",
        accent: "text-[#34D399]",
    },
    {
        id: "feedback-merethe",
        quote: "\u201CDu gjør en forskjell! Du har så mye peiling på how to – overfor barn! Respekt.\u201D",
        author: "Merethe, mamma",
        accent: "text-[#FF2F9C]",
    },
];
export const DEFAULT_MEMBERSHIP_TIERS = [
    {
        id: "tier-free",
        title: "Gratis medlemskap",
        price: "0 kr / mnd",
        color: "green",
        features: [
            "Få digitalt medlemskort",
            "Delta på premier, giveaways og customs",
            "Tilgang til hele FjOlsenbanden på Discord",
            "Meld deg på arrangementer og turneringer først",
        ],
        buttons: [
            { label: "Under 18 år", url: "https://forms.gle/sq4mUf7s6e6UY7R58" },
            { label: "Over 18 år", url: "https://forms.gle/ZrbXCggnUY8FTT7t9" },
        ],
    },
];
export const DEFAULT_PARTNER_LOGOS = [
    {
        id: "partner-lenovo",
        name: "Lenovo",
        logoUrl: INLINE_PARTNER_BADGES.lenovo,
        url: "https://www.lenovo.com/no/no/",
    },
    {
        id: "partner-samsung",
        name: "Samsung",
        logoUrl: INLINE_PARTNER_BADGES.samsung,
        url: "https://www.samsung.com/no/",
    },
    {
        id: "partner-philips",
        name: "Philips",
        logoUrl: INLINE_PARTNER_BADGES.philips,
        url: "https://www.philips.no/",
    },
    {
        id: "partner-komplett",
        name: "Komplett",
        logoUrl: INLINE_PARTNER_BADGES.komplett,
        url: "https://www.komplett.no/",
    },
];
export const DEFAULT_TWITCH_EMBED_URL = "https://player.twitch.tv/?channel=FjOlsenFN&parent=localhost";
const DEFAULT_STATE = {
    siteSettings: {
        logoUrl: "",
        heroHeadline: "FJOLSENBANDEN ER NORGES MEST INKLUDERENDE GAMING-COMMUNITY.",
        heroTitle: "FJOLSENBANDEN",
        heroTagline: "Spillglede for hele familien – trygge streams, turneringer og premier.",
        heroSubtitle: "En trygg arena for familier som elsker gaming, med fellesskap, premier og foreldre i sentrum.",
        heroDescription: "Spillglede for hele familien med trygge streams, premier og fellesskap.",
        heroImageUrl: "/assets/branding/fjolsenbanden-logo-light.svg",
        heroBackgroundImage: "",
        announcement: "Neste livesending starter 20:00 med co-op i Mario Kart og premier fra Lenovo!",
        aboutTitle: "Hva er FjOlsenbanden?",
        aboutHeadline: "Spillglede for hele familien",
        aboutDescription: "FjOlsenbanden er et raskt voksende gaming-community der barn, ungdom og foreldre kan game trygt sammen.",
        aboutSecondaryDescription: "Målet vårt er å skape et inkluderende miljø uten hets, mobbing eller negativ adferd.",
        aboutBullets: DEFAULT_ABOUT_BULLETS,
        aboutHighlights: DEFAULT_ABOUT_HIGHLIGHTS,
        presentationVideoUrl: "https://www.youtube.com/embed/8EgRIkmvmtM?si=qMzmEaMfP-2ODMbc",
        twitchEmbedUrl: DEFAULT_TWITCH_EMBED_URL,
        membershipTiers: DEFAULT_MEMBERSHIP_TIERS,
        partnerLogos: DEFAULT_PARTNER_LOGOS,
        feedbackEntries: DEFAULT_FEEDBACK_ENTRIES,
        sectionOrder: DEFAULT_SECTION_ORDER,
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
            avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80",
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
            avatarUrl: "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=320&q=80",
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
            avatarUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=320&q=80",
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
function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}
function ensureUniqueSlug(existing, base) {
    let candidate = base || "spiller";
    let counter = 1;
    while (existing.some((player) => player.slug === candidate)) {
        candidate = `${base}-${counter}`;
        counter += 1;
    }
    return candidate;
}
function ensurePlayerProfile(player) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const fallbackName = ((_a = player.realName) === null || _a === void 0 ? void 0 : _a.trim()) || ((_b = player.gamerTag) === null || _b === void 0 ? void 0 : _b.trim()) || "Spiller";
    const achievements = Array.isArray(player.achievements) ? player.achievements : [];
    const contact = (_c = player.contact) !== null && _c !== void 0 ? _c : {};
    const socials = (_d = player.socials) !== null && _d !== void 0 ? _d : {};
    return {
        ...player,
        realName: (_e = player.realName) !== null && _e !== void 0 ? _e : fallbackName,
        gamerTag: (_f = player.gamerTag) !== null && _f !== void 0 ? _f : fallbackName,
        achievements,
        avatarUrl: (_g = player.avatarUrl) !== null && _g !== void 0 ? _g : "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=320&q=80",
        joinDate: (_h = player.joinDate) !== null && _h !== void 0 ? _h : new Date().toISOString(),
        contact: {
            fullName: ((_j = contact.fullName) === null || _j === void 0 ? void 0 : _j.trim()) || fallbackName,
            email: ((_k = contact.email) === null || _k === void 0 ? void 0 : _k.trim()) || "",
            phone: ((_l = contact.phone) === null || _l === void 0 ? void 0 : _l.trim()) || "",
            birthDate: contact.birthDate || "",
            gender: ((_m = contact.gender) === null || _m === void 0 ? void 0 : _m.trim()) || "",
            postalCode: ((_o = contact.postalCode) === null || _o === void 0 ? void 0 : _o.trim()) || "",
            city: ((_p = contact.city) === null || _p === void 0 ? void 0 : _p.trim()) || "",
        },
        socials: {
            fortnite: sanitizeHandle(socials.fortnite),
            twitch: sanitizeHandle(socials.twitch),
            discord: sanitizeHandle(socials.discord),
            tiktok: sanitizeHandle(socials.tiktok),
            youtube: sanitizeHandle(socials.youtube),
        },
    };
}
function sanitizeHandle(value) {
    const trimmed = value === null || value === void 0 ? void 0 : value.trim();
    return trimmed ? trimmed : undefined;
}
export function useAdminState() {
    const [persistedState, setPersistedState] = usePersistentState("fjolsenbanden-admin", DEFAULT_STATE);
    const state = ensureStateShape(persistedState);
    const updateSiteSettings = (input) => {
        setPersistedState((current) => {
            const safeCurrent = ensureStateShape(current);
            return {
                ...safeCurrent,
                siteSettings: mergeSiteSettings(safeCurrent.siteSettings, input),
            };
        });
    };
    const addPlayer = (player) => {
        setPersistedState((current) => {
            const safeCurrent = ensureStateShape(current);
            const baseSlug = slugify(player.gamerTag);
            const slug = ensureUniqueSlug(safeCurrent.players, baseSlug);
            const newPlayer = ensurePlayerProfile({
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
    const updatePlayer = (id, updates) => {
        setPersistedState((current) => {
            const safeCurrent = ensureStateShape(current);
            return {
                ...safeCurrent,
                players: safeCurrent.players.map((player) => {
                    var _a, _b;
                    return player.id === id
                        ? ensurePlayerProfile({
                            ...player,
                            ...updates,
                            contact: { ...player.contact, ...((_a = updates.contact) !== null && _a !== void 0 ? _a : {}) },
                            socials: { ...player.socials, ...((_b = updates.socials) !== null && _b !== void 0 ? _b : {}) },
                            slug: updates.gamerTag
                                ? ensureUniqueSlug(safeCurrent.players.filter((item) => item.id !== id), slugify(updates.gamerTag))
                                : player.slug,
                        })
                        : player;
                }),
            };
        });
    };
    const removePlayer = (id) => {
        setPersistedState((current) => {
            const safeCurrent = ensureStateShape(current);
            return {
                ...safeCurrent,
                players: safeCurrent.players.filter((player) => player.id !== id),
            };
        });
    };
    const findPlayerBySlug = (slug) => { var _a; return (_a = state.players.find((player) => player.slug === slug)) !== null && _a !== void 0 ? _a : null; };
    return {
        state,
        updateSiteSettings,
        addPlayer,
        updatePlayer,
        removePlayer,
        findPlayerBySlug,
    };
}
function ensureStateShape(input) {
    var _a, _b, _c;
    const siteSettings = ensureSiteSettings(mergeSiteSettings(DEFAULT_STATE.siteSettings, (_a = input.siteSettings) !== null && _a !== void 0 ? _a : {}));
    const players = [...((_b = input.players) !== null && _b !== void 0 ? _b : DEFAULT_STATE.players)].map((player) => ensurePlayerProfile(player));
    return {
        siteSettings,
        players,
        statsHistory: [...((_c = input.statsHistory) !== null && _c !== void 0 ? _c : DEFAULT_STATE.statsHistory)],
    };
}
function ensureSiteSettings(settings) {
    var _a, _b;
    return {
        ...settings,
        modules: {
            ...DEFAULT_SITE_MODULES,
            ...((_a = settings.modules) !== null && _a !== void 0 ? _a : DEFAULT_SITE_MODULES),
        },
        twitchEmbedUrl: ((_b = settings.twitchEmbedUrl) === null || _b === void 0 ? void 0 : _b.trim()) || DEFAULT_TWITCH_EMBED_URL,
        membershipTiers: ensureMembershipTierArray(settings.membershipTiers),
        partnerLogos: ensurePartnerLogoArray(settings.partnerLogos),
        feedbackEntries: ensureFeedbackEntries(settings.feedbackEntries),
        sectionOrder: ensureSectionOrder(settings.sectionOrder),
    };
}
function ensureMembershipTierArray(input) {
    const source = Array.isArray(input) && input.length > 0 ? input : DEFAULT_MEMBERSHIP_TIERS;
    return source.map((tier, index) => {
        var _a, _b, _c, _d;
        const fallback = (_a = DEFAULT_MEMBERSHIP_TIERS[index]) !== null && _a !== void 0 ? _a : DEFAULT_MEMBERSHIP_TIERS[0];
        const features = Array.isArray(tier.features)
            ? tier.features.map((feature) => feature.trim()).filter(Boolean)
            : [...fallback.features];
        const normalizedColor = tier.color === "cyan" || tier.color === "amber" || tier.color === "green"
            ? tier.color
            : fallback.color;
        const normalizeButtons = (buttons) => {
            const parsed = Array.isArray(buttons) ? buttons.slice(0, 2) : [];
            return parsed
                .map((button) => ({
                label: typeof (button === null || button === void 0 ? void 0 : button.label) === "string" ? button.label.trim() : "",
                url: typeof (button === null || button === void 0 ? void 0 : button.url) === "string" ? button.url.trim() : "",
            }))
                .filter((button) => button.label && button.url);
        };
        const normalizedButtons = normalizeButtons(tier.buttons);
        const fallbackButtons = normalizeButtons(fallback.buttons);
        return {
            id: ((_b = tier.id) === null || _b === void 0 ? void 0 : _b.trim()) || fallback.id || `tier-${index}`,
            title: ((_c = tier.title) === null || _c === void 0 ? void 0 : _c.trim()) || fallback.title,
            price: ((_d = tier.price) === null || _d === void 0 ? void 0 : _d.trim()) || fallback.price,
            color: normalizedColor,
            features: features.length > 0 ? features : [...fallback.features],
            buttons: normalizedButtons.length > 0 ? normalizedButtons : fallbackButtons,
        };
    });
}
function ensurePartnerLogoArray(input) {
    const source = Array.isArray(input) && input.length > 0 ? input : DEFAULT_PARTNER_LOGOS;
    return source.map((partner, index) => {
        var _a, _b, _c, _d;
        const fallback = (_a = DEFAULT_PARTNER_LOGOS[index]) !== null && _a !== void 0 ? _a : DEFAULT_PARTNER_LOGOS[0];
        const rawUrl = typeof partner.url === "string" ? partner.url.trim() : "";
        const fallbackUrl = typeof fallback.url === "string" ? fallback.url : "";
        return {
            id: ((_b = partner.id) === null || _b === void 0 ? void 0 : _b.trim()) || fallback.id || `partner-${index}`,
            name: ((_c = partner.name) === null || _c === void 0 ? void 0 : _c.trim()) || fallback.name,
            logoUrl: ((_d = partner.logoUrl) === null || _d === void 0 ? void 0 : _d.trim()) || fallback.logoUrl,
            url: rawUrl || fallbackUrl,
        };
    });
}
const FEEDBACK_ACCENT_CLASSES = ["text-[#FF9B6A]", "text-[#13A0F9]", "text-[#34D399]", "text-[#FF2F9C]"];
function ensureFeedbackEntries(input) {
    const source = Array.isArray(input) && input.length > 0 ? input : DEFAULT_FEEDBACK_ENTRIES;
    return source.map((entry, index) => {
        var _a, _b, _c, _d, _e;
        const fallback = (_a = DEFAULT_FEEDBACK_ENTRIES[index]) !== null && _a !== void 0 ? _a : DEFAULT_FEEDBACK_ENTRIES[0];
        const quote = ((_b = entry.quote) === null || _b === void 0 ? void 0 : _b.trim()) || ((_c = fallback.quote) !== null && _c !== void 0 ? _c : "");
        const author = ((_d = entry.author) === null || _d === void 0 ? void 0 : _d.trim()) || ((_e = fallback.author) !== null && _e !== void 0 ? _e : "Anonym");
        const accent = entry.accent && entry.accent.trim()
            ? entry.accent.trim()
            : FEEDBACK_ACCENT_CLASSES[index % FEEDBACK_ACCENT_CLASSES.length];
        return {
            id: entry.id || fallback.id || `feedback-${index}`,
            quote,
            author,
            accent,
        };
    });
}
function ensureSectionOrder(order) {
    const fallback = DEFAULT_SECTION_ORDER;
    const customOrder = Array.isArray(order)
        ? order.filter((key) => fallback.includes(key))
        : [];
    const combined = [...customOrder, ...fallback];
    const seen = new Set();
    const result = [];
    combined.forEach((key) => {
        if (!seen.has(key)) {
            seen.add(key);
            result.push(key);
        }
    });
    return result;
}
function mergeSiteSettings(base, updates) {
    const { modules: moduleUpdates, ...rest } = updates;
    const merged = {
        ...base,
        ...rest,
        modules: {
            ...base.modules,
            ...(moduleUpdates !== null && moduleUpdates !== void 0 ? moduleUpdates : {}),
        },
    };
    return ensureSiteSettings(merged);
}
function generateId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
