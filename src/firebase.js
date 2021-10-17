import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Initialize Firebase  
const firebase = initializeApp({
    apiKey: "AIzaSyA5dYdq1zBPruCTl6wTF2lqFNxs19fVyP4",
    authDomain: "rdrive-28b21.firebaseapp.com",
    databaseURL: "https://rdrive-28b21-default-rtdb.firebaseio.com",
    projectId: "rdrive-28b21",
    storageBucket: "rdrive-28b21.appspot.com",
    messagingSenderId: "677929437283",
    appId: "1:677929437283:web:0b503ebc197eb305019056"
})

const db = getFirestore(firebase)
const firestoreDb = {
    folders: collection(db, "folders"),
    files: collection(db, "files"),
    getTimestamp: Date.now,
    getDocData: doc => {
        return { id: doc.id, ...doc.data() }
    }
}

export default firestoreDb
export const auth = getAuth(firebase)
export const storage = getStorage(firebase)