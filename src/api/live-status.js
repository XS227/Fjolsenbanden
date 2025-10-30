import { aggregateLiveStatus } from "@/lib/liveStatus";
export async function getLiveStatus(config) {
    return aggregateLiveStatus({ config });
}
