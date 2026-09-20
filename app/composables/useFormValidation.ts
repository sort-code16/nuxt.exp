import { z } from 'zod';

interface IFieldValidationConfig {
    readonly rules?: Array<(value: any) => true | string>;
    readonly schema?: z.ZodType;
}

export interface IFormValidationConfig {
    readonly [key: string]: IFieldValidationConfig;
}

type FieldType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default function useFormValidation() {
    const errors = reactive<Record<string, string>>({});
    const values = reactive<Record<string, string>>({});

    function validateElement(
        name: string,
        element: FieldType,
        config: IFieldValidationConfig = {},
    ): boolean {
        const value = element.value;

        values[name] = value;

        // step 1 - native HTML validation (required, min / max, pattern etc.)
        if (typeof element.checkValidity === 'function' && !element.checkValidity()) {
            errors[name] = element.validationMessage;

            return false;
        }

        const { rules = [], schema = null } = config;

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

    const validateField = (
        name: string,
        event: Event,
        config: IFieldValidationConfig = {},
    ): boolean => validateElement(name, event.target as FieldType, config);

    const validateForm = (event: Event, config: IFormValidationConfig = {}): boolean => {
        let isFormValid = true;

        (event.target as HTMLFormElement)
            .querySelectorAll<FieldType>('input, select, textarea')
            .forEach((element) => {
                if (!element.name) return;
                if (validateElement(element.name, element, config[element.name])) return;

                isFormValid = false;
            });

        return isFormValid;
    };

    return {
        errors,
        validateField,
        validateForm,
    };
}