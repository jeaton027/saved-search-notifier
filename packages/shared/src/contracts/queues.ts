export const queueNames = {
	watchPoll: "watch-poll",
	notificationSend: "notification-send"
} as const;

export type WatchPollJobName = "watch-poll";

export type WatchPollJobData = { watchId: string; };

export type WatchPollJobResult = { 
	success: true;
	watchId: string;
};

