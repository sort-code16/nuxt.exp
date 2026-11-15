export default defineEventHandler(async (event) => {
    if (!event.context.user) return null;

    const { iat, exp, ...data } = event.context.user;

    let doesUserExist: boolean;

    try {
        doesUserExist = await usersRepository.isUserExistByEmail(data.email);
    } catch (error) {
        console.error(`[Turso crash at ${event.path}]: `, error);

        // throw error;

        throw createError({
            status: 500,
            statusText: 'Internal Server Error',
            message: 'An unexpected server error occurred.',
        });
    }

    if (!doesUserExist) {
        clearAuthCookie(event);

        return null;
    }

    return data;
});
