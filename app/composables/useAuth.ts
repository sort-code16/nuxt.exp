export default function useAuth() {
    const user = useState<SafeUserDatabaseType | null>('auth:user', () => null);
    const loading = useState<boolean>('auth:loading', () => false);

    function clearUser() {
        user.value = null;
    }

    const fetchUser = async (strictCookieForwarding = false) => {
        // if (user.value) return;

        loading.value = true;

        try {
            user.value = await $fetch('/api/v1/auth/me', {
                ...(strictCookieForwarding && {
                    headers: useRequestHeaders(['cookie']),
                }),
            });
        } catch (e) {
            console.log('Error while getting data about you', e);
            clearUser();
        } finally {
            loading.value = false;
        }
    };

    const login = async (credentials: LoginSchemaType) => {
        const response = await $fetch('/api/v1/auth/login', {
            method: 'POST',
            body: credentials,
        });

        user.value = response.data;

        return response;
    };

    const register = async (credentials: RegisterSchemaType) => {
        const response = await $fetch('/api/v1/auth/register', {
            method: 'POST',
            body: credentials,
        });

        // user.value = response.data;

        return response;
    };

    const logout = async () => {
        await $fetch('/api/v1/auth/logout', { method: 'POST' });

        clearUser();
        navigateTo('/login');
    };

    return {
        user,
        loading,
        isLoggedIn: computed(() => !!user.value),

        fetchUser,
        login,
        register,
        logout,
    };
};
