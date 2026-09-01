<script setup>
import PostForm from '../_components/PostForm.vue';

const route = useRoute();
// const router = useRouter();

const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { status: 404, statusText: 'Post not found' }
});

const form = ref({ title: 'test 1', content: 'content test 1' });
const id = route.params.id;

/* const savePost = async () => {
  try {
    await $fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: form.value,
    })
    router.push(`/posts/${id}`)
  } catch (error) {
    console.error('Failed to save post', error)
  }
} */
</script>

<template>
  <div>
    <h1>Edit Post #{{ id }}</h1>

    <PostForm :post="form" />
  </div>
</template>
