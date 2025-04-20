import { config } from "dotenv";
import { Pool } from "pg";
import { drizzle as drizzleProd } from "drizzle-orm/vercel-postgres";
import { drizzle as drizzleDev } from "drizzle-orm/node-postgres";

config({ path: ".env.local" });

const db =
  process.env.NODE_ENV === "development"
    ? drizzleDev(new Pool({ connectionString: process.env.POSTGRES_URL }))
    : drizzleProd();

export { db };