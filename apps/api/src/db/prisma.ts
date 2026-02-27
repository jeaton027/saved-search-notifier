import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
	const currentDir = dirname(fileURLToPath(import.meta.url));
	const dbPath = resolve(currentDir, "../../prisma/dev.db");
	process.env.DATABASE_URL = `file:${dbPath}`;
}

export const prisma = new PrismaClient();
