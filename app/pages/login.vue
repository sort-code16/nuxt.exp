<script setup lang="ts">
import { FetchError } from 'ofetch';

definePageMeta({
    middleware: 'guest-only',
});

const { errors, validateField, validateForm, setErrorsToFields } = useFormValidation();
const { success, danger } = useNotifications();
const { login } = useAuth();

const formValidationConfig: IFormValidationConfig = {
    email: { schema: loginSchema.shape.email },
    password: { schema: loginSchema.shape.password },
};

const formData = reactive<LoginSchemaType>({
    email: '',
    password: '',
});

const loading = ref(false);

const submitForm = async (event: Event) => {
    /* const result = await $fetch.raw('/api/auth/login', {
        method: 'POST',
        body: formData,

        async onResponseError({ response }) {
            if (response.status === 401) {
                danger(response._data.message);

                return;
            }
        },
    });

    if (!result.ok) {
        danger('Failed to login.');
    } */

    if (loading.value) return;
    if (!validateForm(event, formValidationConfig)) return;

    loading.value = true;

    try {
        const { data: { username } } = await login(formData);

        success(
            `Hi, ${username}! You have successfully logged in.`,
            undefined,
            8000,
        );

        navigateTo('/');
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
        <h1 class="nexp-mb-4">Login</h1>

        <form class="nexp-mb-3" novalidate @submit.prevent="submitForm">
            <div class="nexp-mb-3">
                <BaseFieldValidationWrapper :error="errors.email" v-slot="{ describedBy }">
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
                <BaseButton label="Login" level="primary" :disabled="loading" />
                <BaseCircleLoader v-if="loading" size="sm" />
            </div>
        </form>

        <p>
            I have no account yet.
            <NuxtLink to="/register">Register</NuxtLink>
        </p>
    </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/page-form';
</style>
