<script setup lang="ts">
const route = useRoute();
const { isValidParam } = useRouteValidation();

definePageMeta({
    name: 'post',
    validate: ({ params }) => isValidParam(params.id), // isValidParam(params.id) || { status: 404, statusText: 'Post not found' }
});

const { id } = route.params;

const { data, status, error } = /* await */ useFetch<IDummyPost>(`https://dummyjson.com/posts/${id}`, {
    query: {
        delay: 1000,
    },

    // onRequestError({ request, options, error }) {
    //     console.log('onRequestError', error);
    // },

    // onResponseError({ request, response, options }) {
    //     console.log('onResponseError', response);
    // },
});

useSeoMeta({
    title: () => {
        if (status.value === 'pending') return 'Loading...';
        if (status.value === 'error') return 'Error';

        return data.value?.title ?? '';
    },
});

// watch(error, (e) => {
//     if (e?.status === 404) {
//         showError({
//             status: 404,
//             message: (e.data as { message?: string } | undefined)?.message ?? 'Фільм не знайдено',
//         })
//     }
// })
</script>

<template>
    <main>
        <BaseCircleLoader v-if="status === 'pending'" size="sm" />

        <p v-else-if="status === 'error'" class="nexp-text-red">
            <BaseIcon name="circle-alert" /> {{ error }}
        </p>

        <template v-else>
            <article v-if="data">
                <header class="nexp-mb-6">
                    <h1>{{ data.title }}</h1>
                </header>

                <p class="nexp-mb-6">{{ data.body }}</p>

                <footer>
                    <div>
                        <span class="nexp-me-2" style="color: #006">
                            <BaseIcon name="eye" /> {{ data.views }}
                        </span>

                        <span class="nexp-me-2" style="color: #060">
                            <BaseIcon name="thumb-up" /> {{ data.reactions.likes }}
                        </span>

                        <span style="color: #900">
                            <BaseIcon name="thumb-down" /> {{ data.reactions.dislikes }}
                        </span>
                    </div>

                    <div>
                        <span
                            v-for="(tag, index) in data.tags"
                            :key="`post-tag-${index}`"
                            :class="{ 'nexp-me-1': index !== data.tags.length - 1 }"
                            style="color: #333; font-weight: 200;"
                        >
                            #{{ tag }}
                        </span>
                    </div>
                </footer>
            </article>

            <p v-else>
                <BaseIcon name="search-x" /> Not found.
            </p>
        </template>
    </main>
</template>

<style scoped lang="scss">
footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
}
</style>
