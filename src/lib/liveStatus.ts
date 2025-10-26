const TWITCH_TOKEN_ENDPOINT = "https://id.twitch.tv/oauth2/token";
const TWITCH_STREAMS_ENDPOINT = "https://api.twitch.tv/helix/streams";

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
}

interface TwitchStreamsResponse {
  data: TwitchStream[];
}

interface CachedToken {
  token: string;
  expiresAt: number;
}

let cachedToken: CachedToken | null = null;

function getClientId(): string {
  const clientId = process.env.TWITCH_CLIENT_ID;
  if (!clientId) {
    throw new Error("Missing Twitch client id. Set TWITCH_CLIENT_ID in environment variables.");
  }
  return clientId;
}

function getClientSecret(): string {
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("Missing Twitch client secret. Set TWITCH_CLIENT_SECRET in environment variables.");
  }
  return clientSecret;
}

async function requestNewToken(): Promise<CachedToken> {
  const body = new URLSearchParams({
    client_id: getClientId(),
    client_secret: getClientSecret(),
    grant_type: "client_credentials",
  });

  const response = await fetch(TWITCH_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to retrieve Twitch token: ${response.status} ${message}`);
  }

  const payload = (await response.json()) as TwitchTokenResponse;
  const expiresAt = Date.now() + payload.expires_in * 1000 - 60_000;
  return {
    token: payload.access_token,
    expiresAt,
  };
}

async function getAppAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  cachedToken = await requestNewToken();
  return cachedToken.token;
}

async function fetchStreamData(channel: string, token: string): Promise<Response> {
  const url = new URL(TWITCH_STREAMS_ENDPOINT);
  url.searchParams.set("user_login", channel);

  return fetch(url.toString(), {
    headers: {
      "Client-Id": getClientId(),
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getTwitchStatus(channel: string): Promise<TwitchStream | null> {
  if (!channel) {
    throw new Error("Channel login is required to query Twitch status.");
  }

  const token = await getAppAccessToken();
  let response = await fetchStreamData(channel, token);

  if (response.status === 401) {
    cachedToken = null;
    const refreshedToken = await getAppAccessToken(true);
    response = await fetchStreamData(channel, refreshedToken);
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to fetch Twitch status: ${response.status} ${message}`);
  }

  const payload = (await response.json()) as TwitchStreamsResponse;
  return payload.data.length > 0 ? payload.data[0] : null;
}
