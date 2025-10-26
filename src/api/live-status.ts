import { aggregateLiveStatus, AggregatedLiveStatus, LiveStatusConfig } from "@/lib/liveStatus";

export type LiveStatusResponse = AggregatedLiveStatus;

export async function getLiveStatus(config?: LiveStatusConfig): Promise<LiveStatusResponse> {
  return aggregateLiveStatus({ config });
}
