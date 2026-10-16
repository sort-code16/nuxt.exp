<script setup lang="ts">
const route = useRoute();

interface IMenuItem {
    path: string;
    name: string;
}

const items: IMenuItem[] = [
    { path: '/posts', name: 'Posts' },
    { path: '/boards', name: 'Boards' },
    { path: '/projects', name: 'Projects' },
    { path: '/dialogs', name: 'Dialogs' },
];
</script>

<template>
    <ul>
        <li
            v-for="({ path, name }, index) in items"
            :key="`menu-item-${index}`"
        >
            <!-- activeClass="active" -->
            <NuxtLink
                :to="path"
                :class="{ active: path === '/' ? route.path === '/' : route.path.startsWith(path) }"
                exactActiveClass="exact-active"
            >
                {{ name }}
            </NuxtLink>
        </li>
    </ul>
</template>

<style scoped lang="scss">
ul {
    display: flex;
    font-size: 16px;
}

a {
    outline: none;
    text-transform: uppercase;
    font-weight: 800;
    color: #000;

    &:hover,
    &:focus-visible {
        text-decoration: underline;
    }

    &.active {
        color: #00f;
    }
}
</style>
