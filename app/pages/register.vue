<script setup lang="ts">
// import { z } from 'zod';
import type { IFormValidationConfig } from '~/composables/useFormValidation';

const { errors, validateField, validateForm } = useFormValidation();

const formValidationConfig: IFormValidationConfig = {
    email: {
        rules: [
            (value: string) => !value.endsWith('.ru') || 'The registration from .ru domains is not allowed.',
        ],

        schema: userRegisterSchema.shape.email,
    },

    password: {
        schema: userRegisterSchema.shape.password,
    },
};

const formData = reactive<UserRegisterSchema>({
    email: '',
    username: '',
    password: '',
});

// const validationErrors = ref<Record<string, string[] | undefined> | null>(null);

const register = async (event: Event) => {
    if (!validateForm(event, formValidationConfig)) return;

    /* validationErrors.value = null;

    const validationResult = userRegisterSchema.safeParse(formData);

    if (!validationResult.success) {
        validationErrors.value = z.flattenError(validationResult.error).fieldErrors;

        console.log('Validation errors:', validationErrors.value);

        return;
    } */

    try {
        const response = await $fetch('/api/v1/auth/register', {
            method: 'POST',
            body: formData,
        });

        console.log('Registration successful:', response);
    } catch (error) {
        console.error('Registration failed:', error);
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
                    <label for="email">Email:</label>

                    <input
                        v-model="formData.email"
                        type="email"
                        id="email"
                        name="email"
                        required
                        :aria-invalid="!!errors.email"
                        :aria-describedby="errors.email ? describedBy : undefined"
                        @blur="validateField('email', $event, formValidationConfig.email)"
                    />
                </BaseFieldValidationWrapper>
            </div>

            <div>
                <label for="username">Username:</label>

                <input
                    v-model="formData.username"
                    type="text"
                    id="username"
                />
            </div>

            <div>
                <BaseFieldValidationWrapper :error="errors.password" v-slot="{ describedBy }">
                    <label for="password">Password:</label>

                    <input
                        v-model="formData.password"
                        type="password"
                        id="password"
                        name="password"
                        required
                        :aria-invalid="!!errors.password"
                        :aria-describedby="errors.password ? describedBy : undefined"
                        @blur="validateField('password', $event, formValidationConfig.password)"
                    />
                </BaseFieldValidationWrapper>
            </div>

            <button type="submit">Register</button>
        </form>

        <p>
            Already have an account?
            <NuxtLink to="/login">Login</NuxtLink>
        </p>
    </div>
</template>
