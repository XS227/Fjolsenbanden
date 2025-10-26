const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export interface YoutubeCredentials {
  apiKey: string;
}

export interface YoutubeLiveStatus {
  isLive: boolean;
  title?: string;
  description?: string;
  viewers?: number;
  scheduledStartTime?: string;
  thumbnailUrl?: string;
  url: string;
}

interface YoutubeSearchResponse {
  items?: Array<{
    id?: { videoId?: string };
    snippet?: {
      title?: string;
      description?: string;
      liveBroadcastContent?: string;
      thumbnails?: Record<string, { url?: string }>;
    };
  }>;
}

interface YoutubeVideoResponse {
  items?: Array<{
    id?: string;
    liveStreamingDetails?: {
      actualStartTime?: string;
      scheduledStartTime?: string;
      concurrentViewers?: string;
    };
    snippet?: {
      title?: string;
      description?: string;
      thumbnails?: Record<string, { url?: string }>;
    };
  }>;
}

export async function fetchYoutubeLiveStatus(
  channelId: string,
  credentials: YoutubeCredentials,
  fetchFn: typeof fetch = fetch
): Promise<YoutubeLiveStatus> {
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

  const searchPayload = (await searchResponse.json()) as YoutubeSearchResponse;
  const liveItem = searchPayload.items?.[0];
  const liveVideoId = liveItem?.id?.videoId;

  if (!liveVideoId) {
    return {
      isLive: false,
      title: liveItem?.snippet?.title ?? undefined,
      description: liveItem?.snippet?.description ?? undefined,
      thumbnailUrl: liveItem?.snippet?.thumbnails?.high?.url ?? liveItem?.snippet?.thumbnails?.default?.url,
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

  const videoPayload = (await videosResponse.json()) as YoutubeVideoResponse;
  const video = videoPayload.items?.[0];

  const concurrentViewers = video?.liveStreamingDetails?.concurrentViewers;
  const viewerCount = concurrentViewers ? Number.parseInt(concurrentViewers, 10) : undefined;

  return {
    isLive: true,
    title: video?.snippet?.title ?? liveItem?.snippet?.title ?? undefined,
    description: video?.snippet?.description ?? liveItem?.snippet?.description ?? undefined,
    viewers: Number.isNaN(viewerCount) ? undefined : viewerCount,
    scheduledStartTime:
      video?.liveStreamingDetails?.actualStartTime ?? video?.liveStreamingDetails?.scheduledStartTime ?? undefined,
    thumbnailUrl:
      video?.snippet?.thumbnails?.maxres?.url ??
      video?.snippet?.thumbnails?.high?.url ??
      video?.snippet?.thumbnails?.medium?.url ??
      liveItem?.snippet?.thumbnails?.high?.url ??
      undefined,
    url: `https://www.youtube.com/watch?v=${liveVideoId}`,
  };
}
