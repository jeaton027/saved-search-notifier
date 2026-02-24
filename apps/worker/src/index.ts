import { Worker } from "bullmq";
import { 
	queueNames,
	type WatchPollJobData,
	type WatchPollJobResult,
	type WatchPollJobName
 } from "@saved-search/shared";
import { processWatchPollJob } from "./watch-poll-processor.js";

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

const watchPollWorker = new Worker<WatchPollJobData, WatchPollJobResult, WatchPollJobName>(
	queueNames.watchPoll,
	processWatchPollJob,
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
