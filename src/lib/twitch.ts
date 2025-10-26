const TWITCH_API_BASE = "https://api.twitch.tv/helix";

export interface TwitchCredentials {
  clientId: string;
  accessToken: string;
}

export interface TwitchLiveStatus {
  isLive: boolean;
  title?: string;
  gameName?: string;
  viewers?: number;
  startedAt?: string;
  thumbnailUrl?: string;
  url: string;
}

interface TwitchStreamResponse {
  data?: Array<{
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name?: string;
    type: string;
    title?: string;
    viewer_count?: number;
    started_at?: string;
    thumbnail_url?: string;
  }>;
}

function normaliseChannelName(channel: string): string {
  return channel.trim().toLowerCase();
}

export async function fetchTwitchLiveStatus(
  channel: string,
  credentials: TwitchCredentials,
  fetchFn: typeof fetch = fetch
): Promise<TwitchLiveStatus> {
  const normalisedChannel = normaliseChannelName(channel);

  if (!normalisedChannel) {
    throw new Error("Missing Twitch channel name");
  }

  const { clientId, accessToken } = credentials;

  if (!clientId || !accessToken) {
    return {
      isLive: false,
      url: `https://twitch.tv/${normalisedChannel}`,
    };
  }

  const response = await fetchFn(
    `${TWITCH_API_BASE}/streams?user_login=${encodeURIComponent(normalisedChannel)}`,
    {
      headers: {
        "Client-Id": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Twitch API responded with ${response.status}`);
  }

  const payload = (await response.json()) as TwitchStreamResponse;
  const stream = payload.data?.[0];

  if (!stream) {
    return {
      isLive: false,
      url: `https://twitch.tv/${normalisedChannel}`,
    };
  }

  return {
    isLive: stream.type === "live",
    title: stream.title ?? undefined,
    gameName: stream.game_name ?? undefined,
    viewers: stream.viewer_count ?? undefined,
    startedAt: stream.started_at ?? undefined,
    thumbnailUrl: stream.thumbnail_url?.replace("{width}", "1920").replace("{height}", "1080"),
    url: `https://twitch.tv/${normalisedChannel}`,
  };
}
