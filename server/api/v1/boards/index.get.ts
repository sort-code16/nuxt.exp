export default defineEventHandler(async (event) => {
    if (!event.context.user) {
        throw createError({
            status: 401,
            statusText: 'Unauthorized',
            message: 'Access Denied. Please sign in with an authorized account.',
        });
    }

    const boards = await useDrizzle()
        .select()
        .from(tables.boardsTable)
        .all();

    return {
        boards,
    }
});
