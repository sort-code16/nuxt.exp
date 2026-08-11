function isAuthenticated() {
    return true;
}

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.name === 'boards' && !isAuthenticated()) {
        return navigateTo('/boards/create');
    }

    if (!isAuthenticated()) return navigateTo('/');
});