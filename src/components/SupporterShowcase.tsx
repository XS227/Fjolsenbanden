"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SupporterProduct,
  getRandomSupporterProducts,
} from "@/lib/supporter-products";

const SUPPORTER_URL = "https://supporter.no/fjolsenbanden";
const PRODUCT_COUNT = 3;

const SupporterShowcase: React.FC = () => {
  const [products, setProducts] = useState<SupporterProduct[]>([]);

  useEffect(() => {
    setProducts(getRandomSupporterProducts(PRODUCT_COUNT));
  }, []);

  return (
    <section id="supporter" className="mt-20 px-6">
      <div className="mx-auto max-w-6xl space-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-[0_24px_48px_rgba(6,14,35,0.45)]">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#13A0F9]">
            Supporter merch
          </span>
          <h2 className="text-3xl font-bold text-white">Støtt Fjolsenbanden</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-200">
            Kjøp offisielle produkter fra supporter.no og bidra til at vi kan arrangere flere events, premier og aktiviteter for communityet.
          </p>
        </div>

        <div className="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col overflow-hidden border-white/15 bg-[#101b35]/80 backdrop-blur"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 ease-out hover:scale-110"
                />
              </div>
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg text-white">{product.name}</CardTitle>
                <p className="text-sm text-zinc-300">{product.description}</p>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="text-sm font-semibold text-[#13A0F9]">{product.price}</p>
              </CardContent>
              <CardFooter className="mt-4">
                <Button
                  asChild
                  size="sm"
                  className="w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#13A0F9] to-[#FF2F9C] font-semibold text-white shadow-[0_12px_24px_rgba(19,160,249,0.35)] transition hover:from-[#0d8bd6] hover:to-[#e12585]"
                >
                  <a href={product.href} target="_blank" rel="noopener noreferrer">
                    Se produkt
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            size="lg"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white shadow-[0_16px_32px_rgba(6,14,35,0.45)] transition hover:bg-white/20"
          >
            <a href={SUPPORTER_URL} target="_blank" rel="noopener noreferrer">
              Besøk supporter-butikken
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupporterShowcase;

