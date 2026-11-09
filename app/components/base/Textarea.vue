<script setup lang="ts">
interface ITextareaProps {
    modelValue?: string;
    value?: string;
    maxLength?: number;
    autoResize?: boolean;
    required?: boolean;
    invalid?: boolean;
    label?: string;
    hint?: string;
}

const {
    modelValue,
    value,
    maxLength,
    autoResize = false,
    required = false,
    invalid = false,
    label = '',
    hint = '',
} = defineProps<ITextareaProps>();

interface ITextareaEmits {
    'update:modelValue': [value: string];
    blur: [event: FocusEvent];
    focus: [event: FocusEvent];
}

const emit = defineEmits<ITextareaEmits>();

defineOptions({
    inheritAttrs: false,
});

const attrs = useAttrs();
const generatedID = useId();

const currentValue = computed(() => modelValue ?? value ?? '');

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

    const hintID = hint ? `${fieldID.value}-hint` : undefined;
    const counterID = maxLength ? `${fieldID.value}-counter` : undefined;
    const descriptions = [inputDescribedBy, hintID, counterID].filter(Boolean);

    return descriptions.length ? descriptions.join(' ') : undefined;
});
</script>

<template>
    <div class="nexp-textarea">
        <label
            v-if="label"
            :for="fieldID"
            class="nexp-textarea__label"
        >
            <span class="nexp-textarea__label-text">{{ label }}</span>

            <span
                v-if="required"
                class="nexp-textarea__required-indicator"
                aria-hidden="true"
            >
                *
            </span>
        </label>

        <textarea
            :id="fieldID"
            :value="currentValue"
            :maxlength="maxLength"
            :required="required"
            :aria-required="required || undefined"
            :aria-invalid="invalid || undefined"
            :aria-describedby="describedBy"
            class="nexp-textarea__field"
            :class="{ 'nexp-textarea__field--auto-resize': autoResize }"
            v-bind="fieldAttrs"
            @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
            @blur="emit('blur', $event)"
            @focus="emit('focus', $event)"
        />

        <div v-if="hint || maxLength" class="nexp-textarea__meta">
            <span
                v-if="hint"
                :id="`${fieldID}-hint`"
                class="nexp-textarea__hint"
            >
                {{ hint }}
            </span>

            <span
                v-if="maxLength"
                :id="`${fieldID}-counter`"
                class="nexp-textarea__counter"
            >
                {{ currentValue.length }} / {{ maxLength }}
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nexp-textarea {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__label {
        display: inline-flex;
        align-items: center;
        gap: 4px;
    }

    &__required-indicator {
        color: #f00;
    }

    &__meta {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        line-height: 1.2;
        font-size: 12px;
        color: #808080;
    }

    &__hint {
        overflow-wrap: anywhere;
    }

    &__counter {
        text-wrap: nowrap;
    }

    &__field {
        scrollbar-width: thin;
        scrollbar-color: #808080 transparent;
        resize: vertical;
        min-height: calc(3lh + 8px);
        max-width: 100%;
        width: 100%;
        background-color: #fff;
        border: 1px solid currentColor;
        padding: 4px 8px;

        &:focus {
            outline: 2px solid #00f;
            outline-offset: 2px;
        }

        &[aria-invalid='true'] {
            border-color: #f00;
        }

        &:read-only {
            background-color: #eee;
            color: #666;
            border-color: #ddd;
            cursor: not-allowed;

            &:focus {
                outline: none;
                border-color: #666;
            }
        }
    }

    &__field--auto-resize {
        field-sizing: content;
        resize: none;
    }
}
</style>
