import { eq } from 'drizzle-orm';

const db = useDrizzle();

export const usersRepository = {
    isUserExistByEmail: async (email: UserDatabaseType['email']): Promise<boolean> => {
        const result = await db
            .select({ id: tables.usersTable.id })
            .from(tables.usersTable)
            .where(eq(tables.usersTable.email, email))
            .limit(1);

        return !!result.length;
    },
};
