"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-950/90 p-8 shadow-2xl">
        {title ? <h3 className="text-2xl font-semibold text-white">{title}</h3> : null}
        <div className="mt-6 text-white">{children}</div>
      </div>
    </div>
  );
}
