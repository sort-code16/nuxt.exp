<script setup lang="ts">
/* eslint-disable vue/no-v-html */
interface IIconProps {
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const { name, size = 'sm' } = defineProps<IIconProps>();

const modules = import.meta.glob('~/assets/icons/*.svg', {
    query: '?raw',
    import: 'default',
    eager: true,
});

const icon = computed(() => modules[`/assets/icons/${name}.svg`] || null);
</script>

<template>
    <span
        v-if="icon"
        :class="['nexp-icon', `nexp-icon--${size}`]"
        aria-hidden="true"
        v-html="icon"
    ></span>
</template>

<style scoped lang="scss">
.nexp-icon {
    display: inline-flex;
    vertical-align: text-bottom; // -0.125em;

    $sizes: ('xs': 12px, 'sm': 16px, 'md': 24px, 'xl': 36px, 'lg': 48px);

    @each $variant, $size in $sizes {
        &--#{$variant} {
            :deep(svg) {
                width: $size;
                height: $size;
            }
        }
    }
}
</style>
