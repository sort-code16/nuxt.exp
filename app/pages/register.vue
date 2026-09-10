<script setup lang="ts">
import { z } from 'zod';

const formData = reactive<UserRegisterSchema>({
    email: '',
    username: '',
    password: '',
});

const validationErrors = ref<Record<string, string[] | undefined> | null>(null);

const register = async () => {
    validationErrors.value = null;

    const validationResult = userRegisterSchema.safeParse(formData);

    if (!validationResult.success) {
        validationErrors.value = z.flattenError(validationResult.error).fieldErrors;

        console.log('Validation errors:', validationErrors.value);
        
        return;
    }

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

        <form @submit.prevent="register">
            <div>
                <label for="email">Email:</label>

                <input
                    v-model="formData.email"
                    type="email"
                    id="email"
                    required
                />

                <p v-if="validationErrors?.email">
                    {{ validationErrors.email.join('; ') }}
                </p>
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
                <label for="password">Password:</label>

                <input
                    v-model="formData.password"
                    type="password"
                    id="password"
                    required
                />

                <p v-if="validationErrors?.password">
                    {{ validationErrors.password.join('; ') }}
                </p>
            </div>

            <button type="submit">Register</button>
        </form>

        <p>
            Already have an account? 
            <NuxtLink to="/login">Login</NuxtLink>
        </p>
    </div>
</template>