import { drizzle } from 'drizzle-orm/better-sqlite3';
import type * as schema from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export function useDrizzle() {
    return db;
}

export type UserDatabaseType = typeof schema.usersTable.$inferSelect;
export type SafeUserDatabaseType = Omit<UserDatabaseType, 'password'>;

// export type Board = typeof schema.boardsTable.$inferSelect;
