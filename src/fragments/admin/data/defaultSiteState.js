import { INLINE_PARTNER_BADGES } from "@/lib/partner-badges";

export function generateId(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

export const DEFAULT_SITE_CONFIG = {
    id: "fjolsen-khabat",
    ownerId: "user_fjolsen",
    domain: "fjolsen.setaei.com",
    theme: "classic",
    status: "published",
    updatedAt: new Date().toISOString(),
    sections: {
        home: {
            title: "Fjolsenbanden",
            subtitle: "Trygge turneringer, familievennlige streams og premier fra våre partnere.",
            ctaLabel: "Bli med i Fjolsenbanden",
            ctaUrl: "https://fjolsenbanden.no/bli-med",
        },
        live: {
            platform: "twitch",
            channel: "FjOlsenFN",
            embedUrl: "https://player.twitch.tv/?channel=FjOlsenFN&parent=setaei.com",
        },
        membership: {
            plans: [
                {
                    id: "plan-basic",
                    name: "Basic",
                    price: "0",
                    features: [
                        "Tilgang til Discord",
                        "Delta i community-kvelder",
                    ],
                },
                {
                    id: "plan-pro",
                    name: "Pro",
                    price: "399",
                    features: [
                        "Coaching fra FjOlsen",
                        "Eksklusive turneringer",
                        "Månedlige premier",
                    ],
                },
                {
                    id: "plan-vip",
                    name: "VIP",
                    price: "Kontakt",
                    features: [
                        "Skreddersydde sponsoropplevelser",
                        "Egne partneraktiviteter",
                        "Tilgang til backstage-streams",
                    ],
                },
            ],
        },
        rewards: {
            items: [
                {
                    id: "reward-headset",
                    title: "Pro Gaming Headset",
                    image: "/uploads/fjolsen-khabat/headset.png",
                    link: "https://partner.example/headset",
                    alt: "Svart gaming headset med Fjolsenbanden-logo",
                },
                {
                    id: "reward-chair",
                    title: "Comfort Gaming Chair",
                    image: "/uploads/fjolsen-khabat/chair.png",
                    link: "https://partner.example/chair",
                    alt: "Ergonomisk gamingstol",
                },
            ],
        },
        partners: {
            logos: [
                {
                    id: "philips",
                    name: "Philips",
                    image: INLINE_PARTNER_BADGES.philips,
                    url: "https://philips.no",
                },
                {
                    id: "lenovo",
                    name: "Lenovo",
                    image: INLINE_PARTNER_BADGES.lenovo,
                    url: "https://lenovo.com",
                },
                {
                    id: "samsung",
                    name: "Samsung",
                    image: INLINE_PARTNER_BADGES.samsung,
                    url: "https://www.samsung.com/no/",
                },
                {
                    id: "komplett",
                    name: "Komplett.no",
                    image: INLINE_PARTNER_BADGES.komplett,
                    url: "https://www.komplett.no/",
                },
            ],
        },
        contact: {
            title: "Kontakt oss",
            description: "Har du spørsmål om medlemskap, samarbeid eller events? Send oss en melding så kommer vi tilbake til deg.",
            email: "hei@fjolsenbanden.no",
            discord: "https://discord.gg/fjolsenbanden",
            tiktok: "https://www.tiktok.com/@fjolsenbanden",
            youtube: "https://youtube.com/@fjolsenbanden",
            formEndpoint: "/api/contact",
            buttonColor: "#FF2F9C",
        },
    },
    branding: {
        logo: "/uploads/fjolsen-khabat/logo.png",
        colors: {
            primary: "#13A0F9",
            accent: "#FF2F9C",
        },
        fonts: {
            display: "Luckiest Guy",
            text: "Inter",
        },
    },
    seo: {
        title: "Fjolsenbanden – Familievennlige streams",
        description: "Bli med Fjolsenbanden for trygge turneringer, premier og familievennlig gaming.",
        image: "/uploads/fjolsen-khabat/og.png",
    },
    analytics: {
        gaId: "G-SET12345",
        pixelId: "PIX-9988",
        matomoSiteId: "42",
    },
};

const DEFAULT_SITE_META = [
    {
        id: "fjolsen-khabat",
        name: "Fjolsen & Khabat",
        status: "published",
        domain: "fjolsen.setaei.com",
        theme: "classic",
        ownerId: "user_fjolsen",
        updatedAt: DEFAULT_SITE_CONFIG.updatedAt,
        avatar: "/uploads/fjolsen-khabat/logo.png",
    },
    {
        id: "pixeline-portal",
        name: "Pixeline",
        status: "draft",
        domain: "pixeline.setaei.com",
        theme: "minecraft",
        ownerId: "user_pixeline",
        updatedAt: DEFAULT_SITE_CONFIG.updatedAt,
        avatar: "/uploads/pixeline/logo.png",
    },
];

const DEFAULT_STATS = {
    summary: {
        views: 18450,
        uniques: 9430,
        avgTimeOnPage: "3m 12s",
        ctaClicks: 420,
    },
    live: {
        twitchViews: 1280,
        youtubeViews: 430,
    },
    trends: [
        { date: "2024-05-01", views: 620, uniques: 310 },
        { date: "2024-05-02", views: 740, uniques: 368 },
        { date: "2024-05-03", views: 680, uniques: 352 },
        { date: "2024-05-04", views: 820, uniques: 412 },
        { date: "2024-05-05", views: 760, uniques: 401 },
        { date: "2024-05-06", views: 890, uniques: 455 },
        { date: "2024-05-07", views: 940, uniques: 478 },
    ],
};

function createBaseSiteState(configOverrides = {}) {
    const baseConfig = clone(DEFAULT_SITE_CONFIG);
    Object.assign(baseConfig, configOverrides);
    if (configOverrides.sections) {
        baseConfig.sections = {
            ...baseConfig.sections,
            ...configOverrides.sections,
        };
    }
    return baseConfig;
}

function createInitialSiteData(site) {
    const draftConfig = createBaseSiteState({ id: site.id, ownerId: site.ownerId, domain: site.domain, theme: site.theme });
    draftConfig.status = site.status;
    const publishedConfig = clone(draftConfig);
    return {
        draft: draftConfig,
        published: publishedConfig,
        workflow: {
            status: site.status === "published" ? "published" : "editing",
            requireApproval: site.id !== "fjolsen-khabat",
            lastEditor: "Astrid Admin",
            lastEditedAt: draftConfig.updatedAt,
            lastPreviewAt: null,
            lastPublishAt: site.status === "published" ? draftConfig.updatedAt : null,
        },
        moderation: {
            sections: {
                home: { hidden: false },
                live: { hidden: false },
                membership: { hidden: false },
                rewards: { hidden: false },
                partners: { hidden: false },
                contact: { hidden: false },
            },
        },
        domain: {
            subdomain: site.domain.replace(".setaei.com", ""),
            customDomain: site.domain,
            rootDomain: "setaei.com",
            dnsStatus: "connected",
            lastCheckedAt: draftConfig.updatedAt,
        },
        stats: clone(DEFAULT_STATS),
        changeLog: [
            {
                id: generateId("log"),
                action: "publish",
                summary: "Publiserte Fjolsenbanden sin nye side",
                by: "Astrid Admin",
                at: draftConfig.updatedAt,
                status: "published",
            },
        ],
        versions: [
            {
                id: generateId("ver"),
                label: "Initielt innhold",
                createdAt: draftConfig.updatedAt,
                author: "Astrid Admin",
                note: "Første publisering",
                config: clone(publishedConfig),
            },
        ],
        uploads: [],
    };
}

export function createDefaultSiteState() {
    const sites = DEFAULT_SITE_META;
    const siteData = Object.fromEntries(sites.map((site) => [site.id, createInitialSiteData(site)]));
    return {
        sites,
        siteData,
        activeSiteId: sites[0].id,
    };
}

export function cloneConfig(config) {
    return clone(config);
}
