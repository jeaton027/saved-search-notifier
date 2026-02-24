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
