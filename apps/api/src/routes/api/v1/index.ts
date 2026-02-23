import type { FastifyPluginAsync } from "fastify";
import watchesRoutes from "./watches.js";

const v1Routes: FastifyPluginAsync = async (app) => {
	app.get("/health", async () => {
		return { ok: true };
	});

	app.register(watchesRoutes, { prefix: "/watches" });
};

export default v1Routes;
