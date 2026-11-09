<script setup lang="ts">
interface IFieldValidationWrapperProps {
    error?: string;
}

defineProps<IFieldValidationWrapperProps>();

const errorMessageID = useId();
</script>

<template>
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
        margin-top: 8px;
        line-height: 1.2;
        font-size: 12px;
        color: #f00;
    }
}
</style>
