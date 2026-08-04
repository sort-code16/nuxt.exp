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
        <h1 class="nexp-title">
            Welcome to the About page
        </h1>
        
        <p>This page will be displayed at the /about route.</p>
    </section>
</template>