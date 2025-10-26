import React from "react";
import { motion } from "framer-motion";
import { Facebook, Smartphone, Twitch, Youtube } from "lucide-react";

import type { LivePlatform, PlatformStatus } from "@/lib/liveStatus";

export interface PlatformButtonsProps {
  statusMap?: Partial<Record<LivePlatform, PlatformStatus>>;
}

interface PlatformLinkConfig {
  id: "twitch" | "youtube" | "tiktok" | "facebook";
  label: string;
  href: string;
  icon: React.ReactNode;
}

const PLATFORM_LINKS: PlatformLinkConfig[] = [
  {
    id: "youtube",
    label: "Se på YouTube",
    href: "https://youtube.com/@fjolsenbanden",
    icon: <Youtube className="h-5 w-5 text-red-500" />,
  },
  {
    id: "twitch",
    label: "Se på Twitch",
    href: "https://twitch.tv/fjolsenbanden",
    icon: <Twitch className="h-5 w-5 text-purple-500" />,
  },
  {
    id: "tiktok",
    label: "Se på TikTok",
    href: "https://tiktok.com/@fjolsenbanden",
    icon: <Smartphone className="h-5 w-5 text-pink-400" />,
  },
  {
    id: "facebook",
    label: "Se på Facebook Gaming",
    href: "https://facebook.com/fjolsenbanden",
    icon: <Facebook className="h-5 w-5 text-blue-500" />,
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
        const status = statusMap?.[platform.id as LivePlatform];

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
            {platform.icon}
            <span className="text-sm">{platform.label}</span>
            {getLiveBadge(status)}
          </motion.a>
        );
      })}
    </div>
  );
}

export default PlatformButtons;
