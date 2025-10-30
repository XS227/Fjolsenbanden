import { fetchTwitchLiveStatus, TwitchCredentials } from "./twitch";
import { fetchYoutubeLiveStatus, YoutubeCredentials } from "./youtube";
import { FJOLSEN_TWITCH_CHANNEL, FJOLSEN_TWITCH_CHANNEL_URL } from "./community";

export type LivePlatform = "twitch" | "youtube";

export interface PlatformStatus {
  platform: LivePlatform;
  isLive: boolean;
  title?: string;
  viewers?: number;
  url: string;
  thumbnailUrl?: string | null;
  startedAt?: string | null;
  note?: string;
  error?: string;
}

export interface AggregatedLiveStatus {
  updatedAt: string;
  statuses: PlatformStatus[];
}

export interface LiveStatusConfig {
  twitch?: {
    channel: string;
    credentials?: Partial<TwitchCredentials>;
  };
  youtube?: {
    channelId: string;
    credentials?: Partial<YoutubeCredentials>;
  };
}

export interface AggregateLiveStatusOptions {
  fetcher?: typeof fetch;
  config?: LiveStatusConfig;
}

const DEFAULT_CONFIG: LiveStatusConfig = {
  twitch: {
    channel: FJOLSEN_TWITCH_CHANNEL,
  },
};

function mergeConfig(config?: LiveStatusConfig): LiveStatusConfig {
  if (!config) {
    return DEFAULT_CONFIG;
  }

  return {
    twitch: config.twitch ?? DEFAULT_CONFIG.twitch,
    youtube: config.youtube,
  };
}

export async function aggregateLiveStatus(
  options: AggregateLiveStatusOptions = {}
): Promise<AggregatedLiveStatus> {
  const { fetcher = fetch, config } = options;
  const resolvedConfig = mergeConfig(config);
  const statuses: PlatformStatus[] = [];

  const twitchConfig = resolvedConfig.twitch;
  if (twitchConfig?.channel) {
    try {
      const twitchStatus = await fetchTwitchLiveStatus(
        twitchConfig.channel,
        {
          clientId: twitchConfig.credentials?.clientId ?? "",
          accessToken: twitchConfig.credentials?.accessToken ?? "",
        },
        fetcher
      );

      statuses.push({
        platform: "twitch",
        isLive: twitchStatus.isLive,
        title: twitchStatus.title,
        viewers: twitchStatus.viewers,
        startedAt: twitchStatus.startedAt ?? null,
        thumbnailUrl: twitchStatus.thumbnailUrl ?? null,
        url: twitchStatus.url ?? FJOLSEN_TWITCH_CHANNEL_URL,
        note: twitchStatus.gameName ? `Spiller ${twitchStatus.gameName}` : undefined,
      });
    } catch (error) {
      statuses.push({
        platform: "twitch",
        isLive: false,
        url: FJOLSEN_TWITCH_CHANNEL_URL,
        error: error instanceof Error ? error.message : "Ukjent feil mot Twitch",
      });
    }
  }

  const youtubeConfig = resolvedConfig.youtube;
  if (youtubeConfig?.channelId) {
    try {
      const youtubeStatus = await fetchYoutubeLiveStatus(
        youtubeConfig.channelId,
        {
          apiKey: youtubeConfig.credentials?.apiKey ?? "",
        },
        fetcher
      );

      statuses.push({
        platform: "youtube",
        isLive: youtubeStatus.isLive,
        title: youtubeStatus.title,
        viewers: youtubeStatus.viewers,
        startedAt: youtubeStatus.scheduledStartTime ?? null,
        thumbnailUrl: youtubeStatus.thumbnailUrl ?? null,
        url: youtubeStatus.url,
        note: youtubeStatus.description,
      });
    } catch (error) {
      statuses.push({
        platform: "youtube",
        isLive: false,
        url: `https://www.youtube.com/channel/${youtubeConfig.channelId}`,
        error: error instanceof Error ? error.message : "Ukjent feil mot YouTube",
      });
    }
  }

  return {
    updatedAt: new Date().toISOString(),
    statuses,
  };
}
