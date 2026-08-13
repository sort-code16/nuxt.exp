<script setup>
defineProps({
    setRef: {
        type: Function,
        required: true,
    },
});
</script>

<template>
    <dialog
        :ref="setRef"
        class="nexp-dialog"
    >
        <slot />
    </dialog>
</template>

<style scoped lang="scss">
.nexp-dialog {}
</style>