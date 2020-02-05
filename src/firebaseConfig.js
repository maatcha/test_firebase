import firebase from 'firebase/app'
import 'firebase/app'
// import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

// firebase init goes here
const config = {
  apiKey: 'AIzaSyAxStjr1y7QPYbWrAuFZ7A1gTY7_qm1QU8',
  authDomain: 'matcha-test-firebase.firebaseapp.com',
  databaseURL: 'https://matcha-test-firebase.firebaseio.com',
  projectId: 'matcha-test-firebase',
  storageBucket: 'matcha-test-firebase.appspot.com',
  messagingSenderId: '1041167133718',
  appId: '1:1041167133718:web:f681f38d4243a3b786d937',
  measurementId: 'G-F9RSGLPVYS'
}
firebase.initializeApp(config)
// firebase.analytics()

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  // timestampsInSnapshots: true
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
