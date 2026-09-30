<script setup>
const { notifications, removeNotification } = useNotifications();
</script>

<template>
    <div
        v-if="notifications.length"
        class="nexp-scrollbar app-notifications"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions removals"
        aria-label="Notifications"
    >
        <div
            v-for="{ id, type, title, message, duration } in notifications"
            :key="id"
        >
            <BaseToast :id :type :title :message :duration @close="removeNotification" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-notifications {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: 400px;
    height: 100%;
    background-color: rgb(0 0 0 / .1);
    padding-block: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
