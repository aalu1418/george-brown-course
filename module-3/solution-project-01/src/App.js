import './App.css'
import React from 'react'
import CheckoutForm from './components/CheckoutForm'

const sendDataToFakeServer = data =>
  new Promise(resolve => {
    console.log('Sending data to fake server: %o', data)
    setTimeout(resolve, 5000)
  })

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <CheckoutForm submitData={sendDataToFakeServer} />
      </div>
    </div>
  )
}
