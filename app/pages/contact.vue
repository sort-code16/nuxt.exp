<script setup lang="ts">
const formData = reactive({
    email: '',
    message: '',
});
</script>

<template>
    <main>
        <h1 class="nexp-mb-4">Contact us</h1>

        <!-- novalidate -->
        <form @submit.prevent="() => {}">
            <div class="nexp-mb-3">
                <BaseTextField
                    v-model="formData.email"
                    type="email"
                    label="Email:"
                    name="email"
                    autocomplete="email"
                    required
                />
            </div>

            <div class="nexp-mb-3">
                <BaseTextarea
                    :value="formData.message"
                    :maxLength="512"
                    autoResize
                    required
                    label="Message:"
                    name="message"
                    @input="formData.message = $event.target.value"
                />
            </div>

            <BaseButton label="Send" level="primary" />
        </form>
    </main>
</template>
