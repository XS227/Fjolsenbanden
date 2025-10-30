const TWITCH_API_BASE = "https://api.twitch.tv/helix";
function normaliseChannelName(channel) {
    return channel.trim().toLowerCase();
}
export async function fetchTwitchLiveStatus(channel, credentials, fetchFn = fetch) {
    var _a, _b, _c, _d, _e, _f;
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
    const response = await fetchFn(`${TWITCH_API_BASE}/streams?user_login=${encodeURIComponent(normalisedChannel)}`, {
        headers: {
            "Client-Id": clientId,
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (!response.ok) {
        throw new Error(`Twitch API responded with ${response.status}`);
    }
    const payload = (await response.json());
    const stream = (_a = payload.data) === null || _a === void 0 ? void 0 : _a[0];
    if (!stream) {
        return {
            isLive: false,
            url: `https://twitch.tv/${normalisedChannel}`,
        };
    }
    return {
        isLive: stream.type === "live",
        title: (_b = stream.title) !== null && _b !== void 0 ? _b : undefined,
        gameName: (_c = stream.game_name) !== null && _c !== void 0 ? _c : undefined,
        viewers: (_d = stream.viewer_count) !== null && _d !== void 0 ? _d : undefined,
        startedAt: (_e = stream.started_at) !== null && _e !== void 0 ? _e : undefined,
        thumbnailUrl: (_f = stream.thumbnail_url) === null || _f === void 0 ? void 0 : _f.replace("{width}", "1920").replace("{height}", "1080"),
        url: `https://twitch.tv/${normalisedChannel}`,
    };
}
export async function getTwitchStatus(channel) {
    var _a;
    const clientId = process.env.TWITCH_CLIENT_ID;
    const token = process.env.TWITCH_OAUTH_TOKEN;
    if (!clientId || !token) {
        throw new Error("Missing Twitch API credentials. Set TWITCH_CLIENT_ID and TWITCH_OAUTH_TOKEN.");
    }
    const res = await fetch(`${TWITCH_API_BASE}/streams?user_login=${encodeURIComponent(channel)}`, {
        headers: { "Client-ID": clientId, Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to fetch Twitch status (${res.status}): ${errorBody}`);
    }
    const data = await res.json();
    return data.data && data.data.length > 0 ? (_a = data.data[0]) !== null && _a !== void 0 ? _a : null : null;
}
