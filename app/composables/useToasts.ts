import type { IToast } from '~/components/base/Toast.vue';

interface IAddToastPayload {
    readonly id?: string;
    readonly type?: IToast['type'];
    readonly title?: string;
    readonly message: string;
    readonly duration?: number;
}

export default function useToasts() {
    const toasts = useState<IToast[]>('app:toasts', () => []);

    const removeToast = (id: IToast['id']) => {
        toasts.value = toasts.value.filter((toast) => toast.id !== id);
    };

    const addToast = (payload: IAddToastPayload) => {
        const toast = {
            id: payload.id ?? crypto.randomUUID(),
            type: payload.type ?? 'info',
            title: payload.title,
            message: payload.message,
            duration: payload.duration ?? 0,
        };

        toasts.value.push(toast);

        if (import.meta.client && toast.duration > 0) {
            setTimeout(() => removeToast(toast.id), toast.duration);
        }
    };

    const createToast = (type: IToast['type']) => (
        (message: string, title?: string, duration?: number) => {
            addToast({ type, title, message, duration });
        }
    );

    return {
        toasts,
        // addToast,
        removeToast,

        success: createToast('success'),
        error: createToast('error'),
        info: createToast('info'),
        warning: createToast('warning'),
    };
}
