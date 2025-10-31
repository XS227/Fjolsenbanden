"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Box, CalendarDays, CheckCircle2, CreditCard, Gift, GraduationCap, Instagram, Lock, Megaphone, Menu, MessageCircle, Mic, Phone, Rocket, ShieldCheck, Smartphone, Sparkles, Trophy, Twitch, Users, Video, X, Youtube, UserCog, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_SECTION_ORDER, DEFAULT_SITE_MODULES, DEFAULT_TWITCH_EMBED_URL, useAdminState, } from "@/lib/admin-state";
const navLinks = [
    { name: "Hjem", href: "#" },
    { name: "Live", href: "#live" },
    { name: "Medlemskap", href: "#medlemskap" },
    { name: "Premier", href: "#premier" },
    { name: "Samarbeid", href: "#sponsorer" },
    { name: "Kontakt", href: "#kontakt" },
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
        label: "Instagram",
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
const offerCards = [
    {
        icon: React.createElement(Megaphone, { className: "h-6 w-6 text-cyan-300", "aria-hidden": "true" }),
        title: "Foredrag",
        description: "FjOlsen besøker skoler, idrettslag og e-sportklubber for å snakke om streaming, gaming-kultur og nettvett.",
    },
    {
        icon: React.createElement(Trophy, { className: "h-6 w-6 text-emerald-300", "aria-hidden": "true" }),
        title: "Events",
        description: "Vi arrangerer gaming-konkurranser for bedrifter, skoler og klubber – både digitalt og fysisk.",
    },
    {
        icon: React.createElement(Sparkles, { className: "h-6 w-6 text-pink-300", "aria-hidden": "true" }),
        title: "Unboxing",
        description: "Profesjonelle unboxing-videoer som kan brukes i markedsføring og deles med communityet vårt.",
    },
    {
        icon: React.createElement(Rocket, { className: "h-6 w-6 text-purple-300", "aria-hidden": "true" }),
        title: "Streamer for hire",
        description: "Co-streams, produktlanseringer og kampanjer der FjOlsen løfter budskapet ditt til tusenvis av følgere.",
    },
    {
        icon: React.createElement(Users, { className: "h-6 w-6 text-sky-300", "aria-hidden": "true" }),
        title: "Fortnite Coaching",
        description: "1-til-1 coaching med Norges dyktigste Fortnite-spillere – fokus på strategi, samarbeid og trygg nettkultur.",
    },
];
const PARTNER_LOGO_BASE_URLS = [
    "https://fjolsenbanden.setaei.com/Images",
    "http://fjolsenbanden.setaei.com/Images",
];
const sponsors = [
    {
        name: "Lenovo",
        slug: "lenovo",
        remoteFileNames: [
            "lenova1.jpg",
            "Lenova1.jpg",
            "Lenovo1.jpg",
            "lenovo1.jpg",
            "Lenovo.svg",
            "lenovo.svg",
            "Lenovo.png",
            "lenovo.png",
        ],
    },
    {
        name: "Samsung",
        slug: "samsung",
        remoteFileNames: [
            "samsung1.jpg",
            "Samsung1.jpg",
            "Samsung.svg",
            "samsung.svg",
            "Samsung.png",
            "samsung.png",
        ],
    },
    {
        name: "Philips",
        slug: "philips",
        remoteFileNames: ["Philips.svg", "philips.svg", "Philips.png", "philips.png"],
    },
    {
        name: "Komplett.no",
        slug: "komplett",
        remoteFileNames: [
            "komplett1.jpg",
            "Komplett1.jpg",
            "Komplett.svg",
            "komplett.svg",
            "Komplett.png",
            "komplett.png",
            "Komplett-no.png",
            "komplett-no.png",
        ],
    },
];
const buildSponsorLogoSources = (sponsor) => [
    ...PARTNER_LOGO_BASE_URLS.flatMap((baseUrl) => sponsor.remoteFileNames.map((fileName) => `${baseUrl}/${fileName}`)),
    `/assets/partners/${sponsor.slug}.svg`,
];
const SponsorLogoCard = ({ sponsor, label, className = "", imgClassName = "h-full w-full object-contain filter brightness-0 invert", }) => {
    const [sourceIndex, setSourceIndex] = useState(0);
    const sources = useMemo(() => buildSponsorLogoSources(sponsor), [sponsor]);
    const safeIndex = Math.min(sourceIndex, sources.length - 1);
    const currentSource = sources[Math.max(0, safeIndex)];
    return (React.createElement("div", { className: `flex h-20 w-40 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_12px_24px_rgba(8,18,40,0.35)] transition hover:bg-white/10 ${className}`.trim() },
        React.createElement("img", { src: currentSource, alt: label !== null && label !== void 0 ? label : sponsor.name, className: imgClassName, loading: "lazy", onError: () => setSourceIndex((previous) => {
                const nextIndex = previous + 1;
                return nextIndex < sources.length ? nextIndex : previous;
            }) })));
};
function PartnerLogoTile({ partner, fallback, variant = "compact", }) {
    const sizeClasses = variant === "large"
        ? "h-24 w-48 p-5"
        : "h-20 w-full px-4 py-3";
    if (partner.logoUrl) {
        return (React.createElement("div", { className: `flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_24px_rgba(8,18,40,0.35)] transition hover:bg-white/10 ${sizeClasses}`.trim() },
            React.createElement("img", { src: partner.logoUrl, alt: partner.name, className: "h-full w-full object-contain", loading: "lazy" })));
    }
    if (fallback) {
        return (React.createElement(SponsorLogoCard, { sponsor: fallback, label: partner.name, className: sizeClasses, imgClassName: "h-full w-full object-contain filter brightness-0 invert" }));
    }
    return (React.createElement("div", { className: `flex items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 text-center text-sm font-semibold text-slate-200 shadow-[0_12px_24px_rgba(8,18,40,0.35)] ${sizeClasses}`.trim() }, partner.name));
}
const unboxingVideoUrl = "https://www.youtube.com/embed/v_8kKWD0K84?si=KzawWGqmMEQA7n78";
const offerings = [
    {
        title: "Foredrag",
        description: "FjOlsen besøker skoler, idrettslag og e-sportklubber for å snakke om streaming, gaming-kultur og nettvett.",
        Icon: Mic,
    },
    {
        title: "Events",
        description: "Vi arrangerer gaming-konkurranser for bedrifter, skoler og klubber – både digitalt og fysisk.",
        Icon: CalendarDays,
    },
    {
        title: "Unboxing",
        description: "FjOlsen lager profesjonelle unboxing-videoer av dine produkter som kan brukes i deres markedsføring og deles med vårt community.",
        Icon: Box,
    },
    {
        title: "Streamer for hire",
        description: "Ønsker du at FjOlsen skal streame på vegne av din merkevare? Han er tilgjengelig for co-streams, produktlanseringer og kampanjer – der ditt budskap blir formidlet på en autentisk og engasjerende måte til tusenvis av følgere.",
        Icon: Video,
    },
    {
        title: "Coaching",
        description: "I FjOlsenbanden finner du flere av Norges dyktigste Fortnite-spillere. Sammen tilbyr vi 1-til-1 coaching for barn og unge som ønsker å utvikle seg som spillere – med fokus på strategi, samarbeid, kommunikasjon og trygg nettkultur. Ta kontakt hvis du ønsker mer informasjon eller vil booke en økt.",
        Icon: GraduationCap,
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
const demoChat = [
    { user: "Lina", message: "Haha, den bossen var vilt!" },
    { user: "Jonas", message: "Gleder meg til premie-trekningen 🔥" },
    { user: "Sara", message: "Hei fra TikTok 😎" },
    { user: "Marius", message: "Bra lyd i dag!" },
];
export default function FjolsenbandenHome() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const [menuOpen, setMenuOpen] = useState(false);
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
    const [showUnboxingVideo, setShowUnboxingVideo] = useState(false);
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
    const heroTitle = ((_a = siteSettings.heroTitle) === null || _a === void 0 ? void 0 : _a.trim()) || "FJOLSENBANDEN";
    const heroTagline = ((_b = siteSettings.heroTagline) === null || _b === void 0 ? void 0 : _b.trim()) ||
        "Spillglede for hele familien – trygge streams, turneringer og premier.";
    const announcement = ((_c = siteSettings.announcement) === null || _c === void 0 ? void 0 : _c.trim()) ||
        "Neste livesending starter 20:00 med co-op i Mario Kart og premier fra Lenovo!";
    const logoUrl = ((_d = siteSettings.logoUrl) === null || _d === void 0 ? void 0 : _d.trim()) || "/assets/logo.svg";
    const presentationVideoUrl = ((_e = siteSettings.presentationVideoUrl) === null || _e === void 0 ? void 0 : _e.trim()) ||
        "https://www.youtube.com/embed/8EgRIkmvmtM?si=qMzmEaMfP-2ODMbc";
    const twitchEmbedUrl = ((_f = siteSettings.twitchEmbedUrl) === null || _f === void 0 ? void 0 : _f.trim()) || DEFAULT_TWITCH_EMBED_URL;
    const membershipTiers = (_g = siteSettings.membershipTiers) !== null && _g !== void 0 ? _g : [];
    const partnerLogos = (_h = siteSettings.partnerLogos) !== null && _h !== void 0 ? _h : [];
    const sponsorFallbackMap = useMemo(() => {
        const map = new Map();
        sponsors.forEach((sponsor) => map.set(sponsor.name.toLowerCase(), sponsor));
        return map;
    }, []);
    const partnerLogoData = useMemo(() => partnerLogos.map((partner) => ({
        partner,
        fallback: sponsorFallbackMap.get(partner.name.toLowerCase()),
    })), [partnerLogos, sponsorFallbackMap]);
    const filteredNavLinks = useMemo(() => navLinks.filter((link) => {
        if (link.href === "#live") {
            return liveStream;
        }
        if (link.href === "#sponsorer" || link.href === "#premier") {
            return partnersEnabled;
        }
        if (link.href === "#kontakt") {
            return contactForm;
        }
        return true;
    }), [contactForm, liveStream, partnersEnabled]);
    const toggleMenu = () => {
        setMenuOpen((previous) => !previous);
    };
    const closeMenu = () => {
        setMenuOpen(false);
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
        if (!menuOpen) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            }
        };
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("resize", handleResize);
        };
    }, [menuOpen]);
    useEffect(() => {
        if (!menuOpen) {
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
    }, [menuOpen]);
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
    return (React.createElement("div", { className: "relative overflow-x-hidden bg-gradient-to-b from-[#131A49] via-[#0B163F] to-[#050B24] text-white" },
        showUnboxingVideo ? (React.createElement(VideoLightbox, { videoUrl: unboxingVideoUrl, onClose: () => setShowUnboxingVideo(false), title: "Se hvordan vi pakker ut og presenterer produkter for communityet" })) : null,
        React.createElement("div", { className: "pointer-events-none fixed inset-0 -z-10 opacity-60", style: {
                background: "radial-gradient(circle at 18% 12%, rgba(19,160,249,0.3), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,47,156,0.18), transparent 50%)",
            } }),
        React.createElement("div", { className: "flex flex-1 flex-col" },
            React.createElement("nav", { className: "relative sticky top-0 z-50 border-b border-white/10 bg-[#050B24]/80 backdrop-blur" },
            React.createElement("div", { className: "mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4" },
                React.createElement("a", { className: "flex items-center gap-3", href: "#", "aria-label": "Fjolsenbanden hjem" },
                    React.createElement("img", { src: logoUrl, alt: `${heroTitle} logo`, className: "h-10 w-10 rounded-xl object-cover" }),
                    React.createElement("span", { className: "hidden text-lg font-semibold sm:block" }, heroTitle)),
                React.createElement("div", { className: "hidden items-center gap-6 md:flex" },
                    React.createElement("ul", { className: "flex items-center gap-6 text-sm font-medium" }, filteredNavLinks.map((link) => (React.createElement("li", { key: link.name },
                        React.createElement("a", { className: "transition-colors duration-150 hover:text-[#13A0F9]", href: link.href }, link.name))))),
                    React.createElement("a", { href: "#bli-medlem", className: "inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/40 hover:bg-white/10" }, "Bli medlem")),
                React.createElement("div", { className: "flex items-center gap-3 md:hidden" },
                    React.createElement("button", { type: "button", onClick: toggleMenu, "aria-expanded": menuOpen, "aria-controls": "mobile-navigation", "aria-label": menuOpen ? "Lukk meny" : "Åpne meny", className: "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40" }, menuOpen ? React.createElement(X, { className: "h-5 w-5", "aria-hidden": "true" }) : React.createElement(Menu, { className: "h-5 w-5", "aria-hidden": "true" })))),
            React.createElement("div", { id: "mobile-navigation", className: `absolute left-0 right-0 top-full z-[60] mt-3 px-6 md:hidden ${menuOpen ? "" : "hidden"}` },
                React.createElement("div", { className: "rounded-2xl border border-white/10 bg-[#101c37] p-4 shadow-[0_18px_42px_rgba(12,21,45,0.45)]" },
                    React.createElement("ul", { className: "flex flex-col gap-2 text-sm font-medium text-white/80" }, filteredNavLinks.map((link) => (React.createElement("li", { key: link.name },
                        React.createElement("a", { className: "block rounded-lg px-4 py-2 transition hover:bg-white/10 hover:text-white", href: link.href, onClick: closeMenu }, link.name))))),
                    React.createElement("a", { href: "#bli-medlem", className: "mt-4 block rounded-full border border-white/20 px-4 py-2 text-center font-semibold text-white transition hover:border-white/40 hover:bg-white/10", onClick: closeMenu }, "Bli medlem")))),
        menuOpen ? (React.createElement("div", { role: "presentation", "aria-hidden": "true", className: "fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-sm md:hidden", onClick: closeMenu })) : null,
        React.createElement("header", { className: "relative z-10 pb-40" },
            React.createElement("section", { id: "community", className: "mt-6 px-6" },
                React.createElement("div", { className: "mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start" },
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("div", { className: "space-y-4 text-center lg:text-left" },
                            React.createElement("h1", { className: "text-4xl font-extrabold sm:text-5xl" },
                                "Velkommen til ",
                                React.createElement("span", { className: "text-[#13A0F9]" }, heroTitle)),
                            React.createElement("p", { className: "text-base text-zinc-300 sm:text-lg" }, heroTagline)),
                        React.createElement("div", { className: "space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_18px_42px_rgba(12,21,45,0.45)]" },
                            React.createElement("h2", { className: "text-xl font-semibold text-[#13A0F9]" }, "\uD83C\uDFAE Hva er FjOlsenbanden?"),
                            React.createElement("p", { className: "text-sm leading-relaxed text-zinc-200 sm:text-base" }, "FjOlsenbanden er et raskt voksende gaming-community med over 2500 medlemmer p\u00E5 Discord, 3200++ f\u00F8lgere p\u00E5 Twitch og 4200+ p\u00E5 TikTok \u2013 b\u00E5de barn, ungdom og foreldre!"),
                            React.createElement("p", { className: "text-sm leading-relaxed text-zinc-200 sm:text-base" },
                                React.createElement("span", { className: "font-semibold text-white" }, "M\u00E5let v\u00E5rt er enkelt:"),
                                React.createElement("br", { className: "hidden sm:block" }),
                                "\u00C5 skape et trygt, positivt og inkluderende milj\u00F8 der alle kan game uten hets, mobbing eller negativ adferd."),
                            React.createElement("p", { className: "text-sm leading-relaxed text-zinc-200 sm:text-base" }, "FjOlsen bruker mange timer hver uke p\u00E5 \u00E5 arrangere konkurranser, turneringer og aktiviteter for medlemmene \u2013 alltid med fellesskap, spilleglede og respekt i sentrum."))),
                    React.createElement("div", { className: "flex w-full max-w-xl flex-col items-center gap-6 lg:items-start" },
                        React.createElement("div", { className: "relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_28px_60px_rgba(7,12,28,0.6)]" },
                            React.createElement("iframe", { className: "aspect-video w-full", width: "560", height: "315", src: presentationVideoUrl, title: "YouTube video player", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true })),
                        React.createElement("div", { className: "w-full rounded-3xl border border-white/10 bg-[#101c37]/80 p-5 shadow-[0_18px_42px_rgba(12,21,45,0.45)]" },
                            React.createElement("div", { className: "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80" },
                                React.createElement(ShieldCheck, { className: "h-4 w-4 text-[#13A0F9]" }),
                                " F\u00F8lg FjOlsenbanden"),
                            React.createElement("div", { className: "flex flex-wrap justify-center gap-2 sm:justify-start" }, platformLinks.map(({ icon, label, href }) => (React.createElement(PlatformButton, { key: label, icon: icon, label: label, href: href })))),
                            React.createElement("p", { className: "mt-3 text-center text-xs text-zinc-400 sm:text-left" }, announcement)))))),
        React.createElement("main", { className: "flex flex-1 flex-col gap-28 pb-16" },
            React.createElement("section", { id: "hva-er", className: "px-6", style: sectionOrderStyle("heroIntro") },
                React.createElement("div", { className: "mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center" },
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("h2", { className: "text-3xl font-bold sm:text-4xl" }, "\uD83C\uDFAE Hva er FjOlsenbanden?"),
                        React.createElement("p", { className: "text-lg text-slate-200" }, "FjOlsenbanden er et raskt voksende gaming-community med over 2\u00A0500 medlemmer p\u00E5 Discord, 3\u00A0200+ f\u00F8lgere p\u00E5 Twitch og 4\u00A0200+ p\u00E5 TikTok. Her m\u00F8tes barn, ungdom og foreldre for \u00E5 game trygt sammen."),
                        React.createElement("p", { className: "text-lg text-slate-200" }, "M\u00E5let v\u00E5rt er enkelt: \u00E5 skape et inkluderende milj\u00F8 der alle kan spille uten hets, mobbing eller negativ adferd. FjOlsen legger ned mange timer hver uke p\u00E5 konkurranser, turneringer og aktiviteter \u2013 alltid med fellesskap og spilleglede i sentrum."),
                        React.createElement("div", { className: "rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg" },
                            React.createElement("p", { className: "text-base text-slate-200" }, "\uD83C\uDFA5 Se videoen til h\u00F8yre for \u00E5 m\u00F8te FjOlsen og bli kjent med communityet!"))),
                    React.createElement("div", { className: "relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl" },
                        React.createElement("iframe", { width: "100%", height: "315", src: "https://www.youtube.com/embed/P01NkLOA39A?si=LYD3IVf5SSZrehsJ", title: "M\u00F8t FjOlsen", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", referrerPolicy: "strict-origin-when-cross-origin", allowFullScreen: true, className: "h-full min-h-[280px] w-full" })))),
            liveStream ? (React.createElement("section", { id: "live", className: "px-6", style: sectionOrderStyle("liveStream") },
                React.createElement("div", { className: "mx-auto grid max-w-6xl gap-12 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-[#121a4b]/80 via-[#10153b]/80 to-[#0c122d]/80 p-12 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]" },
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("h2", { className: "text-3xl font-bold sm:text-4xl" }, "\uD83D\uDCC8 F\u00F8lg FjOlsenbanden"),
                        React.createElement("p", { className: "text-lg text-slate-200" }, "Totalt over 10\u00A0000 f\u00F8lgere p\u00E5 tvers av alle plattformer! Finn oss der du liker \u00E5 se gaming-innhold \u2013 og bli en del av et hyggelig og st\u00F8ttende fellesskap."),
                        React.createElement("div", { className: "grid gap-4 sm:grid-cols-3" }, stats.map((stat) => (React.createElement("div", { key: stat.label, className: "rounded-2xl border border-white/10 bg-white/5 p-4 text-center" },
                            React.createElement("p", { className: "text-2xl font-bold text-cyan-300" }, stat.value),
                            React.createElement("p", { className: "text-sm text-slate-300" }, stat.label))))),
                        React.createElement("div", { className: "flex flex-wrap gap-3" }, socialLinks.map((link) => (React.createElement("a", { key: link.label, href: link.href, className: "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 transition hover:bg-white/20", rel: "noreferrer", target: "_blank" },
                            link.icon,
                            React.createElement("span", null, link.label))))),
                        React.createElement("div", { className: "rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200" }, "\uD83C\uDFA5 Se FjOlsen LIVE! Til venstre: Stream-vindu. Til h\u00F8yre: Chat-feed. \uD83D\uDC49 F\u00F8lg oss her: Discord \u00B7 Twitch \u00B7 YouTube \u00B7 TikTok \u00B7 Instagram")),
                    React.createElement("div", { className: "grid gap-4 lg:grid-cols-2" },
                        React.createElement("div", { className: "relative col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-6" },
                            React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-200" }, "\uD83D\uDD34 Live preview"),
                            React.createElement("p", { className: "mt-4 text-sm text-slate-300" }, "Stream-vindu \u2013 se FjOlsen ta communityet gjennom nye utfordringer og konkurranser."),
                            React.createElement("div", { className: "mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/80" },
                                React.createElement("iframe", { title: "FjOlsenbanden live", src: twitchEmbedUrl, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture", allowFullScreen: true, referrerPolicy: "strict-origin-when-cross-origin", className: "aspect-video w-full" })),
                            React.createElement("p", { className: "mt-3 text-xs text-slate-400" }, "Oppdater lenken i adminpanelet for \u00E5 endre hvilken Twitch-kanal som vises.")),
                        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-black/60 p-6" },
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" }, "Chat"),
                            React.createElement("ul", { className: "mt-4 space-y-3 text-sm text-slate-200" },
                                React.createElement("li", null, "\uD83D\uDCAC Lina: \u00ABHaha, den bossen var vilt!\u00BB"),
                                React.createElement("li", null, "\uD83D\uDCAC Jonas: \u00ABGleder meg til premie-trekningen \uD83D\uDD25\u00BB"),
                                React.createElement("li", null, "\uD83D\uDCAC Sara: \u00ABHei fra TikTok \uD83D\uDE0E\u00BB"),
                                React.createElement("li", null, "\uD83D\uDCAC Marius: \u00ABBra lyd i dag!\u00BB"))),
                        React.createElement("div", { className: "rounded-2xl border border-white/10 bg-black/60 p-6" },
                            React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" }, "Fellesskap"),
                            React.createElement("p", { className: "mt-4 text-sm text-slate-200" }, "Vi holder chatten trygg med dedikerte moderatorer og tydelige regler mot hets, mobbing og negativ adferd.")))))) : null,
            React.createElement("section", { id: "bli-medlem", className: "px-6", style: sectionOrderStyle("heroIntro") },
                React.createElement("div", { className: "mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/5 p-12 shadow-2xl" },
                    React.createElement("h2", { className: "text-3xl font-bold sm:text-4xl" }, "Bli medlem"),
                    React.createElement("p", { className: "mt-4 text-lg text-slate-200" }, "Det er gratis \u00E5 bli medlem i FjOlsenbanden! Alle kan delta i konkurranser, men for \u00E5 vinne premier m\u00E5 du v\u00E6re registrert medlem."),
                    React.createElement("p", { className: "mt-6 text-base text-slate-200 sm:text-lg" }, "Velg alder for \u00E5 bli med:"),
                    React.createElement("div", { className: "mt-6 flex flex-wrap gap-4" },
                        React.createElement("a", { href: "https://forms.gle/sq4mUf7s6e6UY7R58", className: "inline-flex items-center gap-3 rounded-2xl bg-indigo-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(99,102,241,0.45)] transition hover:bg-indigo-400" }, "\uD83D\uDD35 Under 18 \u00E5r"),
                        React.createElement("a", { href: "https://forms.gle/ZrbXCggnUY8FTT7t9", className: "inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.45)] transition hover:bg-emerald-400" }, "\uD83D\uDFE2 Over 18 \u00E5r")))),
            partnersEnabled ? (React.createElement("section", { id: "samarbeid", className: "px-6", style: sectionOrderStyle("partners") },
                React.createElement("div", { className: "mx-auto max-w-6xl space-y-8" },
                    React.createElement("h2", { className: "text-3xl font-bold sm:text-4xl" }, "\uD83E\uDD1D Samarbeidspartnere"),
                    React.createElement("p", { className: "text-lg text-slate-200" }, "Vi har allerede samarbeidet med flere kjente merkevarer \u2013 og vi er alltid p\u00E5 utkikk etter nye partnere som \u00F8nsker synlighet mot et engasjert gaming-publikum."),
                    React.createElement("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4" }, partnerLogoData.map(({ partner, fallback }) => (React.createElement(PartnerLogoTile, { key: partner.id, partner: partner, fallback: fallback, variant: "compact" }))))))) : null,
            liveStream ? (React.createElement("section", { id: "live-chat", className: "px-6", style: sectionOrderStyle("liveStream") },
                React.createElement("div", { className: "mx-auto max-w-6xl" },
                    React.createElement("div", { className: "flex max-h-[640px] flex-col rounded-2xl border border-white/10 bg-[#1f2940] p-4" },
                        React.createElement("h3", { className: "mb-3 flex items-center gap-2 font-semibold text-[#13A0F9]" },
                            React.createElement(MessageCircle, { className: "h-4 w-4" }),
                            " Live chat"),
                        React.createElement("div", { className: "flex-1 space-y-3 overflow-y-auto pr-1 text-sm" }, demoChat.map((chat) => (React.createElement("div", { key: chat.user, className: "rounded-lg bg-white/5 px-3 py-2" },
                            React.createElement("span", { className: "mr-2 font-semibold text-[#13A0F9]" }, chat.user),
                            React.createElement("span", { className: "text-zinc-200" }, chat.message))))),
                        React.createElement("input", { type: "text", placeholder: "Skriv en kommentar...", className: "mt-3 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-zinc-400 outline-none focus:ring-2 focus:ring-[#13A0F9]" }))))) : null,
            React.createElement("section", { id: "medlemskap", className: "mt-20 px-6 text-center", style: sectionOrderStyle("membership") },
                React.createElement("h2", { className: "mb-4 text-3xl font-bold" }, "Velg medlemskap"),
                React.createElement("p", { className: "mx-auto mb-8 max-w-2xl text-zinc-300" }, "Bli med i konkurranser, streams og fellesskapet v\u00E5rt p\u00E5 noen f\u00E5 klikk."),
                React.createElement("div", { className: "mx-auto grid max-w-7xl gap-8 md:grid-cols-3" }, membershipTiers.map((tier) => (React.createElement(MembershipCard, { key: tier.id, title: tier.title, price: tier.price, color: tier.color, features: tier.features, onSelect: openRegistration }))))),
            partnersEnabled ? (React.createElement("section", { id: "premier", className: "mt-20 px-6 text-center", style: sectionOrderStyle("prizes") },
                React.createElement("h2", { className: "mb-4 text-3xl font-bold" }, "Samarbeidspartnere"),
                React.createElement("p", { className: "mx-auto max-w-3xl text-zinc-300" }, "Vi har allerede hatt samarbeid med flere kjente merkevarer."),
                React.createElement("div", { id: "sponsorer", className: "mt-8 flex flex-wrap justify-center gap-6" }, partnerLogoData.map(({ partner, fallback }) => (React.createElement(PartnerLogoTile, { key: `premier-${partner.id}`, partner: partner, fallback: fallback, variant: "large" })))),
                React.createElement("div", { className: "mt-8 space-y-4" },
                    React.createElement("p", { className: "mx-auto max-w-2xl text-zinc-300" }, "\u00D8nsker du \u00E5 synliggj\u00F8re din merkevare for v\u00E5rt engasjerte og voksende gaming-publikum?"),
                    React.createElement("p", { className: "mx-auto max-w-2xl text-zinc-300" }, "Ta kontakt for samarbeid!"),
                    React.createElement("div", { className: "flex justify-center" },
                        React.createElement(Button, { asChild: true, className: "rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-8 py-3 font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                            React.createElement("a", { href: "#kontakt" }, "Kontakt oss")))))) : null,
            React.createElement("section", { id: "tilbud", className: "mt-20 px-6" },
                React.createElement("div", { className: "mx-auto max-w-6xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_48px_rgba(6,14,35,0.45)]" },
                    React.createElement("div", { className: "space-y-3" },
                        React.createElement("h2", { className: "text-3xl font-bold text-white" }, "Andre tilbud"),
                        React.createElement("p", { className: "text-lg text-zinc-200" }, "FjOlsenbanden tilbyr mer enn bare streaming!")),
                    React.createElement("div", { className: "grid gap-6 text-left sm:grid-cols-2" }, offerings.map(({ title, description, Icon }) => title === "Unboxing" ? (React.createElement(UnboxingOfferingCard, { key: title, title: title, description: description, Icon: Icon, onWatchVideo: () => setShowUnboxingVideo(true), reachLabel: estimatedUnboxingReach, audienceStats: stats })) : (React.createElement(OfferingCard, { key: title, title: title, description: description, Icon: Icon })))))),
            contactForm ? (React.createElement("section", { id: "kontakt", className: "mt-20 px-6", style: sectionOrderStyle("contact") },
                React.createElement("div", { className: "mx-auto max-w-5xl space-y-6 rounded-3xl border border-white/10 bg-[#161f33]/90 p-8 text-center shadow-2xl" },
                    React.createElement("h2", { className: "text-3xl font-bold" }, "Kontakt oss"),
                    React.createElement("p", { className: "text-zinc-300" }, "Har du sp\u00F8rsm\u00E5l om medlemskap, samarbeid eller events? Send oss en melding s\u00E5 kommer vi tilbake til deg."),
                    React.createElement("form", { className: "grid gap-4 text-left md:grid-cols-2", onSubmit: handleContactSubmit },
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-sm font-semibold text-zinc-200", htmlFor: "name" }, "Navn"),
                            React.createElement("input", { id: "name", name: "name", type: "text", required: true, className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "mb-1 block text-sm font-semibold text-zinc-200", htmlFor: "email" }, "E-post"),
                            React.createElement("input", { id: "email", name: "email", type: "email", required: true, className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                        React.createElement("div", { className: "md:col-span-2" },
                            React.createElement("label", { className: "mb-1 block text-sm font-semibold text-zinc-200", htmlFor: "message" }, "Melding"),
                            React.createElement("textarea", { id: "message", name: "message", rows: 4, required: true, className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                        React.createElement("div", { className: "md:col-span-2 flex flex-col gap-2 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between" },
                            React.createElement("span", null, "Vi svarer s\u00E5 snart vi kan, som regel innen 1\u20132 virkedager."),
                            React.createElement(Button, { type: "submit", size: "lg", className: "rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_28px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" }, "Send melding")))))) : null)),
        React.createElement("footer", { className: "mt-12 border-t border-white/10 py-8 text-center text-sm text-zinc-500" },
            React.createElement("div", { className: "flex flex-col items-center justify-center gap-2 text-sm md:flex-row" },
                React.createElement("span", null,
                    "\u00A9 ",
                    new Date().getFullYear(),
                    " Fjolsenbanden. Alle rettigheter reservert."),
                React.createElement("a", { href: "/admin", className: "flex items-center gap-2 font-medium text-zinc-300 transition hover:text-white" },
                    React.createElement(UserCog, { className: "h-4 w-4", "aria-hidden": "true" }),
                    React.createElement("span", null, "Admin"))))),
        registrationOpen ? (React.createElement("div", { className: "fixed inset-0 z-[100] flex items-center justify-center px-4 py-10" },
            React.createElement("button", { type: "button", "aria-label": "Lukk registrering", onClick: closeRegistration, className: "absolute inset-0 h-full w-full bg-black/70" }),
            React.createElement("div", { className: "relative z-[101] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d1733] shadow-[0_32px_80px_rgba(4,8,20,0.7)]" },
                React.createElement("div", { className: "flex items-start justify-between gap-4 border-b border-white/10 bg-white/5 px-6 py-5" },
                    React.createElement("div", null,
                        React.createElement("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#13A0F9]" }, "Medlemsregistrering"),
                        React.createElement("h3", { className: "mt-1 text-2xl font-bold text-white" },
                            "Bli med i FjOlsenbanden",
                            selectedTier ? ` – ${selectedTier}` : ""),
                        React.createElement("p", { className: "mt-2 max-w-xl text-sm text-zinc-300" }, "F\u00F8lg Vipps-flyten for \u00E5 aktivere medlemskapet ditt. Vi bruker Vipps Login til \u00E5 hente n\u00F8dvendige opplysninger og s\u00F8rger for trygg foreldre-godkjenning der det trengs.")),
                    React.createElement("button", { type: "button", className: "rounded-full border border-white/20 p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white", onClick: closeRegistration },
                        React.createElement(X, { className: "h-5 w-5" }))),
                React.createElement("div", { className: "space-y-6 px-6 py-6 md:px-8" },
                    React.createElement("div", { className: "space-y-4 rounded-3xl border border-white/15 bg-[#131f3f]/80 p-5 shadow-inner" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-white" }, "1"),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "Vipps Login f\u00F8rst"),
                                React.createElement("p", { className: "text-xs text-zinc-300" }, "Autentiser medlemmet og hent navn, f\u00F8dselsdato, telefon og e-post sikkert via Vipps Login API."))),
                        !vippsLoggedIn ? (React.createElement(Button, { type: "button", size: "lg", className: "flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5B24] font-semibold text-white shadow-[0_16px_34px_rgba(255,91,36,0.35)] transition hover:bg-[#ff6f40]", onClick: handleVippsLogin },
                            React.createElement(Lock, { className: "h-4 w-4" }),
                            " Logg inn med Vipps")) : (React.createElement("form", { className: "grid gap-4 md:grid-cols-2", onSubmit: handleVippsDetailsSubmit },
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-name" }, "Navn"),
                                React.createElement("input", { id: "vipps-name", name: "vipps-name", type: "text", value: vippsDraft.name, onChange: (event) => handleVippsDraftChange(event, "name"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-dob" }, "F\u00F8dselsdato"),
                                React.createElement("input", { id: "vipps-dob", name: "vipps-dob", type: "date", value: vippsDraft.dateOfBirth, onChange: (event) => handleVippsDraftChange(event, "dateOfBirth"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-phone" }, "Telefon"),
                                React.createElement("input", { id: "vipps-phone", name: "vipps-phone", type: "tel", value: vippsDraft.phoneNumber, onChange: (event) => handleVippsDraftChange(event, "phoneNumber"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-email" }, "E-post"),
                                React.createElement("input", { id: "vipps-email", name: "vipps-email", type: "email", value: vippsDraft.email, onChange: (event) => handleVippsDraftChange(event, "email"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true })),
                            React.createElement("div", { className: "md:col-span-2 flex flex-col gap-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200" },
                                React.createElement("div", { className: "flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-400" },
                                    React.createElement(ShieldCheck, { className: "h-4 w-4 text-[#13A0F9]" }),
                                    " Data mottatt fra Vipps"),
                                React.createElement("p", null, "N\u00E5r du bekrefter opplysningene, bruker vi f\u00F8dselsdatoen til \u00E5 styre riktig l\u00F8p for foreldre-godkjenning eller betaling.")),
                            React.createElement("div", { className: "md:col-span-2 flex flex-col gap-2 text-sm text-zinc-300 md:flex-row md:items-center md:justify-between" },
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
                                React.createElement("p", { className: "text-xs text-zinc-300" }, "Spilleren er under 18 \u00E5r. Send Vipps-foresp\u00F8rselen til foresatte f\u00F8r registreringen fullf\u00F8res."))),
                        !approvalSent ? (React.createElement("form", { className: "space-y-4", onSubmit: handleGuardianSubmit },
                            React.createElement("div", null,
                                React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "guardian-phone" }, "Forelder/verge sitt Vipps-nummer"),
                                React.createElement("div", { className: "flex flex-col gap-3 sm:flex-row" },
                                    React.createElement("input", { id: "guardian-phone", name: "guardian-phone", type: "tel", value: parentPhone, onChange: (event) => setParentPhone(event.currentTarget.value), placeholder: "+47 400 00 000", className: "flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]", required: true }),
                                    React.createElement(Button, { type: "submit", className: "flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 font-semibold text-white shadow-[0_16px_32px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                                        "Send foresp\u00F8rsel",
                                        React.createElement(Phone, { className: "h-4 w-4" })))),
                            React.createElement("p", { className: "text-xs text-zinc-400" }, "Systemet oppretter en Vipps Payment-foresp\u00F8rsel til foresatte. N\u00E5r betalingen eller samtykket bekreftes via callback-URLen, l\u00E5ses medlemskapet opp."))) : (React.createElement("div", { className: "space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200" },
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
                                React.createElement("p", { className: "text-xs text-zinc-300" }, "Voksne medlemmer g\u00E5r direkte til betaling. Vipps bekrefter bel\u00F8pet og returnerer status til backend."))),
                        !paymentInitiated ? (React.createElement(Button, { type: "button", className: "flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] px-6 py-3 font-semibold text-white shadow-[0_18px_36px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]", onClick: handleAdultCheckout },
                            "Start betaling i Vipps",
                            React.createElement(CreditCard, { className: "h-4 w-4" }))) : (React.createElement("div", { className: "space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[#4ade80]" },
                                React.createElement(CheckCircle2, { className: "h-5 w-5" }),
                                " Vipps-betaling bekreftet"),
                            React.createElement("p", null, "Kvitteringen er sendt til backend via callback. Du er klar til \u00E5 fullf\u00F8re registreringen og f\u00E5 tilgang til medlemsfordelene."))))) : null,
                    showProfileForm ? (React.createElement("div", { className: "space-y-4 rounded-3xl border border-[#13A0F9]/40 bg-[#0f1a32]/90 p-5" },
                        React.createElement("div", { className: "flex items-center gap-3" },
                            React.createElement("span", { className: "grid h-10 w-10 place-content-center rounded-2xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-white" }, "3"),
                            React.createElement("div", null,
                                React.createElement("p", { className: "text-sm font-semibold text-white" }, "Fullf\u00F8r registrering"),
                                React.createElement("p", { className: "text-xs text-zinc-300" }, "Suppler profilfeltene vi trenger ut over Vipps-data, og bekreft n\u00F8dvendige samtykker."))),
                        profileSubmitted ? (React.createElement("div", { className: "space-y-3 rounded-2xl bg-white/5 p-4 text-sm text-zinc-200" },
                            React.createElement("div", { className: "flex items-center gap-2 text-[#4ade80]" },
                                React.createElement(CheckCircle2, { className: "h-5 w-5" }),
                                " Profilen er lagret"),
                            React.createElement("p", null,
                                "Takk! Vi har registrert valgene dine og kan aktivere medlemskapet. Vipps-ID ",
                                vippsUser.phoneNumber,
                                " er knyttet til denne profilen."))) : (React.createElement("form", { className: "space-y-6", onSubmit: handleProfileSubmit },
                            React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-first-name" }, "Fornavn"),
                                    React.createElement("input", { id: "vipps-first-name", name: "vipps-first-name", value: firstName, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-last-name" }, "Etternavn"),
                                    React.createElement("input", { id: "vipps-last-name", name: "vipps-last-name", value: lastName, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-email-confirm" }, "E-post"),
                                    React.createElement("input", { id: "vipps-email-confirm", name: "vipps-email-confirm", type: "email", value: vippsUser.email, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", null,
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-phone-confirm" }, "Mobil"),
                                    React.createElement("input", { id: "vipps-phone-confirm", name: "vipps-phone-confirm", type: "tel", value: vippsUser.phoneNumber, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", { className: "md:col-span-2 md:max-w-xs" },
                                    React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "vipps-dob-confirm" }, "F\u00F8dselsdato"),
                                    React.createElement("input", { id: "vipps-dob-confirm", name: "vipps-dob-confirm", type: "date", value: vippsUser.dateOfBirth, readOnly: true, "aria-readonly": "true", className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white opacity-90" })),
                                React.createElement("div", { className: "md:col-span-2 flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-xs text-zinc-300" },
                                    React.createElement(ShieldCheck, { className: "h-4 w-4 text-[#13A0F9]" }),
                                    "Data hentet automatisk via Vipps Login")),
                            React.createElement("div", { className: "space-y-4" },
                                React.createElement("h4", { className: "text-xs font-semibold uppercase tracking-wide text-zinc-300" }, "Profilfelt (valgfritt)"),
                                React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "profile-twitch" }, "Twitch-brukernavn"),
                                        React.createElement("input", { id: "profile-twitch", name: "profile-twitch", placeholder: "fjolsenFN", value: profileDraft.twitch, onChange: (event) => handleProfileFieldChange(event, "twitch"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "profile-youtube" }, "YouTube-kanal / URL"),
                                        React.createElement("input", { id: "profile-youtube", name: "profile-youtube", type: "url", placeholder: "https://youtube.com/@...", value: profileDraft.youtube, onChange: (event) => handleProfileFieldChange(event, "youtube"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "profile-tiktok" }, "TikTok-brukernavn"),
                                        React.createElement("input", { id: "profile-tiktok", name: "profile-tiktok", placeholder: "@fjolsen", value: profileDraft.tiktok, onChange: (event) => handleProfileFieldChange(event, "tiktok"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "profile-discord" }, "Discord-tag"),
                                        React.createElement("input", { id: "profile-discord", name: "profile-discord", placeholder: "@brukernavn", value: profileDraft.discord, onChange: (event) => handleProfileFieldChange(event, "discord"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", { className: "md:col-span-2" },
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "profile-gamertag" }, "Epic / PSN / Xbox gamertag"),
                                        React.createElement("input", { id: "profile-gamertag", name: "profile-gamertag", placeholder: "Spillernavn", value: profileDraft.gamertag, onChange: (event) => handleProfileFieldChange(event, "gamertag"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })))),
                            React.createElement("div", { className: "space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4" },
                                React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-zinc-300" }, "Favorittspill"),
                                React.createElement("div", { className: "grid gap-2 sm:grid-cols-2" }, favoriteGameOptions.map((game) => (React.createElement("label", { key: game, className: "flex items-center gap-2 text-sm text-zinc-200" },
                                    React.createElement("input", { type: "checkbox", name: "favorite-games", value: game, checked: profileDraft.favoriteGames.includes(game), onChange: (event) => handleFavoriteGameToggle(event, game), className: "h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                    React.createElement("span", null, game))))),
                                React.createElement("p", { className: "text-xs text-zinc-400" }, "Velg spillene du helst vil representere i turneringer og innhold.")),
                            React.createElement("label", { className: "flex items-start gap-3 text-sm text-zinc-200" },
                                React.createElement("input", { type: "checkbox", name: "profile-leaderboard", checked: profileDraft.showOnLeaderboards, onChange: (event) => handleProfileCheckboxChange(event, "showOnLeaderboards"), className: "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                React.createElement("span", null, "Vis brukernavn i leaderboard og klipp")),
                            isMinor ? (React.createElement("div", { className: "space-y-4 rounded-2xl border border-white/15 bg-white/5 p-4" },
                                React.createElement("p", { className: "text-xs font-semibold uppercase tracking-wide text-zinc-300" }, "Foreldresamtykke"),
                                React.createElement("div", { className: "grid gap-4 md:grid-cols-2" },
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "guardian-name" }, "Forelders navn"),
                                        React.createElement("input", { id: "guardian-name", name: "guardian-name", required: true, placeholder: "Navn p\u00E5 forelder/verge", value: profileDraft.parentName, onChange: (event) => handleProfileFieldChange(event, "parentName"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "guardian-phone-confirm" }, "Forelders mobil (Vipps)"),
                                        React.createElement("input", { id: "guardian-phone-confirm", name: "guardian-phone-confirm", required: true, inputMode: "tel", pattern: "^\\d{8}$", placeholder: "8 sifre", value: profileDraft.parentPhone, onChange: (event) => handleProfileFieldChange(event, "parentPhone"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                        React.createElement("p", { className: "mt-1 text-xs text-zinc-400" }, "Nummeret m\u00E5 matche Vipps-foresp\u00F8rselen som ble sendt.")),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "guardian-address" }, "Adresse (valgfritt)"),
                                        React.createElement("input", { id: "guardian-address", name: "guardian-address", placeholder: "Gateadresse", value: profileDraft.address, onChange: (event) => handleProfileFieldChange(event, "address"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" })),
                                    React.createElement("div", null,
                                        React.createElement("label", { className: "mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-300", htmlFor: "guardian-postal" }, "Postnummer (valgfritt)"),
                                        React.createElement("input", { id: "guardian-postal", name: "guardian-postal", inputMode: "numeric", pattern: "^\\d{4}$", placeholder: "0000", value: profileDraft.postalCode, onChange: (event) => handleProfileFieldChange(event, "postalCode"), className: "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }))),
                                React.createElement("label", { className: "flex items-start gap-3 text-sm text-zinc-200" },
                                    React.createElement("input", { type: "checkbox", name: "guardian-consent", required: true, checked: profileDraft.parentConsent, onChange: (event) => handleProfileCheckboxChange(event, "parentConsent"), className: "mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]" }),
                                    React.createElement("span", null, "Jeg er forelder/verge og godkjenner medlemskap/abonnement")))) : null,
                            React.createElement("div", { className: "space-y-3 text-sm text-zinc-200" },
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
    return (React.createElement("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/90 transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#13A0F9] active:scale-95" },
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
            React.createElement("ul", { className: "space-y-2 text-sm text-zinc-300" }, features.map((feature) => (React.createElement("li", { key: feature, className: "flex items-center gap-2" },
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
                React.createElement("p", { className: "text-sm text-zinc-300" }, "Videoen viser hvordan vi pakker ut, iscenesetter og presenterer produkter slik at f\u00F8lgerne v\u00E5re f\u00E5r lyst til \u00E5 kj\u00F8pe dem.")))));
}
function UnboxingOfferingCard({ title, description, Icon, onWatchVideo, reachLabel, audienceStats, }) {
    return (React.createElement("div", { className: "flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#161f33] via-[#101a33] to-[#0a1329] p-6 shadow-[0_20px_36px_rgba(6,14,35,0.55)]" },
        React.createElement("div", { className: "flex items-center gap-3" },
            React.createElement("span", { className: "grid h-12 w-12 place-content-center rounded-xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-black" },
                React.createElement(Icon, { className: "h-6 w-6" })),
            React.createElement("div", null,
                React.createElement("h3", { className: "text-xl font-semibold text-white" }, title),
                React.createElement("p", { className: "text-sm text-zinc-300" }, description))),
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
        React.createElement("p", { className: "text-xs text-zinc-400" }, "Trykk p\u00E5 knappen for \u00E5 se en full unboxing-produksjon slik samarbeidspartnerne v\u00E5re f\u00E5r den levert.")));
}
function OfferingCard({ title, description, Icon, }) {
    return (React.createElement("div", { className: "flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#101a33]/80 p-6 shadow-[0_16px_32px_rgba(6,14,35,0.45)]" },
        React.createElement("div", { className: "flex items-center gap-3" },
            React.createElement("span", { className: "grid h-12 w-12 place-content-center rounded-xl bg-gradient-to-br from-[#13A0F9] to-[#FF2F9C] text-black" },
                React.createElement(Icon, { className: "h-6 w-6" })),
            React.createElement("h3", { className: "text-xl font-semibold text-white" }, title)),
        React.createElement("p", { className: "text-sm leading-relaxed text-zinc-300" }, description)));
}
