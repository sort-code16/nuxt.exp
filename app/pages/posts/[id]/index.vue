<script setup lang="ts">
const route = useRoute();
const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { status: 404, statusText: 'Post not found' },
});

const { id } = useRoute().params;

const { data, status, error } = useFetch<any>(`https://dummyjson.com/posts/${id}`, {
    query: {
        delay: 1000,
    },
});

console.log('data', data.value);
</script>

<template>
    <section>
        <BaseCircleLoader v-if="status === 'pending'" size="sm" />

        <p v-else-if="status === 'error'" class="nexp-text-red">
            {{ error }}
        </p>

        <template v-else>
            <article>
                <h1 class="nexp-mb-6">{{ data.title }}</h1>
                <p>{{ data.body }}</p>
            </article>
        </template>
    </section>
</template>
