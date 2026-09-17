<script setup>
const { toasts, removeToast } = useToasts();
</script>

<template>
    <div
        v-if="toasts.length"
        class="nexp-scrollbar app-toasts-container"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions removals"
        aria-label="Notifications"
    >
        <div
            v-for="{ id, type, title, message, duration } in toasts"
            :key="id"
        >
            <BaseToast
                :id
                :type
                :title
                :message
                :duration
                closable
                @close="removeToast"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-toasts-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: 400px;
    height: 100vh;
    max-height: 100vh;
    background-color: rgb(from var(--nexp-gray-5) r g b / .8);
    padding-block: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
