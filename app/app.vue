<script setup>
// const appConfig = useAppConfig();

// console.log('appConfig', appConfig);

useHead({
    titleTemplate: (pageTitle) => `%env ${pageTitle ? pageTitle + ' %separator %siteName': '%siteName'}`,
    htmlAttrs: {
        lang: 'en',
    },
});

const { data, pending, error } = useFetch('/api/v1/test', {
    // key: 'test-data',
    server: false,
    // lazy: true,
});
</script>

<template>
    <div class="app">
        <AppHeader @open-settings="() => console.log('Settings opened')" />

        <ClientOnly>
           <AppToastsContainer />
        </ClientOnly>

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

        <div class="app__test">
            <BaseCircleLoader v-if="pending" size="sm" />

            <AppAlert v-else-if="error">
                <span>{{ error.data.message }}</span>
            </AppAlert>

            <span v-else>{{ data?.test }}</span>
        </div>

        <AppFooter />
    </div>
</template>

<style scoped lang="scss">
.app {
    position: relative;
    min-height: 100vh;

    &__test {
        position: fixed;
        bottom: calc(60px + 8px);
        left: 8px;
    }
}
</style>
