import { queueNames } from "@saved-search/shared";

export const enqueueWatchPoll = async (watchId: string): Promise<{ queue: string; watchId: string }> => {
	return { queue: queueNames.watchPoll, watchId };
};