<script setup lang="ts">
import type { NuxtError } from '#app';

interface IErrorPageProps {
    error: NuxtError;
}

defineProps<IErrorPageProps>();
</script>

<template>
    <div class="nexp-error-page">
        <BaseIcon name="circle-alert" size="xl" class="nexp-mb-3" />

        <h1 class="nexp-mb-3">
            Error {{ error?.status ?? 'Oops! Something went wrong.' }}
        </h1>

        <p class="nexp-mb-4">
            <span v-if="error?.message">{{ error.message }}</span>
            <span v-else-if="error?.statusText">{{ error.statusText }}</span>
            <span v-else>We encountered an unexpected error.</span>
        </p>

        <BaseButton type="button" @click="() => clearError({ redirect: '/' })">
            Clear error
        </BaseButton>
    </div>
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
