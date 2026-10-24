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
    const user = await usersRepository.getUserById(id);

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

    /* const db = useDrizzle();

    const isDeleted = await db.transaction(async (tx) => {
        return usersRepository.deleteUserById(id, tx);
    }); */

    const isDeleted = await usersRepository.deleteUserById(id);

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
