<script setup lang="ts">
const route = useRoute();
const { user, logout } = useAuth();

const isLoginPage = computed(() => route.path === '/login');
</script>

<template>
    <footer class="app-footer">
        <span class="app-footer__copyright">© 2026 nuxt.exp</span>

        <div v-if="user">
            <span class="nexp-me-2">Hi, {{ user.username }}!</span>

            <BaseButton type="button" level="reject" @click="logout">
                Logout
            </BaseButton>
        </div>

        <NuxtLink
            v-else
            :to="isLoginPage ? '/register' : '/login'"
            custom
            v-slot="{ navigate }"
        >
            <BaseButton type="button" level="link" @click="navigate">
                {{ isLoginPage ? 'Register' : 'Login' }}
            </BaseButton>
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
