<template>
	<header class="app-header">
		<div class="app-header__brand">
			<img class="app-header__logo" src="/logo.png" alt="sort.code¹⁶/>"/>
		</div>

		<nav class="nav">
			<ul>
				<li><NuxtLink to="/">Home</NuxtLink></li>
				<li><a href="#">Projects</a></li>
				<li><NuxtLink to="/about">About</NuxtLink></li>
			</ul>
		</nav>

		<div class="actions">
			<slot name="actions">
				<button class="btn" @click="$emit('open-settings')">Settings</button>
			</slot>
		</div>
	</header>
</template>

<style scoped>
.app-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	background-color: var(--green-accent, #fff);
	border-bottom: 1px solid rgba(0, 0, 0, .06);
}

.brand{display:flex;align-items:center;gap:.5rem}
.logo{width:36px;height:36px;object-fit:contain}
.title{font-size:1.1rem;margin:0}
.nav ul{display:flex;gap:1rem;list-style:none;margin:0;padding:0}
.nav a{color:var(--link-color,#333);text-decoration:none}
.actions .btn{padding:.4rem .7rem;border:1px solid #ccc;background:#f7f7f7;border-radius:4px}
</style>
