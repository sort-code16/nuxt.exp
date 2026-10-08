<script setup lang="ts">
import { FetchError } from 'ofetch';
// import { z } from 'zod';

definePageMeta({
    middleware: 'guest-only',
});

const { errors, validateField, validateForm, setErrorsToFields } = useFormValidation();
const { register } = useAuth();
const { success, danger } = useNotifications();

const formValidationConfig: IFormValidationConfig = {
    email: {
        rules: [
            (value: string) => !value.endsWith('.ru') || 'The registration from .ru domains is not allowed.',
        ],

        schema: registerSchema.shape.email,
    },

    password: {
        schema: registerSchema.shape.password,
    },
};

const formData = reactive<RegisterSchemaType>({
    email: '',
    username: '',
    password: '',
});

const loading = ref(false);

// const validationErrors = ref<Record<string, string[] | undefined> | null>(null);

const submitForm = async (event: Event) => {
    if (loading.value) return;
    if (!validateForm(event, formValidationConfig)) return;

    /* validationErrors.value = null;

    const validationResult = registerSchema.safeParse(formData);

    if (!validationResult.success) {
        validationErrors.value = z.flattenError(validationResult.error).fieldErrors;

        console.log('Validation errors:', validationErrors.value);

        return;
    } */

    loading.value = true;

    try {
        const { data: { username } } = await register(formData);

        success(
            `${username}, your account has been created. You can now log in with your credentials.`,
            undefined,
            8000,
        );

        navigateTo('/login');
    } catch (e) {
        if (e instanceof FetchError) {
            const msg = e.data?.message || e.message || 'Something went wrong';

            if (!e.statusCode) {
                danger(msg);

                return;
            }

            const fieldErrors = e.data?.data;

            if (e.statusCode === 422 && fieldErrors) {
                setErrorsToFields(fieldErrors);

                return;
            }

            danger(msg, `${e.statusCode} - ${e.statusMessage}`);
        } else {
            // other system errors, like network issues, etc.
            console.log(e);
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <section>
        <h1 class="nexp-mb-4">Register</h1>

        <form class="nexp-mb-3" novalidate @submit.prevent="submitForm">
            <div class="nexp-mb-3">
                <!-- <BaseFieldValidationWrapper :error="validationErrors?.email?.join('; ') ?? ''">
                    <label for="email">Email:</label>

                    <input
                        v-model="formData.email"
                        type="email"
                        id="email"
                        required
                    />
                </BaseFieldValidationWrapper> -->

                <BaseFieldValidationWrapper :error="errors.email" v-slot="{ describedBy }">
                    <!-- <label for="email">Email:</label>

                    <input
                        v-model="formData.email"
                        type="email"
                        id="email"
                        name="email"
                        required
                        :aria-invalid="!!errors.email"
                        :aria-describedby="describedBy"
                        @blur="validateField('email', $event, formValidationConfig.email)"
                    /> -->

                    <BaseTextField
                        v-model="formData.email"
                        type="email"
                        label="Email:"
                        name="email"
                        autocomplete="on"
                        required
                        :invalid="!!errors.email"
                        :aria-describedby="describedBy"
                        @blur="validateField('email', $event, formValidationConfig.email)"
                    />
                </BaseFieldValidationWrapper>
            </div>

            <div class="nexp-mb-3">
                <!-- <label for="username">Username:</label>

                <input
                    v-model="formData.username"
                    type="text"
                    id="username"
                /> -->

                <!-- <BaseTextField
                    :model-value="formData.username"
                    @update:model-value="formData.username = $event"
                /> -->

                <BaseTextField
                    v-model="formData.username"
                    label="Username:"
                    hint="Leave blank to use your email prefix as username."
                />
            </div>

            <div class="nexp-mb-3">
                <BaseFieldValidationWrapper :error="errors.password" v-slot="{ describedBy }">
                    <BaseTextField
                        v-model="formData.password"
                        type="password"
                        label="Password:"
                        name="password"
                        required
                        :invalid="!!errors.password"
                        :aria-describedby="describedBy"
                        @blur="validateField('password', $event, formValidationConfig.password)"
                    />
                </BaseFieldValidationWrapper>
            </div>

            <div class="submit-btn-group">
                <BaseButton label="Register" level="primary" :disabled="loading" />
                <BaseCircleLoader v-if="loading" size="sm" />
            </div>
        </form>

        <p>
            Already have an account?
            <NuxtLink to="/login">Login</NuxtLink>
        </p>
    </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/page-form';
</style>
