<script setup>
const route = useRoute();

const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { statusCode: 404, message: 'Board not found' }
});

const id = route.params.id;
</script>

<template>
  <div>
    <h1>Board #{{ id }}</h1>
  </div>
</template>