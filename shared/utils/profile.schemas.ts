import { z } from 'zod';

export const deleteProfileSchema = z.strictObject({
    password: loginSchema.shape.password,
});

export type DeleteProfileSchemaType = z.infer<typeof deleteProfileSchema>;
