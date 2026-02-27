import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { buildServer } from "../src/server.js";
import { prisma } from "../src/db/prisma.js";

describe("watches persistence", () => {
	const app = buildServer();

	beforeAll(async () => {
		await app.ready();
	});

	beforeEach(async () => {
		await prisma.watch.deleteMany();
	});

	afterAll(async () => {
		await app.close();
		await prisma.$disconnect();
	});

	it("creates a watch and returns queued job details", async () => {
		const res = await app.inject({
			method: "POST",
			url: "/api/v1/watches",
			payload: {
				name: "Bike alerts",
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
			}
		});

		expect(res.statusCode).toBe(201);

		const body = res.json() as {
			ok: boolean;
			data: { id: string; name: string; pollFrequencyMinutes: number };
			job: { queue: string; watchId: string };
		};

		expect(body.ok).toBe(true);
		expect(body.data.name).toBe("Bike alerts");
		expect(body.data.pollFrequencyMinutes).toBe(15);
		expect(body.job.queue).toBe("watch-poll");
		expect(body.job.watchId).toBe(body.data.id);
	});

	it("lists created watches", async () => {
		await prisma.watch.create({
			data: {
				name: "Kayak alerts",
				pollFrequencyMinutes: 30,
				queryDefinition: JSON.stringify({
					keywords: "kayak",
					includeTerms: [],
					excludeTerms: [],
					priceMin: null,
					priceMax: null,
					locationHint: null,
					feedUrl: "https://example.com/feed"
				})
			}
		});

		const res = await app.inject({
			method: "GET",
			url: "/api/v1/watches"
		});

		expect(res.statusCode).toBe(200);
		const body = res.json() as { ok: boolean; data: Array<{ name: string }> };
		expect(body.ok).toBe(true);
		expect(body.data.length).toBe(1);
		expect(body.data[0]?.name).toBe("Kayak alerts");
	});
});
