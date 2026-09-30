export default defineNuxtPlugin(async () => {
    const { user, fetchUser } = useAuth();

    // TODO: Think how to get user data via GET /auth/me without additional `strictCookieForwarding` flag
    await fetchUser(true);

    console.log('user-to-state.server was called', user.value);
});
