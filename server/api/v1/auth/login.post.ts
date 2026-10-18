import { eq } from 'drizzle-orm';
import { z } from 'zod';

export default defineEventHandler(async (event) => {
    const validatedBodyResult = await readValidatedBody(event, loginSchema.safeParse);

    if (!validatedBodyResult.success) {
        console.log('Login validation error: ', z.prettifyError(validatedBodyResult.error));

        throw createError({
            status: 422, // 422 Unprocessable Entity
            statusText: 'Validation Error',
            message: 'Validation failed for the provided data.',
            data: z.flattenError(validatedBodyResult.error).fieldErrors,
        });
    }

    const { email, password } = validatedBodyResult.data;

    const db = useDrizzle();

    const user = await db
        .select()
        .from(tables.usersTable)
        .where(eq(tables.usersTable.email, email))
        .limit(1)
        .get();

    if (!(user && verifyPassword(password, user.password))) {
        throw createError({
            status: 401,
            statusText: 'Unauthorized',
            message: 'Wrong credentials.',
        });
    }

    // delete all rows from the 'users' table
    // await db.delete(tables.usersTable);

    const { password: _, ...data } = user;

    setAuthCookie(event, data);

    return {
        data,
    };
});
