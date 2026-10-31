<script setup lang="ts">
interface IButtonProps {
    label?: string;
    level?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'reject';
    iconOnly?: boolean;
}

const {
    label = '',
    level = 'tertiary',
    iconOnly = false,
} = defineProps<IButtonProps>();

// interface IButtonEmits {
//     click: [event: MouseEvent];
// }

// const emit = defineEmits<IButtonEmits>();
</script>

<template>
    <!-- @click="emit('click', $event)" -->
    <button
        class="nexp-button"
        :class="[`nexp-button--${level}`, { 'nexp-button--icon-only': iconOnly }]"
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

    &:hover,
    &:focus-visible {
        // outline: 2px solid #00f;
        // outline-offset: 2px;
        outline: none;
        box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 2px rgb(0 0 0 / .4);
    }

    &:disabled {
        opacity: .6;
        cursor: not-allowed;

        &:hover,
        &:focus-visible {
            // outline: none;
            box-shadow: none;
        }
    }

    &--icon-only {
        padding: 3px 6px;
    }

    &--primary {
        background-color: #000;
        border: 1px solid #000;
        color: #fff;
    }

    &--secondary {
        background-color: #0f0;
        border: 1px solid #0f0;
        color: #fff;
    }

    &--link {
        color: #00f;
        border: 1px solid currentColor;
    }

    &--reject {
        color: #f00;
        border: 1px solid currentColor;
    }

    &--tertiary {
        color: #000;
        border: 1px solid currentColor;
    }
}
</style>
