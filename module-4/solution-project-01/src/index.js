import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import App from './App'
import * as serviceWorker from './serviceWorker'

const firebaseConfig = {
  apiKey: 'AIzaSyCULZOiIjuFKyH3ZkRD_ky9F-AMD9KhTKU',
  authDomain: 'voting-app-acdc0.firebaseapp.com',
  databaseURL: 'https://voting-app-acdc0.firebaseio.com',
  projectId: 'voting-app-acdc0',
  storageBucket: 'voting-app-acdc0.appspot.com',
  messagingSenderId: '464507854725',
  appId: '1:464507854725:web:7d2d51a53604204f8a2eec',
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
