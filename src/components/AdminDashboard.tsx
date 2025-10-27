"use client";

import { useMemo } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  Gift,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MembershipTier {
  name: string;
  members: number;
  monthlyPrice: number;
  growth: number;
  churn: number;
}

interface TimelineEvent {
  title: string;
  description: string;
  owner: string;
  due: string;
  status: "planlagt" | "pågår" | "fullført";
}

const membershipTiers: readonly MembershipTier[] = [
  { name: "Gratis", members: 860, monthlyPrice: 0, growth: 6.5, churn: 1.2 },
  { name: "Premie", members: 340, monthlyPrice: 49, growth: 8.1, churn: 0.8 },
  { name: "Sponsor", members: 42, monthlyPrice: 299, growth: 4.2, churn: 0.0 },
];

const timeline: readonly TimelineEvent[] = [
  {
    title: "Sommerevent med Lenovo",
    description: "Koordiner premier og kommunikasjonsplan. Krever bekreftelse fra markedsavdelingen.",
    owner: "June",
    due: "24. juni",
    status: "pågår",
  },
  {
    title: "Foreldrekveld – trygg streaming",
    description: "Tor Martin lager agenda og materiell for kveldssending rettet mot foreldre.",
    owner: "Tor Martin",
    due: "3. juli",
    status: "planlagt",
  },
  {
    title: "Discord-opprydding sommer",
    description: "Oppdater regler, arkiver inaktive kanaler og rekrutter nye moderatorer.",
    owner: "Marius",
    due: "12. juli",
    status: "planlagt",
  },
  {
    title: "Premierunde Q3",
    description: "Send ut premier til alle vinnerne og bekreft at adresser er verifisert.",
    owner: "Lina",
    due: "30. juli",
    status: "fullført",
  },
];

const formatter = new Intl.NumberFormat("no-NO", {
  style: "currency",
  currency: "NOK",
  maximumFractionDigits: 0,
});

function getStatusBadgeClasses(status: TimelineEvent["status"]): string {
  switch (status) {
    case "pågår":
      return "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30";
    case "planlagt":
      return "bg-sky-500/10 text-sky-300 border border-sky-500/30";
    case "fullført":
      return "bg-amber-500/10 text-amber-200 border border-amber-500/30";
    default:
      return "bg-slate-500/10 text-slate-200 border border-slate-500/30";
  }
}

export default function AdminDashboard() {
  const { totalMembers, totalMonthlyRevenue, payingMembers, revenueBreakdown, averageRevenuePerPayingMember } =
    useMemo(() => {
      const totalMembersCount = membershipTiers.reduce((sum, tier) => sum + tier.members, 0);
      const totalRevenue = membershipTiers.reduce(
        (sum, tier) => sum + tier.members * tier.monthlyPrice,
        0
      );
      const payingMembersCount = membershipTiers
        .filter((tier) => tier.monthlyPrice > 0)
        .reduce((sum, tier) => sum + tier.members, 0);
      const breakdown = membershipTiers.map((tier) => ({
        tier: tier.name,
        members: tier.members,
        price: tier.monthlyPrice,
        revenue: tier.members * tier.monthlyPrice,
      }));
      const avgRevenuePerPayingMember = payingMembersCount
        ? Math.round((totalRevenue / payingMembersCount) * 100) / 100
        : 0;

      return {
        totalMembers: totalMembersCount,
        totalMonthlyRevenue: totalRevenue,
        payingMembers: payingMembersCount,
        revenueBreakdown: breakdown,
        averageRevenuePerPayingMember: avgRevenuePerPayingMember,
      };
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              Intern oversikt
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Adminpanel for Fjolsenbanden
            </h1>
            <p className="max-w-2xl text-base text-slate-300">
              Hold styr på medlemmer, premier og samarbeid i ett samlet dashbord. Tallene oppdateres daglig og gir et raskt
              bilde av hvordan communityet utvikler seg.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white/10 text-white hover:bg-white/20">
              Last ned rapport
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/15">
              Del med teamet
            </Button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Medlemmer totalt</CardTitle>
              <Users className="h-5 w-5 text-emerald-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white">{totalMembers.toLocaleString("no-NO")}</div>
              <p className="text-xs text-emerald-200/80">+7,8% siste 30 dager</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Forventet månedsinntekt</CardTitle>
              <TrendingUp className="h-5 w-5 text-cyan-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white">
                {formatter.format(totalMonthlyRevenue)}
              </div>
              <p className="text-xs text-cyan-100/80">Basert på aktive abonnement</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Premier i omløp</CardTitle>
              <Gift className="h-5 w-5 text-amber-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white">6 aktive</div>
              <p className="text-xs text-amber-100/80">3 trekninger denne uken</p>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Tilfredshet</CardTitle>
              <MessageCircle className="h-5 w-5 text-pink-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-white">96%</div>
              <p className="text-xs text-pink-100/80">Basert på 42 tilbakemeldinger</p>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <BarChart3 className="h-5 w-5 text-cyan-300" /> Medlemsutvikling
                </CardTitle>
                <p className="mt-2 text-sm text-slate-300">
                  Fordeling av medlemmer per nivå med tilhørende vekst og churn. Tallene inkluderer nyregistreringer fra den
                  siste måneden.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {membershipTiers.map((tier) => {
                  const fill = Math.round((tier.members / totalMembers) * 100);
                  return (
                    <div key={tier.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-200">
                        <span className="font-medium text-white">{tier.name}</span>
                        <span>{tier.members.toLocaleString("no-NO")} medlemmer</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                          style={{ width: `${fill}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="inline-flex items-center gap-1 text-emerald-200">
                          <TrendingUp className="h-3 w-3" />
                          {tier.growth.toLocaleString("no-NO", { maximumFractionDigits: 1 })}% vekst
                        </span>
                        <span className="text-rose-200">{tier.churn}% churn</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ArrowUpRight className="h-5 w-5 text-emerald-300" /> Regnestykke for medlemsinntekter
                </CardTitle>
                <p className="mt-2 text-sm text-slate-300">
                  Oversikten viser hvordan hvert nivå bidrar til samlet månedsinntekt. Bruk den som grunnlag når dere planlegger
                  kampanjer eller justering av priser.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {revenueBreakdown.map((tier) => {
                    const percentage = totalMonthlyRevenue
                      ? Math.round((tier.revenue / totalMonthlyRevenue) * 100)
                      : 0;
                    return (
                      <div key={tier.tier} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-slate-200">
                          <div>
                            <p className="font-medium text-white">{tier.tier}</p>
                            <p className="text-xs text-slate-300">
                              {tier.members.toLocaleString("no-NO")} medlemmer × {formatter.format(tier.price)}
                            </p>
                          </div>
                          <span className="font-semibold text-white">{formatter.format(tier.revenue)}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-lime-400 to-amber-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <div className="flex items-center justify-between text-base font-semibold text-white">
                    <span>Totalt per måned</span>
                    <span>{formatter.format(totalMonthlyRevenue)}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-300">
                    Gjennomsnitt per betalende medlem: {formatter.format(averageRevenuePerPayingMember)}.
                    {" "}
                    Inkluderer {payingMembers.toLocaleString("no-NO")} medlemmer på Premie- og Sponsor-nivå.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CalendarCheck className="h-5 w-5 text-violet-300" /> Aktivitetslogg og oppgaver
                </CardTitle>
                <p className="mt-2 text-sm text-slate-300">
                  Følg med på nøkkelaktiviteter som må leveres den kommende måneden. Statusfeltet gjør det lett å se hva som er
                  i rute.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {timeline.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                            <Users className="h-3 w-3" /> {item.owner}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                            <CalendarCheck className="h-3 w-3" /> Frist: {item.due}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex h-fit items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClasses(
                          item.status
                        )}`}
                      >
                        {item.status === "pågår" && "Pågår"}
                        {item.status === "planlagt" && "Planlagt"}
                        {item.status === "fullført" && "Fullført"}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" /> Drift og trygghet
                </CardTitle>
                <p className="mt-2 text-sm text-slate-300">
                  Kjappe nøkkelpunkter for moderering og support den siste uken.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-200">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="font-medium text-white">Alle supporthenvendelser besvart</p>
                    <p className="mt-1 text-xs text-slate-300">Snitt svartid: 1t 12m • Siste sak lukket av Sara</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mt-1 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="font-medium text-white">Trygg strøm for foreldre</p>
                    <p className="mt-1 text-xs text-slate-300">Oppdatert retningslinjene og sendt ut nyhetsbrev med tips til foreldre.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Users className="mt-1 h-4 w-4 text-cyan-300" />
                  <div>
                    <p className="font-medium text-white">Moderator-team</p>
                    <p className="mt-1 text-xs text-slate-300">4 nye frivillige meldt seg – onboarding planlagt neste tirsdag.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5 text-sky-300" /> Neste steg
                </CardTitle>
                <p className="mt-2 text-sm text-slate-300">
                  Prioriterte forslag basert på dataen over. Gir konkrete grep for å holde veksten.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Boost Premie-nivået før sommerslippet</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Test to ukers kampanje med familierabatt og krysspromo på TikTok. Mål: +12% flere betalende medlemmer.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Aktiver sponsorene i flere sendeflater</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Sett opp dedikerte shoutouts i sommerstreamene og del resultater i månedlig sponsorrapport.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">Planlegg høstens foreldresesjoner</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Bruk erfaringene fra juni-kvelden og lag en serie korte webinarer med Q&A.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
