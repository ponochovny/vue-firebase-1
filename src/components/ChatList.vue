<template>
	<div>
		<button @click="createChatRoom()">Create New Chat Room</button>
	</div>
</template>

<script>
import { db } from '../firebase'
import { collection, setDoc } from 'firebase/firestore'

export default {
	methods: {
		async createChatRoom() {
			const colRef = collection(db, 'chats')
			const newChat = await setDoc(colRef, {
				createAt: Date.now(),
				owner: this.uid,
				members: [this.uid],
			})

			console.log(newChat)
		},
	},
	props: ['uid'],
}
</script>
