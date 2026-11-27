// During SSR, load the user before route middleware checks auth and redirects.
export default defineNuxtPlugin(async () => {
    const { fetchUser } = useAuth();

    await fetchUser(true);
});
