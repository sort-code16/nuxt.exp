<template>
    <div class="default-layout">
        <slot />
    </div>
</template>

<style scoped>
.default-layout {
    overflow-y: auto;
    max-height: calc(100vh - 60px);
    min-height: calc(100vh - 60px); /* TODO: looks like `height` will be enough */
    background-color: var(--nexp-green-1);
	padding: 16px;
}
</style>