import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";

describe("POST /api/v1/queue/watch-poll/:watchId", () => {
	const app = buildServer();

	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("returns 202 and watch-poll queue name", async () => {
		const res = await app.inject({
		method: "POST",
		url: "/api/v1/queue/watch-poll/test-watch-123"
		});

		expect(res.statusCode).toBe(202);

		const body = res.json() as {
		ok: boolean;
		job: { queue: string; watchId: string };
		};

		expect(body.ok).toBe(true);
		expect(body.job.queue).toBe("watch-poll");
		expect(body.job.watchId).toBe("test-watch-123");
	});
});
