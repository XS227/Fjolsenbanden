"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, CheckCircle2, CreditCard, Gift, Instagram, Lock, Menu, MessageCircle, Moon, Phone, Play, ShieldCheck, Smartphone, Sun, Trophy, Twitch, X, Youtube, UserCog, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_SECTION_ORDER, DEFAULT_SITE_MODULES, DEFAULT_TWITCH_EMBED_URL, useAdminState, } from "@/lib/admin-state";
import { INLINE_PARTNER_BADGES, getPartnerBadge } from "@/lib/partner-badges";
import "./FjolsenbandenHome.theme.css";
const navLinks = [
    { name: "Hjem", href: "#hero" },
    { name: "Hva er FjOlsenbanden?", href: "#hva-er" },
    { name: "Live", href: "#live" },
    { name: "Community", href: "#community" },
    { name: "Samarbeidspartnere", href: "#samarbeid" },
    { name: "Andre tilbud", href: "#tilbud" },
    { name: "Kontakt", href: "#kontakt" },
    { name: "Feedback", href: "#tilbakemeldinger" },
    { name: "Personvernerklæring", href: "/personvernerklaering.html" },
    { name: "Regler", href: "/regler.html" },
];
const platformLinks = [
    {
        icon: React.createElement(Twitch, { className: "h-5 w-5", "aria-hidden": "true" }),
        label: "Twitch",
        href: "https://www.twitch.tv/FjOlsenFN",
    },
    {
        icon: React.createElement(Youtube, { className: "h-5 w-5", "aria-hidden": "true" }),
        label: "YouTube",
        href: "https://youtube.com/@fjolsenbanden",
    },
    {
        icon: React.createElement(Smartphone, { className: "h-5 w-5", "aria-hidden": "true" }),
        label: "TikTok",
        href: "https://www.tiktok.com/@fjolsenbanden",
    },
    {
        icon: React.createElement(Instagram, { className: "h-5 w-5", "aria-hidden": "true" }),
        label: "Insta",
        href: "https://www.instagram.com/fjolsenbanden",
    },
    {
        icon: React.createElement(DiscordIcon, { className: "h-5 w-5", "aria-hidden": "true" }),
        label: "Discord",
        href: "https://discord.gg/fjolsenbanden",
    },
];
const socialLinks = [
    {
        icon: React.createElement(DiscordIcon, { className: "h-4 w-4", "aria-hidden": "true" }),
        label: "Discord",
        href: "https://discord.gg/fjolsenbanden",
    },
    {
        icon: React.createElement(Twitch, { className: "h-4 w-4", "aria-hidden": "true" }),
        label: "Twitch",
        href: "https://www.twitch.tv/FjOlsenFN",
    },
    {
        icon: React.createElement(Youtube, { className: "h-4 w-4", "aria-hidden": "true" }),
        label: "YouTube",
        href: "https://youtube.com/@fjolsenbanden",
    },
    {
        icon: React.createElement(Smartphone, { className: "h-4 w-4", "aria-hidden": "true" }),
        label: "TikTok",
        href: "https://www.tiktok.com/@fjolsenbanden",
    },
    {
        icon: React.createElement(Instagram, { className: "h-4 w-4", "aria-hidden": "true" }),
        label: "Instagram",
        href: "https://www.instagram.com/fjolsenbanden",
    },
];
const stats = [
    { label: "Discord", value: "2 500+" },
    { label: "Twitch", value: "3 200+" },
    { label: "TikTok", value: "4 200+" },
];
const liveFollowLinks = [
    {
        label: "Twitch",
        href: "https://www.twitch.tv/fjolsenbanden",
        icon: React.createElement(Twitch, { className: "h-5 w-5 text-purple-500", "aria-hidden": "true" }),
    },
    {
        label: "YouTube",
        href: "https://youtube.com/@fjolsenbanden",
        icon: React.createElement(Youtube, { className: "h-5 w-5 text-red-500", "aria-hidden": "true" }),
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@fjolsenbanden",
        icon: React.createElement(Smartphone, { className: "h-5 w-5 text-pink-500", "aria-hidden": "true" }),
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/fjolsenbanden",
        icon: React.createElement(Instagram, { className: "h-5 w-5 text-fuchsia-400", "aria-hidden": "true" }),
    },
];
const liveRuleMessages = [
    {
        id: "rule-1",
        title: "Nulltoleranse for mobbing og trakassering",
        description: "Vis respekt i chatten og i spill. Hets, diskriminering eller personangrep gir umiddelbare reaksjoner.",
        icon: React.createElement(ShieldCheck, { className: "h-4 w-4 text-emerald-300", "aria-hidden": "true" }),
    },
    {
        id: "rule-2",
        title: "Respekt for moderatorer",
        description: "Moderatorenes beskjeder er endelige. Ignorerer du dem eller diskuterer avgjørelser, kan du miste tilgangen.",
        icon: React.createElement(UserCog, { className: "h-4 w-4 text-sky-300", "aria-hidden": "true" }),
    },
    {
        id: "rule-3",
        title: "Fair play",
        description: "Juks, glitching eller sabotasje ødelegger moroa. Brudd gir utestengelse fra events og konkurranser.",
        icon: React.createElement(Trophy, { className: "h-4 w-4 text-amber-300", "aria-hidden": "true" }),
    },
    {
        id: "rule-4",
        title: "Trygg deling",
        description: "Del aldri personopplysninger eller kontoinfo. Varsle oss med en gang hvis noe virker suspekt.",
        icon: React.createElement(Lock, { className: "h-4 w-4 text-rose-300", "aria-hidden": "true" }),
    },
    {
        id: "rule-5",
        title: "Språk og innhold",
        description: "Hold tonen vennlig og inkluderende. NSFW, ekstremt innhold eller grov banning blir fjernet umiddelbart.",
        icon: React.createElement(MessageCircle, { className: "h-4 w-4 text-violet-300", "aria-hidden": "true" }),
    },
    {
        id: "rule-6",
        title: "Aldersgrenser og samtykke",
        description: "Vi følger aldersgrensene i spillene og på plattformene våre. Yngre medlemmer må ha foresatt samtykke.",
        icon: React.createElement(CheckCircle2, { className: "h-4 w-4 text-cyan-300", "aria-hidden": "true" }),
    },
    {
        id: "rule-7",
        title: "Sanksjoner",
        description: "Regelbrudd gir advarsler, timeout eller permanent utestengelse – avhengig av alvorlighetsgrad.",
        icon: React.createElement(X, { className: "h-4 w-4 text-rose-400", "aria-hidden": "true" }),
    },
];
const PARTNER_LOGO_BASE_URLS = [
    "https://cdn.worldvectorlogo.com/logos",
    "https://setaei.com/Fjolsen",
    "https://fjolsenbanden.setaei.com/Fjolsen",
    "https://fjolsenbanden.setaei.com/Images",
    "http://fjolsenbanden.setaei.com/Images",
];
const sponsors = [
    {
        name: "Lenovo",
        slug: "lenovo",
        website: "https://www.lenovo.com/no/no/",
        defaultLogoUrl: INLINE_PARTNER_BADGES.lenovo,
        remoteFileNames: [
            "lenovo-logo.png",
            "Lenovo-logo.png",
            "lenova1.jpg",
            "Lenova1.jpg",
            "Lenovo1.jpg",
            "lenovo1.jpg",
            "lenova.jpg",
            "Lenova.jpg",
            "Lenovo.svg",
            "lenovo.svg",
            "Lenovo.png",
            "lenovo.png",
            "Lenovo.webp",
            "lenovo.webp",
            "Lenovo.jpg",
            "lenovo.jpg",
            "Lenovo.jpeg",
            "lenovo.jpeg",
            "lenovo-logo-2015.svg",
        ],
    },
    {
        name: "Samsung",
        slug: "samsung",
        website: "https://www.samsung.com/no/",
        defaultLogoUrl: INLINE_PARTNER_BADGES.samsung,
        remoteFileNames: [
            "samsung-logo.png",
            "Samsung-logo.png",
            "samsung1.jpg",
            "Samsung1.jpg",
            "Samsung.svg",
            "samsung.svg",
            "Samsung.png",
            "samsung.png",
            "Samsung.webp",
            "samsung.webp",
            "Samsung.jpg",
            "samsung.jpg",
            "Samsung.jpeg",
            "samsung.jpeg",
            "samsung-8.svg",
            "samsung1.png",
        ],
    },
    {
        name: "Philips",
        slug: "philips",
        website: "https://www.philips.no/",
        defaultLogoUrl: INLINE_PARTNER_BADGES.philips,
        remoteFileNames: [
            "philips-logo.png",
            "Philips-logo.png",
            "Philips.svg",
            "philips.svg",
            "Philips.png",
            "philips.png",
            "Philips.webp",
            "philips.webp",
            "Philips.jpg",
            "philips.jpg",
            "Philips.jpeg",
            "philips.jpeg",
            "philips-7.svg",
            "philips1.png",
        ],
    },
    {
        name: "Komplett",
        slug: "komplett",
        website: "https://www.komplett.no/",
        defaultLogoUrl: INLINE_PARTNER_BADGES.komplett,
        remoteFileNames: [
            "komplett-logo.png",
            "Komplett-logo.png",
            "komplett1.jpg",
            "Komplett1.jpg",
            "Komplett.svg",
            "komplett.svg",
            "Komplett.png",
            "komplett.png",
            "Komplett-no.png",
            "komplett-no.png",
            "Komplett.webp",
            "komplett.webp",
            "Komplett.jpg",
            "komplett.jpg",
            "Komplett.jpeg",
            "komplett.jpeg",
            "komplett.svg",
        ],
    },
];
const buildSponsorLogoSources = (sponsor) => {
    const remoteSources = PARTNER_LOGO_BASE_URLS.flatMap((baseUrl) => sponsor.remoteFileNames.map((fileName) => `${baseUrl}/${fileName}`));
    const preferred = sponsor.defaultLogoUrl ? [sponsor.defaultLogoUrl] : [];
    const inlineFallbackBadge = getPartnerBadge(sponsor.slug);
    const inlineFallback = inlineFallbackBadge ? [inlineFallbackBadge] : [];
    return Array.from(new Set([...preferred, ...remoteSources, ...inlineFallback]));
};
const SimplePartnerLogo = ({ partner, fallback, className = "" }) => {
    const [sourceIndex, setSourceIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const sources = useMemo(() => {
        if (partner.logoUrl && partner.logoUrl.trim()) {
            return [partner.logoUrl];
        }
        if (fallback) {
            return buildSponsorLogoSources(fallback);
        }
        return [];
    }, [fallback, partner.logoUrl]);
    const safeIndex = Math.min(sourceIndex, Math.max(0, sources.length - 1));
    const currentSource = sources[safeIndex];

    useEffect(() => {
        setIsLoaded(false);
    }, [currentSource]);
    const showTextFallback = !currentSource || !isLoaded;
    const rawUrl = typeof partner.url === "string" ? partner.url.trim() : "";
    const href = rawUrl && /^(https?:)?\/\//i.test(rawUrl) ? rawUrl : rawUrl.startsWith("mailto:") ? rawUrl : "";
    const classNames = `logo ${className}`.trim();
    const handleLogoError = () => {
        setIsLoaded(false);
        setSourceIndex((previous) => {
            const nextIndex = previous + 1;
            if (nextIndex < sources.length) {
                return nextIndex;
            }
            return previous;
        });
    };
    const handleLogoLoad = () => setIsLoaded(true);
    const children = [
        React.createElement("span", { key: "sr", className: "sr-only" }, partner.name),
        currentSource
            ? React.createElement("img", {
                key: currentSource,
                src: currentSource,
                alt: `${partner.name} logo`,
                loading: "eager",
                onLoad: handleLogoLoad,
                onError: handleLogoError,
            })
            : null,
        showTextFallback
            ? React.createElement("span", { key: "fallback", className: "logo-fallback", "aria-hidden": "true" }, partner.name)
            : null,
    ].filter(Boolean);
    if (href) {
        return (React.createElement("a", { className: classNames, href: href, target: "_blank", rel: "noopener noreferrer" }, children));
    }
    return React.createElement("div", { className: classNames }, children);
};
const unboxingVideoUrl = "https://www.youtube.com/embed/v_8kKWD0K84?si=KzawWGqmMEQA7n78";
const offerings = [
    {
        title: "Foredrag",
        description: "FjOlsen besøker skoler, idrettslag og e-sportklubber for å snakke om streaming, gaming-kultur og nettvett.",
        emoji: React.createElement("img", {
            src: "https://setaei.com/Fjolsen/Glad%20tenner.png",
            alt: "",
            loading: "lazy",
            className: "h-12 w-12 shrink-0",
            "aria-hidden": "true",
        }),
    },
    {
        title: "Events",
        description: "Vi arrangerer gaming-konkurranser for bedrifter, skoler og klubber – både digitalt og fysisk.",
        emoji: React.createElement("img", {
            src: "https://setaei.com/Fjolsen/Penger.png",
            alt: "",
            loading: "lazy",
            className: "h-12 w-12 shrink-0",
            "aria-hidden": "true",
        }),
    },
    {
        title: "Unboxing",
        description: "FjOlsen lager profesjonelle unboxing-videoer av dine produkter som kan brukes i deres markedsføring og deles med vårt community.",
        emoji: React.createElement("img", {
            src: "https://setaei.com/Fjolsen/Love.png",
            alt: "",
            loading: "lazy",
            className: "h-12 w-12 shrink-0",
            "aria-hidden": "true",
        }),
    },
    {
        title: "Streamer for hire",
        description: "Ønsker du at FjOlsen skal streame på vegne av din merkevare? Han er tilgjengelig for co-streams, produktlanseringer og kampanjer – der ditt budskap blir formidlet på en autentisk og engasjerende måte til tusenvis av følgere.",
        emoji: React.createElement("img", {
            src: "https://setaei.com/Fjolsen/Morsom.png",
            alt: "",
            loading: "lazy",
            className: "h-12 w-12 shrink-0",
            "aria-hidden": "true",
        }),
    },
    {
        title: "Coaching",
        description: "I FjOlsenbanden finner du flere av Norges dyktigste Fortnite-spillere. Sammen tilbyr vi 1-til-1 coaching for barn og unge som ønsker å utvikle seg som spillere – med fokus på strategi, samarbeid, kommunikasjon og trygg nettkultur. Ta kontakt hvis du ønsker mer informasjon eller vil booke en økt.",
        emoji: React.createElement("img", {
            src: "https://setaei.com/Fjolsen/Glad%20tenner.png",
            alt: "",
            loading: "lazy",
            className: "h-12 w-12 shrink-0",
            "aria-hidden": "true",
        }),
    },
];
const feedbackVoices = [
    {
        id: "filip",
        quote: "\u201CH\u2665 Tusen takk for at jeg har fått muligheten til å spille hos FjOlsenbanden. Kan ikke takke nok for alt du har gjort for meg og alle andre. \u2665\u201D",
        author: "Filip",
        accent: "text-[#FF9B6A]",
    },
    {
        id: "rasmus",
        quote: "\u201CJeg elsker å spille customs-a dine, det er min favoritt. Jeg spiller ikke annet enn dine customs!\u201D",
        author: "Rasmus",
        accent: "text-[#13A0F9]",
    },
    {
        id: "pernille-terje",
        quote: "\u201CUansett er vi takknemlige for innsatsen du legger i trygge og engasjerende rammer for barn og ungdom – og veldig flott at du arrangerer egne jentekvelder.\u201D",
        author: "Pernille & Terje, foreldre",
        accent: "text-[#34D399]",
    },
    {
        id: "merethe",
        quote: "\u201CDu gjør en forskjell! Du har så mye peiling på how to – overfor barn! Respekt.\u201D",
        author: "Merethe, mamma",
        accent: "text-[#FF2F9C]",
    },
];
const createDefaultVippsUser = () => ({
    name: "FjOlsen Fan",
    dateOfBirth: "2005-05-17",
    phoneNumber: "+47 987 65 432",
    email: "fjolsenfan@example.com",
});
const favoriteGameOptions = [
    "Fortnite",
    "Minecraft",
    "Rocket League",
    "EA FC 24",
    "Valorant",
    "Roblox",
];
const createDefaultProfileDraft = () => ({
    twitch: "",
    youtube: "",
    tiktok: "",
    discord: "",
    gamertag: "",
    favoriteGames: [],
    showOnLeaderboards: false,
    parentName: "",
    parentPhone: "",
    parentConsent: false,
    address: "",
    postalCode: "",
    acceptPrivacy: false,
    acceptRules: false,
});
export default function FjolsenbandenHome() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const [footerMenuOpen, setFooterMenuOpen] = useState(false);
    const [skin, setSkin] = useState(() => "dark");
    const [unmuted, setUnmuted] = useState(false);
    const [previewCountdown, setPreviewCountdown] = useState(60);
    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState(() => null);
    const [vippsLoggedIn, setVippsLoggedIn] = useState(false);
    const [vippsDraft, setVippsDraft] = useState(createDefaultVippsUser);
    const [vippsUser, setVippsUser] = useState(() => null);
    const [vippsFlow, setVippsFlow] = useState(() => null);
    const [parentPhone, setParentPhone] = useState("");
    const [approvalSent, setApprovalSent] = useState(false);
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const [profileDraft, setProfileDraft] = useState(createDefaultProfileDraft);
    const [profileSubmitted, setProfileSubmitted] = useState(false);
    const [navScrolled, setNavScrolled] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [showUnboxingVideo, setShowUnboxingVideo] = useState(false);
    const liveSectionRef = useRef(null);
    const [typingStarted, setTypingStarted] = useState(false);
    const [typedRuleDescriptions, setTypedRuleDescriptions] = useState(() => liveRuleMessages.map(() => ""));
    const { state } = useAdminState();
    const { siteSettings } = state;
    const moduleSettings = useMemo(() => { var _a; return ({ ...DEFAULT_SITE_MODULES, ...((_a = siteSettings.modules) !== null && _a !== void 0 ? _a : DEFAULT_SITE_MODULES) }); }, [siteSettings.modules]);
    const { liveStream, partners: partnersEnabled, contactForm } = moduleSettings;
    const normalizedSectionOrder = useMemo(() => {
        const incoming = Array.isArray(siteSettings.sectionOrder) ? siteSettings.sectionOrder : [];
        const combined = [...incoming, ...DEFAULT_SECTION_ORDER];
        const seen = new Set();
        return combined.filter((key) => {
            if (!DEFAULT_SECTION_ORDER.includes(key)) {
                return false;
            }
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }, [siteSettings.sectionOrder]);
    const sectionOrderMap = useMemo(() => {
        const map = new Map();
        normalizedSectionOrder.forEach((key, index) => map.set(key, index));
        return map;
    }, [normalizedSectionOrder]);
    const sectionOrderStyle = (key) => {
        var _a;
        return ({
            order: (_a = sectionOrderMap.get(key)) !== null && _a !== void 0 ? _a : normalizedSectionOrder.length,
        });
    };
    const heroHeadline = [siteSettings.heroHeadline, siteSettings.heroTagline, siteSettings.heroTitle]
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .find((value) => value.length > 0) ||
        "Velkommen til FjOlsenbanden – Norges mest inkluderende gaming-community.";
    const heroSubtitle = (typeof siteSettings.heroSubtitle === "string" && siteSettings.heroSubtitle.trim()) ||
        "Spillglede for hele familien med trygge streams, premier og fellesskap.";
    const announcement = (typeof siteSettings.announcement === "string" && siteSettings.announcement.trim()) ||
        "Neste livesending starter 20:00 med co-op i Mario Kart og premier fra Lenovo!";
    const fallbackLogoUrl = "https://setaei.com/Fjolsen/Liggende-M%E2%94%9C%E2%95%95rk.png";
    const scrolledLogoUrl = "https://setaei.com/Fjolsen/Glad%20tunge.png";
    const logoUrl = (typeof siteSettings.logoUrl === "string" && siteSettings.logoUrl.trim()) || fallbackLogoUrl;
    const presentationVideoUrl = (typeof siteSettings.presentationVideoUrl === "string" && siteSettings.presentationVideoUrl.trim()) ||
        "https://www.youtube.com/embed/8EgRIkmvmtM";
    const heroBackgroundImage = (typeof siteSettings.heroBackgroundImage === "string" && siteSettings.heroBackgroundImage.trim()) ||
        "https://static-cdn.jtvnw.net/previews-ttv/live_user_fjolsenfn-1920x1080.jpg";
    const twitchEmbedUrl = (typeof siteSettings.twitchEmbedUrl === "string" && siteSettings.twitchEmbedUrl.trim()) || DEFAULT_TWITCH_EMBED_URL;
    const membershipTiers = Array.isArray(siteSettings.membershipTiers) ? siteSettings.membershipTiers : [];
    const partnerLogos = Array.isArray(siteSettings.partnerLogos) ? siteSettings.partnerLogos : [];
    const heroHighlightTerm = "FjOlsenbanden";
    const heroHeadlineContent = heroHeadline.includes(heroHighlightTerm)
        ? heroHeadline.split(heroHighlightTerm).reduce((nodes, segment, index, segments) => {
            if (segment.length > 0) {
                nodes.push(segment);
            }
            if (index < segments.length - 1) {
                nodes.push(React.createElement("span", { key: `hero-highlight-${index}`, className: "text-[#13A0F9]" }, heroHighlightTerm));
            }
            return nodes;
        }, [])
        : [heroHeadline];
    const sponsorFallbackMap = useMemo(() => {
        const map = new Map();
        sponsors.forEach((sponsor) => map.set(sponsor.name.toLowerCase(), sponsor));
        return map;
    }, []);
    const partnerLogoData = useMemo(() => partnerLogos.map((partner) => {
        var _a;
        const fallback = sponsorFallbackMap.get(partner.name.toLowerCase());
        const trimmedUrl = typeof partner.url === "string" ? partner.url.trim() : "";
        return {
            partner: {
                ...partner,
                url: trimmedUrl || ((_a = fallback === null || fallback === void 0 ? void 0 : fallback.website) !== null && _a !== void 0 ? _a : ""),
            },
            fallback,
        };
    }), [partnerLogos, sponsorFallbackMap]);
    const resolvedPartnerLogos = useMemo(() => {
        if (partnerLogoData.length > 0) {
            return partnerLogoData;
        }
        return sponsors.map((sponsor) => ({
            partner: {
                id: sponsor.slug,
                name: sponsor.name,
                logoUrl: sponsor.defaultLogoUrl || getPartnerBadge(sponsor.slug) || "",
                url: sponsor.website || "",
            },
            fallback: sponsor,
        }));
    }, [partnerLogoData]);
    const filteredNavLinks = useMemo(() => navLinks.filter((link) => {
        if (link.href === "#live") {
            return liveStream;
        }
        if (link.href === "#samarbeid") {
            return partnersEnabled;
        }
        if (link.href === "#kontakt") {
            return contactForm;
        }
        return true;
    }), [contactForm, liveStream, partnersEnabled]);
    const hasContactLink = useMemo(() => filteredNavLinks.some((link) => link.href === "#kontakt"), [filteredNavLinks]);
    const anchorNavLinks = useMemo(() => filteredNavLinks.filter((link) => link.href.startsWith("#")), [filteredNavLinks]);
    const fallbackAnchorLinks = useMemo(() => navLinks.filter((link) => link.href.startsWith("#")), []);
    const headerPrimaryLinks = anchorNavLinks.length > 0 ? anchorNavLinks : fallbackAnchorLinks;
    const externalNavLinks = useMemo(() => filteredNavLinks.filter((link) => !link.href.startsWith("#")), [filteredNavLinks]);
    const fallbackExternalLinks = useMemo(() => navLinks.filter((link) => !link.href.startsWith("#")), []);
    const headerSecondaryLinks = externalNavLinks.length > 0 ? externalNavLinks : fallbackExternalLinks;
    const toggleSkin = () => {
        setSkin((previous) => (previous === "dark" ? "light" : "dark"));
    };
    const openMobileNav = () => {
        setFooterMenuOpen(false);
        setMobileNavOpen(true);
    };
    const closeMobileNav = () => {
        setMobileNavOpen(false);
    };
    const toggleMobileNav = () => {
        setMobileNavOpen((previous) => {
            const next = !previous;
            if (next) {
                setFooterMenuOpen(false);
            }
            return next;
        });
    };
    const openFooterMenu = () => {
        setMobileNavOpen(false);
        setFooterMenuOpen(true);
    };
    const closeFooterMenu = () => {
        setFooterMenuOpen(false);
    };
    useEffect(() => {
        if (!liveStream) {
            setTypingStarted(false);
            setTypedRuleDescriptions(liveRuleMessages.map(() => ""));
        }
    }, [liveStream]);
    useEffect(() => {
        if (!liveStream || typingStarted) {
            return;
        }
        const sectionNode = liveSectionRef.current;
        if (!sectionNode) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if ((entry === null || entry === void 0 ? void 0 : entry.isIntersecting) && !typingStarted) {
                setTypedRuleDescriptions(liveRuleMessages.map(() => ""));
                setTypingStarted(true);
                observer.disconnect();
            }
        }, { threshold: 0.35 });
        observer.observe(sectionNode);
        return () => observer.disconnect();
    }, [liveStream, typingStarted]);
    useEffect(() => {
        if (!typingStarted) {
            return;
        }
        let messageIndex = 0;
        let charIndex = 0;
        const timeouts = [];
        const scheduleType = (delay) => {
            const timeoutId = window.setTimeout(() => {
                if (messageIndex >= liveRuleMessages.length) {
                    return;
                }
                const target = liveRuleMessages[messageIndex];
                const nextCharIndex = charIndex + 1;
                setTypedRuleDescriptions((previous) => {
                    const next = [...previous];
                    next[messageIndex] = target.description.slice(0, nextCharIndex);
                    return next;
                });
                charIndex = nextCharIndex;
                if (charIndex < target.description.length) {
                    scheduleType(24);
                }
                else {
                    messageIndex += 1;
                    charIndex = 0;
                    if (messageIndex < liveRuleMessages.length) {
                        scheduleType(560);
                    }
                }
            }, delay);
            timeouts.push(timeoutId);
        };
        scheduleType(180);
        return () => {
            timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, [typingStarted]);
    const renderPartnerSection = (sectionId, orderKey, { includeLogosId = false, variant = "default" } = {}) => {
        const contactHref = hasContactLink ? "#kontakt" : "mailto:fjolsenfn@gmail.com";
        if (variant === "showcase") {
            return (React.createElement("section", { id: sectionId, className: "partners", style: sectionOrderStyle(orderKey) },
                React.createElement("h2", null, "Samarbeidspartnere"),
                React.createElement("p", { className: "lead" }, "Vi har allerede hatt samarbeid med flere kjente merkevarer."),
                React.createElement("div", { className: "partner-logos", id: includeLogosId ? "sponsorer" : undefined }, resolvedPartnerLogos.map(({ partner, fallback }) => (React.createElement(SimplePartnerLogo, { key: (partner === null || partner === void 0 ? void 0 : partner.id) || partner.name, partner: partner, fallback: fallback })))),
                React.createElement("p", null, "\u00d8nsker du \u00e5 synliggj\u00f8re din merkevare for v\u00e5rt engasjerte gaming-publikum?"),
                React.createElement("a", { href: contactHref, className: "cta" }, "Kontakt oss"),
                React.createElement("p", { className: "cta-support" }, "Ta kontakt for samarbeid!")));
        }
        return (React.createElement("section", { id: sectionId, className: "partners", style: sectionOrderStyle(orderKey) },
            React.createElement("h2", { className: "sr-only" }, "Samarbeidspartnere"),
            React.createElement("div", { className: "partner-logos", id: includeLogosId ? "sponsorer" : undefined }, resolvedPartnerLogos.map(({ partner, fallback }) => (React.createElement(SimplePartnerLogo, { key: (partner === null || partner === void 0 ? void 0 : partner.id) || partner.name, partner: partner, fallback: fallback }))))));
    };
    const handleContactSubmit = (event) => {
        var _a, _b, _c, _d, _e, _f;
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = (_b = (_a = formData.get("name")) === null || _a === void 0 ? void 0 : _a.toString().trim()) !== null && _b !== void 0 ? _b : "";
        const email = (_d = (_c = formData.get("email")) === null || _c === void 0 ? void 0 : _c.toString().trim()) !== null && _d !== void 0 ? _d : "";
        const message = (_f = (_e = formData.get("message")) === null || _e === void 0 ? void 0 : _e.toString().trim()) !== null && _f !== void 0 ? _f : "";
        const subject = encodeURIComponent("Kontakt via fjolsenbanden.no");
        const body = encodeURIComponent(`${message}\n\nNavn: ${name || "Ukjent"}\nE-post: ${email || "Ikke oppgitt"}`);
        window.location.href = `mailto:fjolsenfn@gmail.com?subject=${subject}&body=${body}`;
        event.currentTarget.reset();
    };
    useEffect(() => {
        if (!footerMenuOpen) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setFooterMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [footerMenuOpen]);
    useEffect(() => {
        if (!footerMenuOpen) {
            return;
        }
        const body = document.body;
        const previousOverflow = body.style.overflow;
        const previousTouchAction = body.style.touchAction;
        body.style.overflow = "hidden";
        body.style.touchAction = "none";
        return () => {
            body.style.overflow = previousOverflow;
            body.style.touchAction = previousTouchAction;
        };
    }, [footerMenuOpen]);
    useEffect(() => {
        const handleContextMenu = (event) => {
            const target = event.target;
            if (target instanceof HTMLElement &&
                (target.closest("input") || target.closest("textarea"))) {
                return;
            }
            event.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
    useEffect(() => {
        if (!mobileNavOpen) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMobileNavOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [mobileNavOpen]);
    useEffect(() => {
        if (!mobileNavOpen) {
            return undefined;
        }
        const body = document.body;
        const previousOverflow = body.style.overflow;
        const previousTouchAction = body.style.touchAction;
        body.style.overflow = "hidden";
        body.style.touchAction = "none";
        return () => {
            body.style.overflow = previousOverflow;
            body.style.touchAction = previousTouchAction;
        };
    }, [mobileNavOpen]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileNavOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    useEffect(() => {
        document.body.dataset.fjTheme = skin;
    }, [skin]);
    useEffect(() => {
        if (unmuted) {
            return undefined;
        }
        if (previewCountdown <= 0) {
            return undefined;
        }
        const timer = window.setTimeout(() => {
            setPreviewCountdown((prev) => Math.max(prev - 1, 0));
        }, 1000);
        return () => window.clearTimeout(timer);
    }, [previewCountdown, unmuted]);
    useEffect(() => {
        if (!showUnboxingVideo) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowUnboxingVideo(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showUnboxingVideo]);
    useEffect(() => {
        if (vippsFlow !== "minor") {
            setProfileDraft((previous) => {
                if (!previous.parentName &&
                    !previous.parentPhone &&
                    !previous.parentConsent &&
                    !previous.address &&
                    !previous.postalCode) {
                    return previous;
                }
                return {
                    ...previous,
                    parentName: "",
                    parentPhone: "",
                    parentConsent: false,
                    address: "",
                    postalCode: "",
                };
            });
            return;
        }
        if (!parentPhone) {
            return;
        }
        setProfileDraft((previous) => {
            if (previous.parentPhone) {
                return previous;
            }
            return { ...previous, parentPhone };
        });
    }, [parentPhone, vippsFlow]);
    useEffect(() => {
        const handleScroll = () => {
            setNavScrolled(window.scrollY > 40);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) {
            return 0;
        }
        const dob = new Date(dateOfBirth);
        if (Number.isNaN(dob.getTime())) {
            return 0;
        }
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age -= 1;
        }
        return age;
    };
    const openRegistration = (tier) => {
        setRegistrationOpen(true);
        setSelectedTier(tier !== null && tier !== void 0 ? tier : null);
        setVippsLoggedIn(false);
        setVippsDraft(createDefaultVippsUser());
        setVippsUser(null);
        setVippsFlow(null);
        setParentPhone("");
        setApprovalSent(false);
        setPaymentInitiated(false);
        setProfileDraft(createDefaultProfileDraft());
        setProfileSubmitted(false);
    };
    const closeRegistration = () => {
        setRegistrationOpen(false);
    };
    const handleVippsLogin = () => {
        setVippsLoggedIn(true);
    };
    const handleVippsDraftChange = (event, field) => {
        const value = event.currentTarget.value;
        setVippsDraft((previous) => ({ ...previous, [field]: value }));
    };
    const handleVippsDetailsSubmit = (event) => {
        event.preventDefault();
        setVippsUser(vippsDraft);
        const age = calculateAge(vippsDraft.dateOfBirth);
        if (age > 0 && age < 18) {
            setVippsFlow("minor");
        }
        else {
            setVippsFlow("adult");
        }
    };
    const handleGuardianSubmit = (event) => {
        event.preventDefault();
        setApprovalSent(true);
    };
    const handleAdultCheckout = () => {
        setPaymentInitiated(true);
    };
    const handleProfileFieldChange = (event, field) => {
        const value = event.currentTarget.value;
        setProfileDraft((previous) => ({ ...previous, [field]: value }));
    };
    const handleProfileCheckboxChange = (event, field) => {
        const checked = event.currentTarget.checked;
        setProfileDraft((previous) => ({ ...previous, [field]: checked }));
    };
    const handleFavoriteGameToggle = (event, game) => {
        const checked = event.currentTarget.checked;
        setProfileDraft((previous) => {
            const current = new Set(previous.favoriteGames);
            if (checked) {
                current.add(game);
            }
            else {
                current.delete(game);
            }
            return {
                ...previous,
                favoriteGames: favoriteGameOptions.filter((option) => current.has(option)),
            };
        });
    };
    const handleProfileSubmit = (event) => {
        event.preventDefault();
        if (!vippsUser) {
            return;
        }
        const payload = {
            vippsUser,
            profile: profileDraft,
            flow: vippsFlow,
            isMinor: vippsFlow === "minor",
        };
        console.log("Submit Vipps profile", payload);
        setProfileSubmitted(true);
    };
    const resolvedAge = vippsUser ? calculateAge(vippsUser.dateOfBirth) : null;
    const isMinor = vippsFlow === "minor";
    const showProfileForm = Boolean(vippsUser && ((isMinor && approvalSent) || (!isMinor && paymentInitiated)));
    const resolvedName = ((_j = vippsUser === null || vippsUser === void 0 ? void 0 : vippsUser.name) !== null && _j !== void 0 ? _j : "").trim();
    const [firstName, ...remainingNameParts] = resolvedName ? resolvedName.split(/\s+/) : [""];
    const lastName = remainingNameParts.join(" ");
    const estimatedUnboxingReach = new Intl.NumberFormat("no-NO").format(2500 + 3200 + 4200);
    const overlayBackground = skin === "light"
        ? "radial-gradient(circle at 20% 15%, rgba(59,208,255,0.35), transparent 55%), radial-gradient(circle at 78% 0%, rgba(255,134,205,0.32), transparent 55%)"
        : "radial-gradient(circle at 18% 12%, rgba(19,160,249,0.3), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,47,156,0.18), transparent 50%)";
    const footerNavigationLinks = filteredNavLinks.length > 0 ? filteredNavLinks : navLinks;
    const footerMenuPortal = footerMenuOpen && typeof document !== "undefined"
        ? createPortal(React.createElement(React.Fragment, null,
            React.createElement("div", { role: "presentation", "aria-hidden": "true", className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm", onClick: closeFooterMenu }),
            React.createElement("section", { id: "footer-bottom-sheet", role: "dialog", "aria-modal": "true", className: "fj-sheet fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-white/10 px-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6" },
                React.createElement("div", { className: "mx-auto flex w-full max-w-4xl flex-col gap-4" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("h2", { className: "text-base font-semibold" }, "Navigasjon"),
                        React.createElement("button", { type: "button", onClick: closeFooterMenu, className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9]" },
                            React.createElement(X, { className: "h-5 w-5", "aria-hidden": "true" }))),
                    React.createElement("ul", { className: "grid gap-3 text-left" }, footerNavigationLinks.map((link, index) => (React.createElement("li", { key: link.name },
                        React.createElement("a", { href: link.href, onClick: closeFooterMenu, className: "flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-base font-semibold text-white/85 transition hover:border-white/20 hover:bg-white/10" },
                            React.createElement("span", null, link.name),
                            React.createElement("span", { className: "text-xs font-semibold uppercase tracking-[0.35em] text-[#13A0F9]/70" }, String(index + 1).padStart(2, "0"))))))),
                    React.createElement("div", { className: "grid gap-3 sm:grid-cols-2" },
                        contactForm && !hasContactLink ? (React.createElement("a", { href: "#kontakt", onClick: closeFooterMenu, className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white" },
                            React.createElement(MessageCircle, { className: "h-4 w-4", "aria-hidden": "true" }),
                            "Kontakt oss")) : null,
                        React.createElement("a", { href: "#kontakt", onClick: closeFooterMenu, className: "fj-ring-offset inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9] focus-visible:ring-offset-2" },
                            "Kontakt oss",
                            React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" }))))))), document.body)
        : null;
    const mobileNavPortal = mobileNavOpen && typeof document !== "undefined"
        ? createPortal(React.createElement(React.Fragment, null,
            React.createElement("div", { className: "fixed inset-0 z-40 bg-black/70 sm:hidden", role: "presentation", "aria-hidden": "true", onClick: closeMobileNav }),
            React.createElement("nav", { className: "fixed inset-x-0 top-[var(--fj-nav-height)] z-50 sm:hidden", role: "dialog", "aria-modal": "true", "aria-label": "Mobilmeny" },
                React.createElement("div", { className: "mx-auto flex w-full max-w-xl flex-col gap-5 rounded-b-3xl border border-white/15 border-t-0 bg-[#041149]/95 px-6 pb-6 pt-4 shadow-[0_30px_60px_rgba(4,17,73,0.6)]" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("h2", { className: "text-base font-semibold text-white" }, "Meny"),
                        React.createElement("button", { type: "button", onClick: closeMobileNav, className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9]", "aria-label": "Lukk meny" },
                            React.createElement(X, { className: "h-5 w-5", "aria-hidden": "true" }))),
                    React.createElement("ul", { className: "grid gap-3 text-left" }, headerPrimaryLinks.map((link, index) => (React.createElement("li", { key: link.href || link.name },
                        React.createElement("a", { href: link.href, onClick: closeMobileNav, className: "flex items-center justify-between gap-3 rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-base font-semibold text-white/85 transition hover:border-white/20 hover:bg-white/10" },
                            React.createElement("span", null, link.name),
                            React.createElement("span", { className: "text-xs font-semibold uppercase tracking-[0.35em] text-[#13A0F9]/70" }, String(index + 1).padStart(2, "0"))))))),
                    React.createElement("div", { className: "grid gap-3" },
                        React.createElement("a", { href: "#kontakt", onClick: closeMobileNav, className: "fj-ring-offset inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                            "Kontakt oss",
                            React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })),
                        headerSecondaryLinks.map((link) => (React.createElement("a", { key: link.href || link.name, href: link.href, onClick: closeMobileNav, className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/10" }, link.name))))) )), document.body)
        : null;
    return (React.createElement("div", { className: `fj-theme fj-page theme-${skin} relative flex min-h-screen flex-col overflow-x-hidden` },
        showUnboxingVideo ? (React.createElement(VideoLightbox, { videoUrl: unboxingVideoUrl, onClose: () => setShowUnboxingVideo(false), title: "Se hvordan vi pakker ut og presenterer produkter for communityet" })) : null,
        React.createElement("div", { className: "pointer-events-none fixed inset-0 -z-10 opacity-60", style: {
                background: overlayBackground,
            } }),
        React.createElement("div", { className: "flex flex-1 flex-col" },
            React.createElement("nav", { className: "fj-nav section-shell relative z-30 grid grid-cols-1 items-center gap-4 border-b border-white/10 bg-[#041149]/75 py-4 backdrop-blur supports-[backdrop-filter]:bg-[#041149]/60 sm:grid-cols-[1fr_auto_1fr]", "data-scrolled": navScrolled ? "true" : "false" },
                React.createElement("div", { className: "hidden items-center justify-start gap-4 sm:flex" },
                    React.createElement("img", { src: scrolledLogoUrl, alt: "Fjolsenbanden ikon", "aria-hidden": "true", className: `h-12 w-auto transition-all duration-300 ease-out ${navScrolled ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}` })),
                React.createElement("a", { href: "#", className: "group flex w-full items-center justify-center gap-3 rounded-none border border-transparent p-0 transition hover:border-white/20 hover:bg-white/5 sm:w-auto sm:justify-self-center sm:rounded-full sm:px-3 sm:py-2", "aria-label": "Fjolsenbanden hjem" },
                    React.createElement("img", { src: logoUrl, alt: "Fjolsenbanden logo", className: "mx-auto h-16 w-auto max-w-[260px] sm:mx-0 sm:h-12 sm:max-w-none", loading: "lazy" }),
                    React.createElement("span", { className: "sr-only" }, "Fjolsenbanden")),
                React.createElement("div", { className: "flex items-center justify-end gap-2 sm:gap-3" },
                    React.createElement("div", { className: "hidden items-center gap-1 text-sm font-semibold text-white/80 lg:flex" }, headerPrimaryLinks.map((link) => (React.createElement("a", { key: link.href || link.name, href: link.href, onClick: closeMobileNav, className: "rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-white" }, link.name)))),
                    headerSecondaryLinks.length > 0 ? (React.createElement("div", { className: "hidden items-center gap-3 text-sm sm:flex" }, headerSecondaryLinks.map((link) => (React.createElement("a", { key: link.href || link.name, href: link.href, className: "font-semibold text-zinc-300 transition hover:text-white" }, link.name))))) : null,
                    React.createElement("button", { type: "button", onClick: toggleSkin, className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9]", "aria-pressed": skin === "light" },
                        React.createElement(Sun, { className: `h-5 w-5 ${skin === "light" ? "hidden" : ""}`, "aria-hidden": "true" }),
                        React.createElement(Moon, { className: `h-5 w-5 ${skin === "light" ? "" : "hidden"}`, "aria-hidden": "true" }),
                        React.createElement("span", { className: "sr-only" }, skin === "light" ? "Bytt til nattmodus" : "Bytt til dagmodus")),
                    React.createElement("button", { type: "button", onClick: mobileNavOpen ? closeMobileNav : openMobileNav, className: "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9] sm:hidden", "aria-expanded": mobileNavOpen, "aria-label": mobileNavOpen ? "Lukk meny" : "Åpne meny" },
                        React.createElement(Menu, { className: `h-5 w-5 ${mobileNavOpen ? "hidden" : ""}`, "aria-hidden": "true" }),
                        React.createElement(X, { className: `h-5 w-5 ${mobileNavOpen ? "" : "hidden"}`, "aria-hidden": "true" }),
                        React.createElement("span", { className: "sr-only" }, mobileNavOpen ? "Lukk meny" : "Åpne meny")))),
            React.createElement("header", { className: "relative z-10 overflow-hidden pb-32" },
                React.createElement("div", { className: "absolute inset-0 -z-10" },
                    React.createElement("img", { src: heroBackgroundImage, alt: "", "aria-hidden": "true", className: "h-full w-full object-cover", loading: "lazy" }),
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-[#041149]/40 via-[#041149]/65 to-[#041149]/85" })),
                React.createElement("section", { id: "hero", className: "px-6 pt-12 sm:px-8 lg:px-10" },
                    React.createElement("div", { className: "mx-auto max-w-4xl space-y-6 text-center lg:space-y-8" },
                        React.createElement("h1", { className: "text-4xl font-extrabold sm:text-5xl" }, heroHeadlineContent),
                        React.createElement("p", { className: "text-base text-zinc-100 sm:text-lg" }, heroSubtitle),
                        React.createElement("div", { className: "flex flex-col items-center gap-3 text-sm text-zinc-100 sm:flex-row sm:justify-center" },
                            React.createElement("a", { href: "/updates.html", className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20" }, "\uD83C\uDF1F Ny oppdatering: Quest-board"),
                            React.createElement("span", { className: "text-xs uppercase tracking-[0.3em] text-white/70" }, "Utforsk ukens quester og premier"))))),
            React.createElement("main", { className: "flex flex-1 flex-col gap-28 pb-36" },
            React.createElement("section", { id: "hva-er", className: "px-6 sm:px-8 lg:px-10", style: sectionOrderStyle("heroIntro") },
                React.createElement("div", { className: "mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start" },
                    React.createElement("div", { className: "space-y-6 text-left" },
                        React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80" }, "Hva er FjOlsenbanden?"),
                        React.createElement("h2", { className: "text-3xl font-bold sm:text-4xl" }, "\uD83C\uDFAE Spillglede for hele familien"),
                        React.createElement("p", { className: "text-lg text-slate-100" }, "FjOlsenbanden er et raskt voksende gaming-community med over 2\u00A0500 medlemmer p\u00E5 Discord, 3\u00A0200+ f\u00F8lgere p\u00E5 Twitch og 4\u00A0200+ p\u00E5 TikTok. Her m\u00F8tes barn, ungdom og foreldre for \u00E5 game trygt sammen."),
                        React.createElement("p", { className: "text-lg text-slate-100" }, "M\u00E5let v\u00E5rt er enkelt: \u00E5 skape et inkluderende milj\u00F8 der alle kan spille uten hets, mobbing eller negativ adferd. FjOlsen legger ned mange timer hver uke p\u00E5 konkurranser, turneringer og aktiviteter \u2013 alltid med fellesskap og spilleglede i sentrum."),
                        React.createElement("div", { className: "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg" },
                            React.createElement("p", { className: "text-base text-slate-100" }, "\uD83C\uDFA5 Se videoen for \u00E5 m\u00F8te FjOlsen og bli kjent med historien bak communityet!"))),
                    React.createElement("div", { className: "flex w-full flex-col items-center gap-6 lg:max-w-xl lg:items-start" },
                        React.createElement("div", { className: "relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_28px_60px_rgba(7,12,28,0.6)]" },
                            React.createElement("iframe", { className: "aspect-video w-full", width: "560", height: "315", src: presentationVideoUrl, title: "YouTube video player", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true })),
                        React.createElement("div", { className: "w-full rounded-3xl border border-white/10 bg-[#071d6f]/80 p-6 shadow-[0_18px_42px_rgba(12,21,45,0.45)]" },
                            React.createElement("div", { className: "mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-sm sm:tracking-[0.3em]" },
                                React.createElement(ShieldCheck, { className: "h-4 w-4 text-[#13A0F9]" }),
                                " F\u00F8lg FjOlsenbanden"),
                            React.createElement("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5" }, platformLinks.map(({ icon, label, href }) => (React.createElement(PlatformButton, { key: label, icon: icon, label: label, href: href })))),
                            React.createElement("p", { className: "mt-3 text-center text-xs text-zinc-400 sm:text-left" }, announcement))))),
            liveStream
                ? (React.createElement("section", { id: "live", ref: liveSectionRef, className: "px-6 sm:px-8 lg:px-10", style: sectionOrderStyle("liveStream") },
                    React.createElement("div", { className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-3" },
                        React.createElement("div", { className: "space-y-6 lg:col-span-2" },
                            React.createElement("div", { className: "space-y-4 text-center lg:text-left" },
                                React.createElement("h2", { className: "text-3xl font-bold sm:text-4xl" }, "\uD83C\uDFA5 Live med FjOlsen"),
                                React.createElement("p", { className: "text-lg text-slate-100" }, "F\u00F8lg sendingene direkte fra studioet v\u00E5rt med turneringer, gaming-utfordringer og overraskelser fra communityet."),
                                React.createElement("p", { className: "text-sm text-slate-300" }, "Klikk p\u00E5 forh\u00E5ndsvisningen for \u00E5 se hele streamen p\u00E5 Twitch, eller hopp inn i chatten og heie p\u00E5 spillerne."),
                                announcement ? React.createElement("p", { className: "text-sm text-slate-300" }, announcement) : null),
                            React.createElement("div", { className: "relative overflow-hidden rounded-2xl border border-white/10 bg-[#071d6f]" },
                                React.createElement("span", { className: "absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white" }, "\uD83D\uDD34 LIVE"),
                                React.createElement("iframe", { title: "FjOlsenbanden live", src: twitchEmbedUrl, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture", allowFullScreen: true, referrerPolicy: "strict-origin-when-cross-origin", className: "aspect-video w-full bg-black", "data-preview-frame": "true" }),
                                React.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/75 p-6 text-center", "data-preview-overlay": "true" },
                                    React.createElement(Play, { className: "h-12 w-12 text-[#13A0F9]" }),
                                    React.createElement("p", { className: "text-sm text-slate-200" }, "1-minutt forh\u00E5ndsvisning ", React.createElement("span", { className: "ml-1", "data-preview-timer": "true" }, "60"), "s igjen"),
                                    React.createElement("button", { type: "button", className: "inline-flex items-center justify-center rounded-full bg-[#13A0F9] px-6 py-2.5 font-semibold text-white transition hover:bg-[#2bb5ff]", "data-video-unmute": "true" }, "Se full stream"),
                                    React.createElement("div", { className: "flex gap-3 text-xs text-slate-300" },
                                        React.createElement("span", null, "eller fortsett p\u00E5",
                                            React.createElement("a", { href: "https://www.twitch.tv/FjOlsenFN", target: "_blank", rel: "noopener noreferrer", className: "ml-1 text-[#13A0F9]" }, "Twitch")),
                                        React.createElement("span", null, "|"),
                                        React.createElement("a", { href: "https://youtube.com/@fjolsenbanden", target: "_blank", rel: "noopener noreferrer", className: "text-[#13A0F9]" }, "YouTube")))),
                            React.createElement("div", { className: "flex flex-wrap justify-center gap-3" },
                                liveFollowLinks.map(({ label, href, icon }) => (React.createElement("a", { key: label, href: href, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition hover:bg-white/10" }, icon, React.createElement("span", null, label)))))),
                        React.createElement("div", { className: "flex max-h-[640px] flex-col rounded-2xl border border-white/10 bg-[#071d6f]/90 p-5" },
                            React.createElement("h3", { className: "mb-2 flex items-center gap-2 text-sm font-semibold text-[#13A0F9]" },
                                React.createElement(MessageCircle, { className: "h-4 w-4", "aria-hidden": "true" }),
                                "Regelbot"),
                            React.createElement("p", { className: "mb-4 text-xs text-slate-300" }, "Se reglene v\u00E5re skrives ut i sanntid mens du scroller."),
                            React.createElement("div", { className: "flex-1 space-y-3 overflow-y-auto pr-1 text-sm", "aria-live": typingStarted ? "polite" : "off" },
                                liveRuleMessages.map((rule, index) => {
                                    const typedText = typedRuleDescriptions[index] || "";
                                    const showCursor = typedText.length > 0 && typedText.length < rule.description.length;
                                    return (React.createElement("div", { key: rule.id, className: "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#041149]/60 p-4 shadow-[0_16px_32px_rgba(8,14,45,0.5)] transition" },
                                        React.createElement("span", { className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#13A0F9]/60 to-transparent opacity-75", "aria-hidden": "true" }),
                                        React.createElement("div", { className: "flex items-center gap-3" },
                                            React.createElement("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#13A0F9]" }, rule.icon),
                                            React.createElement("div", { className: "flex flex-col" },
                                                React.createElement("span", { className: "text-[10px] font-semibold uppercase tracking-[0.35em] text-[#13A0F9]/80" }, `Regel ${index + 1}`),
                                                React.createElement("span", { className: "text-sm font-semibold text-white" }, rule.title)))),
                                        React.createElement("p", { className: "mt-3 min-h-[3.5rem] text-sm leading-relaxed text-slate-200" },
                                            typedText || "\u00A0",
                                            showCursor ? React.createElement("span", { className: "ml-1 inline-block h-4 w-[2px] animate-pulse bg-[#13A0F9]/80 align-baseline", "aria-hidden": "true" }) : null)));
                                })),
                            React.createElement("div", { className: "mt-3 rounded-lg border border-white/10 bg-[#041149]/80 px-3 py-2 text-xs text-slate-300" }, "Regelbot passer p\u00E5 at alle er klare f\u00F8r vi slipper dere l\u00F8s i chatten."))))
                : null,
            React.createElement("section", { id: "community", className: "px-6 sm:px-8 lg:px-10", style: sectionOrderStyle("community") },
                React.createElement("div", { className: "mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start" },
                    React.createElement("div", { id: "bli-medlem", className: "space-y-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_48px_rgba(6,14,35,0.45)] sm:p-8 lg:p-10" },
                        React.createElement("div", { className: "space-y-4 text-left" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80" }, "Bli medlem"),
                            React.createElement("h2", { className: "text-3xl font-bold text-white sm:text-4xl" }, "Bli medlem"),
                            React.createElement("p", { className: "text-lg text-slate-100" }, "Det er gratis å bli medlem i FjOlsenbanden! Alle kan delta i konkurranser, men for å vinne premier må du være registrert medlem."),
                            React.createElement("p", { className: "text-base text-slate-100 sm:text-lg" }, "Velg alder for å bli med, så sender vi deg riktig registreringsskjema.")),
                        React.createElement("div", { className: "space-y-6 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-6 lg:space-y-0" },
                            React.createElement("div", { className: "space-y-6 rounded-3xl border border-white/10 bg-[#0b1b4d]/70 p-6 text-left shadow-[0_24px_48px_rgba(6,14,35,0.45)] sm:p-8" },
                                React.createElement("h3", { className: "text-xl font-semibold text-white" }, "Velg alder"),
                                React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
                                    React.createElement("a", {
                                        href: "https://forms.gle/sq4mUf7s6e6UY7R58",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "group flex items-center justify-between gap-4 rounded-3xl border border-indigo-400/30 bg-indigo-500/20 p-6 text-left text-lg font-semibold text-white shadow-[0_20px_44px_rgba(99,102,241,0.35)] transition hover:-translate-y-1 hover:border-indigo-300/40 hover:bg-indigo-500/30",
                                    },
                                        React.createElement("span", { className: "flex items-center gap-4" },
                                            React.createElement("span", { className: "grid h-12 w-12 place-content-center rounded-2xl bg-indigo-500 text-2xl shadow-[0_14px_30px_rgba(99,102,241,0.45)]" }, "\uD83D\uDD35"),
                                            React.createElement("span", null, "Under 18 år")),
                                        React.createElement(ArrowRight, { className: "h-5 w-5 transition-transform group-hover:translate-x-1", "aria-hidden": "true" })),
                                    React.createElement("a", {
                                        href: "https://forms.gle/ZrbXCggnUY8FTT7t9",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "group flex items-center justify-between gap-4 rounded-3xl border border-emerald-400/30 bg-emerald-500/20 p-6 text-left text-lg font-semibold text-white shadow-[0_20px_44px_rgba(16,185,129,0.35)] transition hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-500/30",
                                    },
                                        React.createElement("span", { className: "flex items-center gap-4" },
                                            React.createElement("span", { className: "grid h-12 w-12 place-content-center rounded-2xl bg-emerald-500 text-2xl shadow-[0_14px_30px_rgba(16,185,129,0.45)]" }, "\uD83D\uDFE2"),
                                            React.createElement("span", null, "Over 18 år")),
                                        React.createElement(ArrowRight, { className: "h-5 w-5 transition-transform group-hover:translate-x-1", "aria-hidden": "true" }))),
                                React.createElement("p", { className: "text-sm text-slate-200" },
                                    "Ved å registrere deg bekrefter du at du har lest ",
                                    React.createElement("a", { href: "/regler.html", className: "text-[#13A0F9] underline decoration-dotted underline-offset-4 transition hover:text-[#2bb5ff]" }, "reglene våre"),
                                    " og følger dem i alle aktiviteter.")),
                            React.createElement("div", { className: "space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_24px_48px_rgba(6,14,35,0.45)] sm:p-8" },
                                React.createElement("h3", { className: "text-base font-semibold uppercase tracking-[0.25em] text-white/80" }, "Regler FjOlsenbanden"),
                                React.createElement("p", { className: "text-sm text-slate-200" }, "For å opprettholde et trygt og godt miljø har vi flere regler i FjOlsenbanden. Se alle reglene på Discord."),
                                React.createElement("div", { className: "flex flex-wrap gap-3" },
                                    React.createElement("a", {
                                        href: "https://discord.com/channels/1150105334187311154/1217560685232259072",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "inline-flex items-center justify-center gap-2 rounded-full bg-[#5865F2] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(88,101,242,0.35)] transition hover:bg-[#4753d9] focus:outline-none focus:ring-2 focus:ring-[#5865F2]/60",
                                    },
                                        React.createElement(DiscordIcon, { className: "h-4 w-4", "aria-hidden": "true" }),
                                        React.createElement("span", null, "Se reglene i Discord")),
                                    React.createElement("button", {
                                        type: "button",
                                        "data-open-regler-modal": true,
                                        className: "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40",
                                    },
                                        "Les reglene")),
                                React.createElement("div", { className: "space-y-3 text-sm text-slate-200" },
                                    React.createElement("p", { className: "rounded-xl border border-white/10 bg-[#131f3f]/80 p-3" },
                                        React.createElement("span", { className: "block text-xs font-semibold uppercase tracking-wide text-[#4ade80]" }, "Premier:"),
                                        "Alle som vil kan delta på OPEN CUSTOMS, men for å vinne premier MÅ du ha meldt deg inn i FjOlsenbanden!"),
                                    React.createElement("p", { className: "rounded-xl border border-white/10 bg-[#131f3f]/80 p-3" },
                                        React.createElement("span", { className: "block text-xs font-semibold uppercase tracking-wide text-[#facc15]" }, "Ingen mobbing/trakassering!"),
                                        "Enhver form for mobbing, trakassering eller hatefulle ytringer er strengt forbudt. Gjentagelser vil føre til utestengelse fra FjOlsenbanden!"),
                                    React.createElement("p", { className: "rounded-xl border border-white/10 bg-[#131f3f]/80 p-3" },
                                        React.createElement("span", { className: "block text-xs font-semibold uppercase tracking-wide text-[#13A0F9]" }, "Ha det gøy, stay positive:"),
                                        "Viktigst av alt, ha det gøy og nyt den positive spillopplevelsen vi skaper sammen! Hold chatten positiv og behandle alle i chatten inkludert moderatorer, med respekt."))))),
                    React.createElement("div", { className: "space-y-6 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_48px_rgba(6,14,35,0.45)] sm:p-8" },
                        React.createElement("div", { className: "grid gap-4 sm:grid-cols-3" }, stats.map((stat) => (React.createElement("div", { key: stat.label, className: "rounded-2xl border border-white/10 bg-[#0b1b4d]/70 p-4 text-center" },
                            React.createElement("p", { className: "text-2xl font-bold text-cyan-300" }, stat.value),
                            React.createElement("p", { className: "text-xs font-medium uppercase tracking-wide text-slate-300" }, stat.label))))),
                        React.createElement("div", { className: "rounded-3xl border border-white/10 bg-[#071d6f]/80 p-6 shadow-[0_18px_42px_rgba(12,21,45,0.45)]" },
                            React.createElement("h3", { className: "text-base font-semibold uppercase tracking-[0.25em] text-white/80" }, "F\u00F8lg oss"),
                            React.createElement("div", { className: "mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-5" }, socialLinks.map((link) => (React.createElement("a", { key: link.label, href: link.href, className: "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/20 sm:justify-start", rel: "noreferrer", target: "_blank" },
                                link.icon,
                                React.createElement("span", null, link.label)))))),
                        React.createElement("a", { href: "#bli-medlem", className: "fj-ring-offset inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_36px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" }, "Bli med i communityet", React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" }))))),
            partnersEnabled ? renderPartnerSection("samarbeid", "partners", { includeLogosId: true, variant: "showcase" }) : null,
            React.createElement("section", { id: "tilbud", className: "mt-20 px-6 sm:px-8 lg:px-10", style: sectionOrderStyle("offerings") },
                React.createElement("div", { className: "mx-auto max-w-6xl space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-[0_24px_48px_rgba(6,14,35,0.45)] sm:p-8 lg:p-10" },
                    React.createElement("div", { className: "space-y-3" },
                        React.createElement("h2", { className: "text-3xl font-bold text-white" }, "Andre tilbud"),
                        React.createElement("p", { className: "text-lg text-zinc-100" }, "FjOlsenbanden tilbyr mer enn bare streaming!")),
                    React.createElement("div", { className: "grid gap-6 text-left sm:grid-cols-2 md:gap-8 lg:gap-10" }, offerings.map(({ title, description, emoji }) => title === "Unboxing" ? (React.createElement(UnboxingOfferingCard, { key: title, title: title, description: description, emoji: emoji, onWatchVideo: () => setShowUnboxingVideo(true), reachLabel: estimatedUnboxingReach, audienceStats: stats })) : (React.createElement(OfferingCard, { key: title, title: title, description: description, emoji: emoji })))))),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("a", { href: "#kontakt", className: "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_36px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                            "Kontakt oss",
                            React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })),
                        React.createElement("p", { className: "text-sm text-zinc-100" }, "Ta kontakt hvis du ønsker mer informasjon eller vil booke en økt."))),
            contactForm ? (React.createElement("section", { id: "kontakt", className: "mt-20 px-6 sm:px-8 lg:px-10", style: sectionOrderStyle("contact") },
                React.createElement("div", { className: "mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/10 bg-[#161f33]/90 p-6 text-center shadow-2xl sm:p-8" },
                    React.createElement("h2", { className: "text-3xl font-bold" }, "Kontakt oss"),
                    React.createElement("p", { className: "text-zinc-100" }, "Har du spørsmål om medlemskap, samarbeid eller events? Send oss en melding så kommer vi tilbake til deg."),
                    React.createElement("div", { className: "flex justify-center" },
                        React.createElement("a", {
                            href: "/admin",
                            className: "inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white",
                        },
                            React.createElement(UserCog, { className: "h-4 w-4", "aria-hidden": "true" }),
                            React.createElement("span", null, "CTO"))),
                    React.createElement("form", { className: "grid gap-4 text-left md:grid-cols-2", onSubmit: handleContactSubmit },
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-sm font-semibold text-zinc-100", htmlFor: "name" }, "Navn"),
                            React.createElement("input", { id: "name", name: "name", type: "text", required: true, className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-sm font-semibold text-zinc-100", htmlFor: "email" }, "E-post"),
                            React.createElement("input", { id: "email", name: "email", type: "email", required: true, className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                        React.createElement("div", { className: "md:col-span-2" },
                            React.createElement("label", { className: "mb-1 block text-sm font-semibold text-zinc-100", htmlFor: "message" }, "Melding"),
                            React.createElement("textarea", { id: "message", name: "message", rows: 4, required: true, className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                        React.createElement("div", { className: "md:col-span-2 flex flex-col gap-2 text-sm text-zinc-100 md:flex-row md:items-center md:justify-between" },
                            React.createElement("span", null, "Vi svarer så snart vi kan, som regel innen 1–2 virkedager."),
                            React.createElement(Button, { type: "submit", size: "lg", className: "rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" }, "Send melding")))))) : null,
            React.createElement("section", { id: "tilbakemeldinger", className: "mt-20 px-6 sm:px-8 lg:px-10", style: sectionOrderStyle("feedback") },
                React.createElement("div", { className: "mx-auto max-w-6xl space-y-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-6 text-center shadow-[0_30px_70px_rgba(6,14,35,0.6)] sm:p-8" },
                    React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80" }, "Tusen takk ",
                        React.createElement("span", { "aria-hidden": "true" }, "❤")),
                    React.createElement("h2", { className: "text-3xl font-bold text-white sm:text-4xl" }, "Feedback fra FjOlsenbanden"),
                    React.createElement("p", { className: "mx-auto max-w-3xl text-base text-white/80 sm:text-lg" }, "Her er ekte stemmer fra barn, ungdom og foreldre som har sendt varme ord til FjOlsenbanden. Vi setter enorm pris på alle som deler!"),
                    React.createElement("div", { className: "grid gap-6 text-left md:grid-cols-2" }, feedbackVoices.map(({ id, quote, author, accent }) => (React.createElement("article", { key: id, className: "flex h-full flex-col justify-between gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 text-left shadow-[0_20px_44px_rgba(6,14,35,0.55)]" },
                        React.createElement("p", { className: "text-base font-semibold text-white" }, quote),
                        React.createElement("p", { className: `text-sm font-medium ${accent}` }, author))))) ,
                    React.createElement("div", { className: "flex flex-wrap items-center justify-center gap-4 pt-2" },
                        React.createElement("a", {
                            href: "mailto:kontakt@fjolsenbanden.no",
                            className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF9B6A] to-[#13A0F9] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_36px_rgba(19,160,249,0.35)] transition hover:from-[#FF7AD9] hover:to-[#0d8bd6]",
                        },
                            "Del din tilbakemelding",
                            React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })),
                        React.createElement("a", {
                            href: "#kontakt",
                            className: "inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white/40 hover:text-white",
                        },
                            "Kontakt oss",
                            React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" }))))),
        React.createElement("section", { className: "fj-footer-shell relative mt-20 overflow-hidden px-6 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:px-8 lg:px-10" },
            React.createElement("div", { className: "fj-footer-gradient pointer-events-none absolute inset-x-0 top-0 -z-10 h-full" }),
            React.createElement("footer", { className: "fj-footer-content relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center gap-3 border-t border-white/15 pt-12 text-center text-sm" },
                React.createElement("span", { className: "text-xs font-semibold uppercase tracking-[0.35em] text-[#13A0F9]/80" }, "FjOlsenbanden"),
                React.createElement("div", { className: "flex flex-col items-center justify-center gap-2 text-sm md:flex-row" },
                    React.createElement("span", null, "\u00A9 2025 Fjolsenbanden v/Fair Share Invest AS - Org.nr. 926 963 023. Alle rettigheter reservert."),
                    React.createElement("a", { href: "/admin", className: "flex items-center gap-2 font-medium transition" },
                        React.createElement(UserCog, { className: "h-4 w-4", "aria-hidden": "true" }),
                        React.createElement("span", null, "Admin")))))),
        React.createElement("div", { className: "fj-footer fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#041149]/80 backdrop-blur" },
            React.createElement("div", { className: "mx-auto flex w-full max-w-4xl items-center gap-3 px-4 pb-[calc(0.9rem+env(safe-area-inset-bottom))] pt-3 sm:gap-4" },
                React.createElement("button", { type: "button", onClick: footerMenuOpen ? closeFooterMenu : openFooterMenu, "aria-expanded": footerMenuOpen, "aria-controls": "footer-bottom-sheet", className: "fj-ring-offset inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9]" },
                    footerMenuOpen ? React.createElement(X, { className: "h-5 w-5", "aria-hidden": "true" }) : React.createElement(Menu, { className: "h-5 w-5", "aria-hidden": "true" }),
                    React.createElement("span", null, footerMenuOpen ? "Lukk" : "Meny")),
                React.createElement("a", { href: "#kontakt", onClick: closeFooterMenu, className: "fj-ring-offset inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9] focus-visible:ring-offset-2" },
                    "Kontakt oss",
                    React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })))),
        mobileNavPortal,
        footerMenuPortal,
        registrationOpen ? (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center px-4 py-10" },
            React.createElement("button", { type: "button", "aria-label": "Lukk registrering", onClick: closeRegistration, className: "absolute inset-0 h-full w-full bg-black/70" }),
            React.createElement("div", { className: "relative z-[101] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1733] shadow-[0_32px_80px_rgba(4,8,20,0.7)]" },
                React.createElement("div", { className: "flex items-start justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#13A0F9]" }, "Medlemsregistrering"),
                        React.createElement("h3", { className: "mt-1 text-2xl font-bold text-white" },
                            "Bli med i FjOlsenbanden",
                            selectedTier ? ` – ${selectedTier}` : ""),
                        React.createElement("p", { className: "mt-2 max-w-xl text-sm text-zinc-100" }, "F\u00F8lg Vipps-flyten for \u00E5 aktivere medlemskapet ditt. Vi bruker Vipps Login til \u00E5 hente n\u00F8dvendige opplysninger og s\u00F8rger for trygg foreldre-godkjenning der det trengs.")),
                    React.createElement("button", { type: "button", className: "rounded-full border border-white/20 p-2 text-zinc-100 transition hover:bg-white/10 hover:text-white", onClick: closeRegistration },
                        React.createElement(X, { className: "h-5 w-5" }))),
                React.createElement("div", { className: "space-y-6 px-6 py-6 md:px-8" },
                    React.createElement("div", { className: "space-y-4 rounded-3xl border border-white/15 bg-[#131f3f]/80 p-5 shadow-inner" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-white" }, "1"),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "Vipps Login f\u00F8rst"),
                                React.createElement("p", { className: "text-xs text-zinc-100" }, "Autentiser medlemmet og hent navn, f\u00F8dselsdato, telefon og e-post sikkert via Vipps Login API."))),
                        !vippsLoggedIn ? (React.createElement(Button, { type: "button", size: "lg", className: "flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5B24] font-semibold text-white shadow-[0_16px_34px_rgba(255,91,36,0.35)] transition hover:bg-[#ff6f40]", onClick: handleVippsLogin },
                            React.createElement(Lock, { className: "h-4 w-4" }),
                            " Logg inn med Vipps")) : (React.createElement("form", { className: "grid gap-4 md:grid-cols-2", onSubmit: handleVippsDetailsSubmit },
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-name" }, "Navn"),
                                React.createElement("input", { id: "vipps-name", name: "vipps-name", type: "text", value: vippsDraft.name, onChange: (event) => handleVippsDraftChange(event, "name"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-dob" }, "F\u00F8dselsdato"),
                                React.createElement("input", { id: "vipps-dob", name: "vipps-dob", type: "date", value: vippsDraft.dateOfBirth, onChange: (event) => handleVippsDraftChange(event, "dateOfBirth"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-phone" }, "Telefon"),
                                React.createElement("input", { id: "vipps-phone", name: "vipps-phone", type: "tel", value: vippsDraft.phoneNumber, onChange: (event) => handleVippsDraftChange(event, "phoneNumber"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-email" }, "E-post"),
                                React.createElement("input", { id: "vipps-email", name: "vipps-email", type: "email", value: vippsDraft.email, onChange: (event) => handleVippsDraftChange(event, "email"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", { className: "md:col-span-2 flex flex-col gap-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-100" },
                                React.createElement("div", { className: "flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-100" },
                                    React.createElement(ShieldCheck, { className: "h-4 w-4 text-[#13A0F9]" }),
                                    " Data mottatt fra Vipps"),
                                React.createElement("p", null, "N\u00E5r du bekrefter opplysningene, bruker vi f\u00F8dselsdatoen til \u00E5 styre riktig l\u00F8p for foreldre-godkjenning eller betaling.")),
                            React.createElement("div", { className: "md:col-span-2 flex flex-col gap-2 text-sm text-zinc-100 md:flex-row md:items-center md:justify-between" },
                                React.createElement("span", null,
                                    "Bekreft og g\u00E5 videre til neste steg",
                                    resolvedAge ? ` – alder ${resolvedAge} år` : "",
                                    "."),
                                React.createElement(Button, { type: "submit", className: "flex items-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                                    "Fortsett",
                                    React.createElement(ArrowRight, { className: "h-4 w-4" })))))),
                    vippsUser && vippsFlow === "minor" ? (React.createElement("div", { className: "space-y-4 rounded-3xl border border-white/15 bg-[#101b35]/80 p-5" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#FF2F9C] to-[#13A0F9] text-white" }, "2"),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "Foreldre-godkjenning i Vipps"),
                                React.createElement("p", { className: "text-xs text-zinc-100" }, "Spilleren er under 18 \u00E5r. Send Vipps-foresp\u00F8rselen til foresatte f\u00F8r registreringen fullf\u00F8res."))),
                        !approvalSent ? (React.createElement("form", { className: "space-y-4", onSubmit: handleGuardianSubmit },
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "guardian-phone" }, "Forelder/verge sitt Vipps-nummer"),
                                React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row" },
                                    React.createElement("input", { id: "guardian-phone", name: "guardian-phone", type: "tel", value: parentPhone, onChange: (event) => setParentPhone(event.currentTarget.value), placeholder: "+47 400 00 000", className: "flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true }),
                                    React.createElement(Button, { type: "submit", className: "flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                                        "Send foresp\u00F8rsel",
                                        React.createElement(Phone, { className: "h-4 w-4" })))),
                            React.createElement("p", { className: "text-xs text-zinc-100" }, "Systemet oppretter en Vipps Payment-foresp\u00F8rsel til foresatte. N\u00E5r betalingen eller samtykket bekreftes via callback-URLen, l\u00E5ses medlemskapet opp."))) : (React.createElement("div", { className: "space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-100" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[#4ade80]" },
                                React.createElement(CheckCircle2, { className: "h-5 w-5" }),
                                " Foresp\u00F8rsel sendt til ",
                                parentPhone || "forelder"),
                            React.createElement("p", null, "N\u00E5r foresatte godkjenner i Vipps, aktiveres medlemskapet automatisk. Gi beskjed hvis du ikke f\u00E5r svar i l\u00F8pet av f\u00E5 minutter."))))) : null,
                    vippsUser && vippsFlow === "adult" ? (React.createElement("div", { className: "space-y-4 rounded-3xl border border-white/15 bg-[#101b35]/80 p-5" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#FF2F9C] to-[#13A0F9] text-white" }, "2"),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "Vipps Checkout"),
                                React.createElement("p", { className: "text-xs text-zinc-100" }, "Voksne medlemmer g\u00E5r direkte til betaling. Vipps bekrefter bel\u00F8pet og returnerer status til backend."))),
                        !paymentInitiated ? (React.createElement(Button, { type: "button", className: "flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 font-semibold text-white shadow-[0_18px_36px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]", onClick: handleAdultCheckout },
                            "Start betaling i Vipps",
                            React.createElement(CreditCard, { className: "h-4 w-4" }))) : (React.createElement("div", { className: "space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-100" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[#4ade80]" },
                                React.createElement(CheckCircle2, { className: "h-5 w-5" }),
                                " Vipps-betaling bekreftet"),
                            React.createElement("p", null, "Kvitteringen er sendt til backend via callback. Du er klar til \u00E5 fullf\u00F8re registreringen og f\u00E5 tilgang til medlemsfordelene."))))) : null,
                    showProfileForm ? (React.createElement("div", { className: "space-y-4 rounded-3xl border border-[#13A0F9]/40 bg-[#0f1a32]/90 p-5" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-white" }, "3"),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "Fullf\u00F8r registrering"),
                                React.createElement("p", { className: "text-xs text-zinc-100" }, "Suppler profilfeltene vi trenger ut over Vipps-data, og bekreft n\u00F8dvendige samtykker."))),
                        profileSubmitted ? (React.createElement("div", { className: "space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-100" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[#4ade80]" },
                                React.createElement(CheckCircle2, { className: "h-5 w-5" }),
                                " Profilen er lagret"),
                            React.createElement("p", null,
                                "Takk! Vi har registrert valgene dine og kan aktivere medlemskapet. Vipps-ID ",
                                vippsUser.phoneNumber,
                                " er knyttet til denne profilen."))) : (React.createElement("form", { className: "space-y-6", onSubmit: handleProfileSubmit },
                            React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-first-name" }, "Fornavn"),
                                    React.createElement("input", { id: "vipps-first-name", name: "vipps-first-name", value: firstName, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-last-name" }, "Etternavn"),
                                    React.createElement("input", { id: "vipps-last-name", name: "vipps-last-name", value: lastName, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-email-confirm" }, "E-post"),
                                    React.createElement("input", { id: "vipps-email-confirm", name: "vipps-email-confirm", type: "email", value: vippsUser.email, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-phone-confirm" }, "Mobil"),
                                    React.createElement("input", { id: "vipps-phone-confirm", name: "vipps-phone-confirm", type: "tel", value: vippsUser.phoneNumber, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", { className: "md:col-span-2 md:max-w-xs" },
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "vipps-dob-confirm" }, "F\u00F8dselsdato"),
                                    React.createElement("input", { id: "vipps-dob-confirm", name: "vipps-dob-confirm", type: "date", value: vippsUser.dateOfBirth, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", { className: "md:col-span-2 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-zinc-100" },
                                    React.createElement(ShieldCheck, { className: "h-4 w-4 text-[#13A0F9]" }),
                                    "Data hentet automatisk via Vipps Login")),
                            React.createElement("div", { className: "space-y-4" },
                                React.createElement("h4", { className: "text-xs font-semibold uppercase tracking-wide text-zinc-100" }, "Profilfelt (valgfritt)"),
                                React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "profile-twitch" }, "Twitch-brukernavn"),
                                        React.createElement("input", { id: "profile-twitch", name: "profile-twitch", placeholder: "fjolsenFN", value: profileDraft.twitch, onChange: (event) => handleProfileFieldChange(event, "twitch"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "profile-youtube" }, "YouTube-kanal / URL"),
                                        React.createElement("input", { id: "profile-youtube", name: "profile-youtube", type: "url", placeholder: "https://youtube.com/@...", value: profileDraft.youtube, onChange: (event) => handleProfileFieldChange(event, "youtube"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "profile-tiktok" }, "TikTok-brukernavn"),
                                        React.createElement("input", { id: "profile-tiktok", name: "profile-tiktok", placeholder: "@fjolsen", value: profileDraft.tiktok, onChange: (event) => handleProfileFieldChange(event, "tiktok"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "profile-discord" }, "Discord-tag"),
                                        React.createElement("input", { id: "profile-discord", name: "profile-discord", placeholder: "@brukernavn", value: profileDraft.discord, onChange: (event) => handleProfileFieldChange(event, "discord"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", { className: "md:col-span-2" },
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "profile-gamertag" }, "Epic / PSN / Xbox gamertag"),
                                        React.createElement("input", { id: "profile-gamertag", name: "profile-gamertag", placeholder: "Spillernavn", value: profileDraft.gamertag, onChange: (event) => handleProfileFieldChange(event, "gamertag"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })))),
                            React.createElement("div", { className: "space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4" },
                                React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-zinc-100" }, "Favorittspill"),
                                React.createElement("div", { className: "grid gap-2 sm:grid-cols-2" }, favoriteGameOptions.map((game) => (React.createElement("label", { key: game, className: "flex items-center gap-2 text-sm text-zinc-100" },
                                    React.createElement("input", { type: "checkbox", name: "favorite-games", value: game, checked: profileDraft.favoriteGames.includes(game), onChange: (event) => handleFavoriteGameToggle(event, game), className: "h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                    React.createElement("span", null, game))))),
                                React.createElement("p", { className: "text-xs text-zinc-100" }, "Velg spillene du helst vil representere i turneringer og innhold.")),
                            React.createElement("label", { className: "flex items-start gap-3 text-sm text-zinc-100" },
                                React.createElement("input", { type: "checkbox", name: "profile-leaderboard", checked: profileDraft.showOnLeaderboards, onChange: (event) => handleProfileCheckboxChange(event, "showOnLeaderboards"), className: "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                React.createElement("span", null, "Vis brukernavn i leaderboard og klipp")),
                            isMinor ? (React.createElement("div", { className: "space-y-4 rounded-2xl border border-white/15 bg-white/5 p-4" },
                                React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-zinc-100" }, "Foreldresamtykke"),
                                React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "guardian-name" }, "Forelders navn"),
                                        React.createElement("input", { id: "guardian-name", name: "guardian-name", required: true, placeholder: "Navn p\u00E5 forelder/verge", value: profileDraft.parentName, onChange: (event) => handleProfileFieldChange(event, "parentName"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "guardian-phone-confirm" }, "Forelders mobil (Vipps)"),
                                        React.createElement("input", { id: "guardian-phone-confirm", name: "guardian-phone-confirm", required: true, inputMode: "tel", pattern: "^\\d{8}$", placeholder: "8 sifre", value: profileDraft.parentPhone, onChange: (event) => handleProfileFieldChange(event, "parentPhone"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                        React.createElement("p", { className: "mt-1 text-xs text-zinc-100" }, "Nummeret m\u00E5 matche Vipps-foresp\u00F8rselen som ble sendt.")),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "guardian-address" }, "Adresse (valgfritt)"),
                                        React.createElement("input", { id: "guardian-address", name: "guardian-address", placeholder: "Gateadresse", value: profileDraft.address, onChange: (event) => handleProfileFieldChange(event, "address"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-100", htmlFor: "guardian-postal" }, "Postnummer (valgfritt)"),
                                        React.createElement("input", { id: "guardian-postal", name: "guardian-postal", inputMode: "numeric", pattern: "^\\d{4}$", placeholder: "0000", value: profileDraft.postalCode, onChange: (event) => handleProfileFieldChange(event, "postalCode"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }))),
                                React.createElement("label", { className: "flex items-start gap-3 text-sm text-zinc-100" },
                                    React.createElement("input", { type: "checkbox", name: "guardian-consent", required: true, checked: profileDraft.parentConsent, onChange: (event) => handleProfileCheckboxChange(event, "parentConsent"), className: "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                    React.createElement("span", null, "Jeg er forelder/verge og godkjenner medlemskap/abonnement")))) : null,
                            React.createElement("div", { className: "space-y-3 text-sm text-zinc-100" },
                                React.createElement("label", { className: "flex items-start gap-3" },
                                    React.createElement("input", { type: "checkbox", name: "profile-privacy", required: true, checked: profileDraft.acceptPrivacy, onChange: (event) => handleProfileCheckboxChange(event, "acceptPrivacy"), className: "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                    React.createElement("span", null,
                                        "Jeg samtykker til behandling av data iht. ",
                                        React.createElement("a", { className: "text-[#13A0F9] underline", href: "/personvern", target: "_blank", rel: "noopener noreferrer" }, "personvernerkl\u00E6ringen"))),
                                React.createElement("label", { className: "flex items-start gap-3" },
                                    React.createElement("input", { type: "checkbox", name: "profile-rules", required: true, checked: profileDraft.acceptRules, onChange: (event) => handleProfileCheckboxChange(event, "acceptRules"), className: "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                    React.createElement("span", null,
                                        "Jeg godtar ",
                                        React.createElement("a", { className: "text-[#13A0F9] underline", href: "/konkurranseregler", target: "_blank", rel: "noopener noreferrer" }, "konkurranseregler og premier-vilk\u00E5r")))),
                            React.createElement(Button, { type: "submit", className: "flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                                "Lagre profil",
                                React.createElement(ArrowRight, { className: "h-4 w-4" })))))) : null)))) : null));
}
function DiscordIcon({ className, ...props }) {
    return (React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", className: className, fill: "currentColor", ...props },
        React.createElement("path", { d: "M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.163-.407-.415-.874-.626-1.249a.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.028C2.205 9.045 1.588 13.58 2.014 18.059a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.047.079.079 0 0 0 .084-.028c.461-.63.873-1.295 1.226-1.994a.077.077 0 0 0-.041-.105c-.652-.247-1.273-.549-1.872-.892a.078.078 0 0 1-.008-.13c.125-.094.25-.192.37-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.099.245.198.37.291a.078.078 0 0 1-.008.13 13.09 13.09 0 0 1-1.873.892.077.077 0 0 0-.04.105c.36.699.772 1.364 1.225 1.994a.079.079 0 0 0 .084.028 19.876 19.876 0 0 0 6.002-3.047.077.077 0 0 0 .03-.055c.5-5.177-.838-9.673-3.548-13.662a.061.061 0 0 0-.031-.028Zm-12.052 9.91c-1.18 0-2.158-1.085-2.158-2.419 0-1.333.955-2.418 2.158-2.418 1.213 0 2.182 1.095 2.158 2.418-.001 1.334-.955 2.419-2.158 2.419Zm7.472 0c-1.18 0-2.158-1.085-2.158-2.419 0-1.333.955-2.418 2.158-2.418 1.213 0 2.182 1.095 2.158 2.418 0 1.334-.945 2.419-2.158 2.419Z" })));
}
function PlatformButton({ icon, label, href }) {
    return (React.createElement("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80 transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9] sm:justify-start sm:text-xs sm:tracking-[0.3em] active:scale-95" },
        React.createElement("span", { className: "text-white/90" }, icon),
        React.createElement("span", null, label)));
}
function MembershipCard({ title, price, color, features, onSelect, }) {
    const colorClass = (tierColor) => {
        switch (tierColor) {
            case "green":
                return "border-green-400/40 ring-green-400/50";
            case "cyan":
                return "border-cyan-400/40 ring-cyan-400/50";
            case "amber":
                return "border-amber-400/40 ring-amber-400/50";
            default:
                return "";
        }
    };
    return (React.createElement(Card, { className: `rounded-2xl border bg-[#1f2940] shadow-lg transition-transform hover:-translate-y-1 ${colorClass(color)}` },
        React.createElement(CardHeader, null,
            React.createElement(CardTitle, { className: "flex items-center gap-2 text-white" },
                React.createElement(Gift, { className: "h-6 w-6" }),
                " ",
                title)),
        React.createElement(CardContent, { className: "space-y-4" },
            React.createElement("div", { className: "text-3xl font-bold text-white" }, price),
            React.createElement("ul", { className: "space-y-2 text-sm text-zinc-100" }, features.map((feature) => (React.createElement("li", { key: feature, className: "flex items-center gap-2" },
                React.createElement(Trophy, { className: "h-4 w-4 text-[#13A0F9]" }),
                " ",
                feature)))),
            React.createElement(Button, { size: "lg", className: "w-full rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]", type: "button", onClick: () => onSelect(title) }, "Velg"))));
}
function VideoLightbox({ videoUrl, onClose, title, }) {
    return (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-10", role: "dialog", "aria-modal": "true", "aria-label": title, onClick: onClose },
        React.createElement("div", { className: "relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b163f] shadow-[0_24px_48px_rgba(6,14,35,0.7)]", onClick: (event) => event.stopPropagation() },
            React.createElement("button", { type: "button", onClick: onClose, className: "absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A0F9]", "aria-label": "Lukk video" },
                React.createElement(X, { className: "h-5 w-5" })),
            React.createElement("div", { className: "aspect-video w-full bg-black" },
                React.createElement("iframe", { src: videoUrl, title: title, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true, className: "h-full w-full" })),
            React.createElement("div", { className: "space-y-2 border-t border-white/10 bg-black/30 p-6 text-left" },
                React.createElement("h3", { className: "text-lg font-semibold text-white" }, title),
                React.createElement("p", { className: "text-sm text-zinc-100" }, "Videoen viser hvordan vi pakker ut, iscenesetter og presenterer produkter slik at f\u00F8lgerne v\u00E5re f\u00E5r lyst til \u00E5 kj\u00F8pe dem.")))));
}
function OfferingIcon({ icon, }) {
    if (typeof icon === "string") {
        return (React.createElement("span", { className: "shrink-0 text-2xl leading-none text-white", "aria-hidden": "true" }, icon));
    }
    return icon;
}
function UnboxingOfferingCard({ title, description, emoji, onWatchVideo, reachLabel, audienceStats, }) {
    return (React.createElement("div", { className: "flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#161f33] via-[#101a33] to-[#0a1329] p-6 shadow-[0_20px_36px_rgba(6,14,35,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF2F9C]/40 hover:shadow-[0_28px_56px_rgba(255,47,156,0.35)]" },
        React.createElement("div", { className: "flex items-center gap-3" },
            React.createElement(OfferingIcon, { icon: emoji }),
            React.createElement("div", null,
                React.createElement("h3", { className: "text-xl font-semibold text-white" }, title),
                React.createElement("p", { className: "text-sm text-zinc-100" }, description))),
        React.createElement("div", { className: "space-y-4 rounded-2xl border border-pink-400/30 bg-pink-500/10 p-5 text-left text-pink-100/90" },
            React.createElement("p", { className: "text-base font-semibold text-white" },
                "\uD83C\uDFAF Potensiell rekkevidde: ",
                React.createElement("span", { className: "text-2xl text-[#FFB7E5]" },
                    reachLabel,
                    "+"),
                " kj\u00F8psvillige f\u00F8lgere ser oss hver uke."),
            React.createElement("p", { className: "text-sm text-pink-100/80" }, "Vi aktiverer communityet p\u00E5 tvers av plattformene v\u00E5re, slik at produktet ditt f\u00E5r b\u00E5de hype og salgsmuligheter allerede f\u00F8rste dag."),
            React.createElement("div", { className: "grid gap-3 sm:grid-cols-3" }, audienceStats.map((stat) => (React.createElement("div", { key: stat.label, className: "rounded-xl bg-black/30 px-4 py-3 text-center text-xs uppercase tracking-wide text-pink-100/80" },
                React.createElement("p", { className: "text-lg font-semibold text-white" }, stat.value),
                React.createElement("p", null, stat.label)))))),
        React.createElement(Button, { size: "lg", className: "rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]", onClick: onWatchVideo }, "Se unboxing-eksempel"),
        React.createElement("p", { className: "text-xs text-zinc-100" }, "Trykk p\u00E5 knappen for \u00E5 se en full unboxing-produksjon slik samarbeidspartnerne v\u00E5re f\u00E5r den levert.")));
}
function OfferingCard({ title, description, emoji, }) {
    return (React.createElement("div", { className: "flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#101a33]/80 p-6 shadow-[0_16px_32px_rgba(6,14,35,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#13A0F9]/40 hover:shadow-[0_24px_48px_rgba(19,160,249,0.35)]" },
        React.createElement("div", { className: "flex items-center gap-3" },
            React.createElement(OfferingIcon, { icon: emoji }),
            React.createElement("h3", { className: "text-xl font-semibold text-white" }, title)),
        React.createElement("p", { className: "text-sm leading-relaxed text-zinc-100" }, description)));
}
