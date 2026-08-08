<script setup>
const props = defineProps({
    post: {
        type: Object,
        default: () => ({ title: '', content: '' }),
    },
});

const form = reactive({
    title: '',
    content: '',
});

const savePost = () => console.log('Saving post', { ...form });

onMounted(() => {
    form.title = props.post.title;
    form.content = props.post.content;
});
</script>

<template>
    <form @submit.prevent="savePost">
        <div>
            <label for="title">Title</label>
            <input id="title" v-model="form.title" required />
        </div>

        <div>
            <label for="content">Content</label>

            <textarea
                id="content"
                v-model="form.content"
                rows="8"
                required
            ></textarea>
        </div>

        <button>Save</button>
    </form>
</template>