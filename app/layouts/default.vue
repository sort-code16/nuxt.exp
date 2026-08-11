<script setup>
const route = useRoute();

useHead({
    meta: [
        ...(route.meta.title ? [{ property: 'og:title', content: `${route.meta.title}` }] : []),
    ],
});
</script>

<template>
    <div class="default-layout">
        <slot />
    </div>
</template>

<style scoped>
.default-layout {
    overflow-y: auto;
    max-height: calc(100vh - 60px);
    height: calc(100vh - 60px);
    background-color: var(--nexp-green-1);
	padding: 16px;
}
</style>