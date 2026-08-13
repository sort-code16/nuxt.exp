<script setup>
const route = useRoute();

const isNativeDialogExist = ref(false);

watch(() => route.path, (currentPath) => {
	isNativeDialogExist.value = currentPath === '/';
}, { immediate: true });
</script>

<template>
	<header class="app-header">
		<NuxtLink to="/">
			<span class="app-header__logo">nuxt.exp</span>
		</NuxtLink>

		<nav class="app-header__menu">
			<ul>
				<li><NuxtLink to="/posts">Posts</NuxtLink></li>
				<li><NuxtLink to="/boards">Boards</NuxtLink></li>
				<li><NuxtLink to="/projects">Projects</NuxtLink></li>
			</ul>
		</nav>

		<div
			popover="manual"
			id="menuPopover"
			class="app-header__popover"
		>
			<BaseButton popovertarget="menuPopover" popovertargetaction="hide">x</BaseButton>

			<nav>
				<ul>
					<li><NuxtLink to="/posts">Posts</NuxtLink></li>
					<li><NuxtLink to="/boards">Boards</NuxtLink></li>
					<li><NuxtLink to="/projects">Projects</NuxtLink></li>
				</ul>
			</nav>
		</div>

		<div class="app-header__popover-page-blocker"></div>

		<div class="app-header__actions">
			<BaseButton
				level="tertiary"
				popovertarget="menuPopover"
				class="app-header__popover-btn"
			>
				Menu
			</BaseButton>

			<slot name="actions">
				<BaseButton
					v-if="isNativeDialogExist"
					command="show-modal"
					commandfor="nexp-dialog-1"
				>
					Info
				</BaseButton>

				<BaseButton
					level="primary"
					@click="$emit('open-settings')"
				>
					Settings
				</BaseButton>
			</slot>
		</div>
	</header>
</template>

<style scoped lang="scss">
.app-header {
	height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 12px 24px 8px;
    background-color: var(--nexp-green-2);
    border-bottom: 4px solid var(--nexp-blue-6);

	&__logo {
		font: 20px / 1 "Tourney";
		text-transform: uppercase;
		color: var(--nexp-blue-6);
	}

	&__menu,
	&__popover {
		ul {
			display: flex;
			font-size: 16px;
		}

		a {
			color: var(--nexp-blue-6);
			text-transform: uppercase;
			font-weight: 800;

			&:hover,
			&:focus {
				color: var(--nexp-black-6, #000);
			}
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
