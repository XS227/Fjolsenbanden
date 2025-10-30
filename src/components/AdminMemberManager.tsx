"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Loader2,
  Lock,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";

import LoginModal from "@/components/LoginModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  type PlayerProfile,
  useAdminState,
} from "@/lib/admin-state";
import { useAdminAuth } from "@/lib/admin-auth";

interface NewPlayerState {
  gamerTag: string;
  realName: string;
  mainGame: string;
  bio: string;
  achievements: string;
  avatarUrl: string;
  joinDate: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  postalCode: string;
  city: string;
  fortnite: string;
  twitch: string;
  discord: string;
  youtube: string;
  tiktok: string;
}

const emptyNewPlayer = (): NewPlayerState => ({
  gamerTag: "",
  realName: "",
  mainGame: "",
  bio: "",
  achievements: "",
  avatarUrl: "",
  joinDate: new Date().toISOString().slice(0, 10),
  email: "",
  phone: "",
  birthDate: new Date().toISOString().slice(0, 10),
  gender: "",
  postalCode: "",
  city: "",
  fortnite: "",
  twitch: "",
  discord: "",
  youtube: "",
  tiktok: "",
});

export default function AdminMemberManager() {
  const auth = useAdminAuth();

  if (!auth.state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <LoginModal
          open
          auth={auth}
          title="Admininnlogging"
          description="Logg inn for å administrere medlemmene dine."
          accent="emerald"
        />
      </div>
    );
  }

  return <MemberManagerContent />;
}

function MemberManagerContent() {
  const { state, addPlayer, updatePlayer, removePlayer } = useAdminState();
  const { players } = state;

  const [newPlayer, setNewPlayer] = useState<NewPlayerState>(emptyNewPlayer());
  const [justAddedPlayer, setJustAddedPlayer] = useState<string | null>(null);

  useEffect(() => {
    if (justAddedPlayer) {
      const timeout = window.setTimeout(() => setJustAddedPlayer(null), 4000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, [justAddedPlayer]);

  const handleAddPlayer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPlayer.gamerTag.trim()) {
      return;
    }

    addPlayer({
      gamerTag: newPlayer.gamerTag.trim(),
      realName: newPlayer.realName.trim() || newPlayer.gamerTag.trim(),
      mainGame: newPlayer.mainGame.trim() || "Allsidig",
      bio: newPlayer.bio.trim() || "Ny i Fjolsenbanden. Profilen oppdateres snart!",
      achievements: extractAchievements(newPlayer.achievements),
      avatarUrl:
        newPlayer.avatarUrl.trim() ||
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=320&q=80",
      joinDate: newPlayer.joinDate,
      contact: {
        fullName: newPlayer.realName.trim() || newPlayer.gamerTag.trim(),
        email: newPlayer.email.trim(),
        phone: newPlayer.phone.trim(),
        birthDate: newPlayer.birthDate,
        gender: newPlayer.gender.trim(),
        postalCode: newPlayer.postalCode.trim(),
        city: newPlayer.city.trim(),
      },
      socials: {
        fortnite: newPlayer.fortnite.trim() || undefined,
        twitch: newPlayer.twitch.trim() || undefined,
        discord: newPlayer.discord.trim() || undefined,
        youtube: newPlayer.youtube.trim() || undefined,
        tiktok: newPlayer.tiktok.trim() || undefined,
      },
    });

    setJustAddedPlayer(newPlayer.gamerTag.trim());
    setNewPlayer(emptyNewPlayer());
  };

  const orderedPlayers = useMemo(
    () => [...players].sort((a, b) => a.gamerTag.localeCompare(b.gamerTag, "nb")),
    [players],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-sm font-medium text-emerald-200">
              <ShieldCheck className="h-4 w-4" /> Medlemsadministrasjon
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Administrer medlemmer</h1>
            <p className="max-w-2xl text-base text-slate-300">
              Oppdater kontaktinfo, spillpreferanser og sosiale lenker for hele teamet. Endringer lagres lokalt i nettleseren,
              slik at du kan jobbe trygt før du deler dem.
            </p>
            {justAddedPlayer ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-100">
                <ShieldCheck className="h-4 w-4" /> {justAddedPlayer} er klar med egen profilside
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
              <Lock className="h-3.5 w-3.5" /> Innlogget som administrator
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/15">
                <a href="/admin">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Tilbake til kontrollpanelet
                </a>
              </Button>
              <Button asChild className="bg-cyan-500 text-cyan-950 hover:bg-cyan-400">
                <a href="/admin/profile-preview">
                  <ArrowUpRight className="mr-2 h-4 w-4" /> Forhåndsvis profiler
                </a>
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="h-5 w-5 text-cyan-300" /> Legg til nytt medlem
              </CardTitle>
              <p className="text-sm text-slate-300">
                Fyll ut skjemaet for å opprette en ny spillerprofil med kontaktinfo og sosiale lenker.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAddPlayer}>
                <div className="space-y-2">
                  <Label htmlFor="gamerTag" className="text-slate-200">
                    Gamertag
                  </Label>
                  <Input
                    id="gamerTag"
                    name="gamerTag"
                    value={newPlayer.gamerTag}
                    onChange={(event) => setNewPlayer((state) => ({ ...state, gamerTag: event.target.value }))}
                    placeholder="FjolseFar"
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="realName" className="text-slate-200">
                      Fullt navn
                    </Label>
                    <Input
                      id="realName"
                      name="realName"
                      value={newPlayer.realName}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, realName: event.target.value }))}
                      placeholder="Marius Fjolsen"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mainGame" className="text-slate-200">
                      Hovedspill
                    </Label>
                    <Input
                      id="mainGame"
                      name="mainGame"
                      value={newPlayer.mainGame}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, mainGame: event.target.value }))}
                      placeholder="Mario Kart 8 Deluxe"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-200">
                    Kort bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={newPlayer.bio}
                    onChange={(event) => setNewPlayer((state) => ({ ...state, bio: event.target.value }))}
                    placeholder="Hva gjør spilleren unik?"
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="achievements" className="text-slate-200">
                    Meritter (kommaseparert)
                  </Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    rows={2}
                    value={newPlayer.achievements}
                    onChange={(event) => setNewPlayer((state) => ({ ...state, achievements: event.target.value }))}
                    placeholder="Arrangerte familieligaen 2023, Vant høstturneringen"
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl" className="text-slate-200">
                    Avatar-URL
                  </Label>
                  <Input
                    id="avatarUrl"
                    name="avatarUrl"
                    value={newPlayer.avatarUrl}
                    onChange={(event) => setNewPlayer((state) => ({ ...state, avatarUrl: event.target.value }))}
                    placeholder="https://..."
                    className="bg-slate-950/40 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="joinDate" className="text-slate-200">
                      Bli-med-dato
                    </Label>
                    <Input
                      id="joinDate"
                      type="date"
                      name="joinDate"
                      value={newPlayer.joinDate}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, joinDate: event.target.value }))}
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-slate-200">
                      Fødselsdato
                    </Label>
                    <Input
                      id="birthDate"
                      type="date"
                      name="birthDate"
                      value={newPlayer.birthDate}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, birthDate: event.target.value }))}
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      E-post
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={newPlayer.email}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, email: event.target.value }))}
                      placeholder="navn@fjolsenbanden.no"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-200">
                      Mobil
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={newPlayer.phone}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, phone: event.target.value }))}
                      placeholder="+47 123 45 678"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-slate-200">
                      Kjønn
                    </Label>
                    <Input
                      id="gender"
                      name="gender"
                      value={newPlayer.gender}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, gender: event.target.value }))}
                      placeholder="F.eks. Kvinne"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-slate-200">
                      Postnr
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={newPlayer.postalCode}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, postalCode: event.target.value }))}
                      placeholder="0000"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-200">
                      Sted
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={newPlayer.city}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, city: event.target.value }))}
                      placeholder="Oslo"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fortnite" className="text-slate-200">
                      Fortnite-brukernavn
                    </Label>
                    <Input
                      id="fortnite"
                      name="fortnite"
                      value={newPlayer.fortnite}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, fortnite: event.target.value }))}
                      placeholder="FjolseFar#Nord"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="twitch" className="text-slate-200">
                      Twitch-brukernavn (valgfritt)
                    </Label>
                    <Input
                      id="twitch"
                      name="twitch"
                      value={newPlayer.twitch}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, twitch: event.target.value }))}
                      placeholder="fjolsefar"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discord" className="text-slate-200">
                      Discord (valgfritt)
                    </Label>
                    <Input
                      id="discord"
                      name="discord"
                      value={newPlayer.discord}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, discord: event.target.value }))}
                      placeholder="FjolseFar#1024"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="youtube" className="text-slate-200">
                      YouTube-brukernavn (valgfritt)
                    </Label>
                    <Input
                      id="youtube"
                      name="youtube"
                      value={newPlayer.youtube}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, youtube: event.target.value }))}
                      placeholder="@fjolsefar"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tiktok" className="text-slate-200">
                      TikTok-brukernavn (valgfritt)
                    </Label>
                    <Input
                      id="tiktok"
                      name="tiktok"
                      value={newPlayer.tiktok}
                      onChange={(event) => setNewPlayer((state) => ({ ...state, tiktok: event.target.value }))}
                      placeholder="@fjolsefar"
                      className="bg-slate-950/40 text-white placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-cyan-500 py-3 text-cyan-950 hover:bg-cyan-400">
                  Opprett profil
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-emerald-900/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <ShieldCheck className="h-5 w-5 text-emerald-200" /> Tips for strukturert medlemspleie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-emerald-50/90">
              <p>
                Bruk feltet for meritter til å løfte frem høydepunkter fra turneringer og community-arbeid. Det gir sponsorer og
                foreldre et raskt overblikk over hva medlemmene har oppnådd.
              </p>
              <p>
                Kontaktinformasjonen lagres kun lokalt i adminpanelet. Når du er fornøyd, eksporter dataene og del dem sikkert
                med resten av teamet.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Aktive medlemmer ({players.length})</h2>
            <p className="text-sm text-slate-300">
              Oppdater feltene under for å holde spillerprofilene oppdaterte og klare for deling.
            </p>
          </div>

          <div className="space-y-6">
            {orderedPlayers.map((player) => (
              <PlayerEditor
                key={player.id}
                player={player}
                onRemove={() => removePlayer(player.id)}
                onSave={(updates) => updatePlayer(player.id, updates)}
              />
            ))}
            {orderedPlayers.length === 0 ? (
              <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Ingen medlemmer registrert</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-slate-300">
                  <p>Bruk skjemaet over for å opprette det første medlemmet.</p>
                  <p>Alle nye spillere får automatisk en offentlig profilside som kan deles med communityet.</p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

interface PlayerFormState extends NewPlayerState {}

type PlayerEditorProps = {
  player: PlayerProfile;
  onSave: (updates: Partial<PlayerProfile>) => void;
  onRemove: () => void;
};

function PlayerEditor({ player, onSave, onRemove }: PlayerEditorProps) {
  const [form, setForm] = useState<PlayerFormState>(() => createPlayerFormState(player));
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setForm(createPlayerFormState(player));
    setDirty(false);
    setStatus("idle");
  }, [player]);

  const handleInputChange = (field: keyof PlayerFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((current) => ({ ...current, [field]: value }));
      setDirty(true);
    };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dirty) {
      return;
    }

    setStatus("saving");
    Promise.resolve(onSave(buildPlayerUpdates(form)))
      .then(() => {
        setStatus("saved");
        setDirty(false);
        window.setTimeout(() => setStatus("idle"), 2000);
      })
      .catch(() => setStatus("idle"));
  };

  return (
    <Card className="border-white/10 bg-white/5 text-white">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={form.avatarUrl || player.avatarUrl}
              alt={player.gamerTag}
              className="h-16 w-16 rounded-2xl object-cover"
            />
            <div>
              <p className="text-xl font-semibold text-white">{player.gamerTag}</p>
              <p className="text-xs uppercase tracking-wide text-slate-300">{player.mainGame}</p>
              <p className="text-xs text-slate-400">Med siden {formatDate(player.joinDate)}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/15">
              <a href={`/players/${player.slug}`}>Se offentlig profil</a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-rose-400/40 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20"
              onClick={onRemove}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Fjern medlem
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          Status:
          {status === "saving" ? (
            <span className="inline-flex items-center gap-1 text-cyan-200">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Lagre endringer…
            </span>
          ) : status === "saved" ? (
            <span className="inline-flex items-center gap-1 text-emerald-200">
              <ShieldCheck className="h-3.5 w-3.5" /> Lagret
            </span>
          ) : dirty ? (
            <span className="text-amber-200">Ulagrede endringer</span>
          ) : (
            <span className="text-slate-400">Ingen endringer</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Gamertag" id={`gamerTag-${player.id}`} value={form.gamerTag} onChange={handleInputChange("gamerTag")} />
            <Field
              label="Fullt navn"
              id={`realName-${player.id}`}
              value={form.realName}
              onChange={handleInputChange("realName")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Hovedspill"
              id={`mainGame-${player.id}`}
              value={form.mainGame}
              onChange={handleInputChange("mainGame")}
            />
            <Field
              label="Avatar-URL"
              id={`avatarUrl-${player.id}`}
              value={form.avatarUrl}
              onChange={handleInputChange("avatarUrl")}
              placeholder="https://..."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Bli-med-dato"
              id={`joinDate-${player.id}`}
              type="date"
              value={form.joinDate}
              onChange={handleInputChange("joinDate")}
            />
            <Field
              label="Fødselsdato"
              id={`birthDate-${player.id}`}
              type="date"
              value={form.birthDate}
              onChange={handleInputChange("birthDate")}
            />
          </div>
          <FieldArea
            label="Kort bio"
            id={`bio-${player.id}`}
            value={form.bio}
            onChange={handleInputChange("bio")}
          />
          <FieldArea
            label="Meritter (kommaseparert)"
            id={`achievements-${player.id}`}
            value={form.achievements}
            onChange={handleInputChange("achievements")}
            rows={2}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="E-post"
              id={`email-${player.id}`}
              type="email"
              value={form.email}
              onChange={handleInputChange("email")}
            />
            <Field
              label="Mobil"
              id={`phone-${player.id}`}
              value={form.phone}
              onChange={handleInputChange("phone")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Kjønn"
              id={`gender-${player.id}`}
              value={form.gender}
              onChange={handleInputChange("gender")}
            />
            <Field
              label="Postnummer"
              id={`postal-${player.id}`}
              value={form.postalCode}
              onChange={handleInputChange("postalCode")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Sted"
              id={`city-${player.id}`}
              value={form.city}
              onChange={handleInputChange("city")}
            />
            <Field
              label="Fortnite"
              id={`fortnite-${player.id}`}
              value={form.fortnite}
              onChange={handleInputChange("fortnite")}
              placeholder="FjolseFar#Nord"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Twitch"
              id={`twitch-${player.id}`}
              value={form.twitch}
              onChange={handleInputChange("twitch")}
            />
            <Field
              label="Discord"
              id={`discord-${player.id}`}
              value={form.discord}
              onChange={handleInputChange("discord")}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="YouTube"
              id={`youtube-${player.id}`}
              value={form.youtube}
              onChange={handleInputChange("youtube")}
            />
            <Field
              label="TikTok"
              id={`tiktok-${player.id}`}
              value={form.tiktok}
              onChange={handleInputChange("tiktok")}
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Endringer lagres lokalt. Eksporter fra hovedpanelet for å dele med teamet.
            </p>
            <Button
              type="submit"
              className="bg-emerald-500 text-emerald-950 hover:bg-emerald-400"
              disabled={!dirty || status === "saving"}
            >
              {status === "saving" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Lagrer…
                </>
              ) : (
                "Lagre endringer"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-200">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-slate-950/40 text-white placeholder:text-slate-400"
      />
    </div>
  );
}

function FieldArea({
  label,
  id,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  rows?: number;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-slate-200">
        {label}
      </Label>
      <Textarea
        id={id}
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        className="bg-slate-950/40 text-white placeholder:text-slate-400"
      />
    </div>
  );
}

function createPlayerFormState(player: PlayerProfile): PlayerFormState {
  return {
    gamerTag: player.gamerTag,
    realName: player.realName,
    mainGame: player.mainGame,
    bio: player.bio,
    achievements: player.achievements.join(", "),
    avatarUrl: player.avatarUrl,
    joinDate: player.joinDate,
    email: player.contact.email ?? "",
    phone: player.contact.phone ?? "",
    birthDate: player.contact.birthDate ?? "",
    gender: player.contact.gender ?? "",
    postalCode: player.contact.postalCode ?? "",
    city: player.contact.city ?? "",
    fortnite: player.socials.fortnite ?? "",
    twitch: player.socials.twitch ?? "",
    discord: player.socials.discord ?? "",
    youtube: player.socials.youtube ?? "",
    tiktok: player.socials.tiktok ?? "",
  };
}

function buildPlayerUpdates(form: PlayerFormState): Partial<PlayerProfile> {
  return {
    gamerTag: form.gamerTag.trim(),
    realName: form.realName.trim() || form.gamerTag.trim(),
    mainGame: form.mainGame.trim() || "Allsidig",
    bio: form.bio.trim(),
    achievements: extractAchievements(form.achievements),
    avatarUrl: form.avatarUrl.trim(),
    joinDate: form.joinDate,
    contact: {
      fullName: form.realName.trim() || form.gamerTag.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      birthDate: form.birthDate,
      gender: form.gender.trim(),
      postalCode: form.postalCode.trim(),
      city: form.city.trim(),
    },
    socials: {
      fortnite: form.fortnite.trim() || undefined,
      twitch: form.twitch.trim() || undefined,
      discord: form.discord.trim() || undefined,
      youtube: form.youtube.trim() || undefined,
      tiktok: form.tiktok.trim() || undefined,
    },
  };
}

function extractAchievements(input: string): string[] {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(input: string): string {
  if (!input) {
    return "Ukjent";
  }
  try {
    return new Date(input).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "short",
    });
  } catch (error) {
    return input;
  }
}
