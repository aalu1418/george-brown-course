import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
// import firebase from 'firebase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import App from './App'
import * as serviceWorker from './serviceWorker'

const firebaseConfig = {
  apiKey: 'AIzaSyD2GKVEs0RphgR0zZeHDU1Psg3jihe0_PA',
  authDomain: 'gb-fullstackiv-project.firebaseapp.com',
  databaseURL: 'https://gb-fullstackiv-project.firebaseio.com',
  projectId: 'gb-fullstackiv-project',
  storageBucket: 'gb-fullstackiv-project.appspot.com',
  messagingSenderId: '1042743826255',
  appId: '1:1042743826255:web:f2ac6e057387d61b5e573a',
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
