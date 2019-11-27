import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

// import App from './App'
// ReactDOM.render(<App />, document.getElementById('root'))

// 👉 Exercise 1
import Exercise1 from './Exercise1'
ReactDOM.render(<Exercise1 />, document.getElementById('root'))

// 👉 Exercise 2
// import Exercise2 from './__Exercise2__SOLUTION'
// ReactDOM.render(<Exercise2 />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
