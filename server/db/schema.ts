import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const boardsTable = sqliteTable('boards', {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
});