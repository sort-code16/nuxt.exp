import { compare } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
import { usersTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);

    if (!(username && password)) {
        throw createError({
            statusCode: 400,
            message: 'Username and password must be provided in data body.',
        });
    }

    const db = useDrizzle();

    const user = db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, username))
        .limit(1) // TODO: Might be removed when checking of unique values will be done in register
        .get();

    if (!user) throw createError({
        statusCode: 404,
        message: 'User could not be found from the database with given username.',
    });

    if (!(await compare(password, user.password))) {
        throw createError({
            statusCode: 401,
            message: 'Invalid password.',
        });
    }

    // delete all rows from the 'users' table
    // await db.delete(usersTable);

    return {
        success: true,
    };
});