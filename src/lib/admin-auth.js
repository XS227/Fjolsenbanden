"use client";
import { useMemo, useState } from "react";
import { usePersistentState } from "@/lib/persistent-state";
const AUTH_STORAGE_KEY = "fjolsenbanden-admin-auth";
const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = "Admin";
export function useAdminAuth() {
    const [state, setState] = usePersistentState(AUTH_STORAGE_KEY, {
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
            await new Promise((resolve) => setTimeout(resolve, 450));
            const isValidUser = trimmedUsername.localeCompare(ADMIN_USERNAME, undefined, { sensitivity: "accent" }) === 0 &&
                trimmedPassword === ADMIN_PASSWORD;
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
    const hint = useMemo(() => "Brukernavn: Admin • Passord: Admin (store forbokstaver).", []);
    return {
        state,
        login,
        logout,
        isVerifying,
        hint,
    };
}
