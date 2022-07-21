<template>
	<div>
		<ul>
			<li v-for="chat of chats" :key="chat.id">
				{{ chat.id }}
			</li>
		</ul>
		<button @click="createChatRoom()">Create New Chat Room</button>
	</div>
</template>

<script>
import { db } from '../firebase'
import {
	collection,
	addDoc,
	query,
	where,
	onSnapshot,
} from 'firebase/firestore'

export default {
	data() {
		return {
			chats: [],
			unsubscribe: () => {},
		}
	},
	created() {
		const q = query(collection(db, 'chats'), where('owner', '==', this.uid))
		this.unsubscribe = onSnapshot(q, (querySnapshot) => {
			const chats = []
			querySnapshot.forEach((doc) => {
				chats.push({ id: doc.id, ...doc.data() })
			})
			this.chats = chats
		})
	},
	unmounted() {
		this.unsubscribe()
	},
	methods: {
		async createChatRoom() {
			const colRef = collection(db, 'chats')
			const newChat = await addDoc(colRef, {
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
