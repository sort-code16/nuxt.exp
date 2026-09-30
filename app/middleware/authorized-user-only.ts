/* function isAuthenticated() {
    return true;
} */

export default defineNuxtRouteMiddleware(async (/* to, from */) => {
    /* if (to.name === 'boards' && !isAuthenticated()) {
        return navigateTo('/boards/create');
    } */

    const { isLoggedIn, fetchUser } = useAuth();

    await fetchUser();

    if (!isLoggedIn.value) {
        return navigateTo('/login');
    }
});
