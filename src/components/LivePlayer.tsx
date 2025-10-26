import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import type { PlatformStatus } from "@/lib/liveStatus";
import { Button } from "@/components/ui/button";

export interface LivePlayerProps {
  channel: string;
  parentDomain?: string;
  status?: PlatformStatus;
  previewDuration?: number;
}

function resolveParentDomain(parentDomain?: string): string {
  if (parentDomain) {
    return parentDomain;
  }

  if (typeof window !== "undefined" && window.location.hostname) {
    return window.location.hostname;
  }

  return "localhost";
}

export function LivePlayer({
  channel,
  parentDomain,
  status,
  previewDuration = 60,
}: LivePlayerProps) {
  const [countdown, setCountdown] = useState(previewDuration);
  const [unmuted, setUnmuted] = useState(false);
  const hasPreview = previewDuration > 0;

  useEffect(() => {
    if (!hasPreview || unmuted) {
      return;
    }

    if (countdown <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown, hasPreview, unmuted]);

  useEffect(() => {
    if (unmuted) {
      setCountdown(0);
    }
  }, [unmuted]);

  const iframeSrc = useMemo(() => {
    const parent = resolveParentDomain(parentDomain);
    const params = new URLSearchParams({
      channel,
      parent,
      muted: String(!unmuted),
    });

    return `https://player.twitch.tv/?${params.toString()}`;
  }, [channel, parentDomain, unmuted]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <motion.div
        className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold"
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        {status?.isLive ? "🔴 LIVE" : "● OFFLINE"}
      </motion.div>

      {status?.title ? (
        <div className="absolute bottom-4 left-4 right-4 hidden rounded-xl bg-black/60 p-3 text-sm backdrop-blur md:block">
          <p className="font-semibold">{status.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-300">
            {status.note ? <span>{status.note}</span> : null}
            {typeof status.viewers === "number" ? (
              <span>{status.viewers.toLocaleString()} seere</span>
            ) : null}
            {status.error ? <span className="text-rose-300">{status.error}</span> : null}
          </div>
        </div>
      ) : null}

      <iframe src={iframeSrc} title="Twitch Player" allowFullScreen className="aspect-video w-full" />

      {!unmuted && hasPreview ? (
        <div className="absolute inset-0 grid place-items-center bg-black/70 p-6 text-center">
          <div>
            <Play className="mx-auto mb-3 h-12 w-12 text-cyan-400" />
            <p className="mb-4 text-sm text-zinc-300">
              1-minutt forhåndsvisning – {countdown}s igjen
            </p>
            <Button onClick={() => setUnmuted(true)} className="rounded-full px-6 py-4 text-base">
              Se full stream
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LivePlayer;
