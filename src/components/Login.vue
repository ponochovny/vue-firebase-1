<template>
	<aside>
		<h3>Sign in Anonymously</h3>
		<button @click="signIn">Sign In</button>

		<div v-if="newUser">
			<h3>Sign Up for a New Account</h3>
			<a href="#" @click="newUser = false">Returning User?</a>
		</div>

		<div v-else>
			<h3>Sign In with Email</h3>
			<a href="#" @click="newUser = true">New User?</a>
		</div>

		<label for="email">Email</label><br />
		<input
			type="email"
			v-model="email"
			placeholder="email"
			class="input"
		/><br />

		<label for="password">Password</label><br />
		<input
			type="password"
			v-model="password"
			placeholder="password"
			class="input"
		/>

		<br />

		<button @click="signInOrCreateUser()">
			{{ loading ? '...' : newUser ? 'Sign Up' : 'Login' }}
		</button>

		<p :style="{ color: 'red' }" v-if="errorMessage">{{ errorMessage }}</p>
	</aside>
</template>

<script>
import {
	authAnonymously,
	createUserWithEmailAndPasswordE,
	signInWithEmailAndPasswordE,
} from '../firebase'

export default {
	name: 'login-page',
	data() {
		return {
			newUser: false,
			email: '',
			password: '',
			loading: false,
			errorMessage: '',
		}
	},
	methods: {
		async signIn() {
			try {
				const data = await authAnonymously()
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
		async signInOrCreateUser() {
			this.loading = true
			this.errorMessage = ''

			const userData = {
				email: this.email,
				password: this.password,
			}
			try {
				if (this.newUser) {
					await createUserWithEmailAndPasswordE(userData)
				} else {
					await signInWithEmailAndPasswordE(userData)
				}
			} catch (error) {
				this.errorMessage = error.message
			}

			this.loading = false
		},
	},
}
</script>

<style></style>
