import { Worker } from "bullmq";
import { 
	queueNames,
	type WatchPollJobData,
	type WatchPollJobResult,
	type WatchPollJobName
 } from "@saved-search/shared";

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

const watchPollWorker = new Worker<WatchPollJobData, WatchPollJobResult, WatchPollJobName>(
	queueNames.watchPoll,
	async (job): Promise<WatchPollJobResult> => {
		const { watchId } = job.data;

		console.log("processing watch poll job", {
			jobId: job.id,
			queue: queueNames.watchPoll,
			watchId
		});

		return { success: true, watchId };
	},
	{
		connection: { url: redisUrl }
	}
);

watchPollWorker.on("completed", (job, result) => {
	console.log("watch poll job completed", { jobId: job.id, result });
});

watchPollWorker.on("failed", (job, err) => {
	console.error("watch poll job failed", { jobId: job?.id, error: err.message });
});

console.log("worker online", {
	queue: queueNames.watchPoll,
	redisUrl
});

/*
Temporary placeholder
import { processWatch } from "./worker.js";

const start = async (): Promise<void> => {
	const result = await processWatch({
		name: "bootstrap",
		pollFrequencyMinutes: 15,
		queryDefinition: {
		keywords: "bike",
		includeTerms: [],
		excludeTerms: [],
		priceMin: null,
		priceMax: null,
		locationHint: null,
		feedUrl: "https://example.com/feed"
		}
	});

	console.log("worker online", result);
};

start().catch((error) => {
	console.error(error);
	process.exit(1);
});

 */
