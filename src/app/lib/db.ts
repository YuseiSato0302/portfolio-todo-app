import { config } from 'dotenv';
import { Pool } from 'pg';
import { drizzle as drizzleProd } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzleDev } from 'drizzle-orm/node-postgres';

// 環境変数を読み込む
const envFile = process.env.NODE_ENV === 'development' ? '.env.local' : '.env.production';
config({ path: envFile });

// データベース接続を初期化
const db = process.env.NODE_ENV === 'development'
  ? drizzleDev(new Pool({ connectionString: process.env.POSTGRES_URL }))
  : drizzleProd();

export { db };


