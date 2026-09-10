import { z } from 'zod';
import { hash } from 'bcrypt-ts';
import { userRegisterSchema } from '~~/shared/utils/userSchema';
import { usersTable } from '~~/server/db/schema';

export default defineEventHandler(async (event) => {
    const validatedBodyResult = await readValidatedBody(event, userRegisterSchema.safeParse);

    if (!validatedBodyResult.success) {
        console.log('Error: ', z.prettifyError(validatedBodyResult.error));

        throw createError({
            statusCode: 422, // 422 Unprocessable Entity
            statusMessage: 'Validation Error',
            message: 'Validation failed for the provided data.',
            data: z.flattenError(validatedBodyResult.error).fieldErrors,
        });
    }

    const { email, username, password } = validatedBodyResult.data;

    const name = username || email.split('@')[0];
    const hashedPassword = await hash(password, 8);
    const db = useDrizzle();

    const insertUserResult = await db
        .insert(usersTable)
        .values({
            email,
            username: name as string,
            password: hashedPassword,
        })
        .onConflictDoNothing({ target: usersTable.email })
        .returning();

    if (insertUserResult.length === 0) {
        throw createError({
            statusCode: 409, // 409 Conflict
            statusMessage: 'Conflict Error',
            message: 'User with this email already exists.',
        });
    }

    return {
        data: insertUserResult[0],
    };
});