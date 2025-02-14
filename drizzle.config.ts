import "dotenv/config";
import { defineConfig } from "drizzle-kit";
// import fs from 'fs'
// import path from "path";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// const caPath = path.resolve(__dirname, 'certs', 'prod-ca-2021.crt');
// const ca = fs.readFileSync(caPath);
// console.log(ca.toString())

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // host: process.env.POSTGRES_HOST!,
    // port: process.env.POSTGRES_PORT!,
    // user: process.env.POSTGRES_USER!,
    // password: process.env.POSTGRES_PASSWORD!,
    // database: process.env.POSTGRES_DATABASE!,
    // ssl: {ca: ca.toString()}
  },
  schema: "./src/db/schema",
  out: "./src/db/migrations",
});
