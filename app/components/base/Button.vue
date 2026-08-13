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
        validator: (value) => ['primary', 'secondary', 'tertiary'].includes(value),
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
    color: var(--nexp-black-6, #000);
    border: 1px solid currentColor;
    transition: all .4s ease;

    &__label {
        text-wrap: nowrap;
    }

    &:disabled {
        opacity: .5;
        cursor: not-allowed;
    }

    &--primary {
        border-color: var(--nexp-black-6, #000);
        background-color: var(--nexp-black-6, #000);
        color: var(--nexp-green-2);

        &:hover,
        &:focus {
            color: #fff;
        }
    }

    &--tertiary {
        border-color: var(--nexp-blue-6, #333);
        background-color: var(--nexp-blue-6, #333);
        color: var(--nexp-green-2);

        &:hover,
        &:focus {
            color: #fff;
        }
    }
}
</style>