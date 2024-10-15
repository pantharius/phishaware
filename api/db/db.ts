// lib/db.ts
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg'; // Utilisation du client PostgreSQL

// Types pour les tables de la base de données
interface Database {
  user: {
    id: number;
    email: string;
    name?: string;
    step: string;
    created_at: Date;
  };
  // D'autres tables ici si nécessaire
}

// Configuration de Kysely avec PostgreSQL
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: 'localhost',
      database: 'phish_aware',
      user: 'myuser',
      password: 'mypassword',
    }),
  }),
});

export default db;
