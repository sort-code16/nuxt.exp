// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      title: '',
      titleTemplate: '%s - nuxt.exp',
    },
  },
  $development: {
    app: {
      head: {
        title: '',
        titleTemplate: '[DEV] %s - nuxt.exp',
      },
    },
  },
})
