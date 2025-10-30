import { AnimatePresence, motion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0 }),
};

export function SlideStepper({
  steps,
  onFinish,
}: {
  steps: ReactNode[];
  onFinish: () => void;
}) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setI((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      onFinish();
      return prev;
    });
  }, [onFinish, steps.length]);

  const back = useCallback(() => {
    setDir(-1);
    setI((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        back();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [back, next]);

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={i}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="min-h-[320px]"
        >
          {steps[i]}
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-between">
        <button
          onClick={back}
          disabled={i === 0}
          className="px-4 py-2 rounded-xl disabled:opacity-40 bg-white/10 text-white"
        >
          Tilbake
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-pink-500 text-white"
        >
          Neste
        </button>
      </div>

      <div className="mt-3 text-center text-xs text-zinc-400">
        {i + 1} / {steps.length}
      </div>
    </div>
  );
}
