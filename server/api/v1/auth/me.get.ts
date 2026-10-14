export default defineEventHandler(async (event) => {
    if (!event.context.user) return null;

    const { iat, exp, ...data } = event.context.user;
    const doesUserExist = await usersHelpers.isUserExistByEmail(data.email);

    if (!doesUserExist) {
        clearAuthCookie(event);

        return null;
    }

    return data;
});
