const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
export async function fetchYoutubeLiveStatus(channelId, credentials, fetchFn = fetch) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
    const trimmedChannelId = channelId.trim();
    if (!trimmedChannelId) {
        throw new Error("Missing YouTube channel id");
    }
    const { apiKey } = credentials;
    if (!apiKey) {
        return {
            isLive: false,
            url: `https://www.youtube.com/channel/${trimmedChannelId}`,
        };
    }
    const searchParams = new URLSearchParams({
        part: "snippet",
        channelId: trimmedChannelId,
        eventType: "live",
        type: "video",
        key: apiKey,
    });
    const searchResponse = await fetchFn(`${YOUTUBE_API_BASE}/search?${searchParams.toString()}`);
    if (!searchResponse.ok) {
        throw new Error(`YouTube API responded with ${searchResponse.status}`);
    }
    const searchPayload = (await searchResponse.json());
    const liveItem = (_a = searchPayload.items) === null || _a === void 0 ? void 0 : _a[0];
    const liveVideoId = (_b = liveItem === null || liveItem === void 0 ? void 0 : liveItem.id) === null || _b === void 0 ? void 0 : _b.videoId;
    if (!liveVideoId) {
        return {
            isLive: false,
            title: (_d = (_c = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : undefined,
            description: (_f = (_e = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _e === void 0 ? void 0 : _e.description) !== null && _f !== void 0 ? _f : undefined,
            thumbnailUrl: (_k = (_j = (_h = (_g = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _g === void 0 ? void 0 : _g.thumbnails) === null || _h === void 0 ? void 0 : _h.high) === null || _j === void 0 ? void 0 : _j.url) !== null && _k !== void 0 ? _k : (_o = (_m = (_l = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _l === void 0 ? void 0 : _l.thumbnails) === null || _m === void 0 ? void 0 : _m.default) === null || _o === void 0 ? void 0 : _o.url,
            url: `https://www.youtube.com/channel/${trimmedChannelId}`,
        };
    }
    const videosParams = new URLSearchParams({
        part: "snippet,liveStreamingDetails",
        id: liveVideoId,
        key: apiKey,
    });
    const videosResponse = await fetchFn(`${YOUTUBE_API_BASE}/videos?${videosParams.toString()}`);
    if (!videosResponse.ok) {
        throw new Error(`YouTube API responded with ${videosResponse.status}`);
    }
    const videoPayload = (await videosResponse.json());
    const video = (_p = videoPayload.items) === null || _p === void 0 ? void 0 : _p[0];
    const concurrentViewers = (_q = video === null || video === void 0 ? void 0 : video.liveStreamingDetails) === null || _q === void 0 ? void 0 : _q.concurrentViewers;
    const viewerCount = concurrentViewers ? Number.parseInt(concurrentViewers, 10) : undefined;
    return {
        isLive: true,
        title: (_u = (_s = (_r = video === null || video === void 0 ? void 0 : video.snippet) === null || _r === void 0 ? void 0 : _r.title) !== null && _s !== void 0 ? _s : (_t = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _t === void 0 ? void 0 : _t.title) !== null && _u !== void 0 ? _u : undefined,
        description: (_y = (_w = (_v = video === null || video === void 0 ? void 0 : video.snippet) === null || _v === void 0 ? void 0 : _v.description) !== null && _w !== void 0 ? _w : (_x = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _x === void 0 ? void 0 : _x.description) !== null && _y !== void 0 ? _y : undefined,
        viewers: Number.isNaN(viewerCount) ? undefined : viewerCount,
        scheduledStartTime: (_2 = (_0 = (_z = video === null || video === void 0 ? void 0 : video.liveStreamingDetails) === null || _z === void 0 ? void 0 : _z.actualStartTime) !== null && _0 !== void 0 ? _0 : (_1 = video === null || video === void 0 ? void 0 : video.liveStreamingDetails) === null || _1 === void 0 ? void 0 : _1.scheduledStartTime) !== null && _2 !== void 0 ? _2 : undefined,
        thumbnailUrl: (_18 = (_14 = (_10 = (_6 = (_5 = (_4 = (_3 = video === null || video === void 0 ? void 0 : video.snippet) === null || _3 === void 0 ? void 0 : _3.thumbnails) === null || _4 === void 0 ? void 0 : _4.maxres) === null || _5 === void 0 ? void 0 : _5.url) !== null && _6 !== void 0 ? _6 : (_9 = (_8 = (_7 = video === null || video === void 0 ? void 0 : video.snippet) === null || _7 === void 0 ? void 0 : _7.thumbnails) === null || _8 === void 0 ? void 0 : _8.high) === null || _9 === void 0 ? void 0 : _9.url) !== null && _10 !== void 0 ? _10 : (_13 = (_12 = (_11 = video === null || video === void 0 ? void 0 : video.snippet) === null || _11 === void 0 ? void 0 : _11.thumbnails) === null || _12 === void 0 ? void 0 : _12.medium) === null || _13 === void 0 ? void 0 : _13.url) !== null && _14 !== void 0 ? _14 : (_17 = (_16 = (_15 = liveItem === null || liveItem === void 0 ? void 0 : liveItem.snippet) === null || _15 === void 0 ? void 0 : _15.thumbnails) === null || _16 === void 0 ? void 0 : _16.high) === null || _17 === void 0 ? void 0 : _17.url) !== null && _18 !== void 0 ? _18 : undefined,
        url: `https://www.youtube.com/watch?v=${liveVideoId}`,
    };
}
