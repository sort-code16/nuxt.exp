<script setup lang="ts">
definePageMeta({
    title: 'Posts',
    // layout: 'default',
    layoutWithoutPaddings: true,
});

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
        select: 'id,title,body',
        delay: 1000,
    },

    pick: ['posts', 'limit', 'total'],
});

console.log('data', data);
</script>

<template>
    <main>
        <header>
            <div class="header-container">
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
            </div>
        </header>

        <section class="content-container">
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
        </section>
    </main>
</template>

<style scoped lang="scss">
@use '~/assets/scss/mixins' as m;

header {
    position: sticky;
    top: 0;
    background-color: rgb(255 255 255 / .8);
    display: flow-root;
    margin-bottom: 16px;
}

.header-container {
    margin-inline: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    padding-block: 24px;
    border-bottom: 1px dashed #eee;

    .controls {
        display: inherit;
        align-items: inherit;
        flex-wrap: inherit;
        gap: 8px;

        &__field {
            display: inherit;
            align-items: inherit;
            flex-wrap: inherit;
            gap: 4px;
        }
    }

    @media (pointer: fine) {
        margin-inline-end: 16px;
    }
}

.content-container {
    padding-inline: 24px;
    padding-bottom: 48px;

    article {
        @include m.nexp-link-base;

        &:not(:last-child) {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #eee;
        }
    }

    @media (pointer: fine) {
        padding-inline-end: 16px;
    }
}
</style>
