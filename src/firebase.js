import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

// Initialize Firebase  
const firebaseDb = firebase.initializeApp({
    apiKey: "AIzaSyA5dYdq1zBPruCTl6wTF2lqFNxs19fVyP4",
    authDomain: "rdrive-28b21.firebaseapp.com",
    databaseURL: "https://rdrive-28b21-default-rtdb.firebaseio.com",
    projectId: "rdrive-28b21",
    storageBucket: "rdrive-28b21.appspot.com",
    messagingSenderId: "677929437283",
    appId: "1:677929437283:web:0b503ebc197eb305019056"
})

export default firebaseDb.database().ref()
export const auth = firebaseDb.auth()