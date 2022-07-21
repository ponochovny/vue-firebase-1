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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');

body {
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}

h1,
h3 {
	font-weight: 400;
}

input {
	border: 1px solid rgb(225, 225, 225);
	border-radius: 4px;
	height: 30px;
	padding: 2px 8px;
	background: white;
}
</style>
