<script setup></script>

<template>
    <footer class="app-footer">
        <span class="app-footer__copyright">© 2026 nuxt.exp</span>
        
        <NuxtLink to="/login" custom v-slot="{ navigate }">
            <BaseButton @click="navigate">Login</BaseButton>
        </NuxtLink>
    </footer>
</template>

<style scoped lang="scss">
.app-footer {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background-color: var(--nexp-green-2);
    border-top: 4px solid var(--nexp-blue-6);
}
</style>