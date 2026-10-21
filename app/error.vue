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
    <NuxtLayout class="nexp-error-page">
        <BaseIcon name="circle-alert" size="xl" class="nexp-mb-3" />

        <h1 class="nexp-mb-3">
            {{ error.status ?? 'Oops! Something went wrong.' }}
        </h1>

        <p class="nexp-mb-4">
            {{ error.message ?? 'We encountered an unexpected error.' }}
        </p>

        <BaseButton type="button" @click="() => clearError({ redirect: '/' })">
            Clear error
        </BaseButton>
    </NuxtLayout>
</template>

<style scoped lang="scss">
.nexp-error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    height: 100svh;
}
</style>
