import { getTwitchStatus } from "@/lib/twitch";
import { FJOLSEN_TWITCH_CHANNEL } from "@/lib/community";
export default async function handler(_req, res) {
    var _a, _b, _c;
    try {
        const status = await getTwitchStatus(FJOLSEN_TWITCH_CHANNEL);
        res.status(200).json({
            live: Boolean(status),
            title: (_a = status === null || status === void 0 ? void 0 : status.title) !== null && _a !== void 0 ? _a : "Offline",
            viewers: (_b = status === null || status === void 0 ? void 0 : status.viewer_count) !== null && _b !== void 0 ? _b : 0,
            started_at: (_c = status === null || status === void 0 ? void 0 : status.started_at) !== null && _c !== void 0 ? _c : null,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: message });
    }
}
