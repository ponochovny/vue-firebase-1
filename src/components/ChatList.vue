<template>
	<div class="mt-4">
		<p class="fs-5">Other Chats</p>
		<div class="list-group mb-3" v-if="otherChats.length > 0">
			<router-link
				v-for="chat of otherChats"
				:key="chat.id"
				:to="{ name: 'chat', params: { id: chat.id } }"
				class="list-group-item list-group-item-action"
				>{{ chat.id }}</router-link
			>
		</div>
		<p class="fs-5">Owned Chats</p>
		<div class="list-group mb-4" v-if="ownedChats.length > 0">
			<router-link
				v-for="chat of ownedChats"
				:key="chat.id"
				:to="{ name: 'chat', params: { id: chat.id } }"
				class="list-group-item list-group-item-action"
				>{{ chat.id }}</router-link
			>
		</div>

		<p v-else class="mb-4 mt-2 fs-6">Currently, You have no active chats</p>

		<button @click="createChatRoom()" class="btn btn-success">
			Create New Chat Room
		</button>
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
			ownedChats: [],
			otherChats: [],
			unsubscribe: () => {},
			unsubscribe2: () => {},
		}
	},
	created() {
		const q = query(collection(db, 'chats'), where('owner', '==', this.uid))
		this.unsubscribe = onSnapshot(q, (querySnapshot) => {
			const ownedChats = []
			querySnapshot.forEach((doc) => {
				ownedChats.push({ id: doc.id, ...doc.data() })
			})
			this.ownedChats = ownedChats
		})

		//

		const q2 = query(collection(db, 'chats'), where('owner', '!=', this.uid))
		this.unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
			const otherChats = []
			querySnapshot.forEach((doc) => {
				otherChats.push({ id: doc.id, ...doc.data() })
			})
			this.otherChats = otherChats
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
