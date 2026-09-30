import { boardsTable } from '~~/server/db/schema';

export default defineEventHandler(event => {
    if (!event.context.user) throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
    });

    const boards = useDrizzle()
        .select()
        .from(boardsTable)
        .all();

    return {
        boards,
    }
});
