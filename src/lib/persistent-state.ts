"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function usePersistentState<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
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
      return JSON.parse(stored) as T;
    } catch (error) {
      console.warn("Kunne ikke lese verdi fra localStorage", error);
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState<T>(initial);

  const setter: Dispatch<SetStateAction<T>> = (update) => {
    setValue((current) => {
      const nextValue = typeof update === "function" ? (update as (prev: T) => T)(current) : update;
      if (isBrowser()) {
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch (error) {
          console.warn("Kunne ikke lagre verdi til localStorage", error);
        }
      }
      return nextValue;
    });
  };

  return [value, setter];
}
