<script setup>
const route = useRoute();
const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { status: 404, statusText: 'Post not found' }
});
</script>

<template>
  <section>
    <h1>Post View</h1>
    <p>Viewing post with id: <strong>{{ route.params.id }}</strong></p>
  </section>
</template>
