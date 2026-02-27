import { buildServer } from "./server.js";
import { prisma } from "./db/prisma.js";

let shuttingDown = false;

const start = async (): Promise<void> => {
	const app = buildServer();
	const port = Number(process.env.PORT ?? 3000);
	const host = process.env.HOST ?? "0.0.0.0";

	const shutdown = async (): Promise<void> => {
		if (shuttingDown) {
			return;
		}

		shuttingDown = true;
		await app.close();
		await prisma.$disconnect();
		process.exit(0);
	};

	try {
		await prisma.$connect();
		await app.listen({ port, host });
		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);
	} catch (error) {
		app.log.error(error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

start();
