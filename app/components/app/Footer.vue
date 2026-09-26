<script setup></script>

<template>
    <footer class="app-footer">
        <span class="app-footer__copyright">© 2026 nuxt.exp</span>

        <NuxtLink to="/login" custom v-slot="{ navigate }">
            <BaseButton type="button" @click="navigate">Login</BaseButton>
        </NuxtLink>
    </footer>
</template>

<style scoped lang="scss">
.app-footer {
    flex: 0 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    border-top: 4px solid #000;
}
</style>
