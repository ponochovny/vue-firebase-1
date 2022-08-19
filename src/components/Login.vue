<template>
	<div class="login-page">
		<div class="form-header">
			<h3>Sign in Anonymously</h3>
			<button @click="signIn" class="btn btn-primary">Sign In</button>
		</div>

		<br />
		<br />

		<h3>{{ newUser ? 'Sign Up for a New Account' : 'Sign In with Email' }}</h3>

		<div class="form-wrapper">
			<label for="email">Email</label><br />
			<input
				type="email"
				v-model="email"
				placeholder="email"
				class="form-control mb-2"
			/>

			<label for="password">Password</label><br />
			<input
				type="password"
				v-model="password"
				placeholder="password"
				class="form-control"
			/>
		</div>

		<div class="form-footer">
			<button @click="signInOrCreateUser()" class="btn btn-primary">
				{{ loading ? '...' : newUser ? 'Sign Up' : 'Login' }}
			</button>
			<div v-if="newUser">
				<a href="#" @click="newUser = false">Returning User?</a>
			</div>
			<div v-else>
				<a href="#" @click="newUser = true">New User?</a>
			</div>
		</div>

		<p :style="{ color: 'red' }" v-if="errorMessage">{{ errorMessage }}</p>
	</div>
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
				await authAnonymously()
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

<style>
.user {
	display: flex;
	align-content: center;
}

.login-page {
	display: inline-block;
	margin-left: auto;
	margin-right: auto;
}

.form-wrapper {
	margin-bottom: 16px;
	margin-top: 16px;
}

.form-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.form-header h3 {
	margin-bottom: 16px;
}

.form-footer {
	display: flex;
	gap: 10px;
	align-items: center;
	justify-content: center;
}
</style>
