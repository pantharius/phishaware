import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './db/migrations',
  schema: './db/migration.ts',
  dbCredentials: {
    host: '127.0.0.1',
    port: 5555,
    database: 'phish_aware',
    user: 'postgres',
    password: 'postgres',
    ssl: false,
  },
});
