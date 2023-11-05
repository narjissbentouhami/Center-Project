// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFtJ3qEejCsBgIEcS1SiY3HzL4EfIf4-I',
  authDomain: 'syana-db.firebaseapp.com',
  databaseURL: 'gs://syana-db.appspot.com',
  projectId: 'syana-db',
  storageBucket: 'syana-db.appspot.com',
  messagingSenderId: '1041303622992',
  appId: '1:1041303622992:web:2ac2410ac2fc1f35eb8855',
  measurementId: 'G-HYSNB2V03Z'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// const storage = getStorage(app)

export default firebaseConfig
