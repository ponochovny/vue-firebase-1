<template>
	<main class="row justify-content-center p-3 p-sm-0">
		<div class="chatroom-head mb-sm-4 mb-2 flex-column flex-sm-row p-0">
			<h3 class="mb-3 mb-sm-0 text-sm-start text-center">
				Welcome to ChatRoom <code>{{ chatId }}</code>
			</h3>
			<div class="upper-controls align-self-end">
				<button class="btn btn-light" type="button" @click="$router.push('/')">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-arrow-bar-left"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
						/>
					</svg>
					Back
				</button>
				<button
					class="btn btn-primary"
					type="button"
					@click="toggleModal(true)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-share"
						viewBox="0 0 16 16"
					>
						<path
							d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
						/>
					</svg>

					Room Link
				</button>
			</div>
		</div>

		<User>
			<template #user="{ user }">
				<ul v-if="messages.length > 0">
					<li v-for="message of messages" :key="message.id">
						<div
							v-if="message.avatar && user.uid !== message.sender"
							class="avatar"
							:style="{
								backgroundColor: message.bgColor ? message.bgColor : 'black',
							}"
							:title="message.sender"
						>
							{{ message.sender.slice(0, 1).toUpperCase() }}
						</div>
						<div v-else class="avatar-shift"></div>
						<ChatMessage
							:message="message"
							:owner="user.uid === message.sender"
						/>
					</li>
				</ul>
				<div v-else class="fs-5 mb-4 text-center text-black-50">
					No messages...
				</div>

				<form @submit.prevent="submit">
					<div class="message-controls">
						<input type="text" class="form-control" v-model="newMessageText" />
						<button
							:disabled="(!newMessageText && newAudio == null) || loading"
							class="btn btn-success"
							type="submit"
							@click="addMessage(user.uid)"
						>
							Send
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-send"
								viewBox="0 0 16 16"
							>
								<path
									d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
								/>
							</svg>
						</button>
						<button
							v-if="!recorder"
							type="button"
							class="btn btn-primary"
							@click="record()"
						>
							Record
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-mic"
								viewBox="0 0 16 16"
							>
								<path
									d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"
								/>
								<path
									d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"
								/>
							</svg>
						</button>

						<button type="button" class="btn btn-danger" v-else @click="stop()">
							Stop
						</button>
					</div>

					<audio v-if="newAudio" preload="auto" controls>
						<source :src="newAudioURL" type="audio/ogg" />
						<source :src="newAudioURL" type="audio/mpeg" />
					</audio>
				</form>
			</template>
		</User>
		<teleport to="body">
			<transition name="fade-modal">
				<div
					class="share-modal"
					v-show="share"
					@click.self="toggleModal(false)"
				>
					<div class="card pt-3 pb-3 px-4 pe-5">
						<input type="text" class="form-control" :value="fullPath" />
						<button
							type="button"
							class="btn-close btn-close-black"
							aria-label="Close"
							@click="toggleModal(false)"
						></button>
					</div>
				</div>
			</transition>
		</teleport>
	</main>
</template>

<script>
import User from './User.vue'
import ChatMessage from './ChatMessage.vue'
import { db, storage } from '../firebase'
import {
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from '@firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage'
import { messagesStucker } from '../helper/messagesStucker'

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
			share: false,
		}
	},
	created() {
		const q = query(this.messagesCollection, orderBy('createdAt'))
		this.unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messages = []
			querySnapshot.forEach((doc) => {
				messages.push({ id: doc.id, ...doc.data() })
			})
			this.messages = messagesStucker(messages)
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
			})

			const recordedChunks = []
			this.recorder = new MediaRecorder(stream)

			this.recorder.addEventListener('dataavailable', (e) => {
				if (e.data.size > 0) {
					recordedChunks.push(e.data)
				}
			})
			this.recorder.addEventListener('stop', () => {
				this.newAudio = new Blob(recordedChunks, {
					type: 'audio/mp4',
				})
				console.log(this.newAudio)
			})

			this.recorder.start()
		},
		async stop() {
			this.recorder.stop()
			this.recorder = null
		},
		submit() {
			this.addMessage(this.user.uid)
		},
		toggleModal(value) {
			this.share = value
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
		fullPath() {
			return window.location.origin + this.$router.currentRoute.value.fullPath
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
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 10px;
}

li {
	display: flex;
	align-items: flex-start;
	margin-bottom: 10px;
}

.avatar {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 1.3rem;

	pointer-events: none;
	user-select: none;
}

.avatar-shift {
	width: 50px;
	height: 50px;
	display: inline-flex;
}

.message-controls {
	display: flex;
	gap: 10px;

	margin-bottom: 10px;
}

.user audio {
	width: 100%;
}

.chatroom-head {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 10px;
}

.chatroom-head .upper-controls {
	display: flex;
	gap: 10px;
}

.chatroom-head .upper-controls button {
	white-space: nowrap;
}

.share-modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #00000040;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.share-modal .card {
	position: relative;
}

.share-modal button {
	position: absolute;
	top: 22px;
	right: 8px;
}

.share-modal input {
	min-width: 520px;
	text-align: center;
}

@media (max-width: 600px) {
	.share-modal input {
		min-width: auto;
		width: 70vw;
	}
}

.fade-modal-enter-from {
	opacity: 0;
}
.fade-modal-enter-to {
	opacity: 1;
	transition: opacity 0.4s ease;
}
.fade-modal-leave-from {
	opacity: 1;
}
.fade-modal-leave-to {
	opacity: 0;
	transition: opacity 0.2s ease;
}
</style>
