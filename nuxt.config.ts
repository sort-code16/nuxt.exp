// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint'],

    $development: {
        app: {
            head: {
                templateParams: {
                    env: '[DEV]',
                },
            },
        },
    },

    devtools: { enabled: true },

    app: {
        head: {
            templateParams: {
                env: '',
                siteName: 'nuxt.exp',
                separator: '-',
            },

            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,100..900;1,100..900&display=swap' },
            ],
        },
    },

    css: [
        '~/assets/css/reset.css',
        '~/assets/scss/main.scss',
    ],

    devServer: {
        host: '0.0.0.0',
        port: 3000,
    },

    compatibilityDate: '2025-07-15',

    nitro: {
        experimental: {
            websocket: true,
        },
    },

    eslint: {
        config: {
            stylistic: true,
        },
    },
})
