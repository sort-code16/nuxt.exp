<template>
    <div class="app-alert">
        <slot />
    </div>
</template>

<style scoped>
.app-alert {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	background-color: rgb(from var(--nexp-red-6) r g b / .92);
    color: contrast-color(var(--nexp-red-6));
}
</style>