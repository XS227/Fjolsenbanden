export const INLINE_PARTNER_BADGES = Object.freeze({
    lenovo: "https://setaei.com/Fjolsen/partnere/p-lenovo.png",
    samsung: "https://setaei.com/Fjolsen/partnere/p-samsung.png",
    philips: "https://setaei.com/Fjolsen/partnere/p-philips.png",
    komplett: "https://setaei.com/Fjolsen/partnere/p-komplett.png",
    kristiania: "https://setaei.com/Fjolsen/partnere/p-kristiania.png",
    saily: "https://setaei.com/Fjolsen/partnere/p-saily.png",
    nki: "https://setaei.com/Fjolsen/partnere/P-nki.svg",
    trondheimPlay: "https://setaei.com/Fjolsen/partnere/p-trondheimplay.png",
});

export function getPartnerBadge(slug) {
    return INLINE_PARTNER_BADGES[slug] || "";
}
