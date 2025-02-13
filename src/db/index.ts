import { drizzle } from "drizzle-orm/node-postgres"

if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
}

export const db = drizzle(process.env.POSTGRES_URL);
