<script setup>
useHead({
    title: 'About',
    meta: [
        { name: 'description', content: 'About the NUXT.EXP' },
    ],
    bodyAttrs: {
        class: 'nexp-about-page',
    },
    script: [{ innerHTML: 'console.log(\'About page initialized\')' }],
});
</script>

<template>
    <section>
        <p>This page will be displayed at the /about route.</p>
    </section>
</template>