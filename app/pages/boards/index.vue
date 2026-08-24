<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
});

const { data, status, error } = useFetch('/api/v1/boards');

console.log(error.value);
</script>

<template>
    <div>
        <h1>Boards {{ status }}</h1>

        <p v-if="status === 'pending'">Is loading...</p>

        <div v-else>
            <ul v-if="data?.boards.length">
                <li v-for="{ id, name } in data.boards">
                    {{ name }}
                </li>
            </ul>

            <p v-else>No boards</p>
        </div>
    </div>
</template>