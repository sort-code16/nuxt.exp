<script setup>
const route = useRoute();

// console.log('route', route);

useHead(() => ({
    ...(route.meta.title && { title: `${route.meta.title}` }),

    /* meta: [
        ...(route.meta.title ? [
            { property: 'og:title', content: `${route.meta.title}` },
        ] : []),

        ...(route.meta.description ? [
            { property: 'description', content: `${route.meta.description}` },
            { property: 'og:description', content: `${route.meta.description}` },
        ] : []),
    ], */

    bodyAttrs: {
        ...(route.name && { class: `${route.name}-page` }),
    },
}));
</script>

<template>
    <div class="nexp-scrollbar default-layout">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.default-layout {
    max-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
    background-color: var(--nexp-green-1);
    padding-block: 24px 40px;
}
</style>