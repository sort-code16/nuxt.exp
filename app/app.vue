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

const testToasts = [
    {
        id: '1',
        type: 'success',
        title: '200',
        message: 'This is a success toast',
        duration: 5000,
    },
    {
        id: '1',
        type: 'success',
        message: 'This is a success toast',
    },
    {
        id: '2',
        type: 'error',
        title: '500',
        message: 'This is an error toast',
        duration: 5000,
    },
    {
        id: '3',
        type: 'info',
        title: 'Info',
        message: 'This is an info toast',
        duration: 5000,
    },
    {
        id: '4',
        type: 'warning',
        title: 'Warning',
        message: 'This is a warning toast',
        duration: 5000,
    },
];
</script>

<template>
    <div class="app">
        <AppHeader @open-settings="() => console.log('Settings opened')" />

        <NuxtLayout>
            <NuxtPage />

            <template v-for="{ id, type, title, message, duration } in testToasts" :key="id">
                <BaseToast :id :type :title :message :duration closable />
            </template>
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
