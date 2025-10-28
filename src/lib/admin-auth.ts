"use client";

import { useMemo, useState } from "react";
import { usePersistentState } from "@/lib/persistent-state";

interface AdminAuthState {
  isAuthenticated: boolean;
  lastLoginAt?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

const AUTH_STORAGE_KEY = "fjolsenbanden-admin-auth";
const ADMIN_PASSCODE = "familiefjols";

export function useAdminAuth() {
  const [state, setState] = usePersistentState<AdminAuthState>(AUTH_STORAGE_KEY, {
    isAuthenticated: false,
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const login = async (input: string): Promise<LoginResult> => {
    const passcode = (input ?? "").trim();
    if (!passcode) {
      return { success: false, error: "Skriv inn tilgangskoden" };
    }

    setIsVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 450));
      if (passcode !== ADMIN_PASSCODE) {
        return { success: false, error: "Feil tilgangskode. Prøv igjen." };
      }

      setState({
        isAuthenticated: true,
        lastLoginAt: new Date().toISOString(),
      });
      return { success: true };
    } finally {
      setIsVerifying(false);
    }
  };

  const logout = () => {
    setState({ isAuthenticated: false });
  };

  const hint = useMemo(
    () => "Deles i kjerneteamet. Spør Marius dersom du mangler koden.",
    []
  );

  return {
    state,
    login,
    logout,
    isVerifying,
    hint,
  };
}
