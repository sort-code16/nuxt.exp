// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/reset.css',
    '~/assets/scss/main.scss',
  ],
  app: {
    head: {
      templateParams: {
        env: '',
        siteName: 'nuxt.exp',
        separator: '-'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Tourney:ital,wght@0,100..900;1,100..900&display=swap' },
      ],
    },
  },
  $development: {
    app: {
      head: {
        templateParams: {
          env: '[DEV]',
        },
      },
    },
  },
})
