import React from "react";
import { motion } from "framer-motion";
import { Discord, Instagram, PlayCircle, Smartphone, Twitch, Youtube } from "lucide-react";

import type { LivePlatform, PlatformStatus } from "@/lib/liveStatus";
import { DEMO_STREAM_URL } from "@/lib/demoStream";

export interface PlatformButtonsProps {
  statusMap?: Partial<Record<LivePlatform, PlatformStatus>>;
}

interface PlatformLinkConfig {
  id: "twitch" | "youtube" | "tiktok" | "instagram" | "discord" | "demo";
  label: string;
  href: string;
  icon: React.ReactNode;
  livePlatform?: LivePlatform;
}

const PLATFORM_LINKS: PlatformLinkConfig[] = [
  {
    id: "youtube",
    label: "Se på YouTube",
    href: "https://youtube.com/@fjolsenbanden",
    icon: <Youtube className="h-5 w-5" />, 
    livePlatform: "youtube",
  },
  {
    id: "twitch",
    label: "Se på Twitch",
    href: "https://twitch.tv/fjolsenbanden",
    icon: <Twitch className="h-5 w-5" />,
    livePlatform: "twitch",
  },
  {
    id: "tiktok",
    label: "Se på TikTok",
    href: "https://tiktok.com/@fjolsenbanden",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    id: "instagram",
    label: "Følg på Instagram",
    href: "https://www.instagram.com/fjolsenbanden",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    id: "discord",
    label: "Bli med i Discord",
    href: "https://discord.gg/fjolsenbanden",
    icon: <Discord className="h-5 w-5" />,
  },
  {
    id: "demo",
    label: "Åpne demo-stream",
    href: DEMO_STREAM_URL,
    icon: <PlayCircle className="h-5 w-5 text-cyan-300" />,
  },
];

function getLiveBadge(status?: PlatformStatus) {
  if (!status) {
    return null;
  }

  if (!status.isLive) {
    return status.error ? (
      <span className="text-[10px] uppercase tracking-wide text-amber-300">{status.error}</span>
    ) : null;
  }

  return <span className="text-[10px] font-semibold uppercase tracking-wide text-rose-300">Live nå</span>;
}

export function PlatformButtons({ statusMap }: PlatformButtonsProps) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {PLATFORM_LINKS.map((platform) => {
        const status = platform.livePlatform ? statusMap?.[platform.livePlatform] : undefined;

        return (
          <motion.a
            key={platform.id}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 transition hover:bg-white/20"
          >
            <span className="text-white/90">{platform.icon}</span>
            <span className="text-sm">{platform.label}</span>
            {getLiveBadge(status)}
          </motion.a>
        );
      })}
    </div>
  );
}

export default PlatformButtons;
