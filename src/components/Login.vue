<template>
	<aside>
		<h3>Sign in Anonymously</h3>
		<button @click="signIn">Sign In</button>
	</aside>
</template>

<script>
import { authAnonymously } from '../firebase'

export default {
	name: 'login-page',
	methods: {
		async signIn() {
			try {
				const data = await authAnonymously()
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
	},
}
</script>

<style></style>
