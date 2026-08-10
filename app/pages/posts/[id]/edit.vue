<script setup>
import PostForm from '../components/PostForm.vue';
import useRouteValidation from './useRouteValidation';

const route = useRoute();
// const router = useRouter();

const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { statusCode: 404, message: 'Post not found' }
});

const form = ref({ title: 'test 1', content: 'content test 1' });
const id = route.params.id;

/* const loadPost = async () => {
  try {
    const data = await $fetch(`/api/posts/${id}`)
    form.value = {
      title: data.title || '',
      content: data.content || '',
    }
  } catch (error) {
    console.error('Failed to load post', error)
  }
} */

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

// onMounted(loadPost)
</script>

<template>
  <div>
    <h1>Edit Post #{{ id }}</h1>

    <PostForm :post="form" />
  </div>
</template>
