import type { CreateWatchInput } from "@saved-search/shared";

export const processWatch = async (job: CreateWatchInput): Promise<{ processed: true; name: string }> => {
	return { processed: true, name: job.name };
};
