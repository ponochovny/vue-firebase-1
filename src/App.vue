<template>
	<div class="app container">
		<header class="text-center">
			<h1>Vue Voxer</h1>
			<h2>Realtime Voice Chat</h2>
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

/* html,
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
	padding: 10px 15px;
	border-radius: 5px;

	background-color: #3d59b5;
	color: whitesmoke;

	transition: background-color 0.3s ease;
}
button:hover {
	cursor: pointer;
	background-color: #4966c5;
}
button:disabled {
	cursor: default;
}

button.is-success {
	background-color: #3db53d;
	color: whitesmoke;
}

button.is-success:hover {
	background-color: rgb(70, 202, 70);
}
button.is-success:disabled {
	background-color: #81cf81;
	color: rgb(255 255 255);
}

.app {
	padding: 20px 30px;
}

h1 {
	margin: 0;
} */

button:disabled {
	cursor: not-allowed;
	pointer-events: all !important;
}

code {
	background-color: #f5f5f5;
	color: #108fda;
	font-size: 0.875em;
	font-weight: 400;
	padding: 0.25em 0.5em 0.25em;
}

.app h2 {
	font-weight: normal;
}

.app header {
	margin-bottom: 28px;
}
</style>
