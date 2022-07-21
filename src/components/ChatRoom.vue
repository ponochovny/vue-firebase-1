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
				<hr />
				<h5>Record Audio</h5>

				<button v-if="!recorder" @click="record()">Record</button>
				<button v-else @click="stop()">Stop</button>

				<audio v-if="newAudio" :src="newAudioURL" controls></audio>
				<hr />

				<button
					:disabled="(!newMessageText && newAudio == null) || loading"
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
import { db, storage } from '../firebase'
import {
	collection,
	doc,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from '@firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'

export default {
	name: 'chatroom-component',
	components: { User, ChatMessage },
	data() {
		return {
			newMessageText: '',
			loading: false,
			messages: [],
			newAudio: null,
			recorder: null,
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
			console.log(uid)

			this.loading = true

			let audioURL = null

			const docRef = doc(db, 'chats', this.$route.params.id)
			const colRef = collection(docRef, 'messages')

			const newMessageRef = doc(colRef)

			if (this.newAudio) {
				const storageRef = ref(
					storage,
					`chats/${this.chatId}/${newMessageRef.id}.wav`
				)

				await uploadBytes(storageRef, this.newAudio)
					.then((snapshot) => {
						console.log('Uploaded a blob or file!', snapshot)
						return getDownloadURL(
							ref(storage, `chats/${this.chatId}/${newMessageRef.id}.wav`)
						)
					})
					.then((url) => {
						audioURL = url
					})
					.catch((error) => console.log('some error', error))
			}

			const newMessage = await setDoc(newMessageRef, {
				text: this.newMessageText,
				sender: uid,
				createdAt: Date.now(),
				audioURL,
			})

			console.log(newMessage)

			this.loading = false
			this.newMessageText = ''
			this.newAudio = null
		},
		async record() {
			this.newAudio = null

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			})

			const options = { mimeType: 'audio/webm' }
			const recordedChunks = []
			this.recorder = new MediaRecorder(stream, options)

			this.recorder.addEventListener('dataavailable', (e) => {
				if (e.data.size > 0) {
					recordedChunks.push(e.data)
				}
			})
			this.recorder.addEventListener('stop', () => {
				this.newAudio = new Blob(recordedChunks)
				console.log(this.newAudio)
			})

			this.recorder.start()
		},
		async stop() {
			this.recorder.stop()
			this.recorder = null
		},
	},
	computed: {
		chatId() {
			return this.$route.params.id
		},
		messagesCollection() {
			return collection(db, 'chats', this.$route.params.id, 'messages')
		},
		newAudioURL() {
			return URL.createObjectURL(this.newAudio)
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
	margin-bottom: 10px;
}
</style>
