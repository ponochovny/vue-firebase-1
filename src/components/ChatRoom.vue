<template>
	<main>
		<h3>Welcome to ChatRoom {{ chatId }}</h3>

		<User>
			<template #user="{ user }">
				<ul>
					<li v-for="message of messages" :key="message.id">
						<ChatMessage
							:message="message"
							:owner="user.uid === message.sender"
						/>
					</li>
				</ul>

				<input type="text" v-model="newMessageText" class="input" />

				<button
					:disabled="!newMessageText || loading"
					class="button is-success"
					type="text"
					@click="addMessage(user.uid)"
				>
					Send
				</button>
			</template>
		</User>
	</main>
</template>

<script>
import User from './User.vue'
import ChatMessage from './ChatMessage.vue'
import { db } from '../firebase'
import {
	addDoc,
	collection,
	doc,
	limit,
	onSnapshot,
	orderBy,
	query,
} from '@firebase/firestore'

export default {
	name: 'chatroom-component',
	components: { User, ChatMessage },
	data() {
		return {
			newMessageText: '',
			loading: false,
			messages: [],
			unsubscribe: () => {},
		}
	},
	created() {
		const q = query(this.messagesCollection, orderBy('createdAt'), limit(10))
		this.unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messages = []
			querySnapshot.forEach((doc) => {
				messages.push({ id: doc.id, ...doc.data() })
			})
			this.messages = messages
			console.log(messages)
		})
	},
	methods: {
		async addMessage(uid) {
			// console.log(uid)
			const docRef = doc(db, 'chats', this.$route.params.id)
			const colRef = collection(docRef, 'messages')
			// console.log(collection(db, 'chats', this.$route.params.id, 'messages'))
			this.loading = true

			// const { id: } = this.messagesCollection
			const data = {
				text: this.newMessageText,
				sender: uid,
				createdAt: Date.now(),
			}
			console.log('data', data)
			const newMessage = await addDoc(colRef, data)

			console.log(newMessage)

			this.loading = false
			this.newMessageText = ''
		},
	},
	computed: {
		chatId() {
			return this.$route.params.id
		},
		messagesCollection() {
			return collection(db, 'chats', this.$route.params.id, 'messages')
		},
	},
	unmounted() {
		this.unsubscribe()
	},
}
</script>

<style>
ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	min-width: 500px;
	background-color: #efefef;
	padding: 10px;
	border-radius: 0;
}

li {
	display: flex;
}
</style>
