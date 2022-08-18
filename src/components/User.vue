<template>
	<div class="user">
		<slot name="user" :user="user?.firebaseUser"></slot>
	</div>
</template>

<script>
import { ref } from 'vue'
import { onAuthStateChangedE } from '../firebase'

export default {
	name: 'user-component',
	setup() {
		const user = ref(null)
		const onAuthStateChanged = onAuthStateChangedE((firebaseUser) => {
			if (firebaseUser) {
				console.log('... 1', firebaseUser)
				user.value = { firebaseUser }
			} else {
				console.log('... 2', firebaseUser)
				user.value = null
			}
		})

		return {
			user,
			onAuthStateChanged,
		}
	},
	unmounted() {
		this.onAuthStateChanged()
	},
}
</script>

<style scoped>
.user {
	padding: 30px 16px;
	border: 2px solid whitesmoke;
	border-radius: 12px;
	flex-direction: column;
}
</style>
