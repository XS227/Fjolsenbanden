"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getRandomSupporterProducts, } from "@/lib/supporter-products";
const SUPPORTER_URL = "https://supporter.no/fjolsenbanden";
const PRODUCT_COUNT = 3;
const SupporterShowcase = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(getRandomSupporterProducts(PRODUCT_COUNT));
    }, []);
    return (React.createElement("section", { id: "supporter", className: "mt-20 px-6" },
        React.createElement("div", { className: "mx-auto max-w-6xl space-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_48px_rgba(6,14,35,0.45)]" },
            React.createElement("div", { className: "space-y-4" },
                React.createElement("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#13A0F9]" }, "Supporter merch"),
                React.createElement("h2", { className: "text-3xl font-bold text-white" }, "St\u00F8tt Fjolsenbanden"),
                React.createElement("p", { className: "mx-auto max-w-2xl text-lg text-zinc-200" }, "Kj\u00F8p offisielle produkter fra supporter.no og bidra til at vi kan arrangere flere events, premier og aktiviteter for communityet.")),
            React.createElement("div", { className: "grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3" }, products.map((product) => (React.createElement(Card, { key: product.id, className: "flex h-full flex-col overflow-hidden border-white/15 bg-[#101b35]/80 backdrop-blur" },
                React.createElement("div", { className: "relative h-40 w-full overflow-hidden" },
                    React.createElement("img", { src: product.imageUrl, alt: product.name, loading: "lazy", className: "h-full w-full object-cover transition duration-500 ease-out hover:scale-110" })),
                React.createElement(CardHeader, { className: "space-y-2" },
                    React.createElement(CardTitle, { className: "text-lg text-white" }, product.name),
                    React.createElement("p", { className: "text-sm text-zinc-300" }, product.description)),
                React.createElement(CardContent, { className: "mt-auto" },
                    React.createElement("p", { className: "text-sm font-semibold text-[#13A0F9]" }, product.price)),
                React.createElement(CardFooter, { className: "mt-4" },
                    React.createElement(Button, { asChild: true, size: "sm", className: "w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] font-semibold text-white shadow-[0_12px_24px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]" },
                        React.createElement("a", { href: product.href, target: "_blank", rel: "noopener noreferrer" },
                            "Se produkt",
                            React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })))))))),
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(Button, { asChild: true, size: "lg", className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white shadow-[0_16px_32px_rgba(6,14,35,0.45)] transition hover:bg-white/20" },
                    React.createElement("a", { href: SUPPORTER_URL, target: "_blank", rel: "noopener noreferrer" },
                        "Bes\u00F8k supporter-butikken",
                        React.createElement(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })))))));
};
export default SupporterShowcase;
