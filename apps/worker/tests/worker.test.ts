import { describe, expect, it } from "vitest";
import { processWatch } from "../src/worker.js";

describe("processWatch", () => {
	it("returns processed response", async () => {
		const result = await processWatch({
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
		});

		expect(result).toEqual({ processed: true, name: "Bike alerts" });
	});
});
