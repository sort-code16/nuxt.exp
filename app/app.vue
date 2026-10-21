<script setup>
// const appConfig = useAppConfig();

// console.log('appConfig', appConfig);

const { data, pending, error } = useFetch('/api/v1/test', {
    // key: 'test-data',
    // server: false,
    // lazy: true,
});
</script>

<template>
    <NuxtLayout>
        <div class="app">
            <AppHeader @open-settings="() => console.log('Settings opened')" />

            <ClientOnly>
                <AppNotifications />
            </ClientOnly>

            <NuxtLayout name="app-default">
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
    </NuxtLayout>
</template>

<style scoped lang="scss">
.app {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    height: 100svh;

    &__test {
        position: fixed;
        bottom: calc(60px + 8px);
        left: 8px;
    }
}
</style>
