export const INLINE_PARTNER_BADGES = Object.freeze({
    lenovo: "https://fjolsenbanden.setaei.com/assets/p-lenovo-zG8s0yqd.png",
    samsung: "https://fjolsenbanden.setaei.com/assets/p-samsung-CTyK3nvK.png",
    philips: "https://fjolsenbanden.setaei.com/assets/p-philips-B33Lb_3a.png",
    komplett: "https://fjolsenbanden.setaei.com/assets/p-komplett-Bpx7vYhC.png",
    kristiania: "https://fjolsenbanden.setaei.com/assets/p-kristiania-DmhQbukm.png",
    saily: "https://fjolsenbanden.setaei.com/assets/p-saily-D-MbpSdv.png",
    nki: "https://fjolsenbanden.setaei.com/img/partners/nki-logo-light.svg",
    trondheimPlay: "https://fjolsenbanden.setaei.com/assets/p-trondheimplay-BQDD3bw9.png",
});

export function getPartnerBadge(slug) {
    return INLINE_PARTNER_BADGES[slug] || "";
}
