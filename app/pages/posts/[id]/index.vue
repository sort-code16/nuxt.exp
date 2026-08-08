<template>
  <section>
    <h1>Post View</h1>
    <p>Viewing post with id: <strong>{{ postId }}</strong></p>
  </section>
</template>

<script setup>
const route = useRoute()
const postId = route.params.id
</script>
