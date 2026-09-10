import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const boardsTable = sqliteTable('boards', {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
});

export const usersTable = sqliteTable('users', {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull().unique(),
    username: text().notNull(),
    password: text().notNull(),
});