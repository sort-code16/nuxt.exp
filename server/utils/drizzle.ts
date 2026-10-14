import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export function useDrizzle() {
    return db;
}

export const { boardsTable, usersTable } = schema;

export type UserDatabaseType = typeof usersTable.$inferSelect;
export type SafeUserDatabaseType = Omit<UserDatabaseType, 'password'>;

// export type Board = typeof boardsTable.$inferSelect;
