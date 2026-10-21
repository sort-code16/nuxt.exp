<script setup lang="ts">
definePageMeta({
    middleware: 'authorized-user-only',
});

const { data, status, error } = useFetch('/api/v1/boards');

// watch(error, (e) => {
//     if (e?.status === 401) {
//         showError({
//             status: 401,
//             message: (e.data as { message?: string } | undefined)?.message ?? '',
//         })
//     }
// })
</script>

<template>
    <main>
        <h1 class="nexp-mb-4">Boards</h1>

        <BaseCircleLoader v-if="status === 'pending'" size="sm" />

        <p v-else-if="status === 'error'" class="nexp-text-red">
            <BaseIcon name="circle-alert" /> {{ error }}
        </p>

        <div v-else>
            <ul v-if="data?.boards.length">
                <li v-for="{ id, name } in data.boards" :key="`board-${id}`">
                    {{ name }}
                </li>
            </ul>

            <p v-else><BaseIcon name="search-x" /> No boards</p>
        </div>
    </main>
</template>
