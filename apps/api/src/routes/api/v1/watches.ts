import type { FastifyPluginAsync } from "fastify";
import { createWatchSchema, type WatchQueryDefinition } from "@saved-search/shared";
import { prisma } from "../../../db/prisma.js";
import { enqueueWatchPoll } from "../../../services/queue.js";

const parseQueryDefinition = (raw: string): WatchQueryDefinition =>
	createWatchSchema.shape.queryDefinition.parse(JSON.parse(raw));

const watchesRoutes: FastifyPluginAsync = async (app) => {
	app.post("/", async (request, reply) => {
		const parsed = createWatchSchema.safeParse(request.body);

		if (!parsed.success) {
			return reply.code(400).send({
				ok: false,
				errors: parsed.error.issues
			});
		}

		const watch = await prisma.watch.create({
			data: {
				name: parsed.data.name,
				pollFrequencyMinutes: parsed.data.pollFrequencyMinutes,
				queryDefinition: JSON.stringify(parsed.data.queryDefinition)
			}
		});

		const job = await enqueueWatchPoll(watch.id);

		return reply.code(201).send({
			ok: true,
			data: {
				...watch,
				queryDefinition: parseQueryDefinition(watch.queryDefinition)
			},
			job
		});
	});

	app.get("/", async (_request, reply) => {
		const watches = await prisma.watch.findMany({
			orderBy: { createdAt: "desc" }
		});

		return reply.code(200).send({
			ok: true,
			data: watches.map((watch) => ({
				...watch,
				queryDefinition: parseQueryDefinition(watch.queryDefinition)
			}))
		});
	});

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
