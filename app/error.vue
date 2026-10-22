<script setup lang="ts">
import type { NuxtError } from '#app';

interface IErrorPageProps {
    error: NuxtError;
}

const props = defineProps<IErrorPageProps>();

useHead(() => ({
    title: `${props.error.status ?? 'Oops! Something went wrong.'}`,
}));
</script>

<template>
    <NuxtLayout>
        <main class="nexp-error-page">
            <h1>
                <BaseIcon name="circle-alert" size="xl" />
                <span>{{ error.status ?? 'Oops!' }}</span>
            </h1>

            <p>{{ error.message ?? 'Unexpected error.' }}</p>

            <BaseButton type="button" @click="() => clearError({ redirect: '/' })">
                Clear error
            </BaseButton>
        </main>
    </NuxtLayout>
</template>

<style scoped lang="scss">
.nexp-error-page {
    height: 100vh;
    height: 100svh;
    padding-inline: 16px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;

    h1 {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}
</style>
