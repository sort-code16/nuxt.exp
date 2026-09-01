import { boardsTable } from '~~/server/db/schema';

export default defineEventHandler(() => {
    const boards = useDrizzle()
        .select()
        .from(boardsTable)
        .all();

    return {
        boards,
    }
});