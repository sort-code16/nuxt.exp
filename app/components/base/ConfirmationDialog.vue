<script setup>
const emit = defineEmits(['close']);

const props = defineProps({
    id: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    isConfirmationMode: {
        type: Boolean,
        default: false,
    },

    immediately: {
        type: Boolean,
        default: false,
    },

    isLoading: {
        type: Boolean,
        default: false,
    },
});

const dialog = ref(null);

const submitHandler = (event) => {
    if (props.immediately) return;

    event.preventDefault();

    if (!props.isLoading) {
        emit('close', event);
    }
};

const attrs = useAttrs();

console.log('attrs', attrs);

defineExpose({
    dialog,
});
</script>

<template>
    <dialog
        :id
        ref="dialog"
        class="nexp-scrollbar nexp-confirmation-dialog"
    >
        <div class="nexp-confirmation-dialog__header">
            <h3>{{ title }}</h3>
            <BaseButton command="close" :commandfor="id">x</BaseButton>
        </div>

        <div
            v-if="$slots.default"
            class="nexp-confirmation-dialog__content"
        >
            <slot />
        </div>

        <form
            class="nexp-confirmation-dialog__actions"
            :method="immediately ? 'dialog' : 'get'"
            @submit="submitHandler"
        >
            <BaseButton type="submit" value="cancel" :disabled="isLoading">
                {{ isConfirmationMode ? 'Cancel' : 'Close' }}
            </BaseButton>

            <template v-if="isConfirmationMode">
                <BaseButton
                    v-if="immediately"
                    type="submit"
                    level="primary"
                    value="confirm"
                >
                    Confirm
                </BaseButton>

                <div v-else class="nexp-confirmation-dialog__confirm-group">
                    <BaseCircleLoader v-if="isLoading" size="sm" />

                    <BaseButton
                        type="submit"
                        level="primary"
                        value="confirm"
                        :disabled="isLoading"
                    >
                        Confirm
                    </BaseButton>
                </div>
            </template>
        </form>
    </dialog>
</template>

<style scoped lang="scss">
.nexp-confirmation-dialog {
    max-width: calc(100% - 44px);
    max-height: calc(100% - 44px);
    padding-block: 24px;

    &__header {
        margin-bottom: 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: nowrap;
        gap: 16px;
    }

    &__content:not(:empty) {
        margin-bottom: 16px;
    }

    &__actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__confirm-group {
        display: inherit;
        align-items: inherit;
        flex-wrap: nowrap;
        gap: 8px;
    }
}
</style>