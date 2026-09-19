import { z } from 'zod';

export const userRegisterSchema = z.object({
    email: z.email(),
    username: z.string().optional(),
    password: z.string().min(4),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;