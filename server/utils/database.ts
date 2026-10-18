import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '#server/database/schema';

export const tables = schema;

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function useDrizzle() {
    if (!_db) {
        if (!process.env.DB_URL) {
            throw new Error('`DB_URL` not found in .env');
        }

        _db = drizzle({
            connection: {
                url: process.env.DB_URL,
                authToken: process.env.DB_TOKEN,
            },

            schema,
        });
    }

    return _db;
}

// export type BoardDatabaseType = typeof tables.boardsTable.$inferSelect;

export type UserDatabaseType = typeof tables.usersTable.$inferSelect;
export type SafeUserDatabaseType = Omit<UserDatabaseType, 'password'>;

const _checkSafeUserTypeConsistency: SafeUserDatabaseType extends SafeUserType
    ? SafeUserType extends SafeUserDatabaseType
        ? true
        : never
    : never = true;
