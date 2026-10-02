export default defineNuxtRouteMiddleware(async () => {
    const { isLoggedIn, fetchUser } = useAuth();

    if (import.meta.client) await fetchUser();

    if (isLoggedIn.value) {
        return navigateTo('/');
    }
});
