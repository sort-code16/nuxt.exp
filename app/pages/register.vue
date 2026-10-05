<script setup lang="ts">
import { FetchError } from 'ofetch';
// import { z } from 'zod';

definePageMeta({
    middleware: 'guest-only',
});

const { errors, validateField, validateForm } = useFormValidation();
const { register: makeRequest } = useAuth();
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

const register = async (event: Event) => {
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
        const { data: { username } } = await makeRequest(formData);

        success(`${username}, your account has been created`);
        navigateTo('/');
    } catch (e) {
        /* if (e instanceof FetchError && e.data?.validationErrors) {
            errors.value = e.data.validationErrors;

            return;
        } */

        /* if (e instanceof FetchError && e.data?.errors) {
            errors.value = e.data.errors;

            return;
        } */

        /* if (e instanceof FetchError && e.data?.message) {
            danger(e.data.message, `${e.statusCode} - ${e.statusMessage}`);

            return;
        } */

        if (e instanceof FetchError) {
            // console.log(e.statusCode);
            // console.log(e.statusMessage);

            // the data which server returns in the response body (validation errors, error messages, etc.)
            // console.log(e.data);

            const msg = e.data?.message || e.message || 'Something wrong';

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
    <div>
        <h1>Register</h1>

        <form novalidate @submit.prevent="register">
            <div>
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

            <div>
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

            <div>
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

            <BaseButton label="Register" level="primary" :disabled="loading" />
        </form>

        <p>
            Already have an account?
            <NuxtLink to="/login">Login</NuxtLink>
        </p>
    </div>
</template>
