import type { FastifyPluginAsync } from "fastify";
import { enqueueWatchPoll } from "../../../services/queue.js";

const queueRoutes: FastifyPluginAsync = async (app) => {
	app.post("/watch-poll/:watchId", async (request, reply) => {
		const { watchId } = request.params as { watchId: string };
		const result = await enqueueWatchPoll(watchId);
		return reply.code(202).send({ ok: true, job: result });
	});
};

export default queueRoutes;
