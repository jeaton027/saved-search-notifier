import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { Queue, QueueEvents, Worker } from "bullmq";
import {
	queueNames,
	type WatchPollJobData,
	type WatchPollJobName,
	type WatchPollJobResult
} from "@saved-search/shared";
import { processWatchPollJob } from "../src/watch-poll-processor.js";

const redisUrl = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";
const queueName = `${queueNames.watchPoll}-test-${randomUUID()}`;

const queue = new Queue<WatchPollJobData, WatchPollJobResult, WatchPollJobName>(queueName, {
	connection: { url: redisUrl }
});

const queueEvents = new QueueEvents(queueName, {
	connection: { url: redisUrl }
});

let seenWatchId: string | undefined;

const worker = new Worker<WatchPollJobData, WatchPollJobResult, WatchPollJobName>(
	queueName,
	async (job) => {
		const result = await processWatchPollJob(job);
		seenWatchId = result.watchId;
		return result;
	},
	{
		connection: { url: redisUrl }
	}
);

afterAll(async () => {
	await worker.close();
	await queueEvents.close();
	await queue.close();
});

describe("watch-poll worker", () => {
	it("accepts job payload and runs processor", async () => {
		await queueEvents.waitUntilReady();

		const job = await queue.add("watch-poll", { watchId: "test-watch-001" });
		const result = await job.waitUntilFinished(queueEvents);

		expect(seenWatchId).toBe("test-watch-001");
		expect(result).toEqual({ success: true, watchId: "test-watch-001" });
	});
});
