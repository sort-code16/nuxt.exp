import { z } from 'zod';

export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        throw createError({
            status: 401,
            statusText: 'Unauthorized',
            message: 'Wrong credentials.', // authentication is required
        });
    }

    const validatedBodyResult = await readValidatedBody(event, deleteProfileSchema.safeParse);

    if (!validatedBodyResult.success) {
        throw createError({
            status: 422,
            statusText: 'Validation Error',
            message: 'Validation failed for the provided data.',
            data: z.flattenError(validatedBodyResult.error).fieldErrors,
        });
    }

    const { id } = event.context.user;

    let user;

    try {
        user = await usersRepository.getUserById(id);
    } catch (error) {
        console.error(`[Turso crash at ${event.path} (getting user by id)]: `, error);

        throw createError({
            status: 500,
            statusText: 'Internal Server Error',
            message: 'An unexpected server error occurred.',
        });
    }

    if (!user) {
        clearAuthCookie(event);

        throw createError({
            status: 401,
            statusText: 'Unauthorized',
            message: 'Wrong credentials.', // the authenticated account no longer exists
        });
    }

    if (!verifyPassword(validatedBodyResult.data.password, user.password)) {
        throw createError({
            status: 401,
            statusText: 'Unauthorized',
            message: 'Wrong credentials.', // the password is incorrect
        });
    }

    // const db = useDrizzle();

    let isDeleted: boolean;

    try {
        /* isDeleted = await db.transaction(async (tx) => {
            return usersRepository.deleteUserById(id, tx);
        }); */

        isDeleted = await usersRepository.deleteUserById(id);
    } catch (error) {
        console.error(`[Turso crash at ${event.path} (deleting user by id)]: `, error);

        throw createError({
            status: 500,
            statusText: 'Internal Server Error',
            message: 'An unexpected server error occurred.',
        });
    }

    clearAuthCookie(event);

    if (!isDeleted) {
        throw createError({
            status: 404,
            statusText: 'Not Found',
            message: 'User not found.',
        });
    }

    return {
        success: true,
    };
});
