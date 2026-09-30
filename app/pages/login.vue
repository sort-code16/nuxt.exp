<script setup>
definePageMeta({
    middleware: 'guest',
});

const { success, danger, info, warning } = useToasts();

onMounted(() => {
    success('This is a success message', '200 - Success');
    success('This is a success message without title');
    danger('This is an error message with title', 'Error');
    danger('This is an error message without title but with auto-closing', null, 4000);
    info('This is an info message', 'Info');
    warning('This is a warning message', 'Warning');
    warning('This is a warning message without title but with auto-closing', null, 8000);
});
</script>

<template>
    <div>
        <h1>Login</h1>

        <p>
            I have no account yet.
            <NuxtLink to="/register">Register</NuxtLink>
        </p>
    </div>
</template>
