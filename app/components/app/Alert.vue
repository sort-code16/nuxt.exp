<template>
    <div class="app-alert">
        <slot />
    </div>
</template>

<style scoped>
.app-alert {
    position: fixed;
    bottom: 16px;
    right: 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	background-color: var(--nexp-red-6);
    color: contrast-color(var(--nexp-red-6));
}
</style>