<script setup lang="ts">
const route = useRoute();
// const { danger } = useNotifications();
const { isValidParam } = useRouteValidation();

definePageMeta({
    validate: ({ params }) => isValidParam(params.id) || { status: 404, statusText: 'Post not found' },
});

const { id } = route.params;

// interface IResponseError {
//     readonly _data: {
//         readonly message: string;
//     },

//     readonly status: number;
//     readonly statusText: string;
// }

// type IFetchResponseError = NuxtError<unknown> | IResponseError;

const { data, status, error } = /* await */ useFetch<IDummyPost>(`https://dummyjson.com/posts/${id}`, {
    query: {
        delay: 1000,
    },

    /* onRequestError({ request, options, error }) {
        console.log('onRequestError', error);
    },

    onResponseError({ request, response, options }) {
        console.log('onResponseError', response);

        const { _data, status, statusText } = response;

        danger(
            _data?.message || 'Something went wrong',
            `${status}${statusText ? '-' + statusText : ''}`,
        );
    }, */
});
</script>

<template>
    <section>
        <BaseCircleLoader v-if="status === 'pending'" size="sm" />

        <p v-else-if="status === 'error'" class="nexp-text-red">
            {{ error }}
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
    </section>
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
