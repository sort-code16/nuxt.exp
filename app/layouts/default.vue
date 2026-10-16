<script setup>
const route = useRoute();

// console.log('route', route);

useHead(() => ({
    ...(route.meta.title && { title: `${route.meta.title}` }),

    /* meta: [
        ...(route.meta.title ? [
            { property: 'og:title', content: `${route.meta.title}` },
        ] : []),

        ...(route.meta.description ? [
            { property: 'description', content: `${route.meta.description}` },
            { property: 'og:description', content: `${route.meta.description}` },
        ] : []),
    ], */

    bodyAttrs: {
        ...(route.name && { class: `${route.name}-page` }),
    },
}));

const arePaddingsSkipped = computed(() => route.meta.layoutWithoutPaddings ?? false);

/* let resizeObserver = null;

const defaultLayoutElement = useTemplateRef('defaultLayout');
const hasVerticalScroll = ref(false);

function checkVerticalScroll(el) {
    hasVerticalScroll.value = el.scrollHeight > el.clientHeight;

    console.log('scrollHeight', el.scrollHeight);
    console.log('clientHeight', el.clientHeight);

    console.log('hasVerticalScroll', hasVerticalScroll.value);
}

onMounted(() => {
    const el = defaultLayoutElement.value;

    if (el) {
        resizeObserver = new ResizeObserver(() => {
            checkVerticalScroll(el);
        });

        resizeObserver.observe(el);
    }
});

onUnmounted(() => {
    if (resizeObserver) resizeObserver.disconnect();
}) */
</script>

<template>
    <div
        ref="defaultLayout"
        class="nexp-scrollbar app-default-layout"
        :class="{ 'app-default-layout--without-paddings': arePaddingsSkipped }"
    >
        <slot />
    </div>
</template>

<style scoped lang="scss">
.app-default-layout {
    flex-grow: 1;
    padding-block: 24px 40px;

    &:focus-visible {
        outline: dotted 1px #00f;
        outline-offset: -1px;
    }

    &--without-paddings {
        padding: 0;

        &.nexp-scrollbar {
            scrollbar-gutter: stable;
        }
    }
}
</style>
