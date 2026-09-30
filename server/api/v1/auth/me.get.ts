export default defineEventHandler((event) => {
    if (!event.context.user) return null;

    const { iat, exp, ...data } = event.context.user;

    return data;
});
