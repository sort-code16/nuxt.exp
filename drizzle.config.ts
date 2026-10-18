import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './server/database/migrations',
    schema: './server/database/schema.ts',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.DB_URL!,
        authToken: process.env.DB_TOKEN,
    },
});
