<script setup lang="ts">
useHead({
    titleTemplate: (pageTitle) => `%env ${pageTitle ? pageTitle + ' %separator %siteName' : '%siteName'}`,

    htmlAttrs: {
        lang: 'en',
    },
});
</script>

<template>
    <div class="nexp-default-layout">
        <slot />
    </div>
</template>
