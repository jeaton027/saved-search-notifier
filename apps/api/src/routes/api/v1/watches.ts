import type { FastifyPluginAsync } from "fastify";
import { createWatchSchema } from "@saved-search/shared";

const watchesRoutes: FastifyPluginAsync = async (app) => {
	app.post("/validate", async (request, reply) => {
		const parsed = createWatchSchema.safeParse(request.body);

		if (!parsed.success) {
		return reply.code(400).send({
			ok: false,
			errors: parsed.error.issues
		});
		}

		return reply.code(200).send({
		ok: true,
		data: parsed.data
		});
	});
};

export default watchesRoutes;
