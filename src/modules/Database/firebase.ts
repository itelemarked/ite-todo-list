import { initializeApp } from 'firebase/app'
import { getDatabase, remove, set } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAP7cEDguAxZlFQAh88r7R3ApNC3RXdW-Y',
  authDomain: 'ite-todo-f9e2c.firebaseapp.com',
  databaseURL: 'https://ite-todo-f9e2c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ite-todo-f9e2c',
  storageBucket: 'ite-todo-f9e2c.appspot.com',
  messagingSenderId: '172881690257',
  appId: '1:172881690257:web:c01998927a788abcf58930'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const realtimeDb = getDatabase(app)
