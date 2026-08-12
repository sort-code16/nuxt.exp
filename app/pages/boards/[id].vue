<script setup>
const route = useRoute();

const { isValidParam } = useRouteValidation();

definePageMeta({
    name: 'board',
    title: 'Board',
    validate: ({ params }) => isValidParam(params.id) || { status: 404, statusText: 'Board not found' }
});

const id = route.params.id;
</script>

<template>
  <div>
    <h1>Board #{{ id }}</h1>
  </div>
</template>