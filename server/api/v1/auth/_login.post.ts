import { eq } from 'drizzle-orm';
import { usersTable } from '~~/server/db/schema';

// TODO: Upgrade
export default defineEventHandler(async (event) => {
    const { email, password } = await readBody(event);

    if (!(email && password)) {
        throw createError({
            statusCode: 400,
            message: 'Email and password must be provided in data body.',
        });
    }

    const db = useDrizzle();

    const user = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        // .limit(1) // TODO: Might be removed when checking of unique values will be done in register
        .get();

    // TODO: Combine both errors for better security
    if (!user) throw createError({
        statusCode: 404,
        message: 'Wrong email.',
    });

    if (!(verifyPassword(password, user.password))) {
        throw createError({
            statusCode: 401,
            message: 'Invalid password.',
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
