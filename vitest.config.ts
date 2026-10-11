import { configDefaults } from 'vitest/config'
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        environment: 'nuxt',

        exclude: [
            ...configDefaults.exclude,
            '**/.nuxt/**',
            '**/.vscode/**',
            '**/dist/**',
            '.output/**',
            './drizzle/**',
        ],

        include: [
            '{app,server,shared}/**/*.{test,spec}.{ts,js}',
        ],
    },
});
