<script setup lang="ts">
const perPageOptions = [5, 10, 15, 20, 25];

const searchQuery = ref('');
const perPage = ref(perPageOptions[0]);

export interface IPost {
    readonly id: number;
    readonly title: string;
    readonly body: string;
}

interface IPostsSearchResponse {
    readonly posts: IPost[];
    readonly limit: number;
    readonly total: number;
}

const { data, status, error } = useFetch<IPostsSearchResponse>('https://dummyjson.com/posts/search', {
    query: {
        q: searchQuery,
        limit: perPage,
        delay: 1000,
    },

    pick: ['posts', 'limit', 'total'],
});

console.log('data', data);
</script>

<template>
    <main>
        <header>
            <h1>Posts</h1>

            <div class="controls">
                <div class="controls__field">
                    <label for="search">Search by:</label>

                    <input
                        v-model="searchQuery"
                        type="search"
                        id="search"
                    />
                </div>

                <div class="controls__field">
                    <label for="perPage">Per page:</label>

                    <select v-model="perPage" id="perPage">
                        <option
                            v-for="(value, index) in perPageOptions"
                            :key="`per-page-option-${index}`"
                            :value
                        >
                            {{ value }}
                        </option>
                    </select>
                </div>
            </div>
        </header>

        <!-- <p v-if="status === 'idle'">Очікування запуску…</p> -->

        <BaseCircleLoader v-if="status === 'pending'" size="sm" />

        <p v-else-if="status === 'error'" class="nexp-text-red">
            {{ error }}
        </p>

        <template v-else>
            <section v-if="data?.posts.length">
                <article
                    v-for="{ id, title, body } in data.posts"
                    :key="`posts-item-${id}`"
                    class="nexp-mb-4"
                >
                    <h3 class="nexp-mb-2">
                        <NuxtLink :to="`/posts/${id}`">{{ title }}</NuxtLink>
                    </h3>

                    <p>{{ body }}</p>
                </article>
            </section>

            <p v-else>
                <ClientOnly>
                    <BaseIcon name="search-x" />
                </ClientOnly>

                No posts found.
            </p>
        </template>
    </main>
</template>

<style scoped lang="scss">
@use '~/assets/scss/mixins' as m;

main {
    margin-top: -24px;

    header {
        margin-inline: -24px;
        margin-bottom: 24px;
        position: sticky;
        top: -24px;
        padding: 24px;
        background-color: rgb(0 0 0 / .8);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;

        .controls {
            display: inherit;
            align-items: inherit;
            flex-wrap: inherit;
            gap: inherit;

            &__field {
                display: inherit;
                align-items: inherit;
                flex-wrap: inherit;
                gap: 4px;
            }
        }
    }
}

article {
    @include m.nexp-link-base;

}
</style>
