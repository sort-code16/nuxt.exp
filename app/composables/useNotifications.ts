import type { IToastProps } from '~/components/base/Toast.vue';

interface IAddToastPayload {
    readonly id?: string;
    readonly type?: IToastProps['type'];
    readonly title?: string;
    readonly message: string;
    readonly duration?: number;
}

export default function useNotifications() {
    const notifications = useState<IToastProps[]>('app:notifications', () => []);

    const removeNotification = (id: IToastProps['id']) => {
        notifications.value = notifications.value.filter((toast) => toast.id !== id);
    };

    const addToast = (payload: IAddToastPayload) => {
        const toast = {
            id: payload.id ?? crypto.randomUUID(),
            type: payload.type ?? 'info',
            title: payload.title,
            message: payload.message,
            duration: payload.duration ?? 0,
        };

        notifications.value.push(toast);

        /* if (import.meta.client && toast.duration > 0) {
            setTimeout(() => removeNotification(toast.id), toast.duration);
        } */
    };

    const createNotification = (type: IToastProps['type']) => (
        (message: string, title?: string, duration?: number) => {
            addToast({ type, title, message, duration });
        }
    );

    return {
        notifications,
        removeNotification,

        success: createNotification('success'),
        danger: createNotification('error'),
        info: createNotification('info'),
        warning: createNotification('warning'),
    };
}
