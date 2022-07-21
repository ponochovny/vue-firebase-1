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

const firebaseConfig = {
	apiKey: 'AIzaSyCAqvdlWyxU0xssl1xyseEiCrJyglT1TvY',
	authDomain: 'vue-firebase-1-eeffc.firebaseapp.com',
	projectId: 'vue-firebase-1-eeffc',
	storageBucket: 'vue-firebase-1-eeffc.appspot.com',
	messagingSenderId: '911384329495',
	appId: '1:911384329495:web:25bc0cdeacb0334f36cb52',
	measurementId: 'G-SQXMFWZ6TS',
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
