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

    let user;

    try {
        user = await usersRepository.getUserByEmail(email);
    } catch (error) {
        console.error(`[Turso crash at ${event.path}]: `, error);

        throw createError({
            status: 500,
            statusText: 'Internal Server Error',
            message: 'An unexpected server error occurred.',
        });
    }

    if (!(user && verifyPassword(password, user.password))) {
        throw createError({
            status: 401,
            statusText: 'Unauthorized',
            message: 'Wrong credentials.',
        });
    }

    const { password: _, ...data } = user;

    setAuthCookie(event, data);

    return { data };
});
