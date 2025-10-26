export interface TwitchStreamData {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids?: string[];
  is_mature: boolean;
}

export async function getTwitchStatus(channel: string): Promise<TwitchStreamData | null> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const token = process.env.TWITCH_OAUTH_TOKEN;

  if (!clientId || !token) {
    throw new Error("Missing Twitch API credentials. Set TWITCH_CLIENT_ID and TWITCH_OAUTH_TOKEN.");
  }

  const res = await fetch(`https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(channel)}`, {
    headers: { "Client-ID": clientId, Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to fetch Twitch status (${res.status}): ${errorBody}`);
  }

  const data: { data?: TwitchStreamData[] } = await res.json();
  return data.data && data.data.length > 0 ? data.data[0] ?? null : null;
}
