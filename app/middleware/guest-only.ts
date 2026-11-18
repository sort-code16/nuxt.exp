export default defineNuxtRouteMiddleware(async (/* to, from */) => {
    const { isLoggedIn, fetchUser } = useAuth();

    // console.log('from', from);

    if (import.meta.client/* && !Object.hasOwn(to.query, 'redirect') */) {
        await fetchUser();
    }

    if (isLoggedIn.value) {
        return navigateTo('/');
    }
});
