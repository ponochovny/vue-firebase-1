<template>
	<div class="userProfile">
		<h3>
			Logged in as <code>{{ user.uid }}</code>
		</h3>
		<button @click="signOut" class="btn btn-primary">Sign Out</button>
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

<style>
.userProfile {
	display: flex;
	gap: 10px;
}
</style>
