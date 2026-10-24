import { eq } from 'drizzle-orm';

type TransactionClient = Parameters<Parameters<typeof db.transaction>[0]>[0];

const db = useDrizzle();

export const usersRepository = {
    getUserById: async (id: UserDatabaseType['id']): Promise<UserDatabaseType | undefined> => (
        await db
            .select()
            .from(tables.usersTable)
            .where(eq(tables.usersTable.id, id))
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
