<script setup lang="ts">
import { BaseConfirmationDialog } from '#components'
import { FetchError } from 'ofetch';

type DialogInstance = InstanceType<typeof BaseConfirmationDialog>;

definePageMeta({
    middleware: 'authorized-user-only',
    title: 'Profile',
});

// if (import.meta.dev) console.log('dev');
// else console.log('else');

const { user } = useAuth();
const { success } = useNotifications();
const { errors, setErrorsToFields/* , validateField */ } = useFormValidation();

const passwordValidationConfig: IFieldValidationConfig = {
    schema: deleteProfileSchema.shape.password,
};

const deleteConfirmationDialogId = 'deleteAccountConfirmation';
const deleteConfirmationDialog = useTemplateRef<DialogInstance>(deleteConfirmationDialogId);

const formData = reactive<Omit<Required<RegisterSchemaType>, 'password'>>({
    email: '',
    username: '',
});

const isDeleting = ref(false);
const password = ref('');
const deleteConfirmationError = ref('');

const clearDeleteConfirmationError = () => deleteConfirmationError.value = '';
const clearPasswordError = () => errors.password = '';

const openDeleteConfirmation = () => {
    password.value = '';

    clearDeleteConfirmationError();
    clearPasswordError();
};

const closeDeleteConfirmation = () => {
    if (deleteConfirmationDialog.value) {
        deleteConfirmationDialog.value.dialog!.close();
    }
};

const closeDeleteConfirmationByAction = async (event: SubmitEvent) => {
    if (isDeleting.value) return;
    if (!(event.submitter instanceof HTMLButtonElement)) return;

    if (event.submitter.value === 'cancel') {
        closeDeleteConfirmation();

        return;
    }

    if (event.submitter.value !== 'confirm') return;
    // if (errors.password) return;

    clearDeleteConfirmationError();

    const validationResult = passwordValidationConfig.schema!.safeParse(password.value);

    if (!validationResult.success) {
        errors.password = validationResult.error.issues[0]!.message;

        return;
    }

    isDeleting.value = true;

    try {
        await $fetch('/api/v1/profile/delete', {
            method: 'POST',
            body: { password: password.value },
        });

        await navigateTo('/register');

        success(
            'Your account has been deleted. You\'re always welcome to come back anytime.',
            undefined,
            8000,
        );
    } catch (e) {
        if (e instanceof FetchError) {
            const fieldErrors = e.data?.data;

            if (e.status === 422 && fieldErrors) {
                setErrorsToFields(fieldErrors);

                return;
            }

            deleteConfirmationError.value = e.data?.message || e.message || 'An unexpected error occurred.';
        } else {
            console.error('Failed to delete account.', e);
        }
    } finally {
        isDeleting.value = false;
    }
};

onMounted(() => {
    if (!user.value) return;

    Object.assign(formData, user.value);
});
</script>

<template>
    <main class="page-form">
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
            :commandfor="deleteConfirmationDialogId"
            @click="openDeleteConfirmation"
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
            <BaseToast
                v-if="deleteConfirmationError"
                id="deleteConfirmationError"
                type="error"
                class="nexp-mb-4"
                :message="deleteConfirmationError"
                @close="clearDeleteConfirmationError"
            />

            <div class="nexp-mb-4">
                <p>This action cannot be undone.</p>
                <p>All your data, profile settings and history will be permanently deleted.</p>
            </div>

            <BaseFieldValidationWrapper :error="errors.password" v-slot="{ describedBy }">
                <!--
                    name="password"
                    @blur="validateField('password', $event, passwordValidationConfig)"
                -->

                <BaseTextField
                    v-model="password"
                    type="password"
                    label="Password:"
                    autocomplete="off"
                    hint="Enter your password to confirm"
                    required
                    :invalid="!!errors.password"
                    :aria-describedby="describedBy"
                    @input="clearPasswordError"
                />
            </BaseFieldValidationWrapper>
        </BaseConfirmationDialog>
    </main>
</template>

<style scoped lang="scss">
@use '~/assets/scss/page-form';

dialog {
    p {
        line-height: 18px;

        + p {
            margin-top: 4px;
        }
    }
}
</style>
