export default defineEventHandler(async (event) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    throw createError('Test error');

    return {
        test: true,
    };
});