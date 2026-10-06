<script setup lang="ts">
definePageMeta({
    middleware: 'guest-only',
});

const { errors, validateField, validateForm } = useFormValidation();
const { /* success, info, warning, */ danger } = useNotifications();

const formValidationConfig: IFormValidationConfig = {
    email: { schema: loginSchema.shape.email },
    password: { schema: loginSchema.shape.password },
};

const formData = reactive<LoginSchemaType>({
    email: '',
    password: '',
});

const loading = ref(false);

/* onMounted(() => {
    success('This is a success message', '200 - Success');
    success('This is a success message without title');
    danger('This is an error message with title', 'Error');
    danger('This is an error message without title but with auto-closing', null, 4000);
    info('This is an info message', 'Info');
    warning('This is a warning message', 'Warning');
    warning('This is a warning message without title but with auto-closing', null, 8000);
}); */

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

            <BaseButton label="Login" level="primary" :disabled="loading" />
        </form>

        <p>
            I have no account yet.
            <NuxtLink to="/register">Register</NuxtLink>
        </p>
    </section>
</template>

<style scoped lang="scss">
form {
    @media (width >= 576px) {
        width: 400px;
    }
}

p {
    line-height: 16px;
}
</style>
