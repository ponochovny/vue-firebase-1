import { initializeApp } from 'firebase/app'
import {
	getAuth,
	onAuthStateChanged,
	signInAnonymously,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.VUE_APP_API_KEY,
	authDomain: `${process.env.VUE_APP_PROJECT_ID}.firebaseapp.com`,
	projectId: `${process.env.VUE_APP_PROJECT_ID}`,
	storageBucket: `${process.env.VUE_APP_PROJECT_ID}.appspot.com`,
	messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID,
	appId: `1:${process.env.VUE_APP_MSG_SENDER_ID}:web:ea97adaa69dd5548a0c9c3`,
}

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export const authAnonymously = () => signInAnonymously(firebaseAuth)
export const onAuthStateChangedE = (callback) =>
	onAuthStateChanged(firebaseAuth, callback)
export const signOutEx = () => signOut(firebaseAuth)

export const createUserWithEmailAndPasswordE = ({ email, password }) =>
	createUserWithEmailAndPassword(firebaseAuth, email, password)
export const signInWithEmailAndPasswordE = ({ email, password }) =>
	signInWithEmailAndPassword(firebaseAuth, email, password)

export const db = getFirestore(firebaseApp)
export const storage = getStorage()
