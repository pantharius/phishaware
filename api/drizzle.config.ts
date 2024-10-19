import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  dialect: 'postgresql',
  out: './db/migrations',
  schema: './db/migration.ts',
  dbCredentials: {
    host: process.env.DB_HOSTNAME,
    port: +process.env.DB_PORT,
    database: process.env.DB_SCHEMA,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: false,
  },
});
