import firebase from 'firebase/app'
import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyC_62eSE0Rid96pb3e1lvvU1DNGqdYO7fw',
//   authDomain: 'notes-ab306.firebaseapp.com',
//   databaseURL: 'https://notes-ab306.firebaseio.com',
//   projectId: 'notes-ab306',
//   storageBucket: 'notes-ab306.appspot.com',
//   messagingSenderId: '829803338758',
//   appId: '1:829803338758:web:687585b579c189d8ac3787',
//   measurementId: 'G-F1CTS91ZQB'
// }

const firebaseConfig = {
  apiKey: 'AIzaSyCqx8OG5tIehxzpfgSJhXz1DYZnr0REM_I',
  authDomain: 'project-notes-1fa22.firebaseapp.com',
  databaseURL: 'https://project-notes-1fa22.firebaseio.com',
  projectId: 'project-notes-1fa22',
  storageBucket: 'project-notes-1fa22.appspot.com',
  messagingSenderId: '181441567272',
  appId: '1:181441567272:web:6582617e0f4bc21499b31d',
  measurementId: 'G-5YZHLJRJXQ'
}

export const db = firebase.initializeApp(firebaseConfig).firestore()

const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
