<script setup lang="ts">
definePageMeta({
    middleware: 'authorized-user-only',
});

const { data, status } = useFetch('/api/v1/boards');
</script>

<template>
    <div>
        <h1 class="nexp-mb-4">Boards {{ status }}</h1>

        <p v-if="status === 'pending'">Is loading...</p>

        <div v-else>
            <ul v-if="data?.boards.length">
                <li v-for="{ id, name } in data.boards" :key="`board-${id}`">
                    {{ name }}
                </li>
            </ul>

            <p v-else>No boards</p>
        </div>
    </div>
</template>
