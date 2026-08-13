<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
        validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },

    level: {
        type: String,
        default: 'secondary',
        validator: (value) => ['primary', 'secondary'].includes(value),
    },

    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md'].includes(value),
    },
});
</script>

<template>
    <button
        :type="type"
        :class="['nexp-button', `nexp-button--${level}`, `nexp-button--${size}`]"
        @click="$emit('click', $event)"
    >
        <span class="nexp-button__label">
            <slot />
        </span>
    </button>
</template>

<style scoped lang="scss">
.nexp-button {
    padding: 4px 8px;
    color: var(--next-black-6, #000);
    border: 1px solid currentColor;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &--primary {
        border-color: var(--next-black-6, #000);
        background-color: var(--next-black-6, #000);
        color: contrast-color(var(--next-black-6, #000));
    }
}
</style>