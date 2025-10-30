"use client";
import { useMemo, useState } from "react";
function isBrowser() {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}
export function usePersistentState(key, defaultValue) {
    const initial = useMemo(() => {
        if (!isBrowser()) {
            return defaultValue;
        }
        try {
            const stored = window.localStorage.getItem(key);
            if (!stored) {
                window.localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
            return JSON.parse(stored);
        }
        catch (error) {
            console.warn("Kunne ikke lese verdi fra localStorage", error);
            return defaultValue;
        }
    }, [key, defaultValue]);
    const [value, setValue] = useState(initial);
    const setter = (update) => {
        setValue((current) => {
            const nextValue = typeof update === "function" ? update(current) : update;
            if (isBrowser()) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(nextValue));
                }
                catch (error) {
                    console.warn("Kunne ikke lagre verdi til localStorage", error);
                }
            }
            return nextValue;
        });
    };
    return [value, setter];
}
