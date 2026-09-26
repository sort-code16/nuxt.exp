<script setup lang="ts">
interface IButtonProps {
    label?: string;
    level?: 'primary' | 'secondary' | 'tertiary';
}

const {
    label = '',
    level = 'tertiary',
} = defineProps<IButtonProps>();

interface IButtonEmits {
    click: [event: MouseEvent];
}

const emit = defineEmits<IButtonEmits>();
</script>

<template>
    <button
        :class="['nexp-button', `nexp-button--${level}`]"
        @click="emit('click', $event)"
    >
        <span v-if="label" class="nexp-button__label">
            {{ label }}
        </span>

        <slot v-else />
    </button>
</template>

<style scoped lang="scss">
.nexp-button {
    padding: 4px 8px;
    // transition: all .4s ease;

    &__label {
        text-wrap: nowrap;
    }

    &:disabled {
        opacity: .6;
        cursor: not-allowed;
    }

    &:hover,
    &:focus {
        outline: 2px solid #0000ff;
        outline-offset: 2px;
    }

    &--primary {
        background-color: #000;
        color: #fff;
    }

    &--secondary {
        background-color: #0000ff;
        color: #fff;
    }

    &--tertiary {
        color: #000;
        border: 1px solid currentColor;
    }
}
</style>
