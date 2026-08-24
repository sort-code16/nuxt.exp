import { boardsTable } from '~~/server/db/schema';
import { useDrizzle } from '~~/server/utils/drizzle';

export default defineEventHandler(() => {
    const boards = useDrizzle()
        .select()
        .from(boardsTable)
        .all();

    return {
        boards,
    }
});