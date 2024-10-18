import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  email_code: varchar('email_code', { length: 6 }),
  email_verified_at: timestamp('email_verified_at'),
  firstname: varchar('firstname', { length: 255 }),
  lastname: varchar('lastname', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  phone_code: varchar('phone_code', { length: 6 }), // Code de validation téléphone
  address: varchar('address', { length: 255 }),
  credit_card_number: varchar('credit_card_number', { length: 16 }), // Numéro de carte bancaire
  credit_card_expiry: varchar('credit_card_expiry', { length: 5 }), // Expiration de la carte bancaire (MM/YY)
  credit_card_cvv: varchar('credit_card_cvv', { length: 3 }), // Code CVV
  created_at: timestamp('created_at').defaultNow().notNull(),
});
