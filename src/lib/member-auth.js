"use client";
import { useMemo, useState } from "react";
import { usePersistentState } from "@/lib/persistent-state";
const MEMBER_AUTH_STORAGE_KEY = "fjolsenbanden-member-auth";
const MEMBER_USERNAME = "User";
const MEMBER_PASSWORD = "User";
export function useMemberAuth() {
    const [state, setState] = usePersistentState(MEMBER_AUTH_STORAGE_KEY, {
        isAuthenticated: false,
    });
    const [isVerifying, setIsVerifying] = useState(false);
    const login = async ({ username, password }) => {
        const trimmedUsername = (username !== null && username !== void 0 ? username : "").trim();
        const trimmedPassword = (password !== null && password !== void 0 ? password : "").trim();
        if (!trimmedUsername || !trimmedPassword) {
            return { success: false, error: "Oppgi både brukernavn og passord." };
        }
        setIsVerifying(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 350));
            const isValidUser = trimmedUsername.localeCompare(MEMBER_USERNAME, undefined, { sensitivity: "accent" }) === 0 &&
                trimmedPassword === MEMBER_PASSWORD;
            if (!isValidUser) {
                return { success: false, error: "Feil brukernavn eller passord. Prøv igjen." };
            }
            setState({
                isAuthenticated: true,
                lastLoginAt: new Date().toISOString(),
            });
            return { success: true };
        }
        finally {
            setIsVerifying(false);
        }
    };
    const logout = () => {
        setState({ isAuthenticated: false });
    };
    const hint = useMemo(() => "Har du ikke tilgangskoden? Kontakt oss for å få den.", []);
    return {
        state,
        login,
        logout,
        isVerifying,
        hint,
    };
}
