export const API_PREFIX = "/api/v1";

export const authRoutes = {
	register: '${API_PREFIX}/auth/register`',
	login: `${API_PREFIX}/auth/login`,
	refresh: `${API_PREFIX}/auth/refresh`,
	logout: `${API_PREFIX}/auth/logout`
} as const;

export const watchRoutes = {
	base: `${API_PREFIX}/watches`,
	byId: (id: string) => `${API_PREFIX}/watches/${id}`,
	matches: (id: string) => `${API_PREFIX}/watches/${id}/matches`,
	runs: (id: string) => `${API_PREFIX}/watches/${id}/runs`
} as const;

export const notificationRoutes = {
	base: `${API_PREFIX}/notifications`
} as const;