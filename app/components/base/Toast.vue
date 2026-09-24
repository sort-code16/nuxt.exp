<script setup lang="ts">
export interface IToastProps {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title?: string;
    message: string;
    duration?: number;
}

const {
    id,
    type,
    title = '',
    message,
    duration = 0,
} = defineProps<IToastProps>();

interface IToastEmits {
    close: [id: IToastProps['id']];
}

const emit = defineEmits<IToastEmits>();

let timeoutID: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
    if (duration > 0) {
        timeoutID = setTimeout(() => emit('close', id), duration);
    }
});

onUnmounted(() => {
    if (timeoutID) clearTimeout(timeoutID);
});
</script>

<template>
    <div
        :class="['nexp-toast', `nexp-toast--${type}`]"
        :role="type === 'error' ? 'alert' : 'status'"
        :aria-live="type === 'error' ? 'assertive' : 'polite'"
        aria-atomic="true"
    >
        <div
            v-if="duration > 0"
            class="nexp-toast__progress"
            :style="{ animationDuration: `${duration}ms` }"
            aria-hidden="true"
        ></div>

        <BaseButton
            v-else
            type="button"
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
@keyframes nexp-toast-progress-shrink {
    to { width: 0 }
}

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
        border-color: #008000;

        h3 {
            color: #008000;
        }
    }

    &--error {
        border-color: #ff0000;

        h3 {
            color: #ff0000;
        }
    }

    &--info {
        border-color: #0000ff;

        h3 {
            color: #0000ff;
        }
    }

    &--warning {
        border-color: #ffa500;

        h3 {
            color: #ffa500;
        }
    }

    &__progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #808080;
        animation: nexp-toast-progress-shrink linear forwards;
    }

    &__close-btn {
        position: absolute;
        top: 8px;
        right: 8px;
    }
}
</style>
