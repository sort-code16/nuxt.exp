<template>
	<header class="app-header">
		<strong class="app-header__logo">nuxt.exp</strong>

		<nav class="app-header__menu">
			<ul>
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><NuxtLink to="/projects">Projects</NuxtLink></li>
				<li><NuxtLink to="/about">About</NuxtLink></li>
			</ul>
		</nav>

		<div class="app-header__actions">
			<slot name="actions">
				<button @click="$emit('open-settings')">
					Settings
				</button>
			</slot>
		</div>
	</header>
</template>

<style scoped>
.app-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 16px 8px;
	background-color: var(--nexp-green-2);
	border-bottom: 4px solid var(--nexp-blue-6);
}

.app-header__logo {
	font-size: 24px;
	text-transform: uppercase;
}

.app-header__menu ul {
	display: flex;
	gap: 16px;
	font-size: 16px;
}

.app-header__menu a {
	font-weight: 600;
}

.app-header__actions {}
</style>
