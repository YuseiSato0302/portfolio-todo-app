import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env.production';
// console.log('Loading environment variables from:', envFile);
config({ path: envFile });
// console.log('POSTGRES_URL:', process.env.POSTGRES_URL);


export default defineConfig({
  schema: "./src/app/db/schema.ts",
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});