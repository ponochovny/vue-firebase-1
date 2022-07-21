<template>
	<div>
		Logged in as {{ user.firebaseUser.uid }}
		<button @click="signOut">Sign Out</button>
	</div>
</template>

<script>
import { signOutEx } from '../firebase'
export default {
	data() {
		return {
			signOutEx,
		}
	},
	methods: {
		signOut() {
			signOutEx()
				.then((data) => console.log(data))
				.catch((error) => console.log('err', error))
		},
	},
	props: ['user'],
}
</script>

<style></style>
