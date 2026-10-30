export default defineEventHandler(async (event) => {
    if (!event.context.user) return null;

    const { iat, exp, ...data } = event.context.user;

    try {
        const doesUserExist = await usersRepository.isUserExistByEmail(data.email);

        if (!doesUserExist) {
            clearAuthCookie(event);

            return null;
        }

        return data;
    } catch (error) {
        console.error(`[Turso / API crash at ${event.path}]: `, error);

        throw error;
    }
});
