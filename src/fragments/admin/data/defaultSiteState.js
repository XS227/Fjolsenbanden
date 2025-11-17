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
        about: {
            title: "Hvem er FjOlsen?",
            videoUrl: "https://www.youtube.com/embed/7zWWLP_pogg?si=tNRtOEWj6JV3J0vf",
            lead: "FjOlsenFN – Familievennlig streamer og grunnlegger av FjOlsenbanden",
            body: "FjOlsenbanden ledes av Tor Martin «FjOlsen» Olsen, 43 år. Han startet prosjektet for å gi sine egne onkelbarn et trygt og bannefri sted å game – men historien har blitt mye større. FjOlsen, med bistand fra andre, har laget den største familievennlige huben i Fortnite-miljøet med over 2500 medlemmer. Når barn og unge er hos FjOlsen er de i trygge hender. For det han selv manglet som liten har han nå skapt for hele communityet, og er svært takknemlig for muligheten til å gi tilbake.",
        },
        membership: {
            plans: [
                {
                    id: "plan-free",
                    name: "Gratis medlemskap",
                    price: "0 kr / mnd",
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
            ],
        },
        offerings: {
            title: "Andre tilbud",
            description: "FjOlsenbanden tilbyr mer enn bare streaming!",
            items: [
                {
                    id: "offering-foredrag",
                    title: "Foredrag",
                    description: "FjOlsen besøker skoler, idrettslag og e-sportklubber for å snakke om streaming, gaming-kultur og nettvett.",
                },
                {
                    id: "offering-events",
                    title: "Events",
                    description: "Vi arrangerer gaming-konkurranser for bedrifter, skoler og klubber – både digitalt og fysisk.",
                },
                {
                    id: "offering-unboxing",
                    title: "Unboxing",
                    description: "FjOlsen lager profesjonelle unboxing-videoer av dine produkter som kan brukes i deres markedsføring og deles med vårt community.",
                },
                {
                    id: "offering-streamer",
                    title: "Streamer for hire",
                    description: "Ønsker du at FjOlsen skal streame på vegne av din merkevare? Han er tilgjengelig for co-streams, produktlanseringer og kampanjer – der ditt budskap blir formidlet på en autentisk og engasjerende måte til tusenvis av følgere.",
                },
                {
                    id: "offering-coaching",
                    title: "Coaching",
                    description: "I FjOlsenbanden finner du flere av Norges dyktigste Fortnite-spillere. Sammen tilbyr vi 1-til-1 coaching for barn og unge som ønsker å utvikle seg som spillere – med fokus på strategi, samarbeid, kommunikasjon og trygg nettkultur.",
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
            title: "Våre samarbeidspartnere",
            description: "Her er noen av våre samarbeidspartnere som har bidratt til å skape minneverdige øyeblikk i FjOlsenbanden!",
            logos: [
                {
                    id: "lenovo",
                    name: "Lenovo",
                    image: INLINE_PARTNER_BADGES.lenovo,
                    url: "https://lenovo.com",
                },
                {
                    id: "komplett",
                    name: "Komplett",
                    image: INLINE_PARTNER_BADGES.komplett,
                    url: "https://www.komplett.no/",
                },
                {
                    id: "samsung",
                    name: "Samsung",
                    image: INLINE_PARTNER_BADGES.samsung,
                    url: "https://www.samsung.com/no/",
                },
                {
                    id: "kristiania",
                    name: "Kristiania",
                    image: INLINE_PARTNER_BADGES.kristiania,
                    url: "https://www.kristiania.no/",
                },
                {
                    id: "philips",
                    name: "Philips",
                    image: INLINE_PARTNER_BADGES.philips,
                    url: "https://philips.no",
                },
                {
                    id: "saily",
                    name: "Saily",
                    image: INLINE_PARTNER_BADGES.saily,
                    url: "https://saily.no",
                },
                {
                    id: "nki",
                    name: "NKI",
                    image: INLINE_PARTNER_BADGES.nki,
                    url: "https://www.nki.no/",
                },
                {
                    id: "trondheim-play",
                    name: "Trondheim Play",
                    image: INLINE_PARTNER_BADGES.trondheimPlay,
                    url: "https://trondheimplay.no/",
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
        feedback: {
            entries: [
                {
                    id: "feedback-filip",
                    quote: "H❤ Tusen takk for at jeg har fått muligheten til å spille hos FjOlsenbanden. Kan ikke takke nok for alt du har gjort for meg og alle andre. ❤",
                    author: "Filip",
                },
                {
                    id: "feedback-rasmus",
                    quote: "Jeg elsker å spille customs-a dine, det er min favoritt. Jeg spiller ikke annet enn dine customs!",
                    author: "Rasmus",
                },
                {
                    id: "feedback-pernille",
                    quote: "Uansett er vi takknemlige for innsatsen du legger i trygge og engasjerende rammer for barn og ungdom – og veldig flott at du arrangerer egne jentekvelder.",
                    author: "Pernille & Terje, foreldre",
                },
                {
                    id: "feedback-merethe",
                    quote: "Du gjør en forskjell! Du har så mye peiling på how to – overfor barn! Respekt.",
                    author: "Merethe, mamma",
                },
            ],
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
                about: { hidden: false },
                membership: { hidden: false },
                rewards: { hidden: false },
                partners: { hidden: false },
                contact: { hidden: false },
                feedback: { hidden: false },
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
