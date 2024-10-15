import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Configuration PostgreSQL
const pool = new Pool({
  host: 'localhost',
  port: 5555,
  database: 'phish_aware',
  user: 'phishAwAreU5ld1m09',
  password: 'g4i9n12A3c#lTù+1f',
});

// Table "users"
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  step: varchar('step', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Créer la connexion à la base de données via Drizzle
export const db = drizzle(pool);
