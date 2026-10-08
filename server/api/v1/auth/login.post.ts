import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { usersTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
    const validatedBodyResult = await readValidatedBody(event, loginSchema.safeParse);

    if (!validatedBodyResult.success) {
        console.log('Login validation error: ', z.prettifyError(validatedBodyResult.error));

        throw createError({
            statusCode: 422, // 422 Unprocessable Entity
            statusMessage: 'Validation Error',
            message: 'Validation failed for the provided data.',
            data: z.flattenError(validatedBodyResult.error).fieldErrors,
        });
    }

    const { email, password } = validatedBodyResult.data;

    const db = useDrizzle();

    const user = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        // .limit(1) // TODO: doesn't need here because email is unique in the database (checked in register)
        .get();

    if (!user || !verifyPassword(password, user.password)) {
        throw createError({
            statusCode: 401,
            message: 'Wrong email or invalid password.',
        });
    }

    // delete all rows from the 'users' table
    // await db.delete(usersTable);

    const { password: _, ...data } = user;

    setAuthCookie(event, data);

    return {
        data,
    };
});
