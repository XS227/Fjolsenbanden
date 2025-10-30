import { type ReactNode, useEffect, type MouseEvent } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
}

export function Modal({ open, onClose, children, title }: ModalProps) {
  useEffect(() => {
    if (!open || typeof document === "undefined") {
      return undefined;
    }

    const { body } = document;
    const originalOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative mx-auto flex h-full w-full max-w-lg items-start justify-center overflow-y-auto px-4 py-10 sm:py-16">
        <div
          className="w-full overflow-hidden rounded-2xl bg-zinc-900 text-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          onClick={handleContentClick}
        >
          <div className="sticky top-0 flex items-center justify-between gap-4 bg-zinc-900/95 px-5 py-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
              aria-label="Lukk"
            >
              ✕
            </button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto px-5 pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
