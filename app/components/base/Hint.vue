<script setup lang="ts">
interface IHintedElementProps {
    text: string;
}

defineProps<IHintedElementProps>();

const id = useId();
</script>

<template>
    <span class="nexp-hinted-element">
        <span
            tabindex="0"
            :style="`anchor-name: --${id}`"
            :aria-describedby="id"
        >
            <slot />
        </span>

        <span
            class="nexp-hinted-element__hint"
            role="tooltip"
            :id
            :style="`position-anchor: --${id}`"
        >
            {{ text }}
        </span>
    </span>
</template>

<style scoped lang="scss">
.nexp-hinted-element {
    $self: &;

    &__hint {
        display: none;
        position: absolute;
        position-area: right;
        position-try-fallbacks: flip-inline;
        margin-inline-start: 4px;
        background-color: #fff;
        border: 1px dashed #000;
        padding: 2px 4px;
        text-align: start;
        // text-wrap: pretty;
        z-index: 1;

        font: {
            size: 12px;
            weight: 200;
        }
    }

    &:hover,
    // &:focus-visible,
    &:focus-within {
        #{$self}__hint {
            display: inherit;
        }
    }
}
</style>
