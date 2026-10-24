import { z } from 'zod';
import { truncates } from 'bcrypt-ts';

// const emailSchema = z.email().refine((value) => !value.trim().toLowerCase().endsWith('.ru'), {
//     message: 'The registration from .ru domains is not allowed.',
// });

const emailSchema = z.email().max(254);

// TODO: Add password confirmation
export const registerSchema = z.strictObject({
    email: emailSchema,
    username: z.string().trim().max(30).optional(),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .refine(
            (password) => !truncates(password),
            'Password is too long. Please use a shorter password.', // password must not exceed 72 bytes
        ),
});

export const loginSchema = z.strictObject({
    email: emailSchema,
    password: z.string().nonempty(),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
