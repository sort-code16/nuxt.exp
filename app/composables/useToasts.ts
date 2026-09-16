export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface IAddToastPayload {
    id?: string;
    type?: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

export interface IToast extends Required<Pick<IAddToastPayload, 'id' | 'type' | 'message' | 'duration'>> {
    title?: string;
    createdAt: number;
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
            duration: payload.duration ?? 4000,
            createdAt: Date.now(),
        };

        toasts.value.push(toast);

        if (import.meta.client && toast.duration > 0) {
            setTimeout(() => removeToast(toast.id), toast.duration);
        }
    };

    const createToast = (type: ToastType) => (
        (message: string, title?: string, duration?: number) => {
            addToast({ type, title, message, duration });
        }
    );

    return {
        // toasts,
        // addToast,
        removeToast,

        success: createToast('success'),
        error: createToast('error'),
        info: createToast('info'),
        warning: createToast('warning'),
    };
}
