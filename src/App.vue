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

html,
body {
	margin: 0;
	padding: 0;
}

body {
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
}

* {
	box-sizing: border-box;
}

h1,
h3 {
	font-weight: 500;
}
label {
	line-height: 28px;
}
input {
	width: 100%;
	border: 1px solid rgb(225, 225, 225);
	border-radius: 4px;
	height: 30px;
	padding: 2px 8px;
	background: white;
	margin-bottom: 10px;
}
button {
	border: none;
	background-color: #3db53d;
	color: whitesmoke;
	padding: 10px 15px;
	border-radius: 5px;
}

button:hover {
	background-color: rgb(70, 202, 70);
	cursor: pointer;
}
button:disabled {
	background-color: #81cf81;
	color: rgb(255 255 255);
	cursor: default;
}

.app {
	padding: 20px 30px;
}

h1 {
	margin: 0;
}
</style>
