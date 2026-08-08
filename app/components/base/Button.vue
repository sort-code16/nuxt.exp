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

    command: {
        type: [String, null],
        default: null,
    },

    commandFor: {
        type: [String, null],
        default: null,
    },

    disabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <button
        :type="type"
        :command="command"
        :commandfor="commandFor"
        :disabled="disabled"
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