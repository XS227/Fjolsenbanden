"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthAdapter {
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  isVerifying: boolean;
  hint: string;
}

interface LoginModalProps {
  open: boolean;
  auth: AuthAdapter;
  title: string;
  description: string;
  submitLabel?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  accent?: "cyan" | "emerald";
  onClose?: () => void;
}

const accentStyles = {
  cyan: {
    icon: "bg-cyan-500/10 text-cyan-200",
    button: "bg-cyan-500 text-cyan-950 hover:bg-cyan-400",
  },
  emerald: {
    icon: "bg-emerald-500/10 text-emerald-200",
    button: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
  },
} as const;

export default function LoginModal({
  open,
  auth,
  title,
  description,
  submitLabel = "Logg inn",
  usernameLabel = "Brukernavn",
  passwordLabel = "Passord",
  accent = "cyan",
  onClose,
}: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setError(null);
      setUsername("");
      setPassword("");
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const accentStyle = accentStyles[accent] ?? accentStyles.cyan;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const result = await auth.login({ username, password });
    if (!result.success) {
      setError(result.error ?? "Kunne ikke logge inn.");
      return;
    }
    setUsername("");
    setPassword("");
    onClose?.();
  };

  const handleOverlayClick = () => {
    onClose?.();
  };

  const preventPropagation = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10">
      <div className="absolute inset-0" onClick={handleOverlayClick} aria-hidden="true" />
      <div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur"
        role="dialog"
        aria-modal="true"
        onClick={preventPropagation}
      >
        <div className="space-y-6 px-8 py-10">
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${accentStyle.icon}`}>
            <Lock className="h-5 w-5" />
          </div>
          <div className="space-y-3 text-center">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <p className="text-sm text-slate-300">{description}</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2 text-left">
              <Label htmlFor="login-username" className="text-slate-200">
                {usernameLabel}
              </Label>
              <Input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Skriv inn brukernavn"
                className="bg-slate-950/40 text-white placeholder:text-slate-400"
                disabled={auth.isVerifying}
                required
              />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="login-password" className="text-slate-200">
                {passwordLabel}
              </Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Skriv inn passord"
                className="bg-slate-950/40 text-white placeholder:text-slate-400"
                disabled={auth.isVerifying}
                required
              />
            </div>
            {error ? (
              <p className="text-sm text-rose-300">{error}</p>
            ) : (
              <p className="text-xs text-slate-400">{auth.hint}</p>
            )}
            <Button type="submit" className={`w-full ${accentStyle.button}`} disabled={auth.isVerifying}>
              {auth.isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifiserer…
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
