"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MemberAuth } from "@/lib/member-auth";

interface MemberLoginViewProps {
  auth: MemberAuth;
  title?: string;
  description?: string;
}

export default function MemberLoginView({
  auth,
  title = "Medlemsinnlogging",
  description = "Logg inn som medlem for å se spillerprofiler og medlemsinnhold.",
}: MemberLoginViewProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6 py-16">
        <Card className="border-white/10 bg-white/5 text-white">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-200">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl text-white">{title}</CardTitle>
            <p className="text-sm text-slate-300">{description}</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="member-username" className="text-slate-200">
                  Brukernavn
                </Label>
                <Input
                  id="member-username"
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
              <div className="space-y-2">
                <Label htmlFor="member-password" className="text-slate-200">
                  Passord
                </Label>
                <Input
                  id="member-password"
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
              {error ? <p className="text-sm text-rose-300">{error}</p> : <p className="text-xs text-slate-400">{auth.hint}</p>}
              <Button
                type="submit"
                className="w-full bg-cyan-500 text-cyan-950 hover:bg-cyan-400"
                disabled={auth.isVerifying}
              >
                {auth.isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifiserer…
                  </>
                ) : (
                  "Logg inn"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-slate-500">
          Tilgangen lagres lokalt slik at du raskt kan komme tilbake til medlemsinnholdet.
        </p>
      </div>
    </div>
  );
}
