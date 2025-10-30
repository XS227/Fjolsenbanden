"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type SlideStep = {
  id: string;
  label: string;
  content: ReactNode;
  validate?: () => Promise<boolean> | boolean;
};

interface SlideStepperProps {
  steps: SlideStep[];
  onFinish?: () => void | Promise<void>;
  className?: string;
}

export function SlideStepper({ steps, onFinish, className }: SlideStepperProps) {
  const visibleSteps = useMemo(() => steps, [steps]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex > visibleSteps.length - 1) {
      setActiveIndex(Math.max(visibleSteps.length - 1, 0));
    }
  }, [activeIndex, visibleSteps.length]);

  if (visibleSteps.length === 0) {
    return null;
  }

  const handleNext = async () => {
    const current = visibleSteps[activeIndex];
    if (current?.validate) {
      const valid = await current.validate();
      if (!valid) {
        return;
      }
    }

    if (activeIndex === visibleSteps.length - 1) {
      await onFinish?.();
      return;
    }

    setActiveIndex((index) => Math.min(index + 1, visibleSteps.length - 1));
  };

  const handlePrevious = () => {
    setActiveIndex((index) => Math.max(index - 1, 0));
  };

  const progress = ((activeIndex + 1) / visibleSteps.length) * 100;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/70">
            Steg {activeIndex + 1} av {visibleSteps.length}
          </p>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50">
            {visibleSteps.map((step, index) => (
              <span
                key={step.id}
                className={cn(
                  "inline-flex h-6 items-center justify-center rounded-full border px-3 transition",
                  index === activeIndex
                    ? "border-sky-400/80 bg-sky-400/10 text-sky-200"
                    : "border-white/10 bg-white/5 text-white/40"
                )}
              >
                {step.label}
              </span>
            ))}
          </div>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-sky-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-6 shadow-lg">
        {visibleSteps[activeIndex]?.content}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={activeIndex === 0}
          className={cn(
            "rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition",
            activeIndex === 0
              ? "cursor-not-allowed opacity-40"
              : "hover:border-white/30 hover:text-white"
          )}
        >
          Forrige
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
        >
          {activeIndex === visibleSteps.length - 1 ? "Fullfør" : "Neste"}
        </button>
      </div>
    </div>
  );
}
