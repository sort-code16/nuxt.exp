export default defineEventHandler((event) => {
    const url = getRequestURL(event);

    if (url.pathname.startsWith('/ws/')) {
        const upgrade = getHeader(event, 'upgrade');

        if (upgrade !== 'websocket') {
            throw createError({
                status: 404,
                statusText: 'Page not found',
                message: `Page not found: ${url.pathname}`,
            });
        }
    }
});
