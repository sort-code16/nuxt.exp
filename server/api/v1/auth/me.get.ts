export default defineEventHandler((event) => {
    // console.log('/me', event.context.user);

    if (!event.context.user) {
        return null;
    }

    const { iat, exp, ...data } = event.context.user;

    return data;
});
