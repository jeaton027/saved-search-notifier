import Fastify from "fastify";

export const buildServer = () => {
	const app = Fastify({ logger: true });

	app.get("/health", async () => {
		return { ok: true };
	});

	return app;
};
