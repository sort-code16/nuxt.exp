<script setup lang="ts">
import { BaseConfirmationDialog } from '#components'

type DialogInstance = InstanceType<typeof BaseConfirmationDialog>;

definePageMeta({
    middleware: 'authorized-user-only',
    title: 'Profile',
});

// if (import.meta.dev) console.log('dev');
// else console.log('else');

const { user } = useAuth();

const deleteConfirmationDialogId = 'deleteAccountConfirmation';
const deleteConfirmationDialog = useTemplateRef<DialogInstance>(deleteConfirmationDialogId);
const isDeleting = ref(false);

const formData = reactive<Omit<Required<RegisterSchemaType>, 'password'>>({
    email: '',
    username: '',
});

// const submitForm = async (event: Event) => {};

const closeDeleteConfirmation = () => {
    if (deleteConfirmationDialog.value) {
        deleteConfirmationDialog.value.dialog!.close();
    }
};

const closeDeleteConfirmationByAction = event => {
    // console.log('event', event);

    if (event.submitter.value === 'cancel') {
        closeDeleteConfirmation();

        return;
    }

    if (event.submitter.value === 'confirm') {
        isDeleting.value = true;

        setTimeout(() => {
            closeDeleteConfirmation();

            isDeleting.value = false;
        }, 3000);
    }
};

onMounted(() => {
    if (!user.value) return;

    Object.assign(formData, user.value);
});
</script>

<template>
    <section class="page-form">
        <h1 class="nexp-mb-4">Profile</h1>

        <form class="nexp-mb-4" novalidate @submit.prevent="() => {}">
            <div class="nexp-mb-3">
                <BaseTextField
                    v-model="formData.email"
                    type="email"
                    label="Email:"
                    name="email"
                    autocomplete="email"
                    required
                    readonly
                />
            </div>

            <div class="nexp-mb-3">
                <BaseTextField
                    v-model="formData.username"
                    label="Username:"
                    name="username"
                    autocomplete="username"
                    required
                    readonly
                />
            </div>
        </form>

        <BaseButton
            type="button"
            level="reject"
            command="show-modal"
            commandfor="deleteAccountConfirmation"
        >
            Delete account
        </BaseButton>

        <BaseConfirmationDialog
            :ref="deleteConfirmationDialogId"
            :id="deleteConfirmationDialogId"
            :isLoading="isDeleting"
            isConfirmationMode
            title="Are you sure you want to delete your account?"
            @close="closeDeleteConfirmationByAction"
        >
            <p>This action cannot be undone.</p>
            <p>All your data, profile settings, and history will be permanently deleted.</p>
        </BaseConfirmationDialog>
    </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/page-form';
</style>
