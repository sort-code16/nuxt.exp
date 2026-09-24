<script setup lang="ts">
interface ITextFieldProps {
    modelValue?: string;
    type?: 'text' | 'email' | 'url' | 'tel' | 'password'; 
    required?: boolean;
    invalid?: boolean;
    label?: string;
    hint?: string;
}

const {
    modelValue = '',
    type = 'text',
    required = false,
    invalid = false,
    label = '',
    hint = '',
} = defineProps<ITextFieldProps>();

interface ITextFieldEmits {
    'update:modelValue': [value: string];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}

const emit = defineEmits<ITextFieldEmits>();

defineOptions({
    inheritAttrs: false,
});

const attrs = useAttrs();
const generatedID = useId();

const fieldID = computed(() => (
    typeof attrs.id === 'string' && attrs.id ? attrs.id : generatedID
));

const fieldAttrs = computed(() => {
    const {
        id,
        'aria-describedby': _,
        ...rest
    } = attrs as Record<string, unknown>;

    return rest;
});

const describedBy = computed(() => {
    const inputDescribedBy = typeof attrs['aria-describedby'] === 'string'
        ? attrs['aria-describedby']
        : undefined;

    const hintDescribedBy = hint ? `${fieldID.value}-hint` : undefined;

    if (inputDescribedBy && hintDescribedBy) {
        return `${inputDescribedBy} ${hintDescribedBy}`;
    }

    return inputDescribedBy ?? hintDescribedBy;
});
</script>

<template>
    <div class="nexp-text-field">
        <label
            v-if="label"
            :for="fieldID"
            class="nexp-text-field__label"
        >
            <span class="nexp-text-field__label-text">{{ label }}</span>

            <span
                v-if="required"
                class="nexp-text-field__required-indicator"
                aria-hidden="true"
            >
                *
            </span>
        </label>

        <input
            :id="fieldID"
            :type="type"
            :value="modelValue"
            :required="required"
            :aria-required="required || undefined"
            :aria-invalid="invalid || undefined"
            :aria-describedby="describedBy"
            v-bind="fieldAttrs"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @blur="emit('blur', $event)"
            @focus="emit('focus', $event)"
        />

        <p
            v-if="hint"
            :id="`${fieldID}-hint`"
            class="nexp-text-field__hint"
        >
            {{ hint }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.nexp-text-field {
    display: flex;
    flex-direction: column;
    gap: 4px;

    &__label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    &__required-indicator {
        color: #ff0000;
    }

    &__hint {
        color: #808080;
    }

    input {
        background-color: #fff;
        border: 1px solid currentColor;
        padding: 4px 8px;

        &:focus {
            outline: 2px solid #0000ff;
            outline-offset: 2px;
        }

        &[aria-invalid='true'] {
            border-color: #ff0000;
        }
    }
}
</style>
