<script setup lang="ts">
interface IHeaderEmits {
    'open-settings': [];
}

const emit = defineEmits<IHeaderEmits>();

const route = useRoute();
const router = useRouter();

// const isNativeDialogExist = ref(false);
const menuPopoverRef = useTemplateRef('mobileMenuPopover');

const isHomePage = computed(() => route.path === '/');

onMounted(() => {
    router.afterEach(() => {
        const popover = menuPopoverRef.value;

        if (
            popover
            && typeof popover.hidePopover === 'function'
            && popover.matches(':popover-open')
        ) {
            popover.hidePopover();
        }
    });
});

// watch(() => route.path, (currentPath) => {
//     isNativeDialogExist.value = currentPath === '/';
// }, { immediate: true });
</script>

<template>
    <header class="app-header">
        <component
            :is="isHomePage ? 'h1' : 'div'"
            style="line-height: 0"
        >
            <NuxtLink to="/" class="app-header__logo">
                nuxt.exp
            </NuxtLink>
        </component>

        <nav class="app-header__menu" aria-label="Main navigation">
            <AppNavigationList role="list" />
        </nav>

        <div
            popover="manual"
            id="menuPopover"
            ref="mobileMenuPopover"
            class="app-header__popover"
        >
            <BaseButton
                type="button"
                popovertarget="menuPopover"
                popovertargetaction="hide"
                aria-label="Close mobile navigation"
            >
                x
            </BaseButton>

            <nav aria-label="Mobile navigation">
                <AppNavigationList />
            </nav>
        </div>

        <div class="app-header__popover-page-blocker"></div>

        <div class="app-header__actions">
            <BaseButton
                type="button"
                level="tertiary"
                popovertarget="menuPopover"
                class="app-header__popover-btn"
                aria-label="Open mobile navigation"
            >
                Menu
            </BaseButton>

            <slot name="actions">
                <BaseButton
                    v-if="isHomePage"
                    type="button"
                    command="show-modal"
                    commandfor="nexp-dialog-1"
                >
                    Info
                </BaseButton>

                <BaseButton
                    type="button"
                    level="primary"
                    @click="emit('open-settings')"
                >
                    Settings
                </BaseButton>
            </slot>
        </div>
    </header>
</template>

<style scoped lang="scss">
.app-header {
	flex: 0 0 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 12px 24px 8px;
    border-bottom: 4px solid #000;

	&__logo {
		font: 20px / 1 "Tourney";
		text-transform: uppercase;
		color: #000;

		&:focus-visible {
			outline: none;
			color: #0000ff;
		}
	}

	&__menu {
		display: none;
		flex-grow: 1;

		ul {
			gap: 24px;
		}
	}

	&__popover {
		padding: 24px;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;

		&:popover-open {
			display: flex;
		}

		&::backdrop {
			background-color: rgba(0, 0, 0, .1);
		}

		ul {
			flex-direction: column;
			gap: 16px;
		}
	}

	&__popover-page-blocker {
		position: fixed;
		inset: 0;
		z-index: 9998; // just below the popover's top layer
		display: none;
	}

	&__popover:popover-open ~ &__popover-page-blocker {
		display: block;
	}

	@media (min-width: 576px) {
		&__logo {
			font-size: 32px;
		}
	}

	@media (min-width: 768px) {
		&__menu {
			display: inline-flex;
		}

		&__popover-btn {
			display: none;
		}
	}

	&__actions {
		min-width: 25%;
		display: inherit;
		align-items: inherit;
		justify-content: flex-end;
		gap: 8px;
	}
}
</style>
