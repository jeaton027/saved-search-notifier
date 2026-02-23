export type AppErrorEnvelope = {
	error: {
		code: string;
		message: string;
		details?: unknown;
		requestID: string;
	};
};

export type CursorPage<T> = {
	data: T[];
	page: {
		nextCursor: string | null;
		limit: number;
	}
};