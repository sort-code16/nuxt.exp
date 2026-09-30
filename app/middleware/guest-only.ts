export default defineNuxtRouteMiddleware(async () => {
    const { isLoggedIn, fetchUser } = useAuth();

    await fetchUser();

    if (isLoggedIn.value) {
        return navigateTo('/');
    }
});
