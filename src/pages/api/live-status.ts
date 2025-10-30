import { getTwitchStatus } from "@/lib/twitch";
import { FJOLSEN_TWITCH_CHANNEL } from "@/lib/community";

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
};

type ApiRequest = Record<string, unknown>;

export default async function handler(_req: ApiRequest, res: ApiResponse): Promise<void> {
  try {
    const status = await getTwitchStatus(FJOLSEN_TWITCH_CHANNEL);
    res.status(200).json({
      live: Boolean(status),
      title: status?.title ?? "Offline",
      viewers: status?.viewer_count ?? 0,
      started_at: status?.started_at ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
}
