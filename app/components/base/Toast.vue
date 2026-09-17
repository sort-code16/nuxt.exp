<script setup lang="ts">
export interface IToast {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message: string;
    duration?: number;
}

interface IToastProps extends IToast {
    closable?: boolean;
}

const emit = defineEmits<{
    close: [id: IToastProps['id']];
}>();

const {
    id,
    type,
    title = '',
    message,
    duration = 0,
    closable = false,
} = defineProps<IToastProps>();
</script>

<template>
    <div
        :class="['nexp-toast', `nexp-toast--${type}`]"
        :role="type === 'error' ? 'alert' : 'status'"
        :aria-live="type === 'error' ? 'assertive' : 'polite'"
        aria-atomic="true"
    >
        <BaseButton
            v-if="closable"
            class="nexp-toast__close-btn"
            aria-label="Close notification"
            @click="emit('close', id)"
        >
            <span aria-hidden="true">x</span>
        </BaseButton>

        <h3 v-if="title">{{ title }}</h3>
        <p>{{ message }}</p>
    </div>
</template>

<style scoped lang="scss">
.nexp-toast {
    position: relative;
    min-width: 280px;
    max-width: 100%;
    padding: 12px 16px;
    border: 1px solid transparent;
    background-color: #fff;

    &--success {
        border-color: rgba(34, 197, 94, .4);
        background-color: rgba(34, 197, 94, .1);
    }

    &--error {
        border-color: rgba(239, 68, 68, .4);
        background-color: rgba(239, 68, 68, .08);
    }

    &--info {
        border-color: rgba(59, 130, 246, .35);
        background-color: rgba(59, 130, 246, .08);
    }

    &--warning {
        border-color: rgba(245, 158, 11, .35);
        background-color: rgba(245, 158, 11, .08);
    }

    &__close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
    }
}
</style>
