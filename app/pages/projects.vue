<script setup>
useHead({
    title: 'Projects',
    meta: [
        { name: 'description', content: 'The projects at NUXT.EXP' },
    ],
    bodyAttrs: {
        class: 'nexp-projects-page',
    },
    script: [{ innerHTML: 'console.log(\'Projects page initialized\')' }],
});
</script>

<template>
    <section>
        <h1 class="nexp-title">Welcome to the Projects page</h1>
        <h2 class="nexp-title">Wordpress premium themes & plugins</h2>

        <div class="masonry-grid">
            <figure class="masonry-grid__item">
                <img src="/images/ecotheme-story.png" alt="ecotheme" />
                <figcaption>ecotheme - Saving nature</figcaption>
            </figure>

            <figure class="masonry-grid__item">
                <img src="/images/bt-gallery-plugin.png" alt="BT Gallery Plugin" />
                <figcaption>BorschTemplates - Gallery plugin</figcaption>
            </figure>

            <figure class="masonry-grid__item">
                <img src="/images/bt-shortcodes-plugin-list.png" alt="BT Shortcodes Plugin - List" />
                <figcaption>BorschTemplates - Shortcodes plugin - List</figcaption>
            </figure>

            <figure class="masonry-grid__item">
                <img src="/images/bt-shortcodes-plugin-circle-image.png" alt="BT Shortcodes Plugin - Circle Image" />
                <figcaption>BorschTemplates - Shortcodes plugin - Circle Image</figcaption>
            </figure>

            <figure class="masonry-grid__item">
                <img src="/images/econcept-green.jpg" alt="eConcept" />
                <figcaption>eConcept - Ultra cleaned and pure design theme</figcaption>
            </figure>
        </div>
    </section>
</template>

<style scoped lang="scss">
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

    @media (min-width: 600px) and (max-width: 1024px) {
        column-count: 2;
    }

    @media (min-width: 1024px) {
        column-count: 3;
    }
}
</style>