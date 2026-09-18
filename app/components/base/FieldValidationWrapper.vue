<script setup lang="ts">
interface IFieldValidationWrapperProps {
    error: string;
}

defineProps<IFieldValidationWrapperProps>();
</script>

<template>
    <div 
        class="nexp-field-validation-wrapper"
        :class="{ 'nexp-field-validation-wrapper--has-error': error }"
    >
        <slot />

        <p
            v-if="error"
            class="nexp-field-validation-wrapper__error-message"
            role="alert"
        >
            {{ error }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.nexp-field-validation-wrapper {
    &__error-message {
        color: var(--nexp-red-5);
        margin-top: 4px;
    }

    /* &--has-error {
        border-color: var(--nexp-red-5);
    } */
}
</style>