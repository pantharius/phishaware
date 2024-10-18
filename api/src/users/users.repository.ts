import { Injectable } from '@nestjs/common';
import db from '../../db/db'; // Connexion Kysely

@Injectable()
export class UsersRepository {
  async createUser(email: string, code: string) {
    const [user] = await db
      .insertInto('users')
      .values({
        email,
        email_code: code,
      })
      .returningAll()
      .execute();
    return user;
  }

  async updateUser(id: any, updates: Partial<any>) {
    const [updatedUser] = await db
      .updateTable('users')
      .set(updates)
      .where('id', '=', id)
      .returningAll()
      .execute();

    return updatedUser;
  }

  async getUserByEmail(email: string) {
    return await db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
  }

  async getUserById(id: any) {
    return await db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }
}
