import { Injectable } from '@nestjs/common';
import db from '../../db/db';
import { sql } from 'kysely';

@Injectable()
export class StatusRepository {
  async testDatabase() {
    try {
      await db
        .selectFrom(sql`information_schema.tables`.as('tables')) // Remplace par une table existante
        .select(sql`1`.as('result'))
        .limit(1)
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }
}
