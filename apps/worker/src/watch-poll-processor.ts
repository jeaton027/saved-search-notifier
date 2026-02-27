import type { Job } from "bullmq";
import {
	queueNames,
	type WatchPollJobData,
	type WatchPollJobName,
	type WatchPollJobResult
} from "@saved-search/shared";

/*
processWatchPollJob:
Takes a typed BullMQ job
Reads job.data.watchId
Logs jobId, queue name, and watchId
Returns { success: true, watchId }
*/
export const processWatchPollJob = async (
	job: Job<WatchPollJobData, WatchPollJobResult, WatchPollJobName>
): Promise<WatchPollJobResult> => {
	const { watchId } = job.data;

	console.log("processing watch poll job", {
		jobId: job.id,
		queue: queueNames.watchPoll,
		watchId
	});

	return { success: true, watchId };
};

