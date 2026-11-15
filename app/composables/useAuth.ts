import { FetchError } from 'ofetch';

export default function useAuth() {
    const { danger } = useNotifications();

    const user = useState<SafeUserType | null>('auth:user', () => null);
    const loading = useState<boolean>('auth:loading', () => false);

    function clearUser() {
        user.value = null;
    }

    const fetchUser = async (strictCookieForwarding = false) => {
        // if (user.value) return;

        loading.value = true;

        try {
            // const { data } = await useFetch('/api/v1/auth/me');

            // user.value = data.value;

            user.value = await $fetch('/api/v1/auth/me', {
                // ...(strictCookieForwarding && { headers: useRequestHeaders(['cookie']) } as object | false || {}),
                ...(strictCookieForwarding
                    ? { headers: useRequestHeaders(['cookie']) }
                    : {}
                ),
            });
        } catch (e) {
            if (e instanceof FetchError) {
                if (import.meta.client) { // prevent double execution on hard reload, as this is called in both middleware and plugin
                    danger(
                        e.data?.message || e.message || 'An unexpected error occurred',
                        e.status ? `Error ${e.status}` : '',
                    );
                }
            }

            console.error('Error while getting data: ', e);
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

        return navigateTo('/login'); // , { replace: true }
    };

    // const deleteAccount = async (password: string) => {
    //     await $fetch('/api/v1/auth/delete-account', {
    //         method: 'POST',
    //         body: { password },
    //     });

    //     clearUser();
    // };

    return {
        user,
        loading,
        isLoggedIn: computed(() => !!user.value),

        fetchUser,
        login,
        register,
        logout,
        // deleteAccount,
    };
};
