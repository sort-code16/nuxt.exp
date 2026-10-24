import { z } from 'zod';

export default defineEventHandler(async (event) => {
    const validatedBodyResult = await readValidatedBody(event, registerSchema.safeParse);

    if (!validatedBodyResult.success) {
        console.log('Register validation error: ', z.prettifyError(validatedBodyResult.error));

        throw createError({
            status: 422, // 422 Unprocessable Entity
            statusText: 'Validation Error',
            message: 'Validation failed for the provided data.',
            data: z.flattenError(validatedBodyResult.error).fieldErrors,
        });
    }

    const { email, username, password } = validatedBodyResult.data;

    const name = username || email.split('@')[0];
    const hashedPassword = hashPassword(password);

    const user = await usersRepository.createUser({
        email,
        username: name as string,
        password: hashedPassword,
    });

    if (!user) {
        throw createError({
            status: 409, // 409 Conflict
            statusText: 'Conflict Error',
            message: 'User with this email already exists.',
        });
    }

    const { password: _, ...data } = user;

    return {
        data,
    };
});
