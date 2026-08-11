<script setup>
defineProps({
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value),
    },
});
</script>

<template>
    <div
        class="nexp-circle-loader"
        :class="`nexp-circle-loader--${size}`"
    ></div>
</template>

<style scoped lang="scss">
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.nexp-circle-loader {
    width: 28px;
    height: 28px;
    border: 4px solid var(--nexp-green-3, #eee);
    border-top-color: contrast-color(var(--nexp-green-3, #eee));
    border-radius: 50%;
    animation: spin 1s linear infinite;

    $sizes: (xs, 12px, 2px), (sm, 20px, 4px), (md, 28px, 4px), (lg, 36px, 6px);

    @each $variant, $size, $border-width in $sizes {
        &--#{$variant} {
            width: $size;
            height: $size;
            border-width: $border-width;
        }
    }
}
</style>