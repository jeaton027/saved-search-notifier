import Fastify from "fastify";
import v1Routes from "./routes/api/v1/index.js";

export const buildServer = () => {
	const app = Fastify({ logger: true });

	// app.get("/health", async () => {
	// 	return { ok: true };
	// });
	app.register(v1Routes, { prefix: "/api/v1" });

	return app;
};
