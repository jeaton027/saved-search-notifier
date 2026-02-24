import { Queue } from "bullmq";
import { 
	queueNames,
	type WatchPollJobData,
	type WatchPollJobResult,
	type WatchPollJobName
} from "@saved-search/shared";

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

const watchPollQueue = new Queue<WatchPollJobData, WatchPollJobResult, WatchPollJobName>(
	queueNames.watchPoll,
	{
	connection: { url: redisUrl }
	}
);

export const enqueueWatchPoll = async (
	watchId: string
): Promise<{ queue: string; watchId: string; jobId: string | undefined }> => {
	const job = await watchPollQueue.add("watch-poll", { watchId });
	return { queue: queueNames.watchPoll, watchId, jobId: job.id };
};