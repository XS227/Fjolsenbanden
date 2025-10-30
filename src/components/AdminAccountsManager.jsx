"use client";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  MailPlus,
  ShieldCheck,
  ShieldHalf,
  UserCog,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/lib/admin-auth";

const DEFAULT_ACCOUNTS = [
  {
    id: "admin-fjolse",
    name: "Marius Fjolsen",
    email: "marius@fjolsenbanden.no",
    role: "Superadmin",
    status: "Aktiv",
    lastActive: "For 2 timer siden",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80",
    secure: true,
  },
  {
    id: "admin-june",
    name: "June Olsen",
    email: "june@fjolsenbanden.no",
    role: "Moderator",
    status: "Aktiv",
    lastActive: "I dag 08:45",
    avatar:
      "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=160&q=80",
    secure: true,
  },
  {
    id: "admin-shield",
    name: "Tor Martin Fjolsen",
    email: "tormartin@fjolsenbanden.no",
    role: "Turneringsansvarlig",
    status: "Aktiv",
    lastActive: "I går",
    avatar:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=160&q=80",
    secure: false,
  },
  {
    id: "admin-emma",
    name: "Emma Larsen",
    email: "emma@fjolsenbanden.no",
    role: "Community Manager",
    status: "Invitert",
    lastActive: "Venter på aktivering",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    secure: false,
  },
  {
    id: "admin-jonas",
    name: "Jonas Rønning",
    email: "jonas@fjolsenbanden.no",
    role: "Sponsoransvarlig",
    status: "Inaktiv",
    lastActive: "14 dager siden",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&q=80",
    secure: true,
  },
];

const ROLE_FILTERS = [
  { id: "all", label: "Alle roller" },
  { id: "Superadmin", label: "Superadmin" },
  { id: "Moderator", label: "Moderator" },
  { id: "Turneringsansvarlig", label: "Turnering" },
  { id: "Community Manager", label: "Community" },
  { id: "Sponsoransvarlig", label: "Sponsor" },
];

const STATUS_BADGE_STYLES = {
  Aktiv: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  Invitert: "bg-cyan-500/15 text-cyan-100 border-cyan-500/40",
  Inaktiv: "bg-amber-500/15 text-amber-100 border-amber-500/40",
};

export default function AdminAccountsManager() {
  const auth = useAdminAuth();
  if (!auth.state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <LoginModal
          open
          auth={auth}
          title="Admininnlogging"
          description="Logg inn for å administrere tilgangene til teamet."
          accent="emerald"
        />
      </div>
    );
  }
  return <AdminAccountsContent />;
}

function AdminAccountsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredAccounts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return DEFAULT_ACCOUNTS.filter((account) => {
      const matchesQuery =
        !query ||
        account.name.toLowerCase().includes(query) ||
        account.email.toLowerCase().includes(query) ||
        account.role.toLowerCase().includes(query);
      const matchesRole = roleFilter === "all" || account.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [searchQuery, roleFilter]);

  const summary = useMemo(() => {
    const total = DEFAULT_ACCOUNTS.length;
    const active = DEFAULT_ACCOUNTS.filter((account) => account.status === "Aktiv").length;
    const invited = DEFAULT_ACCOUNTS.filter((account) => account.status === "Invitert").length;
    const inactive = DEFAULT_ACCOUNTS.filter((account) => account.status === "Inaktiv").length;
    const secure = DEFAULT_ACCOUNTS.filter((account) => account.secure).length;
    return { total, active, invited, inactive, secure };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
              <ShieldCheck className="h-4 w-4" /> Tilgangskontroll
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Administrer administratorer
            </h1>
            <p className="max-w-2xl text-base text-slate-300">
              Få oversikt over hvem som har tilgang til kontrollpanelet, hvilke roller de har og om sikkerhetstiltak er aktivert.
              Invitasjoner og endringer lagres lokalt slik at du kan planlegge før utsending.
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
              <Lock className="h-3.5 w-3.5" /> Innlogget som administrator
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/15"
              >
                <a href="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Tilbake til kontrollpanelet
                </a>
              </Button>
              <Button
                asChild
                className="bg-cyan-500 text-cyan-950 hover:bg-cyan-400"
              >
                <a href="/admin/profile-preview">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Forhåndsvis roller
                </a>
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={Users}
            title="Totale kontoer"
            value={summary.total}
            description="Alle registrerte administratorer"
          />
          <SummaryCard
            icon={CheckCircle2}
            title="Aktive"
            value={summary.active}
            description="Har logget inn siste 30 dager"
          />
          <SummaryCard
            icon={MailPlus}
            title="Invitasjoner"
            value={summary.invited}
            description="Venter på aktivering"
          />
          <SummaryCard
            icon={ShieldHalf}
            title="2FA aktivert"
            value={`${summary.secure}/${summary.total}`}
            description="Brukere med ekstra sikkerhet"
          />
        </section>

        <Card className="border-white/10 bg-white/5 text-white backdrop-blur">
          <CardHeader className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl text-white">Roller og tilganger</CardTitle>
              <p className="text-sm text-slate-300">
                Filtrer på roller eller søk etter navn og e-post for å finne personen du trenger.
              </p>
            </div>
            <Button className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
              <UserPlus className="mr-2 h-4 w-4" /> Inviter ny administrator
            </Button>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Søk etter navn, rolle eller e-post"
                className="w-full bg-slate-950/40 text-white placeholder:text-slate-400 sm:max-w-sm"
              />
              <div className="flex flex-wrap gap-2">
                {ROLE_FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setRoleFilter(filter.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition ${{
                      true: "border-emerald-400/60 bg-emerald-400/15 text-emerald-100",
                      false: "border-white/10 bg-white/5 text-slate-200 hover:border-white/20",
                    }[roleFilter === filter.id]}`}
                  >
                    <UserCog className="h-3.5 w-3.5" />
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-950/30">
              <table className="min-w-full divide-y divide-white/10">
                <thead>
                  <tr className="text-left text-sm uppercase tracking-wide text-slate-400">
                    <th className="px-6 py-3 font-medium">Administrator</th>
                    <th className="px-6 py-3 font-medium">Rolle</th>
                    <th className="px-6 py-3 font-medium">Sist aktiv</th>
                    <th className="px-6 py-3 font-medium">Sikkerhet</th>
                    <th className="px-6 py-3 font-medium text-right">Handlinger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-300">
                        Ingen kontoer matcher søket ditt. Prøv et annet søkeord eller nullstill filteret.
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((account) => (
                      <tr key={account.id} className="transition hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={account.avatar}
                              alt=""
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-white">{account.name}</p>
                              <p className="text-xs text-slate-400">{account.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                            {account.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-200">{account.lastActive}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {account.secure ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <XCircle className="h-4 w-4 text-amber-300" />
                            )}
                            <span className="text-xs text-slate-300">
                              {account.secure ? "Totrinnsverifisering aktiv" : "2FA ikke satt opp"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                                STATUS_BADGE_STYLES[account.status] ?? "border-white/10 bg-white/5 text-slate-200"
                              }`}
                            >
                              <span className="h-2 w-2 rounded-full bg-current"></span>
                              {account.status}
                            </span>
                            <Button
                              variant="outline"
                              className="border-white/20 bg-white/5 text-xs text-slate-200 hover:bg-white/15"
                            >
                              Behandle
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-emerald-900/20 text-white">
            <CardHeader>
              <CardTitle className="text-white">Beste praksis for roller</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-emerald-50/90">
              <p>
                Sett minst to superadministratorer slik at dere alltid har en nødkontakt dersom en konto låses. Moderators kan få
                begrenset tilgang til innholdsseksjoner uten å kunne endre sikkerhetsinnstillinger.
              </p>
              <p>
                Inviter nye frivillige som "Community Manager" først, og oppgrader til høyere tilgang når de har fullført
                sikkerhetssjekklisten.
              </p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader>
              <CardTitle className="text-white">Sikkerhetslogg</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-200">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">Totrinnskrav for nye roller</p>
                  <p className="text-xs text-slate-400">Foreslått av sikkerhetsgruppa 12. juni</p>
                </div>
                <Button className="bg-emerald-500 px-4 text-emerald-950 hover:bg-emerald-400" size="sm">
                  Aktiver
                </Button>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-950/40 p-4">
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                    <span>
                      <strong className="text-white">Marius</strong> låste opp nye partnerseksjoner for produksjonsteamet.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldHalf className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>
                      <strong className="text-white">June</strong> aktiverte 2FA for alle moderatorer.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="mt-0.5 h-4 w-4 text-emerald-300" />
                    <span>
                      <strong className="text-white">Tor Martin</strong> inviterte Emma til community-teamet.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, title, value, description }) {
  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardContent className="flex flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-300">{title}</p>
            <p className="text-3xl font-semibold text-white">{value}</p>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
            <Icon className="h-6 w-6" />
          </span>
        </div>
        <p className="text-xs text-slate-400">{description}</p>
      </CardContent>
    </Card>
  );
}
