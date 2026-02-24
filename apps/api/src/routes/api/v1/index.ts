import type { FastifyPluginAsync } from "fastify";
import watchesRoutes from "./watches.js";
import queueRoutes from "./queue.js";


const v1Routes: FastifyPluginAsync = async (app) => {
	app.get("/health", async () => {
		return { ok: true };
	});

	app.register(watchesRoutes, { prefix: "/watches" });
	app.register(queueRoutes, { prefix: "/queue" });
};

export default v1Routes;
