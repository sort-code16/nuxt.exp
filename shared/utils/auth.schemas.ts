import { z } from 'zod';

// const emailSchema = z.email().refine((value) => !value.trim().toLowerCase().endsWith('.ru'), {
//     message: 'The registration from .ru domains is not allowed.',
// });

const passwordSchema = z.string().min(4, 'Password must be at least 4 characters long');

// TODO: Add password confirmation
export const registerSchema = z.object({
    email: z.email(),
    username: z.string().optional(),
    password: passwordSchema,
});

export const loginSchema = z.object({
    email: z.email(),
    password: passwordSchema,
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
