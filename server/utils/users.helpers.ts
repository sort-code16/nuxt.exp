import { eq } from 'drizzle-orm';

const db = useDrizzle();

export const usersHelpers = {
    isUserExistByEmail: async (email: UserDatabaseType['email']): Promise<boolean> => {
        const result = await db
            .select({ id: usersTable.id })
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);

        return !!result.length;
    },
};
