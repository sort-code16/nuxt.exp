<script setup>
definePageMeta({
    title: 'Projects',
    // description: 'The projects at NUXT.EXP',
});

const projects = ref([]);
const isProjectsLoading = ref(false);

const loadProjects = async () => {
    isProjectsLoading.value = true;

    try {
        const { data } = await $fetch('/api/v1/projects');

        projects.value = data;
    } catch (error) {
        console.error('Failed to load projects', error)
    } finally {
        isProjectsLoading.value = false;
    }
}

onMounted(async () => {
    await loadProjects();
});
</script>

<template>
    <section>
        <h1 class="nexp-title">Welcome to the Projects page</h1>
        <h2 class="nexp-title">Wordpress premium themes & plugins</h2>

        <BaseCircleLoader
            v-if="isProjectsLoading"
            size="md"
            class="loader"
        />

        <div v-else>
            <div
                v-if="projects.length"
                class="masonry-grid"
            >
                <figure
                    v-for="{ id, name, description, src } in projects"
                    :key="`project-${id}`"
                    class="masonry-grid__item"
                >
                    <img :src :alt="name" />
                    <figcaption>{{ description }}</figcaption>
                </figure>
            </div>

            <p v-else>No projects found</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
.loader {
    margin: 16px auto;
}

figcaption {
    margin-top: 8px;
    line-height: 1.4;
}

.masonry-grid {
    column-count: 1;
    column-gap: 16px;

    &__item {
        break-inside: avoid;
        margin-bottom: 16px;
    }

    @media (min-width: 576px) {
        column-count: 2;
    }

    @media (min-width: 992px) {
        column-count: 3;
    }
}
</style>