"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type FormData = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  postalCode: string;
  city: string;
  fortniteUsername: string;
  twitchUsername: string;
  discordName: string;
  tiktokUsername: string;
  youtubeUsername: string;
  streams: "ja" | "nei" | "";
  streamLink: string;
  platforms: string[];
  otherPlatform: string;
  games: string[];
  otherGame: string;
  rulesConsent: boolean;
  guardianConsent: boolean;
};

const initialFormData: FormData = {
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  postalCode: "",
  city: "",
  fortniteUsername: "",
  twitchUsername: "",
  discordName: "",
  tiktokUsername: "",
  youtubeUsername: "",
  streams: "",
  streamLink: "",
  platforms: [],
  otherPlatform: "",
  games: [],
  otherGame: "",
  rulesConsent: false,
  guardianConsent: false,
};

const platformOptions = ["PC", "Playstation", "Xbox", "Nintendo"] as const;

const gameOptions = [
  "Fortnite",
  "FC25/FC26",
  "F1 25",
  "Valorant",
  "Roblox",
  "Minecraft",
  "Call of Duty / Battlefield",
  "Rocket League",
  "Apex Legends",
  "Counter-Strike 2",
  "Overwatch 2",
  "Stumble Guys",
] as const;

const inputClasses =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder:text-zinc-400 focus:border-[#13A0F9] focus:outline-none focus:ring-2 focus:ring-[#13A0F9]/40";

const checkboxBaseClasses =
  "h-5 w-5 rounded-md border border-white/20 bg-white/5 text-[#13A0F9] focus:ring-[#13A0F9]";

export default function RegistrationFormPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPlatforms = useMemo(
    () => [...formData.platforms, formData.otherPlatform].filter(Boolean).join(", "),
    [formData.otherPlatform, formData.platforms]
  );

  const selectedGames = useMemo(
    () => [...formData.games, formData.otherGame].filter(Boolean).join(", "),
    [formData.games, formData.otherGame]
  );

  const handleTextChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleCheckboxToggle = (collection: "platforms" | "games", value: string) => {
    setFormData((previous) => {
      const existing = previous[collection];
      const hasValue = existing.includes(value);
      return {
        ...previous,
        [collection]: hasValue
          ? existing.filter((entry) => entry !== value)
          : [...existing, value],
      };
    });
  };

  const handleConsentToggle = (name: "rulesConsent" | "guardianConsent") => {
    setFormData((previous) => ({ ...previous, [name]: !previous[name] }));
  };

  const validateForm = () => {
    const issues: string[] = [];

    if (!formData.name.trim()) {
      issues.push("Fyll inn barnets navn.");
    }

    if (!formData.email.trim()) {
      issues.push("Legg inn en gyldig e-postadresse.");
    }

    if (!formData.birthDate.trim()) {
      issues.push("Fødselsdato må fylles inn.");
    }

    if (!formData.postalCode.trim() || !formData.city.trim()) {
      issues.push("Postnummer og sted må fylles inn.");
    }

    if (!formData.rulesConsent) {
      issues.push("Du må godta retningslinjer og personvernerklæring.");
    }

    if (!formData.guardianConsent) {
      issues.push("Foresatt må samtykke til deltakelse og premier.");
    }

    return issues;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationIssues = validateForm();

    if (validationIssues.length > 0) {
      setErrors(validationIssues);
      return;
    }

    setErrors([]);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors([]);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
        <main className="mx-auto max-w-4xl px-6 py-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Registrering fullført</p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Takk! Skjemaet er sendt inn.</h1>
                <p className="mt-3 text-lg text-zinc-200">
                  Vi lagrer informasjonen og følger opp via e-post eller telefon. Du kan når som helst sende inn flere barn
                  eller oppdatere informasjonen ved å fylle ut skjemaet på nytt.
                </p>
              </div>
            </div>

            <section className="mt-10 grid gap-6">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Foresatt kontakt
                </h2>
                <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Navn</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.parentName || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">E-post</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.parentEmail || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Telefon</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.parentPhone || "Ikke oppgitt"}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Personinformasjon
                </h2>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Navn</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">E-post</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Telefon</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.phone || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Fødselsdato</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.birthDate}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Kjønn</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.gender || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Sted</dt>
                    <dd className="mt-1 text-base font-semibold text-white">
                      {formData.postalCode} {formData.city}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                  Spill- og plattforminfo
                </h2>
                <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Fortnite-brukernavn</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.fortniteUsername || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Twitch</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.twitchUsername || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Discord</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.discordName || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">TikTok</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.tiktokUsername || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">YouTube</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{formData.youtubeUsername || "Ikke oppgitt"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Streamer</dt>
                    <dd className="mt-1 text-base font-semibold text-white">
                      {formData.streams === "ja" ? `Ja${formData.streamLink ? ` – ${formData.streamLink}` : ""}` : "Nei"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">Plattformer</dt>
                    <dd className="mt-1 text-base font-semibold text-white">{selectedPlatforms || "Ingen valgt"}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-950/50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Favorittspill</h2>
                <p className="mt-2 text-sm text-zinc-300">
                  {selectedGames || "Ingen spill valgt"}
                </p>
              </div>
            </section>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <Button
                type="button"
                onClick={handleReset}
                className="rounded-2xl bg-white/10 px-6 text-sm text-white hover:bg-white/20"
              >
                Registrer nytt medlem
              </Button>
              <div className="flex items-center gap-2 text-sm text-zinc-300">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Trykk for å sende inn et nytt svar</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur">
          <header className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Innmeldingsskjema FjOlsenbanden</p>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Meld barnet inn og lås opp premier</h1>
            <p className="mt-3 text-base text-zinc-200">
              Foreldre må registrere barnet for at vi skal kunne dele ut premier og invitere til eventer. Fyll først inn
              foresattes kontaktinfo, deretter barnets detaljer og spillvaner.
            </p>
          </header>

          <form className="mt-10 space-y-10" onSubmit={handleSubmit}>
            <section className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
              <h2 className="text-lg font-semibold text-white">👨‍👩‍👧 Foresatt kontakt</h2>
              <p className="mt-1 text-sm text-zinc-300">Fylles ut dersom barnet er under 18 år.</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <label className="flex flex-col text-sm font-medium text-white">
                  Navn foresatt
                  <input
                    name="parentName"
                    type="text"
                    value={formData.parentName}
                    onChange={handleTextChange}
                    placeholder="Navn"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  E-post foresatt
                  <input
                    name="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={handleTextChange}
                    placeholder="navn@epost.no"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Telefonnummer foresatt
                  <input
                    name="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={handleTextChange}
                    placeholder="8 sifre"
                    className={inputClasses}
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
              <h2 className="text-lg font-semibold text-white">👤 Del 1: Personinformasjon</h2>
              <p className="mt-1 text-sm text-zinc-300">
                Oppgi kontaktinformasjon til den som skal delta i FjOlsenbandens aktiviteter.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col text-sm font-medium text-white sm:col-span-2">
                  Navn
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleTextChange}
                    placeholder="Fornavn Etternavn"
                    className={inputClasses}
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  E-post
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleTextChange}
                    placeholder="navn@epost.no"
                    className={inputClasses}
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Telefon
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleTextChange}
                    placeholder="Valgfritt"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Fødselsdato
                  <input
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleTextChange}
                    className={inputClasses}
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Kjønn (valgfritt)
                  <input
                    name="gender"
                    type="text"
                    value={formData.gender}
                    onChange={handleTextChange}
                    placeholder="Valgfritt"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Postnummer
                  <input
                    name="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={handleTextChange}
                    placeholder="####"
                    className={inputClasses}
                    required
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Sted
                  <input
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleTextChange}
                    placeholder="By eller kommune"
                    className={inputClasses}
                    required
                  />
                </label>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-zinc-400">
                Segmentering på region hjelper oss å arrangere lokale eventer.
              </p>
            </section>

            <section className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
              <h2 className="text-lg font-semibold text-white">🎮 Del 2: Spill- og plattforminfo</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <label className="flex flex-col text-sm font-medium text-white">
                  Fortnite-brukernavn
                  <input
                    name="fortniteUsername"
                    type="text"
                    value={formData.fortniteUsername}
                    onChange={handleTextChange}
                    placeholder="Valgfritt"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Twitch-brukernavn
                  <input
                    name="twitchUsername"
                    type="text"
                    value={formData.twitchUsername}
                    onChange={handleTextChange}
                    placeholder="Valgfritt"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  Discord-navn
                  <input
                    name="discordName"
                    type="text"
                    value={formData.discordName}
                    onChange={handleTextChange}
                    placeholder="Brukernavn#0000"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  TikTok-brukernavn
                  <input
                    name="tiktokUsername"
                    type="text"
                    value={formData.tiktokUsername}
                    onChange={handleTextChange}
                    placeholder="Valgfritt"
                    className={inputClasses}
                  />
                </label>
                <label className="flex flex-col text-sm font-medium text-white">
                  YouTube-brukernavn
                  <input
                    name="youtubeUsername"
                    type="text"
                    value={formData.youtubeUsername}
                    onChange={handleTextChange}
                    placeholder="Valgfritt"
                    className={inputClasses}
                  />
                </label>
              </div>

              <div className="mt-8 space-y-4">
                <span className="text-sm font-medium text-white">Streamer ditt barn?</span>
                <div className="flex flex-wrap gap-4 text-sm text-white">
                  {(["nei", "ja"] as const).map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="streams"
                        value={option}
                        checked={formData.streams === option}
                        onChange={(event) => {
                          const nextValue = event.target.value as FormData["streams"];
                          setFormData((previous) => ({
                            ...previous,
                            streams: nextValue,
                            streamLink: nextValue === "nei" ? "" : previous.streamLink,
                          }));
                        }}
                        className="h-5 w-5 border border-white/20 bg-white/5 text-[#13A0F9] focus:ring-[#13A0F9]"
                      />
                      {option === "ja" ? "Ja" : "Nei"}
                    </label>
                  ))}
                </div>
                {formData.streams === "ja" ? (
                  <label className="flex flex-col text-sm font-medium text-white">
                    Link til stream
                    <input
                      name="streamLink"
                      type="url"
                      value={formData.streamLink}
                      onChange={handleTextChange}
                      placeholder="https://"
                      className={inputClasses}
                    />
                  </label>
                ) : null}
              </div>

              <div className="mt-8">
                <span className="text-sm font-medium text-white">Hvilke plattformer spiller barnet på?</span>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {platformOptions.map((platform) => (
                    <label key={platform} className="flex items-center gap-3 text-sm text-white">
                      <input
                        type="checkbox"
                        className={checkboxBaseClasses}
                        checked={formData.platforms.includes(platform)}
                        onChange={() => handleCheckboxToggle("platforms", platform)}
                      />
                      {platform}
                    </label>
                  ))}
                  <label className="flex items-center gap-3 text-sm text-white">
                    <input
                      type="checkbox"
                      className={checkboxBaseClasses}
                      checked={Boolean(formData.otherPlatform)}
                      onChange={(event) =>
                        setFormData((previous) => ({
                          ...previous,
                          otherPlatform: event.target.checked ? previous.otherPlatform : "",
                        }))
                      }
                    />
                    <div className="flex-1">
                      Annet
                      <input
                        name="otherPlatform"
                        type="text"
                        value={formData.otherPlatform}
                        onChange={handleTextChange}
                        placeholder="Skriv plattform"
                        className={`${inputClasses} mt-3`}
                      />
                    </div>
                  </label>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  Plattformdata er verdifull for partnere og sponsorater.
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
              <h2 className="text-lg font-semibold text-white">🕹️ Del 3: Spill du spiller</h2>
              <p className="mt-1 text-sm text-zinc-300">Velg spillene som spilles oftest.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {gameOptions.map((game) => (
                  <label key={game} className="flex items-center gap-3 text-sm text-white">
                    <input
                      type="checkbox"
                      className={checkboxBaseClasses}
                      checked={formData.games.includes(game)}
                      onChange={() => handleCheckboxToggle("games", game)}
                    />
                    {game}
                  </label>
                ))}
                <label className="flex items-center gap-3 text-sm text-white sm:col-span-2">
                  <input
                    type="checkbox"
                    className={checkboxBaseClasses}
                    checked={Boolean(formData.otherGame)}
                    onChange={(event) =>
                      setFormData((previous) => ({
                        ...previous,
                        otherGame: event.target.checked ? previous.otherGame : "",
                      }))
                    }
                  />
                  <div className="flex-1">
                    Annet
                    <input
                      name="otherGame"
                      type="text"
                      value={formData.otherGame}
                      onChange={handleTextChange}
                      placeholder="Legg til spill"
                      className={`${inputClasses} mt-3`}
                    />
                  </div>
                </label>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                Denne innsikten hjelper oss å planlegge turneringer og events.
              </p>
            </section>

            <section className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6">
              <h2 className="text-lg font-semibold text-white">📊 Del 4: Samtykke</h2>
              <p className="mt-1 text-sm text-zinc-300">
                Samtykke gjør det mulig å sende informasjon og dele ut premier via Vipps, gavekort eller utstyr.
              </p>
              <div className="mt-6 space-y-4">
                <label className="flex items-start gap-3 text-sm text-white">
                  <input
                    type="checkbox"
                    className={checkboxBaseClasses}
                    checked={formData.rulesConsent}
                    onChange={() => handleConsentToggle("rulesConsent")}
                    required
                  />
                  <span>Jeg godtar FjOlsenbandens retningslinjer og personvernerklæring.</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-white">
                  <input
                    type="checkbox"
                    className={checkboxBaseClasses}
                    checked={formData.guardianConsent}
                    onChange={() => handleConsentToggle("guardianConsent")}
                  />
                  <span>
                    Jeg (foresatt) samtykker til at mitt barn kan delta i aktiviteter og motta premier fra FjOlsenbanden.
                  </span>
                </label>
              </div>
            </section>

            {errors.length > 0 ? (
              <div className="rounded-2xl border border-amber-300/40 bg-amber-400/10 px-5 py-4 text-sm text-amber-100">
                <p className="font-semibold">Vennligst sjekk skjemaet på nytt:</p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button
                type="button"
                onClick={handleReset}
                className="rounded-2xl bg-white/10 px-5 text-sm text-white hover:bg-white/20"
              >
                Nullstill skjema
              </Button>
              <Button type="submit" className="rounded-2xl bg-[#13A0F9] px-6 text-sm text-white hover:bg-[#1090df]">
                Send inn skjema
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
