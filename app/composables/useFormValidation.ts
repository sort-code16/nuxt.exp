import { z } from 'zod';

interface IFieldValidationConfig {
    readonly rules?: Array<(value: any) => true | string>;
    readonly schema?: z.ZodType;
}

export interface IFormValidationConfig {
    readonly [key: string]: IFieldValidationConfig;
}

export default function useFormValidation() {
    const errors = reactive<Record<string, string>>({});
    const values = reactive<Record<string, string>>({});

    const validateField = (name: string, event: Event, config: IFieldValidationConfig = {}) => {
        const element = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const value = element.value;

        values[name] = value;

        const { rules = [], schema = null } = config;

        // step 1 - native HTML validation (required, min / max, pattern etc.)
        if (typeof element.checkValidity === 'function' && !element.checkValidity()) {
            errors[name] = element.validationMessage;

            return false;
        }

        // step 2 - custom validation rules
        for (const rule of rules) {
            const result = rule(value);

            if (typeof result === 'string') {
                errors[name] = result;

                return false;
            }
        }

        // step 3 - field schema validation (Zod)
        if (schema && typeof schema.safeParse === 'function') {
            const result = schema.safeParse(value);

            if (!result.success) {
                errors[name] = result.error.issues[0]?.message ?? 'Validation error';
                
                return false;
            }
        }

        // step 4 - if all validations pass, clear the error for this field
        errors[name] = '';

        return true;
    };

    return {
        errors,
        validateField,
    };
}