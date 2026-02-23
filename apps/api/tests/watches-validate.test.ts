import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";

describe("POST /api/v1/watches/validate", () => {
	const app = buildServer();

	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("accepts valid payload", async () => {
		const res = await app.inject({
		method: "POST",
		url: "/api/v1/watches/validate",
		payload: {
			name: "Bike alerts",
			pollFrequencyMinutes: 15,
			queryDefinition: {
			keywords: "bike",
			feedUrl: "https://example.com/feed"
			}
		}
		});

		expect(res.statusCode).toBe(200);
		expect(res.json().ok).toBe(true);
	});

	it("rejects invalid payload", async () => {
		const res = await app.inject({
		method: "POST",
		url: "/api/v1/watches/validate",
		payload: {
			name: "Bike alerts",
			pollFrequencyMinutes: 1,
			queryDefinition: {
			keywords: "bike",
			feedUrl: "not-a-url"
			}
		}
		});

		expect(res.statusCode).toBe(400);
		expect(res.json().ok).toBe(false);
	});
});
