<script setup>
import useRouteValidation from './useRouteValidation';

const route = useRoute();
const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { statusCode: 404, message: 'Post not found' }
});
</script>

<template>
  <section>
    <h1>Post View</h1>
    <p>Viewing post with id: <strong>{{ route.params.id }}</strong></p>
  </section>
</template>
