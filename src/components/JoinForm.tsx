"use client";

import { Children, cloneElement, isValidElement, useMemo } from "react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import type { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Modal } from "@/components/Modal";
import { SlideStepper } from "@/components/SlideStepper";

const schema = z
  .object({
    guardianName: z.string().optional(),
    guardianEmail: z.string().email("Legg inn en gyldig e-postadresse.").optional(),
    guardianPhone: z.string().optional(),
    name: z.string().min(2, "Navn må inneholde minst to tegn."),
    email: z.string().email("Legg inn en gyldig e-postadresse."),
    phone: z.string().min(5, "Legg inn et telefonnummer."),
    birthdate: z.string().min(1, "Velg en fødselsdato."),
    gender: z.string().optional(),
    postalCode: z.string().min(2, "Postnummer må fylles ut."),
    city: z.string().min(2, "Sted må fylles ut."),
    fortnite: z.string().optional(),
    twitch: z.string().optional(),
    discord: z.string().optional(),
    tiktok: z.string().optional(),
    youtube: z.string().optional(),
    childStreams: z.enum(["nei", "ja"]).optional(),
    childStreamUrl: z.string().url("Legg inn en gyldig lenke.").optional(),
    platforms: z.array(z.string()).default([]),
    games: z.array(z.string()).default([]),
    tos: z.boolean().refine((value) => value, {
      message: "Du må godta retningslinjer og personvern.",
    }),
    guardianConsent: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    const birthdate = parseBirthdate(data.birthdate);

    if (!birthdate) {
      ctx.addIssue({
        path: ["birthdate"],
        code: z.ZodIssueCode.custom,
        message: "Oppgi en gyldig fødselsdato.",
      });
      return;
    }

    const age = calculateAge(birthdate);

    if (age < 0) {
      ctx.addIssue({
        path: ["birthdate"],
        code: z.ZodIssueCode.custom,
        message: "Fødselsdato kan ikke være i fremtiden.",
      });
      return;
    }

    if (age > 120) {
      ctx.addIssue({
        path: ["birthdate"],
        code: z.ZodIssueCode.custom,
        message: "Oppgi en realistisk fødselsdato.",
      });
      return;
    }

    const isMinor = age < 18;

    if (data.childStreams === "ja" && !data.childStreamUrl) {
      ctx.addIssue({
        path: ["childStreamUrl"],
        code: z.ZodIssueCode.custom,
        message: "Legg inn lenke til streamen.",
      });
    }

    if (isMinor) {
      if (!data.guardianName?.trim()) {
        ctx.addIssue({
          path: ["guardianName"],
          code: z.ZodIssueCode.custom,
          message: "Foresattes navn må fylles ut.",
        });
      }

      if (!data.guardianEmail?.trim()) {
        ctx.addIssue({
          path: ["guardianEmail"],
          code: z.ZodIssueCode.custom,
          message: "Foresattes e-post må fylles ut.",
        });
      }

      if (!data.guardianPhone?.trim()) {
        ctx.addIssue({
          path: ["guardianPhone"],
          code: z.ZodIssueCode.custom,
          message: "Foresattes telefon må fylles ut.",
        });
      }

      if (!data.guardianConsent) {
        ctx.addIssue({
          path: ["guardianConsent"],
          code: z.ZodIssueCode.custom,
          message: "Foresatt må samtykke til deltakelse og premier.",
        });
      }
    }
  });

type JoinFormValues = z.infer<typeof schema>;

export interface JoinFormProps {
  open: boolean;
  onClose: () => void;
}

type StepDefinition = {
  id: string;
  label: string;
  content: ReactNode;
  validate?: () => Promise<boolean> | boolean;
  hidden?: boolean;
};

export default function JoinForm({ open, onClose }: JoinFormProps) {
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      guardianConsent: false,
      tos: false,
      platforms: [],
      games: [],
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const birthdateValue = watch("birthdate");
  const isMinor = useMemo(() => {
    const birthdate = parseBirthdate(birthdateValue);
    if (!birthdate) {
      return false;
    }
    return calculateAge(birthdate) < 18;
  }, [birthdateValue]);

  const childStreamsValue = watch("childStreams");

  const steps = useMemo(() => {
    const definitions: StepDefinition[] = [
      {
        id: "guardian",
        label: "Foresatt",
        hidden: !isMinor,
        validate: () => (isMinor ? trigger(["guardianName", "guardianEmail", "guardianPhone"]) : true),
        content: (
          <section className="space-y-4">
            <header>
              <h4 className="text-lg font-semibold text-white">Foresatt kontakt</h4>
              <p className="text-sm text-zinc-400">Brukes kun til samtykke og premier.</p>
            </header>
            <Input
              id="guardianName"
              label="Navn foresatt"
              error={errors.guardianName?.message}
              {...register("guardianName")}
            />
            <Input
              id="guardianEmail"
              type="email"
              label="E-post foresatt"
              error={errors.guardianEmail?.message}
              {...register("guardianEmail")}
            />
            <Input
              id="guardianPhone"
              label="Telefon foresatt"
              error={errors.guardianPhone?.message}
              {...register("guardianPhone")}
            />
          </section>
        ),
      },
      {
        id: "person",
        label: "Del 1",
        validate: () =>
          trigger(["name", "email", "phone", "birthdate", "postalCode", "city", "gender"]),
        content: (
          <section className="space-y-4">
            <header>
              <h4 className="text-lg font-semibold text-white">Del 1: Personinformasjon</h4>
            </header>
            <Input id="name" label="Navn" error={errors.name?.message} {...register("name")} />
            <Input id="email" type="email" label="E-post" error={errors.email?.message} {...register("email")} />
            <Input id="phone" label="Telefon" error={errors.phone?.message} {...register("phone")} />
            <Input
              id="birthdate"
              type="date"
              label="Fødselsdato"
              error={errors.birthdate?.message}
              {...register("birthdate")}
            />
            <Select id="gender" label="Kjønn (valgfritt)" error={errors.gender?.message} {...register("gender")}>
              <option value="">Velg…</option>
              <option value="kvinne">Kvinne</option>
              <option value="mann">Mann</option>
              <option value="annet">Annet</option>
            </Select>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="postalCode"
                label="Postnummer"
                error={errors.postalCode?.message}
                {...register("postalCode")}
              />
              <Input id="city" label="Sted" error={errors.city?.message} {...register("city")} />
            </div>
          </section>
        ),
      },
      {
        id: "platforms",
        label: "Del 2",
        validate: () =>
          trigger(["fortnite", "twitch", "discord", "tiktok", "youtube", "childStreams", "childStreamUrl", "platforms"]),
        content: (
          <section className="space-y-4">
            <header>
              <h4 className="text-lg font-semibold text-white">Del 2: Spill- og plattforminfo</h4>
            </header>
            <Input
              id="fortnite"
              label="Fortnite-brukernavn"
              error={errors.fortnite?.message}
              {...register("fortnite")}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="twitch" label="Twitch" error={errors.twitch?.message} {...register("twitch")} />
              <Input id="discord" label="Discord" error={errors.discord?.message} {...register("discord")} />
              <Input id="tiktok" label="TikTok" error={errors.tiktok?.message} {...register("tiktok")} />
              <Input id="youtube" label="YouTube" error={errors.youtube?.message} {...register("youtube")} />
            </div>
            <RadioGroup
              label="Streamer barnet?"
              name="childStreams"
              register={register}
              error={errors.childStreams?.message}
            >
              <Radio value="nei" label="Nei" />
              <Radio value="ja" label="Ja" />
            </RadioGroup>
            {childStreamsValue === "ja" ? (
              <Input
                id="childStreamUrl"
                label="Lenke til stream"
                placeholder="https://"
                error={errors.childStreamUrl?.message}
                {...register("childStreamUrl")}
              />
            ) : null}
            <CheckboxGroup label="Plattform" error={errors.platforms?.message}>
              {PLATFORM_OPTIONS.map((option) => (
                <Checkbox key={option} name="platforms" value={option} register={register}>
                  {option}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </section>
        ),
      },
      {
        id: "games",
        label: "Del 3",
        validate: () => trigger(["games"]),
        content: (
          <section className="space-y-4">
            <header>
              <h4 className="text-lg font-semibold text-white">Del 3: Spill du spiller</h4>
            </header>
            <CheckboxGrid
              name="games"
              register={register}
              options={GAME_OPTIONS}
              error={errors.games?.message}
            />
          </section>
        ),
      },
      {
        id: "consent",
        label: "Del 4",
        validate: () => trigger(isMinor ? ["tos", "guardianConsent"] : ["tos"]),
        content: (
          <section className="space-y-4">
            <header>
              <h4 className="text-lg font-semibold text-white">Del 4: Samtykke</h4>
            </header>
            <Check
              label="Jeg godtar retningslinjer og personvern"
              error={errors.tos?.message}
              disabled={isSubmitting}
              {...register("tos")}
            />
            {isMinor ? (
              <Check
                label="(Foresatt) samtykker til deltakelse og premier"
                error={errors.guardianConsent?.message}
                disabled={isSubmitting}
                {...register("guardianConsent")}
              />
            ) : null}
            <p className="text-xs text-zinc-400">
              Samtykke inkluderer info på e-post/SMS og premier via Vipps/gavekort/utstyr.
            </p>
          </section>
        ),
      },
    ];

    return definitions.filter((step) => !step.hidden);
  }, [childStreamsValue, errors, isMinor, register, trigger, isSubmitting]);

  const onSubmit = handleSubmit((data) => {
    console.log("Join form submitted", data);
    onClose();
  });

  return (
    <Modal open={open} onClose={onClose} title="Bli med i FjOlsenbanden">
      <SlideStepper
        steps={steps}
        onFinish={onSubmit}
      />
    </Modal>
  );
}

const PLATFORM_OPTIONS = ["PC", "Playstation", "Xbox", "Nintendo", "Annet"] as const;

const GAME_OPTIONS = [
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
  "Annet",
] as const;

function parseBirthdate(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map((entry) => Number.parseInt(entry, 10));

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

function calculateAge(birthdate: Date) {
  const today = new Date();
  let age = today.getUTCFullYear() - birthdate.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birthdate.getUTCMonth();
  const dayDiff = today.getUTCDate() - birthdate.getUTCDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
};

function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <label className="block text-sm text-white" htmlFor={inputId}>
      <span className="mb-1 block text-sm font-medium text-white/80">{label}</span>
      <input
        id={inputId}
        {...props}
        className={`w-full rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 ${
          className ?? ""
        }`}
      />
      {error ? <span className="mt-1 block text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
};

function Select({ label, error, id, className, children, ...props }: SelectProps) {
  const selectId = id || props.name;

  return (
    <label className="block text-sm text-white" htmlFor={selectId}>
      <span className="mb-1 block text-sm font-medium text-white/80">{label}</span>
      <select
        id={selectId}
        {...props}
        className={`w-full rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2 text-white outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/40 ${
          className ?? ""
        }`}
      >
        {children}
      </select>
      {error ? <span className="mt-1 block text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}

type RadioGroupProps = {
  label: string;
  name: keyof JoinFormValues;
  register: UseFormRegister<JoinFormValues>;
  error?: string;
  children: ReactNode;
};

function RadioGroup({ label, name, register, error, children }: RadioGroupProps) {
  const registration = register(name);

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-white/80">{label}</legend>
      <div className="flex flex-wrap gap-3">
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return child;
          }

          return cloneElement(child, {
            registration,
            name: registration.name,
          });
        })}
      </div>
      {error ? <span className="block text-xs text-rose-300">{error}</span> : null}
    </fieldset>
  );
}

type RadioProps = {
  value: string;
  label: string;
  registration?: UseFormRegisterReturn;
  name?: string;
};

function Radio({ value, label, registration, name }: RadioProps) {
  const inputId = name ? `${name}-${value}` : `${value}`;

  return (
    <label
      className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/30"
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="radio"
        value={value}
        {...registration}
        className="h-4 w-4 text-sky-400 focus:ring-sky-400"
      />
      <span>{label}</span>
    </label>
  );
}

type CheckboxGroupProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function CheckboxGroup({ label, error, children }: CheckboxGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-white/80">{label}</legend>
      <div className="flex flex-wrap gap-3">{children}</div>
      {error ? <span className="block text-xs text-rose-300">{error}</span> : null}
    </fieldset>
  );
}

type CheckboxProps = {
  name: keyof JoinFormValues;
  value: string;
  register: UseFormRegister<JoinFormValues>;
  children: ReactNode;
  className?: string;
};

function Checkbox({ name, value, register, children, className }: CheckboxProps) {
  const registration = register(name);
  const inputId = `${registration.name}-${value}`;

  return (
    <label
      className={`flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-white/30 ${
        className ?? ""
      }`}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="checkbox"
        value={value}
        {...registration}
        className="h-4 w-4 rounded border-white/20 bg-zinc-900 text-sky-400 focus:ring-sky-400"
      />
      <span>{children}</span>
    </label>
  );
}

type CheckboxGridProps = {
  name: keyof JoinFormValues;
  register: UseFormRegister<JoinFormValues>;
  options: readonly string[];
  error?: string;
};

function CheckboxGrid({ name, register, options, error }: CheckboxGridProps) {
  return (
    <div className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <Checkbox key={option} name={name} value={option} register={register}>
            {option}
          </Checkbox>
        ))}
      </div>
      {error ? <span className="block text-xs text-rose-300">{error}</span> : null}
    </div>
  );
}

type CheckProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
};

function Check({ label, error, id, className, ...props }: CheckProps) {
  const inputId = id || props.name;

  return (
    <label
      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:border-white/30"
      htmlFor={inputId}
    >
      <input
        id={inputId}
        type="checkbox"
        {...props}
        className={`mt-1 h-5 w-5 rounded border-white/20 bg-zinc-900 text-sky-400 focus:ring-sky-400 ${className ?? ""}`}
      />
      <span className="flex-1">
        <span className="font-medium text-white">{label}</span>
        {error ? <span className="mt-1 block text-xs text-rose-300">{error}</span> : null}
      </span>
    </label>
  );
}

