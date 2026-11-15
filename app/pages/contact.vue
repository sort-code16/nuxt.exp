<script setup lang="ts">
import { FetchError } from 'ofetch';
import { z } from 'zod';

definePageMeta({
    title: 'Contact us',
});

const MESSAGE_MAX_LENGTH = 512;

const { public: { formSubmitLink, supportAddress } } = useRuntimeConfig();
const { errors, validateField, validateForm } = useFormValidation();
const { success, danger } = useNotifications();

const formSchema = z.strictObject({
    email: loginSchema.shape.email,

    message: z
        .string()
        .min(10, 'Message must be at least 10 characters long.')
        .max(MESSAGE_MAX_LENGTH, `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters.`),
});

type formDataType = z.infer<typeof formSchema>;

const formValidationConfig: IFormValidationConfig = {
    email: { schema: formSchema.shape.email },
    message: { schema: formSchema.shape.message },
};

const directLinkParams = new URLSearchParams({
    subject: 'From direct link on nuxt.exp',
    // email: '',
});

const directLink = `https://formsubmit.co/el/yupohi?${directLinkParams.toString()}`;

const getSubmitLink = () => `https://formsubmit.co/ajax/${formSubmitLink || supportAddress}`;
const getDefaultData = () => ({ email: '', message: '' });

const formData = reactive<formDataType>(getDefaultData());

const loading = ref(false);

const submitForm = async (event: Event) => {
    if (loading.value) return;
    if (!validateForm(event, formValidationConfig)) return;

    loading.value = true;

    try {
        await $fetch(getSubmitLink(), {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },

            body: {
                ...formData,

                _subject: 'From "Contact us" on nuxt.exp',
                _template: 'table',

                // _next: `${window.location.origin}/contact?success=true`,
            },
        })

        success(
            'You have successfully sent your message.',
            undefined,
            3000,
        );

        Object.assign(formData, getDefaultData()); // clear the form after successful submission
    } catch (e) {
        if (e instanceof FetchError) {
            danger(e.message || 'Something went wrong.');

            return;
        }

        console.error(e); // other system errors, like network issues, etc.
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <main class="page-form">
        <h1 class="nexp-mb-4">Contact us</h1>

        <form class="nexp-mb-3" novalidate @submit.prevent="submitForm">
            <div class="nexp-mb-3">
                <BaseFieldValidationWrapper :error="errors.email" v-slot="{ describedBy }">
                    <BaseTextField
                        v-model="formData.email"
                        type="email"
                        label="Email:"
                        name="email"
                        autocomplete="email"
                        required
                        :invalid="!!errors.email"
                        :aria-describedby="describedBy"
                        @blur="validateField('email', $event, formValidationConfig.email)"
                    />
                </BaseFieldValidationWrapper>
            </div>

            <div class="nexp-mb-3">
                <BaseFieldValidationWrapper :error="errors.message" v-slot="{ describedBy }">
                    <BaseTextarea
                        required
                        autoResize
                        label="Message:"
                        name="message"
                        hint="Questions or glitches? Drop us a line!"
                        :value="formData.message"
                        :maxLength="MESSAGE_MAX_LENGTH"
                        :minLines="5"
                        :invalid="!!errors.message"
                        :aria-describedby="describedBy"
                        @input="formData.message = $event.target.value"
                        @blur="validateField('message', $event, formValidationConfig.message)"
                    />
                </BaseFieldValidationWrapper>
            </div>

            <div class="submit-btn-group">
                <BaseButton label="Send" level="primary" :disabled="loading" />
                <BaseCircleLoader v-if="loading" size="sm" />
            </div>
        </form>

        <p>
            An alternative way to
            <NuxtLink :to="directLink" target="_blank">send a message</NuxtLink>
        </p>
    </main>
</template>

<style scoped lang="scss">
@use '~/assets/scss/page-form';

p {
    line-height: 20px;
}
</style>
