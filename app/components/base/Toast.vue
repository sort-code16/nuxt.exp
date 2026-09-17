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
    padding-block: 10px;
    padding-inline: 16px 24px;
    border: 1px solid transparent;
    border-inline-start-width: 8px;
    background-color: #fff;

    h3 {
        margin-bottom: 4px;
    }

    &--success {
        border-color: var(--nexp-green-5);

        h3 {
            color: var(--nexp-green-5);
        }
    }

    &--error {
        border-color: var(--nexp-red-5);

        h3 {
            color: var(--nexp-red-5);
        }
    }

    &--info {
        border-color: var(--nexp-blue-5);

        h3 {
            color: var(--nexp-blue-5);
        }
    }

    &--warning {
        border-color: var(--nexp-orange-5);

        h3 {
            color: var(--nexp-orange-5);
        }
    }

    &__close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
    }
}
</style>
