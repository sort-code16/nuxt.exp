import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '#server/database/schema';

const db = drizzle(process.env.DATABASE_URL!);

export function useDrizzle() {
    return db;
}

export const { boardsTable, usersTable } = schema;

export type UserDatabaseType = typeof usersTable.$inferSelect;
export type SafeUserDatabaseType = Omit<UserDatabaseType, 'password'>;

const checkSafeUserTypeConsistency: SafeUserDatabaseType extends SafeUserType
    ? SafeUserType extends SafeUserDatabaseType
        ? true
        : never
    : never = true;

// export type Board = typeof boardsTable.$inferSelect;
