import { describe, expect, it } from "vitest";
import { createWatchSchema, watchQuerySchema } from "./watch.js";

describe("watch schemas", () => {
it("applies defaults for optional query fields", () => {
	const parsed = watchQuerySchema.parse({
	keywords: "bike",
	feedUrl: "https://example.com/feed"
	});

	expect(parsed.includeTerms).toEqual([]);
	expect(parsed.excludeTerms).toEqual([]);
	expect(parsed.priceMin).toBeNull();
	expect(parsed.priceMax).toBeNull();
	expect(parsed.locationHint).toBeNull();
});

it("rejects invalid input", () => {
	expect(() =>
	watchQuerySchema.parse({
		keywords: "bike",
		feedUrl: "not-a-url"
	})
	).toThrow();

	expect(() =>
	createWatchSchema.parse({
		name: "my watch",
		pollFrequencyMinutes: 1,
		queryDefinition: {
		keywords: "bike",
		feedUrl: "https://example.com/feed"
		}
	})
	).toThrow();
});
});
