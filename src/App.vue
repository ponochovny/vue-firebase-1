<template>
	<div class="app">
		<header>
			<h1>Vue Voxer</h1>
			<p>Realtime Voice Chat</p>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
import { firebaseAuth } from './firebase'

console.log(firebaseAuth)

export default {
	name: 'App',
	components: {},
}
</script>

<style></style>
