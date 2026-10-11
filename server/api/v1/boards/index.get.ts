import { boardsTable } from '~~/server/db/schema';

export default defineEventHandler((event) => {
    if (!event.context.user) throw createError({
        status: 401,
        statusText: 'Unauthorized',
    });

    const boards = useDrizzle()
        .select()
        .from(boardsTable)
        .all();

    return {
        boards,
    }
});
