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
				<li><NuxtLink to="/projects">Projects</NuxtLink></li>
				<li><NuxtLink to="/about">About</NuxtLink></li>
			</ul>
		</nav>

		<div class="app-header__actions">
			<slot name="actions">
				<BaseButton
					v-if="isNativeDialogExist"
					command="show-modal"
					command-for="nexp-dialog-1"
					disabled
				>
					Open native dialog
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
	padding: 12px 16px 8px;
	background-color: var(--nexp-green-2);
	border-bottom: 4px solid var(--nexp-blue-6);

	&__logo {
		font: 32px "Tourney";
		text-transform: uppercase;
		color: var(--nexp-blue-6);
	}

	&__menu {
		ul {
			display: flex;
			gap: 24px;
			font-size: 16px;
		}

		a {
			color: var(--nexp-blue-6);
			text-transform: uppercase;
			font-weight: 800;

			&:hover,
			&:focus {
				color: rgb(from var(--nexp-blue-6) r g b / .6);
			}
		}
	}

	&__actions {
		min-width: 25%;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}
}
</style>
