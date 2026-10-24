import { eq } from 'drizzle-orm';

const db = useDrizzle();

type UserInsertType = typeof tables.usersTable.$inferInsert;
type TransactionClient = Parameters<Parameters<typeof db.transaction>[0]>[0];

export const usersRepository = {
    createUser: async (data: UserInsertType) => {
        const result = await db
            .insert(tables.usersTable)
            .values(data)
            .onConflictDoNothing({ target: tables.usersTable.email })
            .returning();

        return result.length ? result[0] : null;
    },

    getUserById: async (id: UserDatabaseType['id']): Promise<UserDatabaseType | undefined> => (
        await db
            .select()
            .from(tables.usersTable)
            .where(eq(tables.usersTable.id, id))
            .get()
    ),

    getUserByEmail: async (email: UserDatabaseType['email']): Promise<UserDatabaseType | undefined> => (
        await db
            .select()
            .from(tables.usersTable)
            .where(eq(tables.usersTable.email, email))
            .get()
    ),

    isUserExistByEmail: async (email: UserDatabaseType['email']): Promise<boolean> => {
        const result = await db
            .select({ id: tables.usersTable.id })
            .from(tables.usersTable)
            .where(eq(tables.usersTable.email, email))
            .limit(1);

        return !!result.length;
    },

    deleteUserById: async (id: UserDatabaseType['id'], tx?: TransactionClient): Promise<boolean> => {
        const result = await (tx || db)
            .delete(tables.usersTable)
            .where(eq(tables.usersTable.id, id))
            .returning({ id: tables.usersTable.id });

        return result.length > 0;
    },
};
