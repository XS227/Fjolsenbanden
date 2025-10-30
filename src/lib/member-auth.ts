"use client";

import { useMemo, useState } from "react";

import { usePersistentState } from "@/lib/persistent-state";

interface MemberAuthState {
  isAuthenticated: boolean;
  lastLoginAt?: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface MemberCredentials {
  username: string;
  password: string;
}

const MEMBER_AUTH_STORAGE_KEY = "fjolsenbanden-member-auth";
const MEMBER_USERNAME = "User";
const MEMBER_PASSWORD = "User";

export function useMemberAuth() {
  const [state, setState] = usePersistentState<MemberAuthState>(MEMBER_AUTH_STORAGE_KEY, {
    isAuthenticated: false,
  });
  const [isVerifying, setIsVerifying] = useState(false);

  const login = async ({ username, password }: MemberCredentials): Promise<LoginResult> => {
    const trimmedUsername = (username ?? "").trim();
    const trimmedPassword = (password ?? "").trim();

    if (!trimmedUsername || !trimmedPassword) {
      return { success: false, error: "Oppgi både brukernavn og passord." };
    }

    setIsVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const isValidUser =
        trimmedUsername.localeCompare(MEMBER_USERNAME, undefined, { sensitivity: "accent" }) === 0 &&
        trimmedPassword === MEMBER_PASSWORD;

      if (!isValidUser) {
        return { success: false, error: "Feil brukernavn eller passord. Prøv igjen." };
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
    () => "Brukernavn: User • Passord: User (store forbokstaver).",
    [],
  );

  return {
    state,
    login,
    logout,
    isVerifying,
    hint,
  };
}

export type MemberAuth = ReturnType<typeof useMemberAuth>;
