<script setup lang="ts">
interface IFieldValidationWrapperProps {
    error?: string;
}

defineProps<IFieldValidationWrapperProps>();

const errorMessageID = useId();
</script>

<template>
    <!-- :class="{ 'nexp-field-validation-wrapper--has-error': error }" -->
    <div class="nexp-field-validation-wrapper">
        <slot :describedBy="error ? errorMessageID : undefined" />

        <p
            v-if="error"
            :id="errorMessageID"
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
        color: #ff0000;
        margin-top: 4px;
    }

    /* &--has-error {
        border-color: #ff0000;
    } */
}
</style>
