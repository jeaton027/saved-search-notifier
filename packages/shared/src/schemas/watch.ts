import { z } from "zod";

export const watchQuerySchema = z.object({
	keywords: z.string().min(1),
	includeTerms: z.array(z.string().min(1)).default([]),
	excludeTerms: z.array(z.string().min(1)).default([]),
	priceMin: z.number().int().nonnegative().nullable().default(null),
	priceMax: z.number().int().nonnegative().nullable().default(null),
	locationHint: z.string().min(1).nullable().default(null),
	feedUrl: z.string().url()
});

export const createWatchSchema = z.object({
	name: z.string().min(1).max(100),
	pollFrequencyMinutes: z.number().int().min(5).max(1440),
	queryDefinition: watchQuerySchema
});

export const updateWatchSchema = createWatchSchema.partial();

export type WatchQueryDefinition = z.infer<typeof watchQuerySchema>;
export type CreateWatchInput = z.infer<typeof createWatchSchema>;
export type UpdateWatchInput = z.infer<typeof updateWatchSchema>;
