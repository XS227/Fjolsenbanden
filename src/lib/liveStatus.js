import { fetchTwitchLiveStatus } from "./twitch";
import { fetchYoutubeLiveStatus } from "./youtube";
import { FJOLSEN_TWITCH_CHANNEL, FJOLSEN_TWITCH_CHANNEL_URL } from "./community";
const DEFAULT_CONFIG = {
    twitch: {
        channel: FJOLSEN_TWITCH_CHANNEL,
    },
};
function mergeConfig(config) {
    var _a;
    if (!config) {
        return DEFAULT_CONFIG;
    }
    return {
        twitch: (_a = config.twitch) !== null && _a !== void 0 ? _a : DEFAULT_CONFIG.twitch,
        youtube: config.youtube,
    };
}
export async function aggregateLiveStatus(options = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const { fetcher = fetch, config } = options;
    const resolvedConfig = mergeConfig(config);
    const statuses = [];
    const twitchConfig = resolvedConfig.twitch;
    if (twitchConfig === null || twitchConfig === void 0 ? void 0 : twitchConfig.channel) {
        try {
            const twitchStatus = await fetchTwitchLiveStatus(twitchConfig.channel, {
                clientId: (_b = (_a = twitchConfig.credentials) === null || _a === void 0 ? void 0 : _a.clientId) !== null && _b !== void 0 ? _b : "",
                accessToken: (_d = (_c = twitchConfig.credentials) === null || _c === void 0 ? void 0 : _c.accessToken) !== null && _d !== void 0 ? _d : "",
            }, fetcher);
            statuses.push({
                platform: "twitch",
                isLive: twitchStatus.isLive,
                title: twitchStatus.title,
                viewers: twitchStatus.viewers,
                startedAt: (_e = twitchStatus.startedAt) !== null && _e !== void 0 ? _e : null,
                thumbnailUrl: (_f = twitchStatus.thumbnailUrl) !== null && _f !== void 0 ? _f : null,
                url: (_g = twitchStatus.url) !== null && _g !== void 0 ? _g : FJOLSEN_TWITCH_CHANNEL_URL,
                note: twitchStatus.gameName ? `Spiller ${twitchStatus.gameName}` : undefined,
            });
        }
        catch (error) {
            statuses.push({
                platform: "twitch",
                isLive: false,
                url: FJOLSEN_TWITCH_CHANNEL_URL,
                error: error instanceof Error ? error.message : "Ukjent feil mot Twitch",
            });
        }
    }
    const youtubeConfig = resolvedConfig.youtube;
    if (youtubeConfig === null || youtubeConfig === void 0 ? void 0 : youtubeConfig.channelId) {
        try {
            const youtubeStatus = await fetchYoutubeLiveStatus(youtubeConfig.channelId, {
                apiKey: (_j = (_h = youtubeConfig.credentials) === null || _h === void 0 ? void 0 : _h.apiKey) !== null && _j !== void 0 ? _j : "",
            }, fetcher);
            statuses.push({
                platform: "youtube",
                isLive: youtubeStatus.isLive,
                title: youtubeStatus.title,
                viewers: youtubeStatus.viewers,
                startedAt: (_k = youtubeStatus.scheduledStartTime) !== null && _k !== void 0 ? _k : null,
                thumbnailUrl: (_l = youtubeStatus.thumbnailUrl) !== null && _l !== void 0 ? _l : null,
                url: youtubeStatus.url,
                note: youtubeStatus.description,
            });
        }
        catch (error) {
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
