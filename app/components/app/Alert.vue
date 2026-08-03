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
	background-color: #c23b22;
    color: #fff;
}
</style>