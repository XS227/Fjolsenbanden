const supporterProducts = [
    {
        id: "fjolsenbanden-hoodie",
        name: "Fjolsenbanden Hettegenser",
        description: "Myk og varm premium hettegenser med Fjolsenbanden-logo – perfekt for kalde LAN-kvelder.",
        price: "799,-",
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        href: "https://supporter.no/fjolsenbanden?product=fjolsenbanden-hoodie",
    },
    {
        id: "fjolsenbanden-tee",
        name: "Fjolsenbanden T-skjorte",
        description: "Lett t-skjorte i 100 % bomull med stor frontprint som viser hvem du heier på.",
        price: "349,-",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        href: "https://supporter.no/fjolsenbanden?product=fjolsenbanden-tee",
    },
    {
        id: "fjolsenbanden-cap",
        name: "Fjolsenbanden Caps",
        description: "Snapback-caps med brodert logo og justerbar passform for både turneringer og hverdagsbruk.",
        price: "299,-",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
        href: "https://supporter.no/fjolsenbanden?product=fjolsenbanden-cap",
    },
    {
        id: "fjolsenbanden-scarf",
        name: "Fjolsenbanden Supporterskjerf",
        description: "Vevd skjerf i klubbfargene – ta det med på events og vis hvem du representerer.",
        price: "249,-",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        href: "https://supporter.no/fjolsenbanden?product=fjolsenbanden-scarf",
    },
    {
        id: "fjolsenbanden-waterbottle",
        name: "Fjolsenbanden Drikkeflaske",
        description: "Rustfri stålflaske som holder energidrikken kald gjennom hele streamen.",
        price: "199,-",
        imageUrl: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=900&q=80",
        href: "https://supporter.no/fjolsenbanden?product=fjolsenbanden-waterbottle",
    },
    {
        id: "fjolsenbanden-mousepad",
        name: "Fjolsenbanden Mousepad XL",
        description: "Ekstra stor musematte med glatt overflate og anti-skli underside for presis aim.",
        price: "399,-",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-98927f1dcd1b?auto=format&fit=crop&w=900&q=80",
        href: "https://supporter.no/fjolsenbanden?product=fjolsenbanden-mousepad",
    },
];
export const getRandomSupporterProducts = (count) => {
    if (count <= 0) {
        return [];
    }
    const pool = [...supporterProducts];
    for (let index = pool.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const temp = pool[index];
        pool[index] = pool[randomIndex];
        pool[randomIndex] = temp;
    }
    return pool.slice(0, Math.min(count, pool.length));
};
export const getAllSupporterProducts = () => supporterProducts;
