<script setup>
useHead({
    title: 'Home',
    meta: [
        { name: 'description', content: 'The home page at NUXT.EXP' },
    ],
    bodyAttrs: {
        class: 'nexp-home-page',
    },
    script: [{ innerHTML: 'console.log(\'Home page initialized\')' }],
});
</script>

<template>
    <div>
        <h1>Welcome to the homepage</h1>
    
        <!-- <NuxtRouteAnnouncer /> -->
        <!-- <NuxtWelcome /> -->
    </div>
</template>