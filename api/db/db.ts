import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg'; // Utilisation du client PostgreSQL
import { DB } from './schema';
import 'dotenv/config';

// Configuration de Kysely avec PostgreSQL
const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOSTNAME,
      port: +process.env.DB_PORT,
      database: process.env.DB_SCHEMA,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    }),
  }),
});

export default db;
