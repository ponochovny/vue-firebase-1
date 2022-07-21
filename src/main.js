import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/chat/:id', component: ChatRoom, name: 'chat' },
	],
})

const app = createApp(App)

app.use(router)
app.use(firestorePlugin)

app.mount('#app')
